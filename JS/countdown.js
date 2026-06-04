// ===== JSONBin Config =====
const JSONBIN_API_KEY = '$2a$10$uY7NFQb8Xmu9D/H9V3Ccme2.pjUbYs6ESZRxzs34m1v6fStbnBlwa';
const JSONBIN_BIN_ID = '6a20b418f5f4af5e29b51ba6';
const API_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

// ===== إعدادات العد التنازلي =====
const BIRTHDAY = new Date('2026-11-01T00:00:00');

const dailyMessages = [
    "باقي أيام قليلة ونحتفل بأجمل يوم في حياتي",
    "كل يوم يمر يزيد شوقي ليوم ميلادك",
    "أنتِ أجمل هدية حصلت عليها في حياتي",
    "يوم ميلادك = بداية سنة جديدة من السعادة",
    "لا يوجد شيء أجمل من الاحتفال بكِ",
    "قلبي يخفق بسرعة كلما اقترب موعد فرحتنا",
    "أعدكِ بأجمل يوم ميلاد في حياتكِ",
    "أنتِ تستحقين كل الحب في هذا العالم"
];

// ===== عند التحميل =====
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initDailyMessage();
    initWishes();
    initThoughtCounter();
    initLilac();
    initParticles();
});

// ===== العد التنازلي =====
function initCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date();
    const diff = BIRTHDAY - now;
    
    if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        document.querySelector('.page-title').textContent = '🎉 اليوم هو يومكِ يا ملكتي!';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (daysEl) daysEl.textContent = pad(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minutesEl) minutesEl.textContent = pad(minutes);
    if (secondsEl) secondsEl.textContent = pad(seconds);
    
    const totalSeconds = Math.floor(diff / 1000);
    const maxSeconds = 30 * 24 * 60 * 60;
    const percentage = Math.max(0, Math.min(100, (totalSeconds / maxSeconds) * 100));
    
    const sandTop = document.getElementById('sandTop');
    const sandBottom = document.getElementById('sandBottom');
    
    if (sandTop && sandBottom) {
        sandTop.style.height = percentage + '%';
        sandBottom.style.height = (100 - percentage) + '%';
    }
}

// ===== الرسالة اليومية =====
function initDailyMessage() {
    const dayIndex = new Date().getDate() % dailyMessages.length;
    const message = dailyMessages[dayIndex];
    
    const textElement = document.getElementById('messageText');
    if (!textElement) return;
    
    let index = 0;
    textElement.textContent = '';
    
    function typeMessage() {
        if (index < message.length) {
            textElement.textContent += message.charAt(index);
            index++;
            setTimeout(typeMessage, 80);
        }
    }
    
    setTimeout(typeMessage, 500);
}

// ===== صندوق الرسائل (JSONBin — شات جماعي) =====
async function initWishes() {
    const wishesList = document.getElementById('wishesList');
    const wishInput = document.getElementById('wishInput');
    const wishBtn = document.getElementById('wishBtn');
    
    if (!wishesList || !wishInput || !wishBtn) return;
    
    await loadWishes();
    setInterval(loadWishes, 3000);
    
    wishBtn.addEventListener('click', () => {
        const text = wishInput.value.trim();
        if (text) {
            addWish(text);
            wishInput.value = '';
            createMiniConfetti(wishBtn);
        }
    });
    
    wishInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') wishBtn.click();
    });
}

async function loadWishes() {
    try {
        const response = await fetch(API_URL + '/latest', {
            headers: { 'X-Master-Key': JSONBIN_API_KEY }
        });
        
        if (!response.ok) throw new Error('Failed to load');
        
        const data = await response.json();
        const wishes = data.record.wishes || [];
        
        const wishesList = document.getElementById('wishesList');
        if (!wishesList) return;
        
        if (wishesList.children.length !== wishes.length) {
            wishesList.innerHTML = '';
            wishes.forEach(wish => addWishToDOM(wish));
            wishesList.scrollTop = wishesList.scrollHeight;
        }
        
    } catch (e) {
        console.log('JSONBin error:', e);
    }
}

async function addWish(text) {
    const wishData = {
        text: text,
        date: new Date().toLocaleDateString('ar-SA'),
        time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
        timestamp: new Date().toISOString()
    };
    
    try {
        const getResponse = await fetch(API_URL + '/latest', {
            headers: { 'X-Master-Key': JSONBIN_API_KEY }
        });
        
        if (!getResponse.ok) throw new Error('Failed to get');
        
        const data = await getResponse.json();
        const wishes = data.record.wishes || [];
        wishes.push(wishData);
        
        const putResponse = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_API_KEY
            },
            body: JSON.stringify({ wishes: wishes })
        });
        
        if (!putResponse.ok) throw new Error('Failed to save');
        
        await loadWishes();
        
    } catch (e) {
        console.error('Save error:', e);
    }
}

function addWishToDOM(wish) {
    const list = document.getElementById('wishesList');
    if (!list) return;
    
    const item = document.createElement('div');
    item.className = 'wish-item chat-message';
    item.setAttribute('data-id', wish.id || wish.timestamp);
    
    item.innerHTML = `
        <div class="message-content">
            <span class="message-text">${escapeHtml(wish.text)}</span>
            <span class="message-time">${wish.time || ''}</span>
        </div>
    `;
    
    list.appendChild(item);
    list.scrollTop = list.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== عداد التفكير =====
function initThoughtCounter() {
    const counter = document.getElementById('thoughtCount');
    const fill = document.getElementById('thoughtFill');
    
    if (!counter) return;
    
    let count = parseInt(localStorage.getItem('thoughtCount') || '0');
    
    updateThoughtDisplay(count);
    
    setInterval(() => {
        count++;
        localStorage.setItem('thoughtCount', count);
        updateThoughtDisplay(count);
    }, 3000);
}

function updateThoughtDisplay(count) {
    const counter = document.getElementById('thoughtCount');
    const fill = document.getElementById('thoughtFill');
    
    if (counter) counter.textContent = count.toLocaleString('ar-SA');
    if (fill) fill.style.width = Math.min(100, (count % 100)) + '%';
}

// ===== confetti =====
function createMiniConfetti(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#C8A2C8', '#E6E6FA', '#FFD700', '#FF69B4'];
    
    for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top}px;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(confetti);
        
        const angle = (Math.random() - 0.5) * Math.PI * 2;
        const velocity = 50 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 100;
        
        let x = 0, y = 0;
        let opacity = 1;
        
        function animate() {
            x += vx * 0.016;
            y += vy * 0.016 + 50 * 0.016 * 0.016;
            opacity -= 0.02;
            
            confetti.style.transform = `translate(${x}px, ${y}px)`;
            confetti.style.opacity = opacity;
            
            if (opacity > 0) requestAnimationFrame(animate);
            else confetti.remove();
        }
        
        requestAnimationFrame(animate);
    }
}

// ===== أداة مساعدة =====
function pad(num) {
    return num.toString().padStart(2, '0');
}

// ===== CSS للشات =====
const chatStyle = document.createElement('style');
chatStyle.textContent = `
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    .chat-message {
        background: rgba(200, 162, 200, 0.15) !important;
        border-radius: 15px 15px 15px 5px !important;
        margin-bottom: 8px !important;
        padding: 12px 15px !important;
        border-right: 3px solid var(--lilac-main) !important;
        animation: slideInRight 0.3s ease-out;
    }
    
    .message-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }
    
    .message-text {
        flex: 1;
        word-break: break-word;
    }
    
    .message-time {
        font-size: 0.7rem;
        color: rgba(200, 162, 200, 0.6);
        white-space: nowrap;
    }
`;
document.head.appendChild(chatStyle);