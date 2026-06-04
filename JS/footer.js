// ===== إعدادات =====
const FIRST_DAY = new Date('2026-01-01T00:00:00'); // ✅ تاريخ التعارف: 1/1/2026

// ===== اقتباسات الحب =====
const loveQuotes = [
    { text: "أحبكِ ليس لأنكِ مثالية، بل لأنكِ أنتِ", author: "— لكِ" },
    { text: "في عالم مليء بالفوضى، أنتِ سلامي", author: "— لكِ" },
    { text: "كل يوم معكِ هو قصة حب جديدة", author: "— لكِ" },
    { text: "أنتِ نجمتي التي تضيء ظلام ليالي", author: "— لكِ" },
    { text: "حبكِ هو أجمل ما حدث في حياتي", author: "— لكِ" },
    { text: "أريد أن أكون سبب ابتسامتكِ دائماً", author: "— لكِ" },
    { text: "أنتِ بيتي، وأنا لن أغادر أبداً", author: "— لكِ" },
    { text: "معكِ تتوقف الساعة وتبدأ الأحلام", author: "— لكِ" },
    { text: "أحبكِ أكثر من الأمس وأقل من الغد", author: "— لكِ" },
    { text: "أنتِ قصيدتي التي لا تنتهي", author: "— لكِ" }
];

// ===== عند التحميل =====
document.addEventListener('DOMContentLoaded', () => {
    initLoveCounter();
    initQuotes();
    initKissButton();
    initSignature();
    initRestart();
    initLilac();
    initParticles();
});

// ===== عداد أيام الحب =====
function initLoveCounter() {
    const daysEl = document.getElementById('counterDays');
    const heartsContainer = document.getElementById('counterHearts');
    
    if (!daysEl) return;
    
    function updateCounter() {
        const now = new Date();
        const diff = now - FIRST_DAY;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        // التأكد من أن العداد موجب
        const displayDays = Math.max(0, days);
        
        animateNumber(daysEl, parseInt(daysEl.textContent) || 0, displayDays, 2000);
        
        // إضافة قلوب عائمة
        if (heartsContainer && heartsContainer.children.length < 10) {
            createFloatingHeart(heartsContainer);
        }
    }
    
    updateCounter();
    setInterval(updateCounter, 60000); // تحديث كل دقيقة
    
    // إنشاء قلوب عائمة
    if (heartsContainer) {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => createFloatingHeart(heartsContainer), i * 500);
        }
    }
}

function createFloatingHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'counter-heart';
    heart.textContent = ['💜', '💖', '💕', '🪻'][Math.floor(Math.random() * 4)];
    
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 3 + 's';
    heart.style.animationDuration = (3 + Math.random() * 2) + 's';
    
    container.appendChild(heart);
    
    // إعادة تعيين بعد انتهاء الحركة
    setTimeout(() => {
        if (heart.parentNode) {
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
        }
    }, 5000);
}

// ===== الرسائل المتغيرة =====
function initQuotes() {
    const textEl = document.getElementById('quoteText');
    const authorEl = document.getElementById('quoteAuthor');
    
    if (!textEl || !authorEl) return;
    
    let currentIndex = 0;
    
    function showQuote() {
        const quote = loveQuotes[currentIndex];
        
        // تأثير التلاشي
        textEl.style.opacity = '0';
        authorEl.style.opacity = '0';
        
        setTimeout(() => {
            textEl.textContent = quote.text;
            authorEl.textContent = quote.author;
            
            textEl.style.opacity = '1';
            authorEl.style.opacity = '1';
            
            currentIndex = (currentIndex + 1) % loveQuotes.length;
        }, 500);
    }
    
    // تأثير الانتقال
    textEl.style.transition = 'opacity 0.5s';
    authorEl.style.transition = 'opacity 0.5s';
    
    showQuote();
    setInterval(showQuote, 5000);
}

// ===== زر القبلة =====
function initKissButton() {
    const btn = document.getElementById('kissBtn');
    const container = document.getElementById('flyingKisses');
    
    if (!btn || !container) {
        console.error('Kiss button or container not found!');
        return;
    }
    
    // إزالة أي مستمعين سابقين
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Kiss button clicked!');
        
        // إنشاء قبلة طائرة
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createFlyingKiss(container);
            }, i * 100);
        }
        
        // تأثير الزر
        newBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            newBtn.style.transform = '';
        }, 150);
    });
}

function createFlyingKiss(container) {
    const kiss = document.createElement('div');
    kiss.className = 'flying-kiss';
    
    const emojis = ['💋', '💜', '💖', '💕', '🪻', '✨', '💗', '💓'];
    kiss.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    const startX = 30 + Math.random() * 40;
    kiss.style.left = startX + '%';
    kiss.style.bottom = '20%';
    kiss.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem';
    
    container.appendChild(kiss);
    
    // إزالة بعد الانتهاء
    setTimeout(() => {
        if (kiss.parentNode) {
            kiss.remove();
        }
    }, 4000);
}

// ===== التوقيع الرقمي =====
function initSignature() {
    const dateEl = document.getElementById('signatureDate');
    if (!dateEl) return;
    
    const today = new Date();
    
    dateEl.textContent = today.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ===== إعادة التشغيل =====
function initRestart() {
    const btn = document.getElementById('restartBtn');
    
    if (!btn) {
        console.error('Restart button not found!');
        return;
    }
    
    // إزالة أي مستمعين سابقين
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Restart button clicked!');
        
        // تأثير الانتقال
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    });
}

// ===== أداة مساعدة: عداد الأرقام =====
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