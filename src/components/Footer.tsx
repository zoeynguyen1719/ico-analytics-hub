import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-crypto-dark border-t border-crypto-gray">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/mericulum-logo.png" 
              alt="Mericulum Logo" 
              className="h-8 w-auto"
            />
            <p className="text-gray-400 text-sm">
              Your comprehensive platform for ICO analytics and portfolio management
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/portfolio" className="hover:text-primary transition-colors">Portfolio</a></li>
              <li><a href="/calculator" className="hover:text-primary transition-colors">Calculator</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/news" className="hover:text-primary transition-colors">News</a></li>
              <li><a href="/compare" className="hover:text-primary transition-colors">Compare</a></li>
              <li><a href="/subscription" className="hover:text-primary transition-colors">Subscription</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-crypto-gray text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Mericulum. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;