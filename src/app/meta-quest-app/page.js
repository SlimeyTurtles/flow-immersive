"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Eye, Smartphone, Wifi, Battery, Zap, Users, Cloud, Play } from 'lucide-react';

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

export default function MetaQuestAppPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Play className="w-8 h-8 text-purple-400" />
              <Badge variant="outline" className="border-purple-500 text-purple-400 px-4 py-2">
                Standalone VR
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Meta Quest App
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Wireless freedom meets powerful data visualization. Experience immersive analytics 
              anywhere with our standalone VR app designed specifically for Meta Quest devices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Download className="w-5 h-5 mr-2" />
                Get on Quest Store
              </Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-800">
                <Eye className="w-5 h-5 mr-2" />
                Preview Experience
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
              <Card className="bg-slate-900/50 border-purple-500/20 h-full">
                <CardHeader>
                  <Wifi className="w-12 h-12 text-purple-400 mb-4" />
                  <CardTitle className="text-white">Wireless Freedom</CardTitle>
                  <CardDescription className="text-gray-400">
                    No cables, no external sensors - just pure wireless VR data exploration
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/50 border-pink-500/20 h-full">
                <CardHeader>
                  <Battery className="w-12 h-12 text-pink-400 mb-4" />
                  <CardTitle className="text-white">Optimized Performance</CardTitle>
                  <CardDescription className="text-gray-400">
                    Built for mobile processors with intelligent data streaming and caching
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/50 border-indigo-500/20 h-full">
                <CardHeader>
                  <Users className="w-12 h-12 text-indigo-400 mb-4" />
                  <CardTitle className="text-white">Social Features</CardTitle>
                  <CardDescription className="text-gray-400">
                    Share VR sessions with colleagues across different locations instantly
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Device Compatibility */}
      <section className="py-20 px-6 bg-slate-900/20">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Device Compatibility
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Optimized for the full range of Meta Quest devices with varying feature sets
            </p>
          </motion.div>

          <motion.div variants={staggerChildren} initial="initial" animate="animate" className="grid md:grid-cols-3 gap-8">
            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Play className="w-5 h-5 mr-2 text-purple-400" />
                    Quest 2
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Resolution:</span>
                    <span className="text-white">1832×1920 per eye</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Refresh Rate:</span>
                    <span className="text-white">90Hz (120Hz experimental)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Data Points:</span>
                    <span className="text-white">Up to 500K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hand Tracking:</span>
                    <span className="text-white">✓ Supported</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/50 border-pink-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Play className="w-5 h-5 mr-2 text-pink-400" />
                    Quest Pro
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Resolution:</span>
                    <span className="text-white">1800×1920 per eye</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Refresh Rate:</span>
                    <span className="text-white">90Hz native</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Data Points:</span>
                    <span className="text-white">Up to 1M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Eye Tracking:</span>
                    <span className="text-white">✓ Enhanced</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/50 border-indigo-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Play className="w-5 h-5 mr-2 text-indigo-400" />
                    Quest 3
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Resolution:</span>
                    <span className="text-white">2064×2208 per eye</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Refresh Rate:</span>
                    <span className="text-white">90Hz/120Hz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Data Points:</span>
                    <span className="text-white">Up to 2M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mixed Reality:</span>
                    <span className="text-white">✓ Full Color</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Unique Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Quest-Exclusive Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Take advantage of unique Meta Quest capabilities for enhanced data visualization
            </p>
          </motion.div>

          <motion.div variants={staggerChildren} initial="initial" animate="animate" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/50 border-purple-500/20 text-center h-full">
                <CardContent className="pt-6">
                  <Cloud className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Cloud Sync</h3>
                  <p className="text-gray-400 text-sm">
                    Seamlessly sync data and settings across all your Quest devices
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/50 border-pink-500/20 text-center h-full">
                <CardContent className="pt-6">
                  <Smartphone className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Mobile Companion</h3>
                  <p className="text-gray-400 text-sm">
                    Control and configure your VR experience from your phone
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/50 border-indigo-500/20 text-center h-full">
                <CardContent className="pt-6">
                  <Zap className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Instant On</h3>
                  <p className="text-gray-400 text-sm">
                    Jump into your data visualizations instantly with no setup time
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-slate-900/50 border-cyan-500/20 text-center h-full">
                <CardContent className="pt-6">
                  <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Horizon Workrooms</h3>
                  <p className="text-gray-400 text-sm">
                    Present data visualizations in Meta's collaborative workspaces
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
              Experience Data Without Limits
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Get the Meta Quest app and unlock the freedom of wireless VR data visualization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Download className="w-5 h-5 mr-2" />
                Download from Quest Store
              </Button>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Download className="w-5 h-5 mr-2" />
                Sideload APK
              </Button>
            </div>
            <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}