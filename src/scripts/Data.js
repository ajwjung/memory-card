const Data = (() => {
    function sortByFavorites(a, b) {
        if (a.favorites > b.favorites) return -1;
        if (a.favorites < b.favorites) return 1;
        return 0;
    }

    function formatName(name) {
        let formattedName;

        if (name.includes(", ")) {
            const [lastName, firstName] = name.split(", ");
            formattedName = `${firstName} ${lastName}`
        } else {
            formattedName = name;
        }

        return formattedName;
    }

    function shuffleCards(array) {
        let currentIndex = array.length;
        let randomIndex;
    
        // While there remain elements to shuffle
        while (currentIndex > 0) {
          // Pick a remaining element at random
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
        
          // And swap it with the current element
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    
        return array;
    }

    function updateBackgroundImage(images, gameStatus) {
        const rootDiv = document.getElementById("root");

        if (gameStatus === "continue") {
            rootDiv.style.backgroundImage = `
                linear-gradient(rgba(255, 255, 255, 0.2),
                rgba(255, 255, 255, 0.2)),
                ${images[0]}
            `;
        } else if (gameStatus === "end") {
            rootDiv.style.backgroundImage = `
                linear-gradient(rgba(255, 255, 255, 0.2),
                rgba(255, 255, 255, 0.2)),
                ${images[1]}
            `;
        }

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            rootDiv.style.removeProperty("background-image");
            if (gameStatus === "continue") {
                rootDiv.style.backgroundColor = `var(--dark-mode-dark-gray)`;
            } else if (gameStatus === "end") {
                rootDiv.style.backgroundColor = `var(--brown)`;
            }
        }
    }

    return {
        sortByFavorites, formatName, shuffleCards, updateBackgroundImage
    }
})();

export default Data;