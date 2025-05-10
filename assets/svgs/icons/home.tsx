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
      d="m17 6.024-6-5.26a3 3 0 0 0-4 0l-6 5.26a3 3 0 0 0-1 2.26v8.74a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-8.75a3 3 0 0 0-1-2.25Zm-6 12H7v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5Zm5-1a1 1 0 0 1-1 1h-2v-5a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v5H3a1 1 0 0 1-1-1v-8.75a1 1 0 0 1 .34-.75l6-5.25a1 1 0 0 1 1.32 0l6 5.25a1 1 0 0 1 .34.75v8.75Z"
    />
  </Svg>
);
export default SvgComponent;
