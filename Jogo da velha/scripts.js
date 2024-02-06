const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[date-winning-message-text]");
const winningMessage = document.querySelector("[date-winning-message]");
const restartButton = document.querySelector("[date-restart-button]");

let isCircleTurn;

const winnigCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const startGame = () =>{
    isCircleTurn = false;
    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x")
        cell.addEventListener("click",handleClick, {once: true});
    }
    
setBoardHoverClasse();
    winningMessage.classList.remove("show-winning-messagem");
};
const endGame = (isDraw) =>{

    if (isDraw){
        winningMessageTextElement.innerText = "Empate!";
    }
    else{
        winningMessageTextElement.innerText = isCircleTurn ? "Circulo Venceu!" : "X Venceu"
    }

    winningMessage.classList.add("show-winning-messagem");
};



const checkForWin = ( cuurentPlayer) =>{
    return winnigCombinations.some(combination =>{
       return combination.every((index)=>{
        return cellElements[index].classList.contains(cuurentPlayer);
       })
    })
}
const placemark = (cell, classToAdd) =>{
    cell.classList.add(classToAdd); 
};
const checkForDraw = () =>{
    return[...cellElements].every((cell) =>{
      return  cell.classList.contains("x") || cell.classList.contains("circle")
    });
}
const setBoardHoverClasse = () =>
{
    board.classList.remove('circle')
    board.classList.remove('x')

    if (isCircleTurn) {

        board.classList.add('circle'); 
    }
    else{
        board.classList.add('x');
    }
}

const swapTurns =() => {
    isCircleTurn = !isCircleTurn;

    setBoardHoverClasse();
};

const handleClick = (e) =>{
    //colocar a marcar (x ou circulo)
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

     placemark(cell, classToAdd);

    // Verificar por vitoria 
    const isWin = checkForWin(classToAdd)

    // verificar por empate
    const isDraw = checkForDraw();
    if(isWin){
        endGame(false)
    } else if(isDraw){
        endGame(true);
    } else{
        //Mudar simbolo 

        swapTurns();
    }

}


startGame();

restartButton.addEventListener("click", startGame);

