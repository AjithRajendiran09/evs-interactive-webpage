  
    /* ═══════════════ PARTICLES ═══════════════ */
    (function() {
      const canvas = document.getElementById('particles-canvas');
      const ctx = canvas.getContext('2d');
      let particles = [];
      const PARTICLE_COUNT = 50;

      function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
      window.addEventListener('resize', resize); resize();

      class Particle {
        constructor() { this.reset(); }
        reset() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 3 + 1;
          this.speedX = (Math.random() - 0.5) * 0.5;
          this.speedY = (Math.random() - 0.5) * 0.5;
          this.opacity = Math.random() * 0.3 + 0.1;
          const colors = ['52,211,153', '56,189,248', '167,139,250', '251,191,36'];
          this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
          this.x += this.speedX; this.y += this.speedY;
          if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
          ctx.fill();
        }
      }

      for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
      }
      animate();
    })();

    /* ═══════════════ GAMIFICATION SYSTEM ═══════════════ */
    const GameState = {
      xp: 0,
      level: 1,
      badges: {},
      completedGames: new Set(),
      sectionsVisited: new Set()
    };

    const LEVELS = [
      { name: '🌱 Student', xp: 0 },
      { name: '🔍 Explorer', xp: 100 },
      { name: '🛡️ Guardian', xp: 250 },
      { name: '🏆 Champion', xp: 500 },
      { name: '🌍 Earth Hero', xp: 800 }
    ];

    function addXP(amount) {
      GameState.xp += amount;
      updateXPDisplay();
      showXPPopup(amount);
    }

    function updateXPDisplay() {
      const xpText = document.getElementById('xpText');
      const xpFill = document.getElementById('xpFill');
      const levelBadge = document.getElementById('levelBadge');

      let currentLevel = LEVELS[0];
      let nextLevel = LEVELS[1];
      for (let i = LEVELS.length - 1; i >= 0; i--) {
        if (GameState.xp >= LEVELS[i].xp) {
          currentLevel = LEVELS[i];
          nextLevel = LEVELS[i + 1] || LEVELS[i];
          GameState.level = i + 1;
          break;
        }
      }

      levelBadge.textContent = currentLevel.name;
      xpText.textContent = `${GameState.xp} XP`;

      const progress = nextLevel === currentLevel
        ? 100
        : ((GameState.xp - currentLevel.xp) / (nextLevel.xp - currentLevel.xp)) * 100;
      xpFill.style.width = Math.min(progress, 100) + '%';
    }

    function showXPPopup(amount) {
      const popup = document.createElement('div');
      popup.textContent = `+${amount} XP`;
      popup.style.cssText = `
        position: fixed; top: 50px; right: 1rem; z-index: 10000;
        background: var(--gradient-green); color: #012; font-weight: 900;
        padding: 0.5rem 1rem; border-radius: 999px; font-size: 0.9rem;
        animation: popCorrect 0.5s ease; pointer-events: none;
        font-family: 'Outfit', sans-serif;
      `;
      document.body.appendChild(popup);
      setTimeout(() => popup.remove(), 1200);
    }

    function unlockBadge(id) {
      if (GameState.badges[id]) return;
      GameState.badges[id] = true;
      const el = document.getElementById('badge-' + id);
      if (el) el.classList.add('unlocked');
      addXP(50);
      spawnConfetti();
    }

    /* ═══════════════ CONFETTI ═══════════════ */
    function spawnConfetti() {
      const colors = ['#34d399', '#38bdf8', '#fbbf24', '#a78bfa', '#f87171', '#f472b6'];
      for (let i = 0; i < 40; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.top = '-10px';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        piece.style.width = (Math.random() * 8 + 6) + 'px';
        piece.style.height = (Math.random() * 8 + 6) + 'px';
        piece.style.animationDuration = (Math.random() * 1 + 1) + 's';
        piece.style.animationDelay = (Math.random() * 0.5) + 's';
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 2500);
      }
    }

    /* ═══════════════ PROGRESS BAR ═══════════════ */
    function updateProgress() {
      const total = 10;
      const visited = GameState.sectionsVisited.size;
      const fill = document.getElementById('progressFill');
      fill.style.width = ((visited / total) * 100) + '%';
    }

    /* ═══════════════ SCROLL REVEAL ═══════════════ */
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const sectionId = entry.target.id;
          if (sectionId && !GameState.sectionsVisited.has(sectionId)) {
            GameState.sectionsVisited.add(sectionId);
            addXP(10);
            updateProgress();
          }
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    /* ═══════════════ FLIP CARDS ═══════════════ */
    document.querySelectorAll('.flip-card').forEach(card => {
      let hasFlipped = false;
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        if (!hasFlipped) { addXP(5); hasFlipped = true; }
      });
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
      });
    });

    /* ═══════════════ GAME 1: DISCIPLINE MATCHER ═══════════════ */
    (function() {
      let selectedLeft = null;
      let matchScore = 0;
      const items = document.querySelectorAll('#game-match .match-item');

      items.forEach(item => {
        item.addEventListener('click', () => {
          if (item.classList.contains('matched')) return;

          if (item.dataset.side === 'left') {
            items.forEach(i => { if (i.dataset.side === 'left') i.classList.remove('selected'); });
            item.classList.add('selected');
            selectedLeft = item;
          } else if (item.dataset.side === 'right' && selectedLeft) {
            if (selectedLeft.dataset.match === item.dataset.match) {
              selectedLeft.classList.add('matched');
              item.classList.add('matched');
              selectedLeft.classList.remove('selected');
              matchScore++;
              document.getElementById('matchScore').textContent = matchScore;
              addXP(15);
              setFeedback('matchFeedback', '✅ Correct match! Great job!', 'success');

              if (matchScore === 5) {
                unlockBadge('multi');
                setFeedback('matchFeedback', '🎉 All matched! You earned the Discipline Master badge!', 'success');
              }
            } else {
              setFeedback('matchFeedback', '❌ Not quite — try a different combination!', 'error');
              selectedLeft.classList.remove('selected');
            }
            selectedLeft = null;
          }
        });
      });
    })();

    /* ═══════════════ GAME 2: SCOPE QUIZ ═══════════════ */
    (function() {
      const questions = [
        { q: 'Which of the following is a non-renewable resource?', opts: ['Solar Energy', 'Wind Power', 'Coal', 'Tidal Energy'], ans: 2 },
        { q: 'What type of pollution is caused by excessive use of pesticides?', opts: ['Air Pollution', 'Soil Pollution', 'Noise Pollution', 'Thermal Pollution'], ans: 1 },
        { q: 'What does "ecology" primarily study?', opts: ['Chemical reactions', 'Interactions between organisms and their environment', 'Rock formations', 'Star systems'], ans: 1 },
        { q: 'Population growth is a concern of which scope area?', opts: ['Pollution', 'Social Issues', 'Natural Resources', 'Ecology'], ans: 1 },
        { q: 'Which is a renewable source of energy?', opts: ['Natural gas', 'Petroleum', 'Solar energy', 'Coal'], ans: 2 }
      ];
      let current = 0, score = 0;

      function loadQuestion() {
        if (current >= questions.length) {
          document.getElementById('quizArea').innerHTML = '<div class="tf-question" style="font-weight:700;">🎉 Quiz Complete! You scored ' + score + '/' + questions.length + '</div>';
          if (score >= 3) unlockBadge('scope');
          return;
        }
        const q = questions[current];
        document.getElementById('quizQuestion').textContent = `Q${current + 1}. ${q.q}`;
        const optsDiv = document.getElementById('quizOptions');
        optsDiv.innerHTML = '';
        q.opts.forEach((opt, i) => {
          const btn = document.createElement('button');
          btn.className = 'game-btn';
          btn.textContent = opt;
          btn.addEventListener('click', () => {
            const btns = optsDiv.querySelectorAll('.game-btn');
            btns.forEach(b => b.disabled = true);
            if (i === q.ans) {
              btn.classList.add('correct');
              score++;
              document.getElementById('quizScore').textContent = score;
              addXP(15);
              setFeedback('quizFeedback', '✅ Correct! Well done!', 'success');
            } else {
              btn.classList.add('wrong');
              btns[q.ans].classList.add('correct');
              setFeedback('quizFeedback', `❌ Wrong! The answer is: ${q.opts[q.ans]}`, 'error');
            }
            current++;
            setTimeout(loadQuestion, 1500);
          });
          optsDiv.appendChild(btn);
        });
      }
      loadQuestion();
    })();

    /* ═══════════════ GAME 3: TRUE/FALSE RAPID FIRE ═══════════════ */
    const tfQuestions = [
      { statement: 'Air pollution causes approximately 7 million deaths per year globally.', answer: true },
      { statement: 'Deforestation increases the amount of oxygen in the atmosphere.', answer: false },
      { statement: 'EVS is a mandatory subject for all UG programs in India (as per UGC).', answer: true },
      { statement: 'Freshwater makes up about 97% of Earth\'s total water.', answer: false },
      { statement: 'Biodiversity refers to the variety of life in a particular habitat.', answer: true },
      { statement: 'Burning fossil fuels reduces greenhouse gas emissions.', answer: false },
      { statement: 'The ozone layer protects us from harmful ultraviolet radiation.', answer: true },
      { statement: 'Noise pollution only affects hearing and has no other health effects.', answer: false }
    ];
    let tfCurrent = 0, tfScore = 0, tfStreak = 0;

    function loadTF() {
      if (tfCurrent >= tfQuestions.length) {
        document.getElementById('tfQuestion').textContent = `🎉 Finished! You scored ${tfScore}/${tfQuestions.length}`;
        document.getElementById('tfTrue').disabled = true;
        document.getElementById('tfFalse').disabled = true;
        if (tfScore >= 5) unlockBadge('importance');
        return;
      }
      document.getElementById('tfQuestion').textContent = tfQuestions[tfCurrent].statement;
      setFeedback('tfFeedback', 'True or False? Think carefully!', 'info');
    }

    function answerTF(answer) {
      const correct = tfQuestions[tfCurrent].answer === answer;
      if (correct) {
        tfScore++;
        tfStreak++;
        addXP(10 + tfStreak * 2);
        setFeedback('tfFeedback', `✅ Correct! +${10 + tfStreak * 2} XP (Streak: ${tfStreak}🔥)`, 'success');
      } else {
        tfStreak = 0;
        setFeedback('tfFeedback', `❌ Wrong! The correct answer is ${tfQuestions[tfCurrent].answer ? 'TRUE' : 'FALSE'}.`, 'error');
      }
      document.getElementById('tfScore').textContent = tfScore;
      document.getElementById('tfStreakDisplay').textContent = tfStreak;
      if (tfStreak >= 3) document.getElementById('tfStreakMsg').textContent = `🔥 ${tfStreak} in a row! You're on FIRE!`;
      else document.getElementById('tfStreakMsg').textContent = '';
      tfCurrent++;
      setTimeout(loadTF, 1200);
    }
    loadTF();

    /* ═══════════════ GAME 4: SUSTAINABILITY SORTER ═══════════════ */
    const sorterItems = [
      { text: '🌞 Using solar panels for electricity', sustainable: true },
      { text: '🏭 Dumping factory waste into rivers', sustainable: false },
      { text: '🚲 Cycling to school instead of driving', sustainable: true },
      { text: '🌲 Cutting forests for quick profit', sustainable: false },
      { text: '♻️ Recycling paper and plastic bottles', sustainable: true },
      { text: '💡 Leaving lights on when leaving a room', sustainable: false },
      { text: '🚌 Using public transport to reduce emissions', sustainable: true },
      { text: '🛍️ Using single-use plastic bags for shopping', sustainable: false },
      { text: '💧 Harvesting rainwater for household use', sustainable: true },
      { text: '🔥 Burning crop residue in open fields', sustainable: false }
    ];
    let sorterCurrent = 0, sorterScore = 0;

    function loadSorter() {
      if (sorterCurrent >= sorterItems.length) {
        document.getElementById('sorterItem').textContent = `🎉 Finished! You sorted ${sorterScore}/${sorterItems.length} correctly!`;
        document.querySelectorAll('.sort-btn').forEach(b => b.disabled = true);
        if (sorterScore >= 7) unlockBadge('sustain');
        return;
      }
      document.getElementById('sorterItem').textContent = sorterItems[sorterCurrent].text;
    }

    function answerSorter(isSustainable) {
      const correct = sorterItems[sorterCurrent].sustainable === isSustainable;
      if (correct) {
        sorterScore++;
        addXP(12);
        setFeedback('sorterFeedback', '✅ Correct! Well sorted!', 'success');
      } else {
        setFeedback('sorterFeedback', `❌ Nope! This is ${sorterItems[sorterCurrent].sustainable ? 'SUSTAINABLE' : 'UNSUSTAINABLE'}.`, 'error');
      }
      document.getElementById('sorterScore').textContent = sorterScore;
      sorterCurrent++;
      setTimeout(loadSorter, 1000);
    }
    loadSorter();

    /* ═══════════════ SDG CARDS DATA ═══════════════ */
    const sdgData = [
      { num: 1, name: 'No Poverty', icon: '🏠', color: '#E5243B', detail: 'End poverty in all its forms everywhere. Over 700 million people live in extreme poverty.' },
      { num: 2, name: 'Zero Hunger', icon: '🍽️', color: '#DDA63A', detail: 'End hunger, achieve food security, and promote sustainable agriculture.' },
      { num: 3, name: 'Good Health & Well-Being', icon: '❤️', color: '#4C9F38', detail: 'Ensure healthy lives and promote well-being for all at all ages.' },
      { num: 4, name: 'Quality Education', icon: '📚', color: '#C5192D', detail: 'Ensure inclusive and equitable quality education for all.' },
      { num: 5, name: 'Gender Equality', icon: '⚧', color: '#FF3A21', detail: 'Achieve gender equality and empower all women and girls.' },
      { num: 6, name: 'Clean Water & Sanitation', icon: '💧', color: '#26BDE2', detail: 'Ensure availability and sustainable management of water and sanitation.' },
      { num: 7, name: 'Affordable & Clean Energy', icon: '⚡', color: '#FCC30B', detail: 'Ensure access to affordable, reliable, sustainable, and modern energy.' },
      { num: 8, name: 'Decent Work & Economic Growth', icon: '💼', color: '#A21942', detail: 'Promote sustained, inclusive economic growth and decent work for all.' },
      { num: 9, name: 'Industry, Innovation & Infrastructure', icon: '🏗️', color: '#FD6925', detail: 'Build resilient infrastructure and foster innovation.' },
      { num: 10, name: 'Reduced Inequalities', icon: '⚖️', color: '#DD1367', detail: 'Reduce inequality within and among countries.' },
      { num: 11, name: 'Sustainable Cities', icon: '🏙️', color: '#FD9D24', detail: 'Make cities and human settlements inclusive, safe, and sustainable.' },
      { num: 12, name: 'Responsible Consumption', icon: '♻️', color: '#BF8B2E', detail: 'Ensure sustainable consumption and production patterns.' },
      { num: 13, name: 'Climate Action', icon: '🌡️', color: '#3F7E44', detail: 'Take urgent action to combat climate change and its impacts.' },
      { num: 14, name: 'Life Below Water', icon: '🐟', color: '#0A97D9', detail: 'Conserve and sustainably use the oceans, seas, and marine resources.' },
      { num: 15, name: 'Life on Land', icon: '🌳', color: '#56C02B', detail: 'Protect, restore, and promote sustainable use of terrestrial ecosystems.' },
      { num: 16, name: 'Peace, Justice & Strong Institutions', icon: '🕊️', color: '#00689D', detail: 'Promote peaceful and inclusive societies with justice for all.' },
      { num: 17, name: 'Partnerships for the Goals', icon: '🤝', color: '#19486A', detail: 'Strengthen the means of implementation through global partnerships.' }
    ];

    // Render SDG cards
    const sdgGrid = document.getElementById('sdgGrid');
    sdgData.forEach(sdg => {
      const card = document.createElement('div');
      card.className = 'sdg-card';
      card.style.background = sdg.color;
      card.style.color = '#fff';
      card.innerHTML = `
        <div class="sdg-num">${sdg.num}</div>
        <div class="sdg-icon">${sdg.icon}</div>
        <div class="sdg-name">${sdg.name}</div>
        <div class="sdg-detail"><strong>Goal ${sdg.num}</strong><br/>${sdg.detail}</div>
      `;
      card.addEventListener('click', () => card.classList.toggle('expanded'));
      sdgGrid.appendChild(card);
    });

    /* ═══════════════ GAME 5: SDG MEMORY MATCH ═══════════════ */
    (function() {
      const pairs = [
        { id: 'sdg1', a: 'Goal 1', b: 'No Poverty' },
        { id: 'sdg4', a: 'Goal 4', b: 'Quality Education' },
        { id: 'sdg6', a: 'Goal 6', b: 'Clean Water' },
        { id: 'sdg7', a: 'Goal 7', b: 'Clean Energy' },
        { id: 'sdg13', a: 'Goal 13', b: 'Climate Action' },
        { id: 'sdg15', a: 'Goal 15', b: 'Life on Land' }
      ];

      let cards = [];
      pairs.forEach(p => {
        cards.push({ id: p.id, text: p.a, matchId: p.id });
        cards.push({ id: p.id, text: p.b, matchId: p.id });
      });

      // Shuffle
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }

      const grid = document.getElementById('memoryGrid');
      let flipped = [], matched = 0, moves = 0, locked = false;

      cards.forEach((card, index) => {
        const el = document.createElement('div');
        el.className = 'memory-card';
        el.dataset.matchId = card.matchId;
        el.dataset.index = index;
        el.innerHTML = `
          <div class="memory-card-inner">
            <div class="memory-card-face memory-card-front">❓</div>
            <div class="memory-card-face memory-card-back">${card.text}</div>
          </div>
        `;
        el.addEventListener('click', () => flipMemoryCard(el));
        grid.appendChild(el);
      });

      function flipMemoryCard(el) {
        if (locked || el.classList.contains('revealed') || el.classList.contains('matched')) return;
        el.classList.add('revealed');
        flipped.push(el);

        if (flipped.length === 2) {
          moves++;
          document.getElementById('memoryMoves').textContent = moves;
          locked = true;

          if (flipped[0].dataset.matchId === flipped[1].dataset.matchId &&
              flipped[0].dataset.index !== flipped[1].dataset.index) {
            flipped.forEach(f => f.classList.add('matched'));
            matched++;
            document.getElementById('memoryScore').textContent = matched;
            addXP(20);
            setFeedback('memoryFeedback', `✅ Match found! ${matched}/6`, 'success');

            if (matched === 6) {
              unlockBadge('sdg');
              setFeedback('memoryFeedback', `🎉 All matched in ${moves} moves! You earned the SDG Hero badge!`, 'success');
              spawnConfetti();
            }
            flipped = [];
            locked = false;
          } else {
            setTimeout(() => {
              flipped.forEach(f => f.classList.remove('revealed'));
              flipped = [];
              locked = false;
              setFeedback('memoryFeedback', '❌ Not a match. Try again!', 'error');
            }, 800);
          }
        }
      }
    })();

    /* ═══════════════ UTILITY ═══════════════ */
    function setFeedback(id, message, type) {
      const el = document.getElementById(id);
      el.textContent = message;
      el.className = 'game-feedback ' + type;
    }

    /* ═══════════════ GAME: JUMBLE WORD CHALLENGE ═══════════════ */
    (function() {
      const words = [
        { word: 'ECOLOGY', hint: '🌿 The study of how living things interact with each other and their surroundings — like your garden!' },
        { word: 'RECYCLE', hint: '♻️ What you do with old newspapers, plastic bottles, and cans instead of throwing them away' },
        { word: 'CLIMATE', hint: '🌡️ The long-term weather pattern of a place — Mumbai is hot & humid, Shimla is cool' },
        { word: 'HABITAT', hint: '🏡 The natural home of an animal — like a pond for frogs or a tree for birds' },
        { word: 'POLLUTE', hint: '🏭 What happens when factories dump waste into rivers or smoke fills the air' }
      ];
      let current = 0, score = 0, placed = [], letterEls = [];

      function shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
        return a;
      }

      function loadJumble() {
        if (current >= words.length) {
          document.getElementById('jumble1Area').innerHTML = '<div class="tf-question" style="font-weight:700;">🎉 All words solved! You scored ' + score + '/' + words.length + '</div>';
          return;
        }
        placed = []; letterEls = [];
        const w = words[current];
        document.getElementById('jumble1Hint').textContent = w.hint;
        const scrambled = shuffle(w.word.split(''));
        const lettersDiv = document.getElementById('jumble1Letters');
        const answerDiv = document.getElementById('jumble1Answer');
        lettersDiv.innerHTML = ''; answerDiv.innerHTML = '';

        scrambled.forEach((ch, i) => {
          const el = document.createElement('div');
          el.className = 'jumble-letter';
          el.textContent = ch;
          el.dataset.index = i;
          el.addEventListener('click', () => {
            if (el.classList.contains('used')) return;
            el.classList.add('used', 'pop');
            placed.push({ char: ch, srcIndex: i });
            renderAnswer();
            checkJumbleComplete();
          });
          lettersDiv.appendChild(el);
          letterEls.push(el);
        });
      }

      function renderAnswer() {
        const answerDiv = document.getElementById('jumble1Answer');
        answerDiv.innerHTML = '';
        placed.forEach((p, i) => {
          const el = document.createElement('div');
          el.className = 'jumble-placed';
          el.textContent = p.char;
          el.addEventListener('click', () => {
            letterEls[p.srcIndex].classList.remove('used');
            placed.splice(i, 1);
            renderAnswer();
          });
          answerDiv.appendChild(el);
        });
      }

      function checkJumbleComplete() {
        const w = words[current];
        if (placed.length === w.word.length) {
          const attempt = placed.map(p => p.char).join('');
          if (attempt === w.word) {
            score++;
            document.getElementById('jumble1Score').textContent = score;
            addXP(20);
            setFeedback('jumble1Feedback', `✅ Correct! "${w.word}" — Great job! +20 XP`, 'success');
            current++;
            setTimeout(loadJumble, 1500);
          } else {
            setFeedback('jumble1Feedback', '❌ Not quite! Try rearranging the letters.', 'error');
          }
        }
      }

      window.jumble1Undo = function() {
        if (placed.length === 0) return;
        const last = placed.pop();
        letterEls[last.srcIndex].classList.remove('used');
        renderAnswer();
      };
      window.jumble1Reset = function() {
        placed.forEach(p => letterEls[p.srcIndex].classList.remove('used'));
        placed = [];
        renderAnswer();
        setFeedback('jumble1Feedback', '🔄 Reset! Try again.', 'info');
      };
      window.jumble1Skip = function() {
        setFeedback('jumble1Feedback', `⏭ The answer was: ${words[current].word}`, 'error');
        current++;
        setTimeout(loadJumble, 1500);
      };
      loadJumble();
    })();

    /* ═══════════════ GAME: CAUSE & EFFECT CHAIN ═══════════════ */
    (function() {
      const scenarios = [
        { emoji: '🚗', cause: 'You drive a car to school every day instead of walking',
          options: ['More CO₂ emissions → air pollution increases', 'More oxygen is produced', 'Traffic reduces noise pollution', 'Cars help plants grow faster'],
          correct: 0, explain: 'Cars burn petrol/diesel which releases CO₂ — a greenhouse gas that warms our planet!' },
        { emoji: '🛍️', cause: 'You use a plastic carry bag every time you shop at the grocery store',
          options: ['Plastic bags help soil fertility', 'Plastic clogs drains → floods during rain', 'Bags decompose quickly in nature', 'Plastic bags purify water'],
          correct: 1, explain: 'Plastic bags take 500+ years to decompose and clog drainage systems causing urban floods!' },
        { emoji: '🚿', cause: 'You keep the tap running while brushing your teeth for 3 minutes',
          options: ['Running water cleans the air', 'About 12 liters of clean water is wasted', 'It helps the water table recharge', 'Running taps generate electricity'],
          correct: 1, explain: 'An open tap wastes ~4 liters per minute. That\'s 12 liters wasted just while brushing!' },
        { emoji: '💡', cause: 'You leave all lights and fans ON when leaving your room',
          options: ['Electricity is unlimited anyway', 'Wasted electricity → more coal burning → more CO₂', 'Lights left on produce oxygen', 'Fans running helps cool the planet'],
          correct: 1, explain: 'Most electricity in India comes from coal. Wasting it means burning more fossil fuels!' },
        { emoji: '🌳', cause: 'Your neighbourhood plants 100 new trees in the park',
          options: ['Trees block sunlight completely', 'More trees → more CO₂ absorbed → cleaner air', 'Trees increase noise pollution', 'More trees cause soil erosion'],
          correct: 1, explain: 'Trees are natural air purifiers! They absorb CO₂ and release oxygen.' },
        { emoji: '📱', cause: 'You throw your old mobile phone in the regular dustbin',
          options: ['Phone batteries decompose naturally', 'Toxic chemicals leak into soil & groundwater', 'Old phones improve soil quality', 'Phones in dustbins generate clean energy'],
          correct: 1, explain: 'E-waste contains lead, mercury, and cadmium which poison soil and water!' },
        { emoji: '🍔', cause: 'You waste food every day by taking more than you can eat at the canteen',
          options: ['Food waste produces methane in landfills → global warming', 'Wasted food helps composting automatically', 'More food waste = less hunger globally', 'Leftover food purifies the air'],
          correct: 0, explain: 'Food waste in landfills decomposes and releases methane — 25x more potent than CO₂!' },
        { emoji: '🚲', cause: 'You cycle to college instead of taking an auto-rickshaw',
          options: ['Cycling causes more air pollution', 'Zero emissions → cleaner air + better health', 'Cycling damages roads more than vehicles', 'Auto-rickshaws produce oxygen'],
          correct: 1, explain: 'Cycling produces zero carbon emissions and keeps you fit — a win-win!' }
      ];
      let current = 0, score = 0;

      function loadCE() {
        if (current >= scenarios.length) {
          document.getElementById('ceScenario').innerHTML = '<div class="ce-emoji">🎉</div>Finished! Score: ' + score + '/' + scenarios.length;
          document.getElementById('ceOptions').innerHTML = '';
          return;
        }
        const s = scenarios[current];
        document.getElementById('ceEmoji').textContent = s.emoji;
        document.getElementById('ceCause').textContent = s.cause;
        const optsDiv = document.getElementById('ceOptions');
        optsDiv.innerHTML = '';
        s.options.forEach((opt, i) => {
          const btn = document.createElement('div');
          btn.className = 'ce-option';
          btn.textContent = opt;
          btn.addEventListener('click', () => {
            optsDiv.querySelectorAll('.ce-option').forEach(b => b.style.pointerEvents = 'none');
            if (i === s.correct) {
              btn.classList.add('correct');
              score++;
              document.getElementById('ceScore').textContent = score;
              addXP(15);
              setFeedback('ceFeedback', '✅ ' + s.explain, 'success');
            } else {
              btn.classList.add('wrong');
              optsDiv.children[s.correct].classList.add('correct');
              setFeedback('ceFeedback', '❌ ' + s.explain, 'error');
            }
            current++;
            setTimeout(loadCE, 2500);
          });
          optsDiv.appendChild(btn);
        });
      }
      loadCE();
    })();

    /* ═══════════════ GAME: DAILY LIFE SCENARIO ═══════════════ */
    (function() {
      const scenarios = [
        { emoji: '🛒', situation: 'You\'re going grocery shopping', context: 'You need to carry your groceries home',
          options: [
            { emoji: '🛍️', text: 'Take a plastic bag from the shop', correct: false },
            { emoji: '👜', text: 'Carry your own cloth/jute bag', correct: true },
            { emoji: '📦', text: 'Ask for double plastic bags', correct: false },
            { emoji: '🏃', text: 'Carry items in your hands only', correct: false }
          ], explain: '👜 Cloth bags are reusable 100s of times! Plastic bags pollute land & water for centuries.' },
        { emoji: '🥤', situation: 'You\'re thirsty at a roadside shop', context: 'It\'s a hot day and you want a cold drink',
          options: [
            { emoji: '🥤', text: 'Buy a plastic bottle and throw it on the road', correct: false },
            { emoji: '🍶', text: 'Carry your own steel water bottle', correct: true },
            { emoji: '🧃', text: 'Buy a tetra pack and toss it anywhere', correct: false },
            { emoji: '💧', text: 'Buy bottled water every time', correct: false }
          ], explain: '🍶 A reusable steel bottle saves 167 plastic bottles per year! Always carry your own.' },
        { emoji: '👕', situation: 'Your old T-shirts don\'t fit anymore', context: 'You have 5 old T-shirts in your cupboard',
          options: [
            { emoji: '🗑️', text: 'Throw them in the garbage', correct: false },
            { emoji: '🎁', text: 'Donate them or make cleaning cloths', correct: true },
            { emoji: '🔥', text: 'Burn them in the backyard', correct: false },
            { emoji: '🛒', text: 'Buy new ones and ignore old', correct: false }
          ], explain: '🎁 Donating or upcycling clothes reduces textile waste — fashion industry produces 10% of global CO₂!' },
        { emoji: '📝', situation: 'You\'re done with your exam rough sheets', context: 'You have one-side-used papers',
          options: [
            { emoji: '🗑️', text: 'Crumple and throw them away', correct: false },
            { emoji: '📋', text: 'Use the blank side for notes/lists', correct: true },
            { emoji: '✈️', text: 'Make paper planes and discard', correct: false },
            { emoji: '🔥', text: 'Burn them for fun', correct: false }
          ], explain: '📋 Using both sides of paper saves trees! 1 ton of recycled paper saves 17 trees.' },
        { emoji: '🍱', situation: 'You cooked extra food at home', context: 'There\'s leftover dal and rice from dinner',
          options: [
            { emoji: '🗑️', text: 'Dump it in the dustbin', correct: false },
            { emoji: '🐕', text: 'Share with stray animals or neighbors', correct: true },
            { emoji: '🚽', text: 'Flush it down the drain', correct: false },
            { emoji: '😑', text: 'Leave it and order new food', correct: false }
          ], explain: '🐕 Sharing leftover food reduces waste and feeds hungry animals! India wastes 68 million tons of food/year.' },
        { emoji: '🔌', situation: 'Your phone is fully charged', context: 'The charger is still plugged in to the wall socket',
          options: [
            { emoji: '🔌', text: 'Leave it plugged — doesn\'t matter', correct: false },
            { emoji: '🔋', text: 'Unplug the charger to save standby power', correct: true },
            { emoji: '📱', text: 'Keep charging for "extra" battery', correct: false },
            { emoji: '⚡', text: 'Plug in more devices to the same socket', correct: false }
          ], explain: '🔋 Chargers left plugged in consume "phantom energy" 24/7. Unplugging saves ~5-10% electricity!' }
      ];
      let current = 0, score = 0;

      function loadScenario() {
        if (current >= scenarios.length) {
          document.getElementById('scenarioCard').innerHTML = '<div class="sc-emoji">🎉</div><div class="sc-situation">Great job! Score: ' + score + '/' + scenarios.length + '</div><div class="sc-context">You\'re an eco-warrior!</div>';
          document.getElementById('scenarioOptions').innerHTML = '';
          return;
        }
        const s = scenarios[current];
        document.getElementById('scEmoji').textContent = s.emoji;
        document.getElementById('scSituation').textContent = s.situation;
        document.getElementById('scContext').textContent = s.context;
        const optsDiv = document.getElementById('scenarioOptions');
        optsDiv.innerHTML = '';
        s.options.forEach((opt, i) => {
          const btn = document.createElement('div');
          btn.className = 'scenario-opt';
          btn.innerHTML = `<span class="opt-emoji">${opt.emoji}</span><span>${opt.text}</span>`;
          btn.addEventListener('click', () => {
            optsDiv.querySelectorAll('.scenario-opt').forEach(b => b.classList.add('disabled'));
            if (opt.correct) {
              btn.classList.add('correct');
              score++;
              document.getElementById('scenarioScore').textContent = score;
              addXP(15);
              setFeedback('scenarioFeedback', '✅ ' + s.explain, 'success');
            } else {
              btn.classList.add('wrong');
              const correctBtn = [...optsDiv.children].find((_, j) => s.options[j].correct);
              if (correctBtn) correctBtn.classList.add('correct');
              setFeedback('scenarioFeedback', '❌ ' + s.explain, 'error');
            }
            current++;
            setTimeout(loadScenario, 2500);
          });
          optsDiv.appendChild(btn);
        });
      }
      loadScenario();
    })();

    /* ═══════════════ GAME: REBUS PUZZLE ═══════════════ */
    (function() {
      const puzzles = [
        {
          fragments: [{ emoji: '😮' }, { emoji: '☕' }, { emoji: '👧' }],
          answer: 'WATER', options: ['WEATHER', 'WATER', 'WINTER', 'WASTE'],
          breakdown: '😮 (Wow) + ☕ (Tea) + 👧 (Her) = WATER',
          hint: '💧 You drink it daily, wash with it, and it falls as rain!',
          explain: 'Water covers 71% of Earth\'s surface but only 2.5% is freshwater. Conserving water is crucial — turn off taps while brushing!'
        },
        {
          fragments: [{ emoji: '🧵' }, { emoji: '🤥' }],
          answer: 'SOLAR', options: ['POLAR', 'SONAR', 'SOLAR', 'CELLAR'],
          breakdown: '🧵 (Sew) + 🤥 (Liar) = SOLAR',
          hint: '☀️ The energy source that powers calculators and rooftop panels!',
          explain: 'Solar energy is the most abundant renewable energy source. Your rooftop solar panel can save ₹30,000/year on electricity!'
        },
        {
          fragments: [{ emoji: '💩' }, { emoji: '🚽' }, { emoji: '🌞' }],
          answer: 'POLLUTION', options: ['SOLUTION', 'POLLUTION', 'POPULATION', 'POTION'],
          breakdown: '💩 (Poo) + 🚽 (Loo) + 🌞 (Sun) = POLLUTION',
          hint: '🏭 The dirty stuff that comes from factory chimneys and car exhausts!',
          explain: 'Pollution kills 9 million people per year worldwide. Even your daily bus ride contributes — try walking or cycling for short distances!'
        },
        {
          fragments: [{ emoji: '🗣️' }, { emoji: '🪵' }, { emoji: '🔑' }],
          answer: 'ECOLOGY', options: ['BIOLOGY', 'ECONOMY', 'ECOLOGY', 'ENERGY'],
          breakdown: '🗣️ (Echo) + 🪵 (Log) + 🔑 (Key) = ECOLOGY',
          hint: '🌿 The science of how plants, animals, and nature all work together!',
          explain: 'Ecology is the study of relationships between living organisms and their environment. Your school garden is a mini ecosystem!'
        },
        {
          fragments: [{ emoji: '🧗' }, { emoji: '8️⃣' }],
          answer: 'CLIMATE', options: ['CLIMATE', 'PRIMATE', 'CEMENT', 'COMET'],
          breakdown: '🧗 (Climb) + 8️⃣ (Eight) = CLIMATE',
          hint: '🌡️ Not today\'s weather, but the long-term pattern — why Shimla is always cool!',
          explain: 'Climate is the average weather over 30+ years. Climate change is making summers hotter and monsoons unpredictable — you can feel it!'
        },
        {
          fragments: [{ emoji: '🔁' }, { emoji: '🚲' }],
          answer: 'RECYCLE', options: ['REUSE', 'BICYCLE', 'RECYCLE', 'CIRCLE'],
          breakdown: '🔁 (Re) + 🚲 (Cycle) = RECYCLE',
          hint: '♻️ Turn your old plastic bottles and newspapers into something new!',
          explain: 'Recycling 1 aluminum can saves enough energy to run a TV for 3 hours. Your school paper drive helps save forests!'
        },
        {
          fragments: [{ emoji: '⭕' }, { emoji: '🧘' }],
          answer: 'OZONE', options: ['OXYGEN', 'OZONE', 'OCEAN', 'ONION'],
          breakdown: '⭕ (O) + 🧘 (Zone) = OZONE',
          hint: '🛡️ An invisible shield in the sky that protects you from sunburn!',
          explain: 'The ozone layer absorbs 97-99% of harmful UV radiation. AC & fridge gases (CFCs) damage it — that\'s why old fridges are harmful!'
        },
        {
          fragments: [{ emoji: '4️⃣' }, { emoji: '🛌' }],
          answer: 'FOREST', options: ['FORTRESS', 'RESTORE', 'FLORIST', 'FOREST'],
          breakdown: '4️⃣ (Four) + 🛌 (Rest) = FOREST',
          hint: '🌳 A place full of trees where you go for a nature walk or picnic!',
          explain: 'Forests cover 31% of Earth\'s land. India\'s goal is 33% forest cover. One tree produces oxygen for 2 people daily!'
        },
        {
          fragments: [{ emoji: '🌎' }, { emoji: '🐂' }],
          answer: 'GLOBAL', options: ['GLOBE', 'GLOBAL', 'LOCAL', 'NOBLE'],
          breakdown: '🌎 (Globe) + 🐂 (Bull) = GLOBAL',
          hint: '🌍 Something that affects the entire planet, not just your city!',
          explain: 'Global warming has raised Earth\'s temperature by 1.1°C since 1900. Even your AC and car contribute to it!'
        },
        {
          fragments: [{ emoji: '🚗' }, { emoji: '🍞' }],
          answer: 'CARBON', options: ['CARTON', 'CARBON', 'CARGO', 'CARROT'],
          breakdown: '🚗 (Car) + 🍞 (Bun) = CARBON',
          hint: '👣 The footprint you leave behind when you use a lot of petrol and electricity.',
          explain: 'Everything has a carbon footprint. Eating local food and turning off lights helps reduce yours!'
        },
        {
          fragments: [{ emoji: '✈️' }, { emoji: '👽' }],
          answer: 'PLANET', options: ['PLANT', 'PLANET', 'PILOT', 'PLANE'],
          breakdown: '✈️ (Plane) + 👽 (ET/Alien) = PLANET',
          hint: '🌍 Earth is the only one we know that has life!',
          explain: 'There is no Planet B! We have to take care of the Earth because we can\'t just move to another one yet.'
        },
        {
          fragments: [{ emoji: '👂' }, { emoji: '🌡️' }],
          answer: 'EARTH', options: ['HEART', 'HEARTH', 'EARTH', 'HEALTH'],
          breakdown: '👂 (Ear) + 🌡️ (Th/Thermometer) = EARTH',
          hint: '🌍 The 3rd rock from the sun, and our home!',
          explain: 'Earth is 4.5 billion years old. Humans have been here for a tiny fraction of that time, but we\'ve made a massive impact.'
        }
      ];

      let current = 0, score = 0, hintShown = false;

      function loadRebus() {
        if (current >= puzzles.length) {
          document.getElementById('rebusPuzzleCard').innerHTML = '<div style="font-size:3rem;">🎉</div><div style="font-size:1.2rem; font-weight:800; margin-top:0.5rem;">Amazing! You solved all 12 Rebus Puzzles!</div><div style="color:var(--accent-green); font-weight:700; margin-top:0.3rem;">Score: ' + score + '/12</div>';
          document.querySelector('.rebus-input-row').style.display = 'none';
          document.querySelector('.rebus-controls').style.display = 'none';
          return;
        }
        hintShown = false;
        const p = puzzles[current];
        const fragDiv = document.getElementById('rebusFragments');
        fragDiv.innerHTML = '';

        p.fragments.forEach((f, i) => {
          if (i > 0) {
            const plus = document.createElement('span');
            plus.className = 'rebus-plus';
            plus.textContent = '+';
            fragDiv.appendChild(plus);
          }
          const card = document.createElement('div');
          card.className = 'rebus-fragment';
          card.innerHTML = `<div class="rf-emoji">${f.emoji}</div>`;
          fragDiv.appendChild(card);
        });

        const eq = document.createElement('span');
        eq.className = 'rebus-equals';
        eq.textContent = '=';
        fragDiv.appendChild(eq);

        const qmark = document.createElement('div');
        qmark.className = 'rebus-question';
        qmark.textContent = '?';
        fragDiv.appendChild(qmark);

        document.getElementById('rebusSolveBtn').style.display = 'inline-block';
        document.getElementById('rebusNextBtn').style.display = 'none';
        document.getElementById('rebusHint').textContent = '';
        document.getElementById('rebusReveal').classList.remove('show');
        document.getElementById('rebusCounter').textContent = `Puzzle ${current + 1} of ${puzzles.length}`;
        setFeedback('rebusFeedback', 'Guess the word, then click Show Answer!', 'info');
      }

      window.rebusShowAnswer = function() {
        if (current >= puzzles.length) return;
        const p = puzzles[current];
        score++;
        document.getElementById('rebusScore').textContent = score;
        addXP(25);
        showReveal(p, true);
        setFeedback('rebusFeedback', `✅ The answer is ${p.answer}! +25 XP`, 'success');
        
        document.getElementById('rebusSolveBtn').style.display = 'none';
        document.getElementById('rebusNextBtn').style.display = 'inline-block';
      };

      window.rebusNext = function() {
        if (current >= puzzles.length) return;
        current++;
        loadRebus();
      };

      window.rebusShowHint = function() {
        if (current >= puzzles.length) return;
        hintShown = true;
        document.getElementById('rebusHint').textContent = puzzles[current].hint;
        setFeedback('rebusFeedback', '💡 Hint revealed! Keep trying.', 'info');
      };

      function showReveal(p, isCorrect) {
        const reveal = document.getElementById('rebusReveal');
        document.getElementById('rebusRevealWord').textContent = (isCorrect ? '✅ ' : '❌ ') + p.answer;
        document.getElementById('rebusRevealBreakdown').textContent = p.breakdown;
        document.getElementById('rebusRevealExplain').textContent = p.explain;
        reveal.classList.add('show');
      }

      // No input to listen to, options used instead
      loadRebus();
    })();

    /* ═══════════════ GAME: CROSSWORD PUZZLE ═══════════════ */
    (function() {
      // Grid layout: 8 cols x 10 rows
      const grid = [
        ['','T','','','','','',''],
        ['','R','E','C','Y','C','L','E'],
        ['','E','','A','','','I',''],
        ['','E','','R','','','G',''],
        ['','S','','B','','','H',''],
        ['S','','','O','','','T',''],
        ['O','Z','O','N','E','','',''],
        ['L','','','','','','',''],
        ['A','','','','','','',''],
        ['R','','','','','','','']
      ];
      const numbers = { '0,1': '1', '1,1': '2', '1,3': '3', '1,6': '4', '5,0': '5', '6,0': '6' };
      const cwGridEl = document.getElementById('cwGrid');
      cwGridEl.style.gridTemplateColumns = 'repeat(8, 40px)';

      const inputs = [];
      grid.forEach((row, r) => {
        row.forEach((cell, c) => {
          const div = document.createElement('div');
          div.className = 'cw-cell';
          if (cell === '') {
            div.classList.add('black');
          } else {
            const numKey = `${r},${c}`;
            if (numbers[numKey]) {
              const numSpan = document.createElement('span');
              numSpan.className = 'cw-num';
              numSpan.textContent = numbers[numKey];
              div.appendChild(numSpan);
            }
            const inp = document.createElement('input');
            inp.type = 'text';
            inp.maxLength = 1;
            inp.dataset.answer = cell;
            inp.dataset.row = r;
            inp.dataset.col = c;
            inp.addEventListener('input', (e) => {
              inp.value = inp.value.toUpperCase();
              if (inp.value.length === 1) {
                const next = findNextInput(r, c);
                if (next) next.focus();
              }
            });
            div.appendChild(inp);
            inputs.push(inp);
          }
          cwGridEl.appendChild(div);
        });
      });

      function findNextInput(r, c) {
        for (let nc = c + 1; nc < 8; nc++) {
          const inp = inputs.find(i => parseInt(i.dataset.row) === r && parseInt(i.dataset.col) === nc);
          if (inp) return inp;
        }
        for (let nr = r + 1; nr < 10; nr++) {
          for (let nc = 0; nc < 8; nc++) {
            const inp = inputs.find(i => parseInt(i.dataset.row) === nr && parseInt(i.dataset.col) === nc);
            if (inp) return inp;
          }
        }
        return null;
      }

      window.checkCrossword = function() {
        let correct = 0;
        inputs.forEach(inp => {
          if (inp.value.toUpperCase() === inp.dataset.answer) {
            inp.classList.add('correct');
            correct++;
          } else {
            inp.classList.remove('correct');
          }
        });
        if (correct === inputs.length) {
          addXP(40);
          setFeedback('cwFeedback', '🎉 All correct! You completed the crossword! +40 XP', 'success');
          spawnConfetti();
        } else {
          setFeedback('cwFeedback', `${correct}/${inputs.length} letters correct. Keep trying!`, correct > inputs.length / 2 ? 'success' : 'error');
        }
      };
    })();

    /* ═══════════════ GAME: WORD SEARCH ═══════════════ */
    (function() {
      const WORDS = ['WATER', 'PEACE', 'ENERGY', 'HUNGER', 'HEALTH', 'CLIMATE'];
      const ROWS = 8, COLS = 10;
      const gridData = Array.from({ length: ROWS }, () => Array(COLS).fill(''));

      // Place words
      function placeWord(word) {
        const dir = Math.random() > 0.5 ? 'H' : 'V'; // horizontal or vertical
        let placed = false, attempts = 0;
        while (!placed && attempts < 100) {
          attempts++;
          let r, c;
          if (dir === 'H') {
            r = Math.floor(Math.random() * ROWS);
            c = Math.floor(Math.random() * (COLS - word.length + 1));
            let ok = true;
            for (let i = 0; i < word.length; i++) {
              if (gridData[r][c + i] !== '' && gridData[r][c + i] !== word[i]) { ok = false; break; }
            }
            if (ok) {
              for (let i = 0; i < word.length; i++) gridData[r][c + i] = word[i];
              placed = true;
            }
          } else {
            r = Math.floor(Math.random() * (ROWS - word.length + 1));
            c = Math.floor(Math.random() * COLS);
            let ok = true;
            for (let i = 0; i < word.length; i++) {
              if (gridData[r + i][c] !== '' && gridData[r + i][c] !== word[i]) { ok = false; break; }
            }
            if (ok) {
              for (let i = 0; i < word.length; i++) gridData[r + i][c] = word[i];
              placed = true;
            }
          }
        }
      }

      WORDS.forEach(w => placeWord(w));
      // Fill empty cells with random letters
      const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      gridData.forEach((row, r) => row.forEach((cell, c) => {
        if (cell === '') gridData[r][c] = alpha[Math.floor(Math.random() * 26)];
      }));

      const wsGrid = document.getElementById('wsGrid');
      wsGrid.style.gridTemplateColumns = `repeat(${COLS}, 38px)`;
      const cellEls = [];
      gridData.forEach((row, r) => {
        row.forEach((ch, c) => {
          const cell = document.createElement('div');
          cell.className = 'ws-cell';
          cell.textContent = ch;
          cell.dataset.row = r;
          cell.dataset.col = c;
          cell.addEventListener('click', () => toggleWSCell(cell));
          wsGrid.appendChild(cell);
          cellEls.push(cell);
        });
      });

      // Render word list
      const wlDiv = document.getElementById('wsWordList');
      WORDS.forEach(w => {
        const el = document.createElement('div');
        el.className = 'ws-word';
        el.textContent = w;
        el.id = 'ws-word-' + w;
        wlDiv.appendChild(el);
      });

      let selectedCells = [], foundWords = new Set(), wsScore = 0;

      function toggleWSCell(cell) {
        if (cell.classList.contains('found')) return;
        if (cell.classList.contains('selected')) {
          cell.classList.remove('selected');
          selectedCells = selectedCells.filter(c => c !== cell);
        } else {
          cell.classList.add('selected');
          selectedCells.push(cell);
        }
        checkWSWord();
      }

      function checkWSWord() {
        const selected = selectedCells.map(c => c.textContent).join('');
        if (WORDS.includes(selected) && !foundWords.has(selected)) {
          foundWords.add(selected);
          wsScore++;
          document.getElementById('wsScore').textContent = wsScore;
          selectedCells.forEach(c => { c.classList.add('found'); c.classList.remove('selected'); });
          selectedCells = [];
          document.getElementById('ws-word-' + selected).classList.add('found');
          addXP(20);
          setFeedback('wsFeedback', `✅ Found "${selected}"! ${wsScore}/6`, 'success');
          if (wsScore === 6) {
            setFeedback('wsFeedback', '🎉 All words found! Amazing!', 'success');
            spawnConfetti();
          }
        }
      }

      window.wsResetSelection = function() {
        selectedCells.forEach(c => c.classList.remove('selected'));
        selectedCells = [];
        setFeedback('wsFeedback', '↩ Selection cleared. Try again!', 'info');
      };
    })();

    /* ═══════════════ GAME: BUILD THE FOOD CHAIN ═══════════════ */
    (function() {
      const chains = [
        { name: 'Grassland', organisms: ['🌾 Grass', '🦗 Grasshopper', '🐸 Frog', '🐍 Snake', '🦅 Hawk'] },
        { name: 'Aquatic', organisms: ['🌿 Algae', '🐟 Small Fish', '🐠 Big Fish', '🦈 Shark'] },
        { name: 'Forest', organisms: ['🌳 Trees', '🐛 Caterpillar', '🐦 Bird', '🦊 Fox', '🦁 Lion'] },
        { name: 'Arctic', organisms: ['🧊 Phytoplankton', '🦐 Krill', '🐧 Penguin', '🦭 Seal', '🐻‍❄️ Polar Bear'] }
      ];
      let current = 0, score = 0, placed = [];

      function loadFC() {
        if (current >= chains.length) {
          document.getElementById('fcArea').innerHTML = '<div class="tf-question" style="font-weight:700;">🎉 All food chains built! Score: ' + score + '/' + chains.length + '</div>';
          if (score >= 3) unlockBadge('foodchain');
          return;
        }
        placed = [];
        const c = chains[current];
        document.getElementById('fcPrompt').textContent = `Build the ${c.name} food chain — click in order:`;
        document.getElementById('fcChain').innerHTML = '';
        const optsDiv = document.getElementById('fcOptions');
        optsDiv.innerHTML = '';
        const shuffled = [...c.organisms].sort(() => Math.random() - 0.5);
        shuffled.forEach((org, i) => {
          const btn = document.createElement('button');
          btn.className = 'game-btn';
          btn.textContent = org;
          btn.dataset.index = i;
          btn.addEventListener('click', () => {
            if (btn.disabled) return;
            btn.disabled = true;
            btn.style.opacity = '0.3';
            placed.push(org);
            renderFCChain();
            if (placed.length === c.organisms.length) checkFC();
          });
          optsDiv.appendChild(btn);
        });
      }

      function renderFCChain() {
        const chainDiv = document.getElementById('fcChain');
        chainDiv.innerHTML = placed.map(p => `<div class="jumble-placed">${p}</div>`).join('<span style="color:var(--accent-green);font-weight:900;margin:0 0.2rem;">→</span>');
      }

      function checkFC() {
        const c = chains[current];
        const isCorrect = placed.every((p, i) => p === c.organisms[i]);
        if (isCorrect) {
          score++;
          document.getElementById('fcScore').textContent = score;
          addXP(25);
          setFeedback('fcFeedback', '✅ Perfect food chain! +25 XP', 'success');
        } else {
          setFeedback('fcFeedback', '❌ Wrong order! Correct: ' + c.organisms.join(' → '), 'error');
        }
        current++;
        setTimeout(loadFC, 2000);
      }

      window.fcUndo = function() {
        if (placed.length === 0) return;
        placed.pop();
        renderFCChain();
        const btns = document.querySelectorAll('#fcOptions .game-btn');
        let count = 0;
        btns.forEach(b => {
          if (b.disabled && count < placed.length + 1) count++;
        });
        // Re-enable last disabled button
        const disabled = [...btns].filter(b => b.disabled);
        if (disabled.length > 0) {
          const last = disabled[disabled.length - 1];
          last.disabled = false;
          last.style.opacity = '1';
        }
      };
      window.fcReset = function() {
        placed = [];
        renderFCChain();
        document.querySelectorAll('#fcOptions .game-btn').forEach(b => { b.disabled = false; b.style.opacity = '1'; });
        setFeedback('fcFeedback', '🔄 Reset! Try again.', 'info');
      };
      window.fcSkip = function() {
        setFeedback('fcFeedback', '⏭ Correct order: ' + chains[current].organisms.join(' → '), 'error');
        current++;
        setTimeout(loadFC, 2000);
      };
      loadFC();
    })();



    /* ═══════════════ GAME: TROPHIC LEVEL SORTER ═══════════════ */
    (function() {
      let items = [
        { text: '🌳 Oak Tree', type: 'producer', explanation: 'Produces its own food via photosynthesis.' },
        { text: '☀️ Phytoplankton', type: 'producer', explanation: 'Microscopic plants that produce food in oceans.' },
        { text: '🐛 Caterpillar', type: 'primary', explanation: 'Eats plants directly.' },
        { text: '🐇 Rabbit', type: 'primary', explanation: 'Herbivore that eats grass and leaves.' },
        { text: '🐸 Frog', type: 'secondary', explanation: 'Eats insects (primary consumers).' },
        { text: '🐍 Snake', type: 'secondary', explanation: 'Eats frogs and mice.' },
        { text: '🦅 Eagle', type: 'apex', explanation: 'Top predator with no natural enemies.' },
        { text: '🦈 Great White Shark', type: 'apex', explanation: 'Apex predator of the ocean.' },
        { text: '🍄 Mushroom', type: 'decomposer', explanation: 'Breaks down dead organic matter.' },
        { text: '🦠 Earthworm', type: 'decomposer', explanation: 'Helps recycle nutrients back into the soil.' }
      ];
      // Shuffle items
      items = items.sort(() => Math.random() - 0.5);
      let current = 0, score = 0;

      function loadTrophic() {
        if (current >= items.length) {
          document.getElementById('trophicItem').textContent = '🎉 Finished! Score: ' + score + '/' + items.length;
          document.querySelectorAll('#game-trophicsorter .sort-btn').forEach(b => b.disabled = true);
          if (score >= 7) unlockBadge('ecosystem');
          return;
        }
        document.getElementById('trophicItem').textContent = items[current].text;
      }

      window.answerTrophic = function(selectedType) {
        if (current >= items.length) return;
        const correct = items[current].type === selectedType;
        if (correct) {
          score++;
          addXP(15);
          setFeedback('trophicFeedback', '✅ Correct! ' + items[current].explanation, 'success');
        } else {
          setFeedback('trophicFeedback', '❌ Wrong! It\'s a ' + items[current].type.toUpperCase() + '. ' + items[current].explanation, 'error');
        }
        document.getElementById('trophicScore').textContent = score;
        current++;
        setTimeout(loadTrophic, 2500);
      };
      loadTrophic();
    })();

    /* ═══════════════ GAME: BIODIVERSITY TRUE/FALSE ═══════════════ */
    let bioTfQuestions = [
      { statement: 'India is one of the 17 megadiverse countries in the world.', answer: true },
      { statement: 'Genetic diversity refers to the variety of ecosystems in a region.', answer: false },
      { statement: 'The Western Ghats is a globally recognized biodiversity hotspot.', answer: true },
      { statement: 'There are approximately 87 million species on Earth.', answer: false },
      { statement: 'Biodiversity helps maintain ecosystem stability and resilience.', answer: true },
      { statement: 'Ex-situ conservation means protecting species in their natural habitat.', answer: false },
      { statement: 'Bees are responsible for pollinating about 75% of food crops.', answer: true },
      { statement: 'Invasive species help increase biodiversity in an ecosystem.', answer: false }
    ];
    // Shuffle questions
    bioTfQuestions = bioTfQuestions.sort(() => Math.random() - 0.5);
    let bioTfCurrent = 0, bioTfScore = 0, bioTfStreak = 0;

    function loadBioTF() {
      if (bioTfCurrent >= bioTfQuestions.length) {
        document.getElementById('bioTfQuestion').textContent = `🎉 Finished! Score: ${bioTfScore}/${bioTfQuestions.length}`;
        document.getElementById('bioTfTrue').disabled = true;
        document.getElementById('bioTfFalse').disabled = true;
        if (bioTfScore >= 5) unlockBadge('biodiversity');
        return;
      }
      document.getElementById('bioTfQuestion').textContent = bioTfQuestions[bioTfCurrent].statement;
      setFeedback('bioTfFeedback', 'True or False? Think carefully!', 'info');
    }

    window.answerBioTF = function(answer) {
      if (bioTfCurrent >= bioTfQuestions.length) return;
      const correct = bioTfQuestions[bioTfCurrent].answer === answer;
      if (correct) {
        bioTfScore++;
        bioTfStreak++;
        addXP(10 + bioTfStreak * 2);
        setFeedback('bioTfFeedback', `✅ Correct! +${10 + bioTfStreak * 2} XP (Streak: ${bioTfStreak}🔥)`, 'success');
      } else {
        bioTfStreak = 0;
        setFeedback('bioTfFeedback', `❌ Wrong! The answer is ${bioTfQuestions[bioTfCurrent].answer ? 'TRUE' : 'FALSE'}.`, 'error');
      }
      document.getElementById('bioTfScore').textContent = bioTfScore;
      document.getElementById('bioTfStreak').textContent = bioTfStreak;
      bioTfCurrent++;
      setTimeout(loadBioTF, 1200);
    };
    loadBioTF();

    // Auto-unlock intro badge on page load
    setTimeout(() => { unlockBadge('intro'); }, 3000);

    // Initial display update
    updateXPDisplay();
    /* ═══════════════ SCOREBOARD LOGIC ═══════════════ */
    let scores = { 1: 0, 2: 0 };
    window.updateScore = function(team, amount) {
      scores[team] += amount;
      if(scores[team] < 0) scores[team] = 0;
      const el = document.getElementById(`team${team}Score`);
      el.textContent = scores[team];
      el.style.transform = 'scale(1.3)';
      setTimeout(() => el.style.transform = 'scale(1)', 200);
    };
    
    window.announceWinner = function() {
      const name1 = document.getElementById('team1Name').value || 'Team 1';
      const name2 = document.getElementById('team2Name').value || 'Team 2';
      let winnerText = '';
      if (scores[1] > scores[2]) winnerText = `🏆 ${name1.toUpperCase()} WINS!`;
      else if (scores[2] > scores[1]) winnerText = `🏆 ${name2.toUpperCase()} WINS!`;
      else winnerText = "🤝 IT'S A TIE!";
      
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;font-family:Outfit;cursor:pointer;';
      overlay.innerHTML = `
        <div style="font-size:4rem;color:var(--accent-amber);font-weight:900;text-align:center;text-shadow:0 0 30px rgba(251,191,36,0.6);animation:pulse-glow 2s infinite">${winnerText}</div>
        <div style="font-size:2.5rem;margin-top:1.5rem;color:var(--text);font-weight:700;">${scores[1]} - ${scores[2]}</div>
        <div style="font-size:1rem;margin-top:3rem;color:var(--text-muted);opacity:0.8;">(Click anywhere to close)</div>
      `;
      overlay.onclick = () => overlay.remove();
      document.body.appendChild(overlay);
      
      spawnConfetti();
      setTimeout(spawnConfetti, 800);
      setTimeout(spawnConfetti, 1600);
    };

    /* ═══════════════ BIOME MATCHER LOGIC ═══════════════ */
    let biomeQuestions = [
      { q: "Extremely low rainfall, highly adapted nocturnal animals.", a: "desert" },
      { q: "Lungs of the earth, high canopy, incredibly diverse.", a: "forest" },
      { q: "Wide open spaces, large grazing herbivores, prone to fire.", a: "grassland" },
      { q: "Deep zones, coral reefs, lakes, rivers, oceans.", a: "aquatic" }
    ];
    let currentBiomeQuestion = 0;
    let biomeScore = 0;
    let biomeGameCompleted = false;

    function checkBiome(answer) {
      if (biomeGameCompleted) return;
      const current = biomeQuestions[currentBiomeQuestion];
      const feedback = document.getElementById("biomeFeedback");
      
      if (answer === current.a) {
        biomeScore++;
        document.getElementById("biomeScore").textContent = biomeScore;
        feedback.className = "game-feedback success";
        feedback.textContent = "Correct! " + answer.charAt(0).toUpperCase() + answer.slice(1) + " ecosystem.";
      } else {
        feedback.className = "game-feedback error";
        feedback.textContent = "Oops! The correct answer was " + current.a.charAt(0).toUpperCase() + current.a.slice(1) + ".";
      }

      currentBiomeQuestion++;
      
      if (currentBiomeQuestion < biomeQuestions.length) {
        setTimeout(() => {
          document.getElementById("biomeQuestion").textContent = biomeQuestions[currentBiomeQuestion].q;
          feedback.className = "game-feedback info";
          feedback.textContent = "Select the ecosystem!";
        }, 1500);
      } else {
        biomeGameCompleted = true;
        setTimeout(() => {
          document.getElementById("biomeQuestion").textContent = "Game Complete! 🌎";
          feedback.className = "game-feedback success";
          feedback.innerHTML = `You scored ${biomeScore} / 4! 🎉`;
          addXP(40);
          try { unlockBadge('biome_master'); } catch(e) {}
        }, 1500);
      }
    }
  
