export type UserModel = {
  id: string;
  fullname: string;
  password?: string;
  email: string;
  phone: string;
  referralCode: string;
  referredById: string;
  membershipId: string;
};
