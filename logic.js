
const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {
        getName,
        getSymbol,
    }
}

const gameBoard = (() => {

    const getBoard = () => {
        let board = ['x','o','x','o','x','o','x','o','x'];
        return board;
    };

    const displayBoard = () => {

        for (let i = 0; i < 9; i++) {
            const boardGrid = document.querySelector(".board");
            const placeDiv = document.createElement('div');
            boardGrid.appendChild(placeDiv);
            placeDiv.classList.add('square')
        };
    };

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
        getBoard,
        // displaySymbols,
    }
})();


gameBoard.displayBoard();


//board is generated without any positions in it (done)

//event listeners are set up on each board position

//when an event listener is clicked, the position number 
//is added to the array as a new object with a data attribute
//so I can knw which position was clicked (can i simplify this with event delegation?)

//the new item in the array causes a symbol to be addded into the clicked div