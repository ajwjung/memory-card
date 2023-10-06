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

    return {
        sortByFavorites, formatName
    }
})();

export default Data;