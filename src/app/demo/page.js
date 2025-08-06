"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, Mail, User, Building } from 'lucide-react';

const DemoPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    useCase: '',
    otherUseCase: '',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const useCaseOptions = [
    "Executive or stakeholder presentations",
    "Sales or business development use",
    "Client-facing consulting deliverables",
    "Public communication or advocacy / non-profit",
    "Internal team alignment or planning",
    "Data exploration / analysis with AI",
    "Personal data - health / stocks / sports",
    "Education or Research",
    "Other (please specify)"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit demo request');
      }

      const result = await response.json();
      console.log('Demo request submitted successfully:', result);
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting demo request:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Navbar />
        <div className="pt-20">
          <div className="max-w-2xl mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-6">Thank You!</h1>
              <p className="text-xl text-gray-400 mb-8">
                Your demo request has been submitted successfully. We'll be in touch within 24 hours to schedule your personalized Flow Immersive demonstration.
              </p>
              <div className="space-y-4 text-gray-300">
                <p>✅ Request sent to our team</p>
                <p>✅ Confirmation email sent to {formData.email}</p>
                <p>✅ We'll contact you within 24 hours</p>
              </div>
              <div className="mt-8">
                <Button
                  onClick={() => window.location.href = '/'}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  Return to Home
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Schedule a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Demo</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Experience Flow Immersive's AR data visualization platform firsthand. 
                Tell us about your use case and we'll customize the demo to show you exactly how Flow can transform your data storytelling.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Demo Request Form */}
        <section className="pb-20">
          <div className="max-w-2xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-slate-900/50 border-blue-500/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white">Request Your Demo</CardTitle>
                  <CardDescription className="text-gray-400">
                    Fill out the form below and we'll be in touch within 24 hours to schedule your personalized demonstration.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your-email@company.com"
                        className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500"
                      />
                    </div>

                    {/* First and Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-white">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="First"
                          className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-white">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Last"
                          className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-white">Company name (or self) *</Label>
                      <Input
                        id="company"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your Company Name"
                        className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500"
                      />
                    </div>

                    {/* Use Case */}
                    <div className="space-y-2">
                      <Label htmlFor="useCase" className="text-white">What are you looking to accomplish? *</Label>
                      <select
                        id="useCase"
                        name="useCase"
                        required
                        value={formData.useCase}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select your primary use case...</option>
                        {useCaseOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Other Use Case (conditional) */}
                    {formData.useCase === 'Other (please specify)' && (
                      <div className="space-y-2">
                        <Label htmlFor="otherUseCase" className="text-white">Please specify your use case *</Label>
                        <Input
                          id="otherUseCase"
                          name="otherUseCase"
                          required
                          value={formData.otherUseCase}
                          onChange={handleInputChange}
                          placeholder="Describe your specific use case"
                          className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500"
                        />
                      </div>
                    )}

                    {/* Additional Details */}
                    <div className="space-y-2">
                      <Label htmlFor="details" className="text-white">Tell us more about your use case (optional)</Label>
                      <Textarea
                        id="details"
                        name="details"
                        value={formData.details}
                        onChange={handleInputChange}
                        placeholder="Any additional context about your data visualization needs, team size, timeline, or specific features you're interested in..."
                        rows={4}
                        className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 text-lg"
                    >
                      {isSubmitting ? 'Submitting...' : 'Request Demo'}
                    </Button>
                  </form>

                  <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div className="text-sm text-gray-300">
                        <p className="font-medium text-white mb-1">What happens next?</p>
                        <ul className="space-y-1 text-gray-400">
                          <li>• We'll review your request within 24 hours</li>
                          <li>• Our team will reach out to schedule your demo</li>
                          <li>• We'll customize the demonstration to your specific use case</li>
                          <li>• Demos typically last 30-45 minutes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default DemoPage;