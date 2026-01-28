import { useState } from 'react'
import './FloatingIcons.css'

const techIcons = [
    { name: 'React', icon: '⚛️', color: '#61DAFB' },
    { name: 'TypeScript', icon: '📘', color: '#3178C6' },
    { name: 'JavaScript', icon: '⚡', color: '#F7DF1E' },
    { name: 'Vue', icon: '💚', color: '#42B883' },
    { name: 'Angular', icon: '🅰️', color: '#DD0031' },
    { name: 'Node', icon: '🟢', color: '#339933' },
    { name: 'Git', icon: '📦', color: '#F05032' },
    { name: 'CSS', icon: '🎨', color: '#1572B6' },
]

const FloatingIcons = () => {
    const [icons] = useState(() =>
        techIcons.map((tech, i) => ({
            ...tech,
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            delay: i * 0.5,
            duration: 3 + Math.random() * 2,
        }))
    )

    return (
        <div className="floating-icons-container">
            {icons.map((icon, index) => (
                <div
                    key={index}
                    className="floating-icon"
                    style={{
                        left: `${icon.x}%`,
                        top: `${icon.y}%`,
                        animationDelay: `${icon.delay}s`,
                        animationDuration: `${icon.duration}s`,
                        color: icon.color,
                    }}
                >
                    <span className="icon-emoji">{icon.icon}</span>
                    <span className="icon-label">{icon.name}</span>
                </div>
            ))}
        </div>
    )
}

export default FloatingIcons
