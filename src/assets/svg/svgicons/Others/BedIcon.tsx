import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props:any) => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 32 32"
    enableBackground="new 0 0 32 32"
    xmlSpace="preserve"
    {...props}
  >
    <Path
      fill="none"
      stroke="#000000"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M28,16V9c0-1.1-0.9-2-2-2H6C4.9,7,4,7.9,4,9v7"
    />
    <Path
      fill="none"
      stroke="#000000"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M8,16v-2c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2v2"
    />
    <Path
      fill="none"
      stroke="#000000"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M16,16v-2c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2v2"
    />
    <Path
      fill="none"
      stroke="#000000"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M3,18v8h3v-2h20v2h3v-8c0-1.1-0.9-2-2-2H5 C3.9,16,3,16.9,3,18z"
    />
  </Svg>
);
export default SVGComponent;
