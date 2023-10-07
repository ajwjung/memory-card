import "../styles/Heading.css";
import Scoreboard from "./Scoreboard";

function Heading({ scoreboard }) {
    return (
        
        <div className="heading">
            <p className="largeFont">The titans are coming!</p>
            <div className="intro">
            Gather the team and gear up, now! We don't have time so you should only call each person once. The fate of humanity lies in your hands, you must not fail.
            </div>
            <Scoreboard 
            currentScore={scoreboard.current}
            highestScore={scoreboard.highest}
            />
        </div>
    )
}

export default Heading;