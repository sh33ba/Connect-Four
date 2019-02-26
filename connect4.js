
var p1 =prompt('Player one: Enter Your Name , you will be Blue');
var p1Color = 'rgb(86, 152, 255)'

p1 = p1.toUpperCase();

var p2 = prompt('Player Two: Enter Your Name, you will be Red');
var p2Color = 'rgb(237, 45, 73)';

p2 = p2.toUpperCase();

var game_on = true;
var table = $('table tr');

function reportWin(rowNum, colNum) {
    console.log('You won starting at this row, col');
    console.log(rowNum);
    console.log(colNum);
}

function changeColor(rowIndex,colIndex,color) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function returnColor(rowIndex,colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex){
    var colorReport = returnColor(5,colIndex);
    for (var row = 5; row > -1; row--) {
        colorReport = returnColor(row,colIndex);
        if (colorReport === 'rgb(128, 128, 128)'){
            return row;
        }   
    }
}

function colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined );
}

// check for horizontal wins
function horizontalWinCheck(){
    for (var row = 0; row < 6; row++) {
        for (var col = 0; col < 4; col++) {
            if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1), returnColor(row,col+2), returnColor(row,col+3))){
                console.log('horiz');
                reportWin(row,col);
                return true;
            } else {
                continue;
            }
        }
    }
}

// check for vertical wins
function verticalWinCheck(){
    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 3; row++) {
            if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col), returnColor(row+2,col), returnColor(row+3,col))){
                console.log('vertical');
                reportWin(row,col);
                return true;
            } else {
                continue;
            }
        }
    }
}

// check for diagonal wins
function diagonalWinCheck() {
    for (var col = 0; col < 5; col++) {
        for (var row = 0; row < 7; row++) {
            if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1), returnColor(row+2,col+2), returnColor(row+3,col+3))){
                console.log('diag');
                reportWin(row,col);
                return true;
            } else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1), returnColor(row-2,col+2), returnColor(row-3,col+3))){
                console.log('diag');
                reportWin(row,col);
                return true;
            } else {
                continue;
            }
        }
    }
}

var currentPlayer = 1;
var currentName = p1;
var currentColor = p1Color;

$('h3').text(p1 + ' it is your turn, pick a column to drop in!')
$('h3').css('color', p1Color)

$('.board button').on('click', function(){

    var col = $(this).closest('td').index();

    var bottomAvail = checkBottom(col);

    changeColor(bottomAvail,col,currentColor);

    if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
        
        $('.reset').text(currentName + " You have WON! Refresh page to play again 😄").css('font-size', '4em');
        
    }


    currentPlayer = currentPlayer * -1;

    if (currentPlayer === 1) {
        currentName = p1;
        $('h3').text(currentName+ ' it is your turn.');
        $('h3').css('color',p1Color)
        currentColor = p1Color;
    } else {
        currentName = p2;
        $('h3').text(currentName+ ' it is your turn.');
        currentColor = p2Color;
        $('h3').css('color',p2Color)
    }

})
