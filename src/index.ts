type Posibilities = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
const SUDOKU: Posibilities[][][] = [
    [[0, 0, 0],
    [0, 1, 2],
    [0, 3, 4]],

    [[0, 0, 0],
    [0, 3, 4],
    [5, 0, 6]],

    [[0, 0,0],
    [5,6,7],
    [1,8,2]],

    [[0,0,1],
    [0, 0, 8],
    [0, 2, 0]
    ],

    [[0, 5, 8],
    [6, 0, 0],
    [0, 0, 7]],

    [[2, 0, 6],
    [0, 0, 1],
    [0, 5, 0]],

    [[0, 0, 3],
    [0, 8, 0],
    [2, 0, 7]],

    [[7, 0, 5],
    [0, 6, 0],
    [0, 8, 3]],

    [[0, 2, 8],
    [7, 0, 0],
    [6, 1, 5]]
  
]

const SUDOKULINE: Posibilities[][] = [
    [0,0,0,0,0,0,0,0,0],
    [0,1,2,0,3,4,5,6,7],
    [0,3,4,5,0,6,1,8,2],
    [0,0,1,0,5,8,2,0,6],
    [0,0,8,6,0,0,0,0,1],
    [0,2,0,0,0,7,0,5,0],
    [0,0,3,7,0,5,0,2,8],
    [0,8,0,0,6,0,7,0,0],
    [2,0,7,0,8,3,6,1,5]

]



function countPossibilitySquare(sudoku: Posibilities[][], col: number, row: number){
    let posInTab = Math.floor(col / 3) + Math.floor(row / 3) * 3
    var square: Posibilities[] = []

    for(let i=0; i<sudoku.length;i++){
        for(let j=0; j<sudoku[i].length;j++){
            if((Math.floor(i / 3) * 3 + Math.floor(j / 3)) === posInTab){
                square.push(sudoku[i][j])
            }
        }
    }
    return acceptableInTab(square)
}



function countPossibilityRow(sudoku: Posibilities[][], col: number, row: number){
    let line: Posibilities[] = sudoku[row]
    return acceptableInTab(line)
}

function countPossibilityCol(sudoku: Posibilities[][], col: number, row: number){
    var column: Posibilities[] = []
    for(let i=0; i<sudoku.length;i++){
        column.push(sudoku[i][col])
    }
    return acceptableInTab(column)
}

function acceptableInTab(tab: number[]): number[]{
    var acceptable: number[] = []
    for(let i = 1; i<=9; i++){
        if(tab.indexOf(i) == -1){
            acceptable.push(i)
        }
    }
    return acceptable
}

function getPossibilities(sudoku: Posibilities[][], col: number, row: number){
    let posSquare = countPossibilitySquare(sudoku, col, row)
    let posRow = countPossibilityRow(sudoku, col, row)
    let posCol = countPossibilityCol(sudoku, col, row)
    
    var tabPossibilities = posSquare.concat(posRow, posCol)
    var possibilities = findDuplicate(tabPossibilities);
    var possibilities = findDuplicate(possibilities);
    return possibilities
}

function findDuplicate(tab: number[]){
    let sorted_arr = tab.slice().sort();
    let results = []
    var duplicateFound = false
    for (let i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i]) {
          results.push(sorted_arr[i]);
          
        }
      }
    
    return results
    
}

function findAllPossibilities(sudoku: Posibilities[][]){
    var emptyCell: number[][][] = []
    sudoku.forEach((row, i) => 
        row.forEach((col, j) => {
            if (col === 0){
                emptyCell.push([[j, i],getPossibilities(sudoku, j, i)])
                //console.log(getPossibilities(sudoku, j, i) + " [" + j + " - " + i + "]")
            }}
        )
    );
    
    return emptyCell
}


function solveSudoku(sudoku: Posibilities[][]){
    let emptyCells = findAllPossibilities(sudoku)
    
    var sudokuCopy = sudoku
    var nbCell = 0
    emptyCells.sort(function (a, b) {
        return a[1].length - b[1].length;
    });
    

    if(!emptyCells[1] || emptyCells[1].length == 0){
        solveSudoku(SUDOKULINE)
    }

    if(emptyCells.length > 0 && emptyCells.length != 0){
        sudokuCopy[emptyCells[0][0][1]][emptyCells[0][0][0]] = emptyCells[0][1][Math.floor(Math.random() * emptyCells[1].length)] as Posibilities;

        solveSudoku(sudokuCopy)
    }
    


    return sudokuCopy

}

console.log(solveSudoku(SUDOKULINE))












function print(sudokuTab: (number | null)[][][]){
    console.log("_________________________________________")
    var sudoku = [[[]]]


    for(let i = 0; i <= 2; i++){
        var line: (number | null)[][] = []
        for(let y = 0; y <= 2; y++){
            line.push(sudokuTab[y][i])
            
            
        }
        console.log(line)   
    }
    console.log('\n')

    for(let i = 0; i <= 2; i++){
        var line: (number | null)[][] = []
        for(let y = 3; y <= 5; y++){
            line.push(sudokuTab[y][i])
            
            
        }
        console.log(line)   
    }
    console.log('\n')

    for(let i = 0; i <= 2; i++){
        var line: (number | null)[][] = []
        for(let y = 6; y <= 8; y++){
            line.push(sudokuTab[y][i])
            
            
        }
        console.log(line)   
    }
    console.log("_________________________________________")
}

