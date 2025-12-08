import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com', name: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', name: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', name: 'Twitter' },
    { icon: Mail, href: 'mailto:contact@example.com', name: 'Email' },
  ]

  return (
    <footer className="bg-bg-secondary py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 md:mb-0"
          >
            <p className="text-text-secondary">
              © {new Date().getFullYear()} 3D Portfolio. Built with React & Three.js
            </p>
          </motion.div>

          <div className="flex space-x-6">
            {socialLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, color: '#0ea5e9' }}
                  className="text-text-secondary hover:text-accent-blue transition-colors"
                >
                  <Icon size={24} />
                </motion.a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

