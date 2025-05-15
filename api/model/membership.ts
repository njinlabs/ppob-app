import { Base } from "./base";

export type MembershipModel = {
  id: string;
  name: string;
  description: string;
  referralLimit: number;
  price: number;
  pricingId: string;
} & Base;
