import React from 'react';
const script = `https://api.openweathermap.org/v1.0/js/api.js?key={YOUR_API_KEY}`;

export default () => {
  React.useEffect(() => {
    const scriptElement = document.createElement('script');
    scriptElement.src = script;
    scriptElement.async = true;
    document.body.appendChild(scriptElement);
    return () => {
      document.body.removeChild(scriptElement);
    };
  }, []);

  return null;
};
