import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

export default function ProfileIcon({ size = 24, color = '#9DB2CE' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 57 57" fill="none">
      <Path 
        d="M28.8796 28.7474C35.3229 28.7474 40.5462 23.5241 40.5462 17.0807C40.5462 10.6374 35.3229 5.41406 28.8796 5.41406C22.4362 5.41406 17.2129 10.6374 17.2129 17.0807C17.2129 23.5241 22.4362 28.7474 28.8796 28.7474Z" 
        stroke={color} 
        strokeWidth="3.36" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M48.9236 52.0833C48.9236 43.0533 39.9402 35.75 28.8802 35.75C17.8202 35.75 8.83691 43.0533 8.83691 52.0833" 
        stroke={color} 
        strokeWidth="3.36" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
}