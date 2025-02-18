function findNashEquilibria() {
    let payoffs = [];
    let cells = document.querySelectorAll('.payoff-cell');
    cells.forEach(cell => payoffs.push(cell.value.split(',').map(Number)));

    let player1Best = [
        Math.max(payoffs[0][0], payoffs[2][0]),
        Math.max(payoffs[1][0], payoffs[3][0])
    ];
    let player2Best = [
        Math.max(payoffs[0][1], payoffs[1][1]),
        Math.max(payoffs[2][1], payoffs[3][1])
    ];

    let player1Table = document.querySelectorAll('.player1-best');
    let player2Table = document.querySelectorAll('.player2-best');
    
    player1Table[0].textContent = player1Best[0];
    player1Table[1].textContent = player1Best[1];
    player2Table[0].textContent = player2Best[0];
    player2Table[1].textContent = player2Best[1];
    
    let equilibriumFound = false;
    cells.forEach((cell, index) => {
        let [p1, p2] = payoffs[index];
        let row = Math.floor(index / 2);
        let col = index % 2;
        
        if (p1 === player1Best[col] && p2 === player2Best[row]) {
            cell.style.backgroundColor = 'lightgreen';
            cell.style.color = 'black';
            cell.style.fontWeight = 'bold';
            equilibriumFound = true;
        } else {
            cell.style.backgroundColor = 'white';
            cell.style.color = 'black';
            cell.style.fontWeight = 'normal';
        }
    });
    if (!equilibriumFound) {
        alert("No Nash Equilibrium found.");
    }

    //Start Strictly Dominant for player 1//
    let max1_row_player_1 = 5555;

    if(payoffs[0][0] > payoffs[2][0] && payoffs[1][0] > payoffs[3][0]){
        max1_row_player_1 = 0;
    }
    else if(payoffs[0][0] < payoffs[2][0] && payoffs[1][0] < payoffs[3][0]){
        max1_row_player_1 = 1;
    }
    //End Strictly Dominant for player 1//


     //Start Strictly Dominant for player 2//
     let max1_col_player_2 = 5555555555;

     if(payoffs[0][1] > payoffs[1][1] && payoffs[2][1] > payoffs[3][1]){
        max1_col_player_2 = 0;
     }
     else if(payoffs[0][1] < payoffs[1][1] && payoffs[2][1] < payoffs[3][1]){
        max1_col_player_2 = 1;
     }
     //End Strictly Dominant for player 2//

    // Display Strictly Dominant for two players
    let player1_dominant = document.querySelectorAll('.dominant-strategy');
    let player2_dominant = document.querySelectorAll('.dominant-strategy_2');
   
    player1_dominant.forEach(element => {
        if (max1_row_player_1 == 0) {
            element.textContent = "Choice 1";
        } else if (max1_row_player_1 == 1) {
            element.textContent = "Choice 2";
        } else {
            element.textContent = "There is no one";
        }
    });

    player2_dominant.forEach(element => {
        if (max1_col_player_2 == 0) {
            element.textContent = "Left";
        } else if (max1_col_player_2 == 1) {
            element.textContent = "Right";
        } else {
            element.textContent = "There is no one";
        }
    }); 

    //End Display for Strictly Dominant for the two players

    // Weak Dominance for player 1 
    let weaklyDominant1 = "No weak dominance";
    let row1Dominates = (payoffs[0][0] >= payoffs[2][0] && payoffs[1][0] >= payoffs[3][0]) &&
                        (payoffs[0][0] > payoffs[2][0] || payoffs[1][0] > payoffs[3][0]) && max1_row_player_1 != 0;

    let row2Dominates = (payoffs[2][0] >= payoffs[0][0] && payoffs[3][0] >= payoffs[1][0]) &&
                        (payoffs[2][0] > payoffs[0][0] || payoffs[3][0] > payoffs[1][0]) && max1_row_player_1 != 1;

    if (row1Dominates) weaklyDominant1 = "Choice 1 weakly dominates Choice 2";
    if (row2Dominates) weaklyDominant1 = "Choice 2 weakly dominates Choice 1";

    document.querySelector('.weak-dominant-strategy').textContent = weaklyDominant1;

    // Weak Dominance for player 2 
    let weaklyDominant2 = "No weak dominance";
    let col1Dominates = (payoffs[0][1] >= payoffs[1][1] && payoffs[2][1] >= payoffs[3][1]) &&
                        (payoffs[0][1] > payoffs[1][1] || payoffs[2][1] > payoffs[3][1]);
                        
    let col2Dominates = (payoffs[1][1] >= payoffs[0][1] && payoffs[3][1] >= payoffs[2][1]) &&
                        (payoffs[1][1] > payoffs[0][1] || payoffs[3][1] > payoffs[2][1]);

    if (col1Dominates) weaklyDominant2 = "Left weakly dominates Right";
    if (col2Dominates) weaklyDominant2 = "Right weakly dominates Left";

    document.querySelector('.weak-dominant-strategy-2').textContent = weaklyDominant2;

}

function reset() {

    let cells = document.querySelectorAll('.payoff-cell');
    cells.forEach(cell => {
        cell.value = "0,0";
        cell.style.backgroundColor = 'white';
        cell.style.color = 'black';
        cell.style.fontWeight = 'bold';
    });
    
    let player1Table = document.querySelectorAll('.player1-best');
    let player2Table = document.querySelectorAll('.player2-best');

    player1Table[0].textContent = "-";
    player1Table[1].textContent = "-";
    player2Table[0].textContent = "-";
    player2Table[1].textContent = "-";


    let player1_dominant = document.querySelectorAll('.dominant-strategy');
    let player2_dominant = document.querySelectorAll('.dominant-strategy_2');

     player1_dominant.forEach(element => {
       element.textContent = "-";
    });

    player2_dominant.forEach(element => {
        element.textContent = "-";
     });

     let player1_weak_dominant = document.querySelectorAll('.weak-dominant-strategy');
     let player2_weak_dominant = document.querySelectorAll('.weak-dominant-strategy-2');
     player1_weak_dominant.forEach(element => {
        element.textContent = "-";
     });
 
     player2_weak_dominant.forEach(element => {
         element.textContent = "-";
      });



}

