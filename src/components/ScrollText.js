import React, { useEffect, useRef } from 'react';

const ScrollText = ({ text }) => {
    const isScrolling = useRef(false); // Ref to control scrolling state since useState isnt reachable within inital render
    const textRef = useRef(null);  
    const containerRef = useRef(null);  

    useEffect(() => {
        const container = containerRef.current;
        const textElement = textRef.current;
        const containerWidth = container.offsetWidth;
        const textWidth = textElement.offsetWidth;

        if (textWidth > containerWidth) {
            isScrolling.current = true; // Update the ref directly so it can continuosly scroll
            startScrollAnimation(containerWidth, textWidth);
        } else {
            container.style.justifyContent = 'center';
        }
    }, [text]);

    const startScrollAnimation = (containerWidth, textWidth) => {
        let currentPosition = 0; 
        let direction = -1; 

        const maxScroll = textWidth - containerWidth;

        const scroll = () => {
            // Reverse direction when reaching the ends
            if (currentPosition <= -maxScroll) {
                direction = 1; 
            } else if (currentPosition >= 0) {
                direction = -1; 
            }

            currentPosition += direction * 0.5; 

            textRef.current.style.transform = `translateX(${currentPosition}px)`;

            if (isScrolling.current) {
                requestAnimationFrame(scroll);
            }
        };

        requestAnimationFrame(scroll); 
    };

    return (
        <div className="scrollContainer" ref={containerRef}>
            <span className="scrollText" ref={textRef}>{text}</span>
        </div>
    );
};

export default ScrollText;
