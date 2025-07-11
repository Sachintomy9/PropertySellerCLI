import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { StyleSheet } from "react-native";

const BedIcon = ({
  size = 32,          // Unified size control
  color = "#111",    // Default stroke color
  fill,              // Optional fill color
  strokeWidth = 1.5, // Default stroke width
  style,
  ...props
}) => {
  const flattenedStyle = StyleSheet.flatten(style || {});
  
  // Priority for stroke color:
  // 1. Direct color prop
  // 2. style.color
  // 3. Default color (#111)
  const strokeColor = color || flattenedStyle.color || "#111";
  
  // Priority for fill color:
  // 1. Direct fill prop
  // 2. style.fill
  // 3. "none" (default SVG behavior)
  const fillColor = fill || flattenedStyle.fill || "none";

  // Size handling:
  const width = flattenedStyle.width || size;
  const height = flattenedStyle.height || size;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      {...props}
    >
      <G
        fill={fillColor}
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      >
        <Path d="M22 17.5H2M22 21v-5c0-1.886 0-2.828-.586-3.414S19.886 12 18 12H6c-1.886 0-2.828 0-3.414.586S2 14.114 2 16v5m9-9v-1.787c0-.38-.057-.508-.35-.658C10.04 9.243 9.299 9 8.5 9s-1.54.243-2.15.555c-.293.15-.35.278-.35.658V12m12 0v-1.787c0-.38-.057-.508-.35-.658C17.04 9.243 16.299 9 15.5 9s-1.54.243-2.15.555c-.293.15-.35.278-.35.658V12" />
        <Path d="M21 12V7.36c0-.691 0-1.037-.192-1.363s-.466-.496-1.014-.834C17.587 3.8 14.9 3 12 3s-5.587.8-7.794 2.163c-.548.338-.822.507-1.014.834S3 6.669 3 7.36V12" />
      </G>
    </Svg>
  );
};

export default BedIcon;