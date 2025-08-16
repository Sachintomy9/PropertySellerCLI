import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const AiAgentIcon = ({ size = 32, color = "#ff1645", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 32 32"
    {...props}
  >
    <G
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <Path d="M25 5H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h11l6 4v-4h1a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4" />
      <Path d="M10 15a1 1 0 1 1-2 0a1 1 0 0 1 2 0m6 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0m6 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0" />
    </G>
  </Svg>
);

export default AiAgentIcon;