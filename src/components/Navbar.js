"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              {/* Flow logo */}
              <img 
                src="/flow-logo-400x180.png" 
                alt="Flow Logo" 
                className="h-8 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                }}
              />
              <div className="text-2xl font-bold text-white hidden">
                Flow <span className="text-blue-400">Immersive</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">
              About Us
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-blue-400 transition-colors">
              Blog
            </Link>
            <div className="relative">
              <button
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                onMouseEnter={() => setIsFeaturesOpen(true)}
              >
                Features
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {isFeaturesOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-blue-500/20 rounded-lg shadow-xl z-50"
                  onMouseLeave={() => setIsFeaturesOpen(false)}
                >
                  <Link
                    href="/flow-editor"
                    className="block px-4 py-3 text-gray-300 hover:text-blue-400 hover:bg-slate-800/50 transition-colors border-b border-slate-700/50"
                    onClick={() => setIsFeaturesOpen(false)}
                  >
                    Flow Editor
                  </Link>
                  <Link
                    href="/flowai"
                    className="block px-4 py-3 text-gray-300 hover:text-blue-400 hover:bg-slate-800/50 transition-colors border-b border-slate-700/50"
                    onClick={() => setIsFeaturesOpen(false)}
                  >
                    Flow AI
                  </Link>
                  <Link
                    href="/ar-data-room"
                    className="block px-4 py-3 text-gray-300 hover:text-blue-400 hover:bg-slate-800/50 transition-colors border-b border-slate-700/50"
                    onClick={() => setIsFeaturesOpen(false)}
                  >
                    AR Data Room
                  </Link>
                  <Link
                    href="/htc-vive-app"
                    className="block px-4 py-3 text-gray-300 hover:text-blue-400 hover:bg-slate-800/50 transition-colors border-b border-slate-700/50"
                    onClick={() => setIsFeaturesOpen(false)}
                  >
                    HTC Vive App
                  </Link>
                  <Link
                    href="/meta-quest-app"
                    className="block px-4 py-3 text-gray-300 hover:text-blue-400 hover:bg-slate-800/50 transition-colors rounded-b-lg"
                    onClick={() => setIsFeaturesOpen(false)}
                  >
                    Meta Quest App
                  </Link>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <a 
                href="https://a.flow.gl/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                Live Demo
              </a>
              <Link href="/demo">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2.5 text-sm font-bold shadow-xl hover:scale-105 hover:shadow-cyan-500/25 ring-2 ring-cyan-400/30 transition-all duration-300">
                  📅 Schedule Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-blue-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-blue-500/20">
            <div className="flex flex-col space-y-4 pt-4">
              <Link 
                href="/" 
                className="text-gray-300 hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-gray-300 hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-300 hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <div className="space-y-2">
                <div className="text-gray-300 font-medium">Features</div>
                <div className="pl-4 space-y-2">
                  <Link 
                    href="/flow-editor" 
                    className="block text-gray-400 hover:text-blue-400 transition-colors text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Flow Editor
                  </Link>
                  <Link 
                    href="/flowai" 
                    className="block text-gray-400 hover:text-blue-400 transition-colors text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Flow AI
                  </Link>
                  <Link 
                    href="/ar-data-room" 
                    className="block text-gray-400 hover:text-blue-400 transition-colors text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    AR Data Room
                  </Link>
                  <Link 
                    href="/htc-vive-app" 
                    className="block text-gray-400 hover:text-blue-400 transition-colors text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    HTC Vive App
                  </Link>
                  <Link 
                    href="/meta-quest-app" 
                    className="block text-gray-400 hover:text-blue-400 transition-colors text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Meta Quest App
                  </Link>
                </div>
              </div>
              <a 
                href="https://a.flow.gl/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Live Demo
              </a>
              <Link href="/demo" onClick={() => setIsMenuOpen(false)}>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white w-full px-6 py-3 font-bold shadow-xl hover:scale-105 hover:shadow-cyan-500/25 ring-2 ring-cyan-400/30 transition-all duration-300">
                  📅 Schedule Demo
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;