const o = 'o';
const x = 'x';

let CreateBoard = (function(){
    let row1 = [x,x,o]
    let row2 = [o,x,x]
    let row3 = [x,o,x]
    return {row1, row2, row3}
})(); 
console.log(CreateBoard) 

let evalBoard = (function(){
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
        console.log('draw')
    }else {
        console.log('someone won');
        console.log('o: ',oCount);
        console.log('x: ',xCount);
    }
})();







/*
    if(pass){
        console.log('draw')
    }else {
        console.log('someone won');
        console.log('o: ',oCount);
        console.log('x: ',xCount);
    }
        */