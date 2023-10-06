import '../styles/App.css';
import { useState, useEffect } from 'react';

function App() {
  const [characterInfo, setCharacterInfo] = useState([]);
  const [scoreboard, setScoreboard] = useState({
    current: 0,
    highest: 0
  });

  function sortByFavorites(a, b) {
    if (a.favorites > b.favorites) return -1;
    if (a.favorites < b.favorites) return 1;
    return 0;
  }

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      fetch(`https://api.jikan.moe/v4/anime/16498/characters`, {
        mode: "cors",
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        const sorted = response.data.sort(sortByFavorites).splice(0, 12);
        
        setCharacterInfo(
          sorted.map((charData, index) => {
            return {
              id: index,
              name: charData.character.name,
              src: charData.character.images.jpg.image_url,
              clicked: false,
            }
          })
        )
      });
    }

    return () => {
      ignore = true;
    }
  }, []);

  return (
    <>
      <div>Hello, World!</div>
    </>
  )
}

export default App
