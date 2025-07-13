import { Link } from "wouter";
import { ShoppingCart, Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-primary text-white p-2 rounded-lg mr-3">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">FriendlyCart</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted shopping companion with amazing deals and quality products.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Wishlist
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
                <span className="text-gray-400">123 Shopping Street, Mumbai, India 400001</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <span className="text-gray-400">+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <span className="text-gray-400">support@friendlycart.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024 FriendlyCart. All rights reserved. |{" "}
            <a href="#" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="#" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
