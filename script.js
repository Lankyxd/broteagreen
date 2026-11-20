const palette = {
    hero: ['#d3ec8c', '#83a94d', '#47854d', '#9cc65d'], intro: ['#759c45', '#3e733b', '#9bbd63', '#416a37'], acelga: ['#8cbd4d', '#498b4c', '#bad478'], remolacha: ['#a34c62', '#7e9b47', '#b9d66b'], lechuga: ['#a6c75c', '#689c47', '#d4e49b'], verdeo: ['#729750', '#a1b661', '#386847'], espinaca: ['#5f984b', '#386c3c', '#a1be66']
};
function plantSVG(type) {
    let seed = type.split('').reduce((a, c) => a+c.charCodeAt(0), 0), r = () => {
        seed = (seed*1664525+1013904223)>>>0;
        return seed/4294967296
    };
    let colors = palette[type] || palette.hero;
    let out = '';
    for (let n = 0; n < (type === 'hero' ? 95: 52); n++) {
        let x = r()*660, y = 240+r()*175, h = 55+r()*170, dx = (r()-.5)*85, c = colors[Math.floor(r()*colors.length)], stem = type === 'remolacha' ? '#bc5972': c;
        out += `<g opacity="${.65+r()*.35}"><path d="M${x} ${y} Q${x+dx*.2} ${y-h*.55} ${x+dx} ${y-h}" fill="none" stroke="${stem}" stroke-width="${2+r()*3}" stroke-linecap="round"/><ellipse cx="${x+dx-12}" cy="${y-h-5}" rx="${12+r()*20}" ry="${6+r()*11}" fill="${c}" transform="rotate(-33 ${x+dx-12} ${y-h-5})"/><ellipse cx="${x+dx+13}" cy="${y-h-10}" rx="${13+r()*22}" ry="${6+r()*10}" fill="${c}" transform="rotate(30 ${x+dx+13} ${y-h-10})"/></g>`
    }
    return `<svg viewBox="0 0 660 440" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><radialGradient id="bg${type}"><stop stop-color="${type==='hero'?'#315b36':'#eff3d6'}"/><stop offset="1" stop-color="${type==='hero'?'#173d2a':'#c6d4a9'}"/></radialGradient></defs><rect width="660" height="440" fill="url(#bg${type})"/><ellipse cx="330" cy="404" rx="285" ry="45" fill="#233923" opacity=".28"/>${out}</svg>`
}
document.querySelectorAll('[data-plant]').forEach(el => el.insertAdjacentHTML('afterbegin', plantSVG(el.dataset.plant)));
const items = [
    ["remolacha", "Remolacha", "Color intenso y matices terrosos.", "#a34c62"],
    ["lechuga-verde", "Lechuga verde", "Frescura y suavidad.", "#689c47"],
    ["lechuga-morada", "Lechuga morada", "Color vibrante y sabor delicado.", "#825075"],
    ["ciboulette", "Ciboulette", "Aroma delicado y notas de cebolla.", "#477e44"],
    ["espinaca", "Espinaca", "Sabor verde, delicado y fresco.", "#527842"],
    ["albahaca", "Albahaca", "Aroma fresco y sabor herbal.", "#429f80"],
    ["soja", "Soja", "Textura tierna y sabor suave.", "#78a34c"],
    ["mostaza", "Mostaza", "Notas intensas y ligeramente picantes.", "#bf902b"],
    ["alfalfa", "Alfalfa", "Textura ligera y sabor delicado.", "#72a34b"],
    ["rucula", "Rúcula", "Sabor fresco y ligeramente picante.", "#008b49"],
    ["arveja", "Arveja", "Brotes tiernos con notas dulces.", "#4a8b4f"],
    ["coliflor", "Coliflor", "Sabor suave y textura fresca.", "#488f91"],
    ["chia", "Chía", "Brotes delicados de sabor vegetal.", "#759748"],
    ["zanahoria", "Zanahoria", "Aroma fresco y suaves notas de zanahoria.", "#bd6a32"]
];
const rail = document.querySelector('#carousel');
rail.innerHTML = items.map(([key, name, desc, color]) => `<article class="product" style="--card-color:${color}"><div class="pic"><img src="img/microgreens/${key}.png" alt="Microgreens de ${name}" draggable="false"></div><div class="info"><h3>${name}</h3><p>${desc}</p></div></article>`).join('');
for (const [id, dir] of [['prev', -1], ['next', 1]])document.getElementById(id).onclick = () => rail.scrollBy({
    left: dir*(rail.firstElementChild.offsetWidth+18), behavior: 'smooth'
});
const menu = document.querySelector('.menu'), nav = document.querySelector('nav');
menu.onclick = () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', open)
};
nav.querySelectorAll('a').forEach(a => a.onclick = () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false')
});
if ('IntersectionObserver' in window) {
    document.body.classList.add('js');
    const obs = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target)
        }
    }), {
        threshold: .08
    });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
}
;
const heroArt = document.querySelector('.hero .art');
heroArt.setAttribute('aria-label', 'Envases Brotea de 50 g y 250 g con microgreens frescos');
heroArt.setAttribute('role', 'img');
const packages = document.querySelector('.packages');
const intro = document.createElement('div');
intro.className = 'packages-intro';
intro.innerHTML = '<div class="eyebrow">Presentaciones comerciales</div><h2 class="section-title">Frescura a tu medida.</h2><p class="bigtext">Dos tamaños, una misma esencia: microgreens frescos para disfrutar en casa o en gastronomía.</p>';
packages.prepend(intro);
const container = packages.querySelector('.packboxes');
container.innerHTML = '<article class="pack"><div class="pack-photo small" role="img" aria-label="Envase Brotea de 50 gramos"></div><span class="pack-badge">Para tu hogar</span><h3 class="pack-label">Microgreens · 50 g</h3><p>Una presentación práctica para incorporar frescura a tus comidas de todos los días.</p></article><article class="pack large"><div class="pack-photo large-photo" role="img" aria-label="Envase Brotea de 250 gramos"></div><span class="pack-badge">Formato gastronómico</span><h3 class="pack-label">Microgreens · 250 g</h3><p>Una propuesta pensada para consumidores frecuentes, gastronomía y comercio.</p></article>';
const packageNav = document.getElementById('nav');
const packageLink = document.createElement('a');
packageLink.href = '#presentaciones';
packageLink.textContent = 'Envases';
packageNav.insertBefore(packageLink, packageNav.querySelector('a[href="#compromiso"]'));
packageLink.addEventListener('click', () => {
    packageNav.classList.remove('open');
    document.querySelector('.menu').setAttribute('aria-expanded', 'false')
});
;
(() => {
    const hero = document.querySelector('.hero');
    const art = hero.querySelector('.art');
    const headline = hero.querySelector('h1');
    const desc = hero.querySelector('.hero-copy p');
    const cta = hero.querySelector('.hero-copy .pill');
    const slides = [
    {
        title: 'Cultivados en San Juan.<em>Cosechados con cuidado.</em>', desc: 'Microgreens frescos, cultivados en ambiente controlado. De nuestra producción a tu mesa.', cta: 'Conocé Brotea', href: '#nosotros', alt: 'Envase Brotea de 250 g con microgreens frescos'
    }, {
        title: 'Pequeños brotes.<em>Gran sabor.</em>', desc: 'Descubrí nuestras presentaciones de 50 g y 250 g, pensadas para cada ocasión.', cta: 'Ver presentaciones', href: '#presentaciones', alt: 'Envases Brotea de 50 y 250 gramos'
    }, {
        title: 'Frescura natural.<em>Todos los días.</em>', desc: 'Una nueva forma de sumar color, textura y sabor a tus platos.', cta: 'Descubrí los microgreens', href: '#variedades', alt: 'Envase Brotea de 50 g'
    }
    ];
    art.innerHTML = '';
    const photo = document.createElement('div');
    photo.className = 'hero-photo';
    art.appendChild(photo);
    const controls = document.createElement('div');
    controls.className = 'hero-dots';
    controls.setAttribute('aria-label', 'Diapositivas de portada');
    let index = 0, timer = null, paused = false;;
    function show(i) {
        index = i;
        const s = slides[i];
        photo.dataset.slide = i;
        photo.style.animation = 'none';
        void photo.offsetWidth;
        photo.style.animation = '';
        headline.innerHTML = s.title;
        desc.textContent = s.desc;
        cta.textContent = s.cta;
        cta.href = s.href;
        art.setAttribute('aria-label', s.alt);
        dots.forEach((d, j) => d.setAttribute('aria-current', j === i ? 'true': 'false'));
    }
    const dots = slides.map((s, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('aria-label', `Mostrar diapositiva ${i+1}`);
        btn.addEventListener('click', () => {
            show(i);
            restart()
        });
        controls.appendChild(btn);
        return btn;
    });
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'hero-toggle';
    controls.appendChild(toggle);
    hero.appendChild(controls);
    function restart() {
        clearInterval(timer);
        if (!paused)timer = setInterval(() => show((index+1)%slides.length), 4000);
        toggle.textContent = paused ? 'Reproducir': 'Pausar';
        toggle.setAttribute('aria-label', paused ? 'Reproducir carrusel': 'Pausar carrusel');
    }
    toggle.onclick = () => {
        paused = !paused;
        restart()
    };
    show(0);
    restart();
    const header = document.querySelector('header');
    function updateHeader() {
        header.classList.toggle('scrolled', window.scrollY > 45)
    }
    window.addEventListener('scroll', updateHeader, {
        passive: true
    });
    updateHeader();
})();
;
(() => {
    const carousel = document.querySelector('#carousel');
    const cards = [...carousel.querySelectorAll('.product')];
    if (!cards.length)return;
    const section = carousel.closest('.products');
    const palette = ['#57964e', '#9d547a', '#449d79', '#299998', '#72924a'];
    const labels = cards.map(card => ({
        name: card.querySelector('h3').textContent, description: card.querySelector('.info p').textContent
    }));
    carousel.classList.remove('carousel');
    carousel.classList.add('coverflow');
    carousel.tabIndex = 0;
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-label', 'Carrusel 3D de variedades de microgreens');
    const bottom = document.createElement('div');
    bottom.className = 'coverflow-bottom';
    bottom.innerHTML = '<p class="coverflow-description" aria-live="polite"></p><div class="coverflow-indicators" aria-label="Seleccionar variedad"></div>';
    carousel.after(bottom);
    const description = bottom.querySelector('p'), indicators = bottom.querySelector('.coverflow-indicators');
    let current = 1, position = 1, animationFrame = 0, timer = null, paused = matchMedia('(prefers-reduced-motion: reduce)').matches, inView = false, interacting = false;
    const dots = labels.map((label, i) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-label', `Mostrar ${label.name}`);
        button.onclick = () => {
            setCurrent(i);
            restart()
        };
        indicators.appendChild(button);
        return button
    });
    const toggle = document.createElement('button');
    toggle.className = 'autoplay-toggle';
    toggle.type = 'button';
    indicators.appendChild(toggle);
    toggle.onclick = () => {
        paused = !paused;
        restart()
    };
    cards.forEach((card, i) => {
        if (!card.style.getPropertyValue('--card-color'))card.style.setProperty('--card-color', palette[i%palette.length]);
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Seleccionar ${labels[i].name}`);
        card.onclick = () => {
            setCurrent(i);
            restart()
        };
        card.onkeydown = e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setCurrent(i);
                restart()
            }
        }
    });
    function move(n) {
        setCurrent((current+n+cards.length)%cards.length);
        restart()
    }
    for (const [name, dir, char] of [['prev', -1, '‹'], ['next', 1, '›']]) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `coverflow-btn ${name}`;
        btn.setAttribute('aria-label', dir === 1 ? 'Variedad siguiente': 'Variedad anterior');
        btn.textContent = char;
        btn.onclick = () => move(dir);
        carousel.appendChild(btn)
    }
    function render(at) {
        const width = cards[0].offsetWidth, step = width*(innerWidth <= 800 ? .55: .71), n = cards.length;
        cards.forEach((card, i) => {
            let delta = ((i-at+n/2)%n+n)%n-n/2;
            const abs = Math.abs(delta), scale = abs <= 1 ? 1-.11*abs: Math.max(.65, .89-.16*(abs-1));
            card.style.setProperty('--offset', `${delta*step}px`);
            card.style.setProperty('--angle', `${-Math.sign(delta)*24*Math.min(abs,1)}deg`);
            card.style.setProperty('--scale', scale);
            card.style.setProperty('--opacity', abs < 1.9 ? 1: Math.max(0, 1-(abs-1.9)/.55));
            card.style.setProperty('--z', String(Math.round(1000-abs*100)));
        });
    }
    function finishSelection() {
        cards.forEach((card, i) => {
            const active = i === current, dist = Math.min(Math.abs(i-current), cards.length-Math.abs(i-current));
            card.dataset.active = String(active);
            card.tabIndex = dist <= 1 ? 0: -1;
            card.setAttribute('aria-pressed', String(active));
            dots[i].setAttribute('aria-current', String(active))
        });
        description.textContent = labels[current].description;
        description.classList.remove('changing');
    }
    function setCurrent(index, instant = false) {
        cancelAnimationFrame(animationFrame);
        current = index;
        const n = cards.length;
        const start = position, delta = ((index-start+n/2)%n+n)%n-n/2;
        const destination = start+delta;
        dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
        if (instant || Math.abs(delta) < .01 || matchMedia('(prefers-reduced-motion: reduce)').matches) {
            position = destination;
            render(position);
            finishSelection();
            return
        }
        description.classList.add('changing');
        const begin = performance.now();
        const duration = 1100;
        function frame(now) {
            const p = Math.min(1, (now-begin)/duration);
            const easing = p < .5 ? 4*p*p*p: 1-Math.pow(-2*p+2, 3)/2;
            position = start+delta*easing;
            render(position);
            if (p < 1) {
                animationFrame = requestAnimationFrame(frame)
            }else {
                position = ((destination%n)+n)%n;
                render(position);
                finishSelection()
            }
        }
        animationFrame = requestAnimationFrame(frame);
    }
    function restart() {
        clearInterval(timer);
        if (inView && !paused && !interacting)timer = setInterval(() => setCurrent((current+1)%cards.length), 4000);
        toggle.textContent = paused ? 'Reproducir': 'Pausar';
        toggle.setAttribute('aria-label', paused ? 'Reproducir carrusel': 'Pausar carrusel')
    }
    carousel.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            move(e.key === 'ArrowLeft' ? -1: 1)
        }
    });
    carousel.addEventListener('pointerenter', () => {
        interacting = true;
        restart()
    });
    carousel.addEventListener('pointerleave', () => {
        interacting = false;
        restart()
    });
    carousel.addEventListener('focusin', () => {
        interacting = true;
        restart()
    });
    carousel.addEventListener('focusout', e => {
        if (!carousel.contains(e.relatedTarget)) {
            interacting = false;
            restart()
        }
    });
    let startX = 0, startY = 0;
    carousel.addEventListener('touchstart', e => {
        startX = e.changedTouches[0].clientX;
        startY = e.changedTouches[0].clientY
    }, {
        passive: true
    });
    carousel.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX-startX, dy = e.changedTouches[0].clientY-startY;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy))move(dx < 0 ? 1: -1)
    }, {
        passive: true
    });
    addEventListener('resize', () => render(position));
    if ('IntersectionObserver' in window)new IntersectionObserver(entries => {
        inView = entries[0].isIntersecting;
        restart()
    }, {
        threshold: .25
    }).observe(carousel);
    else inView = true;
    setCurrent(current, true);
    restart();
    const plant = document.querySelector('.intro-visual');
    if (plant && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let pending = false;
        function scrollEffect() {
            if (pending)return;
            pending = true;
            requestAnimationFrame(() => {
                const r = plant.getBoundingClientRect();
                if (r.bottom > 0 && r.top < innerHeight) {
                    const shift = (r.top+r.height/2-innerHeight/2)*.055;
                    plant.style.setProperty('--plant-shift', `${Math.max(-25,Math.min(25,shift))}px`)
                }
                pending = false
            })
        }
        addEventListener('scroll', scrollEffect, {
            passive: true
        });
        scrollEffect()
    }
})();
;
(() => {
    const section = document.querySelector('.gastronomia');
    if (!section)return;
    const background = document.createElement('div');
    background.className = 'gas-fixed-layer';
    background.setAttribute('aria-hidden', 'true');
    document.body.appendChild(background);
    section.classList.add('fixed-background');
    let queued = false;
    function render() {
        queued = false;
        const rect = section.getBoundingClientRect(), height = innerHeight, width = document.documentElement.clientWidth;
        const top = Math.max(0, rect.top), bottom = Math.max(0, height-rect.bottom), left = Math.max(0, rect.left), right = Math.max(0, width-rect.right);
        const visible = rect.bottom > 0 && rect.top < height && rect.right > 0 && rect.left < width;
        background.style.visibility = visible ? 'visible': 'hidden';
        if (visible)background.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px)`;
    }
    function schedule() {
        if (!queued) {
            queued = true;
            requestAnimationFrame(render)
        }
    }
    window.addEventListener('scroll', schedule, {
        passive: true
    });
    window.addEventListener('resize', schedule);
    render();
})();
