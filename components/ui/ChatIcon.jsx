import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

export default function ChatIcon({ size = 24, color = '#9DB2CE' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <Defs>
        <ClipPath id="clip0_259_985">
          <Rect width="56" height="56" fill="white" transform="translate(0.000976562)"/>
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip0_259_985)">
        <Path 
          d="M56.001 0H0.000976562V56H56.001V0Z" 
          fill="white" 
          fillOpacity="0.01"
        />
        <Path 
          d="M51.3346 27.9974C51.3346 40.884 40.888 51.3307 28.0013 51.3307C21.0322 51.3307 4.66797 51.3307 4.66797 51.3307C4.66797 51.3307 4.66797 33.915 4.66797 27.9974C4.66797 15.1107 15.1147 4.66406 28.0013 4.66406C40.888 4.66406 51.3346 15.1107 51.3346 27.9974Z" 
          stroke={color} 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <Path 
          d="M16.334 21H37.334" 
          stroke={color} 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <Path 
          d="M16.334 30.3359H37.334" 
          stroke={color} 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <Path 
          d="M16.334 39.6641H28.0007" 
          stroke={color} 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}