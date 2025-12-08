import { Suspense, useState, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { projects } from '../../data/projects'
import { Github, ExternalLink, X } from 'lucide-react'
import ProjectCard from '../ui/ProjectCard'
import * as THREE from 'three'

// 3D Project Card Component with Image Texture
function ProjectCard3D({ project, position, index, onClick }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  // Load the project image as texture with fallback
  const fallbackImage = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop'
  const texture = useTexture(project.image || fallbackImage)
  
  // Configure texture
  if (texture) {
    texture.wrapS = THREE.ClampToEdgeWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
  }

  // Create materials array for each face - update when hovered changes
  const materials = useMemo(() => {
    const sideMaterial = new THREE.MeshStandardMaterial({ color: '#1a1a2e' })
    const frontMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      color: '#ffffff',
      emissive: hovered ? '#0ea5e9' : '#000000',
      emissiveIntensity: hovered ? 0.3 : 0,
    })
    const backMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      color: '#ffffff',
    })
    
    return [
      sideMaterial, // right
      sideMaterial, // left
      sideMaterial, // top
      sideMaterial, // bottom
      frontMaterial, // front
      backMaterial, // back
    ]
  }, [texture, hovered])

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      // Smooth rotation animation
      meshRef.current.rotation.y = time * 0.3 + index * 0.5
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(time * 0.8 + index) * 0.3
      // Hover rotation effect
      if (hovered) {
        meshRef.current.rotation.z = Math.sin(time * 2) * 0.1
      } else {
        meshRef.current.rotation.z = 0
      }
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
      scale={hovered ? 1.15 : 1}
      material={materials}
    >
      <boxGeometry args={[3, 2, 0.2]} />
    </mesh>
  )
}

function Projects3DScene({ projects, onProjectClick }) {
  const radius = 8
  const angleStep = (Math.PI * 2) / projects.length

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={0.5} />
      <PerspectiveCamera makeDefault position={[0, 0, 15]} />
      {projects.map((project, index) => {
        const angle = index * angleStep
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <ProjectCard3D
            key={project.id}
            project={project}
            position={[x, 0, z]}
            index={index}
            onClick={() => onProjectClick(project)}
          />
        )
      })}
      <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

const Projects = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [selectedProject, setSelectedProject] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or '3d'

  const openModal = (project) => {
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-bg-primary"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto mb-8"></div>
          
          {/* View Mode Toggle */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-6 py-2 rounded-lg ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-accent-blue to-accent-purple'
                  : 'bg-bg-secondary border border-white/10'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`px-6 py-2 rounded-lg ${
                viewMode === '3d'
                  ? 'bg-gradient-to-r from-accent-blue to-accent-purple'
                  : 'bg-bg-secondary border border-white/10'
              }`}
            >
              3D View
            </button>
          </div>
        </motion.div>

        {viewMode === '3d' ? (
          <div className="h-[600px] mb-12">
            <Canvas>
              <Suspense fallback={null}>
                <Projects3DScene
                  projects={projects}
                  onProjectClick={openModal}
                />
              </Suspense>
            </Canvas>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={project.id} onClick={() => openModal(project)}>
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        )}

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl w-full bg-bg-secondary rounded-2xl overflow-hidden border border-white/10 max-h-[90vh] overflow-y-auto"
              >
                <div className="relative h-64">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      if (!e.target.src.includes('unsplash.com')) {
                        e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop'
                      }
                    }}
                  />
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 p-2 bg-bg-secondary/80 rounded-full hover:bg-bg-secondary transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="p-8">
                  <h2 className="text-3xl font-bold mb-4">{selectedProject.title}</h2>
                  <p className="text-text-secondary mb-6">{selectedProject.longDesc}</p>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Features</h3>
                    <ul className="list-disc list-inside space-y-2 text-text-secondary">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-bg-primary rounded-lg hover:bg-accent-blue transition-colors"
                    >
                      <Github size={20} />
                      View Code
                    </a>
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <ExternalLink size={20} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Projects

