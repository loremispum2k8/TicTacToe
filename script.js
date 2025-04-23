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
                finalResult = 'O player won';
                console.log(finalResult)
            } else{
                finalResult = 'X player won';
                console.log(finalResult)
            }
        }
    }



let cells = document.querySelectorAll('.cell');
let result = document.querySelector('.result')
cells.forEach(cell => {
    cell.addEventListener('click',analyzeBoard)

    function analyzeBoard(e){
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
        
                if(filled >= 5 && filled < 9){
                    evalBoard();
                    if(finalResult === 'O player won' || finalResult === 'X player won'){
                        result.textContent = finalResult;
                    }
                } else if(filled === 9){
                    evalBoard();
                    if(finalResult === 'draw'){
                        result.textContent = finalResult;
                    }
                }
            }
        }else if(result.textContent !== ''){
            cell.removeEventListener('click',analyzeBoard)
        }
    }

});