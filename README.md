# ISTE Tic-Tac-Toe

A browser-based, single-player tic-tac-toe game built with React, Vite, React Router, and Tailwind CSS. The project was used at ISTE Manipal's TechTatva event at MIT Manipal.

## Play locally

Use Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Enter a display name, then play as X against the computer. The bot chooses an available square at random. The browser keeps the display name and match statistics in local storage.

## Project layout

- [src/pages](src/pages) contains the home, game, and results screens.
- [src/lib/gameLogic.js](src/lib/gameLogic.js) contains board evaluation and bot move selection.
- [src/lib/useStats.js](src/lib/useStats.js) handles persistent match statistics.

Run `npm run build` to create a production bundle in `dist/`. The `npm run preview` command serves that bundle locally. For static hosting, configure the host to serve `index.html` for client-side routes.
