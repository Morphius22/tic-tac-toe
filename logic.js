
const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {
        move,

    }
}

const gameBoard = (() => {

    const getBoard = () => {
        let board = ['x','o','x','o','x','o','x','o','x']
        return board;
    }

    const displayBoard = (board) => {
        board.forEach(position => {
            const boardGrid = document.querySelector(".board")
            const placeSymbol = document.createElement('p');
            placeSymbol.textContent = position;
            placeSymbol.classList.add('symbol');
            boardGrid.appendChild(placeSymbol);
        })
    }

    return {
        displayBoard,
        getBoard
    }
})();

gameBoard.displayBoard(gameBoard.getBoard());