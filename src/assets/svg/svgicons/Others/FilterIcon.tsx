import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { StyleSheet } from "react-native";

const FilterIcon = ({
  width = 25,       // Default width
  height = 25,      // Default height
  color = "#FF1645", // Default stroke color
  strokeWidth = 1.5, // Default stroke width
  style,            // Style prop
  ...props          // Other SVG props
}) => {
  // Flatten style to handle both object and array styles
  const flattenedStyle = StyleSheet.flatten(style || {});

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={flattenedStyle.width || width}
      height={flattenedStyle.height || height}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        fill="none"
        stroke={flattenedStyle.color || color}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={flattenedStyle.strokeWidth || strokeWidth}
        d="M21.25 12H8.895m-4.361 0H2.75m18.5 6.607h-5.748m-4.361 0H2.75m18.5-13.214h-3.105m-4.361 0H2.75m13.214 2.18a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm-9.25 6.607a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm6.607 6.608a2.18 2.18 0 1 0 0-4.361a2.18 2.18 0 0 0 0 4.36Z"
      />
    </Svg>
  );
};

export default FilterIcon;