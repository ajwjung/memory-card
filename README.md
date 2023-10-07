# Memory Card

* [Live Demo](https://main--playful-rugelach-b76b6d.netlify.app/)

## Objective

To build a memory card game using React to practice using hooks to manage and utilize states. The memory game involves having the player try to click each card only once and after each click, the cards are shuffled into a different order. The game ends when the player clicks on a card they have already clicked on before. Full details can be found on [The Odin Project's page](https://www.theodinproject.com/lessons/node-path-react-new-memory-card).

## Built With

* CSS3
* React
* Vite

## Playing the Memory Card

The memory card game shows 12 character cards from a popular anime and manga, [Attack on Titan](https://en.wikipedia.org/wiki/Attack_on_Titan). The player may only click on each card once, and the card order gets shuffled on each click. The game ends if and when a card is picked a second time. The scoreboard displays the player's current score and highest score on the top right of the screen.

## API

All character data and images were fetched using [Jikan API](https://jikan.moe/), an open-source API that parses anime and manga information from [MyAnimeList](https://myanimelist.net/).

## Author's Notes

This project was a nice refresher on how to fetch from APIs and was great practice for using hooks in React. One feature I might choose to implement in the future is having different levels (e.g., easy, medium, hard) with fewer or more cards displayed per level. Another fun feature would be to change up the characters displayed each time so things stay fresh.
