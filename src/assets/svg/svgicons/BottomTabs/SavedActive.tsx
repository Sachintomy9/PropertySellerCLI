import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { StyleSheet } from "react-native";

const SavedActive = ({ 
  width = 25, 
  height = 25,
  color = "#FF1645",  // Now controllable via prop
  style,
  ...props 
}) => {
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
        fill={flattenedStyle.color || color}  // Now respects style.color
        d="M16.696 3C14.652 3 12.887 4.197 12 5.943C11.113 4.197 9.348 3 7.304 3C4.374 3 2 5.457 2 8.481s1.817 5.796 4.165 8.073S12 21 12 21s3.374-2.133 5.835-4.446C20.46 14.088 22 11.514 22 8.481S19.626 3 16.696 3"
      />
    </Svg>
  );
};

export default SavedActive;