import React from 'react';
import Navbar from './Navbar';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black antialiased">
      
      <div className="max-w-4xl mx-auto px-4 py-20 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-violet-500">Policy</span>
          </h1>
          <div className="h-1.5 w-24 bg-violet-600 mx-auto mt-4 rounded-full" />
          <p className="text-gray-400 mt-6">Last Updated: December 2025</p>
        </div>

        {/* Content Section */}
        <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 space-y-10 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-600 rounded-full" />
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us when you create an account, upload a resume, or communicate with employers. This includes your name, email address, phone number, and professional history.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-violet-600 rounded-full" />
              2. How We Use Your Information
            </h2>
            <p>
              Your information is used to facilitate the job search and recruitment process. Specifically, we use it to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
              <li>Match your profile with relevant job openings.</li>
              <li>Allow employers to view your resume and professional details.</li>
              <li>Improve our platform's algorithms and user experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-600 rounded-full" />
              3. Data Security
            </h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. Your data is encrypted and stored on secure servers, protected against unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-violet-600 rounded-full" />
              4. Contact Us
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy, you may contact our privacy team at 
              <span className="text-violet-400 ml-1">privacy@jobportal.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;