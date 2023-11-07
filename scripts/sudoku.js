var numSelected = null;
var tileSelected = null;

var errors = 0;

var board = [];

var solution = [];

window.onload = function() {
    populateSolution();
    generatePuzzle(solution);
    setGame();
}

function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").appendChild(tile);
        }
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText !== "") {
            return;
        }
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] === numSelected.id) {
            this.innerText = numSelected.id;
        } else {
            errors++;
            document.getElementById("errors").innerText = errors;
        }
    }
    if (checkWin()) {
        alert("YOU WIN!!!");
    }
}

function populateSolution() {
    const emptyBoard = Array.from({ length: 9 }, () => Array(9).fill(0));

    // Function to check if a number can be placed in a specific position
    function isValidPlacement(row, col, num, tempBoard) {
        // Check row and column
        for (let i = 0; i < 9; i++) {
            if (tempBoard[row][i] === num || tempBoard[i][col] === num) {
                return false;
            }
        }

        // Check 3x3 grid
        const startRow = 3 * Math.floor(row / 3);
        const startCol = 3 * Math.floor(col / 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (tempBoard[startRow + i][startCol + j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    // Function to shuffle the elements in an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Recursive function to fill the board using backtracking
    function fillBoard(tempBoard) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (tempBoard[row][col] === 0) {
                    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                    shuffleArray(nums);
                    for (let num of nums) {
                        if (isValidPlacement(row, col, num, tempBoard)) {
                            tempBoard[row][col] = num;
                            if (fillBoard(tempBoard)) {
                                return true;
                            }
                            tempBoard[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    fillBoard(emptyBoard);
    solution = emptyBoard.map(row => row.join(''));
    console.log(solution);
}

function generatePuzzle(solution) {
    const puzzleBoard = solution.map(row => row.split(''));

    // Function to randomly replace characters with "-"
    function randomizeBoard(board) {
        const numToRemove = Math.floor(Math.random() * 5) + 45; // Adjust the range as needed
        let count = 0;
        while (count < numToRemove) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (board[row][col] !== "-") {
                board[row][col] = "-";
                count++;
            }
        }
    }

    randomizeBoard(puzzleBoard);
    board = puzzleBoard;
}

function checkWin() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const tile = document.getElementById(r.toString() + "-" + c.toString());
            if (tile.innerText !== solution[r][c]) {
                return false;
            }
        }
    }
    return true;
}
