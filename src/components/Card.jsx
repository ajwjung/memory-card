import PropTypes from "prop-types";

function Card({ characterName, srcUrl, onClick }) {
    return (
        <div className="card" onClick={(e) => onClick(e)}>
            <img src={srcUrl} alt={characterName} />
            <p className="characterName">{characterName}</p>
        </div>
    )
}

Card.propTypes = {
    characterName: PropTypes.string,
    srcUrl: PropTypes.string,
    onClick: PropTypes.func,
}

export default Card;