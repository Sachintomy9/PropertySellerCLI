import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ForwardIcon = ({
  width = 32,
  height = 32,
  color = "#fff",
  strokeWidth = 1.5,
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="m9 5l6 7l-6 7"
    />
  </Svg>
);

export default ForwardIcon;