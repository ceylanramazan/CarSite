import { Phone, Mail, Facebook, Instagram } from 'lucide-react'

export default function TopBar() {
  return (
    <div className="hidden lg:block bg-gradient-to-r from-[#48C9B0] to-[#48C9B0]/90 text-white py-2.5 border-b border-[#48C9B0]/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Contact Info */}
          <div className="flex items-center space-x-6">
            <a 
              href="tel:+905449275328" 
              className="flex items-center space-x-2 text-sm hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Bize Ulaşın: 0544 927 53 28</span>
            </a>
            <a 
              href="mailto:anycars34@gmail.com" 
              className="flex items-center space-x-2 text-sm hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>anycars34@gmail.com</span>
            </a>
          </div>

          {/* Right: Social Media */}
          <div className="flex items-center space-x-3">
            <a 
              href="https://www.facebook.com/any2.el/" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a 
              href="https://www.instagram.com/any2.el/" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

