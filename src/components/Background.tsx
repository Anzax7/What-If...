import React from 'react';

const Background = () => {
  return (
    <div
      className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/images/sci-fi-7134488.jpg')`,
        filter: 'blur(3px) brightness(60%)', // Increased brightness
      }}
    ></div>
  );
};

export default Background;