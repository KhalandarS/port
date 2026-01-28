import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface RotatingTextProps {
    texts: string[];
    interval?: number;
    className?: string;
}

const RotatingText: React.FC<RotatingTextProps> = ({
    texts,
    interval = 3000,
    className = ''
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % texts.length);
        }, interval);

        return () => clearInterval(timer);
    }, [texts.length, interval]);

    return (
        <div className={className} style={{ position: 'relative', minHeight: '1.2em' }}>
            <AnimatePresence mode="wait">
                <motion.p
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        margin: 0
                    }}
                >
                    {texts[currentIndex]}
                </motion.p>
            </AnimatePresence>
        </div>
    );
};

export default RotatingText;
