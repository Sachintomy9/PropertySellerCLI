import * as React from "react";
import Svg, { Path } from "react-native-svg";

const BuildingIcon = ({ color = "#000", size = 24, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 256"
    {...props}
  >
    <Path
      fill={color}
      d="M232 226h-26V30h10a6 6 0 0 0 0-12H40a6 6 0 0 0 0 12h10v196H24a6 6 0 0 0 0 12h208a6 6 0 0 0 0-12M62 30h132v196h-36v-42a6 6 0 0 0-6-6h-48a6 6 0 0 0-6 6v42H62Zm84 196h-36v-36h36ZM90 64a6 6 0 0 1 6-6h16a6 6 0 0 1 0 12H96a6 6 0 0 1-6-6m48 0a6 6 0 0 1 6-6h16a6 6 0 0 1 0 12h-16a6 6 0 0 1-6-6m-48 40a6 6 0 0 1 6-6h16a6 6 0 0 1 0 12H96a6 6 0 0 1-6-6m48 0a6 6 0 0 1 6-6h16a6 6 0 0 1 0 12h-16a6 6 0 0 1-6-6m-42 46a6 6 0 0 1 0-12h16a6 6 0 0 1 0 12Zm42-6a6 6 0 0 1 6-6h16a6 6 0 0 1 0 12h-16a6 6 0 0 1-6-6"
      strokeWidth={6.5}
      stroke={color}
    />
  </Svg>
);

export default BuildingIcon;