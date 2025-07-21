import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ArrowIcon = ({
  size = 32,
  color = "currentColor",
  strokeWidth = 1,
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m10 17l5-5l-5-5"
      strokeWidth={strokeWidth}
    />
  </Svg>
);

export default ArrowIcon;