import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { StyleSheet } from "react-native";

const SavedInactive = ({ style, ...props }) => {
  // Extract width and height from style prop (handles both object and array cases)
  const flattenedStyle = StyleSheet.flatten(style || {});
  const width = flattenedStyle.width || 40;  // Default width 40
  const height = flattenedStyle.height || 40; // Default height 40

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        fill="none"
        stroke={flattenedStyle.stroke || "#111"} // Allow stroke color override
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={flattenedStyle.strokeWidth || 1.2} // Allow strokeWidth override
        d="M16.696 3C14.652 3 12.887 4.197 12 5.943C11.113 4.197 9.348 3 7.304 3C4.374 3 2 5.457 2 8.481s1.817 5.796 4.165 8.073S12 21 12 21s3.374-2.133 5.835-4.446C20.46 14.088 22 11.514 22 8.481S19.626 3 16.696 3"
      />
    </Svg>
  );
};

export default SavedInactive;