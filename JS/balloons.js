// ===== إعدادات البالونات =====
const BALLOON_COLORS = [
    '#C8A2C8', '#E6E6FA', '#DDA0DD', '#DA70D6', 
    '#FF69B4', '#FFB6C1', '#FF1493', '#9B59B6'
];

const BALLOON_MESSAGES = [
    'أحبكِ 💜',
    'أنتِ ملكتي 👑',
    'شهد 💕',
    'كل يوم معكِ عيد 🎉',
    'قلبي لكِ 💗',
    'أجمل إنسانة 🌸',
    'سعادتي بكِ 😊',
    'إلى الأبد ♾️',
    'نور عيني ✨',
    'حبي لكِ لا ينتهي 💜'
];

let poppedCount = 0;

// ===== عند التحميل =====
document.addEventListener('DOMContentLoaded', () => {
    initBalloons();
    initNameStars();
    initLilac();
    initParticles();
    updateCounterDisplay(); // تحديث العداد عند البداية
});

// ===== إنشاء البالونات =====
function initBalloons() {
    const sky = document.getElementById('balloonsSky');
    if (!sky) return;
    
    const balloonCount = 12;
    
    for (let i = 0; i < balloonCount; i++) {
        createBalloon(sky, i);
    }
    
    // إعادة إنشاء بالونات جديدة كل فترة
    setInterval(() => {
        const currentBalloons = sky.querySelectorAll('.balloon:not(.pop)');
        if (currentBalloons.length < 6) {
            createBalloon(sky, Date.now());
        }
    }, 3000);
}

function createBalloon(sky, index) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    
    const color = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
    const left = 5 + Math.random() * 85;
    const delay = Math.random() * 5;
    const duration = 6 + Math.random() * 4;
    
    balloon.style.cssText = `
        left: ${left}%;
        bottom: -100px;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
    `;
    
    balloon.innerHTML = `
        <div class="balloon-body" style="background: ${color};"></div>
        <div class="balloon-string"></div>
    `;
    
    // حركة الصعود
    const floatUp = animateBalloonUp(balloon, duration);
    
    // النقر
    balloon.addEventListener('click', (e) => {
        e.stopPropagation();
        popBalloon(balloon, color);
        cancelAnimationFrame(floatUp);
    });
    
    sky.appendChild(balloon);
}

function animateBalloonUp(balloon, duration) {
    let start = null;
    const sky = document.getElementById('balloonsSky');
    if (!sky) return;
    
    const skyHeight = sky.offsetHeight;
    
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / (duration * 1000);
        
        if (progress < 1) {
            const y = -100 + (skyHeight + 200) * progress;
            const wobble = Math.sin(progress * Math.PI * 4) * 20;
            
            if (!balloon.classList.contains('pop')) {
                balloon.style.bottom = y + 'px';
                balloon.style.transform = `translateX(${wobble}px)`;
            }
            
            return requestAnimationFrame(step);
        } else {
            balloon.remove();
        }
    }
    
    return requestAnimationFrame(step);
}

// ===== انفجار البالون =====
function popBalloon(balloon, color) {
    if (balloon.classList.contains('pop')) return;
    
    balloon.classList.add('pop');
    poppedCount++;
    updateCounterDisplay();
    
    const rect = balloon.getBoundingClientRect();
    const sky = document.getElementById('balloonsSky');
    if (!sky) return;
    
    const skyRect = sky.getBoundingClientRect();
    
    // جزيئات الانفجار
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'pop-particle';
        
        const angle = (Math.PI * 2 * i) / 12;
        const distance = 30 + Math.random() * 50;
        
        particle.style.cssText = `
            left: ${rect.left - skyRect.left + rect.width / 2}px;
            top: ${rect.top - skyRect.top + rect.height / 2}px;
            background: ${color};
            --tx: ${Math.cos(angle) * distance}px;
            --ty: ${Math.sin(angle) * distance}px;
        `;
        
        sky.appendChild(particle);
        setTimeout(() => particle.remove(), 600);
    }
    
    // رسالة
    const message = BALLOON_MESSAGES[Math.floor(Math.random() * BALLOON_MESSAGES.length)];
    showBalloonMessage(rect.left - skyRect.left + rect.width / 2, rect.top - skyRect.top, message);
    
    // إزالة بعد الانفجار
    setTimeout(() => balloon.remove(), 400);
}

// ===== رسالة البالون =====
function showBalloonMessage(x, y, text) {
    const sky = document.getElementById('balloonsSky');
    if (!sky) return;
    
    const message = document.createElement('div');
    message.className = 'balloon-message';
    message.textContent = text;
    message.style.left = x + 'px';
    message.style.top = y + 'px';
    message.style.transform = 'translateX(-50%)';
    
    sky.appendChild(message);
    setTimeout(() => message.remove(), 3000);
}

// ===== تحديث العداد =====
function updateCounterDisplay() {
    const counter = document.getElementById('balloonCount');
    if (!counter) {
        console.error('Balloon counter element not found!');
        return;
    }
    
    // تأثير العد السريع
    const current = parseInt(counter.textContent) || 0;
    animateNumber(counter, current, poppedCount, 300);
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const current = Math.floor(start + (end - start) * easeProgress);
        element.textContent = current.toLocaleString('ar-SA');
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// ===== نجوم الاسم =====
function initNameStars() {
    const letters = document.querySelectorAll('.star-letter');
    
    letters.forEach((letter, index) => {
        letter.addEventListener('click', () => {
            // تأثير توهج
            letter.style.textShadow = '0 0 60px rgba(200,162,200,1), 0 0 100px rgba(155,89,182,0.8)';
            
            setTimeout(() => {
                letter.style.textShadow = '';
            }, 1000);
            
            // إنشاء نجوم حول الحرف
            createStarBurst(letter);
        });
    });
}

function createStarBurst(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
        const star = document.createElement('div');
        star.textContent = '✨';
        star.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            font-size: 20px;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(star);
        
        const angle = (Math.PI * 2 * i) / 8;
        const velocity = 60;
        let x = 0, y = 0;
        let opacity = 1;
        
        function animate() {
            x += Math.cos(angle) * velocity * 0.016;
            y += Math.sin(angle) * velocity * 0.016 - 20 * 0.016;
            opacity -= 0.02;
            
            star.style.transform = `translate(${x}px, ${y}px)`;
            star.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                star.remove();
            }
        }
        
        requestAnimationFrame(animate);
    }
}