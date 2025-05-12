'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/">
            <Button variant="ghost" className="text-white flex items-center gap-2 mb-8">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Button>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-haiti-red to-haiti-blue bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          
          <p className="text-white/70 mb-8">
            Last Updated: May 12, 2025
          </p>
        </motion.div>

        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">1. Introduction</h2>
            <p className="leading-relaxed mb-4">
              At AyitiRitmo, we are committed to protecting your privacy and ensuring that your personal information is handled responsibly. This Privacy Policy describes the types of information we collect, how we use it, and your rights regarding your information when you use our website, mobile applications, and services (collectively, the "Service").
            </p>
            <p className="leading-relaxed">
              By using AyitiRitmo, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our Service.
            </p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">2. Information We Collect</h2>
            <p className="leading-relaxed mb-4">
              We collect several types of information from and about users of our Service:
            </p>
            
            <h3 className="text-lg font-semibold text-haiti-red mb-2">Personal Data</h3>
            <p className="leading-relaxed mb-4">
              When you create an account, we collect personal information such as your name, email address, and profile picture. For artist accounts, we may collect additional information such as biography, band members, and contact details.
            </p>
            
            <h3 className="text-lg font-semibold text-haiti-red mb-2">Usage Data</h3>
            <p className="leading-relaxed mb-4">
              We automatically collect information about how you interact with our Service, including the songs you listen to, playlists you create, artists you follow, and your listening history. We also collect information about your device, browser type, IP address, and time spent on various pages.
            </p>
            
            <h3 className="text-lg font-semibold text-haiti-red mb-2">Payment Information</h3>
            <p className="leading-relaxed mb-4">
              If you subscribe to our premium services or make purchases through the platform, we collect payment information, which may include credit card details, billing address, and transaction history. All payment data is stored securely with our payment processors.
            </p>
            
            <h3 className="text-lg font-semibold text-haiti-red mb-2">User-Generated Content</h3>
            <p className="leading-relaxed">
              We collect content that you create, upload, or share through our Service, such as comments, reviews, playlists, and other user-generated content.
            </p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">3. How We Use Your Information</h2>
            <p className="leading-relaxed mb-4">
              We use the information we collect for various purposes, including:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li className="leading-relaxed">Providing, maintaining, and improving our Service</li>
              <li className="leading-relaxed">Processing your account registration and facilitating user authentication</li>
              <li className="leading-relaxed">Managing your subscriptions and processing payments</li>
              <li className="leading-relaxed">Personalizing your experience and providing recommendations based on your preferences</li>
              <li className="leading-relaxed">Communicating with you, including sending service announcements and updates</li>
              <li className="leading-relaxed">Analyzing usage patterns to improve our Service and develop new features</li>
              <li className="leading-relaxed">Protecting the security and integrity of our Service</li>
              <li className="leading-relaxed">Complying with legal obligations and enforcing our Terms of Service</li>
            </ul>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">4. Sharing Your Information</h2>
            <p className="leading-relaxed mb-4">
              We may share your information with the following parties:
            </p>
            
            <h3 className="text-lg font-semibold text-haiti-red mb-2">Service Providers</h3>
            <p className="leading-relaxed mb-4">
              We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting, and customer service.
            </p>
            
            <h3 className="text-lg font-semibold text-haiti-red mb-2">Artists and Partners</h3>
            <p className="leading-relaxed mb-4">
              For artist accounts, we may share aggregated listener statistics and demographic information with the artist. We may also share information with our business partners to offer you certain products, services, or promotions.
            </p>
            
            <h3 className="text-lg font-semibold text-haiti-red mb-2">Legal Requirements</h3>
            <p className="leading-relaxed mb-4">
              We may disclose your information if required by law, regulation, legal process, or governmental request, or to protect our rights, privacy, safety, or property, or that of our users or the public.
            </p>
            
            <h3 className="text-lg font-semibold text-haiti-red mb-2">Business Transfers</h3>
            <p className="leading-relaxed">
              If AyitiRitmo is involved in a merger, acquisition, or sale of all or a portion of its assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our website of any change in ownership or uses of your personal information.
            </p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">5. Data Security</h2>
            <p className="leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>
            <p className="leading-relaxed">
              We regularly review our security procedures and consider appropriate new security technology and methods. However, despite our efforts, no security measures are perfect or impenetrable.
            </p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">6. Your Privacy Rights</h2>
            <p className="leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            
            <h3 className="text-lg font-semibold text-haiti-red mb-2">Access and Update</h3>
            <p className="leading-relaxed mb-4">
              You may access and update your personal information through your account settings or by contacting us directly.
            </p>
            
            <h3 className="text-lg font-semibold text-haiti-red mb-2">Data Portability</h3>
            <p className="leading-relaxed mb-4">
              You may request a copy of your personal information in a structured, commonly used, and machine-readable format.
            </p>
            
            <h3 className="text-lg font-semibold text-haiti-red mb-2">Deletion</h3>
            <p className="leading-relaxed mb-4">
              You may request the deletion of your personal information in certain circumstances. Note that we may need to retain certain information for legal, security, or business purposes.
            </p>
            
            <h3 className="text-lg font-semibold text-haiti-red mb-2">Object or Restrict Processing</h3>
            <p className="leading-relaxed mb-4">
              You may object to the processing of your personal information or request that we restrict the processing of your personal information in certain circumstances.
            </p>
            
            <h3 className="text-lg font-semibold text-haiti-red mb-2">Withdraw Consent</h3>
            <p className="leading-relaxed">
              If we rely on your consent to process your personal information, you may withdraw your consent at any time. However, this will not affect the lawfulness of processing based on your consent before its withdrawal.
            </p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="leading-relaxed mb-4">
              AyitiRitmo uses cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
            </p>
            <p className="leading-relaxed mb-4">
              We use cookies for various purposes, including:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li className="leading-relaxed">Keeping you signed in to your account</li>
              <li className="leading-relaxed">Understanding how you use our Service</li>
              <li className="leading-relaxed">Personalizing your experience</li>
              <li className="leading-relaxed">Improving our Service based on usage patterns</li>
              <li className="leading-relaxed">Providing targeted advertisements</li>
            </ul>
            <p className="leading-relaxed">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">8. Children's Privacy</h2>
            <p className="leading-relaxed">
              Our Service is not intended for children under the age of 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will take steps to delete that information as quickly as possible. If you believe that we might have any information from or about a child under 13, please contact us immediately.
            </p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">9. International Data Transfers</h2>
            <p className="leading-relaxed">
              AyitiRitmo operates globally, and your information may be transferred to, stored, and processed in countries other than the one in which you reside. By using our Service, you consent to the transfer of your information to countries that may have different data protection laws than your country of residence. We ensure that such transfers are conducted in accordance with applicable laws and regulations.
            </p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">10. Changes to This Privacy Policy</h2>
            <p className="leading-relaxed mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this page.
            </p>
            <p className="leading-relaxed">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">11. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="leading-relaxed mt-4">
              <span className="font-semibold">Email:</span> privacy@ayitiritmo.com
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}