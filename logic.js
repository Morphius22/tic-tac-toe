
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
    }

    const updateBoard = () => {
        boardDivs = document.querySelectorAll('.square');
        boardDivs.forEach(div => {
            div.addEventListener('click', myClickHandler, {once : true})
        }); 
    };


    // const updateBoard = () => {
    //     boardDivs = document.querySelectorAll('.square');
    //     boardDivs.forEach(div => {
    //         div.addEventListener('click', e => {
    //          board.push({symbol: 'X', player: '2', position: div.getAttribute("data-row")})
    //          console.log(board);
    //          eraseSymbols();
    //          placeSymbol(board);
    //         }, {once : true})
    //     }); 
    // };

    const resetBoard = () => {
        resetButton = document.querySelector('#reset');
        resetButton.addEventListener('click', e => {
            eraseSymbols();
            eraseEvents();
            board.length = 0;
            updateBoard();
            placeSymbol(board);
        })
    }

    const checkForWinner = () => {

    }

    return {
        displayBoard,
        updateBoard,
        board,
        placeSymbol,
        eraseSymbols,
        resetBoard,
        eraseEvents,
        // displaySymbols,
    }
})();

// const gameController = () => {
//     //eventually add in functions below
// }

const computerPlayer = Player('Computer', 'O');
const humanPlayer = Player('Player', 'X');
gameBoard.displayBoard();
gameBoard.updateBoard();
gameBoard.resetBoard();



//board is generated without any positions in it (done)

//event listeners are set up on each board position (done)

//when an event listener is clicked, the position number 
//is added to the array as a new object with a data attribute
//so I can knw which position was clicked (can i simplify this with event delegation?)

//the new item in the array causes a symbol to be addded into the clicked div