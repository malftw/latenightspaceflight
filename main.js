'use strict';

/* ── Starfield ─────────────────────────────────────────────────────────────── */
(function(){
  var c=document.getElementById('starfield'),ctx=c.getContext('2d'),W,H,S=[];
  function resize(){
    var p=c.parentElement;
    W=c.width=p.offsetWidth||window.innerWidth;
    H=c.height=p.offsetHeight||window.innerHeight;
  }
  function mk(){return{x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.1+.2,a:Math.random()*.65+.1,vx:(Math.random()-.5)*.055,vy:(Math.random()-.5)*.055};}
  function init(){resize();S=Array.from({length:180},mk);}
  function draw(){
    ctx.clearRect(0,0,W,H);
    S.forEach(function(s){
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle='rgba(255,255,255,'+s.a+')';ctx.fill();
      s.x+=s.vx;s.y+=s.vy;
      if(s.x<0)s.x=W;if(s.x>W)s.x=0;if(s.y<0)s.y=H;if(s.y>H)s.y=0;
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize',function(){resize();S=S.map(mk);});
  requestAnimationFrame(function(){init();draw();});
})();

/* ── Scroll reveal ─────────────────────────────────────────────────────────── */
var revEls=document.querySelectorAll('.reveal');
var ro=new IntersectionObserver(function(entries){
  entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');ro.unobserve(e.target);}});
},{threshold:.1,rootMargin:'0px 0px -30px 0px'});
revEls.forEach(function(el){ro.observe(el);});

/* ── Nav active link ───────────────────────────────────────────────────────── */
var secs=document.querySelectorAll('section[id]');
var nls=document.querySelectorAll('.nav-links a');
var no=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){
      nls.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id);});
    }
  });
},{threshold:.35});
secs.forEach(function(s){no.observe(s);});

/* ── Mobile menu ───────────────────────────────────────────────────────────── */
var ham=document.getElementById('ham'),mob=document.getElementById('mob');
ham.addEventListener('click',function(){mob.classList.toggle('open');});
ham.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();mob.classList.toggle('open');}});
window.closeMob=function(){mob.classList.remove('open');};

/* ── Count-up: .stat-num[data-count] ──────────────────────────────────────── */
var cnEls=document.querySelectorAll('.stat-num[data-count]');
var co=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(!e.isIntersecting)return;
    var el=e.target,tgt=parseInt(el.getAttribute('data-count')),sfx=el.getAttribute('data-sfx')||'',dur=1100,t0=performance.now();
    function tick(now){
      var p=Math.min((now-t0)/dur,1),v=Math.floor(p*p*tgt);
      el.textContent=v.toLocaleString()+sfx;
      if(p<1){requestAnimationFrame(tick);}else{el.textContent=tgt.toLocaleString()+sfx;}
    }
    requestAnimationFrame(tick);
    co.unobserve(el);
  });
},{threshold:.5});
cnEls.forEach(function(el){co.observe(el);});

/* ── Stagger grid children ─────────────────────────────────────────────────── */
document.querySelectorAll('.sci-grid,.fetch-grid,.stat-grid,.stat-hero,.stat-reach').forEach(function(g){
  Array.from(g.children).forEach(function(c,i){c.style.transitionDelay=(i*55)+'ms';});
});

/* ── Page load complete ────────────────────────────────────────────────── */
document.body.classList.add('loaded');