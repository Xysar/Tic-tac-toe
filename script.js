const player = (name, symbol) => {
  return { name, symbol };
};

const gameBoard = (() => {
  let gameArray = [];
  let boardSpaces = document.querySelectorAll(".gameSquare");

  const getGameArray = () => gameArray;
  for (let i = 0; i < boardSpaces.length; i++) {
    boardSpaces[i].addEventListener("click", (event) => {
      let index = event.target.getAttribute("data");

      if (typeof gameArray[index] !== "undefined") {
        return;
      }
      if (index === null) {
        return;
      }
      if (!gameDirector.getGameRunning()) {
        return;
      }
      gameArray[index] = gameDirector.getCurrentPlayer().symbol;
      event.target.firstChild.innerText = gameArray[index];
      gameDirector.turnOver();
    });
  }
  const resetBoard = () => {
    boardSpaces.forEach((e) => {
      e.firstChild.innerText = "";
    });
    gameArray = [];
  };

  return { getGameArray, resetBoard };
})();

const gameDirector = (() => {
  let player1 = player("player", "X");
  let player2 = player("computer", "O");
  let gameRunning = true;

  const container = document.querySelector(".container");

  let spacesLeft = 9;
  let currentPlayer = player1;
  let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const playerDisplay = document.getElementById("currentPlayerDisplay");

  const getCurrentPlayer = () => currentPlayer;
  const getGameRunning = () => gameRunning;
  const changePlayerDisplay = () => {
    playerDisplay.innerText = currentPlayer.symbol;
  };

  const checkWin = () => {
    let board = gameBoard.getGameArray();

    //check 'X'
    for (let i = 0; i < winConditions.length; i++) {
      let array = winConditions[i];
      if (
        board[array[0]] === player1.symbol &&
        board[array[1]] === player1.symbol &&
        board[array[2]] === player1.symbol
      ) {
        gameOver("Player 1");
        return;
      }
      if (
        board[array[0]] === player2.symbol &&
        board[array[1]] === player2.symbol &&
        board[array[2]] === player2.symbol
      ) {
        gameOver("Player 2");
        return;
      }
    }
    if (spacesLeft === 0) {
      gameOver("tie");
    }
  };

  const gameOver = (endState) => {
    const announcement = document.createElement("p");
    if (endState === "tie") {
      announcement.innerText = "Tied Game";
    } else {
      announcement.innerText = endState + " is the winner!";
    }
    gameRunning = false;
    const button = document.createElement("button");
    button.innerText = "Play Again?";
    button.addEventListener("click", (event) => {
      restartGame();
      container.removeChild(button);
      container.removeChild(announcement);
    });
    container.appendChild(announcement);
    container.appendChild(button);
  };

  const restartGame = () => {
    gameBoard.resetBoard();
    gameRunning = true;
    spacesLeft = 9;
  };

  const turnOver = () => {
    if (player1 === currentPlayer) {
      currentPlayer = player2;
    } else currentPlayer = player1;
    changePlayerDisplay();
    spacesLeft--;
    checkWin();
  };

  return { turnOver, getCurrentPlayer, getGameRunning };
})();
