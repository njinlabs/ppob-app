import { colors } from "@/constants/Colors";
import * as React from "react";
import Svg, { Circle, G, Mask, Path, SvgProps } from "react-native-svg";
const SvgComponent = ({
  width = 346,
  height,
  color = colors.white,
  strokeColor = colors.grayscale[100],
  ...props
}: { color?: string; strokeColor?: string } & Omit<
  SvgProps,
  "color" | "strokeColor"
>) => (
  <Svg
    fill="none"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 346 40"
    width={width}
    height={height || (Number(width) * 40) / 346}
    {...props}
  >
    <Mask
      id="a"
      width={346}
      height={40}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <Path fill="#fff" d="M0 0h346v40H0z" />
    </Mask>
    <G mask="url(#a)">
      <Circle cy={20} r={16} fill={color} />
      <Circle cx={346} cy={20} r={16} fill={color} />
      <Path
        stroke={strokeColor}
        strokeDasharray="4 4"
        strokeWidth={2}
        d="M16 19.5h314"
      />
    </G>
  </Svg>
);
export default SvgComponent;
