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

    return {
        sortByFavorites, formatName, shuffleCards
    }
})();

export default Data;