// ===== Canvas setup =====
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let isDrawing = false;
let hue = 0;

// ===== رسائل الشرارات =====
const sparkMessages = [
    'شهد 💜',
    'أحبكِ',
    'إلى الأبد',
    'ملكتي',
    'سعادتي',
    'نوري',
    'حياتي',
    'قلبي'
];
let messageIndex = 0;

// ===== عند التحميل =====
document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    initFireworks();
    initLilac();
    initParticles();
});

function initCanvas() {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();
}

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}

// ===== الألعاب النارية =====
function initFireworks() {
    // نقر
    canvas.addEventListener('mousedown', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createFirework(x, y);
        showSparkMessage();
        changeSkyColor();
    });
    
    // سحب
    canvas.addEventListener('mousemove', (e) => {
        if (e.buttons === 1) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            if (Math.random() > 0.7) {
                createFirework(x, y, true);
            }
        }
    });
    
    // لمس
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        createFirework(x, y);
        showSparkMessage();
        changeSkyColor();
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        if (Math.random() > 0.7) {
            createFirework(x, y, true);
        }
    });
}

// ===== إنشاء الألعاب النارية =====
function createFirework(x, y, isSmall = false) {
    const particleCount = isSmall ? 15 : 30;
    const colors = [
        `hsl(${hue}, 100%, 60%)`,
        `hsl(${(hue + 30) % 360}, 100%, 70%)`,
        `hsl(${(hue + 60) % 360}, 100%, 50%)`,
        '#FFD700',
        '#FF69B4',
        '#C8A2C8'
    ];
    
    for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = isSmall ? 2 + Math.random() * 3 : 4 + Math.random() * 6;
        
        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            life: 1,
            decay: 0.01 + Math.random() * 0.02,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: isSmall ? 2 + Math.random() * 2 : 3 + Math.random() * 3,
            gravity: 0.05
        });
    }
    
    hue = (hue + 20) % 360;
}

// ===== Animation loop =====
function animate() {
    ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.life -= p.decay;
        p.vx *= 0.98;
        p.vy *= 0.98;
        
        if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fill();
        
        // توهج
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life * 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life * 0.3;
        ctx.fill();
    }
    
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
}

// ===== رسالة الشرارات =====
function showSparkMessage() {
    const container = document.getElementById('sparkMessage');
    const text = document.getElementById('sparkText');
    
    text.textContent = sparkMessages[messageIndex];
    messageIndex = (messageIndex + 1) % sparkMessages.length;
    
    container.classList.add('show');
    
    setTimeout(() => {
        container.classList.remove('show');
    }, 2000);
}

// ===== تغيير لون السماء =====
function changeSkyColor() {
    const sky = document.getElementById('skyColors');
    const colors = [
        'rgba(155, 89, 182, 0.1)',
        'rgba(255, 105, 180, 0.1)',
        'rgba(255, 215, 0, 0.1)',
        'rgba(200, 162, 200, 0.1)',
        'rgba(255, 20, 147, 0.1)'
    ];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sky.style.background = `radial-gradient(circle at 50% 50%, ${randomColor}, transparent 70%)`;
    
    setTimeout(() => {
        sky.style.background = '';
    }, 2000);
}