// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 2000);
});

// Custom Cursor
const cursor = document.getElementById('cursorFollower');
const cursorDot = document.getElementById('cursorDot');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Particles in Hero
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 10 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = Math.random() * 10 + 10 + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Floating Stars Background
function createFloatingStars() {
    const starsContainer = document.getElementById('floatingStars');
    const starEmojis = ['⭐', '✨', '💫', '🌟', '⚡', '🌠'];
    const starCount = 30;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'floating-star';
        star.textContent = starEmojis[Math.floor(Math.random() * starEmojis.length)];
        star.style.position = 'absolute';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.fontSize = Math.random() * 2 + 1 + 'rem';
        star.style.animation = `float-star ${Math.random() * 10 + 10}s linear infinite`;
        star.style.animationDelay = Math.random() * 10 + 's';
        starsContainer.appendChild(star);
    }
}

createFloatingStars();

// Background Stars
function createBackgroundStars() {
    const starsBackground = document.getElementById('starsBackground');
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'bg-star';
        star.style.position = 'absolute';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
        star.style.animationDelay = Math.random() * 3 + 's';
        starsBackground.appendChild(star);
    }
}

createBackgroundStars();

// Add CSS for new animations
const style = document.createElement('style');
style.textContent = `
    @keyframes float-star {
        from {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        to {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes twinkle {
        0%, 100% {
            opacity: 0.3;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.5);
        }
    }
`;
document.head.appendChild(style);

// Navigation
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetSection = document.getElementById(item.dataset.section);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Update active nav on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === current) {
            item.classList.add('active');
        }
    });
});

// Start Experience Button
document.getElementById('startExperience').addEventListener('click', () => {
    document.getElementById('optometry').scrollIntoView({ behavior: 'smooth' });
    
    // Create explosion of stars
    const button = document.getElementById('startExperience');
    const rect = button.getBoundingClientRect();
    
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.textContent = '⭐';
        star.style.position = 'fixed';
        star.style.left = rect.left + rect.width / 2 + 'px';
        star.style.top = rect.top + rect.height / 2 + 'px';
        star.style.fontSize = '2rem';
        star.style.pointerEvents = 'none';
        star.style.zIndex = '9999';
        document.body.appendChild(star);
        
        const angle = (Math.PI * 2 * i) / 20;
        const distance = 200;
        const duration = 1000;
        
        star.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
            { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(1)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'ease-out'
        }).onfinish = () => star.remove();
    }
});

// Animated instrument cards
document.querySelectorAll('.instrument-card').forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.instrument-icon');
        icon.style.animation = 'none';
        setTimeout(() => {
            icon.style.animation = 'instrument-bounce 0.5s ease-in-out';
        }, 10);
        
        // Create musical notes
        const notes = ['🎵', '🎶', '🎼'];
        for (let i = 0; i < 3; i++) {
            const note = document.createElement('div');
            note.textContent = notes[Math.floor(Math.random() * notes.length)];
            note.style.position = 'absolute';
            note.style.fontSize = '1.5rem';
            note.style.pointerEvents = 'none';
            note.style.left = '50%';
            note.style.top = '50%';
            card.appendChild(note);
            
            note.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
                { transform: `translate(calc(-50% + ${(Math.random() - 0.5) * 100}px), calc(-50% - ${Math.random() * 50 + 50}px)) scale(1)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out',
                delay: i * 100
            }).onfinish = () => note.remove();
        }
    });
});

// Special violin animation
const violinIcon = document.querySelector('.violin-icon');
if (violinIcon) {
    violinIcon.addEventListener('click', () => {
        // Create magical violin performance
        const violinContainer = violinIcon.parentElement;
        const noteEmojis = ['🎵', '🎶', '🎼', '✨', '⭐', '💫'];
        
        for (let i = 0; i < 30; i++) {
            const note = document.createElement('div');
            note.textContent = noteEmojis[Math.floor(Math.random() * noteEmojis.length)];
            note.style.position = 'absolute';
            note.style.fontSize = Math.random() * 2 + 1 + 'rem';
            note.style.left = '50%';
            note.style.top = '50%';
            note.style.pointerEvents = 'none';
            note.style.zIndex = '1000';
            violinContainer.appendChild(note);
            
            const angle = (Math.PI * 2 * i) / 30;
            const distance = Math.random() * 200 + 100;
            
            note.animate([
                { 
                    transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', 
                    opacity: 1 
                },
                { 
                    transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(1) rotate(720deg)`, 
                    opacity: 0 
                }
            ], {
                duration: 2000,
                easing: 'ease-out',
                delay: i * 50
            }).onfinish = () => note.remove();
        }
        
        // Make violin icon do a special dance
        violinIcon.animate([
            { transform: 'rotate(-10deg) scale(1)' },
            { transform: 'rotate(360deg) scale(1.5)' },
            { transform: 'rotate(720deg) scale(1)' }
        ], {
            duration: 1000,
            easing: 'ease-in-out'
        });
    });
}

// Wave Text Animation
function createWaveText() {
    const waveText = document.querySelector('.wave-text');
    const text = waveText.textContent;
    waveText.innerHTML = '';
    
    text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.setProperty('--i', i);
        waveText.appendChild(span);
    });
}

createWaveText();

// Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += char;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

const scrambleElements = document.querySelectorAll('.scramble-text');
scrambleElements.forEach((element) => {
    const scramble = new TextScramble(element);
    const originalText = element.getAttribute('data-text');
    
    const phrases = originalText.includes('Muzyka') ? [
        'Muzyka to magia! Gwiazdeczki w każdej nucie! ⭐',
        'Agnieszka gra WSZYSTKO! ✨🎵✨',
        'Dźwięki pełne gwiazd! 🌟🎶🌟',
        'Harmonia i blask! 💫🎹💫'
    ] : [
        'To jest niesamowity efekt scrambla!',
        'Tekst się magicznie zmienia!',
        'Frontend może być spektakularny!',
        'Animacje robią różnicę!'
    ];
    
    let counter = 0;
    const next = () => {
        scramble.setText(phrases[counter]).then(() => {
            setTimeout(next, 2000);
        });
        counter = (counter + 1) % phrases.length;
    };
    
    next();
});

// Canvas Particle System
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.life = 100;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        this.size *= 0.98;
    }
    
    draw() {
        ctx.globalAlpha = this.life / 100;
        
        if (this.shape) {
            ctx.font = `${this.size}px Arial`;
            ctx.fillText(this.shape, this.x - this.size/2, this.y + this.size/2);
        } else {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Add sparkle effect
            if (Math.random() > 0.8) {
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(this.x - this.size, this.y);
                ctx.lineTo(this.x + this.size, this.y);
                ctx.moveTo(this.x, this.y - this.size);
                ctx.lineTo(this.x, this.y + this.size);
                ctx.stroke();
            }
        }
        
        ctx.globalAlpha = 1;
    }
}

let particles = [];
let animationId;
let currentEffect = 'normal';

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].life <= 0 || particles[i].size <= 0.1) {
            particles.splice(i, 1);
        }
    }
    
    // Add new particles based on current effect
    if (currentEffect === 'normal' && particles.length < 100) {
        particles.push(new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        ));
    }
    
    animationId = requestAnimationFrame(animate);
}

animate();

// Canvas Control Buttons
const controlButtons = document.querySelectorAll('.control-btn');

controlButtons.forEach(button => {
    button.addEventListener('click', () => {
        const effect = button.dataset.effect;
        currentEffect = effect;
        
        switch(effect) {
            case 'stars':
                createStars();
                break;
            case 'rainbow':
                createRainbow();
                break;
            case 'hearts':
                createHearts();
                break;
            case 'fireworks':
                createFireworks();
                break;
        }
    });
});

function createStars() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    for (let i = 0; i < 150; i++) {
        const particle = new Particle(centerX, centerY);
        const angle = (Math.PI * 2 * i) / 150;
        const speed = Math.random() * 15 + 5;
        particle.speedX = Math.cos(angle) * speed;
        particle.speedY = Math.sin(angle) * speed;
        particle.color = `hsl(${Math.random() * 60 + 50}, 100%, 70%)`;
        particle.size = Math.random() * 8 + 2;
        particles.push(particle);
    }
}

function createRainbow() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    for (let i = 0; i < 360; i += 2) {
        const angle = (i * Math.PI) / 180;
        const radius = 200;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        const particle = new Particle(x, y);
        particle.speedX = Math.cos(angle) * 3;
        particle.speedY = Math.sin(angle) * 3;
        particle.color = `hsl(${i}, 100%, 50%)`;
        particle.size = 5;
        particles.push(particle);
    }
}

function createHearts() {
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = canvas.height + 50;
        const particle = new Particle(x, y);
        particle.speedX = (Math.random() - 0.5) * 2;
        particle.speedY = -Math.random() * 5 - 2;
        particle.color = `hsl(${Math.random() * 30 + 330}, 100%, 60%)`;
        particle.size = Math.random() * 15 + 10;
        particle.shape = '💖';
        particles.push(particle);
    }
}

function createFireworks() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5;
    
    for (let i = 0; i < 100; i++) {
        const particle = new Particle(x, y);
        const angle = (Math.PI * 2 * i) / 100;
        const speed = Math.random() * 10 + 5;
        particle.speedX = Math.cos(angle) * speed;
        particle.speedY = Math.sin(angle) * speed;
        particle.color = colors[Math.floor(Math.random() * colors.length)];
        particle.size = Math.random() * 5 + 2;
        particle.life = 150;
        particles.push(particle);
    }
    
    // Add sparkle effect
    setTimeout(() => createFireworks(), Math.random() * 1000 + 500);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 1s ease-out';
    observer.observe(section);
});

// Performance optimization
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

function updateAnimations() {
    ticking = false;
}

window.addEventListener('scroll', requestTick);
window.addEventListener('resize', requestTick);