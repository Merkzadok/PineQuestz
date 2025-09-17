"use client";

import React, { useState } from "react";
import { Users, Book, Menu, X } from "lucide-react";
import Link from "next/link";

const MainHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Reading", href: "/main/wordSentence" },
  ];

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                <Users className="w-5 h-5 text-gray-700" />
              </div>
              <span className="text-xl font-light text-gray-900 tracking-tight">
                LittleReaders
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
              >
                {link.name}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></div>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden border-t border-gray-100 transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)} // close menu on click
              >
                {link.name === "Reading" ? (
                  <div className="flex items-center gap-2">
                    <Book className="w-4 h-4" />
                    {link.name}
                  </div>
                ) : (
                  link.name
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
