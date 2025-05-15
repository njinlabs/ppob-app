import { Base } from "./base.js";
import { FeeModel } from "./fee.js";

export type MembershipPaymentModel = {
  id: string;
  invoiceNumber: string;
  price: number;
  fees: FeeModel[];
  total: number;
  name: string;
  userId: string;
  membershipId: string;
} & Base;
