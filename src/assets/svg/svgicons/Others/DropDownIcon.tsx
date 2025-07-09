import * as React from "react";
import Svg, { Path } from "react-native-svg";
const DropDownIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path fill="#FF1645" fillRule="evenodd" d="m5 8l7 8l7-8z" />
  </Svg>
);
export default DropDownIcon;
