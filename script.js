

const boxes = document.querySelectorAll(".box")
const resetBtn = document.querySelector("#reset-btn")
const msgContainer = document.querySelector(".msg-container")
const msg = document.querySelector("#msg")
const newGameBtn = document.querySelector("#new-btn")

let turnO = true;  //initialzing p1 and p2 
let count = 0;     //to track draw

const winPatterns = [  
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const resetGame = () => { 
    turnO = true;
    count = 0;
    enableBoxes(); //all boxes inner content empty
    msgContainer.classList.add("hide");
}



const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true //all boxes disabled
    }
}
const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false  //all boxes enabled
        box.innerHTML = ""    //all inner content deleted
    }
}

const showWinner = (winner)=>{
    for(let box of boxes){
        msg.innerHTML = `Congratulation! Winner is ${winner}`;
        msgContainer.classList.remove("hide")
        disableBoxes();
    }
}

const checkWinner = ()=>{  //tracing the following patterns
    for(let pattern of winPatterns){
        //as we know about the game winning condition is when the same symbol(value) connecting horizontal/vertical/diagonal
        let pos1Val = boxes[pattern[0]].innerHTML 
        let pos2Val = boxes[pattern[1]].innerHTML
        let pos3Val = boxes[pattern[2]].innerHTML

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val == pos2Val && pos2Val == pos3Val){
                showWinner(pos1Val);
            }
        }
    }
}

boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        if(turnO){ 
            // playerX
            box.innerHTML = "X";
            turnO = false;
            box.style.color = "rgb(255, 129, 140)"
        }else{    
            // playerO
            box.innerHTML = "O";
            turnO = true;
            box.style.color = "rgb(117, 142, 205)"
        }
        box.disabled = true  //After clicking the trigger once, the value should not change, So we use disabled 
        
        count++;
        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }
    })
})

const gameDraw = ()=>{
    msg.innerHTML = "Game was a Draw."
    msgContainer.classList.remove("hide")
    disableBoxes();
}

resetBtn.addEventListener("click", resetGame)
newGameBtn.addEventListener("click", resetGame)