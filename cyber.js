/* ===== CYBER BRUTALISM — animations ===== */
(()=>{
const $=(s,c=document)=>[...c.querySelectorAll(s)];

// 1. Écran de boot (une seule fois par session)
const boot=document.getElementById('boot');
if(boot){
  if(sessionStorage.getItem('booted')){boot.remove()}
  else{
    const L=['> INIT SYSTEM...','> LOADING MODULES [OK]','> SCAN IDENTITY... SEKA_ALEXANDRE_DAVIS','> ACCESS GRANTED_'];
    const pre=boot.querySelector('pre');let i=0;
    (function n(){if(i<L.length){pre.textContent+=L[i++]+'\n';setTimeout(n,320)}else setTimeout(()=>{boot.classList.add('off');sessionStorage.setItem('booted',1)},400)})();
  }
}

// 2. Horloge système
const clk=document.getElementById('clock');
if(clk)setInterval(()=>{clk.textContent=new Date().toLocaleTimeString('fr-FR')},1000);

// 3. Pluie de code (canvas)
const cv=document.getElementById('rain');
if(cv){
  const x=cv.getContext('2d');let w,h,cols,d;
  const rs=()=>{w=cv.width=innerWidth;h=cv.height=innerHeight;cols=Math.floor(w/18);d=Array(cols).fill(1)};rs();addEventListener('resize',rs);
  setInterval(()=>{
    x.fillStyle='rgba(7,8,10,.12)';x.fillRect(0,0,w,h);x.fillStyle='#c6ff00';x.font='14px monospace';
    d.forEach((y,i)=>{x.fillText(Math.random()>.5?'1':'0',i*18,y*18);d[i]=y*18>h&&Math.random()>.975?0:y+1});
  },60);
}

// 4. Machine à écrire (slogan)
$('[data-type]').forEach(el=>{
  const t=el.dataset.type;let i=0;
  const s=setInterval(()=>{el.firstChild.textContent=t.slice(0,++i);if(i>=t.length)clearInterval(s)},45);
});

// 5. Portrait « scan hacker » : calques glitch + coordonnées + tilt
$('.scan').forEach(sc=>{
  const base=sc.querySelector('.p-base');
  ['a','b'].forEach(k=>{const c=base.cloneNode();c.className='gl '+k;c.alt='';sc.insertBefore(c,sc.querySelector('.mesh'))});
  const cs=sc.querySelectorAll('.coords i');
  setInterval(()=>cs.forEach(e=>e.textContent=(Math.random()*100-30).toFixed(4)),700);
  const p=sc.querySelector('[data-count]');
  if(p){let v=0;const s=setInterval(()=>{v+=Math.ceil(Math.random()*6);if(v>=87){v=87;clearInterval(s)}p.textContent=v},80)}
  sc.parentElement.addEventListener('mousemove',e=>{
    const r=sc.getBoundingClientRect(),dx=(e.clientX-r.left)/r.width-.5,dy=(e.clientY-r.top)/r.height-.5;
    sc.style.transform=`perspective(700px) rotateY(${dx*14}deg) rotateX(${-dy*14}deg)`});
  sc.parentElement.addEventListener('mouseleave',()=>sc.style.transform='');
});

// 6. Apparition au scroll + barres animées
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;e.target.classList.add('in');
  $('.bar i[data-w]',e.target).forEach(b=>b.style.width=b.dataset.w+'%');io.unobserve(e.target)
}),{threshold:.15});
$('.rv').forEach(e=>io.observe(e));

// 7. Curseur custom
const cur=document.getElementById('cur');
if(cur&&matchMedia('(hover:hover)').matches){
  addEventListener('mousemove',e=>{cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px'});
  $('a,button,.card').forEach(e=>{e.addEventListener('mouseenter',()=>cur.classList.add('h'));e.addEventListener('mouseleave',()=>cur.classList.remove('h'))});
}
})();
