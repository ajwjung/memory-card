function Card({ characterName, srcUrl, onClick }) {
    return (
        <div className="card" onClick={(e) => onClick(e)}>
            <img src={srcUrl} alt={characterName} />
            <p className="characterName">{characterName}</p>
        </div>
    )
}

export default Card;