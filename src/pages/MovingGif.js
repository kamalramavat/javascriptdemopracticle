import React from 'react';
import './styles.css';

class MovingGif extends React.Component {
    constructor(props) {
        super(props);
        this.gifRef = React.createRef();
        this.toggleDirection = this.toggleDirection.bind(this);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    toggleDirection() {
        const gif = this.gifRef.current;

        // Generate a random number to determine the direction
        const direction = this.getRandomInt(1, 5);

        // Apply the selected direction
        switch (direction) {
            case 1: // Horizontal movement to the right
                gif.style.animation = 'marquee-right 5s linear infinite'; // Start horizontal movement animation to the right
                break;
            case 2: // Horizontal movement to the left
                gif.style.animation = 'marquee-left 5s linear infinite'; // Start horizontal movement animation to the left
                break;
            case 3: // Vertical movement
                gif.style.animation = 'scrollDown 5s linear forwards'; // Start scrolling down animation
                break;
            case 4: // Opposite movement (scrolling up)
                gif.style.animation = 'scrollUp 5s linear forwards'; // Start scrolling up animation
                break;
            case 5: // Opposite movement (scrolling left)
                gif.style.animation = 'scrollLeft 5s linear forwards'; // Start scrolling left animation
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div id="container">
                <img
                    ref={this.gifRef}
                    id="gif"
                    src="1.gif"
                    alt="gif"
                    onClick={this.toggleDirection}
                />
            </div>
        );
    }
}

export default MovingGif;
