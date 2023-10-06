function Scoreboard({ currentScore, highestScore }) {
    return (
        <div className="scoreboard">
            <div className="currentScore">Current score: {currentScore}</div>
            <div className="highestScore">Highest score: {highestScore}</div>
        </div>
    )
}

export default Scoreboard;