"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Eye, Monitor, Headphones, Gamepad2, Zap, Users, Settings } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HTCViveAppPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Monitor className="w-8 h-8 text-green-400" />
              <Badge variant="outline" className="border-green-500 text-green-400 px-4 py-2">
                VR Application
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              HTC Vive App
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Immerse yourself in the ultimate VR data visualization experience. Navigate through 
              complex datasets in room-scale virtual reality with precision tracking and intuitive controls.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                <Download className="w-5 h-5 mr-2" />
                Download VR App
              </Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-800">
                <Eye className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </motion.div>

          {/* Key Features */}
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/50 border-green-500/20 h-full">
                <CardHeader>
                  <Gamepad2 className="w-12 h-12 text-green-400 mb-4" />
                  <CardTitle className="text-white">Room-Scale Interaction</CardTitle>
                  <CardDescription className="text-gray-400">
                    Walk around your data, reach out and manipulate visualizations naturally
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/50 border-emerald-500/20 h-full">
                <CardHeader>
                  <Zap className="w-12 h-12 text-emerald-400 mb-4" />
                  <CardTitle className="text-white">High-Performance Rendering</CardTitle>
                  <CardDescription className="text-gray-400">
                    Optimized for 90fps with support for millions of data points
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/50 border-teal-500/20 h-full">
                <CardHeader>
                  <Users className="w-12 h-12 text-teal-400 mb-4" />
                  <CardTitle className="text-white">Multi-User Collaboration</CardTitle>
                  <CardDescription className="text-gray-400">
                    Connect multiple VR headsets for shared data exploration sessions
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-20 px-6 bg-slate-900/20">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              System Requirements
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Ensure your system meets these requirements for the optimal VR experience
            </p>
          </motion.div>

          <motion.div variants={staggerChildren} initial="initial" animate="animate" className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/50 border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-green-400" />
                    Minimum Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">CPU:</span>
                    <span className="text-white">Intel i5-4590 / AMD FX 8350</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">GPU:</span>
                    <span className="text-white">NVIDIA GTX 1060 / AMD RX 480</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">RAM:</span>
                    <span className="text-white">8GB DDR4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">USB:</span>
                    <span className="text-white">3x USB 3.0, 1x USB 2.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">OS:</span>
                    <span className="text-white">Windows 10</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/50 border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-emerald-400" />
                    Recommended Specs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">CPU:</span>
                    <span className="text-white">Intel i7-8700K / AMD Ryzen 7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">GPU:</span>
                    <span className="text-white">NVIDIA RTX 3070 / AMD RX 6700 XT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">RAM:</span>
                    <span className="text-white">16GB+ DDR4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Storage:</span>
                    <span className="text-white">SSD with 10GB+ free space</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Play Area:</span>
                    <span className="text-white">2m x 1.5m minimum</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* VR Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              VR-Optimized Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience data visualization like never before with these VR-specific capabilities
            </p>
          </motion.div>

          <motion.div variants={staggerChildren} initial="initial" animate="animate" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/50 border-green-500/20 text-center h-full">
                <CardContent className="pt-6">
                  <Headphones className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Spatial Audio</h3>
                  <p className="text-gray-400 text-sm">
                    3D positioned audio cues for data points and interactions
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/50 border-emerald-500/20 text-center h-full">
                <CardContent className="pt-6">
                  <Gamepad2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Hand Tracking</h3>
                  <p className="text-gray-400 text-sm">
                    Natural hand gestures for intuitive data manipulation
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/50 border-teal-500/20 text-center h-full">
                <CardContent className="pt-6">
                  <Monitor className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Mirror Display</h3>
                  <p className="text-gray-400 text-sm">
                    Share your VR view on external displays for presentations
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/50 border-cyan-500/20 text-center h-full">
                <CardContent className="pt-6">
                  <Settings className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Comfort Settings</h3>
                  <p className="text-gray-400 text-sm">
                    Customizable comfort options to reduce motion sickness
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 px-6 bg-slate-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Step Into Your Data
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Download the HTC Vive app and experience the future of data visualization in virtual reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                <Download className="w-5 h-5 mr-2" />
                Download from Steam
              </Button>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Download className="w-5 h-5 mr-2" />
                Download from Viveport
              </Button>
            </div>
            <Link href="/" className="inline-flex items-center text-green-400 hover:text-green-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}