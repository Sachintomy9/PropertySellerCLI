import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ArrowIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m10 17l5-5l-5-5"
      strokeWidth={1}
    />
  </Svg>
);
export default ArrowIcon;
