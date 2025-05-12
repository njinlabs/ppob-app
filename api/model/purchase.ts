import { Base } from "./base.js";
import { FeeModel } from "./fee.js";

export type TopupResponse = {
  refId: string;
  customerNumber: string;
  buyerSKUCode: string;
  message: string;
  status: "PENDING" | "SUCCEED" | "FAILED";
  serialNumber?: string;
  price: number;
};

export type PayResponse = {
  refId: string;
  customerNumber: string;
  customerName: string;
  buyerSKUCode: string;
  message: string;
  status: "PENDING" | "SUCCEED" | "FAILED";
  price: number;
};

export type PurchaseModel = {
  id: string;
  invoiceNumber: string;
  ref: string;
  customerNumber: string;
  price: number;
  fees: FeeModel[];
  total: number;
  name: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
  details: Partial<TopupResponse>;
  inq: Partial<TopupResponse | PayResponse>;
  userId: string;
  productId: string;
} & Base;
