// ===== متغيرات عامة =====
let audioContext = null;
let bgMusic = null;

// ===== عند تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', () => {
    initLilac();
    initParticles();
    initTypewriter();
    initStartButton();
    createFallingPetals();
});

// ===== ورد الليلك =====
function initLilac() {
    const container = document.getElementById('lilacContainer');
    
    // إنشاء أزهار على الأغصان
    const branches = document.querySelectorAll('.lilac-branch');
    
    branches.forEach(branch => {
        for (let i = 0; i < 25; i++) {
            const flower = document.createElement('div');
            flower.className = 'lilac-flower';
            
            // موقع عشوائي على الغصن
            const top = 20 + Math.random() * 70;
            const left = 30 + Math.random() * 40;
            const delay = Math.random() * 3;
            const size = 8 + Math.random() * 8;
            
            flower.style.cssText = `
                top: ${top}%;
                left: ${left}%;
                width: ${size}px;
                height: ${size}px;
                animation-delay: ${delay}s;
            `;
            
            branch.appendChild(flower);
        }
    });
}

// ===== بتلات متساقطة =====
function createFallingPetals() {
    setInterval(() => {
        const petal = document.createElement('div');
        petal.className = 'falling-petal';
        
        const startX = Math.random() * window.innerWidth;
        const duration = 5 + Math.random() * 5;
        const size = 6 + Math.random() * 6;
        
        petal.style.cssText = `
            left: ${startX}px;
            top: -20px;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${duration}s;
        `;
        
        document.querySelector('.live-background').appendChild(petal);
        
        setTimeout(() => petal.remove(), duration * 1000);
    }, 1500);
}

// ===== جزيئات العطر =====
function initParticles() {
    const container = document.getElementById('particles');
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight - Math.random() * 200;
        const delay = Math.random() * 2;
        
        particle.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            animation-delay: ${delay}s;
        `;
        
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), 6000);
    }, 800);
}

// ===== تأثير الكتابة =====
function initTypewriter() {
    const text = "في كل نبضة قلب... أنتِ";
    const element = document.getElementById('typewriterText');
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 150);
        } else {
            setTimeout(() => {
                element.textContent = '';
                index = 0;
                type();
            }, 4000);
        }
    }
    
    setTimeout(type, 1500);
}

// ===== زر البداية =====
function initStartButton() {
    const btn = document.getElementById('startBtn');
    
    btn.addEventListener('click', async () => {
        // تشغيل الموسيقى
        await initAudio();
        
        // تأثير القلوب الطائرة
        createBurstHearts();
        
        // الانتقال للصفحة التالية
        setTimeout(() => {
            window.location.href = 'countdown.html';
        }, 2000);
    });
}

// ===== تشغيل الصوت =====
async function initAudio() {
    bgMusic = document.getElementById('bgMusic');
    
    try {
        await bgMusic.play();
        bgMusic.volume = 0.3;
    } catch (e) {
        console.log('Audio autoplay blocked:', e);
    }
}

// ===== انفجار قلوب =====
function createBurstHearts() {
    const container = document.getElementById('floatingHearts');
    const colors = ['💜', '💖', '💕', '💗', '🪻', '✨'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = colors[Math.floor(Math.random() * colors.length)];
        
        const x = 30 + Math.random() * 40;
        const delay = Math.random() * 1;
        
        heart.style.cssText = `
            left: ${x}%;
            bottom: 20%;
            animation-delay: ${delay}s;
            font-size: ${15 + Math.random() * 20}px;
        `;
        
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 5000);
    }
}

// ===== أداة مساعدة: عداد الوقت =====
function getTimeSince(date) {
    const now = new Date();
    const diff = now - new Date(date);
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
}

// ===== أداة مساعدة: تنسيق الأرقام =====
function pad(num) {
    return num.toString().padStart(2, '0');
}