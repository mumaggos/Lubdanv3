import { useEffect } from 'react';

declare global {
  interface Window {
    Transak: any;
  }
}

export default function TransakWidget() {
  useEffect(() => {
    if (window.Transak) {
      const transak = new window.Transak({
        apiKey: 'pk_live_e5f0f0e8e8e8e8e8e8e8e8e8e8e8e8e8',
        environment: 'PRODUCTION',
        defaultCryptoCurrency: 'MATIC',
        networks: 'polygon',
        defaultNetwork: 'polygon',
        themeColor: '00ff41',
        redirectURL: window.location.href,
        hostURL: window.location.origin,
        widgetHeight: 625,
        fiatCurrency: 'USD',
      });
      transak.init();
    }
  }, []);

  return null;
}
