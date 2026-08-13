// --- 1. SCROLL REVEAL ANIMATION SYSTEM ---
const revealElements = document.querySelectorAll('.reveal-element');

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  revealElements.forEach((el) => {
    const elTop = el.getBoundingClientRect().top;
    if (elTop < triggerBottom) {
      el.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger initial view

// --- 2. DYNAMIC SCROLL PROGRESS BAR ---
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('scrollProgress').style.width = scrolled + '%';
});

// --- 3. INTERACTIVE COST CALCULATOR ENGINE ---
function calculateTotal() {
  let total = 0;
  
  if (document.getElementById('opt-brand').checked) total += 3500000;
  if (document.getElementById('opt-web').checked) total += 5000000;
  if (document.getElementById('opt-vector').checked) total += 2500000;

  const speedMultiplier = parseFloat(document.getElementById('calc-speed').value);
  total = total * speedMultiplier;

  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(total);

  document.getElementById('totalPrice').innerText = formatted;
}

// --- 4. CANVAS PARTIKEL TERPANCAR ---
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.2;
    this.speedY = (Math.random() - 0.5) * 0.2;
    this.alpha = Math.random() * 0.5 + 0.1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) this.reset();
  }
  draw() {
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim() || '#c5a059';
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < 60; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach((p) => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// --- 5. CURSOR GLOW & SPOTLIGHT ---
const cursor = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

function updateSpotlight(e) {
  const container = document.getElementById('sliderContainer');
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  document.getElementById('spotlight').style.background = `radial-gradient(circle 260px at ${x}px ${y}px, var(--accent-glow) 0%, transparent 80%)`;
}

function revealLayer(val) {
  document.getElementById('finishedLayer').style.clipPath = `polygon(0 0, ${val}% 0, ${val}% 100%, 0 100%)`;
  document.getElementById('dividerLine').style.left = `${val}%`;
}

// --- 6. AURA VISUAL SWITCHER ---
function setAura(aura) {
  if (aura === 'gold') {
    document.documentElement.style.setProperty('--accent-color', '#c5a059');
    document.documentElement.style.setProperty('--accent-glow', 'rgba(197, 160, 89, 0.2)');
  } else if (aura === 'emerald') {
    document.documentElement.style.setProperty('--accent-color', '#4ade80');
    document.documentElement.style.setProperty('--accent-glow', 'rgba(74, 222, 128, 0.2)');
  } else if (aura === 'amethyst') {
    document.documentElement.style.setProperty('--accent-color', '#c084fc');
    document.documentElement.style.setProperty('--accent-glow', 'rgba(192, 132, 252, 0.2)');
  }
}

// --- 7. PIGMENT COPY TOAST ---
function copyPigment(hex, name) {
  navigator.clipboard.writeText(hex);
  const toast = document.getElementById('toastNotification');
  toast.innerText = `${name} (${hex}) Disalin ke Clipboard`;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 2500);
}

// --- 8. STATS COUNTER ANIMATION ---
let animatedStats = false;
window.addEventListener('scroll', () => {
  const statsSection = document.querySelector('.stats-bar');
  if (!statsSection) return;
  const position = statsSection.getBoundingClientRect().top;
  
  if (position < window.innerHeight - 80 && !animatedStats) {
    animatedStats = true;
    document.querySelectorAll('.stat-number').forEach((num) => {
      const target = +num.getAttribute('data-target');
      let count = 0;
      const speed = target / 35;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          num.innerText = Math.ceil(count);
          setTimeout(updateCount, 30);
        } else {
          num.innerText = target;
        }
      };
      updateCount();
    });
  }
});

