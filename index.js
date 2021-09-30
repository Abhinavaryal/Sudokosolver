// Solution STEPS:
// 1)validity of the board
// 2)Recursion 
// 3)Backtracting at every dead end 
let space = document.querySelector('#alerting')
let tableresult = document.querySelector('#tableresult')
let h2solved = document.querySelector('#h2solved')
let empty = document.querySelector('#empty');
const solution = (board) => {
    if (completed(board)) {
        return board;
    } else {
        const poss = newerBoard(board);
        const validity = keepOnlyValid(poss);
        return checkSoln(validity);
    }
}
let checker = 0;
const getValue = () => {
    let inputVal = [
        []
    ];
    let temp = 0;
    for (let i = 1; i <= 81; i++) {
        let num = document.getElementById(i).value;
        if (num > 9) {
            somethingIsWrong();

        }
        if (num == "" || num === "0") {
            checker++;
            inputVal[temp].push(null);
        } else {
            inputVal[temp].push(parseInt(num));
        }
        if (i % 9 == 0 && i < 81) {
            inputVal.push([]);
            temp++;
        }
    }


    const inputValidity = validBoard(inputVal)
    if (!inputValidity) {
        somethingIsWrong();
    } else {
        const solvedBoard = solution(inputVal)
        display(solvedBoard, inputValidity)
    }
    if (checker === 81) {

        empty.style.display = "flex";
    } else {
        empty.style.display = "none";
    }
    checker = 0;
}
const display = (inputVal) => {
    if (inputVal == false) {
        somethingIsWrong();
    } else {
        for (let a = 1; a <= 9; a++) {
            for (let b = 0; b < 9; b++) {
                document.getElementById("tableresult" + String(a)).innerHTML += `
            <td id='inner'> ${inputVal[a-1][b]} </td>`;

            }
        }
    }
}

function somethingIsWrong() {

    empty.style.display = "none";
    space.style.display = "block";
    h2solved.style.display = "none";
    tableresult.style.display = "none";
}


const newerBoard = (board) => {
    let temp = [];
    const firstEmpty = nullVal(board) //<-- gives me (y,x)
    if (firstEmpty != undefined) {
        const y = firstEmpty[0];
        const x = firstEmpty[1];
        for (let i = 1; i <= 9; i++) {
            let newb = [...board]
            let row = [...newb[y]]
            row[x] = i;
            newb[y] = row
            temp.push(newb)
        }
    }
    return temp;
}

const nullVal = (board) => {
    //board-->(n,n)
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == null) {
                return [i, j];
            }
        }
    }
}


const keepOnlyValid = (b1) => {
    let temp = [];
    for (let i = 0; i < b1.length; i++) {
        if (validBoard(b1[i])) {
            temp.push(b1[i])
        }
    }
    return temp;
}



const rowGood = (board) => {
    for (let i = 0; i < 9; i++) {
        let cur = [];
        for (let j = 0; j < 9; j++) {
            if (cur.includes(board[i][j])) {
                return false;
            } else if (board[i][j] != null) {
                cur.push(board[i][j]);
            }
        }
    }
    return true;
}

const columnGood = (board) => {
    for (let i = 0; i < 9; i++) {
        let cur = [];
        for (let j = 0; j < 9; j++) {
            if (cur.includes(board[j][i])) {
                return false;
            } else if (board[j][i] != null) {
                cur.push(board[j][i])
            }
        }
    }
    return true;
}

const boxesGood = (board) => {
    const boxCoordinates = [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2]
    ];
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            let cur = [];
            for (let k = 0; k < 9; k++) {
                let coordinates = [...boxCoordinates[k]]
                coordinates[0] += i;
                coordinates[1] += j;
                if (cur.includes(board[coordinates[0]][coordinates[1]])) {
                    return false;
                } else if (board[coordinates[0]][coordinates[1]] != null) {
                    cur.push(board[coordinates[0]][coordinates[1]])
                }
            }
        }
    }
    return true;
}

const validBoard = (board) => {
    return rowGood(board) && columnGood(board) && boxesGood(board)
}

const checkSoln = (b1) => {
    if (b1.length < 1) {
        return false
    } else {
        let first = b1.shift();
        const tryPath = solution(first);
        if (tryPath != false) {
            return tryPath;
        } else {
            return checkSoln(b1)
        }
    }
}

const completed = (board) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == null) {
                return false;
            }
        }
    }
    return true;
}
let count = 0;
for (let re = 1; re <= 9; re++) {
    for (let su = 0; su < 9; su++) {

        document.getElementById("tableval" + String(re)).innerHTML += `
        <td id="inner"><input type="number" min="0" max="9" id="${count+re}"></td>`;
        count++;
    }
    count = count - 1;;
}
let button = document.querySelector('#solveit');

button.addEventListener('click', () => {
    space.style.display = "none";
    if (tableresult.style.display = "flex") {
        hidder();

        for (let a = 1; a <= 9; a++) {
            for (let b = 0; b < 9; b++) {
                document.getElementById("tableresult" + String(a)).innerHTML = "";
            }
        }
        shower();
        getValue();


    } else {
        shower();
        getValue();

    }
})
const hidder = () => {
    tableresult.style.display = "none";
    h2solved.style.display = "none";
}
const shower = () => {
    tableresult.style.display = "flex";
    h2solved.style.display = "flex";
}