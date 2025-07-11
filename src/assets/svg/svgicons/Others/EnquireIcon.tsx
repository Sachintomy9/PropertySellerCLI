import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { StyleSheet } from "react-native";

const EnquireIcon = ({ 
  style, 
  color,       // Direct color prop
  fill,        // Direct fill prop (alias for color)
  size = 32,   // Unified size control
  ...props 
}) => {
  // Combine all possible color sources with priority:
  // 1. Direct color prop
  // 2. Direct fill prop
  // 3. style.color
  // 4. style.fill
  // 5. Default color (#ff1645)
  const flattenedStyle = StyleSheet.flatten(style || {});
  const iconColor = color || fill || flattenedStyle.color || flattenedStyle.fill || "#ff1645";
  
  // Size handling - allows control via:
  // 1. style.width/height
  // 2. size prop
  // 3. Default size (32)
  const width = flattenedStyle.width || size;
  const height = flattenedStyle.height || size;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="-2 -2 24 24"
      {...props}
    >
      <Path
        fill={iconColor}
        d="m5.72 14.456l1.761-.508l10.603-10.73a.456.456 0 0 0-.003-.64l-.635-.642a.443.443 0 0 0-.632-.003L6.239 12.635zM18.703.664l.635.643c.876.887.884 2.318.016 3.196L8.428 15.561l-3.764 1.084a.9.9 0 0 1-1.11-.623a.9.9 0 0 1-.002-.506l1.095-3.84L15.544.647a2.215 2.215 0 0 1 3.159.016zM7.184 1.817c.496 0 .898.407.898.909a.903.903 0 0 1-.898.909H3.592c-.992 0-1.796.814-1.796 1.817v10.906c0 1.004.804 1.818 1.796 1.818h10.776c.992 0 1.797-.814 1.797-1.818v-3.635c0-.502.402-.909.898-.909s.898.407.898.91v3.634c0 2.008-1.609 3.636-3.593 3.636H3.592C1.608 19.994 0 18.366 0 16.358V5.452c0-2.007 1.608-3.635 3.592-3.635z"
      />
    </Svg>
  );
};

export default EnquireIcon;