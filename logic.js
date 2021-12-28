
const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {
        getName,
        getSymbol,
    }
}

const gameBoard = (() => {

    const board = ['x','o','x','o','x','o','x','o','x'];

    const displayBoard = () => {
        for (let i = 0; i < 9; i++) {
            const boardGrid = document.querySelector(".board");
            const placeDiv = document.createElement('div');
            boardGrid.appendChild(placeDiv);
            placeDiv.classList.add('square')
            placeDiv.setAttribute('data-row', i);
        };
    };

    const updateBoard = () => {
        boardDivs = document.querySelectorAll('.square');
        boardDivs.forEach(div => {
            div.addEventListener('click', e => {
             board.push({symbol: 'X', player: '2', position: div.getAttribute("data-row")})
             console.log(board)
            })
        }); 
    };

    // const updateBoard {

    // }

    // const displaySymbols = (board) => {
    //     boardDivs = document.querySelectorAll('.square');
    //     boardDivs.forEach((div, i) => {
    //         //if the current loop matches the data attribute of the array position, then add symbol. If not, continue.
    //         if () {
    //             //place symbol into the div
    //             const placeSymbol = document.createElement('p');
    //             placeSymbol.textContent = board.index;
    //             placeSymbol.classList.add('symbol');
    //             div.appendChild(placeSymbol);
    //         } else () {
    //             continue
    //         }
    //     })
    // }

    return {
        displayBoard,
        updateBoard,
        board,
        // displaySymbols,
    }
})();


gameBoard.displayBoard();
gameBoard.updateBoard();

//board is generated without any positions in it (done)

//event listeners are set up on each board position (done)

//when an event listener is clicked, the position number 
//is added to the array as a new object with a data attribute
//so I can knw which position was clicked (can i simplify this with event delegation?)

//the new item in the array causes a symbol to be addded into the clicked div