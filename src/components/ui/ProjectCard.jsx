import React from 'react'
import { ExternalLink, Github } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      className="group relative bg-bg-secondary/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-accent-blue transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Project Image */}
      <div className="relative h-64 w-full overflow-hidden bg-bg-primary">
        <img
          src={project.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop'}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            // Fallback to Unsplash placeholder if image fails to load
            if (!e.target.src.includes('unsplash.com')) {
              e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop'
            }
          }}
        />

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-bg-secondary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-bg-primary hover:bg-bg-primary/80 rounded-lg transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={18} />
              <span className="text-sm">Code</span>
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-accent-blue hover:bg-accent-blue/80 rounded-lg transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={18} />
              <span className="text-sm">Live Demo</span>
            </a>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-text-primary group-hover:text-accent-blue transition-colors">
          {project.title}
        </h3>

        <p className="text-text-secondary mb-4 line-clamp-2">
          {project.shortDesc || project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-medium bg-accent-blue/20 text-accent-blue rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/10 to-accent-purple/10" />
      </div>
    </motion.div>
  )
}

