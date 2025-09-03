import * as React from "react";
import Svg, { Path } from "react-native-svg";

const GoBackIcon = ({ size = 16, color = "#ff1645", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size * 2} // Maintains the 1:2 aspect ratio (16:32)
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

export default GoBackIcon;