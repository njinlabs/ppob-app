import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconType } from "./icon";
const SvgComponent = ({
  size = 24,
  width,
  height,
  fill = "#000000",
  ...props
}: IconType) => (
  <Svg
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 20 20"
    width={width || size}
    height={height || (Number(width || size) * 20) / 20}
    fill="none"
    {...props}
  >
    <Path
      fill={fill}
      d="M11 14.024H5a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2Zm-4-6h2a1 1 0 1 0 0-2H7a1 1 0 0 0 0 2Zm12 2h-3v-9a1 1 0 0 0-1.5-.87l-3 1.72-3-1.72a1 1 0 0 0-1 0l-3 1.72-3-1.72a1 1 0 0 0-1.5.87v16a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1Zm-16 8a1 1 0 0 1-1-1V2.754l2 1.14a1.08 1.08 0 0 0 1 0l3-1.72 3 1.72a1.08 1.08 0 0 0 1 0l2-1.14v14.27a3 3 0 0 0 .18 1H3Zm15-1a1 1 0 1 1-2 0v-5h2v5Zm-7-7H5a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2Z"
    />
  </Svg>
);
export default SvgComponent;
