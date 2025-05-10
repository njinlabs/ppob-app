import { SvgProps } from "react-native-svg";

type Props = {
  size: number;
};

export type IconType = Props & Omit<SvgProps, keyof Props>;
