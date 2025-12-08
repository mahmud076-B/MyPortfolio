import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'

// 3D Avatar/Orb Component
function RotatingOrb() {
  const meshRef = useRef()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = scrollY * 0.001
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.1
      // Breathing animation
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1
      meshRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} color="#a855f7" intensity={0.5} />
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 0]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.3}
          wireframe
        />
      </mesh>
      <OrbitControls enableZoom={false} />
    </>
  )
}

const About = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const statsRef = useRef(null)

  const stats = [
    { label: 'Years Experience', value: 5, suffix: '+' },
    { label: 'Projects Completed', value: 50, suffix: '+' },
    { label: 'Happy Clients', value: 30, suffix: '+' },
    { label: 'Technologies', value: 20, suffix: '+' },
  ]

  useEffect(() => {
    if (isInView && statsRef.current) {
      const counters = statsRef.current.querySelectorAll('.stat-value')
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target'))
        let current = 0
        const increment = target / 60
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            counter.textContent = target
            clearInterval(timer)
          } else {
            counter.textContent = Math.floor(current)
          }
        }, 30)
      })
    }
  }, [isInView])

  return (
    <section
      id="about"
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
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* About Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Glow Background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 rounded-3xl blur-2xl"></div>
              
              {/* Image Container */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-bg-secondary shadow-2xl">
                <img
                  src="/images/about.jpg"
                  alt="About Me"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: '3/4' }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=800&fit=crop'
                  }}
                />
              </div>
              
              {/* Floating Accents */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent-blue/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-purple/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-lg text-text-secondary leading-relaxed">
              I'm a passionate full-stack developer with a love for creating
              immersive digital experiences. I specialize in building modern web
              applications using React, Three.js, and cutting-edge technologies.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              With over 5 years of experience, I've worked on projects ranging
              from simple websites to complex 3D interactive platforms. I'm
              always learning and pushing the boundaries of what's possible on
              the web.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge with
              the developer community.
            </p>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 gap-6 mt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-center p-6 bg-bg-secondary/50 rounded-xl border border-white/10"
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    <span className="stat-value" data-target={stat.value}>
                      0
                    </span>
                    {stat.suffix}
                  </div>
                  <div className="text-text-secondary">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

