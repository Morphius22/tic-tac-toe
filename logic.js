
const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {
        getName,
        getSymbol,
    }
}

const gameBoard = (() => {

    const board = [];
    let playFriendToggle = true;
    let playComputerToggle = false;

    const gameSetup = () => {
        playFriendsButton = document.querySelector('#playFriends')
        playComputerButton = document.querySelector('#playComputers')

        playFriendsButton.addEventListener('click', playFriends)
        playComputerButton.addEventListener('click', playComputer)
    }

    const playFriends = () => {
        playFriendToggle = true;
        console.log ('this is play friend ' + playFriendToggle)
        playComputerToggle = false;
        console.log ('this is play comp ' + playComputerToggle)
    }

    const playComputer = () => {
        playComputerToggle = true;
        console.log ('this is play comp ' + playComputerToggle)       
        playFriendToggle = false;
        console.log ('this is play friend ' + playFriendToggle)
    }

    const displayBoard = () => {
        for (let i = 0; i < 9; i++) {
            const boardGrid = document.querySelector(".board");
            const placeDiv = document.createElement('div');
            boardGrid.appendChild(placeDiv);
            placeDiv.classList.add('square')
            placeDiv.setAttribute('data-row', i);
        };
    };

    const placeSymbol = (board) => {
        board.forEach(object => {
            const placeSymbol = document.createElement('p');
            const div = document.querySelector("[data-row=" + CSS.escape(object.position) + "]");
            placeSymbol.textContent = object.symbol;
            placeSymbol.classList.add('symbol');
            div.appendChild(placeSymbol);
        })
    };

    const eraseSymbols = () => {
        document.querySelectorAll('.symbol').forEach(item => item.remove());
    }

    const eraseEvents = () => {
        document.querySelectorAll('.square').forEach(div => div.removeEventListener('click', myClickHandler));
    }

    const myClickHandler = (e) => {
        if (board.length == 0) {
            board.push({symbol: humanPlayer.getSymbol(), player: humanPlayer.getName(), position: e.currentTarget.dataset.row})
        } 
        
        else if (board[board.length-1].symbol == "X") {
            board.push({symbol: computerPlayer.getSymbol(), player: computerPlayer.getName(), position: e.currentTarget.dataset.row})
        } 
        
        else {
            board.push({symbol: humanPlayer.getSymbol(), player: humanPlayer.getName(), position: e.currentTarget.dataset.row})
        };

        console.log(board);
        eraseSymbols();
        placeSymbol(board);
        checkForWinner();
    }

    const updateBoard = () => {
        boardDivs = document.querySelectorAll('.square');
        boardDivs.forEach(div => {
            div.addEventListener('click', myClickHandler, {once : true})
        }); 
    };

    const resetBoard = () => {
        resetButton = document.querySelector('#reset');
        resetButton.addEventListener('click', e => {
            eraseSymbols();
            eraseEvents();
            board.length = 0;
            updateBoard();
            placeSymbol(board);
        winnerText = document.querySelector('.winner')
        winnerText.remove()
        })
    }

    const checkForWinner = () => {
        //arrays of all possible positions you can use to win  
        const diagnolOne = ['0','4','8'];
        const diagnolTwo = ['2','4','6'];
        const horizontalOne = ['0','1','2'];
        const horizontalTwo = ['3','4','5'];
        const horizontalThree = ['6','7','8'];
        const verticalOne = ['0','3','6'];
        const verticalTwo = ['1','4','7'];
        const verticalThree = ['2','5','8'];

        //filter the board array to only include moves made by the player
        let playerMoves = board.filter(object => (object.player == 'Player'));
        console.log(playerMoves)

        //filter the board array to only include moves made by the computer
        let computerMoves = board.filter (object => (object.player == 'Computer'));
        console.log('these are comp positions: ' + computerMoves)

        //filter the players moves to only include positions they placed a symbol in
        let playerPositions = playerMoves.map(object => object.position)
        console.log('these are the player positions: ' + playerPositions)

        //filter the computers moves to only include positions they placed a symbol in
        let computerPositions = computerMoves.map(object => object.position)
        console.log('these are the computer positions: ' + computerPositions)

        //Check if computer wins in any horizontal, vertical, or diagnol rows.
        let checkOneComp = diagnolOne.every(position => computerPositions.includes(position));
        let checkTwoComp = diagnolTwo.every(position => computerPositions.includes(position));
        let checkThreeComp = horizontalOne.every(position => computerPositions.includes(position));
        let checkFourComp = horizontalTwo.every(position => computerPositions.includes(position));
        let checkFiveComp = horizontalThree.every(position => computerPositions.includes(position));
        let checkSixComp = verticalOne.every(position => computerPositions.includes(position));
        let checkSevenComp = verticalTwo.every(position => computerPositions.includes(position));
        let checkEightComp = verticalThree.every(position => computerPositions.includes(position));

        //if the computer has won, end the game and show a winner message
        if (checkOneComp == true || checkTwoComp == true || checkThreeComp == true || checkFourComp == true || checkFiveComp == true || checkSixComp == true || checkSevenComp == true || checkEightComp == true) {
            console.log('computer is a winner!');
            const header = document.querySelector('.header');
            const displayWinner = document.createElement('p');
            displayWinner.textContent = ('The Computer has won the game! Click the reset board button to play again');
            displayWinner.classList.add('winner');
            header.appendChild(displayWinner);
            eraseEvents();
        }

        //Check if the player wins in any horizontal, vertical, or diagnol rows.
        let checkOnePlayer = diagnolOne.every(position => playerPositions.includes(position));
        let checkTwoPlayer = diagnolTwo.every(position => playerPositions.includes(position));
        let checkThreePlayer = horizontalOne.every(position => playerPositions.includes(position));
        let checkFourPlayer = horizontalTwo.every(position => playerPositions.includes(position));
        let checkFivePlayer = horizontalThree.every(position => playerPositions.includes(position));
        let checkSixPlayer = verticalOne.every(position => playerPositions.includes(position));
        let checkSevenPlayer = verticalTwo.every(position => playerPositions.includes(position));
        let checkEightPlayer = verticalThree.every(position => playerPositions.includes(position));

        //if the player has won, end the game and show a winner message
        if (checkOnePlayer == true || checkTwoPlayer == true || checkThreePlayer == true || checkFourPlayer == true || checkFivePlayer == true || checkSixPlayer == true || checkSevenPlayer == true || checkEightPlayer == true) {
            console.log('player is a winner!')
            const header = document.querySelector('.header')
            const displayWinner = document.createElement('p');
            displayWinner.textContent = ('The player has won the game! Click the reset board button to play again')
            displayWinner.classList.add('winner')
            header.appendChild(displayWinner)
            eraseEvents();
        }

        //check for a draw and end the game if there is one
        if (board.length == 9 && checkOnePlayer == false && checkTwoPlayer == false && checkThreePlayer == false && checkFourPlayer == false && checkFivePlayer == false && checkSixPlayer == false && checkSevenPlayer == false && checkEightPlayer == false) {
            const header = document.querySelector('.header')
            const displayWinner = document.createElement('p');
            displayWinner.textContent = ('The game is a draw! Click the reset board button to play again')
            displayWinner.classList.add('winner');
            header.appendChild(displayWinner);
            eraseEvents();
        }
    }

    return {
        displayBoard,
        updateBoard,
        board,
        placeSymbol,
        eraseSymbols,
        resetBoard,
        eraseEvents,
        checkForWinner,
        gameSetup,
        // displaySymbols,
    }
})();

// const gameController = () => {
//     //eventually add in functions below
// }

const computerPlayer = Player('Computer', 'O');
const humanPlayer = Player('Player', 'X');
console.log(computerPlayer);
console.log(humanPlayer);
gameBoard.gameSetup();
gameBoard.displayBoard();
gameBoard.updateBoard();
gameBoard.resetBoard();


//in the future, add in something for someone to play against a computer or with two people.
//click a single player or mutkuplater button, toggles a variable which changes how it plays
//Still need to add in draw behavior is computer makes the last move