function playerFactory (name, sign, isTurn) {
    return {name, sign, isTurn};
}

const gameBoard = (function () {

    const boardContent = ["","","","","","","","",""]

    function plugIntoBoard (index, playerSign) {
        boardContent[index] = playerSign;
    }

    function undoEventListeners () {
        return;
    }

    function getBoardContent (index) {
        return boardContent[index];

    }

    return {plugIntoBoard, getBoardContent}

})();

const gameFlow = (function () {

    //Get the two players
    player1 = playerFactory('Player 1', "X", true);
    player2 = playerFactory('Player 2', "O", false);

    //Winning combinations
    winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    let turnCounter = 0;


    //Allow users to play their turn
    function playTurn(index, node) {
        if(node.textContent !== '') return;
        player1.isTurn === true ? node.textContent = player1.sign : node.textContent = player2.sign;
        gameBoard.plugIntoBoard(index, node.textContent);
        turnOver();

        turnCounter += 1
        if (turnCounter > 4) checkWinConditions();
    }


    //Change the active player
    function turnOver () {

        switch (true) {
            case player1.isTurn:
                player1.isTurn = false;
                player2.isTurn = true;
                break;
            case player2.isTurn:
                player1.isTurn = true;
                player2.isTurn = false;
                break;
        }

    }

    function checkWinConditions() {

        let counter = 0;
        let sign = "test";
        
        //Iterate over all the win combinations
        for(let i = 0; i < winConditions.length; i++) {

            counter = 0;
            //In case of winning match all symbols will be the same, so just extract the first one to run checks.
            let firstSignPosition = winConditions[i][0];
            //If there is nothing on the first position, the win condition is unmatchable, so go to the next one.
            if (gameBoard.getBoardContent(firstSignPosition) !== "") {
                sign = gameBoard.getBoardContent(firstSignPosition)
            }
            else continue;

            //The same sign has to be on all three positions to get a win, so use a counter to verify it is the case
            for(let j = 0; j < 3; j++) {

                let position = winConditions[i][j];
                if(gameBoard.getBoardContent(position) === sign) {
                    counter += 1
                }
            }

            if (counter === 3) {
                console.log('We have a winner')
            }
        }
    }

    return {playTurn}
})();

const displayController = (function () {

    //Cache DOM
    const board = document.querySelector('#gameboard');
    const allTiles = Array.from(board.querySelectorAll('.socket'));

    function bindEventListeners() {

        for(let i = 0; i < allTiles.length; i++) {
            allTiles[i].addEventListener('click', () => (function (node, tile) {return gameFlow.playTurn(node, tile)})(i, allTiles[i]));
        }
    }

    //TODO: Add function to show who has won

    //TODO: Possibly add reset button

    bindEventListeners();

})();
