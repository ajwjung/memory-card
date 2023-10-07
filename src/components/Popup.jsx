function Popup({ characterName, popupStyle }) {
    return (
        <>
            <div className="gameOverPopup" style={popupStyle}>
                <p>You wasted precious time calling for {characterName} that you could have used to warn the others. The titans have closed in on us and many scouts and civilians have lost their lives. What do you think you're doing?!</p>

                <button className="restart" type="button">I-I'm sorry! I'll try my best!!</button>
            </div>
            <div className="overlay" style={popupStyle}></div>
        </>
    )
}

export default Popup;