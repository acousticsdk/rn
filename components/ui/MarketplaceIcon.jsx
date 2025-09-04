import React from 'react';
import Svg, { Circle, Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

export default function MarketplaceIcon({ size = 24, color = '#9DB2CE' }) {
  // Масштабируем размер относительно оригинального размера 179x180
  const scale = size / 56; // Приводим к стандартному размеру иконки
  const scaledWidth = 179 * scale;
  const scaledHeight = 180 * scale;
  
  return (
    <Svg width={scaledWidth} height={scaledHeight} viewBox="0 0 179 180" fill="none">
      <Circle cx="89" cy="90" r="66" fill="#015FFE"/>
      <Circle cx="89" cy="90" r="64" stroke="white" strokeOpacity="0.28" strokeWidth="4"/>
      <Path 
        d="M60.2461 87.2031V101.855C60.2461 116.507 66.1199 122.381 80.7718 122.381H98.3605C113.012 122.381 118.886 116.507 118.886 101.855V87.2031" 
        stroke="white" 
        strokeWidth="4.89484" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M89.5815 89.7494C95.5532 89.7494 99.9586 84.8872 99.3712 78.9155L97.2175 57.1172H81.9782L79.7918 78.9155C79.2044 84.8872 83.6098 89.7494 89.5815 89.7494Z" 
        stroke="white" 
        strokeWidth="4.89484" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M110.173 89.7494C116.765 89.7494 121.595 84.3977 120.942 77.8387L120.028 68.8648C118.854 60.3804 115.59 57.1172 107.041 57.1172H97.0879L99.3721 79.9924C99.9269 85.3767 104.789 89.7494 110.173 89.7494Z" 
        stroke="white" 
        strokeWidth="4.89484" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M68.8267 89.7494C74.2111 89.7494 79.0733 85.3767 79.5954 79.9924L80.3133 72.7807L81.8797 57.1172H71.9268C63.3772 57.1172 60.1139 60.3804 58.9392 68.8648L58.0581 77.8387C57.4055 84.3977 62.235 89.7494 68.8267 89.7494Z" 
        stroke="white" 
        strokeWidth="4.89484" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M89.5799 106.062C84.1304 106.062 81.4219 108.771 81.4219 114.221V122.379H97.738V114.221C97.738 108.771 95.0295 106.062 89.5799 106.062Z" 
        stroke="white" 
        strokeWidth="4.89484" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
}