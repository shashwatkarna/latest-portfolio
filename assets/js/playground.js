// playground.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Pet Counter Logic ---
    const petCard = document.getElementById('pet-card');
    const petCount = document.getElementById('pet-count');
    const petEmoji = document.getElementById('pet-emoji');
    
    // Load from local storage
    let clicks = localStorage.getItem('petCount') || 0;
    petCount.textContent = clicks;

    petCard.addEventListener('click', () => {
        clicks++;
        petCount.textContent = clicks;
        localStorage.setItem('petCount', clicks);
        
        // Randomize emoji on click
        const dogs = ['🐶', '🐕', '🐩', '🐾', '🦴'];
        petEmoji.textContent = dogs[Math.floor(Math.random() * dogs.length)];
    });

    // --- 2. Drawing Canvas Logic ---
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    const clearBtn = document.getElementById('clear-canvas');

    // Resize canvas to fit its container accurately
    function resizeCanvas() {
        const rect = canvas.parentElement.getBoundingClientRect();
        // Set actual size in memory (scaled to account for pixel ratio).
        canvas.width = rect.width;
        // Adjust for the header height (approx 50px)
        canvas.height = rect.height - 50; 
    }
    
    // We wait a tiny bit to ensure grid layout has computed
    setTimeout(resizeCanvas, 100);
    window.addEventListener('resize', resizeCanvas);

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Set brush style
    ctx.strokeStyle = '#ffb6b9'; // matches accent-1
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;

    function draw(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        [lastX, lastY] = [x, y];
    }

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        [lastX, lastY] = [e.clientX - rect.left, e.clientY - rect.top];
    });

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

    clearBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // --- 3. Music Player Logic ---
    const playBtn = document.getElementById('play-btn');
    const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3');
    audio.loop = true;
    let isPlaying = false;

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playBtn.innerHTML = '▶';
        } else {
            audio.play().catch(e => console.log("Audio play failed:", e));
            playBtn.innerHTML = '⏸';
        }
        isPlaying = !isPlaying;
    });

});
