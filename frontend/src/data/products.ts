export interface Product {
  id: string;
  name: string;
  botanical: string;
  category: "Core botanical range" | "Cosmetic herb powders (future)" | "Herbal tea ingredients (future)";
  forms: string[];
  description: string;
  applications: string;
  note: string;
}

export const productForms = [
  "Cleaned and Graded Whole Herbs",
  "Cut and Sifted Herbs",
  "Herbal Powders",
] as const;

export const products: Product[] = [
  {
    id: "amla",
    name: "Amla",
    botanical: "Phyllanthus emblica",
    category: "Core botanical range",
    forms: ["Cleaned and Graded Whole Herbs", "Cut and Sifted Herbs", "Herbal Powders"],
    description: "Amla fruit material proposed for cleaning, drying, cutting and powder processing.",
    applications: "Ayurvedic formulations, herbal ingredients and nutraceutical manufacturing.",
    note: "Catalogue range is indicative until availability and batch documentation are confirmed.",
  },
  {
    id: "harad",
    name: "Harad",
    botanical: "Terminalia chebula",
    category: "Core botanical range",
    forms: ["Cleaned and Graded Whole Herbs", "Cut and Sifted Herbs", "Herbal Powders"],
    description: "Harad fruit material proposed for sorting, controlled drying and size reduction.",
    applications: "Ayurvedic and herbal manufacturing ingredient supply.",
    note: "Catalogue range is indicative until availability and batch documentation are confirmed.",
  },
  {
    id: "baheda",
    name: "Baheda",
    botanical: "Terminalia bellirica",
    category: "Core botanical range",
    forms: ["Cleaned and Graded Whole Herbs", "Cut and Sifted Herbs", "Herbal Powders"],
    description: "Baheda fruit material proposed for cleaning, grading and powder processing.",
    applications: "Ayurvedic formulations and botanical ingredient manufacturing.",
    note: "Catalogue range is indicative until availability and batch documentation are confirmed.",
  },
  {
    id: "giloy",
    name: "Giloy",
    botanical: "Tinospora cordifolia",
    category: "Core botanical range",
    forms: ["Cleaned and Graded Whole Herbs", "Cut and Sifted Herbs", "Herbal Powders"],
    description: "Giloy stem material proposed for inspection, cleaning and controlled drying.",
    applications: "Herbal and nutraceutical ingredient applications.",
    note: "Catalogue range is indicative until availability and batch documentation are confirmed.",
  },
  {
    id: "ashwagandha",
    name: "Ashwagandha",
    botanical: "Withania somnifera",
    category: "Core botanical range",
    forms: ["Cleaned and Graded Whole Herbs", "Cut and Sifted Herbs", "Herbal Powders"],
    description: "Ashwagandha root material proposed for cleaning, drying and pulverising.",
    applications: "Ayurvedic, nutraceutical and wellness product manufacturing.",
    note: "Catalogue range is indicative until availability and batch documentation are confirmed.",
  },
  {
    id: "shatavari",
    name: "Shatavari",
    botanical: "Asparagus racemosus",
    category: "Core botanical range",
    forms: ["Cleaned and Graded Whole Herbs", "Cut and Sifted Herbs", "Herbal Powders"],
    description: "Shatavari root material proposed for sorting, drying and powder processing.",
    applications: "Herbal and nutraceutical ingredient supply.",
    note: "Catalogue range is indicative until availability and batch documentation are confirmed.",
  },
  {
    id: "neem",
    name: "Neem",
    botanical: "Azadirachta indica",
    category: "Core botanical range",
    forms: ["Cleaned and Graded Whole Herbs", "Cut and Sifted Herbs", "Herbal Powders"],
    description: "Neem leaf material proposed for cleaning, grading and powder processing.",
    applications: "Cosmetic, herbal and botanical ingredient applications.",
    note: "Catalogue range is indicative until availability and batch documentation are confirmed.",
  },
  {
    id: "moringa",
    name: "Moringa",
    botanical: "Moringa oleifera",
    category: "Core botanical range",
    forms: ["Cleaned and Graded Whole Herbs", "Cut and Sifted Herbs", "Herbal Powders"],
    description: "Moringa leaf material proposed for drying, sifting and powder processing.",
    applications: "Nutraceutical, food ingredient and herbal manufacturing.",
    note: "Catalogue range is indicative until availability and batch documentation are confirmed.",
  },
];
