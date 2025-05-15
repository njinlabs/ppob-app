import { client } from "./client";
import { MembershipModel } from "./model/membership";
import { MembershipPaymentModel } from "./model/membership-payment";

export const getMembership = (): Promise<MembershipModel[]> =>
  client.get("/membership").then(({ data }) => data.data);

export const payMembership = (
  membershipId: string
): Promise<MembershipPaymentModel> =>
  client.post(`/membership/${membershipId}`).then(({ data }) => data.data);
