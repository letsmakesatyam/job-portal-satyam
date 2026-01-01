import React from 'react';


const TermsAndCondition = () => {
  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black antialiased">
      
      <div className="max-w-4xl mx-auto px-4 py-20 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-red-500">Service</span>
          </h1>
          <div className="h-1.5 w-24 bg-red-600 mx-auto mt-4 rounded-full" />
          <p className="text-gray-400 mt-6">Effective Date: January 1, 2026</p>
        </div>

        {/* Content Section */}
        <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 space-y-10 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-600/20 text-red-500 text-sm">01</span>
              Acceptance of Terms
            </h2>
            <p>
              By accessing and using this Job Portal, you accept and agree to be bound by the terms and provision of this agreement. Any participation in this service will constitute acceptance of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-violet-600/20 text-violet-500 text-sm">02</span>
              User Obligations
            </h2>
            <p>
              Users must provide accurate, current, and complete information during the registration process. You are responsible for safeguarding your password and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-600/20 text-red-500 text-sm">03</span>
              Prohibited Conduct
            </h2>
            <p>
              You agree not to use the service for any unlawful purpose or to solicit others to perform or participate in any unlawful acts. Posting fraudulent job listings or resumes is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-violet-600/20 text-violet-500 text-sm">04</span>
              Limitation of Liability
            </h2>
            <p>
              Job Portal shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, or use.
            </p>
          </section>

          <div className="pt-10 border-t border-white/10 text-center">
            <p className="text-sm text-gray-500 italic">
              Violation of these terms may result in immediate account termination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndCondition;