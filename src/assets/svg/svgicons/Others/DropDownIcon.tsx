import * as React from "react";
import Svg, { Path } from "react-native-svg";

const DropDownIcon = ({
  width = 25,
  height = 25,
  color = "#FF1645",
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
      fill={color}
      fillRule="evenodd"
      d="m5 8l7 8l7-8z"
    />
  </Svg>
);

export default DropDownIcon;