const player = (name, symbol) => {
  return { name, symbol };
};

const gameBoard = (() => {
  let gameArray = [];
  let boardSpaces = document.querySelectorAll(".gameSquare");

  for (let i = 0; i < boardSpaces.length; i++) {
    boardSpaces[i].addEventListener("click", (event) => {
      let index = event.target.getAttribute("data");
      console.log(index);
      console.log(gameArray);
      if (typeof gameArray[index] !== "undefined") {
        return;
      }
      if (index === null) {
        return;
      }

      gameArray[index] = gameDirector.getCurrentPlayer().symbol;
      event.target.firstChild.innerText = gameArray[index];
      console.log(gameArray);
      gameDirector.turnOver();
    });
  }

  return { gameArray };
})();

const gameDirector = (() => {
  let player1 = player("player", "X");
  let player2 = player("computer", "O");

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
  const changePlayerDisplay = () => {
    playerDisplay.innerText = currentPlayer.symbol;
  };

  const checkWin = () => {
    let board = gameBoard.gameArray;
    //check 'X'
    winConditions.forEach((array) => {
      if (
        board[array[0]] === player1.symbol &&
        board[array[1]] === player1.symbol &&
        board[array[2]] === player1.symbol
      ) {
        gameOver("Player 1");
      }
      if (
        board[array[0]] === player2.symbol &&
        board[array[1]] === player2.symbol &&
        board[array[2]] === player2.symbol
      ) {
        gameOver("Player 2");
      }
    });
  };

  const gameOver = (endState) => {
    if (endState === "tie") {
      console.log("tied game");
    } else {
      console.log(endState + " is the winner!");
    }
  };

  const turnOver = () => {
    if (player1 === currentPlayer) {
      currentPlayer = player2;
    } else currentPlayer = player1;
    changePlayerDisplay();
    checkWin();
    spacesLeft--;
    if (spacesLeft === 0) {
      gameOver("tie");
    }
  };

  return { turnOver, getCurrentPlayer };
})();
