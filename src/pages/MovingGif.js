import React, { useState, useEffect } from 'react';
import './styles.css';

const MovingGif = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

    const getRandomPosition = () => {
        return {
            x: Math.random() * (window.innerWidth - 200), // Adjusted to keep GIF inside the window
            y: Math.random() * (window.innerHeight - 200) // Adjusted to keep GIF inside the window
        };
    };

    const getRandomDirection = () => {
        const directions = [
            { x: Math.random() * (window.innerWidth - 200), y: Math.random() * (window.innerHeight - 200) },
            { x: Math.random() * -window.innerWidth, y: Math.random() * -window.innerHeight },
            { x: Math.random() * -window.innerWidth, y: Math.random() * window.innerHeight },
            { x: Math.random() * window.innerWidth, y: Math.random() * -window.innerHeight }
        ];
        return directions[Math.floor(Math.random() * directions.length)];
    };

    const handleClick = () => {
        if (!isDragging) {
            setPosition(getRandomPosition());
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isDragging) {
                setPosition(prevPosition => {
                    const direction = getRandomDirection();
                    return {
                        x: prevPosition.x + (direction.x - prevPosition.x) * 0.01,
                        y: prevPosition.y + (direction.y - prevPosition.y) * 0.01
                    };
                });
            }
        }, 100);
        
        return () => clearInterval(timer);
    }, [isDragging]);

    const handleMouseDown = (event) => {
        setIsDragging(true);
        setStartPosition({
            x: event.clientX - position.x,
            y: event.clientY - position.y
        });
    };

    const handleMouseMove = (event) => {
        if (!isDragging) return;
        setPosition({
            x: event.clientX - startPosition.x,
            y: event.clientY - startPosition.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                cursor: isDragging ? 'grabbing' : 'grab'
            }}
        >
            <img
                id="gif"
                src="1.gif"
                alt="gif"
                onClick={handleClick}
                style={{ cursor: 'pointer' }}
            />
        </div>
    );
};

export default MovingGif;
