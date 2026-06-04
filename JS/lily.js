// ===== متغيرات =====
let bloomedCount = 0;
const TOTAL_FLOWERS = 7;
const SCENT_MESSAGES = [
    'عطر الحب 💗',
    'ذكرى جميلة ✨',
    'شهد 🌸',
    'إلى الأبد 💕',
    'أحبكِ 💗',
    'وردة لكِ 🌸',
    'سعادتي بكِ 😊',
    'قلبي لكِ 💓'
];

// ===== أبعاد الوردة الأساسية =====
const BASE_WIDTH = 100;
const BASE_HEIGHT = 130;

// ===== SVG الوردة المغلقة =====
function getClosedLilySVG(id) {
    return `
    <svg class="lily-svg lily-closed" viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="stemGrad-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#4a7c4e"/>
                <stop offset="100%" stop-color="#2d5a2d"/>
            </linearGradient>
            <linearGradient id="budGrad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ffb6c1"/>
                <stop offset="50%" stop-color="#ff69b4"/>
                <stop offset="100%" stop-color="#db7093"/>
            </linearGradient>
            <linearGradient id="budInner-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ff69b4"/>
                <stop offset="100%" stop-color="#c71585"/>
            </linearGradient>
        </defs>
        <rect x="46" y="80" width="8" height="50" fill="url(#stemGrad-${id})" rx="4"/>
        <ellipse cx="50" cy="50" rx="25" ry="40" fill="url(#budGrad-${id})"/>
        <ellipse cx="50" cy="50" rx="20" ry="35" fill="url(#budInner-${id})"/>
        <path d="M50 15 Q35 50 50 85" stroke="#c71585" stroke-width="1" fill="none" opacity="0.3"/>
        <path d="M50 15 Q65 50 50 85" stroke="#c71585" stroke-width="1" fill="none" opacity="0.3"/>
    </svg>
    `;
}

// ===== SVG الوردة المفتوحة =====
function getOpenLilySVG(id) {
    return `
    <svg class="lily-svg lily-open" viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="stemGradOpen-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#4a7c4e"/>
                <stop offset="100%" stop-color="#2d5a2d"/>
            </linearGradient>
            <linearGradient id="leafGrad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#4a7c4e"/>
                <stop offset="100%" stop-color="#2d5a2d"/>
            </linearGradient>
            <linearGradient id="petalBack-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ffb6c1"/>
                <stop offset="50%" stop-color="#ff69b4"/>
                <stop offset="100%" stop-color="#db7093"/>
            </linearGradient>
            <linearGradient id="petalFront-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ffc0cb"/>
                <stop offset="30%" stop-color="#ff69b4"/>
                <stop offset="100%" stop-color="#c71585"/>
            </linearGradient>
            <radialGradient id="centerGrad-${id}" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#ffd700"/>
                <stop offset="100%" stop-color="#ff8c00"/>
            </radialGradient>
        </defs>
        <rect x="46" y="80" width="8" height="50" fill="url(#stemGradOpen-${id})" rx="4"/>
        <path d="M50 100 Q20 80 10 110 Q30 120 50 100" fill="url(#leafGrad-${id})"/>
        <path d="M50 100 Q80 80 90 110 Q70 120 50 100" fill="url(#leafGrad-${id})"/>
        <ellipse cx="35" cy="45" rx="18" ry="35" fill="url(#petalBack-${id})" transform="rotate(-25 35 45)"/>
        <ellipse cx="65" cy="45" rx="18" ry="35" fill="url(#petalBack-${id})" transform="rotate(25 65 45)"/>
        <ellipse cx="50" cy="35" rx="15" ry="30" fill="url(#petalBack-${id})" transform="rotate(0 50 35)"/>
        <ellipse cx="30" cy="55" rx="20" ry="38" fill="url(#petalFront-${id})" transform="rotate(-35 30 55)"/>
        <ellipse cx="70" cy="55" rx="20" ry="38" fill="url(#petalFront-${id})" transform="rotate(35 70 55)"/>
        <ellipse cx="50" cy="50" rx="18" ry="35" fill="url(#petalFront-${id})"/>
        <line x1="50" y1="50" x2="42" y2="25" stroke="#ffd700" stroke-width="2"/>
        <line x1="50" y1="50" x2="58" y2="25" stroke="#ffd700" stroke-width="2"/>
        <line x1="50" y1="50" x2="50" y2="22" stroke="#ffd700" stroke-width="2"/>
        <line x1="50" y1="50" x2="45" y2="28" stroke="#ff8c00" stroke-width="1.5"/>
        <line x1="50" y1="50" x2="55" y2="28" stroke="#ff8c00" stroke-width="1.5"/>
        <line x1="50" y1="50" x2="50" y2="25" stroke="#ff8c00" stroke-width="1.5"/>
        <circle cx="42" cy="25" r="4" fill="#ff6347"/>
        <circle cx="58" cy="25" r="4" fill="#ff6347"/>
        <circle cx="50" cy="22" r="4" fill="#ff6347"/>
        <circle cx="50" cy="50" r="12" fill="url(#centerGrad-${id})"/>
        <circle cx="50" cy="50" r="8" fill="#ff8c00"/>
    </svg>
    `;
}

// ===== SVG ورقة خضراء =====
function getLeafSVG(id) {
    return `
    <svg class="leaf-svg" viewBox="0 0 60 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="leafGrad2-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#4a7c4e"/>
                <stop offset="100%" stop-color="#2d5a2d"/>
            </linearGradient>
        </defs>
        <path d="M30 100 Q5 70 10 40 Q15 10 30 0 Q45 10 50 40 Q55 70 30 100" fill="url(#leafGrad2-${id})"/>
        <path d="M30 100 Q30 70 30 40 Q30 20 30 5" stroke="#2d5a2d" stroke-width="1" fill="none" opacity="0.5"/>
    </svg>
    `;
}

// ===== عند التحميل =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Lily page loaded!');
    initLilyBouquet();
    initScentDrawing();
});

// ===== باقة الزنبق =====
function initLilyBouquet() {
    const bouquet = document.getElementById('lilyBouquet');
    if (!bouquet) {
        console.error('lilyBouquet not found!');
        return;
    }
    
    bouquet.style.position = 'relative';
    
    const positions = [
        { x: 225, y: 350, scale: 1.3 },
        { x: 130, y: 320, scale: 1.0 },
        { x: 320, y: 320, scale: 1.0 },
        { x: 80,  y: 380, scale: 0.85 },
        { x: 370, y: 380, scale: 0.85 },
        { x: 170, y: 280, scale: 0.9 },
        { x: 280, y: 280, scale: 0.9 }
    ];
    
    positions.forEach((pos, index) => {
        createLilyFlower(bouquet, index, pos);
    });
    
    createLeaves(bouquet);
}

function createLilyFlower(container, index, pos) {
    const flower = document.createElement('div');
    
    // مهم: بدون bloomed بالبداية!
    flower.className = 'lily-flower';
    flower.id = `lily-${index}`;
    
    const finalWidth = BASE_WIDTH * pos.scale;
    const finalHeight = BASE_HEIGHT * pos.scale;
    
    const left = pos.x - (finalWidth / 2);
    const top = pos.y - finalHeight;
    
    flower.style.cssText = `
        position: absolute;
        left: ${left}px;
        top: ${top}px;
        width: ${finalWidth}px;
        height: ${finalHeight}px;
    `;
    
    const svgId = `flower-${index}`;
    flower.innerHTML = getClosedLilySVG(svgId) + getOpenLilySVG(svgId);
    
    container.appendChild(flower);
    
    flower.addEventListener('click', (e) => {
        e.stopPropagation();
        bloomLily(flower);
    });
    
    console.log(`Created lily ${index}: left=${left.toFixed(1)}, top=${top.toFixed(1)}, size=${finalWidth.toFixed(1)}x${finalHeight.toFixed(1)}`);
}

function createLeaves(container) {
    const leafPositions = [
        { x: 100, y: 400, rotate: -30, scale: 1 },
        { x: 280, y: 420, rotate: 20, scale: 0.9 },
        { x: 190, y: 430, rotate: -10, scale: 1.1 },
        { x: 330, y: 390, rotate: 45, scale: 0.8 },
        { x: 60,  y: 370, rotate: -50, scale: 0.9 }
    ];
    
    leafPositions.forEach((pos, index) => {
        const leaf = document.createElement('div');
        leaf.className = 'lily-leaf';
        
        const leafWidth = 60 * pos.scale;
        const leafHeight = 100 * pos.scale;
        const left = pos.x - (leafWidth / 2);
        const top = pos.y - leafHeight;
        
        leaf.style.cssText = `
            position: absolute;
            left: ${left}px;
            top: ${top}px;
            width: ${leafWidth}px;
            height: ${leafHeight}px;
            transform: rotate(${pos.rotate}deg);
            transform-origin: center bottom;
        `;
        
        leaf.innerHTML = getLeafSVG(`leaf-${index}`);
        container.appendChild(leaf);
    });
}

// ===== تفتيح الوردة =====
function bloomLily(flower) {
    if (flower.classList.contains('bloomed')) return;
    
    flower.classList.add('bloomed');
    bloomedCount++;
    updateCounter();
    
    createBloomParticles(flower);
    showScentMessage(flower);
    
    if (bloomedCount >= TOTAL_FLOWERS) {
        setTimeout(() => {
            showSecretMessage();
        }, 1500);
    }
}

function createBloomParticles(flower) {
    const rect = flower.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 6px;
            height: 6px;
            background: radial-gradient(circle, #ffb6c1, #ff69b4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            box-shadow: 0 0 10px #ff69b4;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 12;
        const velocity = 40 + Math.random() * 30;
        let x = 0, y = 0;
        let opacity = 1;
        
        function animate() {
            x += Math.cos(angle) * velocity * 0.016;
            y += Math.sin(angle) * velocity * 0.016 - 15 * 0.016;
            opacity -= 0.02;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        
        requestAnimationFrame(animate);
    }
}

function showScentMessage(flower) {
    const container = document.getElementById('scentMessages');
    const rect = flower.getBoundingClientRect();
    
    const message = document.createElement('div');
    message.className = 'scent-message';
    message.textContent = SCENT_MESSAGES[Math.floor(Math.random() * SCENT_MESSAGES.length)];
    message.style.left = (rect.left + rect.width / 2) + 'px';
    message.style.top = (rect.top - 20) + 'px';
    message.style.transform = 'translateX(-50%)';
    
    container.appendChild(message);
    setTimeout(() => message.remove(), 3000);
}

// ===== تحديث العداد =====
function updateCounter() {
    const counter = document.getElementById('bloomCount');
    if (!counter) return;
    counter.textContent = `${bloomedCount} / ${TOTAL_FLOWERS}`;
}

// ===== رسم العطر =====
function initScentDrawing() {
    const bouquet = document.getElementById('lilyBouquet');
    if (!bouquet) return;
    
    let isDrawing = false;
    
    bouquet.addEventListener('mousedown', () => isDrawing = true);
    document.addEventListener('mouseup', () => isDrawing = false);
    
    bouquet.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        if (Math.random() > 0.8) {
            createScentTrail(e.clientX, e.clientY);
        }
    });
    
    bouquet.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        if (Math.random() > 0.8) {
            createScentTrail(touch.clientX, touch.clientY);
        }
    });
}

function createScentTrail(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, #ffb6c1, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 100;
        box-shadow: 0 0 8px #ff69b4;
        animation: fadeOut 1.5s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1500);
}

// ===== إظهار الرسالة السرية =====
function showSecretMessage() {
    const message = document.getElementById('secretMessage');
    if (!message) return;
    
    message.classList.add('show');
    createLilyConfetti();
    
    const box = message.querySelector('.message-box');
    if (box && !box.querySelector('.continue-btn')) {
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✨ أكمل الرحلة';
        closeBtn.className = 'continue-btn';
        closeBtn.addEventListener('click', () => {
            window.location.href = 'gallery.html';
        });
        box.appendChild(closeBtn);
    }
}

// ===== confetti =====
function createLilyConfetti() {
    const colors = ['#ffb6c1', '#ff69b4', '#db7093', '#ffd700', '#ffa500', '#fff'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            confetti.style.cssText = `
                position: fixed;
                left: ${50 + (Math.random() - 0.5) * 60}%;
                top: 40%;
                width: ${8 + Math.random() * 8}px;
                height: ${8 + Math.random() * 8}px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1001;
                box-shadow: 0 0 10px ${color};
            `;
            
            document.body.appendChild(confetti);
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 5 + Math.random() * 8;
            let x = 0, y = 0;
            let vx = Math.cos(angle) * velocity;
            let vy = Math.sin(angle) * velocity - 12;
            let gravity = 0.35;
            let opacity = 1;
            
            function animate() {
                x += vx;
                y += vy;
                vy += gravity;
                vx *= 0.98;
                opacity -= 0.01;
                
                confetti.style.transform = `translate(${x}px, ${y}px)`;
                confetti.style.opacity = opacity;
                
                if (opacity > 0 && y < window.innerHeight) {
                    requestAnimationFrame(animate);
                } else {
                    confetti.remove();
                }
            }
            
            requestAnimationFrame(animate);
        }, i * 15);
    }
}