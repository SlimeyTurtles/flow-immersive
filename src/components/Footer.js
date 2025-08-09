"use client";

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-slate-950 py-12 border-t border-blue-500/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Flow Logo */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <img 
              src="/flow-logo-400x180.png" 
              alt="Flow Logo" 
              className="h-12 w-auto mx-auto"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'block';
              }}
            />
            <div className="text-3xl font-bold text-white hidden">
              Flow <span className="text-blue-400">Immersive</span>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/flow-editor" className="hover:text-blue-400 transition-colors">Flow Editor</Link></li>
              <li><Link href="/flowai" className="hover:text-blue-400 transition-colors">FlowAI</Link></li>
              <li><Link href="/ar-data-room" className="hover:text-blue-400 transition-colors">AR Data Room</Link></li>
              <li><Link href="/meta-quest-app" className="hover:text-blue-400 transition-colors">Meta Quest App</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/policies" className="hover:text-blue-400 transition-colors">Policies</Link></li>
              <li><Link href="/data-security" className="hover:text-blue-400 transition-colors">Data Security</Link></li>
              <li><Link href="/demo" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              {/* Hidden admin link - only visible to those who know to look for it */}
              <li><Link href="/admin/login" className="hover:text-blue-400 transition-colors opacity-30 hover:opacity-100">Admin</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
              <li><a href="https://a.flow.gl/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Live Demo</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-gray-400">©2023 Flow Immersive, Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;