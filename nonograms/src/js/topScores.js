function getTopScores() {
  const topScores = localStorage.getItem('topScores') || '[]';
  const ts = JSON.parse(topScores);
  return ts;
}

export function fillTopScore(topScoresList) {
  const topScores = getTopScores();
  const tbody = document.createElement('tbody');

  tbody.innerHTML = topScores
    .map(
      (score, index) =>
        `<tr><td>${index + 1}</td><td>${score.name || 'reviewer 1'}</td>
          <td>${score.time}</td> <td>${score.difficulty}</td>
          <td>${score.picture}</td></tr>`,
    )
    .join('');

  const thead = document.createElement('thead');
  thead.innerHTML = `<tr><th>#</th><th>Name</th>
  <th>time</th><th>difficulty</th>
  <th>picture</th></tr>`;

  topScoresList.innerHTML = '';
  topScoresList.append(thead);
  topScoresList.append(tbody);
}

export function addToTopScores(name, time, difficulty, picture) {
  let topScores = getTopScores();
  topScores.push({
    name,
    time,
    difficulty,
    picture,
  });
  topScores.sort((a, b) => a.time.localeCompare(b.time));

  topScores = topScores.slice(0, 5);

  localStorage.setItem('topScores', JSON.stringify(topScores));
}
