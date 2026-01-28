import { useState, useEffect } from 'react'
import LightPillar from '../components/LightPillar'
import GooeyNav from '../components/GooeyNav'
import BlurText from '../components/BlurText'
import RotatingText from '../components/RotatingText'
import CardSwap, { Card } from '../components/CardSwap'
import './App.css'

const navItems = [
    { label: "Skills", href: "#skills" },
    { label: "Project", href: "#project" },
    { label: "Contact Me", href: "#contact" },
];

function App() {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 50) {
                // Always show navbar at the top
                setIsNavbarVisible(true);
            } else if (currentScrollY > lastScrollY) {
                // Scrolling down - hide navbar
                setIsNavbarVisible(false);
            } else {
                // Scrolling up - show navbar
                setIsNavbarVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleResumeDownload = () => {
        // Replace with your actual resume file path
        const resumeUrl = '/resume.pdf';
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
                        <GooeyNav
                            items={navItems}
                            particleCount={15}
                            particleDistances={[90, 10]}
                            particleR={100}
                            initialActiveIndex={0}
                            animationTime={600}
                            timeVariance={300}
                            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                        />
                    </div>
                    <button className="resume-btn" onClick={handleResumeDownload}>
                        Resume
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 11L3 6H13L8 11Z" fill="currentColor" />
                            <path d="M2 13H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Continuous LightPillar background for all sections */}
            <div className="light-pillar-wrapper">
                <LightPillar
                    topColor="#5227FF"
                    bottomColor="#FF9FFC"
                    intensity={1}
                    rotationSpeed={0.3}
                    glowAmount={0.002}
                    pillarWidth={3}
                    pillarHeight={0.4}
                    noiseIntensity={0.5}
                    pillarRotation={25}
                    interactive={false}
                    mixBlendMode="screen"
                    quality="high"
                />
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
                            {/* Avatar content will go here */}
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
                                    Versatile skill set spanning frontend development, AI/ML, and modern tooling.
                                    Passionate about creating intuitive interfaces and leveraging cutting-edge technologies to solve real-world problems.
                                </p>
                            </div>
                            <div className="skills-container" style={{ height: '600px', position: 'relative' }}>
                                <CardSwap
                                    cardDistance={35}
                                    verticalDistance={70}
                                    delay={3000}
                                    pauseOnHover={true}
                                    width={500}
                                    height={400}
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

                {/* Projects Section */}
                <section id="project" className="section projects-section">
                    <div className="section-content">
                        <h2 className="section-title">Featured Projects</h2>
                        <div className="projects-grid">
                            {/* Projects content will go here */}
                            <p className="placeholder-text">Projects content coming soon...</p>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="section contact-section">
                    <div className="section-content">
                        <h2 className="section-title">Get In Touch</h2>
                        <div className="contact-content">
                            {/* Contact content will go here */}
                            <p className="placeholder-text">Contact content coming soon...</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default App
