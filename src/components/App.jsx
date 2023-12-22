import '../styles/App.css';
import { useState, useEffect } from 'react';
import Card from './Card';
import Heading from './Heading';
import Popup from './Popup';
import Data from '../scripts/Data';

let repeatedClick;
let backgroundImages = [];

function App() {
  const [characterInfo, setCharacterInfo] = useState([]);
  const [scoreboard, setScoreboard] = useState({
    current: 0,
    highest: 0
  });
  const [popupStyle, setPopupStyle] = useState({ display: "none" });
  const [gameover, setGameover] = useState(null);

  // Fetch character data
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
        const sorted = response.data.sort(Data.sortByFavorites).splice(0, 12);
        const updatedCharacterData = sorted.map((charData, index) => {
          return {
            id: index,
            name: Data.formatName(charData.character.name),
            src: charData.character.images.jpg.image_url,
            clicked: false,
          }
        })
        const shuffledCharacterData = Data.shuffleCards(updatedCharacterData);

        setCharacterInfo(shuffledCharacterData);
      });
    }

    return () => {
      ignore = true;
    }
  }, []);

  // Fetch background image link
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      fetch(`https://api.jikan.moe/v4/anime/16498/pictures`, {
        mode: "cors",
      })
      .then(function (response) {
        return response.json();
      })
      .then(function(response) {
        backgroundImages = [
          `url("${response.data[2].jpg.large_image_url}")`,
          `url("${response.data[8].jpg.large_image_url}")`
        ]
        
        Data.updateBackgroundImage(backgroundImages, "continue");
      })
    }

    return () => {
      ignore = true;
    }
  }, [])

  function handleUpdateScores(cardPreviouslyClicked) {
    // Card not clicked on yet - game continues
    if (!cardPreviouslyClicked && scoreboard.current + 1 < characterInfo.length) {
      setScoreboard({
        current: scoreboard.current + 1,
        highest: (scoreboard.current + 1 > scoreboard.highest)
          ? scoreboard.current + 1
          : scoreboard.highest
      })
    } else if (!cardPreviouslyClicked) {
      // Card not clicked on yet but it's the last one - end game (win)
      setScoreboard({
        current: 0,
        highest: scoreboard.current + 1
      })
    } else {
      // Card already clicked on - end game (lose)
      setScoreboard({
        current: 0,
        highest: (scoreboard.current + 1 > scoreboard.highest)
          ? scoreboard.current
          : scoreboard.highest
      })
    }
  }

  function resetUserData() {
    const resetData = characterInfo.map(char => {
      return {
        ...char,
        clicked: false,
      }
    });
    
    setCharacterInfo(Data.shuffleCards(resetData));
  }

  function handleClick(e) {
    const clickedCard = e.target.closest(".card");
    const cardName = clickedCard.querySelector(".characterName").textContent;
    const cardClicked = characterInfo.find(char => char.name === cardName);

    // Game continues
    if (!cardClicked.clicked && scoreboard.current + 1 < characterInfo.length) {
      const updatedData = characterInfo.map(char => {
        if (char.name === cardName) {
          return {
            ...char,
            clicked: true,
          }
        } else {
          return char;
        }
      })
      
      setCharacterInfo(Data.shuffleCards(updatedData));
    } else if (!cardClicked.clicked && scoreboard.current + 1 === characterInfo.length) {
      // User won - game over
      resetUserData();
      setGameover("win");
      setPopupStyle({ display: "block" })
    } else {
      // User failed - game over
      repeatedClick = cardClicked.name;

      setGameover("lose");
      resetUserData();
      setPopupStyle({ display: "block" });
      Data.updateBackgroundImage(backgroundImages, "end");
    }

    handleUpdateScores(cardClicked.clicked);
  }

  function handleClosePopup() {
    setGameover(null);
    setPopupStyle({ display: "none" })
    Data.updateBackgroundImage(backgroundImages, "continue");
  }

  return (
    <>
      <Heading scoreboard={scoreboard}/>
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
      <Popup 
        gameoverStatus={gameover}
        characterName={repeatedClick}
        popupStyle={popupStyle}
        handleClosePopup={handleClosePopup}
      />
    </>
  )
}

export default App;
