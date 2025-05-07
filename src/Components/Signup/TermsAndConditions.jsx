import React, { useEffect } from 'react';

const TermsAndConditions = ({ isOpen, onClose }) => {
  // Close modal on escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Close when clicking on backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-neutral-900 p-6 rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-white font-bold">Terms and Conditions</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <section>
            <h3 className="text-lg text-white font-semibold">1. Acceptance of Terms</h3>
            <p className="text-gray-400">By accessing and using this facial recognition attendance system, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
          </section>
          
          <section>
            <h3 className="text-lg text-white font-semibold">2. Data Privacy and Protection</h3>
            <p className="text-gray-400">We collect and process facial data for the sole purpose of attendance tracking. Your facial data will be:</p>
            <ul className="list-disc ml-5 text-gray-400">
              <li>Stored securely with encryption</li>
              <li>Not shared with third parties without explicit consent</li>
              <li>Retained only for the duration necessary for the attendance system</li>
              <li>Accessible to you for review, update, or deletion upon request</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg text-white font-semibold">3. User Responsibilities</h3>
            <p className="text-gray-400">As a user, you agree to:</p>
            <ul className="list-disc ml-5 text-gray-400">
              <li>Provide accurate information during registration</li>
              <li>Not attempt to manipulate or bypass the facial recognition system</li>
              <li>Keep your login credentials secure</li>
              <li>Report any suspected security breaches immediately</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg text-white font-semibold">4. Limitation of Liability</h3>
            <p className="text-gray-400">We strive to maintain high accuracy in our facial recognition system, but cannot guarantee 100% accuracy at all times. We are not liable for:</p>
            <ul className="list-disc ml-5 text-gray-400">
              <li>Occasional system errors in facial matching</li>
              <li>Service interruptions due to maintenance or technical issues</li>
              <li>Any consequential damages arising from system use or failure</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-lg text-white font-semibold">5. Modifications to Terms</h3>
            <p className="text-gray-400">We reserve the right to modify these terms at any time. Users will be notified of significant changes, and continued use of the system constitutes acceptance of revised terms.</p>
          </section>
          
          <section>
            <h3 className="text-lg text-white font-semibold">6. Account Security</h3>
            <p className="text-gray-400">You are responsible for maintaining the confidentiality of your account credentials. Any activities that occur under your account are your responsibility. Notify us immediately of any unauthorized use of your account.</p>
          </section>
          
          <section>
            <h3 className="text-lg text-white font-semibold">7. Intellectual Property</h3>
            <p className="text-gray-400">All content, features, and functionality of this system, including but not limited to text, graphics, logos, icons, and images, are the exclusive property of our company and are protected by copyright, trademark, and other intellectual property laws.</p>
          </section>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
