import { useState, useEffect } from 'react';

export function useRecaptcha(containerId) {
  const [widget, setWidget] = useState(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    // 检查脚本是否已存在
    const existingScript = document.querySelector('script[src*="recaptcha"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = () => setIsScriptLoaded(true);
      document.head.appendChild(script);
    } else {
      setIsScriptLoaded(true);
    }

    return () => {
      if (widget !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widget);
        } catch (e) {
          console.error('Error resetting reCAPTCHA:', e);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (!isScriptLoaded || retryCount >= MAX_RETRIES) return;

    const initializeWidget = () => {
      if (window.grecaptcha?.ready && document.getElementById(containerId)) {
        try {
          const container = document.getElementById(containerId);
          if (container && !container.hasChildNodes()) {
            const widgetId = window.grecaptcha.render(containerId, {
              sitekey: '6LfBy0IqAAAAACglebXLEuKwhzW1B1Y_u8V713SJ',
              callback: () => {},
              'expired-callback': () => {
                if (widget !== null) {
                  window.grecaptcha.reset(widget);
                }
              }
            });
            setWidget(widgetId);
          }
        } catch (e) {
          console.error('reCAPTCHA initialization error:', e);
          setRetryCount(prev => prev + 1);
          setTimeout(initializeWidget, 1000);
        }
      } else {
        setTimeout(initializeWidget, 500);
      }
    };

    window.recaptchaCallback = () => {
      window.grecaptcha.ready(initializeWidget);
    };

    if (window.grecaptcha?.ready) {
      window.grecaptcha.ready(initializeWidget);
    } else {
      setTimeout(initializeWidget, 500);
    }
  }, [isScriptLoaded, containerId, retryCount]);

  const getResponse = () => {
    if (widget !== null && window.grecaptcha) {
      try {
        return window.grecaptcha.getResponse(widget);
      } catch (e) {
        console.error('Error getting reCAPTCHA response:', e);
        return '';
      }
    }
    return '';
  };

  const reset = () => {
    if (widget !== null && window.grecaptcha) {
      try {
        window.grecaptcha.reset(widget);
      } catch (e) {
        console.error('Error resetting reCAPTCHA:', e);
      }
    }
  };

  return { getResponse, reset, isReady: widget !== null };
}
