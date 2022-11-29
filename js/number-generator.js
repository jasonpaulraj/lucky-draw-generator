const ENTRANTS = [];
const ENTRANTS_REMOVED = [];
const ENTRANTS_ACTIVE = [];
const ENTRANTS_TO_SELECT = 10;
const rollEl = document.querySelector(".roll");
const rollAgainEl = document.querySelector(".roll-again");
const namesEl = document.querySelector(".names");
const winnerEl = document.querySelector(".winner");
const addEntrantsBlock = document.querySelector(".add-entrants");
const startRoleBlock = document.querySelector(".start-roll");
localStorage.removeItem("entrants");
localStorage.removeItem("entrants_active");
localStorage.removeItem("entrants_removed");
localStorage.removeItem("entrants_winners");

function randomName(ENTRANTS_ACTIVE, ENTRANTS_TO_SELECT) {
  ENTRANTS_ACTIVE = localStorage.getItem("entrants_active").split(",");
  const rand = Math.floor(Math.random() * ENTRANTS_ACTIVE.length);
  const name = ENTRANTS_ACTIVE[rand];
  namesEl.innerText = ENTRANTS_ACTIVE.sort(() => 0.5 - Math.random()).slice(
    0,
    10
  );

  localStorage.setItem("entrants_winners", namesEl.innerText);
  return namesEl.innerText;
}

function rollClick(ENTRANTS, ENTRANTS_ACTIVE, ENTRANTS_TO_SELECT) {
  localStorage.removeItem("entrants_winners");
  rollEl.classList.add("hide");
  rollAgainEl.classList.add("hide");
  winnerEl.classList.add("hide");
  namesEl.classList.remove("hide");

  setDeceleratingTimeout(randomName, 10, 10);
  setTimeout(() => {
    namesEl.classList.add("hide");
    winnerEl.classList.remove("hide");
    rollAgainEl.classList.remove("hide");

    const winner = namesEl.innerText;

    if (localStorage.getItem("entrants_removed") !== null) {
      localStorage.setItem(
        "entrants_removed",
        localStorage.getItem("entrants_removed") + "," + winner
      );
    } else {
      localStorage.setItem("entrants_removed", winner);
    }
    var activeEntrants = localStorage.getItem("entrants_active").split(",");
    var removedEntrants = localStorage.getItem("entrants_removed").split(",");
    console.log(removedEntrants);
    console.log(activeEntrants);
    var updatedEntrants = activeEntrants.filter(
      (val) => !removedEntrants.includes(val)
    );

    console.log(updatedEntrants);

    localStorage.setItem("entrants_active", updatedEntrants);

    winnerEl.innerHTML = `<span>And the winners are...</span><br>${winner}`;
  }, 500);
}

function setDeceleratingTimeout(callback, factor, times) {
  const internalCallback = ((t, counter) => {
    return () => {
      if (--t > 0) {
        setTimeout(internalCallback, ++counter * factor);
        callback();
      }
    };
  })(times, 0);

  setTimeout(internalCallback, factor);
}

function updateEntrants(ENTRANTS, ENTRANTS_REMOVED, ENTRANTS_ACTIVE) {
  const get_entrants = document.getElementById("entrant_list").value;
  const entrants_arr = get_entrants.split(/\r?\n/);
  const entrants_save = entrants_arr.filter(function (el) {
    return el != "";
  });

  localStorage.setItem("entrants", entrants_save);
  localStorage.setItem("entrants_active", entrants_save);
  ENTRANTS = localStorage.getItem("entrants").split(",");
  addEntrantsBlock.classList.add("hide");
  startRoleBlock.classList.remove("hide");
}
