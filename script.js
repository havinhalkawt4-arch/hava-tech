gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Lightweight decorative particles
const particles = document.querySelector('.particles');
for (let i = 0; i < 32; i++) { const p = document.createElement('i'); p.className = 'particle'; p.style.left = `${Math.random()*100}%`; p.style.top = `${Math.random()*100}%`; p.style.transform = `scale(${.5 + Math.random()*1.2})`; particles.appendChild(p); if (!reduceMotion) gsap.to(p,{y:`${-20-Math.random()*55}`,x:`${-12+Math.random()*24}`,opacity:.08+Math.random()*.3,duration:4+Math.random()*5,repeat:-1,yoyo:true,ease:'sine.inOut'}); }

window.addEventListener('load', () => {
  const intro = gsap.timeline();
  if (!reduceMotion) gsap.to('.preloader-logo',{y:-10,duration:2.2,repeat:-1,yoyo:true,ease:'sine.inOut'});
  intro.fromTo('.preloader-logo',{opacity:0,scale:.86},{opacity:1,scale:1,duration:.65,ease:'power3.out'})
    .from('.preloader p',{opacity:0,y:10,duration:.45,ease:'power2.out'},'-=.2')
    .to({}, {duration:1.15})
    .to('.preloader',{opacity:0,duration:.55,ease:'power2.inOut',onComplete:()=>document.querySelector('.preloader').remove()})
    .to('.nav',{opacity:1,y:0,duration:.7,ease:'power3.out'},'-=.15')
    .from('.logo-stage',{opacity:0,scale:.75,duration:.8,ease:'back.out(1.4)'},'-=.35')
    .from('.hero-copy',{opacity:0,y:24,stagger:.1,duration:.7,ease:'power3.out'},'-=.45')
    .from('.scroll-cue',{opacity:0,y:10,duration:.5},'-=.15');
  if (!reduceMotion) { gsap.to('.logo-stage',{y:-10,duration:4.8,repeat:-1,yoyo:true,ease:'sine.inOut'}); }
});

gsap.utils.toArray('.reveal').forEach(el=>gsap.from(el,{scrollTrigger:{trigger:el,start:'top 84%'},opacity:0,y:35,filter:'blur(8px)',duration:.85,ease:'power3.out',clearProps:'filter'}));
gsap.from('.skill-card',{scrollTrigger:{trigger:'.skills-grid',start:'top 83%'},opacity:0,y:38,scale:.94,stagger:.1,duration:.7,ease:'power3.out'});
gsap.from('.certificate-card',{scrollTrigger:{trigger:'.certificate-card',start:'top 83%'},opacity:0,scale:.91,duration:.8,ease:'power3.out'});
gsap.from('.social-card',{scrollTrigger:{trigger:'.social-grid',start:'top 84%'},opacity:0,y:36,scale:.96,stagger:.14,duration:.8,ease:'power3.out'});
gsap.from('.phone-strip',{scrollTrigger:{trigger:'.phone-strip',start:'top 90%'},opacity:0,y:16,duration:.6,ease:'power3.out'});
gsap.from('footer',{scrollTrigger:{trigger:'footer',start:'top 96%'},opacity:0,y:18,duration:.65});

const links = document.querySelectorAll('.nav-links a');
links.forEach(link=>link.addEventListener('click',e=>{e.preventDefault();gsap.to(window,{duration:1.1,scrollTo:{y:link.getAttribute('href'),offsetY:94},ease:'power3.inOut'});}));
document.querySelector('.scroll-cue').addEventListener('click',e=>{e.preventDefault();gsap.to(window,{duration:1,scrollTo:'#about',ease:'power3.inOut'});});
ScrollTrigger.create({trigger:'#skills',start:'top center',end:'bottom center',onEnter:()=>setActive('#skills'),onEnterBack:()=>setActive('#skills')});
ScrollTrigger.create({trigger:'#certificate',start:'top center',end:'bottom center',onEnter:()=>setActive('#certificate'),onEnterBack:()=>setActive('#certificate')});
ScrollTrigger.create({trigger:'#contact',start:'top center',onEnter:()=>setActive('#contact'),onLeaveBack:()=>setActive('#skills')});
ScrollTrigger.create({trigger:'#home',start:'top top',end:'bottom center',onEnter:()=>setActive('#home'),onEnterBack:()=>setActive('#home')});
function setActive(id){links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===id));}

if (!reduceMotion) {
  window.addEventListener('mousemove',e=>{const x=(e.clientX/window.innerWidth-.5)*10,y=(e.clientY/window.innerHeight-.5)*10;gsap.to('.logo-stage',{x,y,duration:.8,ease:'power2.out'});gsap.to('.ambient-one',{x:x*2,y:y*2,duration:2});});
  document.querySelectorAll('.skill-card,.social-card,.phone-strip').forEach(card=>{card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();gsap.to(card,{x:(e.clientX-r.left-r.width/2)*.035,y:(e.clientY-r.top-r.height/2)*.035,duration:.4,ease:'power2.out'});});card.addEventListener('mouseleave',()=>gsap.to(card,{x:0,y:0,duration:.55,ease:'elastic.out(1,.5)'}));});
  document.querySelectorAll('.magnetic').forEach(btn=>{btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();gsap.to(btn,{x:(e.clientX-r.left-r.width/2)*.18,y:(e.clientY-r.top-r.height/2)*.25,duration:.3});});btn.addEventListener('mouseleave',()=>gsap.to(btn,{x:0,y:0,duration:.6,ease:'elastic.out(1,.45)'}));});
}

let previousScroll = window.scrollY;
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 130 && currentScroll > previousScroll) gsap.to('.nav', { y: -100, duration: .35, ease: 'power2.out', overwrite: true });
  else gsap.to('.nav', { y: 0, duration: .35, ease: 'power2.out', overwrite: true });
  previousScroll = currentScroll;
}, { passive: true });
