// ===== عند التحميل =====
document.addEventListener('DOMContentLoaded', () => {
    initGiftBox();
    initLilac();
    initParticles();
});

// ===== صندوق الهدية =====
function initGiftBox() {
    const container = document.getElementById('giftBoxContainer');
    const box = document.getElementById('giftBox');
    const lid = document.getElementById('boxLid');
    const instructions = document.getElementById('giftInstructions');
    const content = document.getElementById('giftContent');
    const letterDate = document.getElementById('letterDate');
    
    // تعيين التاريخ
    const today = new Date();
    letterDate.textContent = today.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    container.addEventListener('click', () => {
        if (content.classList.contains('show')) return;
        
        // فتح الغطاء
        lid.classList.add('open');
        
        // إخفاء التعليمات
        instructions.classList.add('hidden');
        
        // إيقاف الاهتزاز
        box.style.animation = 'none';
        
        // Confetti
        createGiftConfetti();
        
        // إظهار المحتوى
        setTimeout(() => {
            content.classList.add('show');
        }, 600);
        
        // صوت (اختياري)
        playGiftSound();
    });
}

// ===== Confetti =====
function createGiftConfetti() {
    const container = document.getElementById('giftConfetti');
    const colors = ['#C8A2C8', '#E6E6FA', '#FFD700', '#FF69B4', '#9B59B6', '#FF6347'];
    const shapes = ['circle', 'heart', 'star'];
    
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            let style = `
                position: absolute;
                left: ${50 + (Math.random() - 0.5) * 60}%;
                top: 40%;
                width: ${8 + Math.random() * 10}px;
                height: ${8 + Math.random() * 10}px;
                background: ${color};
                pointer-events: none;
                z-index: 100;
                box-shadow: 0 0 10px ${color};
            `;
            
            if (shape === 'circle') {
                style += 'border-radius: 50%;';
            } else if (shape === 'heart') {
                confetti.innerHTML = '💜';
                style += 'background: transparent; font-size: 16px;';
            } else if (shape === 'star') {
                confetti.innerHTML = '✨';
                style += 'background: transparent; font-size: 16px;';
            }
            
            confetti.style.cssText = style;
            container.appendChild(confetti);
            
            // حركة الانفجار
            const angle = Math.random() * Math.PI * 2;
            const velocity = 5 + Math.random() * 10;
            let x = 0, y = 0;
            let vx = Math.cos(angle) * velocity;
            let vy = Math.sin(angle) * velocity - 15;
            let gravity = 0.4;
            let rotation = 0;
            let opacity = 1;
            
            function animate() {
                x += vx;
                y += vy;
                vy += gravity;
                vx *= 0.98;
                rotation += 5;
                opacity -= 0.008;
                
                confetti.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
                confetti.style.opacity = opacity;
                
                if (opacity > 0 && y < window.innerHeight) {
                    requestAnimationFrame(animate);
                } else {
                    confetti.remove();
                }
            }
            
            requestAnimationFrame(animate);
        }, i * 10);
    }
}

// ===== صوت الهدية (اختياري) =====
function playGiftSound() {
    // يمكن إضافة صوت هنا
    // const audio = new Audio('path/to/sound.mp3');
    // audio.play().catch(e => console.log('Audio blocked:', e));
}