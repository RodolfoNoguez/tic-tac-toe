const players = ["X", "O"];
const gameboard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer;
let gameBoardElement;

const createTitle = title => {
    const titleElement = document.createElement("h1");

    titleElement.textContent = title;

    document.body.appendChild(titleElement);
};


const makeGameBoard = () => {
    const gameBoardElement = document.createElement("div");
    gameBoardElement.classList.add("game-board");
    return gameBoardElement;
};

const makeSquare = numSquare =>{
        const square = document.createElement("div");
        square.classList.add("game-square");

        square.addEventListener("click", event =>{
            const { target } = event;
            target.textContent = currentPlayer;
            gameboard[numSquare] = currentPlayer;
            checkboard();
            switchP();
        },
        { once: true }
    );
    return square;
};

const  switchP = () =>{
    if (currentPlayer === players[0]){
        currentPlayer = players[1];
    }
    else{
        currentPlayer = players[0];
    }
};

const checkboard = () =>{
    
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (const wincomb of winningCombos){
        const [a, b, c] = wincomb;
        if (gameboard[a] != "" && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]){
            gameCompleted(`Player ${gameboard[a]} wins!`);
        }
    }

    const squaredUsed = gameboard.every(square => square != "");

    if (squaredUsed){
        gameCompleted("It's a draw!");
    }



};

const gameCompleted = messageText => {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.right = "0";
    overlay.style.bottom = "0";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.textAlign = "center";

    const message = document.createElement("h2");
    message.textContent = messageText;
    message.style.color = "white";
    message.style.fontSize = "3rem";

    overlay.appendChild(message);

    const resetButton = document.createElement("button");
    resetButton.textContent = "Play Again";
    resetButton.style.backgroundColor = "transparent";
    resetButton.style.color = "white";
    resetButton.style.border = "2px solid white";
    resetButton.style.padding = "10px 30px";

    resetButton.addEventListener("click", () => {
        resetGame();
        document.body.removeChild(overlay);
    })

    overlay.appendChild(resetButton);

    document.body.appendChild(overlay);
};

const resetGame = () => {
    if(gameBoardElement){
        document.body.removeChild(gameBoardElement);
    }

    gameBoardElement = makeGameBoard();
    
    for (let i = 0; i <9; i++){
        gameBoardElement.appendChild(makeSquare(i));
    }

    currentPlayer = players[0];
    gameboard.fill("");

    document.body.appendChild(gameBoardElement);
};



createTitle("Tic-Tac-Toe Game");
resetGame();

