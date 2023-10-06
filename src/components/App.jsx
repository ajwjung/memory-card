import '../styles/App.css';
import { useState, useEffect } from 'react';
import Card from './Card';
import Scoreboard from './Scoreboard';

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
              name: formatName(charData.character.name),
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

  function handleUpdateScores(cardPreviouslyClicked) {
    // Card not clicked on yet - game continues
    if (!cardPreviouslyClicked) {
      setScoreboard({
        current: scoreboard.current + 1,
        highest: (scoreboard.current + 1 > scoreboard.highest)
          ? scoreboard.current + 1
          : scoreboard.highest
      })
    } else {
      // Card already clicked on - end game
      setScoreboard({
        current: 0,
        highest: (scoreboard.current + 1 > scoreboard.highest)
          ? scoreboard.current
          : scoreboard.highest
      })
    }
  }

  function handleClick(e) {
    const clickedCard = e.target.closest(".card");
    const cardName = clickedCard.querySelector(".characterName").textContent;
    const cardClickedStatus = characterInfo.find(char => char.name === cardName).clicked;
    
    // First time clicking on card - game continues
    if (!cardClickedStatus) {
      setCharacterInfo(
        characterInfo.map(char => {
          if (char.name === cardName) {
            return {
              ...char,
              clicked: true,
            }
          } else {
            return char;
          }
        })
      )
    } else {
      // Card already clicked before - end game
      // Reset all cards' clicked status to false
      setCharacterInfo(
        characterInfo.map(char => {
          return {
            ...char,
            clicked: false,
          }
        })
      )
    }

    handleUpdateScores(cardClickedStatus);
  }

  return (
    <>
    <Scoreboard 
      currentScore={scoreboard.current}
      highestScore={scoreboard.highest}
    />
      <div className="cardsContainer">
        {
          characterInfo.map(character => {
            return (
              <Card 
                characterName={character.name}
                srcUrl={character.src} 
                onClick={handleClick}
                key={character.id} 
              />
            )
          })
        }
      </div>
    </>
  )
}

export default App;
