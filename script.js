const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const countdownScreen = $("#countdownScreen");
const countdownNumber = $("#countdownNumber");
const countdownQuote = $("#countdownQuote");
const headphoneAlert = $("#headphoneAlert");
const startCountdownButton = $("#startCountdown");
const ringProgress = $("#ringProgress");
const prayerAudio = $("#prayerAudio");

const candleScreen = $("#candleScreen");
const candles = $$(".candle");
const candleStatus = $("#candleStatus");
const candleContinue = $("#candleContinue");
const rpsPanel = $("#rpsPanel");
const rpsRound = $("#rpsRound");
const rpsStatus = $("#rpsStatus");
const rpsChoices = $("#rpsChoices");
const rpsResult = $("#rpsResult");

const ageScreen = $("#ageScreen");
const ageForm = $("#ageForm");
const ageInput = $("#ageInput");
const ageResponse = $("#ageResponse");

const wishScreen = $("#wishScreen");
const wishForm = $("#wishForm");
const wishInput = $("#wishInput");
const wishSealed = $("#wishSealed");

const mainContent = $("#mainContent");
const birthdaySong = $("#birthdaySong");
const musicToggle = $("#musicToggle");
const musicIcon = $("#musicIcon");
const musicLabel = $("#musicLabel");

const missMinute = $("#missMinute");
const missMinuteText = $("#missMinuteText");

const questionCard = $("#questionCard");
const questionNumber = $("#questionNumber");
const questionText = $("#questionText");
const answerGrid = $("#answerGrid");
const questionCounter = $("#questionCounter");
const questionPercent = $("#questionPercent");
const questionProgress = $("#questionProgress");
const questionResponse = $("#questionResponse");

const chapterSection = $("#chapterSection");
const chapterAge = $("#chapterAge");
const chapterTitle = $("#chapterTitle");
const chapterMessage = $("#chapterMessage");
const continueAfterQuestions = $("#continueAfterQuestions");

const moodResponse = $("#moodResponse");
const moodContinue = $("#moodContinue");
const finalReveal = $("#finalReveal");
const finalMessage = $("#finalMessage");
const finalPreview = $("#finalPreview");
const prayerVideoWrap = $("#prayerVideoWrap");
const catGrid = $("#catGrid");
const catCounter = $("#catCounter");
const catGameStatus = $("#catGameStatus");
const catResponse = $("#catResponse");
const catContinue = $("#catContinue");
const candleCelebration = $("#candleCelebration");
const candleCelebrationTitle = $("#candleCelebrationTitle");
const candleCelebrationText = $("#candleCelebrationText");

let seconds = 60;
let countdownTimer = null;
let candlesRemaining = candles.length;
let activeCandleIndex = 0;
let userAge = null;
let currentLevel = "countdownScreen";

const birthdayAnswers = {
  newYear: null,
  birthdayStyle: null,
  moneyChoice: null,
  nextVersion: null,
  priority: null,
  chapterTitle: null
};

const questions = [
  {
    key: "newYear",
    text: "What do you want more of this year?",
    answers: [
      ["Happiness", "More reasons to smile."],
      ["Adventure", "More places to discover."],
      ["Success", "More goals becoming real."],
      ["Peace", "More room to breathe."]
    ],
    reactions: {
      Happiness: "Good choice. This year could use plenty of that.",
      Adventure: "Okay, someone is ready for new adventures.",
      Success: "I see the ambition. Keep that energy.",
      Peace: "Honestly? Peace is a luxury worth protecting."
    }
  },
  {
    key: "birthdayStyle",
    text: "Your perfect birthday sounds like...",
    answers: [
      ["A big celebration", "Music, people, food. Everything."],
      ["Food + close friends", "Small circle. Good vibes."],
      ["Somewhere new", "A birthday adventure."],
      ["Peace and relaxation", "No stress. Just enjoy."]
    ],
    reactions: {
      "A big celebration": "Now that's a birthday atmosphere.",
      "Food + close friends": "Simple. Personal. I respect it.",
      "Somewhere new": "A passport might need to enter the conversation.",
      "Peace and relaxation": "Sometimes doing absolutely nothing is the plan."
    }
  },
  {
    key: "moneyChoice",
    text: "Someone just gave you $10,000. What's your first move?",
    answers: [
      ["Save / invest it", "Future you will appreciate this."],
      ["Buy something I've wanted", "Finally. No more waiting."],
      ["Travel", "The world is calling."],
      ["Find another $10,000", "Don't ask questions. Just give me the money."]
    ],
    reactions: {
      "Save / invest it": "Responsible. Miss Minute approves.",
      "Buy something I've wanted": "You know exactly what you want. Fair.",
      Travel: "Apparently we're booking a flight.",
      "Find another $10,000": "I knew I liked your thinking."
    }
  },
  {
    key: "nextVersion",
    text: "By your next birthday, you want to be...",
    answers: [
      ["Stronger", "More confident in yourself."],
      ["Wiser", "More lessons, more perspective."],
      ["More successful", "More goals checked off."],
      ["Happier", "More peace and genuine joy."]
    ],
    reactions: {
      Stronger: "Then this year is about becoming harder to shake.",
      Wiser: "Experience has a way of changing everything.",
      "More successful": "Keep building. Quiet progress still counts.",
      Happier: "That sounds like a goal worth protecting."
    }
  },
  {
    key: "priority",
    text: "What deserves more attention this year?",
    answers: [
      ["School / Career", "Build the future."],
      ["Money", "Create more freedom."],
      ["People I care about", "Make the good relationships count."],
      ["Actually enjoying life", "You don't get bonus points for being stressed."]
    ],
    reactions: {
      "School / Career": "Future mode activated.",
      Money: "Freedom is a pretty good reason.",
      "People I care about": "Good people are worth making time for.",
      "Actually enjoying life": "Finally. Someone said it."
    }
  },
  {
    key: "chapterTitle",
    text: "If this new chapter had a title, what would it be?",
    answers: [
      ["My Time", "A little more confidence. A little less waiting."],
      ["Level Up", "New skills. New goals. New experiences."],
      ["A New Chapter", "Leave some things behind. Make room for what's next."],
      ["Main Character Energy", "Walk into this year like it belongs to you."]
    ],
    reactions: {
      "My Time": "I like that. Your time, your chapter.",
      "Level Up": "Okay. We're officially upgrading the year.",
      "A New Chapter": "Exactly. New page. New possibilities.",
      "Main Character Energy": "Oh. So that's the energy we're bringing into this year."
    }
  }
];

const chapterMessages = {
  "My Time": "A little more confidence. A little less waiting.",
  "Level Up": "New skills, new goals, new experiences. Let's see what this year becomes.",
  "A New Chapter": "Leave some things behind. Make room for what's next.",
  "Main Character Energy": "Apparently, that's the energy you're taking into this year."
};

function speak(message) {
  missMinuteText.textContent = message;
  missMinute.classList.remove("mm-speaking");
  void missMinute.offsetWidth;
  missMinute.classList.add("mm-speaking");
}

const mmHosts = {
  countdownScreen: $("#mmHostCountdown"),
  candleScreen: $("#mmHostCandle"),
  ageScreen: $("#mmHostAge"),
  wishScreen: $("#mmHostWish"),
  levelHero: $("#mmHostHero"),
  introSection: $("#mmHostIntro"),
  questionsSection: $("#mmHostQuestions"),
  catGameSection: $("#mmHostCatGame"),
  chapterSection: $("#mmHostChapter"),
  memorySection: $("#mmHostMemory"),
  moodSection: $("#mmHostMood"),
  faithSection: $("#mmHostFaith"),
  finalSection: $("#mmHostFinal")
};

function placeMissMinute(levelId) {
  const host = mmHosts[levelId];
  if (host) host.appendChild(missMinute);
}

function resetCountdownIntro() {
  clearTimeout(countdownTimer);
  seconds = 60;
  countdownNumber.textContent = "60";
  ringProgress.style.strokeDashoffset = 0;
  countdownQuote.textContent = "";
  countdownQuote.className = "quote quote-top";
  if (prayerAudio) {
    prayerAudio.pause();
    prayerAudio.currentTime = 0;
  }
  headphoneAlert?.classList.remove("hidden");
}

function showScreen(screen) {
  [candleScreen, ageScreen, wishScreen].forEach((item) => item.classList.add("hidden"));
  mainContent.classList.add("hidden");

  if (screen === countdownScreen) {
    countdownScreen.classList.remove("hidden");
    document.body.classList.add("locked");
    currentLevel = screen.id;
    placeMissMinute(currentLevel);
    resetCountdownIntro();
    window.scrollTo({ top: 0, behavior: "auto" });
    return;
  }

  screen.classList.remove("hidden");
  document.body.classList.remove("locked");
  currentLevel = screen.id;
  placeMissMinute(currentLevel);
  window.scrollTo({ top: 0, behavior: "auto" });
}

function showLevel(id) {
  const target = document.getElementById(id);
  if (!target) return;

  countdownScreen.classList.add("hidden");
  candleScreen.classList.add("hidden");
  ageScreen.classList.add("hidden");
  wishScreen.classList.add("hidden");
  mainContent.classList.remove("hidden");

  document.querySelectorAll(".level-section").forEach((section) => {
    if (section.id !== id) section.classList.add("hidden");
  });

  target.classList.remove("hidden");
  currentLevel = id;
  placeMissMinute(id);
  document.body.classList.remove("locked");
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function nextLevel(id, message) {
  if (["candleScreen", "ageScreen", "wishScreen", "countdownScreen"].includes(id)) {
    showScreen(document.getElementById(id));
  } else {
    showLevel(id);
  }
  if (message) speak(message);
}

function setupLevelNavigation() {
  $$('[data-next]').forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.next;
      const messages = {
        introSection: "Now let's see what Miss Minute has planned for you.",
        questionsSection: "Six questions. No wrong answers. Just pick what feels right.",
        catGameSection: "Okay, new challenge. Find five cats hiding among the suspicious sketches.",
        chapterSection: "You found them all. Now let's reveal your new chapter.",
        memorySection: "Here are a few little moments. Take your time with them.",
        moodSection: "One more choice. What does this year need?",
        faithSection: "Before the final surprise, here's a little prayer for your new year.",
        finalSection: "You made it to the final level. Ready?"
      };
      nextLevel(target, messages[target]);
    });
  });

  $$('[data-prev]').forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.prev;
      if (["candleScreen", "ageScreen", "wishScreen", "countdownScreen"].includes(target)) {
        showScreen(document.getElementById(target));
      } else {
        showLevel(target);
      }
    });
  });

  $$('[data-prev-screen]').forEach((button) => {
    button.addEventListener("click", () => {
      showScreen(document.getElementById(button.dataset.prevScreen));
    });
  });
}

function startCountdownExperience() {
  if (headphoneAlert) headphoneAlert.classList.add("hidden");
  document.body.classList.add("locked");
  seconds = 60;

  if (prayerAudio) {
    prayerAudio.currentTime = 0;
    prayerAudio.volume = 0.8;
    prayerAudio.play().catch(() => {
      speak("Your prayer is ready. If you don't hear it, check your volume and continue.");
    });
  }
  countdownNumber.textContent = "60";
  ringProgress.style.strokeDashoffset = 0;
  countdownQuote.textContent = "";
  countdownQuote.className = "quote quote-top";
  speak("Hi, Boimalyn. I have a little birthday experience prepared for you. Just follow my instructions.");
  updateCountdown();
}

function updateCountdown() {
  countdownNumber.textContent = seconds;

  const circumference = 603.19;
  const progress = seconds / 60;
  ringProgress.style.strokeDashoffset = circumference * (1 - progress);

  const quoteMap = {
    50: "Another year. Another chapter. Another chance to become everything you dream of.",
    40: "May this year give you more reasons to smile.",
    30: "You are not getting older. You are becoming a newer version of yourself.",
    20: "May your dreams become plans, and your plans become memories.",
    10: "One more moment... your birthday surprise is almost ready."
  };

  if (quoteMap[seconds]) {
    countdownQuote.textContent = quoteMap[seconds];
    countdownQuote.className = "quote quote-top visible";
  }

  if (seconds === 30) {
    speak("Halfway there. Something tells me you're going to like what comes next.");
  }

  if (seconds === 10) {
    speak("Okay... now we're getting serious.");
  }

  if (seconds <= 0) {
    countdownNumber.textContent = "0";
    ringProgress.style.strokeDashoffset = circumference;
    speak("The wait is over. Your birthday experience starts now.");
    setTimeout(finishCountdown, 1200);
    return;
  }

  seconds -= 1;
  countdownTimer = setTimeout(updateCountdown, 1000);
}

function finishCountdown() {
  clearTimeout(countdownTimer);
  if (prayerAudio && !prayerAudio.paused) prayerAudio.pause();
  countdownScreen.classList.add("hidden");
  document.body.classList.remove("locked");
  showScreen(candleScreen);
  speak("Before we continue, I need you to do something. Put out every candle.");
}

function setupCandles() {
  candles.forEach((candle, index) => {
    candle.addEventListener("click", () => {
      if (index !== activeCandleIndex || candle.classList.contains("blown")) return;
      openRpsChallenge();
    });
  });

  $$(".rps-choice").forEach((button) => {
    button.addEventListener("click", () => playRps(button.dataset.choice));
  });

  candleContinue.addEventListener("click", () => {
    showScreen(ageScreen);
    speak("How old are you now? Enter your new age.");
    setTimeout(() => ageInput.focus(), 250);
  });
}

function openRpsChallenge() {
  candles.forEach((candle, index) => candle.classList.toggle("active", index === activeCandleIndex));
  const number = activeCandleIndex + 1;
  rpsPanel.classList.remove("hidden");
  rpsRound.textContent = `CANDLE ${number} OF ${candles.length}`;
  rpsStatus.textContent = `Beat Miss Minute at Rock, Paper, Scissors to put out candle ${number}.`;
  rpsResult.textContent = "";
  $$(".rps-choice").forEach((button) => { button.disabled = false; });
  speak(`Candle ${number}. You have to beat me first. Choose Rock, Paper, or Scissors.`);
  rpsPanel.scrollIntoView({ behavior: "smooth", block: "center" });
}

function playRps(playerChoice) {
  const choices = ["rock", "paper", "scissors"];
  const missChoice = choices[Math.floor(Math.random() * choices.length)];
  const labels = { rock: "Rock", paper: "Paper", scissors: "Scissors" };

  $$(".rps-choice").forEach((button) => { button.disabled = true; });
  rpsResult.textContent = `You chose ${labels[playerChoice]}. Miss Minute chose ${labels[missChoice]}.`;

  let result = "draw";
  if (
    (playerChoice === "rock" && missChoice === "scissors") ||
    (playerChoice === "paper" && missChoice === "rock") ||
    (playerChoice === "scissors" && missChoice === "paper")
  ) {
    result = "win";
  } else if (playerChoice !== missChoice) {
    result = "lose";
  }

  if (result === "win") {
    rpsResult.textContent += " You win.";
    speak("You got me. Fine. That candle is yours.");
    setTimeout(() => extinguishActiveCandle(), 700);
    return;
  }

  if (result === "draw") {
    rpsResult.textContent += " Draw. Again.";
    speak("A draw does not count. Try again.");
  } else {
    rpsResult.textContent += " I win. Try again.";
    speak("Nice try. But that candle is still mine. Try again.");
  }

  setTimeout(() => {
    $$(".rps-choice").forEach((button) => { button.disabled = false; });
  }, 550);
}

function celebrateCandle(number) {
  if (!candleCelebration) return;
  candleCelebrationTitle.textContent = number === candles.length ? "OKAYYY, YOU ATE THAT." : "CANDLE DOWN. PERIOD.";
  candleCelebrationText.textContent = number === candles.length ? "You beat Miss Minute and cleared the whole cake." : `Candle ${number} is officially out.`;
  candleCelebration.classList.remove("hidden");
  launchConfetti();
  setTimeout(() => candleCelebration.classList.add("hidden"), 1100);
}

function extinguishActiveCandle() {
  const candle = candles[activeCandleIndex];
  candle.classList.remove("active");
  candle.classList.add("blown");
  candle.setAttribute("aria-pressed", "true");
  candle.disabled = true;
  candlesRemaining -= 1;
  rpsPanel.classList.add("hidden");
  celebrateCandle(activeCandleIndex + 1);

  if (candlesRemaining > 0) {
    activeCandleIndex += 1;
    candleStatus.textContent = `${candlesRemaining} candle${candlesRemaining === 1 ? "" : "s"} left. The next challenge is ready.`;
    setTimeout(() => openRpsChallenge(), 650);
  } else {
    candleStatus.textContent = "You beat Miss Minute five times. Every candle is out.";
    candleContinue.classList.remove("hidden");
    speak("Okay, you officially won. Every candle is out. Now make your wish.");
  }
}

ageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const age = Number(ageInput.value);

  if (!Number.isInteger(age) || age < 1 || age > 120) {
    ageResponse.textContent = "Miss Minute needs a real age.";
    return;
  }

  userAge = age;
  ageResponse.textContent = `Ah... ${age}. A new chapter.`;
  speak(`Ah... ${age}. A new chapter.`);

  setTimeout(() => {
    showScreen(wishScreen);
    speak("Now close your eyes for a moment. Think about what you really want from this new year.");
    setTimeout(() => wishInput.focus(), 350);
  }, 1200);
});

wishForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const privateWish = wishInput.value.trim();

  if (!privateWish) {
    speak("You need a wish first. It can be short. Just make it yours.");
    wishInput.focus();
    return;
  }

  wishInput.value = "";
  wishForm.classList.add("hidden");
  wishSealed.classList.remove("hidden");

  speak("Your wish is sealed. Keep it close. I have one more thing waiting for you.");

  setTimeout(startBirthdayExperience, 2300);
});

function startBirthdayExperience() {
  showLevel("levelHero");

  birthdaySong.volume = 0.65;
  birthdaySong.addEventListener("error", () => {
    musicIcon.textContent = "▶";
    musicLabel.textContent = "Song unavailable";
    musicToggle.setAttribute("aria-label", "Birthday song unavailable");
  }, { once: true });

  birthdaySong.play()
    .then(() => {
      musicIcon.textContent = "Ⅱ";
      musicLabel.textContent = "Birthday song";
      musicToggle.setAttribute("aria-label", "Pause birthday song");
    })
    .catch(() => {
      musicIcon.textContent = "▶";
      musicLabel.textContent = "Play song";
      speak("Your birthday song is ready. Tap the music button if it needs a little help starting.");
    });

  speak("Your wish is yours now. And the birthday experience officially begins.");
}

musicToggle.addEventListener("click", () => {
  if (birthdaySong.paused) {
    birthdaySong.play()
      .then(() => {
        musicIcon.textContent = "Ⅱ";
        musicLabel.textContent = "Birthday song";
        musicToggle.setAttribute("aria-label", "Pause birthday song");
      })
      .catch(() => {});
  } else {
    birthdaySong.pause();
    musicIcon.textContent = "▶";
    musicLabel.textContent = "Play song";
    musicToggle.setAttribute("aria-label", "Play birthday song");
  }
});

function renderQuestion(index) {
  const question = questions[index];
  const number = String(index + 1).padStart(2, "0");
  const percent = Math.round(((index + 1) / questions.length) * 100);

  questionNumber.textContent = `QUESTION ${number}`;
  questionText.textContent = question.text;
  questionCounter.textContent = `${number} / 06`;
  questionPercent.textContent = `${percent}%`;
  questionProgress.style.width = `${percent}%`;
  questionResponse.textContent = "";

  answerGrid.innerHTML = "";

  question.answers.forEach(([title, description]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.innerHTML = `<strong>${title}</strong><span>${description}</span>`;

    button.addEventListener("click", () => {
      selectAnswer(index, title, button);
    });

    answerGrid.appendChild(button);
  });
}

function selectAnswer(index, answer, button) {
  const question = questions[index];
  birthdayAnswers[question.key] = answer;

  $$(".answer-btn").forEach((item) => item.classList.remove("selected"));
  button.classList.add("selected");

  const reaction = question.reactions[answer];
  questionResponse.textContent = reaction;
  speak(reaction);

  if (index === questions.length - 1) {
    questionProgress.style.width = "100%";
    questionPercent.textContent = "100%";
    continueAfterQuestions.classList.remove("hidden");
    speak("That's all six. Take a second, then press continue when you're ready for the next challenge.");
    return;
  }

  setTimeout(() => {
    questionCard.classList.add("changing");

    setTimeout(() => {
      renderQuestion(index + 1);
      questionCard.classList.remove("changing");
    }, 260);
  }, 850);
}

function sketchSVG(type) {
  const common = 'viewBox="0 0 120 120" aria-hidden="true"';
  const stroke = 'fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"';
  const fills = 'fill="currentColor"';
  const shapes = {
    cat: `<svg ${common} ${stroke}><path d="M28 49 30 25 48 38Q60 33 72 38L90 25 92 49Q99 58 94 73 88 91 60 94 32 91 26 73 21 58 28 49Z"/><path d="M45 62h1M74 62h1M51 73q9 7 18 0M60 67v4M42 70l-14-4M78 70l14-4"/></svg>`,
    fox: `<svg ${common} ${stroke}><path d="M27 48 24 25 46 37Q60 32 74 37L96 25 93 50Q98 66 86 80 73 94 60 94 47 94 34 80 22 66 27 48Z"/><path d="m49 65 11 10 11-10M46 60h1M73 60h1"/></svg>`,
    bunny: `<svg ${common} ${stroke}><path d="M43 39Q31 20 38 15 48 12 51 37M77 39Q89 20 82 15 72 12 69 37Q90 48 91 67 89 91 60 94 31 91 29 67 30 48 43 39Z"/><path d="M47 63h1M72 63h1M52 74q8 5 16 0"/></svg>`,
    bear: `<svg ${common} ${stroke}><circle cx="40" cy="39" r="13"/><circle cx="80" cy="39" r="13"/><circle cx="60" cy="63" r="31"/><path d="M49 62h1M70 62h1M53 74q7 6 14 0"/></svg>`,
    bat: `<svg ${common} ${stroke}><path d="M60 88Q46 73 39 52L17 38 24 67 39 59Q43 79 60 88 77 79 81 59L96 67 103 38 81 52Q74 73 60 88Z"/><circle cx="51" cy="61" r="1" fill="currentColor"/><circle cx="69" cy="61" r="1" fill="currentColor"/></svg>`,
    dog: `<svg ${common} ${stroke}><path d="M32 47 24 28 43 36Q60 30 77 36L96 28 88 50Q93 68 82 81 70 94 60 94 50 94 38 81 27 68 32 47Z"/><path d="M47 62h1M72 62h1M52 74q8 5 16 0M35 51 26 45M85 51l9-6"/></svg>`,
    owl: `<svg ${common} ${stroke}><circle cx="42" cy="48" r="21"/><circle cx="78" cy="48" r="21"/><path d="M60 25Q84 31 91 54 88 88 60 94 32 88 29 54 36 31 60 25Z"/><circle cx="42" cy="48" r="6"/><circle cx="78" cy="48" r="6"/><path d="m60 57-6 9 6 5 6-5-6-9Z"/></svg>`,
    devil: `<svg ${common} ${stroke}><path d="M32 45 23 24 47 36Q60 31 73 36L97 24 88 46Q95 62 87 78 77 94 60 94 43 94 33 78 25 62 32 45Z"/><path d="M47 61h1M72 61h1M51 73q9 6 18 0M47 82q13 7 26 0"/></svg>`,
    koala: `<svg ${common} ${stroke}><circle cx="38" cy="48" r="18"/><circle cx="82" cy="48" r="18"/><circle cx="60" cy="63" r="30"/><path d="M51 62q9-8 18 0M55 75q5 4 10 0"/><circle cx="60" cy="67" r="5"/></svg>`,
    raccoon: `<svg ${common} ${stroke}><path d="M28 48 27 27 47 38Q60 33 73 38L93 27 92 49Q98 67 86 81 73 94 60 94 47 94 34 81 22 67 28 48Z"/><path d="M34 56Q60 45 86 56M47 63h1M72 63h1M53 74q7 5 14 0"/></svg>`
  };
  return shapes[type] || shapes.cat;
}

function setupCatGame() {
  if (!catGrid) return;
  const decoys = ["fox", "bunny", "bear", "bat", "dog", "owl", "devil", "koala", "raccoon", "fox"];
  const tiles = [
    ...Array(5).fill("cat"),
    ...decoys
  ].sort(() => Math.random() - 0.5);

  catGrid.innerHTML = "";
  let found = 0;

  tiles.forEach((type, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "cat-tile";
    button.dataset.cat = type === "cat" ? "true" : "false";
    button.setAttribute("aria-label", `Sketch ${index + 1}`);
    button.innerHTML = `<span class="cat-sketch">${sketchSVG(type)}</span><span class="cat-tile-number">${String(index + 1).padStart(2, "0")}</span>`;

    button.addEventListener("click", () => {
      if (button.disabled) return;

      if (button.dataset.cat === "true") {
        button.disabled = true;
        button.classList.add("found");
        found += 1;
        catCounter.textContent = `${found} / 5 cats found`;
        catGameStatus.textContent = found === 5 ? "All five. You actually have eyes." : "That's one. Keep looking.";
        catResponse.textContent = found === 5 ? "FIVE OUT OF FIVE. You cleared the cat scan." : "Yep. That's a cat.";
        speak(found === 5 ? "Five cats. You found every one. Okay, detective." : "Yep. That's a cat. Keep going.");

        if (found === 5) {
          catContinue.classList.remove("hidden");
          launchConfetti();
          speak("Five cats found. Challenge complete. You ate that one.");
        }
      } else {
        button.classList.add("wrong");
        catResponse.textContent = "Nope. That one was a decoy.";
        catGameStatus.textContent = "Nice try. Look again.";
        speak("Nope. Decoy. Keep searching.");
        setTimeout(() => button.classList.remove("wrong"), 500);
      }
    });

    catGrid.appendChild(button);
  });

  if (catCounter) catCounter.textContent = "0 / 5 cats found";
  if (catGameStatus) catGameStatus.textContent = "Trust your eyes.";
  if (catResponse) catResponse.textContent = "";
  catContinue?.classList.add("hidden");
}

function showCatGame() {
  showLevel("catGameSection");
  speak("Okay, new challenge. Five cats are hiding among these suspicious little sketches. Find them all.");
}

function showChapterReveal() {
  chapterAge.textContent = userAge || "—";
  chapterTitle.textContent = birthdayAnswers.chapterTitle;
  chapterMessage.textContent = chapterMessages[birthdayAnswers.chapterTitle];

  finalPreview.textContent = `Chapter ${userAge}: ${birthdayAnswers.chapterTitle}. Your choices are now part of the little story. Ready for the last surprise?`;

  showLevel("chapterSection");
  speak(`And there we have it. Chapter ${userAge}: ${birthdayAnswers.chapterTitle}. I think you should remember that.`);
}

$$(".mood-card").forEach((button) => {
  button.addEventListener("click", () => {
    $$(".mood-card").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");

    const mood = button.dataset.mood;
    const messages = {
      Happiness: "Then let's make room for more reasons to smile.",
      Adventure: "Then this year needs a few stories worth telling.",
      Growth: "Keep becoming. Quiet progress still counts.",
      Peace: "Protect your peace. It matters."
    };

    moodResponse.textContent = messages[mood];
    moodContinue.classList.remove("hidden");
    speak(messages[mood]);
  });
});

finalReveal.addEventListener("click", () => {
  finalMessage.classList.remove("hidden");
  finalReveal.classList.add("hidden");
  if (prayerVideoWrap) prayerVideoWrap.classList.remove("hidden");

  speak("Mission accomplished. Happy Birthday, Boimalyn. And before you go, there is one last prayer waiting for you.");
  launchConfetti();
  finalMessage.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => {
    prayerVideoWrap?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 900);
});

function launchConfetti() {
  for (let i = 0; i < 100; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    piece.style.animationDuration = `${2 + Math.random() * 2}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 4500);
  }
}

renderQuestion(0);
setupCandles();
setupCatGame();
setupLevelNavigation();
placeMissMinute("countdownScreen");

if (startCountdownButton) {
  startCountdownButton.addEventListener("click", startCountdownExperience);
}
