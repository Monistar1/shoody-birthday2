// ===== إعدادات الموسيقى =====
let isPlaying = false;
let audio = null;
let lyricsInterval = null;

// ===== رابط الأغنية =====
// غير هذا الرابط لما تحط الملف في مجلد assets/
const AUDIO_URL = 'assets/mia-sebastians-theme.mp3'; 
// أو استخدم رابط مباشر إذا لقيت: 'https://...'

// ===== كلمات الأغنية (مُتزامنة) =====
const lyrics = [
    { text: "🎵 Mia & Sebastian's Theme", time: 0 },
    { text: "نغمة تدق باسم الحب", time: 10 },
    { text: "كل نوتة تحكي قصتنا", time: 20 },
    { text: "أنتِ لحني المفضل", time: 30 },
    { text: "معكِ تصبح الحياة أجمل", time: 40 },
    { text: "إلى الأبد يا شهد", time: 50 },
    { text: "🎹 🎵 💜", time: 60 }
];

let currentLyric = 0;
let audioStartTime = 0;

// ===== عند التحميل =====
document.addEventListener('DOMContentLoaded', () => {
    initMusic();
    initDanceButton();
    initLilac();
    initParticles();
});

// ===== الموسيقى =====
function initMusic() {
    const playBtn = document.getElementById('playMusicBtn');
    const pauseBtn = document.getElementById('pauseMusicBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const record = document.getElementById('vinylRecord');
    const tonearm = document.getElementById('tonearm');
    const waves = document.querySelectorAll('.wave-bar');
    
    if (!playBtn || !pauseBtn) return;
    
    // إنشاء عنصر الصوت
    audio = new Audio(AUDIO_URL);
    audio.loop = true;
    audio.volume = 0.5;
    
    // معالجة الأخطاء
    audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        const lyricsText = document.getElementById('lyricsText');
        if (lyricsText) {
            lyricsText.innerHTML = '<p class="lyric-line active">⚠️ لا يمكن تحميل الأغنية. تأكد من وجود الملف في مجلد assets/</p>';
        }
    });
    
    playBtn.addEventListener('click', async () => {
        if (isPlaying) return;
        
        try {
            await audio.play();
            isPlaying = true;
            audioStartTime = Date.now();
            playBtn.classList.add('active');
            
            // تشغيل القرص
            if (record) record.classList.add('playing');
            if (tonearm) tonearm.classList.add('playing');
            
            // تشغيل الموجات
            waves.forEach(wave => wave.classList.add('active'));
            
            // عرض الكلمات
            startLyrics();
            
        } catch (err) {
            console.error('Play error:', err);
            alert('تأكد من وجود ملف الأغنية في: ' + AUDIO_URL);
        }
    });
    
    pauseBtn.addEventListener('click', () => {
        if (!isPlaying) return;
        
        audio.pause();
        isPlaying = false;
        playBtn.classList.remove('active');
        
        // إيقاف القرص
        if (record) record.classList.remove('playing');
        if (tonearm) tonearm.classList.remove('playing');
        
        // إيقاف الموجات
        waves.forEach(wave => wave.classList.remove('active'));
        
        // إيقاف الكلمات
        stopLyrics();
    });
    
    // مستوى الصوت
    volumeSlider.addEventListener('input', (e) => {
        if (audio) {
            audio.volume = e.target.value / 100;
        }
    });
    
    // عند انتهاء الأغنية
    audio.addEventListener('ended', () => {
        if (record) record.classList.remove('playing');
        if (tonearm) tonearm.classList.remove('playing');
        waves.forEach(wave => wave.classList.remove('active'));
        isPlaying = false;
        playBtn.classList.remove('active');
    });
}

// ===== عرض الكلمات المُتزامنة =====
function startLyrics() {
    const lyricsText = document.getElementById('lyricsText');
    if (!lyricsText) return;
    
    currentLyric = 0;
    
    function updateLyrics() {
        if (!isPlaying || !audio) return;
        
        const currentTime = audio.currentTime;
        
        // البحث عن الكلمة المناسبة للوقت الحالي
        for (let i = lyrics.length - 1; i >= 0; i--) {
            if (currentTime >= lyrics[i].time) {
                if (currentLyric !== i) {
                    currentLyric = i;
                    showLyric(lyrics[i].text);
                }
                break;
            }
        }
        
        lyricsInterval = requestAnimationFrame(updateLyrics);
    }
    
    updateLyrics();
}

function showLyric(text) {
    const lyricsText = document.getElementById('lyricsText');
    if (!lyricsText) return;
    
    lyricsText.innerHTML = `
        <p class="lyric-line active" style="animation: fadeInUp 0.5s ease-out;">
            ${text}
        </p>
    `;
}

function stopLyrics() {
    if (lyricsInterval) {
        cancelAnimationFrame(lyricsInterval);
        lyricsInterval = null;
    }
    
    const lyricsText = document.getElementById('lyricsText');
    if (lyricsText) {
        lyricsText.innerHTML = '<p class="lyric-line active">🎵 اضغط تشغيل لبدء الأغنية</p>';
    }
}

// ===== زر الرقص =====
function initDanceButton() {
    const danceBtn = document.getElementById('danceBtn');
    const cameraPreview = document.getElementById('cameraPreview');
    
    if (!danceBtn || !cameraPreview) return;
    
    danceBtn.addEventListener('click', async () => {
        cameraPreview.classList.toggle('show');
        
        if (cameraPreview.classList.contains('show')) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: 'user' } 
                });
                
                const video = document.createElement('video');
                video.srcObject = stream;
                video.autoplay = true;
                video.playsInline = true;
                video.style.width = '100%';
                video.style.height = '100%';
                video.style.objectFit = 'cover';
                video.style.borderRadius = '20px';
                
                cameraPreview.innerHTML = '';
                cameraPreview.appendChild(video);
                
            } catch (err) {
                console.error('Camera error:', err);
                cameraPreview.innerHTML = `
                    <div class="camera-placeholder">
                        <span>❌ لا يمكن الوصول للكاميرا</span>
                        <span class="camera-sub">تأكد من إعطاء الإذن</span>
                    </div>
                `;
            }
        } else {
            const video = cameraPreview.querySelector('video');
            if (video && video.srcObject) {
                video.srcObject.getTracks().forEach(track => track.stop());
            }
            cameraPreview.innerHTML = `
                <div class="camera-placeholder">
                    <span>📷 الكاميرا ستظهر هنا</span>
                    <span class="camera-sub">(يتطلب إذن الكاميرا)</span>
                </div>
            `;
        }
    });
}

// ===== إضافة أنماط CSS ديناميكية =====
const musicStyles = document.createElement('style');
musicStyles.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(musicStyles);