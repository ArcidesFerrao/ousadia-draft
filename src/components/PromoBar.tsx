import React, { useState } from "react";

export const PromoBar = () =>
  // { message, link }
  {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;
    return (
      <div>
        {/* <a href={link}>
            {message}
        </a> */}
        Get 10% off...
        <button onClick={() => setIsVisible(false)}>X</button>
      </div>
    );
  };
