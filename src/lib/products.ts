export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  notes: string;
  swatch: string;
};

export const products: Product[] = [
  {
    id: "unbirthday-earl-grey",
    name: "Unbirthday Earl Grey",
    price: 12,
    description:
      "A bright bergamot black tea for the 364 days a year that aren't your birthday.",
    notes: "Black tea · bergamot · cornflower",
    swatch: "from-indigo-200 to-sky-100",
  },
  {
    id: "drink-me-darjeeling",
    name: "Drink Me Darjeeling",
    price: 14.5,
    description:
      "A muscatel first flush that's light enough to make you feel ten inches tall.",
    notes: "First flush · muscatel · floral",
    swatch: "from-amber-200 to-yellow-50",
  },
  {
    id: "cheshire-chai",
    name: "Cheshire Chai",
    price: 11,
    description:
      "Cardamom, clove and a grin of cinnamon that lingers long after the cup is gone.",
    notes: "Assam · cardamom · cinnamon",
    swatch: "from-fuchsia-200 to-rose-100",
  },
  {
    id: "queen-of-hearts-hibiscus",
    name: "Queen of Hearts Hibiscus",
    price: 9.75,
    description:
      "A ruby-red herbal infusion, tart and regal. Caffeine-free, no beheadings.",
    notes: "Hibiscus · rosehip · strawberry",
    swatch: "from-rose-300 to-red-100",
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
