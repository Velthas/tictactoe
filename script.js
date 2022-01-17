function playerFactory (name, sign, isTurn) {
    return {name, sign, isTurn};
}

const gameBoard = (function () {

    let boardContent = ["","","","","","","","",""]

    function plugIntoBoard(index, playerSign) {
        boardContent[index] = playerSign;
    }

    function getBoardContent(index) {
        return boardContent[index];
    }

    function resetBoard() {
        boardContent = boardContent.map(value => value = "");
    }

    return {plugIntoBoard, getBoardContent, resetBoard}

})();

const gameFlow = (function () {

    //Variable will be used to determine if game has been won
    let gameIsOver = false;

    //Get the two players
    let player1 = playerFactory('Player 1', "X", true);
    let player2 = playerFactory('Player 2', "O", false);

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

    //Game can't be won before 5 turns.
    //Run checks after that to improve performance.
    let turnCounter = 0;

    //Allow users to play their turn
    function playTurn(index, node) {

        if(node.textContent !== '' || gameIsOver === true) return;

        player1.isTurn === true ? node.textContent = player1.sign : node.textContent = player2.sign;
        activePlayerSign = player1.isTurn === true ? player2.sign : player1.sign;

        displayController.commentGame(activePlayerSign);
        gameBoard.plugIntoBoard(index, node.textContent);

        turnOver();
        turnCounter += 1
        
        if (turnCounter > 4) checkWinConditions();
        if (turnCounter === 9 && gameIsOver === false) displayController.commentGame('Tie');

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
        let sign = "";
        
        //Iterate over all the win combinations
        for(let i = 0; i < winConditions.length; i++) {

            //Always reset on each run
            counter = 0;

            //Sign on the first position will be repeated three times for a win
            let firstSignPosition = winConditions[i][0];

            //If there is nothing, win condition is impossible
            if (gameBoard.getBoardContent(firstSignPosition) !== "") {
                sign = gameBoard.getBoardContent(firstSignPosition)
            }
            else continue;

            //Check if same repeats three times
            for(let j = 0; j < 3; j++) {

                let position = winConditions[i][j];

                if(gameBoard.getBoardContent(position) === sign) {
                    counter += 1;
                } 
 
            }

            //End the round
            if (counter === 3) {
                displayController.showWinner(sign);
                gameIsOver = true;
            }
        }
    }

    //Cleans up the board after a round is played
    function startNewRound() {
        gameBoard.resetBoard();
        displayController.cleanBoard();

        turnCounter = 0;
        gameIsOver = false;

        if (player1.isTurn === false) turnOver();
        displayController.commentGame("X");
    }

    return {playTurn, startNewRound}
})();

const displayController = (function () {

    //Cache DOM
    const main = document.querySelector('#main');
    const reset = main.querySelector('#reset');
    const board = main.querySelector('#gameboard');
    const gameFlowNarrator = main.querySelector('#gamestatus');
    const allTiles = Array.from(board.querySelectorAll('.socket'));

    function bindEventListeners() {

        for(let i = 0; i < allTiles.length; i++) {
            allTiles[i].addEventListener('click', testHolder = () => (function (node, tile) {return gameFlow.playTurn(node, tile)})(i, allTiles[i]));
        }

        reset.addEventListener('click', gameFlow.startNewRound);

    }

    function showWinner(sign) {
        gameFlowNarrator.textContent = `Player ${sign} won the game!`;
    }

    function commentGame(sign) {
        if (sign === "Tie") {
            gameFlowNarrator.textContent = "It's a draw!";
            return;
        }
        gameFlowNarrator.textContent = `Player ${sign}'s turn!`;
    }

    function cleanBoard() {
        allTiles.forEach(tile => tile.textContent = "");
    }
    
    bindEventListeners();

    return {showWinner, cleanBoard, commentGame};

})();
