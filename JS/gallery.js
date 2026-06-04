// ===== عند التحميل =====
document.addEventListener('DOMContentLoaded', () => {
    initFilm();
    initGalleryItems();
    initCompareSlider();
    initLilac();
    initParticles();
});

// ===== الفيلم التلقائي =====
let isPlaying = false;
let filmInterval = null;
const filmPhotos = [
    { icon: '💑', text: 'أول لقاء' },
    { icon: '🌅', text: 'غروب الشمس' },
    { icon: '🎉', text: 'احتفال' },
    { icon: '🌸', text: 'ورد الليلك' },
    { icon: '💍', text: 'لحظة مميزة' },
    { icon: '🌙', text: 'ليلة هادئة' }
];
let currentPhotoIndex = 0;

function initFilm() {
    const frame = document.getElementById('filmFrame');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const filmPlay = document.getElementById('filmPlay');
    
    frame.addEventListener('click', () => {
        if (!isPlaying) startFilm();
        else pauseFilm();
    });
    
    playBtn.addEventListener('click', startFilm);
    pauseBtn.addEventListener('click', pauseFilm);
    filmPlay.addEventListener('click', (e) => {
        e.stopPropagation();
        startFilm();
    });
}

function startFilm() {
    if (isPlaying) return;
    
    isPlaying = true;
    const frame = document.getElementById('filmFrame');
    const status = document.getElementById('filmStatus');
    
    frame.classList.add('playing');
    status.textContent = 'جارٍ العرض...';
    
    filmInterval = setInterval(() => {
        currentPhotoIndex = (currentPhotoIndex + 1) % filmPhotos.length;
        updateFilmPhoto();
        updateProgress();
    }, 2000);
    
    updateFilmPhoto();
    updateProgress();
}

function pauseFilm() {
    isPlaying = false;
    const frame = document.getElementById('filmFrame');
    const status = document.getElementById('filmStatus');
    
    frame.classList.remove('playing');
    status.textContent = 'متوقف مؤقتاً';
    
    if (filmInterval) {
        clearInterval(filmInterval);
        filmInterval = null;
    }
}

function updateFilmPhoto() {
    const photo = document.getElementById('filmPhoto');
    const current = filmPhotos[currentPhotoIndex];
    
    photo.innerHTML = `
        <div style="text-align: center; animation: fadeIn 0.5s;">
            <div style="font-size: 4rem; margin-bottom: 15px;">${current.icon}</div>
            <div style="font-size: 1.3rem; color: var(--lilac-light);">${current.text}</div>
        </div>
    `;
}

function updateProgress() {
    const progress = document.getElementById('filmProgress');
    const percentage = ((currentPhotoIndex + 1) / filmPhotos.length) * 100;
    progress.style.width = percentage + '%';
}

// ===== عناصر المعرض =====
function initGalleryItems() {
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach(item => {
        item.addEventListener('click', () => {
            const story = item.getAttribute('data-story');
            showStoryModal(story);
        });
    });
}

function showStoryModal(story) {
    // إزالة أي modal سابق
    const existing = document.querySelector('.story-modal');
    if (existing) existing.remove();
    
    const modal = document.createElement('div');
    modal.className = 'story-modal';
    modal.innerHTML = `
        <div class="story-content">
            <div class="story-title">💭 قصة هذه اللحظة</div>
            <div class="story-text">${story}</div>
            <button class="story-close">أغلق ✨</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // إظهار
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
    
    // إغلاق
    modal.querySelector('.story-close').addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// ===== مقارنة قبل/بعد =====
function initCompareSlider() {
    const slider = document.getElementById('compareSlider');
    const handle = document.getElementById('compareHandle');
    const before = slider.querySelector('.compare-before');
    
    let isDragging = false;
    
    handle.addEventListener('mousedown', () => isDragging = true);
    document.addEventListener('mouseup', () => isDragging = false);
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const rect = slider.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        
        const clamped = Math.max(5, Math.min(95, percentage));
        
        before.style.width = clamped + '%';
        handle.style.left = clamped + '%';
    });
    
    // للمس
    handle.addEventListener('touchstart', () => isDragging = true);
    document.addEventListener('touchend', () => isDragging = false);
    
    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const rect = slider.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        
        const clamped = Math.max(5, Math.min(95, percentage));
        
        before.style.width = clamped + '%';
        handle.style.left = clamped + '%';
    });
}

// ===== إضافة أنماط CSS ديناميكية =====
const galleryStyles = document.createElement('style');
galleryStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(galleryStyles);