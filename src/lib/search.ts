import type { Product } from "@/types/product";

function normalize(value: string): string {
  return value.toLowerCase().trim().replace(/\s+/g, " ");
}

export function searchProducts(products: Product[], query: string): Product[] {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return products;
  }

  const exactResults = products.filter((product) => {
    const name = normalize(product.name);
    const brand = normalize(product.brand);
    const category = normalize(product.category);

    return (
      name.includes(normalizedQuery) ||
      brand.includes(normalizedQuery) ||
      category.includes(normalizedQuery)
    );
  });

  if (exactResults.length > 0) {
    return exactResults;
  }

  const FUZZY_THRESHOLD = 0.65;

  return products
    .map((product) => ({
      product,
      score: productSearchScore(product, normalizedQuery),
    }))
    .filter(({ score }) => score >= FUZZY_THRESHOLD)
    .sort((a, b) => b.score - a.score)
    .map(({ product }) => product);
}

function levenshteinDistance(a: string, b: string): number {
  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);

  for (let i = 1; i <= a.length; i++) {
    const current = [i];

    for (let j = 1; j <= b.length; j++) {
      const insertion = current[j - 1] + 1;
      const deletion = previous[j] + 1;
      const substitution = previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1);

      current.push(Math.min(insertion, deletion, substitution));
    }

    for (let j = 0; j < current.length; j++) {
      previous[j] = current[j];
    }
  }

  return previous[b.length];
}

function similarity(a: string, b: string): number {
  if (a === b) {
    return 1;
  }

  if (!a || !b) {
    return 0;
  }

  const distance = levenshteinDistance(a, b);
  const maxLength = Math.max(a.length, b.length);

  return 1 - distance / maxLength;
}

function tokenize(value: string): string[] {
  return normalize(value).split(" ").filter(Boolean);
}

function fuzzyScore(query: string, value: string): number {
  const queryTokens = tokenize(query);
  const valueTokens = tokenize(value);

  if (queryTokens.length === 0 || valueTokens.length === 0) {
    return 0;
  }

  let totalScore = 0;

  for (const queryToken of queryTokens) {
    let bestTokenScore = 0;

    for (const valueToken of valueTokens) {
      if (valueToken.includes(queryToken)) {
        bestTokenScore = Math.max(bestTokenScore, 1);
        continue;
      }

      bestTokenScore = Math.max(
        bestTokenScore,
        similarity(queryToken, valueToken),
      );
    }

    totalScore += bestTokenScore;
  }

  return totalScore / queryTokens.length;
}

function productSearchScore(product: Product, query: string): number {
  const scores = [
    fuzzyScore(query, product.name),
    fuzzyScore(query, product.brand),
    fuzzyScore(query, product.category),
  ];

  return Math.max(...scores);
}
