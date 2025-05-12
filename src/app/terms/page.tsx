'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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
            Terms of Service
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
              Welcome to AyitiRitmo! These Terms of Service ("Terms") govern your use of the AyitiRitmo platform, including our website, mobile applications, and all related services (collectively, the "Service"). By accessing or using AyitiRitmo, you agree to be bound by these Terms and our Privacy Policy.
            </p>
            <p className="leading-relaxed">
              AyitiRitmo is a platform dedicated to celebrating, preserving, and promoting Haitian music and culture. We provide a space for artists to showcase their work and for users to discover and enjoy Haitian music.
            </p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">2. Accounts and Registration</h2>
            <p className="leading-relaxed mb-4">
              To access certain features of the Service, you may need to create an account. When you create an account, you agree to provide accurate, current, and complete information and to update this information to keep it accurate, current, and complete.
            </p>
            <p className="leading-relaxed mb-4">
              You are solely responsible for safeguarding your account credentials and for all activity that occurs under your account. If you become aware of any unauthorized use of your account, please notify us immediately.
            </p>
            <p className="leading-relaxed">
              AyitiRitmo reserves the right to disable any user account at any time if, in our opinion, you have failed to comply with these Terms or if we believe your account may pose a security risk.
            </p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">3. Artist Accounts</h2>
            <p className="leading-relaxed mb-4">
              AyitiRitmo provides specialized accounts for Haitian music artists. By creating an artist account, you represent and warrant that you have the right to upload, distribute, and monetize the content you share on the platform.
            </p>
            <p className="leading-relaxed mb-4">
              Artist accounts may have access to additional features, such as uploading music, creating merchandise listings, and viewing analytics. These features are subject to additional terms that will be presented to you during the artist registration process.
            </p>
            <p className="leading-relaxed">
              Artists are responsible for ensuring that all content they upload does not violate any third-party rights, including copyright and trademark rights. AyitiRitmo reserves the right to remove content that violates these Terms or any applicable laws.
            </p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">4. User Content</h2>
            <p className="leading-relaxed mb-4">
              AyitiRitmo allows users to post, upload, and share content, including but not limited to comments, reviews, and playlists. You retain ownership of any intellectual property rights you hold in the content you submit to the platform.
            </p>
            <p className="leading-relaxed mb-4">
              By submitting content to AyitiRitmo, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute your content across our platform and promotional materials. This license continues even if you stop using our Service.
            </p>
            <p className="leading-relaxed">
              You agree not to post content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable. AyitiRitmo reserves the right to remove any content that violates these Terms or that we find objectionable.
            </p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">5. Subscription Services</h2>
            <p className="leading-relaxed mb-4">
              AyitiRitmo offers both free and premium subscription tiers. By subscribing to our premium services, you agree to pay all fees associated with the subscription plan you choose.
            </p>
            <p className="leading-relaxed mb-4">
              Premium subscriptions will automatically renew at the end of each billing period unless you cancel before the renewal date. You can cancel your subscription at any time through your account settings.
            </p>
            <p className="leading-relaxed">
              AyitiRitmo reserves the right to change subscription fees at any time, but we will provide notice of such changes before they take effect. If you do not agree to the new fees, you may cancel your subscription before the next billing cycle.
            </p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">6. Intellectual Property</h2>
            <p className="leading-relaxed mb-4">
              All content on the AyitiRitmo platform, including but not limited to text, graphics, logos, icons, images, audio clips, and software, is the property of AyitiRitmo or our licensors and is protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="leading-relaxed mb-4">
              You may not copy, modify, distribute, sell, or lease any part of our Service or included content without express permission. This does not prevent you from sharing content through the platform's sharing features or as otherwise permitted by these Terms.
            </p>
            <p className="leading-relaxed">
              If you believe that your intellectual property rights have been violated on AyitiRitmo, please contact us with information regarding the alleged violation.
            </p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">7. Prohibited Activities</h2>
            <p className="leading-relaxed mb-4">
              While using AyitiRitmo, you agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li className="leading-relaxed">Use the Service for any illegal purpose or in violation of any laws</li>
              <li className="leading-relaxed">Infringe upon the rights of others, including intellectual property rights</li>
              <li className="leading-relaxed">Attempt to gain unauthorized access to any part of the Service</li>
              <li className="leading-relaxed">Interfere with or disrupt the Service or servers connected to the Service</li>
              <li className="leading-relaxed">Collect or harvest any information from the Service, including user accounts</li>
              <li className="leading-relaxed">Distribute malware or other harmful computer code</li>
              <li className="leading-relaxed">Engage in any activity that could disable, overburden, or impair the Service</li>
              <li className="leading-relaxed">Impersonate any person or entity, or misrepresent your affiliation with any person or entity</li>
            </ul>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">8. Disclaimer of Warranties</h2>
            <p className="leading-relaxed mb-4">
              AyitiRitmo provides the Service on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the operation of the Service or the information, content, or materials included on the Service.
            </p>
            <p className="leading-relaxed mb-4">
              We do not guarantee that the Service will be error-free, uninterrupted, or free from harmful components. You use the Service at your own risk.
            </p>
            <p className="leading-relaxed">
              AyitiRitmo does not endorse, warrant, or assume responsibility for any content posted by users or third parties. We make no guarantees regarding the quality, accuracy, or reliability of such content.
            </p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">9. Limitation of Liability</h2>
            <p className="leading-relaxed mb-4">
              To the maximum extent permitted by law, AyitiRitmo shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses resulting from your use of the Service.
            </p>
            <p className="leading-relaxed mb-4">
              In no event shall AyitiRitmo's total liability to you for all claims exceed the amount you have paid to AyitiRitmo for the Service in the twelve (12) months preceding the event giving rise to the liability.
            </p>
            <p className="leading-relaxed">
              Some jurisdictions do not allow the exclusion or limitation of certain warranties or liabilities, so some of the above limitations may not apply to you.
            </p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">10. Indemnification</h2>
            <p className="leading-relaxed">
              You agree to indemnify, defend, and hold harmless AyitiRitmo, its affiliates, officers, directors, employees, agents, and licensors from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Service.
            </p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">11. Termination</h2>
            <p className="leading-relaxed mb-4">
              AyitiRitmo may terminate or suspend your account and access to the Service at any time, without prior notice or liability, for any reason, including but not limited to a breach of these Terms.
            </p>
            <p className="leading-relaxed">
              Upon termination, your right to use the Service will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, including but not limited to ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">12. Governing Law</h2>
            <p className="leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which AyitiRitmo is registered, without regard to its conflict of law provisions. Any legal action or proceeding arising out of or relating to these Terms or the Service shall be brought exclusively in the courts located in that jurisdiction.
            </p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">13. Changes to Terms</h2>
            <p className="leading-relaxed mb-4">
              AyitiRitmo reserves the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the updated Terms on this page and updating the "Last Updated" date at the top of this page.
            </p>
            <p className="leading-relaxed">
              Your continued use of the Service after any changes to the Terms constitutes your acceptance of the new Terms. If you do not agree to the new Terms, you must stop using the Service.
            </p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-haiti-blue/20">
            <h2 className="text-xl font-bold text-haiti-gold mb-4">14. Contact Information</h2>
            <p className="leading-relaxed">
              If you have any questions about these Terms, please contact us at support@ayitiritmo.com.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}