"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Monitor, MessageSquare, Layers3, Zap, Eye } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function QuestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center px-6 pt-32">
        {/* Background blur effects */}
        <div className="absolute top-56 right-32 w-60 h-56 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-32 w-40 h-36 bg-cyan-500/15 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <div className="flex items-center gap-4 mb-6">
                <Badge variant="outline" className="border-blue-500 text-blue-400 px-4 py-2 bg-blue-500/10">
                  Meta Quest Native App
                </Badge>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                Flow for <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Quest</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                What if you could see your data floating above a conference room table, and you can interact with every detail, collaborating with colleagues whether in person or remote to make great data-driven decisions?
              </p>
              
              <a href="https://www.meta.com/experiences/flow-immersive/5021492451292206/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg px-8 py-4">
                  Get it on the App Store
                </Button>
              </a>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 bg-slate-800 border border-blue-500/20">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://player.vimeo.com/video/998208805?autoplay=1&loop=1&muted=1&background=1"
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

      {/* Native Performance Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
              Now with <span className="text-blue-500">Native Performance</span> and <span className="text-purple-500">Meta Avatars</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Flow Immersive turns ineffective communications about data into interactive 3D data visualizations and stories.
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Think of a Flow as a document that can be performed either in a browser or in an installed application for Meta Quest devices. The advantages of the Native app are:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-4 mt-3 flex-shrink-0"></div>
                  <span>The inclusion of Meta Avatars within meetings</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-4 mt-3 flex-shrink-0"></div>
                  <span>The ability to record and experience pre-recorded Avatar Stories, where the presenter saves a walk-through of the steps and interactions</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/20">
                <div className="text-center">
                  <Users className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-white font-semibold">Meta Avatars</p>
                  <p className="text-gray-400 text-sm">Enhanced Collaboration</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Use Cases</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Hybrid meetings co-present and remote</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div {...fadeInUp}>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                The Quest app is ideal for the AR Data Room, where users join co-present in mixed reality, as well as remotely in VR headsets or on computer or phone from the browser.
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                The Quest app is great for kiosk auto-boot applications, where the user can grab the headset which boots into Flow, glance at a QR-coded mat, and immediately join other users in a data experience.
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                We are actively working on other platforms, please be in touch to inquire how we can support additional devices.
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 bg-slate-800 border border-blue-500/20">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/36wlUhk7ANc"
                  title="Flow Quest Hybrid Meetings Demo"
                  frameBorder="0" 
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-900/50 to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <img 
                  src="/flow/meta.jpg" 
                  alt="Meta Quest"
                  className="w-16 h-16 object-contain filter brightness-200"
                />
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Install the <span className="text-purple-400">Flow Quest App</span>
            </h2>
            
            <h3 className="text-2xl font-bold text-white mb-8">
              The Flow Quest App is available on the Meta App Store!
            </h3>

            <div className="mb-12">
              <img 
                src="https://static.tildacdn.net/tild3632-3163-4731-b434-346337623435/hero.png"
                alt="Flow Quest App Store"
                className="max-w-full h-auto mx-auto rounded-xl shadow-lg"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="https://www.meta.com/experiences/flow-immersive/5021492451292206/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg px-8 py-4">
                  Get it on the App Store
                </Button>
              </a>
              <Link href="/demo">
                <Button variant="outline" size="lg" className="border-2 border-blue-400 text-blue-400 px-8 py-4 text-lg hover:bg-blue-400 hover:text-white transition-all">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Flow for Quest?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Experience the ultimate combination of native performance and intuitive data visualization.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-900/50 border-blue-500/20 h-full">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Native Performance</CardTitle>
                <CardDescription className="text-gray-400">
                  Optimized specifically for Meta Quest hardware, delivering smooth 60fps+ experiences with minimal latency
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-900/50 border-purple-500/20 h-full">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Meta Avatars</CardTitle>
                <CardDescription className="text-gray-400">
                  Connect with your team using Meta's realistic avatars, making remote collaboration feel natural and engaging
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-900/50 border-emerald-500/20 h-full">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">AR Data Room</CardTitle>
                <CardDescription className="text-gray-400">
                  Transform any space into a collaborative data environment with mixed reality passthrough technology
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <section className="py-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}