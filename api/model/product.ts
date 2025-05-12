import { Base } from "./base";

export type ProductModel = {
  id: string;
  name: string;
  status: boolean;
  sku: string;
  type: "PREPAID" | "PASCA";
  startCutOff: string;
  endCutOff: string;
  price: number;
  brandId: string | null;
  categoryId: string | null;
} & Base;
