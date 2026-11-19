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
rail.innerHTML = items.map(([key, name, desc, color]) => `<article class="product" style="--card-color:${color}"><div class="pic"><img src="microgreens-webp/${key}.webp" alt="Microgreens de ${name}" draggable="false"></div><div class="info"><h3>${name}</h3><p>${desc}</p></div></article>`).join('');
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