function Card({ characterName, srcUrl }) {
    let formattedName;

    if (characterName.includes(", ")) {
        const [lastName, firstName] = characterName.split(", ");
        formattedName = `${firstName} ${lastName}`
    } else {
        formattedName = characterName;
    }

    return (
        <div className="card">
            <img src={srcUrl} alt={formattedName} />
            <p className="characterName">{formattedName}</p>
        </div>

    )
}

export default Card;