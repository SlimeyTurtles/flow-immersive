"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export default function FlowEditor() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Flow <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Editor</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-8">
              Web-based, no-code tool to create Flows
            </h2>
          </motion.div>

          {/* Content Section */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Text Content */}
            <div>
              <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-lg text-gray-300 leading-relaxed space-y-6">
                    <p>
                      The Flow Editor is the web-based, no-code tool to create Flows, whether for use in headset in an AR data room, for an AR video, or an educational AI data experience.
                    </p>
                    <p>
                      The Editor screen is organized into steps (think: slides), and each of which contains a Swarm (think: dots in space representing data). The Swarm has components, like Labels, Connections, and Legends.
                    </p>
                    <p>
                      Data can be sourced from CSV files, Google Sheets, or the Flow Push Dataset API. See our Magic help to get more information on all of these and much more about the Editor and about Flow.
                    </p>
                  </div>
                  
                  <div className="mt-8">
                    <Link href="/demo">
                      <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/25">
                        Reach out to learn more
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Image */}
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-6">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <img
                      src="https://optim.tildacdn.net/tild3332-6564-4662-b336-343966326365/-/format/webp/Editor.png.webp"
                      alt="Flow Editor Interface"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://static.tildacdn.net/tild3332-6564-4662-b336-343966326365/Editor.png";
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-20"
          >
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              Key Features
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "No-Code Interface",
                  description: "Create complex data visualizations without writing a single line of code"
                },
                {
                  title: "Multiple Data Sources",
                  description: "Connect CSV files, Google Sheets, or use our Push Dataset API"
                },
                {
                  title: "AR/VR Ready",
                  description: "Optimized for headsets and immersive data room experiences"
                }
              ].map((feature, index) => (
                <Card key={index} className="bg-slate-800/50 border-blue-500/20 h-full">
                  <CardContent className="p-6 text-center">
                    <h4 className="text-xl font-semibold text-white mb-4">
                      {feature.title}
                    </h4>
                    <p className="text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}