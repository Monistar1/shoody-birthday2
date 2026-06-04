// ===== إعدادات زمن التعرف =====
const FIRST_MEETING = new Date('2026-01-01T00:00:00'); // ✅ تاريخ التعارف: 1/1/2026

// ===== الرسائل الدوارة =====
const loveMessages = [
    "أنتِ نبضة القلب التي لا تتوقف",
    "في عينيكِ أجد عالماً كاملاً",
    "كل لحظة معكِ هي كنز لا يُقدّر بثمن",
    "أحبكِ أكثر مما يمكن للكلمات أن تعبّر",
    "أنتِ ضوء القمر في لياليّ",
    "معكِ يصبح كل شيء أجمل",
    "قلبي ملككِ اليوم وغداً وإلى الأبد",
    "أنتِ الحلم الذي تحقق في حياتي"
];

// ===== عند التحميل =====
document.addEventListener('DOMContentLoaded', () => {
    initHeroHeart();
    initTypewriter();
    initHeartFrame();
    initTimeTogether();
    initLilac();
    initParticles();
});

// ===== القلب النابض =====
function initHeroHeart() {
    const heart = document.getElementById('heroHeart');
    if (!heart) return;
    
    heart.addEventListener('mouseenter', () => {
        createHeartBurst();
    });
    
    heart.addEventListener('click', () => {
        createHeartBurst();
        heart.style.animation = 'none';
        heart.offsetHeight; // trigger reflow
        heart.style.animation = 'heroHeartbeat 0.8s ease-in-out infinite';
        
        setTimeout(() => {
            heart.style.animation = 'heroHeartbeat 1.5s ease-in-out infinite';
        }, 2000);
    });
}

function createHeartBurst() {
    const wrapper = document.querySelector('.hero-heart-wrapper');
    if (!wrapper) return;
    
    const colors = ['💜', '💖', '💕', '✨', '🪻', '💗'];
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.textContent = colors[Math.floor(Math.random() * colors.length)];
        particle.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 20px;
            pointer-events: none;
            z-index: 100;
        `;
        
        wrapper.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 12;
        const velocity = 80 + Math.random() * 60;
        let x = 0, y = 0;
        let opacity = 1;
        
        function animate() {
            x += Math.cos(angle) * velocity * 0.016;
            y += Math.sin(angle) * velocity * 0.016 - 30 * 0.016;
            opacity -= 0.015;
            
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

// ===== الكتابة التلقائية =====
function initTypewriter() {
    const element = document.getElementById('heroTypewriter');
    if (!element) return;
    
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentMessage = loveMessages[messageIndex];
        
        if (isDeleting) {
            element.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentMessage.length) {
            typeSpeed = 2000; // انتظر قبل الحذف
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % loveMessages.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1000);
}

// ===== إطار القلب =====
function initHeartFrame() {
    const frame = document.getElementById('heartFrame');
    const particlesContainer = document.getElementById('frameParticles');
    
    if (!frame) return;
    
    frame.addEventListener('mouseenter', () => {
        frame.style.transform = 'rotate(-45deg) scale(1.05)';
        createFrameParticles();
    });
    
    frame.addEventListener('mouseleave', () => {
        frame.style.transform = 'rotate(-45deg) scale(1)';
    });
}

function createFrameParticles() {
    const container = document.getElementById('frameParticles');
    if (!container) return;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: var(--lilac-light);
            border-radius: 50%;
            box-shadow: 0 0 10px var(--lilac-main);
            pointer-events: none;
        `;
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 100;
        
        particle.style.left = (150 + Math.cos(angle) * distance) + 'px';
        particle.style.top = (150 + Math.sin(angle) * distance) + 'px';
        
        container.appendChild(particle);
        
        let opacity = 1;
        let scale = 1;
        
        function animate() {
            opacity -= 0.02;
            scale += 0.02;
            
            particle.style.opacity = opacity;
            particle.style.transform = `scale(${scale})`;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        
        requestAnimationFrame(animate);
    }
}

// ===== زمن التعرف =====
function initTimeTogether() {
    updateTimeTogether();
    setInterval(updateTimeTogether, 1000);
}

function updateTimeTogether() {
    const now = new Date();
    const diff = now - FIRST_MEETING;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const daysEl = document.getElementById('togetherDays');
    const hoursEl = document.getElementById('togetherHours');
    const minutesEl = document.getElementById('togetherMinutes');
    const secondsEl = document.getElementById('togetherSeconds');
    
    if (daysEl) daysEl.textContent = Math.max(0, days).toLocaleString('ar-SA');
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minutesEl) minutesEl.textContent = pad(minutes);
    if (secondsEl) secondsEl.textContent = pad(seconds);
}

// ===== أداة مساعدة =====
function pad(num) {
    return num.toString().padStart(2, '0');
}