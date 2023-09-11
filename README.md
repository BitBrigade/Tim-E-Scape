<h1 align="center"> ⏳ Tim-E-Scape ⌛ </h1>

<h4 align="center"> 
  Our game for gamedev.js jam 2023 <br>
  (Theme : TIME)
</h4>

<h3 align="center" >
  <a href="https://sumitst05.itch.io/tim-e-scape"><img alt="play at: sumitst05.itch.io" src="https://img.shields.io/badge/play%20at-sumitst05.itch.io-brightgreen?style=for-the-badge"></a>
  <br>
  <img alt="Status: Released" src="https://img.shields.io/badge/status-released 1.0.0-red?style=for-the-badge">
  <br><br>
  <h6 align="center" style="padding-top:5px; margin-top:0; margin-bottom:2em">
    A small and simple maze game:<br>Help the blob escape the maze using the portal before the bomb timer runs out!
    
  </h6>
</h3>

## Table of Contents

- [Getting Started](#getting-started)
- [Running the Game](#running-the-game)
- [Built With](#built-with)
- [How To Play?](#how-to-play)
- [Authors](#authors)
- [License](#license)

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.
If you do not want to build from source you can skip to [Running the Game](#running-the-game)

### Prerequisites

- [Node.js](https://nodejs.org/) (version 19.8.1 or higher)
- [npm](https://www.npmjs.com/) (version 8.19.2 or higher)

### Installing (Build from source)

1. Clone the repository to your local machine:

```bash
git clone https://github.com/BitBrigade/gamedevjs-2023
```

2. Install the required dependencies:

```bash
npm install && npm i -g http-server
```

### Running the Game

- Without Building:

The game is deployed to Vercel so you can play the game online by visiting the following link:

```bash
https://tim-e-scape.vercel.app/
```

- Building from source:

  - Start the local development server:

  ```bash
  # inside the cloned repository (Tim-E-Scape)
  http-server ./
  ```

  - Open your web browser and navigate to `http://localhost:8081` (replace 8081 with whatever port number you get)

  - You should now see the game's index.html page displayed in your browser.

**or**

- You can just build the docker image by the dockerfile provided in the repo by doing:

```sh
docker build . -t timeescape
```

- and then run the game by doing:

```sh
docker run -it time-escape
```

## How To Play?

1. Use the arrow keys to move the blob.
2. Avoid the lasers.
3. Escape using the portal before bomb timer runs out.

https://user-images.githubusercontent.com/106669732/235342611-1a165ced-fcd4-4ec1-a163-5abb3c923ea1.mp4

## Built With

- [Phaser](https://phaser.io/) - Game development framework for HTML5 games
- [Node.js](https://nodejs.org/) - JavaScript runtime environment for server-side development
- [Express](https://expressjs.com/) - Web application framework for Node.js

## Authors

- Amit - [github.com/amitsuthar69](https://github.com/amitsuthar69)
- Harshil - [github.com/Harshil-08](https://github.com/Harshil-08)
- Rishabh - [github.com/Rishabh672003](https://github.com/Rishabh672003)
- Sumit - [github.com/sumitst05](https://github.com/sumitst05)

## License

This project is licensed under the GNU General Public License - see the [LICENSE](LICENSE) file for details.
