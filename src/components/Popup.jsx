import "../styles/Popup.css"

function Popup({ characterName, popupStyle, handleClosePopup }) {
    const buttonText = ["I-I'm sorry!!", "I'll try my best!", "I won't fail next time!"];

    return (
        <>
            <div className="gameOverPopup" style={popupStyle}>
                <p className="failure">YOU FAILED</p>
                <p>You wasted precious time calling for {characterName} again when you could have warned the others. The titans have closed in on us and many scouts and civilians have lost their lives. What do you think you're doing?!</p>

                <button 
                    onClick={handleClosePopup}
                    className="restart" 
                    type="button"
                >
                    {/* Randomly choose what text to display */}
                    {buttonText[Math.floor(Math.random() * buttonText.length)]}
                </button>
            </div>
            <div className="overlay" style={popupStyle}></div>
        </>
    )
}

export default Popup;