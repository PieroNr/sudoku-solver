//Test de sudoku solver créé par une IA

var sudoku = [
    [0,0,0,0,0,0,0,0,0],
    [0,1,2,0,3,4,5,6,7],
    [0,3,4,5,0,6,1,8,2],
    [0,0,1,0,5,8,2,0,6],
    [0,0,8,6,0,0,0,0,1],
    [0,2,0,0,0,7,0,5,0],
    [0,0,3,7,0,5,0,2,8],
    [0,8,0,0,6,0,7,0,0],
    [2,0,7,0,8,3,6,1,5]
  ];
  function solveSudoku(sudoku) {
    var row = 0;
    var col = 0;
    var found = false;
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (sudoku[i][j] == 0) {
          row = i;
          col = j;
          found = true;
          break;
        }
      }
      if (found) {
        break;
      }
    }
    if (!found) {
      return true;
    }
    for (var num = 1; num <= 9; num++) {
      if (isSafe(sudoku, row, col, num)) {
        sudoku[row][col] = num;
        if (solveSudoku(sudoku)) {
          return true;
        } else {
          sudoku[row][col] = 0;
        }
      }
    }
    return false;
  }
  function isSafe(sudoku, row, col, num) {
    return !usedInRow(sudoku, row, num) && !usedInCol(sudoku, col, num) && !usedInBox(sudoku, row - row % 3, col - col % 3, num);
  }
  function usedInRow(sudoku, row, num) {
    for (var col = 0; col < 9; col++) {
      if (sudoku[row][col] == num) {
        return true;
      }
    }
    return false;
  }
  function usedInCol(sudoku, col, num) {
    for (var row = 0; row < 9; row++) {
      if (sudoku[row][col] == num) {
        return true;
      }
    }
    return false;
  }
  function usedInBox(sudoku, boxStartRow, boxStartCol, num) {
    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 3; col++) {
        if (sudoku[row + boxStartRow][col + boxStartCol] == num) {
          return true;
        }
      }
    }
    return false;
  }
  function printSudoku(sudoku) {
    var tab=[]
    for (var i = 0; i < 9; i++) {
        var line = []
      for (var j = 0; j < 9; j++) {
        line.push(sudoku[i][j])
        
      }
      tab.push(line)
      
      
    }
    console.table(tab);
  }
  solveSudoku(sudoku);
  printSudoku(sudoku);