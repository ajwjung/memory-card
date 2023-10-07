import '../styles/App.css';
import { useState, useEffect } from 'react';
import Card from './Card';
import Heading from './Heading';
import Scoreboard from './Scoreboard';
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
    const cardClicked = characterInfo.find(char => char.name === cardName);
    
    // Game continues
    if (!cardClicked.clicked) {
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
    } else {
      // Game over
      repeatedClick = cardClicked.name;
      const resetData = characterInfo.map(char => {
        return {
          ...char,
          clicked: false,
        }
      })

      setCharacterInfo(Data.shuffleCards(resetData));
      setPopupStyle({ display: "block" });
      Data.updateBackgroundImage(backgroundImages, "end");
    }

    handleUpdateScores(cardClicked.clicked);
  }

  function handleClosePopup() {
    setPopupStyle({ display: "none" })
    Data.updateBackgroundImage(backgroundImages, "continue");
  }

  return (
    <>
      {/* <div className="heading">
        <p className="largeFont">The titans are coming!</p>
        <div className="intro">
          Gather the team and gear up, now! We don't have time so you should only call each person once. The fate of humanity lies in your hands, you must not fail.
        </div>
        <Scoreboard 
          currentScore={scoreboard.current}
          highestScore={scoreboard.highest}
        />
      </div> */}
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
        characterName={repeatedClick}
        popupStyle={popupStyle}
        handleClosePopup={handleClosePopup}
      />
    </>
  )
}

export default App;
