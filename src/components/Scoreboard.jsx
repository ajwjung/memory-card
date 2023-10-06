function Scoreboard({ currentScore, highestScore }) {
    return (
        <div className="scoreboard">
            <div className="currentScore">
                <b>Current score:</b> {currentScore}
            </div>
            <div className="highestScore">
                <b>Highest score:</b> {highestScore}
            </div>
        </div>
    )
}

export default Scoreboard;