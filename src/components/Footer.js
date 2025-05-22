import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 px-4 md:px-8">
        
        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wide">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/returns" className="hover:text-white transition">Return & Exchange</a></li>
            <li><a href="/trackorder" className="hover:text-white transition">Track Order</a></li>
            <li><a href="/shippinginfo" className="hover:text-white transition">Shipping Info</a></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wide">About Us</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/companyinfo" className="hover:text-white transition">Company Info</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
            <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
            <li><a href="/terms" className="hover:text-white transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* My Account */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wide">My Account</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/login" className="hover:text-white transition">Login</a></li>
            <li><a href="/signup" className="hover:text-white transition">Register</a></li>
            <li><a href="/wishlist" className="hover:text-white transition">Wishlist</a></li>
            <li><a href="/my-orders" className="hover:text-white transition">Order History</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wide">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/profile.php?id=100084888040335"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/prestigebadlapur?igsh=MW5uZjM5cHgwNDI5cg=="
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/918956421403"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Payment Info and Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center px-4 md:px-8">
        <div className="flex justify-center space-x-6 mb-4 text-2xl">
          <FaCcVisa />
          <FaCcMastercard />
        </div>
        <div className="text-sm space-y-1">
          <p><strong>CIN NO:</strong> 27AADPI3416R1ZF</p>
          <p>
            For Orders & Delivery: <a href="mailto:support@gsienterprise.com" className="text-blue-400 hover:underline">support@gsienterprise.com</a>
          </p>
          <p>
            For Product & After Sales: <a href="mailto:feedback@gsienterprises.com" className="text-blue-400 hover:underline">feedback@gsienterprises.com</a>
          </p>
          <p><strong>Call Us:</strong> +91-8956421403</p>
          <p className="text-gray-500">(Monday to Sunday, 10 AM to 9 PM)</p>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} GSI Enterprises Store. All rights reserved.
        </p>
        <p className="text-xs text-gray-500">Designed with ❤️ by Kajal Mishra<Link to='/dashboard'>dash</Link></p>
      </div>
    </footer>
  );
}

export default Footer;
