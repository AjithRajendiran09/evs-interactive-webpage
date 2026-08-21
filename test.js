  
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

  // ═══════════════ ECOSYSTEM MCQ ═══════════════
  const ecoMcqQuestions = [
    {q:"What is the primary source of energy in most ecosystems?",opts:["Water","Sunlight","Soil","Wind"],ans:1,exp:"Sunlight is captured by producers through photosynthesis — it's the primary energy source for all life on Earth."},
    {q:"Which of the following is an ABIOTIC component?",opts:["Bacteria","Fungi","Temperature","Earthworms"],ans:2,exp:"Temperature is a non-living physical factor (abiotic). Bacteria, fungi, and earthworms are all living organisms (biotic)."},
    {q:"How much energy transfers from one trophic level to the next?",opts:["100%","50%","10%","25%"],ans:2,exp:"Only 10% of energy passes to the next level. 90% is lost as heat. This is called Lindeman's 10% Law (1942)."},
    {q:"Who are the 'recyclers' of an ecosystem?",opts:["Producers","Herbivores","Carnivores","Decomposers"],ans:3,exp:"Decomposers (bacteria, fungi, earthworms) break down dead matter and return nutrients to the soil, completing the cycle."},
    {q:"The Amazon Rainforest produces approximately what % of Earth's oxygen?",opts:["5%","10%","20%","50%"],ans:2,exp:"The Amazon produces ~20% of Earth's oxygen. It's called the 'Lungs of the Earth' — a real, verified scientific fact!"},
    {q:"Autotrophs are organisms that:",opts:["Eat animals","Make their own food","Eat plants only","Decompose dead matter"],ans:1,exp:"Autotrophs (producers like plants and algae) make their own food through photosynthesis — they don't need to eat others."},
    {q:"Energy flow in an ecosystem is:",opts:["Circular","Bidirectional","Unidirectional (one-way)","Random"],ans:2,exp:"Energy flows in ONE direction only: Sun → Producers → Consumers. Unlike nutrients, energy cannot cycle back — it's lost as heat."},
    {q:"Which term was coined by Arthur Tansley in 1935?",opts:["Food chain","Biodiversity","Ecosystem","Biome"],ans:2,exp:"Arthur Tansley coined 'ecosystem' in 1935 to describe the unified system of living organisms and their physical environment."},
    {q:"The approximate annual value of free ecosystem services provided by nature is:",opts:["$10 billion","$1 trillion","$125 trillion","$500 billion"],ans:2,exp:"$125 trillion/year! This includes clean air, water purification, pollination, and climate regulation — all provided FREE by nature."},
    {q:"Which process do producers use to convert sunlight into food?",opts:["Respiration","Decomposition","Photosynthesis","Fermentation"],ans:2,exp:"Photosynthesis! Plants use sunlight + CO₂ + water to produce glucose (food) and oxygen as a byproduct."},
  ];
  let ecoMcqIdx=0, ecoMcqCorrect=0;
  function initEcoMcq(){ecoMcqIdx=0;ecoMcqCorrect=0;renderEcoMcq();}
  function renderEcoMcq(){
    const q=ecoMcqQuestions[ecoMcqIdx];
    if(!document.getElementById('ecoMcqQ'))return;
    document.getElementById('ecoMcqQ').textContent=`Q${ecoMcqIdx+1}. ${q.q}`;
    document.getElementById('ecoMcqNum').textContent=ecoMcqIdx+1;
    document.getElementById('ecoMcqScore').textContent=ecoMcqCorrect;
    document.getElementById('ecoMcqNextBtn').style.display='none';
    const fb=document.getElementById('ecoMcqFeedback');
    fb.textContent='Choose the best answer!';fb.className='game-feedback info';
    const opts=document.getElementById('ecoMcqOpts');opts.innerHTML='';
    q.opts.forEach((o,i)=>{const btn=document.createElement('button');btn.className='mcq-opt';btn.textContent=o;btn.onclick=()=>answerEcoMcq(i,btn);opts.appendChild(btn);});
  }
  function answerEcoMcq(chosen,btn){
    const q=ecoMcqQuestions[ecoMcqIdx];
    document.querySelectorAll('#ecoMcqOpts .mcq-opt').forEach(b=>b.disabled=true);
    const fb=document.getElementById('ecoMcqFeedback');
    if(chosen===q.ans){btn.classList.add('correct');ecoMcqCorrect++;addXP(15);fb.textContent='✅ Correct! '+q.exp;fb.className='game-feedback success';}
    else{btn.classList.add('wrong');document.querySelectorAll('#ecoMcqOpts .mcq-opt')[q.ans].classList.add('correct');fb.textContent='❌ '+q.exp;fb.className='game-feedback error';}
    document.getElementById('ecoMcqScore').textContent=ecoMcqCorrect;
    if(ecoMcqIdx<ecoMcqQuestions.length-1){document.getElementById('ecoMcqNextBtn').style.display='inline-block';}
    else{setTimeout(()=>{fb.textContent=`🎉 Quiz Complete! Score: ${ecoMcqCorrect}/10. ${ecoMcqCorrect>=8?'Excellent Eco Expert! 🏆':ecoMcqCorrect>=5?'Good job! 👍':'Keep studying! 📚'}`;fb.className='game-feedback success';},500);}
  }
  function ecoMcqNext(){ecoMcqIdx++;renderEcoMcq();}

  // ═══════════════ FOOD CHAIN MCQ ═══════════════
  const fcMcqQuestions=[
    {q:"A food chain ALWAYS starts with a:",opts:["Lion","Bacteria","Plant (Producer)","Snake"],ans:2,exp:"Food chains always start with producers (plants/algae) that convert sunlight into chemical energy through photosynthesis."},
    {q:"In an Indian grassland, which is the correct food chain?",opts:["Peacock→Snake→Frog→Grasshopper→Grass","Grass→Grasshopper→Frog→Snake→Peacock","Snake→Frog→Grass→Grasshopper","Frog→Grass→Snake→Peacock"],ans:1,exp:"Grass→Grasshopper→Frog→Snake→Peacock! Energy flows from producers upward. Peacock (India's national bird) is the apex predator here!"},
    {q:"What percentage of energy is LOST between trophic levels?",opts:["10%","50%","90%","75%"],ans:2,exp:"90% of energy is lost as heat at each step. Only 10% transfers to the next level. This limits food chain length to 4-5 levels."},
    {q:"DDT (pesticide) accumulates MOST in which organism of a food chain?",opts:["Plants","Grasshoppers","Small fish","Eagles (top predator)"],ans:3,exp:"Bioaccumulation! Toxins like DDT concentrate as they move up the chain. Top predators like eagles accumulate the MOST — up to 10 million times more than water!"},
    {q:"What are decomposers' main function in a food chain?",opts:["Hunt prey","Photosynthesize","Break dead matter, recycle nutrients","Migrate seasonally"],ans:2,exp:"Decomposers (bacteria, fungi) break down dead organisms and return nutrients to the soil, allowing producers to grow again. The cycle continues!"},
    {q:"Which marine food chain is correct?",opts:["Shark→Fish→Zooplankton→Phytoplankton","Phytoplankton→Zooplankton→Small Fish→Shark","Zooplankton→Phytoplankton→Fish→Shark","Fish→Phytoplankton→Shark"],ans:1,exp:"Marine food chains start with phytoplankton (microscopic algae). They produce 50% of Earth's oxygen and form the base of all ocean food chains!"},
    {q:"A hawk eats snakes, which eat frogs, which eat grasshoppers that eat grass. What trophic level is the hawk?",opts:["T1 (Producer)","T2 (Primary Consumer)","T3 (Secondary Consumer)","T4 (Tertiary/Apex)"],ans:3,exp:"Grass=T1, Grasshopper=T2, Frog=T3, Snake=T4, Hawk=T5 Apex! Count from the producer to find the trophic level."},
    {q:"Why are food chains usually limited to 4-5 levels?",opts:["Animals don't want to eat more","Not enough space","Energy decreases so much that higher levels can't be sustained","Not enough species"],ans:2,exp:"Because of the 10% rule, energy becomes so scarce by the 5th level (just 0.01% of original) that it cannot support another trophic level!"},
  ];
  let fcMcqIdx=0,fcMcqCorrect=0;
  function initFcMcq(){fcMcqIdx=0;fcMcqCorrect=0;renderFcMcq();}
  function renderFcMcq(){
    const q=fcMcqQuestions[fcMcqIdx];
    if(!document.getElementById('fcMcqQ'))return;
    document.getElementById('fcMcqQ').textContent=`Q${fcMcqIdx+1}. ${q.q}`;
    document.getElementById('fcMcqNum').textContent=fcMcqIdx+1;
    document.getElementById('fcMcqScore').textContent=fcMcqCorrect;
    document.getElementById('fcMcqNextBtn').style.display='none';
    const fb=document.getElementById('fcMcqFeedback');fb.textContent='Choose the best answer!';fb.className='game-feedback info';
    const opts=document.getElementById('fcMcqOpts');opts.innerHTML='';
    q.opts.forEach((o,i)=>{const btn=document.createElement('button');btn.className='mcq-opt';btn.textContent=o;btn.onclick=()=>answerFcMcq(i,btn);opts.appendChild(btn);});
  }
  function answerFcMcq(chosen,btn){
    const q=fcMcqQuestions[fcMcqIdx];
    document.querySelectorAll('#fcMcqOpts .mcq-opt').forEach(b=>b.disabled=true);
    const fb=document.getElementById('fcMcqFeedback');
    if(chosen===q.ans){btn.classList.add('correct');fcMcqCorrect++;addXP(15);fb.textContent='✅ Correct! '+q.exp;fb.className='game-feedback success';}
    else{btn.classList.add('wrong');document.querySelectorAll('#fcMcqOpts .mcq-opt')[q.ans].classList.add('correct');fb.textContent='❌ '+q.exp;fb.className='game-feedback error';}
    document.getElementById('fcMcqScore').textContent=fcMcqCorrect;
    if(fcMcqIdx<fcMcqQuestions.length-1){document.getElementById('fcMcqNextBtn').style.display='inline-block';}
    else{setTimeout(()=>{fb.textContent=`🎉 Done! Score: ${fcMcqCorrect}/8. ${fcMcqCorrect>=7?'Food Chain Master! 🏆':fcMcqCorrect>=5?'Well done! 👍':'Keep learning! 📚'}`;fb.className='game-feedback success';},500);}
  }
  function fcMcqNext(){fcMcqIdx++;renderFcMcq();}

  // ═══════════════ FOOD WEB TRUE/FALSE ═══════════════
  const fwTfQuestions=[
    {q:"A food web is more realistic than a food chain because most animals eat more than one type of food.",ans:true,exp:"TRUE! Real animals are rarely limited to one food source. A fox eats rabbits, mice, berries, and insects — food webs represent reality."},
    {q:"Wolves were removed from Yellowstone and reintroduced in 1995, causing rivers to literally change course.",ans:true,exp:"TRUE! When 14 wolves returned in 1995, they changed elk behavior → vegetation recovered → beavers returned → rivers changed course. A real trophic cascade!"},
    {q:"Removing a keystone species has no significant effect on the food web.",ans:false,exp:"FALSE! Removing a keystone species can COLLAPSE the entire web. Sea otters protect kelp forests from sea urchins. Remove otters → urchins explode → kelp forest destroyed."},
    {q:"A food web has more stability than a food chain because of multiple energy pathways.",ans:true,exp:"TRUE! If one species disappears in a web, energy can still flow through alternative pathways. More connections = more stability and resilience."},
    {q:"Bees pollinate over 75% of the world's food crops.",ans:true,exp:"TRUE! Bees are a keystone pollinator species. Without them, 75% of flowering plants (and most of our food) would disappear. Bee conservation is critical!"},
    {q:"A trophic cascade means changes at one level ONLY affect the level directly above or below.",ans:false,exp:"FALSE! Trophic cascades ripple through the ENTIRE food web, affecting all levels. Removing wolves in Yellowstone affected plants, rivers, fish, birds — everything!"},
    {q:"All food webs start with producers at the base.",ans:true,exp:"TRUE! Whether phytoplankton in oceans, grass in grasslands, or trees in forests — producers that photosynthesize always form the foundation of every food web."},
    {q:"Invasive species can disrupt existing food web connections.",ans:true,exp:"TRUE! Nile Perch introduced to Lake Victoria (Africa) caused extinction of 200+ native fish species, completely destroying the existing food web in just decades."},
    {q:"Food webs are unaffected by climate change.",ans:false,exp:"FALSE! Climate change shifts species' geographic ranges and disrupts timing. When predator and prey are out of sync (phenological mismatch), food webs collapse."},
    {q:"Phytoplankton (microscopic ocean algae) produce 50% of Earth's oxygen.",ans:true,exp:"TRUE! Every other breath you take comes from the ocean. Phytoplankton produce more oxygen than all rainforests combined! Ocean health is critical for human survival."},
  ];
  let fwTfIdx=0,fwTfCorrect=0;
  function initFwTf(){fwTfIdx=0;fwTfCorrect=0;renderFwTf();}
  function renderFwTf(){
    const q=fwTfQuestions[fwTfIdx];
    if(!document.getElementById('fwTfQ'))return;
    document.getElementById('fwTfQ').textContent=`Statement ${fwTfIdx+1}/10: ${q.q}`;
    document.getElementById('fwTfScore').textContent=fwTfCorrect;
    document.getElementById('fwTfFeedback').textContent='Is this TRUE or FALSE?';
    document.getElementById('fwTfFeedback').className='game-feedback info';
    document.getElementById('fwTfTrue').disabled=false;
    document.getElementById('fwTfFalse').disabled=false;
  }
  function answerFwTf(val){
    const q=fwTfQuestions[fwTfIdx];
    document.getElementById('fwTfTrue').disabled=true;
    document.getElementById('fwTfFalse').disabled=true;
    const fb=document.getElementById('fwTfFeedback');
    if(val===q.ans){fwTfCorrect++;addXP(10);fb.textContent='✅ '+q.exp;fb.className='game-feedback success';}
    else{fb.textContent='❌ '+q.exp;fb.className='game-feedback error';}
    document.getElementById('fwTfScore').textContent=fwTfCorrect;
    setTimeout(()=>{if(fwTfIdx<fwTfQuestions.length-1){fwTfIdx++;renderFwTf();}else{fb.textContent=`🎉 Finished! Score: ${fwTfCorrect}/10. ${fwTfCorrect>=8?'Food Web Expert! 🕸️':fwTfCorrect>=5?'Good understanding! 👍':'Keep learning! 📚'}`;fb.className='game-feedback success';}},2000);
  }

  // ═══════════════ FOOD WEB REBUS ═══════════════
  const fwRebuses=[
    {fragments:[{e:'🦊',l:'FOOD'},{op:'+'},{e:'🕸️',l:'WEB'}],answer:'FOOD WEB',breakdown:'FOOD + WEB = FOOD WEB',explain:'A food web is an interconnected network of multiple food chains showing realistic feeding relationships in an ecosystem. More complex than a food chain!'},
    {fragments:[{e:'🗝️',l:'KEY'},{op:'+'},{e:'🪨',l:'STONE'},{op:'+'},{e:'🌟',l:'SPECIES'}],answer:'KEYSTONE SPECIES',breakdown:'KEY + STONE + SPECIES',explain:'A keystone species has a disproportionately large impact on its ecosystem. Remove it and the whole web collapses! e.g., Sea otters, Wolves, Bees.'},
    {fragments:[{e:'🌊',l:'TROPHIC'},{op:'+'},{e:'⛰️',l:'CASCADE'}],answer:'TROPHIC CASCADE',breakdown:'TROPHIC + CASCADE',explain:'A trophic cascade is when a change at one level ripples through the entire food web. Wolves returning to Yellowstone changed the course of rivers!'},
  ];
  let fwRebusIdx=0;
  function initFwRebus(){fwRebusIdx=0;renderFwRebus();}
  function renderFwRebus(){
    const r=fwRebuses[fwRebusIdx];
    if(!document.getElementById('fwRebusArea'))return;
    document.getElementById('fwRebusNum').textContent=fwRebusIdx+1;
    document.getElementById('fwRebusReveal').className='rebus-answer-reveal';
    let html='<div class="rebus-puzzle-card"><div class="rebus-fragments">';
    r.fragments.forEach(f=>{if(f.op){html+=`<div class="rebus-plus">${f.op}</div>`;}else{html+=`<div class="rebus-fragment"><div class="rf-emoji">${f.e}</div><small style="font-size:0.7rem;color:var(--text-muted)">${f.l}</small></div>`;}});
    html+=`</div><div class="rebus-equals">=</div><div class="rebus-question">?</div><div class="rebus-hint-text">💡 It's a key ecology concept (${r.answer.length} letters)</div></div>`;
    document.getElementById('fwRebusArea').innerHTML=html;
  }
  function showFwRebus(){
    const r=fwRebuses[fwRebusIdx];
    const rev=document.getElementById('fwRebusReveal');
    rev.className='rebus-answer-reveal show';
    rev.innerHTML=`<div class="rar-word">🎉 ${r.answer}</div><div class="rar-breakdown">${r.breakdown}</div><div class="rar-explain">${r.explain}</div>`;
    addXP(20);
  }
  function nextFwRebus(){fwRebusIdx=(fwRebusIdx+1)%fwRebuses.length;renderFwRebus();}

  // ═══════════════ SUCCESSION ORDER PUZZLE ═══════════════
  const successionOrders=[
    {title:"Primary Succession — Bare Rock to Forest",items:["🪨 Bare Rock","🟢 Lichens (Pioneer)","🌿 Mosses","🌱 Herbs & Grasses","🌳 Shrubs","🌲 Climax Forest"],explain:"Primary succession begins on bare rock. Lichens (pioneers) break down rock to form thin soil. Then mosses, herbs, shrubs colonize until a stable climax forest forms. Takes 1000s of years!"},
    {title:"Secondary Succession — After Forest Fire",items:["🔥 Disturbance (Fire)","🌱 Annual Weeds","🌿 Perennial Herbs","🌳 Shrubs","🌲 Young Trees","🏞️ Climax Forest"],explain:"Secondary succession is faster because soil already exists! After a fire, annual weeds appear first, then herbs, shrubs, and finally the forest regenerates. Takes decades to centuries. Example: Yellowstone 1988!"},
  ];
  let succOrderIdx=0,succUserOrder=[],succCorrectItems=[];
  function initSuccOrder(){succOrderIdx=0;renderSuccOrder();}
  function renderSuccOrder(){
    const s=successionOrders[succOrderIdx];
    if(!document.getElementById('succOrderSource'))return;
    succCorrectItems=[...s.items];succUserOrder=[];
    document.getElementById('succOrderTitle').textContent=s.title;
    const dz=document.getElementById('succOrderDropZone');
    dz.innerHTML='<div style="color:var(--text-muted);font-size:0.85rem;">Click items below in order →</div>';
    const src=document.getElementById('succOrderSource');src.innerHTML='';
    const shuffled=[...s.items].sort(()=>Math.random()-0.5);
    shuffled.forEach(item=>{const div=document.createElement('div');div.className='op-item';div.textContent=item;div.onclick=()=>succPickItem(item,div);src.appendChild(div);});
    document.getElementById('succOrderFeedback').textContent='Click the items in the correct succession order!';document.getElementById('succOrderFeedback').className='game-feedback info';
    document.getElementById('succOrderCheck').style.display='none';
    document.getElementById('succOrderNext').style.display='none';
  }
  function succPickItem(item,el){
    if(el.classList.contains('placed')){
      succUserOrder=succUserOrder.filter(i=>i!==item);el.classList.remove('placed');
      const dz=document.getElementById('succOrderDropZone');
      [...dz.querySelectorAll('.op-item')].forEach(c=>{if(c.textContent===item)c.remove();});
      if(succUserOrder.length===0)dz.innerHTML='<div style="color:var(--text-muted);font-size:0.85rem;">Click items below in order →</div>';
    }else{
      succUserOrder.push(item);el.classList.add('placed');
      const dz=document.getElementById('succOrderDropZone');
      const first=dz.querySelector('div[style]');if(first)first.remove();
      const span=document.createElement('div');span.className='op-item placed';span.textContent=item;span.onclick=()=>succPickItem(item,el);dz.appendChild(span);
      if(succUserOrder.length===succCorrectItems.length)document.getElementById('succOrderCheck').style.display='inline-block';
    }
  }
  function checkSuccOrder(){
    const correct=JSON.stringify(succUserOrder)===JSON.stringify(succCorrectItems);
    const fb=document.getElementById('succOrderFeedback');const s=successionOrders[succOrderIdx];
    if(correct){fb.textContent='🎉 Perfect! '+s.explain;fb.className='game-feedback success';addXP(30);document.getElementById('succOrderDropZone').querySelectorAll('.op-item').forEach(el=>el.classList.add('correct-place'));if(succOrderIdx<successionOrders.length-1)document.getElementById('succOrderNext').style.display='inline-block';}
    else{fb.textContent='❌ Not quite right! Think: what happens FIRST in succession? Reset and try again.';fb.className='game-feedback error';}
  }
  function nextSuccOrder(){succOrderIdx++;renderSuccOrder();}
  function resetSuccOrder(){renderSuccOrder();}

  // ═══════════════ SUCCESSION MCQ ═══════════════
  const succMcqQuestions=[
    {q:"Primary succession starts on:",opts:["Burned forest floor","Agricultural land","Bare rock with no soil","Abandoned farmland"],ans:2,exp:"Primary succession begins on bare rock (or new lava flows) with NO soil present. Lichens are the pioneer species that slowly break down rock to create soil over centuries."},
    {q:"What are 'pioneer species' in succession?",opts:["Final organisms to arrive","Large trees","First organisms to colonize a new environment","Migratory animals"],ans:2,exp:"Pioneer species (like lichens and mosses in primary succession) are the FIRST to colonize. They modify the environment to make it suitable for other organisms."},
    {q:"Real Example: Krakatoa volcano erupted in 1883. What type of succession occurred on the new lava islands?",opts:["Secondary succession","Primary succession","Reverse succession","No succession"],ans:1,exp:"Primary succession! The new volcanic islands had no soil. Within 3 years, algae appeared. Within 25 years, forests with birds colonized. Today it's a lush tropical island!"},
    {q:"Secondary succession is FASTER than primary because:",opts:["Rainfall is higher","Soil already exists","More sunlight is available","Animals help it"],ans:1,exp:"Soil already exists in secondary succession! Since building soil from rock is the slowest step, secondary succession (on existing soil) is much faster — decades vs. thousands of years."},
    {q:"A 'climax community' is:",opts:["The first stage of succession","An unstable community","A stable, self-sustaining final community","A pioneer community"],ans:2,exp:"A climax community is the final, stable stage of ecological succession. It maintains itself indefinitely unless disturbed. Example: a mature tropical rainforest or oak forest."},
    {q:"The 1988 Yellowstone fire led to which type of succession?",opts:["Primary succession","Reverse succession","Secondary succession","No succession occurred"],ans:2,exp:"Secondary succession! The fire cleared the forest but left soil intact. Within years, grasses appeared; within decades, forests are regenerating. Yellowstone is a perfect real-world case study!"},
  ];
  let succMcqIdx=0,succMcqCorrect=0;
  function initSuccMcq(){succMcqIdx=0;succMcqCorrect=0;renderSuccMcq();}
  function renderSuccMcq(){
    const q=succMcqQuestions[succMcqIdx];
    if(!document.getElementById('succMcqQ'))return;
    document.getElementById('succMcqQ').textContent=`Q${succMcqIdx+1}. ${q.q}`;
    document.getElementById('succMcqNum').textContent=succMcqIdx+1;
    document.getElementById('succMcqScore').textContent=succMcqCorrect;
    document.getElementById('succMcqNextBtn').style.display='none';
    const fb=document.getElementById('succMcqFeedback');fb.textContent='Choose the best answer!';fb.className='game-feedback info';
    const opts=document.getElementById('succMcqOpts');opts.innerHTML='';
    q.opts.forEach((o,i)=>{const btn=document.createElement('button');btn.className='mcq-opt';btn.textContent=o;btn.onclick=()=>answerSuccMcq(i,btn);opts.appendChild(btn);});
  }
  function answerSuccMcq(chosen,btn){
    const q=succMcqQuestions[succMcqIdx];
    document.querySelectorAll('#succMcqOpts .mcq-opt').forEach(b=>b.disabled=true);
    const fb=document.getElementById('succMcqFeedback');
    if(chosen===q.ans){btn.classList.add('correct');succMcqCorrect++;addXP(15);fb.textContent='✅ '+q.exp;fb.className='game-feedback success';}
    else{btn.classList.add('wrong');document.querySelectorAll('#succMcqOpts .mcq-opt')[q.ans].classList.add('correct');fb.textContent='❌ '+q.exp;fb.className='game-feedback error';}
    document.getElementById('succMcqScore').textContent=succMcqCorrect;
    if(succMcqIdx<succMcqQuestions.length-1){document.getElementById('succMcqNextBtn').style.display='inline-block';}
    else{setTimeout(()=>{fb.textContent=`🎉 Succession Expert! Score: ${succMcqCorrect}/6. ${succMcqCorrect>=5?'Outstanding! 🌲':succMcqCorrect>=3?'Good! 👍':'Study more! 📚'}`;fb.className='game-feedback success';},500);}
  }
  function succMcqNext(){succMcqIdx++;renderSuccMcq();}

  // ═══════════════ TERRESTRIAL MCQ ═══════════════
  const terrMcqQuestions=[
    {q:"Which ecosystem is called the 'Lungs of the Earth'?",opts:["Grassland","Desert","Rainforest","Ocean"],ans:2,exp:"Tropical Rainforests (especially the Amazon) are called the 'Lungs of the Earth' because they produce ~20% of Earth's oxygen and absorb massive amounts of CO₂."},
    {q:"Real Fact: How many trees are cut down every year globally?",opts:["1 billion","5 billion","15 billion","100 million"],ans:2,exp:"15 BILLION trees are cut down every year! That's about 46% more than are replanted. The Amazon alone loses the size of a football pitch every minute."},
    {q:"Which Indian desert is located in Rajasthan?",opts:["Gobi Desert","Sahara Desert","Thar Desert","Antarctic Desert"],ans:2,exp:"The Thar Desert! It covers parts of Rajasthan, Gujarat, and extends into Pakistan. One of the most populated desert regions in the world with unique species like the Indian Spiny-tailed lizard."},
    {q:"The Savanna grassland is famous for:",opts:["Dense tree cover","The world's largest animal migration","Very low rainfall","Polar bears"],ans:1,exp:"The African Savanna hosts the Great Migration — 1.5 million wildebeest, 200,000 zebras, and 350,000 gazelles migrate seasonally. The largest land migration on Earth!"},
    {q:"Which is a correct food chain for a Forest Ecosystem?",opts:["Tiger→Deer→Grass","Grass→Deer→Tiger","Deer→Grass→Tiger","Tiger→Grass→Deer"],ans:1,exp:"Grass→Deer→Tiger is a classic forest food chain. It follows the rule: Producer→Primary Consumer→Secondary Consumer (Apex)."},
    {q:"Tropical rainforests cover about what % of Earth's land surface?",opts:["2%","7%","20%","35%"],ans:1,exp:"Just 7% of Earth's land! Yet tropical rainforests hold over 50% of all species on Earth. The Amazon alone has 40,000 plant species and 3 million+ animal species."},
    {q:"Which adaptation helps desert animals survive extreme heat?",opts:["Migration to cold areas","Being nocturnal (active at night)","Growing larger bodies","Having dark-colored skin"],ans:1,exp:"Being nocturnal! Desert animals like the fennec fox, sand cat, and scorpions are active at night when temperatures cool. This avoids the deadly daytime heat of 50°C+ in deserts."},
    {q:"What is the forest floor layer characterized by?",opts:["Maximum sunlight","Tallest trees","Low light, moist conditions, decomposers","No life"],ans:2,exp:"The forest floor gets less than 2% of sunlight! It's dark, moist, and dominated by decomposers (fungi, bacteria, earthworms) that break down leaf litter and recycle nutrients."},
    {q:"A camel's hump stores:",opts:["Water","Fat","Blood","Salt"],ans:1,exp:"Fat! A camel's hump stores fat (not water!) as an energy reserve. When food is scarce, fat breaks down and provides both energy and metabolic water. Camels can go 7-10 days without water!"},
    {q:"India's Western Ghats is classified as:",opts:["A desert","A biodiversity hotspot","A polar ecosystem","An aquatic ecosystem"],ans:1,exp:"The Western Ghats is one of 36 global biodiversity hotspots! It spans 1,600 km along India's west coast with 5,000+ plant species, 139 mammal species, and 508 bird species."},
    {q:"The Sundarbans (West Bengal) is famous for:",opts:["Desert animals","World's largest mangrove forest and Royal Bengal Tiger","Alpine meadows","Coral reefs"],ans:1,exp:"Sundarbans is the world's largest mangrove forest (10,000 km²) and a UNESCO World Heritage Site. It's the largest habitat for the Royal Bengal Tiger and Irrawaddy dolphins!"},
    {q:"Grasslands cover approximately what % of Earth's land surface?",opts:["10%","20%","40%","60%"],ans:2,exp:"Grasslands cover about 40% of Earth's land! They're crucial for agriculture — wheat, rice, corn (which feed 4 billion people) are all grasses. African Savanna hosts amazing megafauna."},
  ];
  let terrMcqIdx=0,terrMcqCorrect=0;
  function initTerrMcq(){terrMcqIdx=0;terrMcqCorrect=0;renderTerrMcq();}
  function renderTerrMcq(){
    const q=terrMcqQuestions[terrMcqIdx];
    if(!document.getElementById('terrMcqQ'))return;
    document.getElementById('terrMcqQ').textContent=`Q${terrMcqIdx+1}. ${q.q}`;
    document.getElementById('terrMcqNum').textContent=terrMcqIdx+1;
    document.getElementById('terrMcqScore').textContent=terrMcqCorrect;
    document.getElementById('terrMcqNextBtn').style.display='none';
    const fb=document.getElementById('terrMcqFeedback');fb.textContent='Choose the best answer!';fb.className='game-feedback info';
    const opts=document.getElementById('terrMcqOpts');opts.innerHTML='';
    q.opts.forEach((o,i)=>{const btn=document.createElement('button');btn.className='mcq-opt';btn.textContent=o;btn.onclick=()=>answerTerrMcq(i,btn);opts.appendChild(btn);});
  }
  function answerTerrMcq(chosen,btn){
    const q=terrMcqQuestions[terrMcqIdx];
    document.querySelectorAll('#terrMcqOpts .mcq-opt').forEach(b=>b.disabled=true);
    const fb=document.getElementById('terrMcqFeedback');
    if(chosen===q.ans){btn.classList.add('correct');terrMcqCorrect++;addXP(15);fb.textContent='✅ '+q.exp;fb.className='game-feedback success';}
    else{btn.classList.add('wrong');document.querySelectorAll('#terrMcqOpts .mcq-opt')[q.ans].classList.add('correct');fb.textContent='❌ '+q.exp;fb.className='game-feedback error';}
    document.getElementById('terrMcqScore').textContent=terrMcqCorrect;
    if(terrMcqIdx<terrMcqQuestions.length-1){document.getElementById('terrMcqNextBtn').style.display='inline-block';}
    else{setTimeout(()=>{fb.textContent=`🎉 Terrestrial Expert! Score: ${terrMcqCorrect}/12. ${terrMcqCorrect>=10?'Outstanding! 🏆':terrMcqCorrect>=7?'Well done! 👍':'Keep exploring! 🌲'}`;fb.className='game-feedback success';},500);}
  }
  function terrMcqNext(){terrMcqIdx++;renderTerrMcq();}

  // ═══════════════ AQUATIC MCQ ═══════════════
  const aquaMcqQuestions=[
    {q:"What percentage of Earth's surface is covered by oceans?",opts:["51%","61%","71%","81%"],ans:2,exp:"71% of Earth is covered by oceans! They regulate climate, produce 50% of Earth's oxygen (from phytoplankton), and host ~95% of Earth's living space."},
    {q:"What is the deepest known point on Earth?",opts:["Mariana Trench (11,034 m)","Puerto Rico Trench (8,376 m)","Java Trench (7,258 m)","Tonga Trench (10,800 m)"],ans:0,exp:"The Mariana Trench in the Pacific Ocean reaches 11,034 m — deeper than Mount Everest is tall! First measured in 1875, it's the deepest known point on Earth."},
    {q:"An estuary is where:",opts:["Two rivers meet","A river meets the ocean","A lake meets a sea","Underground water surfaces"],ans:1,exp:"An estuary is where a river meets the ocean, creating brackish (mixed salt+fresh) water. Estuaries are INCREDIBLY productive — more productive per unit area than tropical rainforests!"},
    {q:"India's largest brackish water lake (Ramsar Wetland) is:",opts:["Dal Lake","Vembanad Lake","Chilika Lake","Wular Lake"],ans:2,exp:"Chilika Lake in Odisha is India's largest brackish water lagoon and Asia's largest coastal lagoon! It's a Ramsar Wetland, home to 150+ bird species including flamingos and Irrawaddy dolphins."},
    {q:"Which aquatic ecosystem has the HIGHEST dissolved oxygen content?",opts:["Deep ocean zones","Still ponds","Fast-flowing mountain streams","Estuaries"],ans:2,exp:"Fast-flowing mountain streams have the highest dissolved oxygen! The constant turbulence at rocky rapids aerates the water, making it oxygen-rich. This is why trout and salmon thrive in streams."},
    {q:"Phytoplankton in oceans produce approximately what % of Earth's oxygen?",opts:["10%","25%","50%","75%"],ans:2,exp:"50% of Earth's oxygen comes from phytoplankton (microscopic marine algae)! Every other breath you take comes from the ocean. This is why ocean health is critical to human survival."},
    {q:"India's largest freshwater lake is:",opts:["Chilika Lake","Wular Lake","Dal Lake","Sambhar Lake"],ans:1,exp:"Wular Lake in Jammu & Kashmir is India's largest freshwater lake (covering up to 189 km²). Dal Lake is famous but much smaller. Wular is crucial for the ecology of the Kashmir valley."},
    {q:"The term 'lentic' refers to:",opts:["Flowing water ecosystems","Still water ecosystems","Deep ocean zones","Mountain streams"],ans:1,exp:"Lentic = still/standing water! Lakes and ponds are lentic ecosystems. 'Lotic' is the term for flowing water (rivers and streams). Remember: Lentic = Lakes, Lotic = Lowing (flowing)!"},
    {q:"Which aquatic ecosystem is considered the most PRODUCTIVE on Earth per unit area?",opts:["Deep ocean","Open sea","Estuaries","Arctic ocean"],ans:2,exp:"Estuaries are the most productive aquatic ecosystems per unit area! They receive nutrients from rivers + sunlight through shallow depth, supporting incredibly dense populations of fish and birds."},
    {q:"The Gangetic dolphin (India's national aquatic animal) is remarkable because:",opts:["It's the world's largest dolphin","It's completely blind and uses echolocation","It can breathe underwater","It lives in saltwater"],ans:1,exp:"The Gangetic dolphin is functionally blind! It navigates the murky Ganga waters using echolocation. Listed as Endangered, it's India's national aquatic animal found in the Ganga-Brahmaputra river system."},
  ];
  let aquaMcqIdx=0,aquaMcqCorrect=0;
  function initAquaMcq(){aquaMcqIdx=0;aquaMcqCorrect=0;renderAquaMcq();}
  function renderAquaMcq(){
    const q=aquaMcqQuestions[aquaMcqIdx];
    if(!document.getElementById('aquaMcqQ'))return;
    document.getElementById('aquaMcqQ').textContent=`Q${aquaMcqIdx+1}. ${q.q}`;
    document.getElementById('aquaMcqNum').textContent=aquaMcqIdx+1;
    document.getElementById('aquaMcqScore').textContent=aquaMcqCorrect;
    document.getElementById('aquaMcqNextBtn').style.display='none';
    const fb=document.getElementById('aquaMcqFeedback');fb.textContent='Choose the best answer!';fb.className='game-feedback info';
    const opts=document.getElementById('aquaMcqOpts');opts.innerHTML='';
    q.opts.forEach((o,i)=>{const btn=document.createElement('button');btn.className='mcq-opt';btn.textContent=o;btn.onclick=()=>answerAquaMcq(i,btn);opts.appendChild(btn);});
  }
  function answerAquaMcq(chosen,btn){
    const q=aquaMcqQuestions[aquaMcqIdx];
    document.querySelectorAll('#aquaMcqOpts .mcq-opt').forEach(b=>b.disabled=true);
    const fb=document.getElementById('aquaMcqFeedback');
    if(chosen===q.ans){btn.classList.add('correct');aquaMcqCorrect++;addXP(15);fb.textContent='✅ '+q.exp;fb.className='game-feedback success';}
    else{btn.classList.add('wrong');document.querySelectorAll('#aquaMcqOpts .mcq-opt')[q.ans].classList.add('correct');fb.textContent='❌ '+q.exp;fb.className='game-feedback error';}
    document.getElementById('aquaMcqScore').textContent=aquaMcqCorrect;
    if(aquaMcqIdx<aquaMcqQuestions.length-1){document.getElementById('aquaMcqNextBtn').style.display='inline-block';}
    else{setTimeout(()=>{fb.textContent=`🎉 Aquatic Expert! Score: ${aquaMcqCorrect}/10. ${aquaMcqCorrect>=8?'Water World Master! 🌊':aquaMcqCorrect>=5?'Good diving! 🤿':'Keep exploring! 💧'}`;fb.className='game-feedback success';},500);}
  }
  function aquaMcqNext(){aquaMcqIdx++;renderAquaMcq();}

  // ═══════════════ AQUATIC MATCH GAME ═══════════════
  const aquaMatchData=[
    {term:'Pond',desc:'Small, shallow, still water. Seasonal. High plant growth. Example: village talaabs'},
    {term:'Stream',desc:'Small, fast-flowing water. HIGHEST dissolved oxygen. Example: Western Ghats hill streams'},
    {term:'Lake',desc:'Large still water with deep zones. Example: Wular Lake (India) Dal Lake (J&K)'},
    {term:'River',desc:'Large flowing water. Nutrient-rich. Example: Ganga, Brahmaputra, Amazon'},
    {term:'Ocean',desc:'Covers 71% of Earth. Produces 50% O₂. Deepest: Mariana Trench (11,034 m)'},
    {term:'Estuary',desc:'River meets ocean. Brackish water. MOST productive aquatic ecosystem! Example: Sundarbans'},
  ];
  let aquaMatchSelected=null,aquaMatchCorrect=0;
  function initAquaMatch(){
    aquaMatchSelected=null;aquaMatchCorrect=0;
    if(!document.getElementById('aquaMatchLeft'))return;
    document.getElementById('aquaMatchScore').textContent='0';
    document.getElementById('aquaMatchFeedback').textContent='Match the aquatic ecosystem type to its description!';
    document.getElementById('aquaMatchFeedback').className='game-feedback info';
    const leftCol=document.getElementById('aquaMatchLeft');const rightCol=document.getElementById('aquaMatchRight');
    leftCol.innerHTML='';rightCol.innerHTML='';
    const shuffledRight=[...aquaMatchData].sort(()=>Math.random()-0.5);
    aquaMatchData.forEach(item=>{const l=document.createElement('div');l.className='match-item';l.dataset.match=item.term;l.dataset.side='left';l.textContent=item.term;l.onclick=()=>aquaMatchClick(l);leftCol.appendChild(l);});
    shuffledRight.forEach(item=>{const r=document.createElement('div');r.className='match-item';r.dataset.match=item.term;r.dataset.side='right';r.textContent=item.desc;r.onclick=()=>aquaMatchClick(r);rightCol.appendChild(r);});
  }
  function aquaMatchClick(el){
    const fb=document.getElementById('aquaMatchFeedback');
    if(el.classList.contains('matched'))return;
    if(!aquaMatchSelected){
      if(el.dataset.side==='left'){aquaMatchSelected=el;el.classList.add('selected');}
    }else{
      if(el.dataset.side==='right'){
        if(aquaMatchSelected.dataset.match===el.dataset.match){aquaMatchSelected.classList.remove('selected');aquaMatchSelected.classList.add('matched');el.classList.add('matched');aquaMatchCorrect++;document.getElementById('aquaMatchScore').textContent=aquaMatchCorrect;addXP(15);fb.textContent='✅ Correct match!';fb.className='game-feedback success';if(aquaMatchCorrect===aquaMatchData.length){setTimeout(()=>{fb.textContent='🎉 All matched! You know all 6 aquatic ecosystem types! 🌊';fb.className='game-feedback success';},500);}}
        else{fb.textContent='❌ Not a match! Try again.';fb.className='game-feedback error';aquaMatchSelected.classList.remove('selected');}
        aquaMatchSelected=null;
      }else{aquaMatchSelected.classList.remove('selected');aquaMatchSelected=el;el.classList.add('selected');}
    }
  }

  // ═══════════════ AQUATIC REBUS ═══════════════
  const aquaRebuses=[
    {fragments:[{e:'🌊',l:'EST'},{op:'+'},{e:'🐮',l:'U'},{op:'+'},{e:'🌿',l:'ARY'}],answer:'ESTUARY',breakdown:'EST + U + ARY = ESTUARY',explain:"An estuary is where a freshwater river meets the salty ocean. It creates brackish water and is the most productive aquatic ecosystem! Indian example: Sundarbans & Chilika Lake."},
    {fragments:[{e:'💧',l:'AQUA'},{op:'+'},{e:'🧬',l:'TIC'}],answer:'AQUATIC',breakdown:'AQUA + TIC = AQUATIC',explain:"Aquatic ecosystems are water-based. They include freshwater (ponds, streams, lakes, rivers) and marine (oceans, estuaries). They cover 71% of Earth and support 50%+ of biodiversity!"},
    {fragments:[{e:'🌿',l:'PHYTO'},{op:'+'},{e:'🔬',l:'PLANK'},{op:'+'},{e:'🦠',l:'TON'}],answer:'PHYTOPLANKTON',breakdown:'PHYTO + PLANK + TON = PHYTOPLANKTON',explain:"Phytoplankton are microscopic marine algae. They produce 50% of Earth's oxygen and form the base of all ocean food chains. Without them, ocean life would collapse!"},
  ];
  let aquaRebusIdx=0;
  function initAquaRebus(){aquaRebusIdx=0;renderAquaRebus();}
  function renderAquaRebus(){
    const r=aquaRebuses[aquaRebusIdx];
    if(!document.getElementById('aquaRebusArea'))return;
    document.getElementById('aquaRebusNum').textContent=aquaRebusIdx+1;
    document.getElementById('aquaRebusReveal').className='rebus-answer-reveal';
    let html='<div class="rebus-puzzle-card"><div class="rebus-fragments">';
    r.fragments.forEach(f=>{if(f.op){html+=`<div class="rebus-plus">${f.op}</div>`;}else{html+=`<div class="rebus-fragment"><div class="rf-emoji">${f.e}</div><small style="font-size:0.7rem;color:var(--text-muted)">${f.l}</small></div>`;} });
    html+=`</div><div class="rebus-equals">=</div><div class="rebus-question">?</div><div class="rebus-hint-text">💡 An aquatic ecology term (${r.answer.length} letters)</div></div>`;
    document.getElementById('aquaRebusArea').innerHTML=html;
  }
  function showAquaRebus(){
    const r=aquaRebuses[aquaRebusIdx];
    const rev=document.getElementById('aquaRebusReveal');
    rev.className='rebus-answer-reveal show';
    rev.innerHTML=`<div class="rar-word">🎉 ${r.answer}</div><div class="rar-breakdown">${r.breakdown}</div><div class="rar-explain">${r.explain}</div>`;
    addXP(20);
  }
  function nextAquaRebus(){aquaRebusIdx=(aquaRebusIdx+1)%aquaRebuses.length;renderAquaRebus();}

  // ═══════════════ INITIALIZE ALL NEW GAMES ═══════════════
  setTimeout(function(){
    initEcoMcq();
    initFcMcq();
    initFwTf();
    initFwRebus();
    initSuccOrder();
    initSuccMcq();
    initTerrMcq();
    initAquaMcq();
    initAquaMatch();
    initAquaRebus();
  }, 300);

    })();

    /* ═══════════════ EXPOSE NEW GAME FUNCTIONS TO GLOBAL SCOPE ═══════════════ */
    /* All functions inside the IIFE above must be accessible from HTML onclick attrs */
    window.ecoMcqNext = function(){if(typeof ecoMcqIdx!=='undefined'){ecoMcqIdx++;renderEcoMcq();}};
    window.fcMcqNext = function(){if(typeof fcMcqIdx!=='undefined'){fcMcqIdx++;renderFcMcq();}};
    window.answerFwTf = function(val){
      var fwTfQuestions=[{q:'A food web is more realistic than a food chain because most animals eat more than one type of food.',ans:true,exp:'TRUE! Real animals eat multiple food sources. A fox eats rabbits, mice, berries, and insects — food webs represent reality.'},{q:'Wolves were removed from Yellowstone and reintroduced in 1995, causing rivers to literally change course.',ans:true,exp:'TRUE! When 14 wolves returned in 1995, they changed elk behavior → vegetation recovered → beavers returned → rivers changed course!'},{q:'Removing a keystone species has no significant effect on the food web.',ans:false,exp:'FALSE! Removing a keystone species can COLLAPSE the entire web. Sea otters → urchins → kelp forest — all connected!'},{q:'A food web has more stability than a food chain because of multiple energy pathways.',ans:true,exp:'TRUE! If one species disappears in a web, energy can still flow through alternative pathways. More connections = more stability!'},{q:'Bees pollinate over 75% of the world\'s food crops.',ans:true,exp:'TRUE! Bees are a keystone pollinator species. Without them, 75% of flowering plants would disappear. Bee conservation is critical!'},{q:'A trophic cascade means changes at one level ONLY affect the level directly above or below.',ans:false,exp:'FALSE! Trophic cascades ripple through the ENTIRE food web. Removing wolves in Yellowstone affected plants, rivers, fish, birds — everything!'},{q:'All food webs start with producers at the base.',ans:true,exp:'TRUE! Phytoplankton in oceans, grass in grasslands, trees in forests — producers always form the foundation.'},{q:'Invasive species can disrupt existing food web connections.',ans:true,exp:'TRUE! Nile Perch introduced to Lake Victoria caused extinction of 200+ native fish species, destroying the food web in decades.'},{q:'Food webs are unaffected by climate change.',ans:false,exp:'FALSE! Climate change shifts species ranges and disrupts timing. When predator and prey are out of sync, food webs collapse.'},{q:'Phytoplankton produce 50% of Earth\'s oxygen.',ans:true,exp:'TRUE! Every other breath comes from the ocean. Phytoplankton produce more oxygen than all rainforests combined!'}];
      var idx=window._fwTfIdx||0;
      if(idx>=fwTfQuestions.length)return;
      var q=fwTfQuestions[idx];
      document.getElementById('fwTfTrue').disabled=true;
      document.getElementById('fwTfFalse').disabled=true;
      var fb=document.getElementById('fwTfFeedback');
      var correct=window._fwTfCorrect||0;
      if(val===q.ans){correct++;if(typeof addXP!=='undefined')addXP(10);fb.textContent='✅ '+q.exp;fb.className='game-feedback success';}
      else{fb.textContent='❌ '+q.exp;fb.className='game-feedback error';}
      window._fwTfCorrect=correct;
      document.getElementById('fwTfScore').textContent=correct;
      setTimeout(function(){
        idx++; window._fwTfIdx=idx;
        if(idx<fwTfQuestions.length){
          document.getElementById('fwTfQ').textContent='Statement '+(idx+1)+'/10: '+fwTfQuestions[idx].q;
          document.getElementById('fwTfFeedback').textContent='Is this TRUE or FALSE?';
          document.getElementById('fwTfFeedback').className='game-feedback info';
          document.getElementById('fwTfTrue').disabled=false;
          document.getElementById('fwTfFalse').disabled=false;
        }else{
          fb.textContent='🎉 Finished! Score: '+correct+'/10. '+(correct>=8?'Food Web Expert! 🕸️':correct>=5?'Good understanding! 👍':'Keep learning! 📚');
          fb.className='game-feedback success';
        }
      },2000);
    };
    (function(){var q=document.getElementById('fwTfQ');if(q)q.textContent='Statement 1/10: A food web is more realistic than a food chain because most animals eat more than one type of food.';window._fwTfIdx=0;window._fwTfCorrect=0;})();
    window.showFwRebus = function(){
      var fwRebuses=[{answer:'FOOD WEB',breakdown:'FOOD + WEB = FOOD WEB',explain:'A food web is an interconnected network of multiple food chains showing realistic feeding relationships in an ecosystem.'},{answer:'KEYSTONE SPECIES',breakdown:'KEY + STONE + SPECIES',explain:'A keystone species has a disproportionately large impact on its ecosystem. Remove it and the whole web collapses!'},{answer:'TROPHIC CASCADE',breakdown:'TROPHIC + CASCADE',explain:'A trophic cascade is when a change at one level ripples through the entire food web. Wolves returning to Yellowstone changed the course of rivers!'}];
      var idx=parseInt(document.getElementById('fwRebusNum').textContent||'1')-1;
      var r=fwRebuses[idx];
      var rev=document.getElementById('fwRebusReveal');
      rev.className='rebus-answer-reveal show';
      rev.innerHTML='<div class="rar-word">🎉 '+r.answer+'</div><div class="rar-breakdown">'+r.breakdown+'</div><div class="rar-explain">'+r.explain+'</div>';
      if(typeof addXP!=='undefined')addXP(20);
    };
    window.nextFwRebus = function(){
      var n=parseInt(document.getElementById('fwRebusNum').textContent||'1');
      n=(n%3)+1; document.getElementById('fwRebusNum').textContent=n;
      document.getElementById('fwRebusReveal').className='rebus-answer-reveal';
      var labels=[['🦊 FOOD','+','🕸️ WEB'],['🗝️ KEY','+','🪨 STONE','+','🌟 SPECIES'],['🌊 TROPHIC','+','⛰️ CASCADE']];
      var html='<div class="rebus-puzzle-card"><div class="rebus-fragments">';
      labels[n-1].forEach(function(s){if(s==='+'){html+='<div class="rebus-plus">+</div>';}else{html+='<div class="rebus-fragment"><div class="rf-emoji">'+s.split(' ')[0]+'</div><small style="font-size:0.7rem;color:var(--text-muted)">'+s.split(' ').slice(1).join(' ')+'</small></div>';} });
      html+='</div><div class="rebus-equals">=</div><div class="rebus-question">?</div><div class="rebus-hint-text">💡 Key ecology concept</div></div>';
      document.getElementById('fwRebusArea').innerHTML=html;
    };
    window.checkSuccOrder = window.checkSuccOrder || function(){if(typeof checkSuccOrder==='function')checkSuccOrder();};
    window.resetSuccOrder = window.resetSuccOrder || function(){if(typeof resetSuccOrder==='function')resetSuccOrder();};
    window.nextSuccOrder = window.nextSuccOrder || function(){if(typeof nextSuccOrder==='function')nextSuccOrder();};
    window.succMcqNext = function(){if(typeof succMcqIdx!=='undefined'){succMcqIdx++;renderSuccMcq();}};
    window.terrMcqNext = function(){if(typeof terrMcqIdx!=='undefined'){terrMcqIdx++;renderTerrMcq();}};
    window.aquaMcqNext = function(){if(typeof aquaMcqIdx!=='undefined'){aquaMcqIdx++;renderAquaMcq();}};
    window.showAquaRebus = function(){
      var aquaRebuses=[{answer:'ESTUARY',breakdown:'EST + U + ARY = ESTUARY',explain:'An estuary is where a freshwater river meets the salty ocean. Sundarbans & Chilika Lake are Indian examples!'},{answer:'AQUATIC',breakdown:'AQUA + TIC = AQUATIC',explain:'Aquatic ecosystems cover 71% of Earth and support 50%+ of biodiversity!'},{answer:'PHYTOPLANKTON',breakdown:'PHYTO + PLANK + TON',explain:'Phytoplankton produce 50% of Earth\'s oxygen and form the base of all ocean food chains!'}];
      var idx=parseInt(document.getElementById('aquaRebusNum').textContent||'1')-1;
      var r=aquaRebuses[idx];
      var rev=document.getElementById('aquaRebusReveal');
      rev.className='rebus-answer-reveal show';
      rev.innerHTML='<div class="rar-word">🎉 '+r.answer+'</div><div class="rar-breakdown">'+r.breakdown+'</div><div class="rar-explain">'+r.explain+'</div>';
      if(typeof addXP!=='undefined')addXP(20);
    };
    window.nextAquaRebus = function(){
      var n=parseInt(document.getElementById('aquaRebusNum').textContent||'1');
      n=(n%3)+1; document.getElementById('aquaRebusNum').textContent=n;
      document.getElementById('aquaRebusReveal').className='rebus-answer-reveal';
      var labels=[[['🌊','EST'],['+',''],[['🐮','U']],['+',''],[['🌿','ARY']]],[['💧','AQUA'],['+',''],[['🧬','TIC']]],[['🌿','PHYTO'],['+',''],[['🔬','PLANK'],['+',''],[['🦠','TON']]]]];
      var emojis=[['🌊 EST','+','🐮 U','+','🌿 ARY'],['💧 AQUA','+','🧬 TIC'],['🌿 PHYTO','+','🔬 PLANK','+','🦠 TON']];
      var html='<div class="rebus-puzzle-card"><div class="rebus-fragments">';
      emojis[n-1].forEach(function(s){if(s==='+'){html+='<div class="rebus-plus">+</div>';}else{var parts=s.split(' ');html+='<div class="rebus-fragment"><div class="rf-emoji">'+parts[0]+'</div><small style="font-size:0.7rem;color:var(--text-muted)">'+parts.slice(1).join(' ')+'</small></div>';}});
      html+='</div><div class="rebus-equals">=</div><div class="rebus-question">?</div><div class="rebus-hint-text">💡 An aquatic ecology term</div></div>';
      document.getElementById('aquaRebusArea').innerHTML=html;
    };

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
  
