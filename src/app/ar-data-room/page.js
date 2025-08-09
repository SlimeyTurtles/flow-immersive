"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CTASection from '@/components/CTASection';
import { ArrowLeft, Users, Monitor, MessageSquare, Layers3 } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function ARDataRoomPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Badge variant="outline" className="border-blue-500 text-blue-400 px-4 py-2 bg-blue-500/10">
                AI-Enhanced AR Product
              </Badge>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              The AR <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Data Room</span>
            </h1>
            
            <h2 className="text-2xl lg:text-3xl font-semibold text-blue-300 mb-8">
              The future of work & a reason to gather
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              The Flow Augmented Reality (AR) Data Room is an AI-enhanced product offering resulting from the collaboration between headset manufacturers and Flow Immersive to transform how people collaborate and communicate with data.
            </p>
            
            <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto">
              The AR Data Room uses the best-in-class AR hardware combined with best-in-class collaborative 3D data visualization software. This combination has the power to transform the effectiveness of in-person and remote meetings that involve data.
            </p>
            
            <Link href="/demo">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <MessageSquare className="w-5 h-5 mr-2" />
                Reach out to learn more
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-6 bg-slate-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See the AR Data Room in Action
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Watch how teams collaborate in augmented reality to explore and understand complex data like never before.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 bg-slate-800">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/iMyIT2ahu-U?&enablejsapi=1"
                frameBorder="0" 
                allowFullScreen
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Transform Your Data Meetings
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Experience the power of collaborative AR data visualization that revolutionizes how teams interact with information.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-900/50 border-blue-500/20 h-full">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-xl">Best-in-Class AR Hardware</CardTitle>
                <CardDescription className="text-gray-400">
                  Cutting-edge augmented reality technology that seamlessly blends digital data with the physical world
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-900/50 border-cyan-500/20 h-full">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-xl">3D Data Visualization</CardTitle>
                <CardDescription className="text-gray-400">
                  Transform complex datasets into intuitive 3D visualizations that everyone can understand and interact with
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-900/50 border-purple-500/20 h-full">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-xl">Collaborative Excellence</CardTitle>
                <CardDescription className="text-gray-400">
                  Enable both in-person and remote team members to collaborate naturally in shared AR data environments
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection 
        title="Ready to Transform Your Meetings?"
        subtitle="Join the companies already revolutionizing their data collaboration with the AR Data Room. Experience the future of work today."
        backgroundImage="/flow/big-globe.png"
      />
      
      <section className="py-8 text-center">
        <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </section>
    </div>
  );
}