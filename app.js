/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// ******* Coding the ROLL DICE ******

var scores,roundScore, activePlayer,gamePlaying;

init();


// *** Boton : Rueda el Dado! (ROLL DICE) ***

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
            // 1 * Rodar el dado:
            var dice = Math.floor((Math.random()*6)+1);

            // 2 * Mostrar el dado en pantalla + el resultado:
            var diceDOM =document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src='dice-'+dice+'.png';

    

            /* 3 * Subir el resultado o puntaje solo si el resultado es
            distinto de 1: */

            if (dice !== 1){
            // sumamos puntos:
            roundScore = roundScore + dice; //roundScore += dice;
            document.querySelector('#current-'+activePlayer).textContent=roundScore;

            }else{
            // Cambiamos de Player:
            nextPlayer();
            }

    };


});

// *** Boton : Mantén el Puntaje (HOLD)! ***

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
        // Añadir el marcador acumulado al marcador GLOBAL:

    scores[activePlayer] = scores[activePlayer]+roundScore;

    //Mostrar el marcador GLOBAL 

    document.querySelector('#score-'+activePlayer).textContent=scores[activePlayer];

    //Verificar si el Jugardor ganó el juego:
    
    if (scores[activePlayer] >= 50){
        document.querySelector('#name-'+activePlayer).textContent='WINNER!';
        document.querySelector('.dice').style.display='none';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        gamePlaying = false;
    }else{
    //Pasamos al siguiente jugador:
        nextPlayer();
    }
    }

});

// *** Boton : New Game! ****

document.querySelector('.btn-new').addEventListener('click',init);

// *** Funciones Externas ***

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-1').textContent='0';
    document.getElementById('current-0').textContent='0';
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    

    document.querySelector('.dice').style.display = 'none';
};


function init(){
    scores = [0,0];
    roundScore= 0;
    activePlayer = 0;
    gamePlaying= true;
    

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent='0';
    document.getElementById('current-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.getElementById('current-1').textContent='0';
    document.getElementById('name-0').textContent='Player 1';
    document.getElementById('name-1').textContent='Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}