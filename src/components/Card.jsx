function Card({ characterName, srcUrl, onClick }) {
    // let formattedName;

    // if (characterName.includes(", ")) {
    //     const [lastName, firstName] = characterName.split(", ");
    //     formattedName = `${firstName} ${lastName}`
    // } else {
    //     formattedName = characterName;
    // }

    return (
        <div className="card" onClick={(e) => onClick(e)}>
            <img src={srcUrl} alt={characterName} />
            <p className="characterName">{characterName}</p>
        </div>
    )
}

export default Card;