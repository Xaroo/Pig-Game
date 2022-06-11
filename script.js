'use strict';

//Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

diceEl.classList.add('hidden');

let activePlayer = 0;
let diceValue;
let current;
let scores;

const init = () => {
  scores = [0, 0];
  current = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  btnHold.disabled = false;
  btnRoll.disabled = false;
  diceEl.classList.remove('hidden');
  document.querySelector(`#current--${activePlayer}`).textContent = current;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');

  activePlayer = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

init();

const changingPlayer = () => {
  current = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = current;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  //Showing dice on screen
  diceValue = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${diceValue}.png`;

  //Adding dice score to current if not rolled 1
  if (diceValue !== 1) {
    current += diceValue;
    console.log(current);
    document.querySelector(`#current--${activePlayer}`).textContent = current;
  }
  //Changing player if rolled 1
  else {
    changingPlayer();
  }
});

btnHold.addEventListener('click', function () {
  //Adding score
  scores[activePlayer] += current;

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  //Checking if winner
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    btnHold.disabled = true;
    btnRoll.disabled = true;
    diceEl.classList.add('hidden');
  }
  //Changing player
  else {
    changingPlayer();
  }
});

btnNew.addEventListener('click', init);
