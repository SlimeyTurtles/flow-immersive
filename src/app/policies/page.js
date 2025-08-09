"use client";

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PoliciesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="pt-20 pb-8">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-4"
            >
              <h1 className="text-5xl font-bold text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Policies and Support
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Information about our services, policies, and how to get support.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="pt-4 pb-12">
          <div className="max-w-4xl mx-auto px-6">
            {/* What We Are Selling Section */}
            <Card className="bg-slate-900/50 border-blue-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-white">What We Are Selling</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  Flow Immersive, or "Flow", provides software as a service for 3D data visualization.
                </p>
              </CardContent>
            </Card>

            {/* Fulfillment Policy Section */}
            <Card className="bg-slate-900/50 border-blue-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Fulfillment Policy: Purchasing a License, Cancellations, and Refunds</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  Flow is purchased through custom invoicing or through credit card payment using Stripe. All transactions are processed in US dollars.
                </p>
                
                <p>
                  Subscription cancellations and refunds are provided upon request to <a href="mailto:info@flow.gl" className="text-blue-400 hover:text-blue-300 underline">info@flow.gl</a>.
                </p>
              </CardContent>
            </Card>

            {/* Legal Documents Section */}
            <Card className="bg-slate-900/50 border-blue-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Legal Documents</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  Our Privacy Policy can be found here: 
                  <a href="https://a.flow.gl/documents/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline ml-2">
                    https://a.flow.gl/documents/privacy-policy
                  </a>
                </p>
                
                <p>
                  Our Terms of Service can be found here: 
                  <a href="https://a.flow.gl/documents/terms-of-use" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline ml-2">
                    https://a.flow.gl/documents/terms-of-use
                  </a>
                </p>
              </CardContent>
            </Card>

            {/* Support Section */}
            <Card className="bg-slate-900/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Support</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  For support, please contact us through one of the following methods:
                </p>
                
                <ul className="space-y-3 mt-4">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      Email us at <a href="mailto:info@flow.gl" className="text-blue-400 hover:text-blue-300 underline">info@flow.gl</a>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Submit a request through any of the forms on this website</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>
                      Use our dedicated support form 
                      <a href="/support" className="text-blue-400 hover:text-blue-300 underline ml-1">here</a>
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default PoliciesPage;