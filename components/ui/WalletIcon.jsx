import React from 'react';
import Svg, { Path, G, Defs, Mask } from 'react-native-svg';

export default function WalletIcon({ size = 24, color = '#9DB2CE' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 57 57" fill="none">
      <Path 
        d="M52.2741 28.7526V40.4193C52.2741 47.4193 47.6074 52.0859 40.6074 52.0859H17.2741C10.2741 52.0859 5.60742 47.4193 5.60742 40.4193V28.7526C5.60742 22.4059 9.43409 17.9726 15.3841 17.2259C15.9908 17.1326 16.6208 17.0859 17.2741 17.0859H40.6074C41.2141 17.0859 41.7974 17.1092 42.3574 17.2026C48.3774 17.9026 52.2741 22.3593 52.2741 28.7526Z" 
        stroke={color} 
        strokeWidth="3.36" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M42.36 17.1974C41.8 17.1041 41.2167 17.0808 40.61 17.0808H17.2767C16.6234 17.0808 15.9934 17.1274 15.3867 17.2207C15.7134 16.5674 16.1801 15.9607 16.7401 15.4007L24.3234 7.79406C27.5201 4.62073 32.7 4.62073 35.8967 7.79406L39.98 11.9241C41.4734 13.3941 42.2667 15.2607 42.36 17.1974Z" 
        stroke={color} 
        strokeWidth="3.36" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M52.2741 29.9141H45.2741C42.7074 29.9141 40.6074 32.0141 40.6074 34.5807C40.6074 37.1474 42.7074 39.2474 45.2741 39.2474H52.2741" 
        stroke={color} 
        strokeWidth="3.36" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
}