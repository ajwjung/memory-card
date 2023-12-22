import PropTypes from "prop-types";
import Scoreboard from "./Scoreboard";
import "../styles/Heading.css";

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

Heading.propTypes = {
    scoreboard: PropTypes.shape({
        current: PropTypes.number,
        highest: PropTypes.number,
    }),
}

export default Heading;