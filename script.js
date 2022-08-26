class Player {
  constructor(name, symbol) {
    this.name = name;
    this.symbol = symbol;
  }
}

class GameBoard {
  constructor() {
    this.gameArray = [];
    this.boardSpaces = document.querySelectorAll(".gameSquare");
    for (let i = 0; i < this.boardSpaces.length; i++) {
      this.boardSpaces[i].addEventListener("click", (event) => {
        let index = event.target.getAttribute("data");

        if (typeof this.gameArray[index] !== "undefined") {
          return;
        }
        if (index === null) {
          return;
        }

        if (!game.getGameRunning()) {
          return;
        }

        this.gameArray[index] = game.getCurrentPlayer().symbol;
        event.target.firstChild.innerText = this.gameArray[index];
        game.turnOver();
      });
    }
  }

  getGameArray() {
    return this.gameArray;
  }
  resetBoard() {
    this.boardSpaces.forEach((e) => {
      e.firstChild.innerText = "";
    });
    this.gameArray = [];
  }
}

class GameDirector {
  constructor() {
    this.player1 = new Player("player", "X");
    this.player2 = new Player("computer", "O");
    this.gameRunning = true;

    this.container = document.querySelector(".container");

    this.spacesLeft = 9;
    this.currentPlayer = this.player1;
    this.winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    this.playerDisplay = document.getElementById("currentPlayerDisplay");
  }
  getCurrentPlayer() {
    return this.currentPlayer;
  }
  getGameRunning() {
    return this.gameRunning;
  }
  changePlayerDisplay() {
    this.playerDisplay.innerText = this.currentPlayer.symbol;
  }

  checkWin() {
    let board = gameboard.getGameArray();

    //check 'X'
    for (let i = 0; i < this.winConditions.length; i++) {
      let array = this.winConditions[i];
      if (
        board[array[0]] === this.player1.symbol &&
        board[array[1]] === this.player1.symbol &&
        board[array[2]] === this.player1.symbol
      ) {
        this.gameOver("Player 1");
        return;
      }
      if (
        board[array[0]] === this.player2.symbol &&
        board[array[1]] === this.player2.symbol &&
        board[array[2]] === this.player2.symbol
      ) {
        this.gameOver("Player 2");
        return;
      }
    }
    if (this.spacesLeft === 0) {
      this.gameOver("tie");
    }
  }

  gameOver(endState) {
    const announcement = document.createElement("p");
    if (endState === "tie") {
      announcement.innerText = "Tied Game";
    } else {
      announcement.innerText = endState + " is the winner!";
    }
    this.gameRunning = false;
    const button = document.createElement("button");
    button.innerText = "Play Again?";
    button.addEventListener("click", (event) => {
      this.restartGame();
      this.container.removeChild(button);
      this.container.removeChild(announcement);
    });
    this.container.appendChild(announcement);
    this.container.appendChild(button);
  }

  restartGame() {
    gameboard.resetBoard();
    this.gameRunning = true;
    this.spacesLeft = 9;
  }

  turnOver() {
    if (this.player1 === this.currentPlayer) {
      this.currentPlayer = this.player2;
    } else this.currentPlayer = this.player1;
    this.changePlayerDisplay();
    this.spacesLeft--;
    this.checkWin();
  }
}

let game = new GameDirector();
let gameboard = new GameBoard();
