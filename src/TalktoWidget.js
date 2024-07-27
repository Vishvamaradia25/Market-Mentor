import React, { useEffect } from 'react';

function TawkToWidget() {
    useEffect(() => {
        console.log('TawkToWidget mounted');
        var s1 = document.createElement("script");
        s1.async = true;
        s1.src = 'https://embed.tawk.to/66a3e6f7becc2fed692baab4/1i3o3sed4';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        document.body.appendChild(s1);
        console.log('Tawk.to script added to DOM');
      }, []);

  return null;
}

export default TawkToWidget;