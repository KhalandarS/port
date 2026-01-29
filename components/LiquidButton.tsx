import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './LiquidButton.css';

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'secondary' | 'ghost';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    delay?: number;
    fillHeight?: string;
    hoverScale?: number;
    tapScale?: number;
    children: React.ReactNode;
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({
    variant = 'default',
    size = 'default',
    delay = 0,
    fillHeight = '3px',
    hoverScale = 1.05,
    tapScale = 0.95,
    children,
    className = '',
    ...props
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.button
            className={`liquid-button liquid-button--${variant} liquid-button--${size} ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: hoverScale }}
            whileTap={{ scale: tapScale }}
            transition={{ duration: 0.2 }}
            {...props}
        >
            <span className="liquid-button__content">{children}</span>
            <motion.div
                className="liquid-button__liquid"
                initial={{ y: '100%' }}
                animate={{ y: isHovered ? '0%' : '100%' }}
                transition={{
                    duration: 0.4,
                    delay: delay,
                    ease: [0.4, 0, 0.2, 1]
                }}
                style={{ height: fillHeight }}
            />
        </motion.button>
    );
};

export default LiquidButton;
