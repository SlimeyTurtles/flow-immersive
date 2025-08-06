"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Monitor, MessageSquare, Layers3 } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function HTCViveAppPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center px-6 pt-32">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/flow/htc.webp"
                  alt="HTC Vive Logo"
                  className="h-16 w-auto object-contain"
                />
                <Badge variant="outline" className="border-green-500 text-green-400 px-4 py-2 bg-green-500/10">
                  Partnership
                </Badge>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                Flow for <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">VIVE XR Elite</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Go beyond 2D images in the conference room with immersive data using the VIVE XR Elite. Collaborate seamlessly with colleagues and make informed, data-driven decisions remotely or in person, floating visualizations above the conference room table.
              </p>
              
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                All meeting participants become engaged in the experience, transforming how you understand and utilize your data.
              </p>
              
              <Link href="/demo">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Experience Flow on Vive
                </Button>
              </Link>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-green-500/20 bg-slate-800">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://player.vimeo.com/video/1036876773?autoplay=1&loop=1&muted=1&background=1"
                  frameBorder="0" 
                  allowFullScreen
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Transform Your Conference Room Experience
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Experience the power of immersive data visualization with VIVE XR Elite's cutting-edge mixed reality technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-900/50 border-green-500/20 h-full">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Immersive Collaboration</CardTitle>
                <CardDescription className="text-gray-400">
                  Float visualizations above conference tables and engage all meeting participants in shared data experiences
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-900/50 border-emerald-500/20 h-full">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Beyond 2D Limitations</CardTitle>
                <CardDescription className="text-gray-400">
                  Break free from flat screens and explore your data in three-dimensional space with natural interactions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-900/50 border-teal-500/20 h-full">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers3 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Hybrid Meetings</CardTitle>
                <CardDescription className="text-gray-400">
                  Seamlessly blend remote and in-person participants in shared mixed reality data environments
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powered by VIVE XR Elite
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Experience Flow's advanced data visualization capabilities with the precision and comfort of VIVE's enterprise-grade mixed reality headset.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Enterprise-Ready Features</h3>
              <ul className="space-y-4">
                {[
                  "High-resolution 4K displays for crystal-clear data visualization",
                  "Precise inside-out tracking for natural interaction",
                  "Comfortable design for extended collaboration sessions", 
                  "Seamless wireless connectivity",
                  "Professional-grade build quality"
                ].map((feature, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-gray-300"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-4"></div>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border border-green-500/20"
            >
              <div className="text-center">
                <img
                  src="/flow/htc.webp"
                  alt="HTC Vive XR Elite"
                  className="w-32 h-auto mx-auto mb-6 filter brightness-110"
                />
                <h4 className="text-xl font-bold text-white mb-2">VIVE XR Elite</h4>
                <p className="text-gray-400">
                  The ultimate mixed reality headset for enterprise data visualization and collaboration
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Data Meetings?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Experience the future of data collaboration with Flow on VIVE XR Elite. 
            Schedule a demonstration and see how immersive visualization can revolutionize your decision-making process.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/demo">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg px-8 py-4">
                <MessageSquare className="w-5 h-5 mr-2" />
                Schedule Demo
              </Button>
            </Link>
            <a href="https://a.flow.gl/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="border-2 border-green-400 text-green-400 px-8 py-4 text-lg hover:bg-green-400 hover:text-white transition-all">
                Try Live Demo
              </Button>
            </a>
          </div>
          
          <div>
            <Link href="/" className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}