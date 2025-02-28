import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="py-8" style={{ backgroundColor: '#003939' }}>
      <div className="container mx-auto px-4">
        {/* Top Section - Title, Links, and Social Icons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
          {/* Title */}
          <div className="text-2xl font-bold text-gray-300">
            Book Store
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <a href="#contact" className="text-gray-300 hover:text-white">Contact</a>
            <a href="#terms" className="text-gray-300 hover:text-white">Terms of Use</a>
            <a href="#privacy" className="text-gray-300 hover:text-white">Privacy Policy</a>
            <a href="#faq" className="text-gray-300 hover:text-white">FAQ</a>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              <FaFacebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="text-center border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} Book Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;