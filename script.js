let popUp = document.querySelector('.choosePlayers-container')

//buttons
let startButton = document.querySelector('.start');
let resetButton = document.querySelector('.reset');
//buttons

let greenLight = false;
let player1Name = document.querySelector('.player1Name')
let player2Name = document.querySelector('.player2Name')
let score1 = document.querySelector('.score1');
let score2 = document.querySelector('.score2');
let player1 = {};
let player2 = {};
let playerConstructor = function(){
    let PLAYERONEQUERY = document.querySelector('#player1')
    let PLAYERTWOQUERY = document.querySelector('#player2')
    player1.name = PLAYERONEQUERY.value;
    player2.name = PLAYERTWOQUERY.value;
    player1.score=0;
    player2.score=0;
    console.log(player1,player2)
    
    player1Name.textContent = player1.name;
    player2Name.textContent = player2.name;
    score1.textContent = player1.score;
    score2.textContent = player2.score;
}
startButton.addEventListener('click',(e)=>{
    e.preventDefault();
    greenLight = true;
    popUp.style.display = 'none'
    playerConstructor();
})

const o = 'o';
const x = 'x';
let mover = o;
let filled = 0;
let finalResult = '';

let CreateBoard = (function(){
    let row1 = []
    let row2 = []
    let row3 = []
    return {row1, row2, row3}
})(); 
console.log(CreateBoard)

let evalBoard = function(){
        let oCount = 0;
        let xCount = 0;
        let pass = true;

        let evalColumns = (function(){
            if(pass){
                for(let row in CreateBoard){
                    if(CreateBoard[row][0] === o){
                        oCount++;
                    } else if(CreateBoard[row][0] === x){
                        xCount++;
                    }
                }
                if(oCount===3 || xCount===3){
                    pass = false;
                } else{
                    oCount = 0;
                    xCount = 0;
                }
            }
            if(pass){
                for(let row in CreateBoard){
                    if(CreateBoard[row][1] === o){
                        oCount++;
                    } else if(CreateBoard[row][1] === x){
                        xCount++;
                    }
                }
                if(oCount===3 || xCount===3){
                    pass = false;
                }else{
                    oCount = 0;
                    xCount = 0;
                }
            }
            if(pass){
                for(let row in CreateBoard){
                    if(CreateBoard[row][2] === o){
                        oCount++;
                    } else if(CreateBoard[row][2] === x){
                        xCount++;
                    }
                }
                if(oCount===3 || xCount===3){
                    pass = false;
                }else{
                    oCount = 0;
                    xCount = 0;
                }
            }
        })()
        let evalRows = (function(){
            if(pass){
                for(let row in CreateBoard){
                    if(pass){
                        for(const element of CreateBoard[row]){
                            if(element === o){
                                oCount++;
                            }else if(element === x){
                                xCount++;
                            }
                        }
                        if(oCount===3 || xCount===3){
                            pass = false;
                        } else{
                            oCount = 0;
                            xCount = 0;
                        }
                    }
                }
            }
        })()
        let evalObliques = (function(){
            if(pass){
                let checkMainOblique = (function(){
                    if(CreateBoard.row1[0] === o){
                        oCount++
                    } else if(CreateBoard.row1[0] === x){
                        xCount++;
                    }
                    if(CreateBoard.row2[1] === o){
                        oCount++
                    } else if(CreateBoard.row2[1] === x){
                        xCount++;
                    }
                    if(CreateBoard.row3[2] === o){
                        oCount++
                    } else if(CreateBoard.row3[2] === x){
                        xCount++;
                    }
                })();
                if(oCount===3 || xCount===3){
                    pass = false;
                } else{
                    oCount = 0;
                    xCount = 0;
                }
                console.log('OBLIQUE')
                if(pass){
                    let checkSecondaryOblique = (function(){
                        if(CreateBoard.row1[2] === o){
                            oCount++
                        } else if(CreateBoard.row1[2] === x){
                            xCount++;
                        }
                        if(CreateBoard.row2[1] === o){
                            oCount++
                        } else if(CreateBoard.row2[1] === x){
                            xCount++;
                        }
                        if(CreateBoard.row3[0] === o){
                            oCount++
                        } else if(CreateBoard.row3[0] === x){
                            xCount++;
                        }
                    })();
                }
            }
        })()

        if(pass){
            finalResult = 'draw';
            console.log(finalResult)
        }else {
            if(oCount>xCount){
                finalResult = `${player2.name} won`;
                player2.score++;
                score2.textContent = player2.score;
            } else{
                finalResult = `${player1.name} won`;
                player1.score++;
                score1.textContent = player1.score;
            }
        }
    }

let cells = document.querySelectorAll('.cell');
let result = document.querySelector('.result')
cells.forEach(cell => {
    cell.addEventListener('click',analyzeBoard)
    function analyzeBoard(e){
        if(greenLight){
            if(filled<9 && result.textContent === ''){
                if(CreateBoard[e.target.getAttribute('dataRow')][e.target.getAttribute('dataIndex')] === undefined){
                    if(mover === o){
                        mover = x;
                        CreateBoard[e.target.getAttribute('dataRow')][e.target.getAttribute('dataIndex')] = mover;
                    }else if(mover === x){
                        mover = o;
                        CreateBoard[e.target.getAttribute('dataRow')][e.target.getAttribute('dataIndex')] = mover;
                    }
                    e.target.textContent = CreateBoard[e.target.getAttribute('dataRow')][e.target.getAttribute('dataIndex')];
                    filled = filled+1;
                    console.log(filled)
            
                    if(filled >= 5 && filled <= 8){
                        evalBoard();
                        if(finalResult !== 'draw'){
                            result.textContent = finalResult;
                        }
                    } else if(filled === 9){
                        evalBoard();
                        result.textContent = finalResult;
                    }
                }
            }else if(result.textContent !== ''){
                cell.removeEventListener('click',analyzeBoard)
            }
        }
    }

});


resetButton.addEventListener('click',()=>{
    CreateBoard.row1 = []
    CreateBoard.row2 = []
    CreateBoard.row3 = []
    console.log(CreateBoard);
    cells.forEach(cell => {
        cell.innerHTML = '';
    })
    result.innerHTML = '';
    filled = 0;
})