// Three.js Scene Setup
let scene, camera, renderer, particles, mouseX = 0, mouseY = 0;

function initThreeJS() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('three-canvas'),
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particle system that looks like teeth floating in space
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
        colorsArray[i] = Math.random();
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8
    });

    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add floating tooth-like geometry
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);
    
    // Add floating teeth
    const toothGeometry = new THREE.ConeGeometry(2, 5, 4);
    const toothMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    
    for (let i = 0; i < 8; i++) {
        const tooth = new THREE.Mesh(toothGeometry, toothMaterial);
        tooth.position.x = Math.sin(i * Math.PI / 4) * 20;
        tooth.position.z = Math.cos(i * Math.PI / 4) * 20;
        tooth.position.y = Math.random() * 10 - 5;
        tooth.userData = { index: i };
        scene.add(tooth);
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;

        torusKnot.rotation.x += 0.01;
        torusKnot.rotation.y += 0.01;
        
        // Animate floating teeth
        scene.children.forEach(child => {
            if (child.userData.index !== undefined) {
                child.rotation.y += 0.02;
                child.position.y = Math.sin(Date.now() * 0.001 + child.userData.index) * 5;
            }
        });

        // Mouse interaction
        particles.position.x = mouseX * 0.1;
        particles.position.y = -mouseY * 0.1;

        renderer.render(scene, camera);
    }

    animate();
}

// Mouse movement tracking
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / 100;
    mouseY = (e.clientY - window.innerHeight / 2) / 100;

    // Update custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
});

// Window resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Loading animation
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);

    initThreeJS();
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
    
    lastScroll = currentScroll;
});

// Interactive space mouse tracking
const interactiveSpace = document.getElementById('interactive-space');
const floatingElements = document.querySelectorAll('.floating-element');

if (interactiveSpace) {
    interactiveSpace.addEventListener('mousemove', (e) => {
        const rect = interactiveSpace.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        floatingElements.forEach((element) => {
            const speed = element.dataset.speed || 0.5;
            const xOffset = (x - centerX) * speed;
            const yOffset = (y - centerY) * speed;
            
            element.style.transform = `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px))`;
        });
    });

    interactiveSpace.addEventListener('mouseleave', () => {
        floatingElements.forEach((element) => {
            element.style.transform = 'translate(-50%, -50%)';
        });
    });
}

// Form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add submission animation
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Wysyłanie...</span>';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Wysłano!</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #00ff00 0%, #00aa00 100%)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Explore button particle effect
const exploreBtn = document.getElementById('explore-btn');
if (exploreBtn) {
    exploreBtn.addEventListener('click', function(e) {
        const particlesContainer = this.querySelector('.button-particles');
        
        // Create particle burst
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = '#00ffff';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = 50 + Math.random() * 50;
            
            particle.style.transform = 'translate(-50%, -50%)';
            particle.style.left = '0px';
            particle.style.top = '0px';
            
            particlesContainer.appendChild(particle);
            
            // Animate particle
            let frame = 0;
            const animate = () => {
                frame++;
                const x = Math.cos(angle) * velocity * (frame / 30);
                const y = Math.sin(angle) * velocity * (frame / 30);
                const opacity = 1 - (frame / 30);
                
                particle.style.transform = `translate(${x}px, ${y}px)`;
                particle.style.opacity = opacity;
                
                if (frame < 30) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            
            requestAnimationFrame(animate);
        }
        
        // Scroll to next section
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Intersection Observer for animations
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
document.querySelectorAll('.content-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease';
    observer.observe(section);
});

// Add hover effect to links
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        document.querySelector('.cursor').style.transform = 'scale(1.5)';
        document.querySelector('.cursor-follower').style.transform = 'scale(1.5)';
    });
    
    link.addEventListener('mouseleave', () => {
        document.querySelector('.cursor').style.transform = 'scale(1)';
        document.querySelector('.cursor-follower').style.transform = 'scale(1)';
    });
});