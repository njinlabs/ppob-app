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
    viewBox="0 0 32 32"
    width={width || size}
    height={height || (Number(width || size) * 20) / 20}
    fill="none"
    {...props}
  >
    <Path
      fill="#FF8564"
      d="M17.233 2.7a.855.855 0 0 0-.246.225c-.11.146-8.663 15.112-8.898 15.572-.142.273-.115.471.089.675l.178.178h3.695c2.031 0 3.696.016 3.696.042 0 .021-.21 2.089-.471 4.591-.257 2.502-.471 4.653-.471 4.774 0 .44.455.722.81.497.127-.078 1.084-1.743 4.581-7.972 3.188-5.674 4.428-7.925 4.439-8.066.02-.168-.005-.225-.163-.382l-.183-.184h-3.748c-3.303 0-3.747-.01-3.747-.078 0-.042.272-2.146.602-4.674.33-2.529.601-4.66.601-4.738 0-.314-.46-.591-.764-.46Z"
    />
  </Svg>
);
export default SvgComponent;
