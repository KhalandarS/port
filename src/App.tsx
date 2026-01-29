import { useState, useEffect } from 'react'
import BackgroundBeams from '../components/BackgroundBeams'
import GooeyNav from '../components/GooeyNav'
import BlurText from '../components/BlurText'
import RotatingText from '../components/RotatingText'
import CardSwap, { Card } from '../components/CardSwap'
import ProfileCard from '../components/ProfileCard'
import ProjectCards from '../components/ProjectCards'
import LiquidButton from '../components/LiquidButton'
import './App.css'

const navItems = [
    { label: "Skills", href: "#skills" },
    { label: "Project", href: "#projects" },
    { label: "Contact Me", href: "#contact" },
];

function App() {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const firstPageHeight = window.innerHeight; // Height of first viewport

            // Check if we're on the first page
            if (currentScrollY < firstPageHeight - 100) {
                // On first page: hide on scroll down, show on scroll up
                if (currentScrollY < 50) {
                    setIsNavbarVisible(true);
                } else if (currentScrollY > lastScrollY) {
                    // Scrolling down
                    setIsNavbarVisible(false);
                } else {
                    // Scrolling up
                    setIsNavbarVisible(true);
                }
            } else {
                // Beyond first page: always hide
                setIsNavbarVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleResumeDownload = () => {
        const resumeUrl = `${import.meta.env.BASE_URL || '/'}resume.pdf`;
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'Khalandar_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="app">
            <header className={`navbar ${isNavbarVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
                <div className="navbar-content">
                    <div className="nav-left">
                        <GooeyNav items={navItems} />
                    </div>
                    <LiquidButton
                        variant="default"
                        size="default"
                        onClick={handleResumeDownload}
                        hoverScale={1.02}
                        className="resume-btn"
                    >
                        Resume
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 11L3 6H13L8 11Z" fill="currentColor" />
                            <path d="M2 13H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </LiquidButton>
                </div>
            </header>

            {/* Animated Background Beams for all sections */}
            <div className="background-beams-wrapper">
                <BackgroundBeams />
            </div>

            <main className="main-content">
                {/* Hero Section */}
                <section id="hero" className="section hero-section">
                    <div className="hero-content">
                        <div className="hero-info">
                            <div className="info-content">
                                <BlurText
                                    text="Hello, I'm"
                                    delay={50}
                                    animateBy="words"
                                    direction="top"
                                    className="hero-greeting"
                                />
                                <BlurText
                                    text="Khalandar."
                                    delay={80}
                                    animateBy="letters"
                                    direction="top"
                                    className="hero-name"
                                />
                                <RotatingText
                                    texts={[
                                        'Tech Enthusiast',
                                        'Full-Stack Developer',
                                        'Problem Solver',
                                        'Creative Thinker'
                                    ]}
                                    interval={3000}
                                    className="hero-title"
                                />
                                <p className="hero-description">
                                    Building accessible, high-performance web experiences where every interaction is intentional and every detail earns its place.
                                </p>
                            </div>
                        </div>

                        <div className="hero-avatar">
                            <ProfileCard
                                name="Khalandar"
                                title="Full-Stack Developer"
                                handle="khalandar"
                                status="Coding"
                                contactText="Contact"
                                avatarUrl={`${import.meta.env.BASE_URL}profile_vignette.png`}
                                showUserInfo={false}
                                enableTilt={true}
                                enableMobileTilt={true}
                                behindGlowEnabled={true}
                                behindGlowColor="rgba(82, 39, 255, 0.4)"
                                onContactClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            />
                        </div>
                    </div>
                </section>

                {/* Skills Section */}
                <section id="skills" className="section skills-section">
                    <div className="section-content">
                        <div className="skills-layout">
                            <div className="skills-text">
                                <h2 className="skills-heading">Technical Skills</h2>
                                <p className="skills-description">
                                    Not a jack of all trades—master of many. From pixel-perfect UIs to AI that actually works,
                                    I build things that look great and perform even better.
                                </p>
                            </div>
                            <div className="skills-container">
                                <CardSwap
                                    cardDistance={35}
                                    verticalDistance={45}
                                    delay={3000}
                                    pauseOnHover={true}
                                    width={480}
                                    height={380}
                                >
                                    <Card>
                                        <div className="skill-card-content">
                                            <h3 className="skill-card-title">Frontend</h3>
                                            <div className="skill-category">
                                                <div className="skill-items">
                                                    <span className="skill-item">React.js</span>
                                                    <span className="skill-item">Flutter (Dart)</span>
                                                    <span className="skill-item">HTML5</span>
                                                    <span className="skill-item">CSS3</span>
                                                    <span className="skill-item">JavaScript (ES6+)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card>
                                        <div className="skill-card-content">
                                            <h3 className="skill-card-title">AI & Backend</h3>
                                            <div className="skill-category">
                                                <div className="skill-items">
                                                    <span className="skill-item">Python</span>
                                                    <span className="skill-item">Flask</span>
                                                    <span className="skill-item">FastAPI</span>
                                                    <span className="skill-item">TensorFlow</span>
                                                    <span className="skill-item">Keras</span>
                                                    <span className="skill-item">OpenCV</span>
                                                    <span className="skill-item">SQL</span>
                                                    <span className="skill-item">Firebase</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card>
                                        <div className="skill-card-content">
                                            <h3 className="skill-card-title">Tools</h3>
                                            <div className="skill-category">
                                                <div className="skill-items">
                                                    <span className="skill-item">Git & GitHub</span>
                                                    <span className="skill-item">Docker</span>
                                                    <span className="skill-item">Figma (UI Design)</span>
                                                    <span className="skill-item">VS Code</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card>
                                        <div className="skill-card-content">
                                            <h3 className="skill-card-title">Domain Expertise</h3>
                                            <div className="skill-category">
                                                <div className="skill-items">
                                                    <span className="skill-item">UI/UX Design</span>
                                                    <span className="skill-item">Mobile Development</span>
                                                    <span className="skill-item">Computer Vision</span>
                                                    <span className="skill-item">Data Science</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </CardSwap>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Experience Section */}
                <section id="experience" className="section experience-section">
                    <div className="section-content">
                        <h2 className="section-title">Experience</h2>
                        <div className="experience-card">
                            <div className="experience-header">
                                <div>
                                    <h3 className="experience-role">Frontend Developer & Designer</h3>
                                    <p className="experience-company">
                                        <a href="https://danlab.dev" target="_blank" rel="noopener noreferrer" className="company-link">
                                            Dan Labs
                                        </a>
                                        <span className="experience-separator"> · </span>
                                        <span className="experience-date-inline">Present</span>
                                    </p>
                                </div>
                            </div>
                            <ul className="experience-list">
                                <li>Designing intuitive, user-focused interfaces that balance aesthetics with usability.</li>
                                <li>Building responsive, high-performance web experiences using modern frontend technologies.</li>
                                <li>Transforming product ideas into polished, scalable designs and production-ready code.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="section projects-section">
                    <div className="section-content">
                        <h2 className="section-title">Projects</h2>
                        <ProjectCards
                            projects={[
                                {
                                    title: 'Scoutly',
                                    technologies: [
                                        { name: 'AI' },
                                        { name: 'Gemini' },
                                        { name: 'MongoDB' },
                                        { name: 'Redis' }
                                    ],
                                    description: 'AI-powered startup discovery platform that helps find recently funded startups in real-time using Google\'s Gemini AI and advanced search techniques.',
                                    codeUrl: 'https://github.com/dipankarchettri/scoutly'
                                },
                                {
                                    title: 'Cervix AI',
                                    technologies: [
                                        { name: 'Python' },
                                        { name: 'TensorFlow' },
                                        { name: 'Flask' },
                                        { name: 'OpenCV' }
                                    ],
                                    description: 'AI-powered cervical cancer detection system using deep learning for medical image analysis. Built with TensorFlow and Flask for real-time diagnosis assistance.',
                                    codeUrl: 'https://github.com/KhalandarS/cervix_ai'
                                },
                                {
                                    title: 'Dan Papers',
                                    technologies: [
                                        { name: 'React' },
                                        { name: 'TypeScript' },
                                        { name: 'Convex' },
                                        { name: 'Vite' }
                                    ],
                                    description: 'A minimalist research publishing platform with article management, markdown rendering, AI-assisted writing, and GitHub OAuth authentication.',
                                    codeUrl: 'https://github.com/dan-labs-agi/dan-papers'
                                },
                                {
                                    title: 'PACT',
                                    technologies: [
                                        { name: 'JavaScript' },
                                        { name: 'Node.js' },
                                        { name: 'Chart.js' }
                                    ],
                                    description: 'Performance Analytics & Code Tracker - Centralized dashboard for educators to monitor student programming progress by aggregating real-time stats from LeetCode and GitHub.',
                                    codeUrl: 'https://github.com/dipankarchettri/PACT'
                                },
                                {
                                    title: 'BreatheEasy',
                                    technologies: [
                                        { name: 'TypeScript' },
                                        { name: 'Vite' },
                                        { name: 'Tailwind CSS' },
                                        { name: 'Drizzle ORM' }
                                    ],
                                    description: 'Fast Vite-powered air quality monitoring platform with modern UI, modular architecture, and clean database configuration using Drizzle ORM.',
                                    codeUrl: 'https://github.com/KhalandarS/breatheEasy'
                                },
                                {
                                    title: 'Resto Landing',
                                    technologies: [
                                        { name: 'HTML' },
                                        { name: 'CSS' },
                                        { name: 'JavaScript' }
                                    ],
                                    description: 'Modern restaurant landing page with elegant UI design, featuring smooth animations and responsive layouts for an exceptional user experience.',
                                    codeUrl: 'https://github.com/KhalandarS/resto-landing-page'
                                }
                            ]}
                        />
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="section contact-section">
                    <div className="section-content">
                        <div className="contact-container">
                            <span className="contact-label">GET IN TOUCH</span>
                            <h2 className="contact-title">Let's Build Something Together.</h2>
                            <p className="contact-description">
                                Open for freelance and full-time work. Shipping fast, scalable, and well-designed products.
                            </p>

                            <div className="contact-links">
                                <a href="https://github.com/KhalandarS" target="_blank" rel="noopener noreferrer" className="contact-link" title="GitHub">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                                <a href="https://linkedin.com/in/kh2zb" target="_blank" rel="noopener noreferrer" className="contact-link" title="LinkedIn">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                                <a href="mailto:khalandars2005@gmail.com" className="contact-link" title="Email">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <polyline points="22,6 12,13 2,6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                                <a href="tel:+919591990786" className="contact-link" title="Phone">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default App
