"use client";

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, Server, UserCheck, FileText } from 'lucide-react';

const DataSecurityPage = () => {
  const securityFeatures = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Data Encryption",
      description: "All data transmitted and stored within Flow is protected using industry-standard encryption protocols, ensuring that your sensitive information is safeguarded from unauthorized access."
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Secure Hosting Options",
      description: "Choose from cloud-hosted deployments on trusted platforms like AWS, Azure, Google Cloud Platform (GCP), or Oracle Cloud Infrastructure (OCI), or opt for private cloud or on-premises installations tailored to your organization's security requirements."
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Access Control",
      description: "Flow provides robust role-based access control, giving administrators fine-grained control over who can access, view, and manipulate data within the platform."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Regular Backups and Redundancy",
      description: "Our systems are designed for maximum uptime, with automated daily backups and built-in redundancy measures to ensure data integrity and availability."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="pt-20 pb-8">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-4"
            >
              <h1 className="text-5xl font-bold text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Data Security
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                None of the 'cool' visualizations would be useful without a robust security architecture.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Security Features Grid */}
        <section className="pt-4 pb-12">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold text-white mb-12 text-center"
            >
              Key Security Features
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="bg-slate-900/50 border-blue-500/20 hover:border-blue-400/40 transition-colors h-full">
                    <CardHeader>
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 text-white">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Security Information */}
        <section className="py-12 bg-slate-900/50">
          <div className="max-w-4xl mx-auto px-6">
            <Card className="bg-slate-900/50 border-blue-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-3xl text-white">Our Security Architecture</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-6">
                <p>
                  Our shared instance at <a href="https://a.flow.gl" className="text-blue-400 hover:text-blue-300 underline">a.flow.gl</a> is 
                  run in AWS with logical data separation.
                </p>
                
                <p>
                  We can provide private cloud instances on most hosting services or on-premises UNIX installations for an additional fee.
                </p>

                <p>
                  We complete external third-party security audits and have successfully completed audits with some of the largest companies.
                </p>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card className="bg-slate-900/50 border-blue-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  For detailed security specifications or to discuss a custom security solution, please contact us and let our experts guide you through your options.
                </p>
                
                <p>
                  Data analytics and data visualization can be difficult areas to approach without special skillsets. We want to ensure you have success with our software, and can help you get out of the blocks to define the scope of your Flow, build data integrations, provide API access to push data to Flow, set up on-premises installations, build Flows for you, create custom features, and track success metrics.
                </p>

                <div className="mt-6">
                  <a href="/demo" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300">
                    Get in Touch
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default DataSecurityPage;