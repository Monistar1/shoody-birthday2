// ===== الرسائل =====
const loveLetters = [
    {
        title: "رسالة الأولى",
        content: `شهد الحبيبة،

في أول يوم عرفتكِ فيه، شعرتُ أن قلبي وجد منزله.
لم أكن أعلم أن الحب يمكن أن يكون بهذا الجمال،
بهذا العمق، بهذه السعادة التي لا تُوصف.

أنتِ البداية الجميلة لكل يوم،
والنهاية الهادئة لكل ليلة.
أحبكِ. 💜`
    },
    {
        title: "رسالة الحب",
        content: `حبيبتي شهد،

أحبكِ أكثر مما تتخيلين،
أكثر مما أستطيع أن أعبر،
أكثر مما تستحقين.

أحبكِ في صمتكِ وفي ضحكتكِ،
في غضبكِ وفي هدوئكِ،
في كل تفاصيلكِ التي تجعلكِ أنتِ.

أنتِ حبي، وعالمي، وكل شيء. 💕`
    },
    {
        title: "رسالة الوفاء",
        content: `شهد الغالية،

أعدكِ أن أكون دائماً بجانبكِ،
في السراء والضراء،
في الصحة والسقم،
في الغنى والفقر.

أعدكِ أن أحبكِ كل يوم أكثر من اليوم الذي قبله،
أن أحترمكِ، أن أقدركِ، أن أدعمكِ.

هذا وعد من قلب يدق باسمكِ فقط. ✨`
    },
    {
        title: "رسالة الأبد",
        content: `إلى شهد — إلى الأبد،

لا أعرف ماذا يخبئ المستقبل،
لكني أعرف شيئاً واحداً بيقين:
أنني أريدكِ فيه.

أريدكِ في كل أيامي،
في كل لحظاتي،
في كل أحلامي.

إلى الأبد يا شهد.
إلى ما لا نهاية. 🌙`
    }
];

// ===== عند التحميل =====
document.addEventListener('DOMContentLoaded', () => {
    initEnvelopes();
    initLilac();
    initParticles();
});

// ===== الأظرف =====
function initEnvelopes() {
    const envelopes = document.querySelectorAll('.envelope');
    
    envelopes.forEach((envelope, index) => {
        envelope.addEventListener('click', () => {
            const letterIndex = parseInt(envelope.getAttribute('data-letter'));
            openLetter(envelope, letterIndex);
        });
    });
}

function openLetter(envelope, index) {
    const seal = envelope.querySelector('.wax-seal');
    const letterView = document.getElementById('letterView');
    const paperContent = document.getElementById('paperContent');
    const paperDate = document.getElementById('paperDate');
    const paperSignature = document.getElementById('paperSignature');
    const paperClose = document.getElementById('paperClose');
    
    // كسر الختم
    seal.classList.add('broken');
    
    // تأثير صوتي (محاكاة)
    createSealParticles(seal);
    
    // الانتظار ثم إظهار الرسالة
    setTimeout(() => {
        const letter = loveLetters[index];
        
        paperContent.innerHTML = `
            <h3 style="color: var(--lilac-dark); margin-bottom: 20px; font-family: 'Amiri', serif;">${letter.title}</h3>
            <p style="white-space: pre-line;">${letter.content}</p>
        `;
        
        const today = new Date();
        paperDate.textContent = today.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        letterView.classList.add('show');
        
        // تأثير الكتابة
        animatePaperContent();
    }, 600);
    
    // إغلاق
    paperClose.addEventListener('click', () => {
        letterView.classList.remove('show');
        envelope.classList.add('opened');
    });
    
    // إغلاق بالنقر خارج الورقة
    letterView.addEventListener('click', (e) => {
        if (e.target === letterView) {
            letterView.classList.remove('show');
            envelope.classList.add('opened');
        }
    });
}

// ===== جزيئات كسر الختم =====
function createSealParticles(seal) {
    const rect = seal.getBoundingClientRect();
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            width: 6px;
            height: 6px;
            background: #DC143C;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 10;
        const velocity = 30 + Math.random() * 40;
        let x = 0, y = 0;
        let opacity = 1;
        
        function animate() {
            x += Math.cos(angle) * velocity * 0.016;
            y += Math.sin(angle) * velocity * 0.016 + 20 * 0.016;
            opacity -= 0.03;
            
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

// ===== تأثير الكتابة على الورقة =====
function animatePaperContent() {
    const content = document.getElementById('paperContent');
    const text = content.innerHTML;
    
    // يمكن إضافة تأثير كتابة هنا
    content.style.opacity = '0';
    content.style.transition = 'opacity 0.5s';
    
    setTimeout(() => {
        content.style.opacity = '1';
    }, 100);
}