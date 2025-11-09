import React, { createContext, useContext, useEffect, useState } from 'react';

const DeviceTypeContext = createContext({ isMobile: false });

export const useDeviceType = () => useContext(DeviceTypeContext);

export const DeviceTypeProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Check by window width and user agent
      const mobileWidth = window.innerWidth <= 768;
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileUA = /android|iphone|ipad|ipod|opera mini|iemobile|mobile/i.test(userAgent);
      setIsMobile(mobileWidth || mobileUA);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <DeviceTypeContext.Provider value={{ isMobile }}>
      {children}
    </DeviceTypeContext.Provider>
  );
};

