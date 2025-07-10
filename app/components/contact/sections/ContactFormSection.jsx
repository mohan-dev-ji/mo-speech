"use client";
import React, { useState } from "react";
import { Input } from "../../shared/ui/shad-input";
import { Textarea } from "../../shared/ui/textarea";
import { Button } from "../../shared/ui/button";

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "" // honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot check - if phone field is filled, it's likely a bot
    if (formData.phone) {
      console.log('Bot detected via honeypot');
      setSubmitStatus('success'); // Fake success to confuse bots
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: "", email: "", message: "", phone: "" });
      } else {
        console.error('API Error:', result);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full flex flex-col items-center px-4 md:px-8 py-section-y border-b border-brand-line">
      <div className="w-full max-w-[1080px] flex flex-col items-center gap-12">
        {submitStatus === 'success' && (
          <div className="w-full p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            Thank you for your message! We&apos;ll get back to you soon.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="w-full p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            Sorry, there was an error sending your message. Please try again.
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 items-center">
          <Input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name" 
            className="bg-white text-black rounded-md border border-slate-300 px-3 py-2 w-full max-w-[1080px]" 
            required
          />
          <Input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address" 
            className="bg-white text-black rounded-md border border-slate-300 px-3 py-2 w-full max-w-[1080px]" 
            required
          />
          <Textarea 
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Type your message here" 
            className="bg-white text-black rounded-md border border-slate-300 px-3 py-2 w-full max-w-[1080px] min-h-[120px]" 
            required
          />
          
          {/* Honeypot field - hidden from real users */}
          <div className="absolute left-[-9999px] top-[-9999px]">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              tabIndex="-1"
              autoComplete="off"
            />
          </div>
          
          <Button 
            type="submit" 
            size="nav" 
            variant="secondary" 
            className="w-full max-w-[530px] mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send message'}
          </Button>
        </form>
      </div>
    </section>
  );
} 