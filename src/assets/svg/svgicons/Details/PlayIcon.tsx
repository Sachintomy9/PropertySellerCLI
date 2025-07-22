import * as React from "react";
import Svg, { Path } from "react-native-svg";

const PlayIcon = ({ color = "#FF1645", size = 32, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 32 32"
    {...props}
  >
    <Path
      fill={color}
      d="M11 23a1 1 0 0 1-1-1V10a1 1 0 0 1 1.447-.894l12 6a1 1 0 0 1 0 1.788l-12 6A1 1 0 0 1 11 23m1-11.382v8.764L20.764 16Z"
    />
    <Path
      fill={color}
      d="M16 4A12 12 0 1 1 4 16A12 12 0 0 1 16 4m0-2a14 14 0 1 0 14 14A14 14 0 0 0 16 2"
    />
  </Svg>
);

export default PlayIcon;