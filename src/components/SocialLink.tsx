"use client";

import React from 'react';

interface SocialLinkProps {
  href: string;
  src: string;
  alt: string;
  className?: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, src, alt, className }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`block transition-transform duration-200 hover:scale-105 ${className}`}
    >
      <img src={src} alt={alt} className="w-10 h-10" />
    </a>
  );
};

export default SocialLink;