import React, { useEffect, useRef } from 'react';

//ScroolText component to handle a long song/artist title within the profile section of the home page
//Accepts text which correlates to a fetched song title or listed artist(s)
//(This is a really detailed component which may not render and was made because one of my favorite songs has a long title and I was doing mobile first design)
//(If you want to see this go into a responsive view and force it until the width of featured songs container has a smaller width than song/artist title. may need to refresh the page)
const ScrollText = ({ text }) => {
    const isScrolling = useRef(false); // useRef to control scrolling state since (useState isnt reachable within inital render)
    const textRef = useRef(null);  
    const containerRef = useRef(null);  

    //useEffect triggers when text is initialized or updates
    useEffect(() => {
        const container = containerRef.current;
        const textElement = textRef.current;
        const containerWidth = container.offsetWidth;
        const textWidth = textElement.offsetWidth;

        //if the length of the text is greate than the width of the container (a long song title on a mobile phone)
        if (textWidth > containerWidth) {
            isScrolling.current = true;
            startScrollAnimation(containerWidth, textWidth); //start back and forth scrolling
        } else {
            container.style.justifyContent = 'center'; // If it is not too long then it will be centered :)
        }
    }, [text]);

    const startScrollAnimation = (containerWidth, textWidth) => {
        let currentPosition = 0; 
        let direction = -1; //Start scrolling to the left!

        //Don't scroll too far, maxScroll is equal to the text length - the container width so we only scroll just until the last or the first char is in view
        const maxScroll = textWidth - containerWidth;

        const scroll = () => {
            // Reverse direction when reaching the ends
            if (currentPosition <= -maxScroll) { //Last char is in view
                direction = 1; 
            } else if (currentPosition >= 0){ //first char is in view
                direction = -1; 
            }
            //speed of scroll
            currentPosition += direction * 0.5; 

            if(textRef){ //Scroll!
                textRef.current.style.transform = `translateX(${currentPosition}px)`;
            }
            

            if (isScrolling.current) { //trigger only if isScrolling is true (contiuous scrolling)
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
