// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typingText = document.getElementById('typing-text');
const contactForm = document.getElementById('contactForm');
const popup = document.getElementById('successPopup');

// Terminal typing animation
const commands = [
    'whoami',
    'cat /etc/passwd | grep jayram',
    'sudo access cybersecurity_mode',
    'nmap -sV target_network',
    'python3 id_card_generator.py',
    'systemctl status security.service'
];

let currentCommand = 0;
let currentChar = 0;
let isDeleting = false;

function typeCommand() {
    const current = commands[currentCommand];
    
    if (isDeleting) {
        typingText.textContent = current.substring(0, currentChar - 1);
        currentChar--;
    } else {
        typingText.textContent = current.substring(0, currentChar + 1);
        currentChar++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && currentChar === current.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentCommand = (currentCommand + 1) % commands.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeCommand, typeSpeed);
}

// Mobile navigation toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    hamburger.classList.toggle('active');
}

// Smooth scrolling for navigation links
function smoothScroll(target) {
    const element = document.querySelector(target);
    const navHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = element.offsetTop - navHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger skill bar animations
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Animate skill progress bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        setTimeout(() => {
            bar.style.width = percent + '%';
        }, Math.random() * 1000);
    });
}

// Matrix rain effect
function createMatrixRain() {
    const matrixBg = document.querySelector('.matrix-bg');
    const characters = '01';
    
    for (let i = 0; i < 100; i++) {
        const span = document.createElement('span');
        span.textContent = characters[Math.floor(Math.random() * characters.length)];
        span.style.position = 'absolute';
        span.style.left = Math.random() * 100 + '%';
        span.style.animationDuration = Math.random() * 3 + 2 + 's';
        span.style.animationDelay = Math.random() * 2 + 's';
        span.style.fontSize = Math.random() * 10 + 10 + 'px';
        span.style.color = `rgba(0, 255, 65, ${Math.random() * 0.5 + 0.1})`;
        matrixBg.appendChild(span);
    }
}

// Glitch effect for elements
function addGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(element => {
        if (!element.hasAttribute('data-text')) {
            element.setAttribute('data-text', element.textContent);
        }
    });
}

// Contact form handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    console.log('Form data:', data);
    
    // Show success popup
    showPopup();
    
    // Reset form
    contactForm.reset();
}

// Show success popup
function showPopup() {
    popup.style.display = 'flex';
    popup.style.animation = 'fadeIn 0.3s ease';
}

// Close popup
function closePopup() {
    popup.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 300);
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(5, 5, 5, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 255, 0.3)';
    } else {
        navbar.style.background = 'rgba(5, 5, 5, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Active navigation highlight
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const scrollPos = window.scrollY;
        
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to current section link
            const activeLink = document.querySelector(`a[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Particle system for background
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-system';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 255, 255, 0.5);
            border-radius: 50%;
            animation: float ${Math.random() * 10 + 5}s linear infinite;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }
}

// Terminal cursor blink effect
function animateTerminalCursor() {
    const cursors = document.querySelectorAll('.cursor');
    
    cursors.forEach(cursor => {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    });
}

// Scan line effect for about image
function createScanLines() {
    const scanLines = document.querySelector('.scan-lines');
    if (scanLines) {
        setInterval(() => {
            scanLines.style.animation = 'none';
            setTimeout(() => {
                scanLines.style.animation = 'scan 2s linear infinite';
            }, 100);
        }, 5000);
    }
}

// Terminal output animation
function animateTerminalOutput() {
    const outputLines = document.querySelectorAll('.output-line');
    
    outputLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            line.style.transition = 'all 0.5s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, index * 500 + 1000);
    });
}

// Keyboard shortcuts
function handleKeyboardShortcuts(e) {
    // Ctrl + / to toggle mobile menu
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        toggleMobileMenu();
    }
    
    // Escape to close popup
    if (e.key === 'Escape' && popup.style.display === 'flex') {
        closePopup();
    }
}

// Mouse trail effect
function createMouseTrail() {
    const trail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(0, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX - 2}px;
            top: ${e.clientY - 2}px;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(dot);
        trail.push(dot);
        
        if (trail.length > trailLength) {
            const oldDot = trail.shift();
            oldDot.style.opacity = '0';
            setTimeout(() => {
                if (oldDot.parentNode) {
                    oldDot.parentNode.removeChild(oldDot);
                }
            }, 500);
        }
    });
}

// Initialize animations with CSS
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.8); }
        }
        
        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .nav-menu.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(5, 5, 5, 0.98);
            padding: 1rem;
            border-top: 1px solid var(--neon-blue);
        }
        
        .nav-link.active {
            color: var(--neon-blue) !important;
            text-shadow: 0 0 10px var(--neon-blue);
        }
        
        .animate {
            animation: slideInUp 0.8s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    addAnimationStyles();
    addGlitchEffect();
    createMatrixRain();
    createParticles();
    animateTerminalCursor();
    createScanLines();
    animateTerminalOutput();
    createMouseTrail();
    
    // Start typing animation
    setTimeout(typeCommand, 1000);
    
    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));
    
    // Event listeners
    hamburger?.addEventListener('click', toggleMobileMenu);
    contactForm?.addEventListener('submit', handleFormSubmit);
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Scroll events
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveNav();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Click outside popup to close
    popup?.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });
});

// Global functions for HTML onclick events
window.closePopup = closePopup;

// Console welcome message
console.log(`
╔═══════════════════════════════════════╗
║           JAYRAM KUMAR                ║
║     Cybersecurity Specialist         ║
║                                       ║
║     System Status: ONLINE             ║
║     Security Level: MAXIMUM           ║
║                                       ║
║     Welcome to the Matrix...          ║
╚═══════════════════════════════════════╝
`);

// Performance monitoring
const observer2 = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
            console.log(`Page loaded in ${entry.loadEventEnd - entry.loadEventStart}ms`);
        }
    });
});

observer2.observe({ entryTypes: ['navigation'] });