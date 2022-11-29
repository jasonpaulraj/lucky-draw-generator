const ENTRANTS = [];
const ENTRANTS_REMOVED = [];
const ENTRANTS_ACTIVE = [];
const ENTRANTS_TO_SELECT = 10;
const rollEl = document.querySelector(".roll");
const rollAgainEl = document.querySelector(".roll-again");
const namesEl = document.querySelector(".names");
const winnerEl = document.querySelector(".winner");

function randomName(
  ENTRANTS,
  ENTRANTS_REMOVED,
  ENTRANTS_ACTIVE,
  ENTRANTS_TO_SELECT
) {
  ENTRANTS = localStorage.getItem("entrants_active").split(",");
  const rand = Math.floor(Math.random() * ENTRANTS.length);
  const name = ENTRANTS[rand];
  namesEl.innerText = name;

  ENTRANTS_ACTIVE = ENTRANTS.sort(() => 0.5 - Math.random()).slice(0, 10);
}

function rollClick(ENTRANTS_ACTIVE,ENTRANTS_TO_SELECT) {
  rollEl.classList.add("hide");
  rollAgainEl.classList.add("hide");
  winnerEl.classList.add("hide");
  namesEl.classList.remove("hide");

  setDeceleratingTimeout(randomName, 10, 30);
  console.log(ENTRANTS_ACTIVE);
  setTimeout(() => {
    namesEl.classList.add("hide");
    winnerEl.classList.remove("hide");
    rollAgainEl.classList.remove("hide");

    const winner = namesEl.innerText;
    winnerEl.innerHTML = `<span>And the winners are...</span><br>${winner}`;
  }, 4000);
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
  console.log(entrants_save);
  ENTRANTS = localStorage.getItem("entrants").split(",");
  console.log(ENTRANTS);
}
