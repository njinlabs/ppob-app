import { Base } from "./base";

export type MembershipModel = {
  id: string;
  name: string;
  referralLimit: number;
  price: number;
  pricingId: string;
} & Base;
