//creates a new player
const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {
        getName,
        getSymbol,
    }
}

//contains all of the functions involved in running the game
const gameBoard = (() => {

    //board that will determine placements
    const board = [];

    //possible moves the computer can make
    let possibleMoves = ['0','1','2','3','4','5','6','7','8']

    //holder for the move the computer makess
    let positionHolder = null;

    //true if the player selects play friends
    let playFriendToggle = true;

    //true if the player selects play computer
    let playComputerToggle = false;

    //assigns click listners to the game type buttons
    const gameSetup = () => {
        playFriendsButton = document.querySelector('#playFriends')
        playComputerButton = document.querySelector('#playComputers')

        playFriendsButton.addEventListener('click', playFriends)
        playComputerButton.addEventListener('click', playComputer)
    }

    //initializes all logic for playing against friends
    const playFriends = () => {
        playFriendToggle = true;
        console.log ('this is play friend ' + playFriendToggle)
        playComputerToggle = false;
        console.log ('this is play comp ' + playComputerToggle)
        eraseSymbols();
        changeGame();
        board.length = 0;
        updateBoard();
        placeSymbol(board);
        winnerText = document.querySelector('.winner')
        winnerText.remove()
    }

    //initializes all logic for playing against a computerr 
    const playComputer = () => {
        playComputerToggle = true;
        console.log ('this is play comp ' + playComputerToggle)       
        playFriendToggle = false;
        console.log ('this is play friend ' + playFriendToggle)
        possibleMoves = ['0','1','2','3','4','5','6','7','8']
        eraseSymbols();
        changeGame();
        board.length = 0;
        updateBoard();
        placeSymbol(board);
        console.log('play friend toggle is:')
        console.log(playFriendToggle == false)
        winnerText = document.querySelector('.winner')
        winnerText.remove()
    }

    //creates the nine divs that form the tic tac toe board
    const displayBoard = () => {
        for (let i = 0; i < 9; i++) {
            const boardGrid = document.querySelector(".board");
            const placeDiv = document.createElement('div');
            boardGrid.appendChild(placeDiv);
            placeDiv.classList.add('square')
            placeDiv.setAttribute('data-row', i);
        };
    };

    //place symbols on the board based upon objects in the board arrays position
    const placeSymbol = (board) => {
        board.forEach(object => {
            const placeSymbol = document.createElement('p');
            const div = document.querySelector("[data-row=" + CSS.escape(object.position) + "]");
            placeSymbol.textContent = object.symbol;
            placeSymbol.classList.add('symbol');
            div.appendChild(placeSymbol);
        })
    };

    //erase all symbols on the board
    const eraseSymbols = () => {
        document.querySelectorAll('.symbol').forEach(item => item.remove());
    }

    //add the correct event listeners for the game type the player selects (computer vs friends)
    const changeGame = () => {
        if (playFriendToggle == false) {
            document.querySelectorAll('.square').forEach(div => div.removeEventListener('click', playFriendsClickHandler));
        } else {
            document.querySelectorAll('.square').forEach(div => div.removeEventListener('click', playComputerClickHandler));
        } 
    }

    //erase all events from the div's
    const eraseEvents = () => {
        document.querySelectorAll('.square').forEach(div => div.removeEventListener('click',playFriendsClickHandler));
        document.querySelectorAll('.square').forEach(div => div.removeEventListener('click',playComputerClickHandler));
    }

    //when the player picks a square, the computer will pick an open square immediatly after.
    const playComputerClickHandler = (e) => {
        board.push({symbol: humanPlayer.getSymbol(), player: humanPlayer.getName(), position: e.currentTarget.dataset.row})
        index = possibleMoves.indexOf(e.currentTarget.dataset.row);
        console.log(index)
        possibleMoves.splice(index,1);
        console.log(possibleMoves);

        positionHolder = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
        board.push({symbol: computerPlayer.getSymbol(), player: computerPlayer.getName(), position: positionHolder})
        index = possibleMoves.indexOf(positionHolder);
        console.log(index)
        possibleMoves.splice(index,1);
        console.log(possibleMoves);

        console.log(board);
        eraseSymbols();
        placeSymbol(board);
        checkForWinner();
    }

    //each click adds a new object to the board array. Alternating between computer and player.
    const playFriendsClickHandler = (e) => {
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

    //if playing friends, remove the computer listeners and add friends listeners. Reverse as well.
    const updateBoard = () => {
        boardDivs = document.querySelectorAll('.square');
        boardDivs.forEach(div => {
            if (playFriendToggle == true && playComputerToggle == false) {
                removeEventListener('click', playComputerClickHandler)
                div.addEventListener('click', playFriendsClickHandler, {once : true})
            } else {
                removeEventListener('click', playFriendsClickHandler)
                div.addEventListener('click', playComputerClickHandler, {once : true})
            }
        }); 
    };

    //removes all event listeners, symbols, and objects in the board array.
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

//creates new computer player
const computerPlayer = Player('Computer', 'O');

//creates new human player
const humanPlayer = Player('Player', 'X');


console.log(computerPlayer);
console.log(humanPlayer);

gameBoard.gameSetup();
gameBoard.displayBoard();
gameBoard.updateBoard();
gameBoard.resetBoard();