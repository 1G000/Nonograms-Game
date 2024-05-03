import '../scss/style.scss';
import playgrounds from './data';
import { addToTopScores, fillTopScore } from './topScores';
import cross from '../../public/images/cross.svg';
import cross2 from '../../public/images/cross2.svg';

const cluesTop = [];
const cluesLeft = [];

const body = document.querySelector('.body');
const container = document.createElement('div');
const title = document.createElement('h1');
const gameField = document.createElement('div');
const leftSide = document.createElement('aside');
const topScoresList = document.createElement('table');

const resultsContent = document.createElement('aside');
const difficultyTitle = document.createElement('h4');
const pictureTitle = document.createElement('h4');
const difficultySelect = document.createElement('select');

const easyLvl = document.createElement('option');
const mediumLvl = document.createElement('option');
const hardLvl = document.createElement('option');
const timerWrapper = document.createElement('div');
const timeInMinutes = document.createElement('span');
const timeInSeconds = document.createElement('span');

const selectsField = document.createElement('div');
const buttonsField = document.createElement('div');

const pictureSelect = document.createElement('select');

const pictureOne = document.createElement('option');
const pictureTwo = document.createElement('option');
const pictureThree = document.createElement('option');
const pictureFour = document.createElement('option');
const pictureFive = document.createElement('option');

const gameTable = document.createElement('div');

const table = document.createElement('table');
const showAnswerBtn = document.createElement('button');
const randomGameBtn = document.createElement('button');
const lastResultsBtn = document.createElement('button');
const saveGameBtn = document.createElement('button');
const resumeGameBtn = document.createElement('button');
const resetGameBtn = document.createElement('button');
const switchContainer = document.createElement('div');

const switchSun = document.createElement('span');
const switchDark = document.createElement('span');
const sunIcon = document.createElement('img');
const darkIcon = document.createElement('img');
const switcher = document.createElement('input');

let playgroundSize = playgrounds;
let gameNumber = playgrounds.length;
let win = false;
let minutes = 0;
let seconds = 0;
let interval = 0;
let isGameStarted = false;

const dialog = document.createElement('dialog');
const lastResultsWindow = document.createElement('dialog');
const dialogContent = document.createElement('div');
const dialogTitle = document.createElement('h1');
const dialogText = document.createElement('p');
const dialogTime = document.createElement('span');
const dialogInput = document.createElement('input');

const winAudio = new Audio('./audio/win.mp3');
const loseAudio = new Audio('./audio/lose.mp3');
const winGameAudio = new Audio('./audio/wingame.mp3');
const clearAudio = new Audio('./audio/clean.mp3');

const createGameWindow = function () {
  container.className = 'container';
  body.append(container);

  gameField.classList = 'game-field';
  container.append(gameField);

  leftSide.className = 'left-side';
  gameField.append(leftSide);
  title.className = 'title';
  title.innerHTML = 'Nonograms';

  difficultyTitle.className = 'difficulty-title';
  difficultyTitle.innerHTML = 'Difficulty level';
  selectsField.className = 'selects-field';
  buttonsField.className = 'buttons-field';

  leftSide.append(selectsField);

  selectsField.append(title);
  selectsField.append(difficultyTitle);

  difficultySelect.className = 'difficulty-lvl';

  easyLvl.selected = 'true';

  easyLvl.innerHTML = 'easy: 5x5';
  easyLvl.value = 'easy';
  easyLvl.id = 'easy';
  difficultySelect.append(easyLvl);

  mediumLvl.innerHTML = 'medium: 10x10';
  mediumLvl.value = 'medium';
  mediumLvl.id = 'medium';
  difficultySelect.append(mediumLvl);

  hardLvl.innerHTML = 'hard: 15x15';
  hardLvl.value = 'hard';
  hardLvl.id = 'hard';
  difficultySelect.append(hardLvl);

  selectsField.append(difficultySelect);
  pictureTitle.innerHTML = 'Picture';
  selectsField.append(pictureTitle);

  selectsField.append(pictureSelect);
  pictureSelect.className = 'picture-select';

  pictureOne.innerHTML = `${playgroundSize[0].name}`;
  pictureOne.value = 0;
  pictureOne.selected = 'true';
  pictureOne.id = 'pictureOne';
  pictureSelect.append(pictureOne);

  pictureTwo.innerHTML = `${playgroundSize[1].name}`;
  pictureTwo.value = 1;
  pictureTwo.id = 'pictureTwo';
  pictureSelect.append(pictureTwo);

  pictureThree.innerHTML = `${playgroundSize[2].name}`;
  pictureThree.value = 2;
  pictureThree.id = 'pictureThree';
  pictureSelect.append(pictureThree);

  pictureFour.innerHTML = `${playgroundSize[3].name}`;
  pictureFour.value = 3;
  pictureFour.id = 'pictureFour';
  pictureSelect.append(pictureFour);

  pictureFive.innerHTML = `${playgroundSize[4].name}`;
  pictureFive.value = 4;
  pictureFive.id = 'pictureFive';
  pictureSelect.append(pictureFive);

  selectsField.append(timerWrapper);

  switchContainer.className = 'switch-container';
  sunIcon.className = 'sun-icon';
  sunIcon.src = './images/sunny.png';
  sunIcon.alt = 'sun';
  switchContainer.append(switchSun);
  switchSun.append(sunIcon);

  switcher.type = 'checkbox';
  switcher.className = 'switch';
  switchContainer.append(switcher);

  darkIcon.className = 'dark-icon';
  darkIcon.src = './images/dark.png';
  darkIcon.alt = 'dark';
  switchContainer.append(switchDark);
  switchDark.append(darkIcon);

  selectsField.append(switchContainer);

  const volumeIcon = document.createElement('img');
  volumeIcon.className = 'volume-icon';
  volumeIcon.src = './images/volumeon.svg';
  volumeIcon.alt = 'volume';
  selectsField.append(volumeIcon);
  volumeIcon.addEventListener('click', muteVolume);

  leftSide.append(buttonsField);
  randomGameBtn.innerHTML = 'Random game';
  randomGameBtn.className = 'random-btn';
  buttonsField.append(randomGameBtn);

  saveGameBtn.innerHTML = 'Save game';
  buttonsField.append(saveGameBtn);

  resumeGameBtn.innerHTML = 'Resume';
  buttonsField.append(resumeGameBtn);

  resetGameBtn.innerHTML = 'Reset';
  buttonsField.append(resetGameBtn);

  showAnswerBtn.innerHTML = 'Show answer';
  showAnswerBtn.className = 'show-answer-btn';
  buttonsField.append(showAnswerBtn);

  timerWrapper.className = 'timer';
  timeInMinutes.className = 'minutes';
  timeInSeconds.className = 'seconds';

  timeInMinutes.innerHTML = '00';
  timeInSeconds.innerHTML = ':00';
  timerWrapper.append(timeInMinutes);
  timerWrapper.append(timeInSeconds);
  lastResultsBtn.innerHTML = 'Last results';
  buttonsField.append(lastResultsBtn);

  gameTable.className = 'game-table';
  gameField.append(gameTable);
};

createGameWindow();

const volumeBtn = document.querySelector('.volume-icon');

function shutVolume() {
  volumeBtn.classList.add('mute');
  volumeBtn.src = './images/volumeoff.svg';
  winAudio.volume = 0;
  loseAudio.volume = 0;
  winGameAudio.volume = 0;
  clearAudio.volume = 0;
}

function bringVolumeBack() {
  volumeBtn.classList.remove('mute');
  volumeBtn.src = './images/volumeon.svg';
  winAudio.volume = 1;
  loseAudio.volume = 1;
  winGameAudio.volume = 1;
  clearAudio.volume = 1;
}

function muteVolume() {
  const isMute = volumeBtn.classList.contains('mute');
  isMute ? bringVolumeBack() : shutVolume();
}

// timer

const startTimer = function () {
  seconds += 1;
  if (seconds > 59) {
    minutes += 1;
    seconds = 0;
  }
  if (seconds <= 9) {
    timeInSeconds.innerHTML = `:0${seconds}`;
  }
  if (seconds > 9) {
    timeInSeconds.innerHTML = `:${seconds}`;
  }

  if (minutes <= 9) {
    timeInMinutes.innerHTML = `0${minutes}`;
  }
  if (minutes > 9) {
    timeInMinutes.innerHTML = minutes;
  }
  dialogTime.innerHTML = `${timeInMinutes.innerHTML}${timeInSeconds.innerHTML}`;
};

const startTimerOnFirstClick = function () {
  if (!isGameStarted) {
    isGameStarted = true;
    interval = setInterval(startTimer, 1000);
  }
};

const stopTimerThenWin = function () {
  clearInterval(interval);
  minutes = timeInMinutes.innerHTML;
  seconds = timeInSeconds.innerHTML;
};

const checkWin = function () {
  if (win === true) {
    stopTimerThenWin();
    winGameAudio.play();
    dialog.showModal();
  }
};

const clickFunc = function () {
  const rightCells = document.querySelectorAll('.right-cell');
  const wrongCells = document.querySelectorAll('.wrong-cell');
  if (
    Array.from(rightCells).every(
      (rightCell) =>
        rightCell.classList.contains('answer') &&
        !Array.from(wrongCells).some((wrongCell) =>
          wrongCell.classList.contains('answer'),
        ),
    )
  ) {
    win = true;
    checkWin();
  }
};

const leftClickHandle = function (event) {
  const { target } = event;
  if (target.classList.contains('answer')) {
    clearAudio.pause();
    clearAudio.currentTime = 0;
    loseAudio.pause();
    loseAudio.currentTime = 0;
    winAudio.pause();
    winAudio.currentTime = 0;
    clearAudio.play();
  } else {
    loseAudio.pause();
    loseAudio.currentTime = 0;
    winAudio.pause();
    winAudio.currentTime = 0;
    winAudio.play();
  }
  if (target.classList.contains('cross')) {
    target.classList.remove('cross');
  }
  target.classList.toggle('answer');
  target.innerHTML = '';
  clickFunc();
};

const rightClickHandle = function (event) {
  event.preventDefault();
  const { target } = event;
  if (target.classList.contains('cross')) {
    clearAudio.pause();
    clearAudio.currentTime = 0;
    loseAudio.pause();
    loseAudio.currentTime = 0;
    winAudio.pause();
    winAudio.currentTime = 0;
    clearAudio.play();
  } else {
    loseAudio.pause();
    loseAudio.currentTime = 0;
    winAudio.pause();
    winAudio.currentTime = 0;
    loseAudio.play();
  }

  if (target.classList.contains('answer')) {
    target.classList.remove('answer');
  }
  target.classList.toggle('cross');
};

function getRandomInt(int) {
  return Math.floor(Math.random() * int);
}

const createTable = function (playground) {
  table.innerHTML = '';
  gameTable.append(table);
  if (playground.size === 5) {
    table.classList.add('small');
  } else {
    table.classList.remove('small');
  }

  const playgroundRows = playground.size;
  const playgroundColumns = playground.size;
  const clueRows = playground.clueTop.length;
  const totalRows = playgroundRows + playground.clueTop.length;
  const clueColumns = playground.clueLeft.length;
  const totalColumns = playgroundColumns + clueColumns;

  for (let i = 0; i < totalRows; i += 1) {
    const row = document.createElement('tr');
    table.append(row);
    for (let j = 0; j < totalColumns; j += 1) {
      const cell = document.createElement('td');

      if (j >= clueColumns && i >= clueRows) {
        const m = i - clueRows;
        const n = j - clueColumns;
        cell.dataset.number = `${i}:${j}`;
        cell.classList.add('play-cell');
        if ((m + 1) % 5 === 0) {
          cell.style.borderBottom = '3px solid black';
        }
        if ((n + 1) % 5 === 0) {
          cell.style.borderRight = '3px solid black';
        }

        if (playground.pattern.includes(cell.dataset.number)) {
          cell.classList.add('right-cell');
        } else {
          cell.classList.add('wrong-cell');
        }
        cell.addEventListener('click', leftClickHandle);
        cell.addEventListener('contextmenu', rightClickHandle);
        cell.addEventListener('click', startTimerOnFirstClick);
        cell.addEventListener('contextmenu', startTimerOnFirstClick);
      } else {
        if (i < clueRows && j >= clueColumns) {
          const n = j - clueColumns;
          const clue = playground.clueTop[i][n];
          cell.innerHTML = clue !== 0 ? clue : '';
          cell.classList.add('top');
          cluesTop.push(cell);
          if ((n + 1) % 5 === 0 && j !== totalColumns - 1) {
            cell.style.borderRight = '3px solid black';
          }
        } else if (i >= playground.clueTop.length) {
          const m = i - clueRows;
          const clue = playground.clueLeft[j][m];
          cell.innerHTML = clue !== 0 ? clue : '';
          cell.classList.add('left');
          cluesLeft.push(cell);
          if ((m + 1) % 5 === 0 && i !== totalRows - 1) {
            cell.style.borderBottom = '3px solid black';
          }
        }

        if (i === clueRows - 1 && j >= clueColumns) {
          cell.style.borderBottom = '3px solid black';
        }
        if (j === clueColumns - 1 && i >= clueRows) {
          cell.style.borderRight = '3px solid black';
        }
      }
      row.append(cell);
    }
  }
};
//
createTable(playgrounds[0]);

function playAgain() {
  createTable(playgroundSize[0]);
  pictureOne.selected = 'true';
  seconds = 0;
  minutes = 0;
  timeInMinutes.innerHTML = '00';
  timeInSeconds.innerHTML = ':00';
  isGameStarted = false;
}

function resetGame() {
  saveGameBtn.disabled = false;
  clearInterval(interval);
  seconds = 0;
  minutes = 0;
  timeInMinutes.innerHTML = '00';
  timeInSeconds.innerHTML = ':00';
  isGameStarted = false;
  document.querySelectorAll('.play-cell').forEach((cell) => {
    cell.style.pointerEvents = 'auto';
  });
  table
    .querySelectorAll('.play-cell')
    .forEach((cell) => cell.classList.remove('answer'));
  table
    .querySelectorAll('.play-cell')
    .forEach((cell) => cell.classList.remove('cross'));
}

const submitBtnHandler = function () {
  addToTopScores(
    dialogInput.value,
    dialogTime.textContent,
    difficultySelect.options[difficultySelect.selectedIndex].value,
    pictureSelect.options[pictureSelect.selectedIndex].innerHTML,
  );
  playAgain();
  fillTopScore(topScoresList);
};

const generateDialogWindow = function () {
  dialog.className = 'dialog';
  body.append(dialog);
  const form = document.createElement('form');
  form.method = 'dialog';
  dialog.append(form);
  dialogContent.className = 'dialog-content';
  form.append(dialogContent);
  dialogTitle.className = 'dialog-title';
  dialogTitle.innerHTML = 'Great! You have solved the nonogram!';
  dialogContent.append(dialogTitle);
  dialogText.className = 'dialog-text';
  dialogText.innerHTML = `Your time: `;
  dialogContent.append(dialogText);
  dialogTime.className = 'dialog-time';
  dialogTime.innerHTML = `00:00`;
  dialogContent.append(dialogTime);
  dialogInput.className = 'dialog-input';
  dialogInput.placeholder = 'Enter your name';
  dialogContent.append(dialogInput);

  const submitBtn = document.createElement('button');
  submitBtn.innerHTML = 'Сontinue';
  submitBtn.type = 'submit';
  dialogContent.append(submitBtn);
  submitBtn.addEventListener('click', submitBtnHandler);
};

generateDialogWindow();

const getAnswer = function () {
  saveGameBtn.disabled = true;
  table.querySelectorAll('.cross, .answer').forEach((cell) => {
    cell.classList.remove('cross');
    cell.classList.remove('answer');
  });

  document.querySelectorAll('.play-cell').forEach((cell) => {
    cell.style.pointerEvents = 'none';
  });

  document
    .querySelectorAll('.right-cell')
    .forEach((el) => el.classList.add('answer'));

  setTimeout(showConfirm, 2000);
};

showAnswerBtn.addEventListener('click', getAnswer);

function changePicture() {
  clearInterval(interval);
  seconds = 0;
  minutes = 0;
  timeInMinutes.innerHTML = '00';
  timeInSeconds.innerHTML = ':00';
  isGameStarted = false;
  const selectValue = pictureSelect.options[pictureSelect.selectedIndex].value;
  createTable(playgroundSize[selectValue]);
}

resetGameBtn.addEventListener('click', resetGame);

const generateLastResultsDialog = function () {
  body.append(lastResultsWindow);
  resultsContent.innerHTML = 'Last results:';
  resultsContent.className = 'results-content';
  resultsContent.appendChild(topScoresList);
  lastResultsWindow.className = 'dialog-results';
  lastResultsWindow.append(resultsContent);
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = 'close';
  closeBtn.addEventListener('click', () => lastResultsWindow.close());
  resultsContent.append(closeBtn);
};

generateLastResultsDialog();

const showLastResults = function () {
  lastResultsWindow.showModal();
};

lastResultsBtn.addEventListener('click', showLastResults);

pictureSelect.addEventListener('change', changePicture);

function changeDifficult() {
  clearInterval(interval);
  seconds = 0;
  minutes = 0;
  timeInMinutes.innerHTML = '00';
  timeInSeconds.innerHTML = ':00';
  pictureOne.selected = 'true';
  const selectValue =
    difficultySelect.options[difficultySelect.selectedIndex].value;
  if (selectValue === 'easy') {
    gameNumber = playgrounds.filter((el) => el.size === 5).length;
    playgroundSize = playgrounds.filter((el) => el.size === 5);
  }
  if (selectValue === 'medium') {
    gameNumber = playgrounds.filter((el) => el.size === 10).length;
    playgroundSize = playgrounds.filter((el) => el.size === 10);
  }
  if (selectValue === 'hard') {
    gameNumber = playgrounds.filter((el) => el.size === 15).length;
    playgroundSize = playgrounds.filter((el) => el.size === 15);
  }
  createTable(playgroundSize[0]);
  pictureOne.innerHTML = `${playgroundSize[0].name}`;
  pictureTwo.innerHTML = `${playgroundSize[1].name}`;
  pictureThree.innerHTML = `${playgroundSize[2].name}`;
  pictureFour.innerHTML = `${playgroundSize[3].name}`;
  pictureFive.innerHTML = `${playgroundSize[4].name}`;
}

difficultySelect.addEventListener('change', changeDifficult);

function showConfirm() {
  confirm('Press OK to try again or CANCEL to get random nonogram')
    ? resetGame()
    : startRandomGame();
}

function startRandomGame() {
  saveGameBtn.disabled = false;
  clearInterval(interval);
  seconds = 0;
  minutes = 0;
  timeInMinutes.innerHTML = '00';
  timeInSeconds.innerHTML = ':00';
  dialogTime.innerHTML = `00:00`;
  isGameStarted = false;
  gameNumber = playgrounds.length;
  const game = playgrounds[getRandomInt(gameNumber)];
  difficultySelect.value = game.difficulty;
  changeDifficult();
  pictureSelect.selectedIndex = [
    pictureOne,
    pictureTwo,
    pictureThree,
    pictureFour,
    pictureFive,
  ].findIndex((p) => p.innerHTML === game.name);
  changePicture();
}

randomGameBtn.addEventListener('click', startRandomGame);

fillTopScore(topScoresList);

const saveBtnHandler = function () {
  const saveData = {
    minutes,
    seconds,
    difficult: difficultySelect.selectedIndex,
    picture: pictureSelect.selectedIndex,
    board: table.innerHTML,
  };

  localStorage.setItem('saveData', JSON.stringify(saveData));
};

saveGameBtn.addEventListener('click', saveBtnHandler);

const resumeGame = function () {
  const saveData = localStorage.getItem('saveData');
  if (saveData) {
    clearInterval(interval);
    isGameStarted = false;
    const data = JSON.parse(saveData);
    minutes = data.minutes;
    seconds = data.seconds - 1;
    difficultySelect.selectedIndex = data.difficult;
    pictureSelect.selectedIndex = data.picture;
    startTimer();
    changeDifficult();
    changePicture();
    table.innerHTML = data.board;
    table.querySelectorAll('.play-cell').forEach((cell) => {
      cell.addEventListener('click', leftClickHandle);
      cell.addEventListener('contextmenu', rightClickHandle);
      cell.addEventListener('click', startTimerOnFirstClick);
    });
  }
};

resumeGameBtn.addEventListener('click', resumeGame);

function checkboxHandler() {
  if (switcher.checked !== true) {
    document.documentElement.style.setProperty(
      '--cross-img',
      `url("${cross}")`,
    );
    document.documentElement.style.setProperty('--title-color', 'rgb(0, 0, 0)');

    document.documentElement.style.setProperty(
      '--back-color',
      'rgb(231, 255, 218)',
    );
    document.documentElement.style.setProperty(
      '--select-color',
      'rgb(255, 255, 255)',
    );
    document.documentElement.style.setProperty(
      '--answer-color',
      'rgb(43, 43, 43)',
    );
    document.documentElement.style.setProperty(
      '--hover-color',
      'rgb(163, 255, 163)',
    );
    document.documentElement.style.setProperty(
      '--buttons-color',
      'rgb(133, 191, 133)',
    );
    document.documentElement.style.setProperty(
      '--cells-top-left',
      'rgba(220, 220, 220, 0.934)',
    );
    document.documentElement.style.setProperty(
      '--cells-play',
      'rgba(241, 236, 236, 1)',
    );
  } else {
    document.documentElement.style.setProperty(
      '--title-color',
      'rgba(164, 113, 3, 0.824)',
    );
    document.documentElement.style.setProperty(
      '--cells-play',
      'rgba(15, 15, 15, 0.525)',
    );
    document.documentElement.style.setProperty(
      '--cells-top-left',
      'rgb(71, 70, 69)',
    );
    document.documentElement.style.setProperty(
      '--back-color',
      'rgba(15, 15, 15, 0.7)',
    );
    document.documentElement.style.setProperty(
      '--answer-color',
      'rgba(164, 113, 3, 0.824)',
    );
    document.documentElement.style.setProperty('--hover-color', 'yellow');
    document.documentElement.style.setProperty(
      '--buttons-color',
      'rgba(164, 113, 3, 0.824)',
    );
    document.documentElement.style.setProperty(
      '--select-color',
      'rgb(164, 113, 3, 0.824)',
    );
    document.documentElement.style.setProperty(
      '--cross-img',
      `url("${cross2}")`,
    );
  }
}

switcher.addEventListener('click', checkboxHandler);
