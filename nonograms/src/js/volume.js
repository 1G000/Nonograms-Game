function shutVolume() {
  volumeIcon.classList.add('mute');

  winAudio.volume = 0;
  loseAudio.volume = 0;
  winGameAudio.volume = 0;
  clearAudio.volume = 0;
}

function bringVolumeBack() {
  volumeIcon.classList.remove('mute');
  winAudio.volume = 1;
  loseAudio.volume = 1;
  winGameAudio.volume = 1;
  clearAudio.volume = 1;
}

function muteVolume() {
  const isMute = volumeIcon.classList.contains('mute');
  isMute ? bringVolumeBack() : shutVolume();
}
