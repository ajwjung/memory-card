import PropTypes from "prop-types";
import "../styles/Popup.css"

function Popup({ gameoverStatus, characterName, popupStyle, handleClosePopup }) {
    const loseGameText = ["I-I'm sorry!!", "I'll try my best!", "I won't fail next time!"];
    const winGameText = ["I'll continue to work hard!!", "You can count on me!", "PHEW-!"];

    return (
        <>
            <div className={gameoverStatus === "lose" 
                ? "gameOverPopup red" 
                : "gameOverPopup green"} 
                style={popupStyle}
            >
                {gameoverStatus === "lose" && <>
                    <p className="failure">YOU FAILED</p>
                    <p>You wasted precious time calling for {characterName} again when you could have warned the others. The titans have closed in on us and many scouts and civilians have lost their lives. What do you think you're doing?!</p>
                </>}
                {gameoverStatus === "win" && <>
                    <p className="success">YOU SUCCEEDED</p>
                    <p>Great job, scout! You were able to call everyone in time to inform them of our plans. A few cadets have lost their lives but most survived thanks to you. Keep up the good work!</p>
                </>}

                <button 
                    onClick={handleClosePopup}
                    className={gameoverStatus === "lose"
                        ? "restart red"
                        : "restart green"
                    } 
                    type="button"
                >
                    {/* Randomly choose what text to display */}
                    {gameoverStatus === "lose" && loseGameText[Math.floor(Math.random() * loseGameText.length)]}
                    {gameoverStatus === "win" && winGameText[Math.floor(Math.random() * winGameText.length)]}
                </button>
            </div>
            <div className="overlay" style={popupStyle}></div>
        </>
    )
}

Popup.propTypes = {
    gameoverStatus: PropTypes.string,
    characterName: PropTypes.string,
    popupStyle: PropTypes.shape({
        display: PropTypes.string,
    }),
    handleClosePopup: PropTypes.func,
}

export default Popup;