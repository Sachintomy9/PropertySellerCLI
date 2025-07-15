import * as React from "react";
import Svg, { Path } from "react-native-svg";

const BackIcon = ({ height = 32, width = 16, color = "#1c1b1b", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 12 24"
    {...props}
  >
    <Path
      fill={color}
      fillRule="evenodd"
      d="M10 19.438L8.955 20.5l-7.666-7.79a1.02 1.02 0 0 1 0-1.42L8.955 3.5L10 4.563L2.682 12z"
    />
  </Svg>
);

export default BackIcon;