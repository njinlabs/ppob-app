export type FeeModel = {
  name: string;
  amount?: number;
  percentage?: {
    value: number;
    fromGrandTotal?: boolean;
  };
};
