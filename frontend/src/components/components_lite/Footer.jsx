import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Github
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black pt-16 pb-8 overflow-hidden border-t border-white/10">
      {/* Background Accent Glows */}
      <div className="absolute bottom-0 left-0 w-full h-full -z-0 pointer-events-none">
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-violet-600/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-red-600/10 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-violet-600 to-red-600 p-1.5 rounded-lg">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <h1 className="text-2xl font-black tracking-tighter text-white">
                JOB<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-violet-500">PORTAL</span>
              </h1>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering professional growth by connecting elite talent with the world's most innovative companies. Your future starts here.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram, Github].map((Icon, i) => (
                <Link key={i} to="#" className="text-gray-500 hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-violet-500 rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-violet-400 transition-colors">Home</Link></li>
              <li><Link to="/browse" className="hover:text-violet-400 transition-colors">Browse Jobs</Link></li>
              <li><Link to="/companies" className="hover:text-violet-400 transition-colors">Top Companies</Link></li>
              <li><Link to="/blog" className="hover:text-violet-400 transition-colors">Career Advice</Link></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-red-500 rounded-full" />
              Legal
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/privacy" className="hover:text-red-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-red-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/faq" className="hover:text-red-400 transition-colors">Help Center</Link></li>
              <li><Link to="/security" className="hover:text-red-400 transition-colors">Security Details</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-red-500 to-violet-500 rounded-full" />
              Contact Us
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-violet-500" />
                <span>support@jobportal.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-500" />
                <span>+1 (555) 000-0000</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-violet-500 mt-1" />
                <span>123 Innovation Way,<br />Silicon Valley, CA 94025</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 uppercase tracking-widest">
          <p>© {currentYear} JOB PORTAL. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-default">Built with React & Tailwind</span>
            <span className="hover:text-white cursor-default">Designed by Satyam Revgade</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;