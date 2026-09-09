// Must stay in sync with $category-palette in styles/_variables.scss
const CATEGORY_PALETTE = ["#b8433f", "#6b4fa0", "#2f6f76", "#c08a2e", "#1f6fb2", "#b85c7a"];

export function categoryColor(categoryId: number): string {
  return CATEGORY_PALETTE[categoryId % CATEGORY_PALETTE.length];
}
