import { TextInputProps } from "@/components/TextInput";

type Label = {
  values: string[];
  label: string;
  inputType?: TextInputProps["keyboardType"];
};

export const customerNumberLabels: Label[] = [
  {
    values: ["PULSA", "DATA"],
    label: "Nomor Ponsel",
  },
  {
    values: ["MANDIRI E-TOLL", "TAPCASH BNI", "BRI BRIZZI"],
    label: "Nomor Kartu",
  },
  {
    values: ["MAXIM", "GAMES"],
    label: "ID Akun",
    inputType: "default",
  },
  {
    values: ["PASCABAYAR", "PLN"],
    label: "ID Pelanggan",
  },
];

export function getCustomerNumberLabel(
  ...params: (string | undefined | null)[]
) {
  let label: Omit<Label, "values"> = {
    label: "Nomor Telepon",
    inputType: "phone-pad",
  };

  for (const param of params.filter((el) => Boolean(el))) {
    const found = customerNumberLabels.find((el) =>
      el.values.includes(param!.toUpperCase())
    );

    if (found) {
      label = found;
      break;
    }
  }

  return label;
}
