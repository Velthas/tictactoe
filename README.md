# Tic Tac Toe
## Live at: https://velthas.github.io/tictactoe/

### Overview

This simple application allows two players to play a quick game of Tic Tac Toe to settle scores and engage in a simple warfare of wits. 

This project was developed after studying prototype inheritance, object factories and modules. While slightly unintuitive but extremely elegant at first, working through this application allowed me to develop an appreciation for the use of modules and the amazing benefits they can have on code both in terms of readibility and organisation. 

### Functionality 

The idea behind this application is simple: build a Tic Tac Toe game that can be played by two players on the same device. In a game of Tic Tac Toe, each player gets one of two signs, either X or O (arbitrarily decided Player 1 has X and Player 2 has O), and the goal of this game is to line up three istances of your sign in a 3x3 gameboard. Each player gets to fill one spot on the board with one instance of their sign per turn.

The app does exactly that: the first turn is always assigned to player 1. It is not possible to override someone's else sign, so once a spot is taken it cannot be freed unless the game is restarted. If the win conditions are met, the game will declare a winner through the status paragraph above the board. If no winner is found, the app will automatically pick up on this and declare a tie. Games can be reset using the reset button located underneath the board.

### Design Structure

Instead of focusing on each file as I usually do, I'd like to draw your attention to how I have arranged the code this time around. 

Since I needed more than one player for the game, I made sure to have a factory ready to create them with a player name, a sign and a key isTurn that held a boolean value signifying whose turn it is to play.
As of the current moment the name and the sign are not replaceable, but the incredible flexibility of objects would make these easy additions. I might change this in the future.

The rest of the application was split into several modules, created by wrapping the content of a function expression into parentheses and executing it immediately, so using an IIFE. Let's have a look at them now:

+ **gameBoard**: this module contains all the information about the board. Each time a move is played, the sign is stored into the gameBoard array, and that same array is then used to test against all the winConditions in the gameFlow module. Given that the board itself is inaccessible in the scope of the other modules because of the nature of IIFE, I made sure to create some nested functions to update values in the board and reset it when needed. I then exported them as methods of the gameBoard object so that I could use them elsewhere.

+ **gameFlow**: as the name implies, this game handles turns, checks win conditions, and in general contains all processes related to the flow of the game. It is the module that makes more extensive use of the methods exported out of the other two, and could be identified as the core of this application.

+ **displayController**: this module was used to handle all the visual feedback a user gets from the game: from event listeners triggering sign appearances on the board to the notifications about the current state of the game.

### Future Updates

Two possible additions to this project would be the following:

+ **AI**: add the possibility of challenging the computer, possibly with multiple difficulty settings.

+ **Custon name and sign**: allow users to choose their own name and sign by using a form shown upon first loading the page.




