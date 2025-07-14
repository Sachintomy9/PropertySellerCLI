import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const CheckMark = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={80}
    height={80}
    viewBox="0 0 24 24"
    {...props}
  >
    <G
      fill="none"
      stroke="#ff1645"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      color="#ff1645"
    >
      <Path d="M17 3.338A9.95 9.95 0 0 0 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10q-.002-1.03-.2-2" />
      <Path d="M8 12.5s1.5 0 3.5 3.5c0 0 5.559-9.167 10.5-11" />
    </G>
  </Svg>
);
export default CheckMark;
