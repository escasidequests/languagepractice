// Phrase Practice — vanilla JS flashcard app
// No backend, no API keys: uses the browser's built-in SpeechSynthesis for
// pronunciation, and (where supported) MediaRecorder + SpeechRecognition
// for "say it back" practice.

(function () {
  "use strict";

  const STATS_KEY = "phrasePractice.stats.v1";
  const app = document.getElementById("app");
  const topTitle = document.getElementById("topTitle");
  const backBtn = document.getElementById("backBtn");

  /* ---------------- deck building ---------------- */

  function primaryForm(phrase) {
    let p = phrase;
    if (p.includes(" / ")) p = p.split(" / ")[0];
    else if (p.includes("/")) p = p.split("/")[0];
    return p.trim();
  }

  function buildDeck(langKey) {
    const lang = PHRASE_DATA[langKey];
    const cards = [];
    lang.sections.forEach((section) => {
      section.cards.forEach((c) => {
        cards.push({
          key: `${langKey}|${section.name}|${c.phrase}`,
          lang: langKey,
          section: section.name,
          native: c.phrase,
          speak: primaryForm(c.phrase),
          meaning: c.meaning,
          pron: c.pron
        });
      });
    });
    if (lang.numbers) {
      lang.numbers.items.forEach((n) => {
        cards.push({
          key: `${langKey}|Numbers|${n.num}`,
          lang: langKey,
          section: "Numbers",
          native: n.word,
          speak: n.word,
          meaning: n.num,
          pron: ""
        });
      });
    }
    return cards;
  }

  const DECKS = { es: buildDeck("es"), pt: buildDeck("pt") };

  function sectionNames(langKey) {
    const names = PHRASE_DATA[langKey].sections.map((s) => s.name);
    if (PHRASE_DATA[langKey].numbers) names.push("Numbers");
    return names;
  }

  /* ---------------- stats (localStorage) ---------------- */

  function loadStats() {
    try {
      return JSON.parse(localStorage.getItem(STATS_KEY) || "{}");
    } catch (e) {
      return {};
    }
  }
  function saveStats(stats) {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (e) {
      /* storage unavailable — practice still works, just not remembered */
    }
  }
  let STATS = loadStats();

  function levelOf(key) {
    return (STATS[key] && STATS[key].level) || 0;
  }
  function everMissed(key) {
    return !!(STATS[key] && STATS[key].missedEver);
  }
  function recordResult(key, knew) {
    const s = STATS[key] || { level: 0, seen: 0, missedEver: false };
    s.seen += 1;
    if (knew) {
      s.level = Math.min(5, s.level + 1);
    } else {
      s.level = Math.max(0, s.level - 1);
      s.missedEver = true;
    }
    STATS[key] = s;
    saveStats(STATS);
  }

  /* ---------------- speech: pronunciation ---------------- */

  let voicesCache = [];
  function loadVoices() {
    voicesCache = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  }
  if (window.speechSynthesis) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }

  function pickVoice(locale) {
    if (!voicesCache.length) loadVoices();
    const short = locale.split("-")[0];
    return (
      voicesCache.find((v) => v.lang === locale) ||
      voicesCache.find((v) => v.lang && v.lang.toLowerCase().startsWith(short)) ||
      null
    );
  }

  function speak(text, locale) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = locale;
    utter.rate = 0.88;
    const voice = pickVoice(locale);
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
  }

  /* ---------------- speech: recognition compare (optional) ---------------- */

  const SpeechRecognitionCtor =
    window.SpeechRecognition || window.webkitSpeechRecognition || null;

  function normalize(s) {
    return s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function matchScore(target, heard) {
    const t = normalize(target).split(" ").filter(Boolean);
    const h = normalize(heard).split(" ").filter(Boolean);
    if (!t.length || !h.length) return 0;
    let matched = 0;
    t.forEach((tw) => {
      if (
        h.some(
          (hw) => hw === tw || (tw.length >= 3 && (hw.includes(tw) || tw.includes(hw)))
        )
      )
        matched++;
    });
    return matched / t.length;
  }

  /* ---------------- recording (record & compare) ---------------- */

  const canRecord = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);

  /* ================= state ================= */

  const state = {
    screen: "home",
    langKey: "es",
    direction: "native-en",
    activeSections: new Set(),
    weakOnly: false,
    queue: [],
    current: null,
    flipped: false,
    sessionStats: { known: 0, missed: 0, cardsSet: new Set() },
    recorder: null,
    recordedUrl: null,
    recognizer: null,

    // Numbers Trainer
    numLangKey: "es",
    numRange: "0-9999",
    numMode: "learn",
    numCurrent: 0,
    numSeen: 0,
    numQuiz: null // { items: [n, ...], index, correct, total, answered, lastCorrect, lastAnswer }
  };

  sectionNames(state.langKey).forEach((s) => state.activeSections.add(s));

  /* ================= rendering ================= */

  const SCREEN_PARENT = {
    session: "home",
    summary: "home",
    numbersHome: "home",
    numbersLearn: "numbersHome",
    numbersQuiz: "numbersHome",
    numbersSummary: "numbersHome"
  };

  const SCREEN_RENDERERS = {
    home: [() => "Phrase Practice", renderHome],
    session: [() => `${PHRASE_DATA[state.langKey].flag} ${PHRASE_DATA[state.langKey].label}`, renderSession],
    summary: [() => "Session complete", renderSummary],
    numbersHome: [() => "Numbers Trainer", renderNumbersHome],
    numbersLearn: [() => "Learn numbers", renderNumbersLearn],
    numbersQuiz: [() => "Numbers quiz", renderNumbersQuiz],
    numbersSummary: [() => "Numbers round complete", renderNumbersSummary]
  };

  function render() {
    app.innerHTML = "";
    stopRecognition();
    const entry = SCREEN_RENDERERS[state.screen];
    topTitle.textContent = entry[0]();
    backBtn.hidden = state.screen === "home";
    entry[1]();
  }

  backBtn.addEventListener("click", () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    state.screen = SCREEN_PARENT[state.screen] || "home";
    render();
  });

  /* ---------- home screen ---------- */

  function renderHome() {
    const tpl = document.getElementById("tpl-home");
    app.appendChild(tpl.content.cloneNode(true));

    const langTabs = document.getElementById("langTabs");
    Object.keys(PHRASE_DATA).forEach((key) => {
      const lang = PHRASE_DATA[key];
      const btn = document.createElement("button");
      btn.className = "lang-tab" + (state.langKey === key ? " active" : "");
      btn.innerHTML = `<span class="flag">${lang.flag}</span>${lang.label}<span class="sub">${lang.sublabel}</span>`;
      btn.addEventListener("click", () => {
        state.langKey = key;
        state.activeSections = new Set(sectionNames(key));
        render();
      });
      langTabs.appendChild(btn);
    });

    document.querySelectorAll("#directionRow .pill").forEach((btn) => {
      if (btn.dataset.dir === state.direction) btn.classList.add("active");
      btn.addEventListener("click", () => {
        state.direction = btn.dataset.dir;
        render();
      });
    });

    const sectionRow = document.getElementById("sectionRow");
    sectionNames(state.langKey).forEach((name) => {
      const btn = document.createElement("button");
      btn.className = "pill" + (state.activeSections.has(name) ? " active" : "");
      btn.textContent = name;
      btn.addEventListener("click", () => {
        if (state.activeSections.has(name)) state.activeSections.delete(name);
        else state.activeSections.add(name);
        render();
      });
      sectionRow.appendChild(btn);
    });

    document.getElementById("allSections").addEventListener("click", () => {
      state.activeSections = new Set(sectionNames(state.langKey));
      render();
    });
    document.getElementById("noSections").addEventListener("click", () => {
      state.activeSections = new Set();
      render();
    });

    const weakCheckbox = document.getElementById("weakOnly");
    weakCheckbox.checked = state.weakOnly;
    weakCheckbox.addEventListener("change", () => {
      state.weakOnly = weakCheckbox.checked;
      updateDeckCount();
    });

    document.getElementById("startBtn").addEventListener("click", startSession);

    document.getElementById("goNumbersBtn").addEventListener("click", () => {
      state.screen = "numbersHome";
      render();
    });

    updateDeckCount();
  }

  function currentFilteredDeck() {
    return DECKS[state.langKey].filter((c) => {
      if (!state.activeSections.has(c.section)) return false;
      if (state.weakOnly && !everMissed(c.key)) return false;
      return true;
    });
  }

  function updateDeckCount() {
    const n = currentFilteredDeck().length;
    document.getElementById("deckCount").textContent =
      n === 0 ? "No cards match — pick at least one section." : `${n} card${n === 1 ? "" : "s"} in this deck`;
    document.getElementById("startBtn").disabled = n === 0;
  }

  function startSession() {
    const deck = currentFilteredDeck();
    if (!deck.length) return;
    // weakest cards first, shuffled within each level
    const withRand = deck.map((c) => ({ c, r: Math.random() }));
    withRand.sort((a, b) => levelOf(a.c.key) - levelOf(b.c.key) || a.r - b.r);
    state.queue = withRand.map((x) => x.c);
    state.sessionStats = { known: 0, missed: 0, cardsSet: new Set() };
    state.screen = "session";
    nextCard();
  }

  /* ---------- session screen ---------- */

  function nextCard() {
    cleanupRecording();
    if (!state.queue.length) {
      state.screen = "summary";
      render();
      return;
    }
    state.current = state.queue.shift();
    state.flipped = false;
    render();
  }

  function renderSession() {
    const tpl = document.getElementById("tpl-session");
    app.appendChild(tpl.content.cloneNode(true));

    const card = state.current;
    const total = state.sessionStats.known + state.sessionStats.missed + state.queue.length + 1;
    const done = state.sessionStats.known + state.sessionStats.missed;
    document.getElementById("progressFill").style.width = `${(done / total) * 100}%`;
    document.getElementById("progressLabel").textContent = `${done}/${total}`;

    const showNativeFirst = state.direction === "native-en";
    const frontTag = document.getElementById("frontTag");
    const frontText = document.getElementById("frontText");
    const frontSub = document.getElementById("frontSub");
    const backTag = document.getElementById("backTag");
    const backText = document.getElementById("backText");
    const backSub = document.getElementById("backSub");

    if (showNativeFirst) {
      frontTag.textContent = card.section;
      frontText.textContent = card.native;
      frontSub.textContent = "";
      backTag.textContent = "English";
      backText.textContent = card.meaning;
      backSub.textContent = card.pron || "";
    } else {
      frontTag.textContent = card.section;
      frontText.textContent = card.meaning;
      frontSub.textContent = "";
      backTag.textContent = PHRASE_DATA[state.langKey].label;
      backText.textContent = card.native;
      backSub.textContent = card.pron || "";
    }

    const flashcard = document.getElementById("flashcard");
    const tapHint = document.getElementById("tapHint");
    flashcard.addEventListener("click", () => {
      state.flipped = !state.flipped;
      flashcard.classList.toggle("flipped", state.flipped);
      tapHint.hidden = state.flipped;
      document.getElementById("ratingRow").hidden = !state.flipped;
    });

    document.getElementById("speakBtn").addEventListener("click", (e) => {
      e.stopPropagation();
      speak(card.speak, PHRASE_DATA[state.langKey].locale);
    });

    setupRecordButton(card);

    document.getElementById("missBtn").addEventListener("click", (e) => {
      e.stopPropagation();
      rate(false);
    });
    document.getElementById("knowBtn").addEventListener("click", (e) => {
      e.stopPropagation();
      rate(true);
    });
  }

  function rate(knew) {
    const card = state.current;
    recordResult(card.key, knew);
    state.sessionStats[knew ? "known" : "missed"] += 1;
    state.sessionStats.cardsSet.add(card.key);
    if (!knew) {
      // resurface a missed card later in this same session
      const reinsertAt = Math.min(state.queue.length, 2 + Math.floor(Math.random() * 3));
      state.queue.splice(reinsertAt, 0, card);
    }
    nextCard();
  }

  /* ---------- recording UI ---------- */

  function cleanupRecording() {
    if (state.recordedUrl) {
      URL.revokeObjectURL(state.recordedUrl);
      state.recordedUrl = null;
    }
    stopRecognition();
  }

  function stopRecognition() {
    if (state.recognizer) {
      try {
        state.recognizer.onresult = null;
        state.recognizer.onerror = null;
        state.recognizer.onend = null;
        state.recognizer.stop();
      } catch (e) {}
      state.recognizer = null;
    }
  }

  function setupRecordButton(card) {
    const recordBtn = document.getElementById("recordBtn");
    const playbackBtn = document.getElementById("playbackBtn");
    const statusEl = document.getElementById("recordStatus");
    const badge = document.getElementById("matchBadge");

    if (!canRecord) {
      recordBtn.disabled = true;
      statusEl.textContent = "Microphone recording isn't supported in this browser.";
      return;
    }

    let mediaRecorder = null;
    let chunks = [];
    let stream = null;
    let recognizing = false;

    recordBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      if (recordBtn.classList.contains("recording")) {
        if (mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop();
        if (state.recognizer) {
          try {
            state.recognizer.stop();
          } catch (err) {}
        }
        return;
      }

      badge.hidden = true;
      playbackBtn.hidden = true;
      statusEl.textContent = "Listening…";
      recordBtn.classList.add("recording");

      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err) {
        statusEl.textContent = "Microphone permission was denied.";
        recordBtn.classList.remove("recording");
        return;
      }

      chunks = [];
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (ev) => {
        if (ev.data.size > 0) chunks.push(ev.data);
      };
      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        recordBtn.classList.remove("recording");
        const blob = new Blob(chunks, { type: mediaRecorder.mimeType || "audio/webm" });
        state.recordedUrl = URL.createObjectURL(blob);
        playbackBtn.hidden = false;
        if (!recognizing) statusEl.textContent = "Got it — play it back and compare.";
      };
      mediaRecorder.start();

      // Optional live recognition compare (Chrome/desktop mainly)
      if (SpeechRecognitionCtor) {
        recognizing = true;
        const recognizer = new SpeechRecognitionCtor();
        state.recognizer = recognizer;
        recognizer.lang = PHRASE_DATA[state.langKey].locale;
        recognizer.interimResults = false;
        recognizer.maxAlternatives = 1;
        recognizer.onresult = (ev) => {
          const heard = ev.results[0][0].transcript;
          const score = matchScore(card.speak, heard);
          badge.hidden = false;
          badge.className = "match-badge " + (score >= 0.6 ? "close" : score >= 0.3 ? "partial" : "different");
          const label = score >= 0.6 ? "Sounded close ✅" : score >= 0.3 ? "Partly there 🤔" : "Didn't match ❌";
          badge.innerHTML = `${label} <span class="heard">Heard: "${heard}"</span><span class="heard">Rough auto-check only — trust your ears and the native audio more.</span>`;
        };
        recognizer.onerror = () => {
          /* recognition failing shouldn't block record & compare */
        };
        recognizer.onend = () => {
          recognizing = false;
          if (mediaRecorder && mediaRecorder.state !== "inactive") {
            // let the recorder keep going briefly then stop on its own via button
          }
        };
        try {
          recognizer.start();
        } catch (err) {}
      }

      // auto-stop after 6s so it can't run forever
      setTimeout(() => {
        if (mediaRecorder && mediaRecorder.state === "recording") mediaRecorder.stop();
        if (state.recognizer) {
          try {
            state.recognizer.stop();
          } catch (err) {}
        }
      }, 6000);
    });

    playbackBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!state.recordedUrl) return;
      new Audio(state.recordedUrl).play();
    });
  }

  /* ---------- summary screen ---------- */

  function renderSummary() {
    const tpl = document.getElementById("tpl-summary");
    app.appendChild(tpl.content.cloneNode(true));
    const stats = state.sessionStats;
    const total = stats.known + stats.missed;
    document.getElementById("summaryStats").innerHTML = `
      <div><div class="stat-num">${total}</div><div class="stat-label">Cards practiced</div></div>
      <div><div class="stat-num">${stats.known}</div><div class="stat-label">Knew it</div></div>
      <div><div class="stat-num">${stats.missed}</div><div class="stat-label">Still shaky</div></div>
      <div><div class="stat-num">${total ? Math.round((stats.known / total) * 100) : 0}%</div><div class="stat-label">Accuracy</div></div>
    `;

    document.getElementById("practiceWeakBtn").addEventListener("click", () => {
      const weak = currentFilteredDeck().filter((c) => levelOf(c.key) <= 2);
      if (!weak.length) {
        state.screen = "home";
        render();
        return;
      }
      state.queue = weak.sort(() => Math.random() - 0.5);
      state.sessionStats = { known: 0, missed: 0, cardsSet: new Set() };
      state.screen = "session";
      nextCard();
    });
    document.getElementById("menuBtn").addEventListener("click", () => {
      state.screen = "home";
      render();
    });
  }

  /* ==================== Numbers Trainer ==================== */

  const NUM_QUIZ_LENGTH = 15;

  function parseRange(rangeStr) {
    const [min, max] = rangeStr.split("-").map(Number);
    return { min, max };
  }

  function randomNumberInRange(rangeStr) {
    const { min, max } = parseRange(rangeStr);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function numLocale() {
    return PHRASE_DATA[state.numLangKey].locale;
  }

  function speakNumber(n) {
    // Speak our own generated word form (not the bare digit string) so
    // pronunciation stays correct even if the browser falls back to a
    // voice that doesn't natively parse Spanish/Portuguese numerals.
    speak(NUMBER_WORDS.toWords(state.numLangKey, n), numLocale());
  }

  /* ---------- numbers home ---------- */

  function renderNumbersHome() {
    const tpl = document.getElementById("tpl-numbers-home");
    app.appendChild(tpl.content.cloneNode(true));

    const langTabs = document.getElementById("numLangTabs");
    Object.keys(PHRASE_DATA).forEach((key) => {
      const lang = PHRASE_DATA[key];
      const btn = document.createElement("button");
      btn.className = "lang-tab" + (state.numLangKey === key ? " active" : "");
      btn.innerHTML = `<span class="flag">${lang.flag}</span>${lang.label}<span class="sub">${lang.sublabel}</span>`;
      btn.addEventListener("click", () => {
        state.numLangKey = key;
        render();
      });
      langTabs.appendChild(btn);
    });

    document.querySelectorAll("#numRangeRow .pill").forEach((btn) => {
      if (btn.dataset.range === state.numRange) btn.classList.add("active");
      btn.addEventListener("click", () => {
        state.numRange = btn.dataset.range;
        render();
      });
    });

    document.querySelectorAll("#numModeRow .pill").forEach((btn) => {
      if (btn.dataset.mode === state.numMode) btn.classList.add("active");
      btn.addEventListener("click", () => {
        state.numMode = btn.dataset.mode;
        render();
      });
    });

    document.getElementById("modeHint").textContent =
      state.numMode === "learn"
        ? "Shows each number and its spelling while it's spoken, to build the association."
        : `Only plays the number aloud — you type the digits and get checked. ${NUM_QUIZ_LENGTH} numbers per round.`;

    document.getElementById("numStartBtn").addEventListener("click", () => {
      if (state.numMode === "learn") startNumbersLearn();
      else startNumbersQuiz();
    });
  }

  /* ---------- learn mode ---------- */

  function startNumbersLearn() {
    state.numSeen = 0;
    state.numCurrent = randomNumberInRange(state.numRange);
    state.screen = "numbersLearn";
    render();
  }

  function renderNumbersLearn() {
    const tpl = document.getElementById("tpl-numbers-learn");
    app.appendChild(tpl.content.cloneNode(true));

    document.getElementById("numSeenCount").textContent = `${state.numSeen + 1} numbers seen this round`;
    document.getElementById("numDigits").textContent = state.numCurrent.toLocaleString("en-US");
    document.getElementById("numWords").textContent = NUMBER_WORDS.toWords(state.numLangKey, state.numCurrent);

    speakNumber(state.numCurrent);

    document.getElementById("numSpeakBtn").addEventListener("click", () => speakNumber(state.numCurrent));

    document.getElementById("numNextBtn").addEventListener("click", () => {
      state.numSeen += 1;
      state.numCurrent = randomNumberInRange(state.numRange);
      render();
    });

    document.getElementById("numToQuizBtn").addEventListener("click", () => {
      state.numMode = "quiz";
      startNumbersQuiz();
    });
  }

  /* ---------- quiz mode ---------- */

  function startNumbersQuiz() {
    const items = [];
    for (let i = 0; i < NUM_QUIZ_LENGTH; i++) items.push(randomNumberInRange(state.numRange));
    state.numQuiz = { items, index: 0, correct: 0, total: 0, answered: false, lastCorrect: false, lastAnswer: "" };
    state.screen = "numbersQuiz";
    render();
  }

  function renderNumbersQuiz() {
    const tpl = document.getElementById("tpl-numbers-quiz");
    app.appendChild(tpl.content.cloneNode(true));

    const quiz = state.numQuiz;
    const target = quiz.items[quiz.index];

    document.getElementById("numProgressFill").style.width = `${(quiz.index / quiz.items.length) * 100}%`;
    document.getElementById("numProgressLabel").textContent = `${quiz.index}/${quiz.items.length}`;
    document.getElementById("quizScore").textContent = `${quiz.correct} correct so far`;

    if (!quiz.answered) speakNumber(target);

    document.getElementById("numQuizSpeakBtn").addEventListener("click", () => speakNumber(target));

    const form = document.getElementById("numAnswerForm");
    const input = document.getElementById("numAnswerInput");
    const feedback = document.getElementById("quizFeedback");
    const nextBtn = document.getElementById("numNextQuizBtn");

    if (quiz.answered) {
      input.disabled = true;
      form.querySelector("#numSubmitBtn").disabled = true;
      feedback.hidden = false;
      feedback.className = "quiz-feedback " + (quiz.lastCorrect ? "correct" : "incorrect");
      feedback.innerHTML = quiz.lastCorrect
        ? `<p class="feedback-headline">Correct! ✅</p><p class="feedback-detail">${target.toLocaleString("en-US")} — ${NUMBER_WORDS.toWords(state.numLangKey, target)}</p>`
        : `<p class="feedback-headline">Not quite ❌</p><p class="feedback-detail">You typed: ${quiz.lastAnswer || "(nothing)"}</p><p class="feedback-detail">Correct: ${target.toLocaleString("en-US")} — ${NUMBER_WORDS.toWords(state.numLangKey, target)}</p>`;
      nextBtn.hidden = false;
      nextBtn.addEventListener("click", advanceQuiz);
      // Focus the Next button so a bare Enter press (native button-activation
      // behavior) advances to the next question without needing a click.
      nextBtn.focus();
    } else {
      input.focus();
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (quiz.answered) return;
      const digits = input.value.replace(/[^0-9]/g, "");
      const guess = digits === "" ? NaN : parseInt(digits, 10);
      quiz.answered = true;
      quiz.lastAnswer = input.value.trim();
      quiz.lastCorrect = guess === target;
      quiz.total += 1;
      if (quiz.lastCorrect) quiz.correct += 1;
      render();
    });

    document.getElementById("numToLearnBtn").addEventListener("click", () => {
      state.numMode = "learn";
      startNumbersLearn();
    });
  }

  function advanceQuiz() {
    const quiz = state.numQuiz;
    quiz.index += 1;
    quiz.answered = false;
    quiz.lastAnswer = "";
    if (quiz.index >= quiz.items.length) {
      state.screen = "numbersSummary";
    }
    render();
  }

  /* ---------- numbers summary ---------- */

  function renderNumbersSummary() {
    const tpl = document.getElementById("tpl-numbers-summary");
    app.appendChild(tpl.content.cloneNode(true));

    const quiz = state.numQuiz;
    const total = quiz.total;
    const accuracy = total ? Math.round((quiz.correct / total) * 100) : 0;
    document.getElementById("numSummaryStats").innerHTML = `
      <div><div class="stat-num">${total}</div><div class="stat-label">Numbers heard</div></div>
      <div><div class="stat-num">${quiz.correct}</div><div class="stat-label">Correct</div></div>
      <div><div class="stat-num">${total - quiz.correct}</div><div class="stat-label">Missed</div></div>
      <div><div class="stat-num">${accuracy}%</div><div class="stat-label">Accuracy</div></div>
    `;

    document.getElementById("numPracticeAgainBtn").addEventListener("click", startNumbersQuiz);
    document.getElementById("numMenuBtn").addEventListener("click", () => {
      state.screen = "numbersHome";
      render();
    });
  }

  render();
})();
