const xClass = 'x';
const oClass = 'o';

const cellElements = document.querySelectorAll('.cell');
const restartBtn = document.querySelector('.restart');
const nextTurn = document.querySelector('.message');
let oTurn;

restartBtn.addEventListener('click', startGame)

const winningCombinations = [
    //horizontal
    [0,1,2],
    [3,4,5],
    [6,7,8],
    //vertical
    [0,3,6],
    [1,4,7],
    [2,5,8],
    //diagonal
    [0,4,8],
    [2,4,6]
]

//1
function startGame(){
    oTurn = false;
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick);
        cell.innerHTML = '';
        nextTurn.innerHTML= '';
        cell.classList.remove('x', 'o');
    })
}
startGame()

//2
function handleClick(e){
    const currentCell = e.target;
    const currentCellTurn = oTurn ? oClass : xClass;
    oTurn ? currentCell.innerText = 'O' : currentCell.innerText = 'X';
    placeLetter(currentCell, currentCellTurn);

    if(checkWinner(currentCellTurn)){
        nextTurn.innerHTML= `${currentCellTurn.toUpperCase()}'s Winner`;
        cellElements.forEach(el => {
            el.removeEventListener('click', handleClick);
        })
    }else if(isDraw()){
        nextTurn.innerHTML = 'Draw';
    }else{
        oTurn=!oTurn; //switch turn
    }
}

//3
function placeLetter(a, b){
    a.classList.add(b);
    a.removeEventListener('click', handleClick)
    nextTurn.innerHTML = oTurn ? "X's turn" : "O's turn";
}

//4
//check winner combination
//1. loop our array outer
//2. loop inside each combo [0,1,2]
//3. compare to our cells 
//4. if it's match return true
// Combo index [0,1,2] cell index [0,1,2] return true

function checkWinner(currentCellTurn){
    return winningCombinations.some(combination => { //some if just one parameter pass the condition
        //every - if all parameters pass the condition
        return combination.every(index => {
            return cellElements[index].classList.contains(currentCellTurn);
        })
    })
}

//5 
function isDraw(){

    return [...cellElements].every(cell => {
        return cell.classList.contains(oClass) || cell.classList.contains(xClass);
    })
}