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
      d="M10 .024a10.025 10.025 0 0 0-9.156 5.99A10.002 10.002 0 0 0 2.636 16.8 10.018 10.018 0 0 0 10 20.024a10.025 10.025 0 0 0 7.364-3.223A10.007 10.007 0 0 0 10 .024Zm0 18.018a8.018 8.018 0 0 1-5.56-2.252A6.007 6.007 0 0 1 10 12.066a6.015 6.015 0 0 1 5.56 3.724A8.019 8.019 0 0 1 10 18.043ZM7.996 8.033a2 2 0 0 1 2.395-1.963 2.004 2.004 0 0 1 1.46 2.73 2.003 2.003 0 0 1-3.855-.767Zm8.927 6.006a8.013 8.013 0 0 0-3.917-3.383 4.001 4.001 0 0 0-.832-6.012 4.01 4.01 0 0 0-5.827 1.716 4.001 4.001 0 0 0 .647 4.296 8.013 8.013 0 0 0-3.917 3.383 7.923 7.923 0 0 1-1.092-4.004c0-2.124.844-4.16 2.347-5.662a8.019 8.019 0 0 1 11.336 0 8.005 8.005 0 0 1 2.347 5.662 7.923 7.923 0 0 1-1.092 4.004Z"
    />
  </Svg>
);
export default SvgComponent;
