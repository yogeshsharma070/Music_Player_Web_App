document.getElementById("left_scroll").addEventListener("mousedown", () => {
  document.getElementById("left_scroll").style.opacity = "0.3";
});
document.getElementById("left_scroll").addEventListener("mouseup", () => {
  document.getElementById("left_scroll").style.opacity = "1";
});

document.getElementById("right_scroll").addEventListener("mousedown", () => {
  document.getElementById("right_scroll").style.opacity = "0.3";
});
document.getElementById("right_scroll").addEventListener("mouseup", () => {
  document.getElementById("right_scroll").style.opacity = "1";
});


const container = document.getElementById("cardContainer");
const leftBtn = document.getElementById("left_scroll");
const rightBtn = document.getElementById("right_scroll");

function scrollTwoCards(direction) {
  const card = container.querySelector(".card");

  if (!card) return;

  const cardWidth = card.offsetWidth;
  const scrollAmount = cardWidth * 1;

  container.scrollBy({
    left: direction === "right" ? scrollAmount : -scrollAmount,
    behavior: "smooth"
  });
}

rightBtn.addEventListener("click", () => scrollTwoCards("right"));
leftBtn.addEventListener("click", () => scrollTwoCards("left"));



const songsMap = {
  1: "Songs/Tujh Mein Rab Dikhta Hai.mp3",
  2: "Songs/Tum Hi Ho.mp3",
  3: "Songs/Khairiyat.mp3",
  4: "Songs/Teri Meri.mp3",
  5: "Songs/Main Agar Kahoon.mp3",
  6: "Songs/Ae Dil Hai Mushkil.mp3",
  7: "Songs/Ye Ishq Hai.mp3",
  8: "Songs/Dil Lutiya.mp3",
  9: "Songs/Aaj Unse Milna Hai.mp3",
  10: "Songs/Khulke Jeene Ka.mp3",
  11: "Songs/Ishq.mp3",
  12: "Songs/Bapu Zimidar.mp3",
  13: "Songs/Kyon Ki Itna Pyar.mp3",
  14: "Songs/Payal.mp3",
  15: "Songs/Love Dose.mp3",
  16: "Songs/Janam Janam.mp3",
  17: "Songs/Kisi Ki Muskurahaton Pe.mp3",
  18: "Songs/Deewana kar raha hai.mp3",
  19: "Songs/Tu Hi Rab Tu Hi Dua.mp3",
  20: "Songs/Laembadgini.mp3"
};

let currentSongId = null;

const cards = document.querySelectorAll(".card");
const audioplayer = document.getElementById("audioPlayer");
const historyList = document.getElementById("historylist");
const maxHistory = 7;

const playPauseBtn = document.getElementById("playPauseBtn");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const volumeControl = document.getElementById("volumeControl");
const currentTimeDisplay = document.getElementById("currentTime");
const totalDurationDisplay = document.getElementById("totalDuration");

function updateHistory(songTitle) {
  const newItem = document.createElement("li");
  newItem.textContent = songTitle;
  historyList.prepend(newItem);

  while (historyList.children.length > maxHistory) {
    historyList.removeChild(historyList.lastChild);
  }
}

cards.forEach((card) => {
  const id = parseInt(card.dataset.id);

  card.addEventListener("click", () => {
    cards.forEach((c) => c.classList.remove("playing"));
    card.classList.add("playing");

    currentSongId = id;

    const title = card.querySelector("h2").textContent;
    updateHistory(title);

    const songFile = songsMap[id];
    if (songFile) {
      audioplayer.src = songFile;
      audioplayer.play();

      playIcon.style.display = "none";
      pauseIcon.style.display = "inline-block";
    }
  });
});


playPauseBtn.addEventListener("click", () => {
  if (audioplayer.paused) {
    audioplayer.play();
  } else {
    audioplayer.pause();
  }
});


audioplayer.addEventListener("pause", () => {
  playIcon.style.display = "inline-block";
  pauseIcon.style.display = "none";
});

audioplayer.addEventListener("play", () => {
  playIcon.style.display = "none";
  pauseIcon.style.display = "inline-block";
});


audioplayer.addEventListener("timeupdate", () => {
  const current = audioplayer.currentTime;
  const total = audioplayer.duration;
  currentTimeDisplay.textContent = formatTime(current);
  totalDurationDisplay.textContent = isNaN(total) ? "0:00" : formatTime(total);
  progressBar.value = (current / total) * 100 || 0;
});


progressBar.addEventListener("input", () => {
  const seekTime = (progressBar.value / 100) * audioplayer.duration;
  audioplayer.currentTime = seekTime;
});


volumeControl.addEventListener("input", () => {
  audioplayer.volume = volumeControl.value;
});


audioplayer.addEventListener("ended", () => {
  nextBtn.click();
});


function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}


function playSongById(id) {
  const card = document.querySelector(`.card[data-id="${id}"]`);
  if (card) card.click();
}

const songIds = Object.keys(songsMap).map(Number);

nextBtn.addEventListener("click", () => {
  const currentIndex = songIds.indexOf(currentSongId);
  const nextId = songIds[(currentIndex + 1) % songIds.length];
  playSongById(nextId);
});

prevBtn.addEventListener("click", () => {
  const currentIndex = songIds.indexOf(currentSongId);
  const prevId = songIds[(currentIndex - 1 + songIds.length) % songIds.length];
  playSongById(prevId);
});



document.getElementById("playPauseBtn").addEventListener("mousedown", () => {
  document.getElementById("playPauseBtn").style.filter = "invert(0.7)";
});
document.getElementById("playPauseBtn").addEventListener("mouseup", () => {
  document.getElementById("playPauseBtn").style.filter = "invert(0)";
});

document.getElementById("nextBtn").addEventListener("mousedown", () => {
  document.getElementById("nextBtn").style.filter = "invert(0.7)";
});
document.getElementById("nextBtn").addEventListener("mouseup", () => {
  document.getElementById("nextBtn").style.filter = "invert(0)";
});

document.getElementById("prevBtn").addEventListener("mousedown", () => {
  document.getElementById("prevBtn").style.filter = "invert(0.7)";
});
document.getElementById("prevBtn").addEventListener("mouseup", () => {
  document.getElementById("prevBtn").style.filter = "invert(0)";
});


function playSongById(id) {
  const card = document.querySelector(`.card[data-id="${id}"]`);
  if (card) {
    card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    card.click();
  }
}