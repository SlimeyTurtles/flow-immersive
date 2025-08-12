"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import TextareaAutosize from 'react-textarea-autosize';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import { Eye, Edit, Image as ImageIcon, Upload } from 'lucide-react';

const MarkdownEditor = ({ initialContent = '', initialTitle = '', onSave, onCancel, isEditing = false }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [excerpt, setExcerpt] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSlowWarning, setUploadSlowWarning] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [saveSlowWarning, setSaveSlowWarning] = useState(false);
  const fileInputRef = useRef(null);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const uploadImage = async (file) => {
    setUploadingImage(true);
    setUploadProgress(0);
    setUploadSlowWarning(false);
    setUploadError('');
    
    // Show slow upload warning after 3 seconds
    const slowWarningTimer = setTimeout(() => {
      setUploadSlowWarning(true);
    }, 3000);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Simulate progress for better UX
      setUploadProgress(30);
      
      // Add timeout protection (30 seconds for image uploads)
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Upload timed out. Please try again with a smaller image.')), 30000)
      );
      
      const uploadPromise = supabase.storage
        .from('blog-images')
        .upload(filePath, file);
      
      setUploadProgress(70);
      const { error: uploadError } = await Promise.race([uploadPromise, timeoutPromise]);

      if (uploadError) throw uploadError;

      setUploadProgress(90);
      const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setUploadProgress(100);
      clearTimeout(slowWarningTimer);
      setUploadSlowWarning(false);
      
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      clearTimeout(slowWarningTimer);
      setUploadSlowWarning(false);
      setUploadError(error.message || 'Failed to upload image. Please try again.');
      return null;
    } finally {
      setUploadingImage(false);
      setUploadProgress(0);
      clearTimeout(slowWarningTimer);
      // Clear error after 5 seconds if one was set
      setTimeout(() => {
        setUploadError('');
        setUploadSlowWarning(false);
      }, 5000);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      // Insert markdown image syntax at cursor position
      const textarea = document.querySelector('.markdown-textarea');
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const imageMarkdown = `![Alt text](${imageUrl})`;
      
      const newContent = content.substring(0, start) + imageMarkdown + content.substring(end);
      setContent(newContent);
      
      // Reset file input
      e.target.value = '';
    }
  };

  const handleFeaturedImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      setFeaturedImage(imageUrl);
    }
  };

  const handleSave = async (publishNow = false) => {
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setSaveSlowWarning(false);
    
    // Show slow save warning after 5 seconds
    const slowSaveTimer = setTimeout(() => {
      setSaveSlowWarning(true);
    }, 5000);
    
    try {
      const blogData = {
        title: title.trim(),
        slug: generateSlug(title),
        content: content.trim(),
        excerpt: excerpt.trim() || content.substring(0, 200) + '...',
        featured_image: featuredImage || null,
        published: publishNow,
      };

      // Add timeout protection
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timed out')), 30000)
      );
      
      await Promise.race([onSave(blogData), timeoutPromise]);
      
      clearTimeout(slowSaveTimer);
      setSaveSlowWarning(false);
      setSuccess(publishNow ? 'Blog published successfully!' : 'Draft saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      clearTimeout(slowSaveTimer);
      setSaveSlowWarning(false);
      setError(error.message || 'Failed to save blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Error/Success Messages */}
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}
      
      {/* Upload Status Messages */}
      {uploadSlowWarning && (
        <div className="bg-yellow-900/50 border border-yellow-500 text-yellow-200 px-4 py-3 rounded-lg flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400 mr-3"></div>
          Image upload is taking longer than expected. Please wait...
        </div>
      )}
      {uploadError && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
          {uploadError}
        </div>
      )}
      
      {/* Save Status Messages */}
      {saveSlowWarning && (
        <div className="bg-yellow-900/50 border border-yellow-500 text-yellow-200 px-4 py-3 rounded-lg flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400 mr-3"></div>
          {loading ? 'Save is taking longer than expected. Please wait...' : ''}
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="bg-gradient-to-r from-slate-600/10 to-slate-700/10 border-slate-600 text-gray-300 hover:from-slate-600 hover:to-slate-700 hover:text-white transition-all duration-300"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSave(false)}
            disabled={loading || !title.trim() || !content.trim()}
            variant="outline"
            className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border-blue-500 text-blue-400 hover:from-blue-600 hover:to-cyan-600 hover:text-white hover:border-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400 mr-2"></div>
                Saving...
              </div>
            ) : 'Save Draft'}
          </Button>
          <Button
            onClick={() => handleSave(true)}
            disabled={loading || !title.trim() || !content.trim()}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Publishing...
              </div>
            ) : 'Publish'}
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-1 gap-6">
        <Card className="bg-slate-900/50 border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white">Blog Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title..."
                className="bg-slate-800 border-slate-700 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-white">Excerpt (Optional)</Label>
              <TextareaAutosize
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief description of the blog post..."
                className="w-full min-h-[60px] bg-slate-800 border border-slate-700 text-white placeholder-gray-400 rounded-md px-3 py-2 resize-none"
                maxRows={3}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Featured Image</Label>
              <div className="flex gap-3">
                <Input
                  value={featuredImage}
                  onChange={(e) => {
                    let url = e.target.value.trim();
                    // Remove duplicate URLs if they exist
                    const urlPattern = /(https?:\/\/[^\s]+)/g;
                    const matches = url.match(urlPattern);
                    if (matches && matches.length > 1) {
                      url = matches[0]; // Take the first valid URL
                    }
                    setFeaturedImage(url);
                  }}
                  placeholder="Paste Supabase image URL or upload below..."
                  className="bg-slate-800 border-slate-700 text-white placeholder-gray-400"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('featured-image-upload').click()}
                  disabled={uploadingImage}
                  className="bg-gradient-to-r from-slate-600/10 to-slate-700/10 border-slate-600 text-gray-300 hover:from-slate-600 hover:to-slate-700 hover:text-white transition-all duration-300 disabled:opacity-50"
                >
                  {uploadingImage ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-300 mr-2"></div>
                      {uploadProgress}%
                    </div>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </>
                  )}
                </Button>
                <input
                  id="featured-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFeaturedImageUpload}
                  className="hidden"
                />
              </div>
              {featuredImage && (
                <div className="mt-2">
                  <img
                    src={featuredImage}
                    alt="Featured"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="hidden bg-slate-700 border border-slate-600 rounded-lg p-4 text-center text-gray-400">
                    Failed to load image. Please check the URL.
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-blue-500/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Content</CardTitle>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="bg-gradient-to-r from-slate-600/10 to-slate-700/10 border-slate-600 text-gray-300 hover:from-slate-600 hover:to-slate-700 hover:text-white transition-all duration-300 disabled:opacity-50"
                >
                  {uploadingImage ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-300 mr-2"></div>
                      Uploading... {uploadProgress}%
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Add Image
                    </>
                  )}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
            <CardDescription className="text-gray-400">
              Write your blog content in Markdown. Use the preview tab to see how it will look.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="edit" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-800">
                <TabsTrigger value="edit" className="data-[state=active]:bg-blue-600">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </TabsTrigger>
                <TabsTrigger value="preview" className="data-[state=active]:bg-blue-600">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="edit" className="mt-4">
                <TextareaAutosize
                  className="markdown-textarea w-full min-h-[400px] bg-slate-800 border border-slate-700 text-white placeholder-gray-400 rounded-md px-4 py-3 resize-none font-mono text-sm"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your blog content here in Markdown..."
                  minRows={20}
                />
              </TabsContent>
              
              <TabsContent value="preview" className="mt-4">
                <div className="min-h-[400px] bg-slate-800 border border-slate-700 rounded-md px-4 py-3 prose prose-lg prose-invert prose-blue max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      h1: ({children}) => <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 mt-8">{children}</h1>,
                      h2: ({children}) => <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 mt-8">{children}</h2>,
                      h3: ({children}) => <h3 className="text-xl md:text-2xl font-bold text-white mb-3 mt-6">{children}</h3>,
                      p: ({children}) => <p className="text-gray-300 leading-relaxed mb-6">{children}</p>,
                      blockquote: ({children}) => (
                        <blockquote className="border-l-4 border-blue-500 pl-6 my-6 text-gray-300 italic bg-slate-800/50 py-4 rounded-r-lg">
                          {children}
                        </blockquote>
                      ),
                      pre: ({children}) => (
                        <pre className="bg-slate-800 rounded-lg p-4 overflow-x-auto my-6 border border-slate-700">
                          {children}
                        </pre>
                      ),
                      img: ({src, alt}) => {
                        // Check if it's a video file
                        if (src?.match(/\.(mp4|webm|ogg|mov|avi)$/i)) {
                          return (
                            <video 
                              controls 
                              className="rounded-lg my-6 w-full max-w-4xl mx-auto"
                              preload="metadata"
                            >
                              <source src={src} />
                              Your browser does not support the video tag.
                            </video>
                          );
                        }
                        // Check if it's a YouTube link
                        const youtubeMatch = src?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
                        if (youtubeMatch) {
                          return (
                            <div className="aspect-video my-6 rounded-lg overflow-hidden">
                              <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${youtubeMatch[1]}`}
                                title={alt || 'YouTube video'}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          );
                        }
                        return <img src={src} alt={alt} className="rounded-lg my-6 w-full" />;
                      },
                      ul: ({children}) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">{children}</ul>,
                      ol: ({children}) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-300">{children}</ol>,
                    }}
                  >
                    {content || '*No content to preview*'}
                  </ReactMarkdown>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarkdownEditor;