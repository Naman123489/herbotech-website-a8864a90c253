export interface EnquiryRequest {
  fullName: string;
  companyName: string;
  businessEmail: string;
  phoneNumber: string;
  industry: "Ayurveda" | "Nutraceuticals" | "Cosmetics" | "Herbal Teas" | "Botanical Extracts" | "Herbal Wellness Brands" | "Other";
  requiredHerb: string;
  productForm: "Cleaned and Graded Whole Herbs" | "Cut and Sifted Herbs" | "Herbal Powders";
  estimatedQuantity: string;
  requiredSpecifications: string;
  additionalMessage: string;
}

export interface EnquiryResponse {
  message: string;
  enquiryId: number;
}

export interface ErrorResponse {
  detail?: string;
}

export interface HTTPValidationError {
  detail?: Array<{ loc: Array<string>; msg: string; type: string }>;
}
