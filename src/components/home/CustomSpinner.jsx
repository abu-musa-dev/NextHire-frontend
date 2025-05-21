import React, { useEffect } from 'react';

const CustomSpinner = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .spinner-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

      .rotating-shape {
        width: 40px;
        height: 40px;
        background:
          conic-gradient(
            from 45deg,
            transparent 0deg 90deg,
            #00734d 90deg 180deg,
            transparent 180deg 270deg,
            #00734d 270deg 360deg
          );
        border-radius: 50%;
        animation: variable-spin 4s infinite;
        animation-timing-function: linear;
      }

      @keyframes variable-spin {
        0% {
          transform: rotate(0deg);
        }
        60% {
          transform: rotate(1440deg); /* 4 full spins = fast part */
        }
        100% {
          transform: rotate(1620deg); /* only 0.5 spin = slow part */
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="spinner-wrapper">
      <div className="rotating-shape"></div>
    </div>
  );
};

export default CustomSpinner;
