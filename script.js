const nav=document.querySelector('.nav');
const menuBtn=document.querySelector('.menu-btn');
const mobileMenu=document.querySelector('.mobile-menu');

window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>50),{passive:true});

menuBtn?.addEventListener('click',()=>{
  const open=mobileMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded',String(open));
});
mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const modal=document.getElementById('modal');
const openModal=()=>{document.querySelector('#selectedDestination b')?.replaceChildren('Any destination');modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open')};
const closeModal=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')};
document.querySelectorAll('[data-open-modal]').forEach(b=>b.addEventListener('click',openModal));
document.querySelectorAll('[data-close-modal]').forEach(b=>b.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

const form=document.getElementById('leadForm');
form?.addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(form);
  const message=`Hello Embassy of Education, I would like to discuss my international education journey.\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\nDestination: ${data.get('country')}\nStage: ${data.get('stage')}`;
  const encoded=encodeURIComponent(message);
  document.getElementById('formStatus').innerHTML=`Your enquiry is ready. <a href="https://wa.me/919638955666?text=${encoded}" target="_blank" rel="noopener noreferrer">Continue on WhatsApp ↗</a>`;
});

if(window.matchMedia('(pointer:fine)').matches){
  const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');
  let mx=0,my=0,rx=0,ry=0;
  window.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    dot.style.left=mx+'px';dot.style.top=my+'px';
  });
  const tick=()=>{
    rx+=(mx-rx)*.16;ry+=(my-ry)*.16;
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    requestAnimationFrame(tick);
  }; tick();
  document.querySelectorAll('a,button,.destination-scene,.service-item').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ring.style.width='52px';ring.style.height='52px';ring.style.background='rgba(255,200,0,.08)';ring.style.borderColor='var(--yellow)'});
    el.addEventListener('mouseleave',()=>{ring.style.width='32px';ring.style.height='32px';ring.style.background='transparent';ring.style.borderColor='rgba(255,255,255,.65)'});
  });
  document.querySelectorAll('.magnetic').forEach(el=>{
    el.addEventListener('mousemove',e=>{
      const r=el.getBoundingClientRect();
      el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`;
    });
    el.addEventListener('mouseleave',()=>el.style.transform='');
  });
}

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const target=document.querySelector(a.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'})}
  })
});


/* ===== INTERACTIVE WEBGL GLOBE ===== */
(() => {
  const mount=document.getElementById('globeStage');
  if(!mount || !window.THREE) return;

  mount.innerHTML='<div class="globe-tooltip" id="globeTooltip"><small>STUDY DESTINATION</small><b></b></div><div class="globe-hint">RIGHT-DRAG TO ROTATE · WHEEL TO ZOOM · CLICK A DESTINATION</div>';
  const tooltip=mount.querySelector('#globeTooltip');
  const tooltipName=tooltip.querySelector('b');

  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(28,1,.1,100);
  camera.position.set(0,0,3.55);

  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:false});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000,0);
  mount.appendChild(renderer.domElement);

  const globeRoot=new THREE.Group();
  scene.add(globeRoot);
  const globe=new THREE.Group();
  globeRoot.add(globe);

  // Slightly smaller visual globe inside the full canvas, so it is never cropped.
  const radius=.92;

  // A real earth map gives the globe visible continental/country geography.
  const loader=new THREE.TextureLoader();
  loader.setCrossOrigin('anonymous');
  loader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg',texture=>{
    texture.colorSpace=THREE.SRGBColorSpace;
    const material=new THREE.MeshBasicMaterial({map:texture,color:0x6d67b0,transparent:true,opacity:.78});
    const sphere=globe.getObjectByName('earthSurface');
    if(sphere) sphere.material=material;
  });

  const earthSurface=new THREE.Mesh(
    new THREE.SphereGeometry(radius,96,96),
    new THREE.MeshBasicMaterial({color:0x332b76,transparent:true,opacity:.24})
  );
  earthSurface.name='earthSurface';
  globe.add(earthSurface);

  // Fine wireframe keeps the abstract Embassy aesthetic over the map.
  const wire=new THREE.Mesh(
    new THREE.SphereGeometry(radius+.008,64,64),
    new THREE.MeshBasicMaterial({color:0x776bd1,transparent:true,opacity:.19,wireframe:true})
  );
  globe.add(wire);

  // Atmospheric shell.
  const atmosphere=new THREE.Mesh(
    new THREE.SphereGeometry(radius*1.045,64,64),
    new THREE.MeshBasicMaterial({color:0x5e4fc3,transparent:true,opacity:.045,side:THREE.BackSide})
  );
  globe.add(atmosphere);

  const destinations=[
    {name:'United States',short:'USA',region:'North America',lat:38,lon:-97},
    {name:'Canada',short:'CANADA',region:'North America',lat:56,lon:-106},
    {name:'United Kingdom',short:'UK',region:'Europe',lat:54,lon:-2},
    {name:'Europe',short:'EUROPE',region:'Europe',lat:50,lon:15},
    {name:'Australia',short:'AUSTRALIA',region:'Oceania',lat:-25,lon:134},
    {name:'India',short:'INDIA',region:'South Asia',lat:21,lon:78}
  ];

  function latLon(lat,lon,r=radius+.035){
    const phi=(90-lat)*Math.PI/180;
    const theta=(lon+180)*Math.PI/180;
    return new THREE.Vector3(
      -r*Math.sin(phi)*Math.cos(theta),
      r*Math.cos(phi),
      r*Math.sin(phi)*Math.sin(theta)
    );
  }

  const nodes=[];
  const nodeMaterial=new THREE.MeshBasicMaterial({color:0xffc800});
  const nodeGlowMaterial=new THREE.MeshBasicMaterial({color:0xffc800,transparent:true,opacity:.18,side:THREE.DoubleSide});

  destinations.forEach((d,index)=>{
    const p=latLon(d.lat,d.lon);
    const group=new THREE.Group();
    group.position.copy(p);
    group.userData.destination=d;

    const dot=new THREE.Mesh(new THREE.SphereGeometry(index===5?.038:.028,24,24),nodeMaterial);
    dot.userData.destination=d;
    group.add(dot);

    const glow=new THREE.Mesh(new THREE.RingGeometry(index===5?.07:.055,index===5?.085:.072,32),nodeGlowMaterial);
    glow.lookAt(p.clone().multiplyScalar(2));
    group.add(glow);

    globe.add(group);
    nodes.push(group);
  });

  // Connection arcs from India to each destination.
  const india=latLon(21,78);
  destinations.filter(d=>d.name!=='India').forEach(d=>{
    const end=latLon(d.lat,d.lon);
    const mid=india.clone().add(end).normalize().multiplyScalar(1.36);
    const curve=new THREE.QuadraticBezierCurve3(india,end,mid);
    const line=new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(curve.getPoints(60)),
      new THREE.LineBasicMaterial({color:0xffc800,transparent:true,opacity:.34})
    );
    globe.add(line);
  });

  // Ambient star field.
  const starPositions=new Float32Array(750*3);
  for(let i=0;i<750;i++){
    const r=1.7+Math.random()*1.3, u=Math.random()*Math.PI*2, v=Math.acos(2*Math.random()-1);
    starPositions[i*3]=r*Math.sin(v)*Math.cos(u);
    starPositions[i*3+1]=r*Math.cos(v);
    starPositions[i*3+2]=r*Math.sin(v)*Math.sin(u);
  }
  const starGeo=new THREE.BufferGeometry();
  starGeo.setAttribute('position',new THREE.BufferAttribute(starPositions,3));
  globeRoot.add(new THREE.Points(starGeo,new THREE.PointsMaterial({color:0xffc800,size:.008,transparent:true,opacity:.5})));

  // Labels live in HTML so they remain crisp.
  nodes.forEach((node,i)=>{
    const label=document.createElement('div');
    label.className='destination-node-label';
    label.textContent=destinations[i].short;
    label.style.display='none';
    mount.appendChild(label);
    node.userData.label=label;
  });

  const raycaster=new THREE.Raycaster();
  const pointer=new THREE.Vector2();
  let hovered=null;
  let dragging=false;
  let suppressClick=false;
  let lastX=0,lastY=0;
  let rotationVelocityX=.0007;
  let rotationVelocityY=0;
  let zoomTarget=3.55;

  function setPointer(e){
    const rect=renderer.domElement.getBoundingClientRect();
    pointer.x=((e.clientX-rect.left)/rect.width)*2-1;
    pointer.y=-((e.clientY-rect.top)/rect.height)*2+1;
  }

  function intersectNode(e){
    setPointer(e);
    raycaster.setFromCamera(pointer,camera);
    const hits=raycaster.intersectObjects(nodes,true);
    return hits.length ? hits[0].object.parent : null;
  }

  function showTooltip(node,e){
    if(!node) return;
    hovered=node;
    const d=node.userData.destination;
    tooltipName.textContent=d.name;
    tooltip.classList.add('show');
    const rect=mount.getBoundingClientRect();
    tooltip.style.left=(e.clientX-rect.left)+'px';
    tooltip.style.top=(e.clientY-rect.top)+'px';
    mount.style.cursor='pointer';
  }

  function hideTooltip(){
    hovered=null;tooltip.classList.remove('show');
    mount.style.cursor=dragging?'grabbing':'grab';
  }

  function openDestination(d){
    const modal=document.getElementById('modal');
    const select=document.querySelector('#leadForm select[name="country"]');
    const badge=document.getElementById('selectedDestination');
    if(select){
      const wanted=d.name==='Europe'?'Europe':d.name;
      const option=[...select.options].find(o=>o.textContent.toLowerCase()===wanted.toLowerCase());
      if(option) select.value=option.value;
    }
    if(badge) badge.querySelector('b').textContent=d.name;
    modal?.classList.add('open');
    modal?.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  }

  renderer.domElement.addEventListener('contextmenu',e=>e.preventDefault());
  renderer.domElement.addEventListener('pointerdown',e=>{
    if(e.button!==2) return;
    dragging=true; suppressClick=false; lastX=e.clientX;lastY=e.clientY;
    renderer.domElement.setPointerCapture?.(e.pointerId);
    mount.style.cursor='grabbing';
  });
  renderer.domElement.addEventListener('pointermove',e=>{
    if(dragging && e.buttons===2){
      const dx=e.clientX-lastX,dy=e.clientY-lastY;
      if(Math.abs(dx)+Math.abs(dy)>2) suppressClick=true;
      globeRoot.rotation.y += dx*.006;
      globeRoot.rotation.x += dy*.004;
      globeRoot.rotation.x=Math.max(-.72,Math.min(.72,globeRoot.rotation.x));
      rotationVelocityX=dx*.0008;rotationVelocityY=dy*.0005;
      lastX=e.clientX;lastY=e.clientY;
      hideTooltip();
      return;
    }
    const node=intersectNode(e);
    if(node) showTooltip(node,e); else hideTooltip();
  });
  renderer.domElement.addEventListener('pointerup',e=>{
    if(e.button===2){dragging=false;mount.style.cursor=hovered?'pointer':'grab';}
  });
  renderer.domElement.addEventListener('click',e=>{
    if(suppressClick){suppressClick=false;return;}
    const node=intersectNode(e);
    if(node) openDestination(node.userData.destination);
  });
  renderer.domElement.addEventListener('wheel',e=>{
    e.preventDefault();
    zoomTarget=Math.max(2.7,Math.min(5.0,zoomTarget+e.deltaY*.0018));
  },{passive:false});

  function resize(){
    const w=Math.max(1,mount.clientWidth),h=Math.max(1,mount.clientHeight);
    camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);
  }
  window.addEventListener('resize',resize);
  resize();

  const clock=new THREE.Clock();
  function render(){
    requestAnimationFrame(render);
    const dt=Math.min(clock.getDelta(),.033);
    if(!dragging){
      globeRoot.rotation.y += rotationVelocityX*dt*60;
      globeRoot.rotation.x += rotationVelocityY*dt*60;
      rotationVelocityX*=.965;rotationVelocityY*=.965;
      if(Math.abs(rotationVelocityX)<.00004) rotationVelocityX=.00004;
    }
    camera.position.z += (zoomTarget-camera.position.z)*.08;

    // Keep labels locked to their destination points as the globe rotates.
    nodes.forEach(node=>{
      const label=node.userData.label;
      const world=node.getWorldPosition(new THREE.Vector3());
      const projected=world.clone().project(camera);
      const cameraSpace=world.clone().applyMatrix4(camera.matrixWorldInverse);
      const visible=cameraSpace.z < -0.05 && projected.z<1;
      if(!visible){label.style.display='none';return;}
      const x=(projected.x*.5+.5)*mount.clientWidth;
      const y=(-projected.y*.5+.5)*mount.clientHeight;
      label.style.display='block';label.style.left=x+'px';label.style.top=y+'px';
      label.style.opacity=node===hovered?'1':'.72';
    });
    renderer.render(scene,camera);
  }
  render();
})();

/* ===== GSAP SCROLL CHOREOGRAPHY ===== */
(() => {
  if(!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  // Reading progress.
  gsap.to('.page-progress span',{
    width:'100%',
    ease:'none',
    scrollTrigger:{trigger:document.body,start:'top top',end:'bottom bottom',scrub:.25}
  });

  // Section number changes — total is derived from the actual section count so it can never drift out of sync.
  const sections=[...document.querySelectorAll('main > section')];
  const counterTotal=document.querySelector('.section-counter span');
  const counterCurrent=document.querySelector('.section-counter b');
  if(counterTotal) counterTotal.textContent=String(sections.length).padStart(2,'0');
  sections.forEach((section,i)=>{
    ScrollTrigger.create({
      trigger:section,
      start:'top center',
      end:'bottom center',
      onEnter:()=>{if(counterCurrent)counterCurrent.textContent=String(i+1).padStart(2,'0')},
      onEnterBack:()=>{if(counterCurrent)counterCurrent.textContent=String(i+1).padStart(2,'0')}
    });
  });

  // Hero cinematic depth.
  gsap.to('.hero-image',{yPercent:14,scale:1.14,ease:'none',
    scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1.1}});
  gsap.to('.hero-content',{yPercent:-18,opacity:.25,ease:'none',
    scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
  gsap.to('.hero h1',{letterSpacing:'-.095em',scale:.94,ease:'none',
    scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});

  // Image depth across editorial sections.
  ['.statement-image img','.editorial-image img','.cta-bg img'].forEach(sel=>{
    gsap.utils.toArray(sel).forEach(img=>{
      gsap.fromTo(img,{scale:1.15,yPercent:-4},{scale:1,yPercent:7,ease:'none',
        scrollTrigger:{trigger:img.parentElement,start:'top bottom',end:'bottom top',scrub:1}});
    });
  });

  // Services cascade.
  gsap.utils.toArray('.service-item').forEach((item,i)=>{
    gsap.from(item,{x:i%2?-45:45,opacity:0,duration:.85,ease:'power3.out',
      scrollTrigger:{trigger:item,start:'top 85%'}});
  });

  // Process line and cards.
  gsap.from('.process-track article',{y:45,opacity:0,stagger:.12,duration:.8,ease:'power3.out',
    scrollTrigger:{trigger:'.process-track',start:'top 72%'}});
  gsap.from('.process-line span',{width:'0%',duration:1.7,ease:'power2.inOut',
    scrollTrigger:{trigger:'.process-track',start:'top 72%'}});

  // Giant "YOUR WORLD AWAITS" composition.
  const uni=gsap.timeline({scrollTrigger:{trigger:'.universe',start:'top bottom',end:'bottom top',scrub:1}});
  uni.fromTo('.universe-word:nth-child(1)',{x:-180},{x:120},0);
  uni.fromTo('.universe-word:nth-child(2)',{x:180},{x:-80},0);
  uni.fromTo('.universe-word:nth-child(3)',{x:-100},{x:170},0);
  uni.to('.universe-orbit',{rotation:180},0);

  // Subtle magnetic hover for premium CTAs.
  document.querySelectorAll('.btn').forEach(btn=>{
    btn.addEventListener('mousemove',e=>{
      const r=btn.getBoundingClientRect();
      gsap.to(btn,{x:(e.clientX-r.left-r.width/2)*.1,y:(e.clientY-r.top-r.height/2)*.1,duration:.25});
    });
    btn.addEventListener('mouseleave',()=>gsap.to(btn,{x:0,y:0,duration:.5,ease:'elastic.out(1,.45)'}));
  });

  // Refresh after fonts/images settle.
  setTimeout(()=>ScrollTrigger.refresh(),1200);
})();


/* ===== DESTINATION PINNED SCROLL ===== */
(() => {
  if(!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const section=document.querySelector('.destinations-scrolly');
  const track=document.querySelector('.destinations-scrolly .destination-track');
  const scenes=gsap.utils.toArray('.destination-scene');
  if(!section || !track || !scenes.length) return;

  const names=['UNITED STATES','CANADA','UNITED KINGDOM','AUSTRALIA','EUROPE'];
  const activeName=document.querySelector('.destination-active-name');
  const count=document.querySelector('.destination-count b');
  const progress=document.querySelector('.destination-progress span');
  const bottomProgress=document.querySelector('.destination-line i');

  function desktopWidth(){
    return Math.max(0,track.scrollWidth - window.innerWidth + window.innerWidth*.12);
  }

  // The whole section becomes a cinematic horizontal journey.
  const horizontal=gsap.to(track,{
    x:()=>-desktopWidth(),
    ease:'none',
    scrollTrigger:{
      trigger:section,
      start:'top top',
      end:()=>`+=${Math.max(window.innerHeight*4.2, window.innerWidth*3.8)}`,
      scrub:1,
      pin:'.destination-pin',
      anticipatePin:1,
      invalidateOnRefresh:true,
      onUpdate:self=>{
        const p=self.progress;
        const index=Math.min(scenes.length-1,Math.floor(p*scenes.length));
        const local=(p*scenes.length)-index;

        scenes.forEach((scene,i)=>{
          const distance=Math.abs(i-(p*(scenes.length-1)));
          const focus=Math.max(0,1-distance*.72);
          gsap.set(scene,{
            scale:.72 + focus*.28,
            opacity:.3 + focus*.7,
            filter:`saturate(${.5+focus*.5})`
          });
          const image=scene.querySelector('img');
          if(image) gsap.set(image,{scale:1.12 + (1-focus)*.08});
          scene.classList.toggle('is-active',i===index);
        });

        if(activeName) activeName.textContent=names[index];
        if(count) count.textContent=String(index+1).padStart(2,'0');
        if(progress) gsap.set(progress,{width:`${((index+local)/scenes.length)*100}%`});
        if(bottomProgress) gsap.set(bottomProgress,{width:`${((index+local)/scenes.length)*100}%`});
      }
    }
  });

  // Give each scene a tiny entrance lift as it becomes the focus.
  scenes.forEach((scene,i)=>{
    const heading=scene.querySelector('h3');
    const copy=scene.querySelector('.scene-content > div');
    if(heading){
      gsap.fromTo(heading,{y:35,opacity:.45},{y:0,opacity:1,
        scrollTrigger:{
          trigger:scene,
          containerAnimation:horizontal,
          start:'left 72%',
          end:'left 40%',
          scrub:1
        }
      });
    }
    if(copy){
      gsap.fromTo(copy,{y:20,opacity:.4},{y:0,opacity:1,
        scrollTrigger:{
          trigger:scene,
          containerAnimation:horizontal,
          start:'left 68%',
          end:'left 42%',
          scrub:1
        }
      });
    }
  });

  // On mobile the section becomes native touch horizontal scrolling.
  const mobile=window.matchMedia('(max-width: 900px)');
  function mobileMode(){
    if(mobile.matches){
      ScrollTrigger.getAll().filter(t=>t.trigger===section).forEach(t=>t.kill());
      scenes.forEach(s=>gsap.set(s,{clearProps:'all'}));
    }
  }
  // Run once on load (not just on later breakpoint changes) so the pin never
  // gets set up on a page that started out at mobile width.
  mobileMode();
  mobile.addEventListener?.('change',mobileMode);
})();


/* ===== FLIGHT OPENING: SCROLL-DRIVEN CLOUD PASS ===== */
(() => {
  if(!window.gsap || !window.ScrollTrigger) return;

  const hero=document.querySelector('.flight-hero');
  const transition=document.querySelector('.flight-cloud-transition');
  const manifesto=document.querySelector('.manifesto');
  if(!hero || !transition || !manifesto) return;

  const deep=document.querySelector('.cloud-layer-deep');
  const middle=document.querySelector('.cloud-layer-middle');
  const near=document.querySelector('.cloud-layer-near');
  const glow=document.querySelector('.cloud-glow');
  const atmosphere=document.querySelector('.transition-atmosphere');
  const sweep=document.querySelector('.cloud-light-sweep');
  if(!deep || !middle || !near) return;

  // Initial state: no cloud is visible.
  gsap.set(transition,{autoAlpha:0});
  gsap.set(deep,{y:'112%',x:'-3%',rotate:-1,scale:1.14});
  gsap.set(middle,{y:'118%',x:'2%',rotate:.6,scale:1.09});
  gsap.set(near,{y:'124%',x:'-1%',rotate:-.4,scale:1.05});
  gsap.set(glow,{y:'100%',opacity:0});
  gsap.set(atmosphere,{opacity:0});
  gsap.set(sweep,{opacity:0});

  /*
   * One continuous, organic timeline (no single layer ever moves in a flat
   * straight line — each gets two or three waypoints so the bank drifts and
   * billows rather than sliding up like a flat sheet):
   * 0.00–0.30  aircraft/hero remains dominant
   * 0.30–0.63  cloud bank billows up and crosses the camera in layers
   * 0.63–0.80  soft light breaks through the mist, full immersion
   * 0.80–1.00  cloud disperses upward and reveals the next section
   */
  const flight=gsap.timeline({
    scrollTrigger:{
      trigger:hero,
      start:'top top',
      end:'bottom top',
      scrub:1.4,
      invalidateOnRefresh:true
    },
    defaults:{ease:'sine.inOut'}
  });

  flight
    .to(transition,{autoAlpha:1,duration:.03},.27)

    // The aircraft recedes as if the camera is entering the cloud.
    .to('.flight-hero .hero-image',{
      scale:1.16,
      yPercent:-7,
      filter:'blur(2px) saturate(.72) brightness(1.04)',
      duration:.30,
      ease:'none'
    },.27)
    .to('.flight-hero .hero-content',{
      yPercent:-14,
      opacity:0,
      duration:.25,
      ease:'power2.in'
    },.32)
    .to('.flight-hero .hero-bottom',{
      opacity:0,
      y:25,
      duration:.18
    },.32)

    // Far cloud — slow, wide, and given two waypoints so it billows sideways
    // instead of travelling in one flat line.
    .to(deep,{y:'42%',x:'-9%',rotate:-2.4,scale:1.18,duration:.16},.30)
    .to(deep,{y:'-4%',x:'-6%',rotate:-.8,scale:1.2,duration:.17},.46)

    // Middle layer drifts the opposite way, catching up a beat later.
    .to(middle,{y:'46%',x:'8%',rotate:1.6,scale:1.12,duration:.15},.36)
    .to(middle,{y:'-6%',x:'5%',rotate:.4,scale:1.15,duration:.16},.51)

    // Near cloud crosses the camera last and fastest.
    .to(near,{y:'40%',x:'-6%',rotate:-1.2,scale:1.09,duration:.13},.42)
    .to(near,{y:'-9%',x:'-3%',rotate:-.2,scale:1.11,duration:.15},.55)

    .to(atmosphere,{opacity:.75,duration:.15},.46)
    .to(glow,{y:'-18%',opacity:.9,scale:1.22,duration:.2,ease:'power2.out'},.5)

    // Hold the viewer inside the cloud, with a slow contrary drift so the
    // mist keeps breathing rather than freezing mid-scroll.
    .to(deep,{y:'-8%',x:'-2%',rotate:.6,duration:.14},.63)
    .to(middle,{y:'-10%',x:'3%',rotate:-.5,duration:.14},.63)
    .to(near,{y:'-12%',x:'-1%',rotate:.3,duration:.14},.63)

    // Soft light breaks through the mist at the peak of immersion.
    .to(sweep,{opacity:.55,duration:.1},.66)
    .to(sweep,{opacity:0,duration:.14},.76)

    // Cloud disperses upward to reveal the manifesto beneath.
    .to(deep,{y:'-128%',x:'-12%',rotate:-3,scale:1.26,opacity:.15,duration:.28,ease:'power2.inOut'},.72)
    .to(middle,{y:'-135%',x:'11%',rotate:2.2,scale:1.29,opacity:.12,duration:.27,ease:'power2.inOut'},.75)
    .to(near,{y:'-142%',x:'-8%',rotate:-1.4,scale:1.33,opacity:.08,duration:.25,ease:'power2.inOut'},.77)
    .to(glow,{y:'-145%',opacity:0,duration:.22,ease:'power2.in'},.78)
    .to(atmosphere,{opacity:0,duration:.16},.82)
    .to(transition,{autoAlpha:0,duration:.04},.9);

  // Slight lateral wing movement, synchronized to the same scroll.
  gsap.to('.flight-hero .hero-image',{
    xPercent:-2,
    ease:'none',
    scrollTrigger:{
      trigger:hero,
      start:'top top',
      end:'bottom top',
      scrub:1.3
    }
  });

  // Make the reveal feel connected: the manifesto title starts just under the departing cloud.
  gsap.fromTo('.manifesto .manifesto-title',
    {y:55,opacity:.45},
    {
      y:0,opacity:1,ease:'power2.out',
      scrollTrigger:{
        trigger:manifesto,
        start:'top 85%',
        end:'top 48%',
        scrub:1
      }
    }
  );
})();
