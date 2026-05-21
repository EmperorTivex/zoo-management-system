import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeDisplay = ({ value, size = 200, className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <QRCodeSVG 
          value={value} 
          size={size}
          level="H"
          includeMargin={false}
        />
      </div>
      <p className="text-sm text-gray-500 mt-2">Scan for check-in</p>
    </div>
  );
};

export default QRCodeDisplay;
