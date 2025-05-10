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
      fillRule="evenodd"
      d="M17 10.024v-3l1 3h-1Zm0 8H3a1 1 0 0 1-1-1v-5h3a1 1 0 0 1 1 1v1a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-1a1 1 0 0 1 1-1h3v5a1 1 0 0 1-1 1Zm-14-11v3H2l1-3Zm3-5h8a1 1 0 0 1 1 1v7h-1a2 2 0 0 0-2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-1a2 2 0 0 0-2-2H5v-7a1 1 0 0 1 1-1Zm12 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2l-2 6v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8l-2-6Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
