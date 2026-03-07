// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Navigation link highlighting based on scroll position (to be implemented)

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Secret Section Toggle & Obfuscated Payload Decoder
    const secretTrigger = document.getElementById('secret-trigger');
    const secretSection = document.getElementById('secret-section');
    const secretLocked = document.getElementById('secret-locked-content');
    const secretUnlocked = document.getElementById('secret-unlocked-content');
    const secretInput = document.getElementById('secret-mini-key');

    if (secretTrigger && secretSection) {
        secretTrigger.addEventListener('click', () => {
            secretSection.classList.toggle('active');

            if (secretSection.classList.contains('active')) {
                setTimeout(() => {
                    secretSection.scrollIntoView({ behavior: 'smooth' });
                    if (secretInput && secretLocked && secretLocked.style.display !== 'none') {
                        secretInput.focus();
                    }
                }, 100);
            }
        });
    }

    if (secretInput && secretLocked && secretUnlocked) {
        secretInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if (secretInput.value.trim().toUpperCase() === 'SHASHWAT03') {
                    secretLocked.style.display = 'none';
                    secretUnlocked.style.display = 'block';
                    
                    // Decrypt and Inject HTML securely
                    if (!secretUnlocked.innerHTML.trim() || secretUnlocked.innerHTML.includes('OBFUSCATED_PAYLOAD')) {
                        secretUnlocked.innerHTML = atob(SECURE_PAYLOAD);
                        if (typeof initSecretPlayer === 'function') setTimeout(initSecretPlayer, 100);
                    }

                    sessionStorage.setItem('shashwat_unlocked', 'true');
                    // Ensure logger is available globally
                    if (typeof logActivity === 'function') logActivity('SECURITY: SUBTLE_ACCESS_GRANTED');
                } else {
                    secretInput.value = '';
                    secretInput.parentElement.style.animation = 'glitch-anim 0.2s 3';
                    setTimeout(() => secretInput.parentElement.style.animation = '', 600);
                    if (typeof logActivity === 'function') logActivity('SECURITY: UNAUTHORIZED_ACCESS_ATTEMPT');
                }
            }
        });

        // Parse state from persistent session 
        if (sessionStorage.getItem('shashwat_unlocked') === 'true') {
            secretLocked.style.display = 'none';
            secretUnlocked.style.display = 'block';
            
            if (!secretUnlocked.innerHTML.trim() || secretUnlocked.innerHTML.includes('OBFUSCATED_PAYLOAD')) {
                secretUnlocked.innerHTML = atob(SECURE_PAYLOAD);
                if (typeof initSecretPlayer === 'function') setTimeout(initSecretPlayer, 100);
            }
        }
    }

    // Prev/Next just restart the track for now since it's a single video
    document.getElementById('player-prev')?.addEventListener('click', () => player?.seekTo(0));
    document.getElementById('player-next')?.addEventListener('click', () => player?.seekTo(0));

    // Play/Pause Listener
    const playPauseBtn = document.getElementById('player-play-pause');
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (!player || typeof player.getPlayerState !== 'function') {
                console.error("Player not initialized or ready");
                return;
            }
            const state = player.getPlayerState();
            if (state == YT.PlayerState.PLAYING) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }
        });
    }
});

// YouTube Player Logic (Outside DOMContentLoaded for Global Scope)
let player;
function initSecretPlayer() {
    if (window.YT && window.YT.Player && !player && document.getElementById('yt-player-container')) {
        player = new YT.Player('yt-player-container', {
            height: '1',
            width: '1',
            videoId: 'C7WoqglcHDo',
            playerVars: {
                'playsinline': 1,
                'controls': 0,
                'disablekb': 1,
                'origin': window.location.origin
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
}

function onYouTubeIframeAPIReady() {
    if (document.getElementById('yt-player-container')) {
        initSecretPlayer();
    }
}

function onPlayerReady(event) {
    console.log("YouTube Player Ready");
    const playPauseBtn = document.getElementById('player-play-pause');
    if (playPauseBtn) playPauseBtn.disabled = false;
}

function onPlayerStateChange(event) {
    const playPauseBtn = document.getElementById('player-play-pause');
    const playerStatus = document.getElementById('player-status');
    const visualizer = document.getElementById('visualizer');

    if (!playPauseBtn || !playerStatus || !visualizer) return;

    if (event.data == YT.PlayerState.PLAYING) {
        playPauseBtn.textContent = 'PAUSE';
        playerStatus.textContent = '[ PLAYING ]';
        playerStatus.style.color = '#00ff00';
        visualizer.classList.add('playing');
    } else {
        playPauseBtn.textContent = 'PLAY';
        playerStatus.textContent = '[ STOPPED ]';
        playerStatus.style.color = '#ff0000';
        visualizer.classList.remove('playing');
    }
}

// --- Advanced Enhancements Logic ---

// Upstash Redis Configuration (Anonymous Guestbook)
const REDIS_URL = "https://frank-primate-42451.upstash.io";
const REDIS_TOKEN = "AaXTAAIncDI1OGQ4MDBiYmRmOGU0ZTVmOTZmODMyYjUzZmU0ZjE5M3AyNDI0NTE";

// Guestbook Functions
async function loadComments() {
    const list = document.getElementById('guestbook-list');
    if (!list) return;
    try {
        const res = await fetch(`${REDIS_URL}/lrange/comments/0/49`, { headers: { Authorization: `Bearer ${REDIS_TOKEN}` } });
        const data = await res.json();
        if (data.result) {
            list.innerHTML = data.result.length ? '' : '<div style="font-family: var(--font-body); font-size: 0.8rem; opacity: 0.3; text-align: center;">-- NO_MESSAGES_LOGGED_YET --</div>';
            data.result.forEach(raw => {
                try {
                    const c = JSON.parse(raw);
                    const item = document.createElement('div');
                    item.style.padding = '1.2rem'; item.style.border = '1px solid rgba(0,0,0,0.1)'; item.style.background = 'rgba(0,0,0,0.02)';
                    item.innerHTML = `<div style="font-size:0.7rem;opacity:0.4;margin-bottom:0.5rem;">ANONYMOUS // ${new Date(c.timestamp).toLocaleDateString()}</div><div style="font-size:0.9rem;line-height:1.5;">${c.text.replace(/</g,"&lt;")}</div>`;
                    list.appendChild(item);
                } catch(e) { /* Ignore malformed */ }
            });
        }
    } catch (e) { console.error(e); }
}

async function sendComment() {
    const input = document.getElementById('guestbook-input');
    const btn = document.getElementById('guestbook-send');
    if (!input?.value.trim() || !btn) return;
    const comment = JSON.stringify({ text: input.value.trim(), timestamp: Date.now() });
    btn.disabled = true; btn.textContent = 'TRANSMITTING...';
    try {
        await fetch(`${REDIS_URL}/lpush/comments/${encodeURIComponent(comment)}`, { headers: { Authorization: `Bearer ${REDIS_TOKEN}` } });
        input.value = ''; await loadComments();
    } catch (e) { console.error(e); } finally { btn.disabled = false; btn.textContent = 'Transmit \u2192'; }
}

// Global Initialization for Guestbook
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadComments();
        document.getElementById('guestbook-send')?.addEventListener('click', sendComment);
    });
} else {
    loadComments();
    document.getElementById('guestbook-send')?.addEventListener('click', sendComment);
}

// Secure Base64 Encoded Photography & Hobbies HTML Component
const SECURE_PAYLOAD = "ICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9InNlY3Rpb24taGVhZGVyIj4KICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImhlYWRlci1zcXVhcmUiPjwvZGl2PgogICAgICAgICAgICAgICAgPGgyIGNsYXNzPSJzZWN0aW9uLXRpdGxlIGdsaXRjaC10ZXh0IiBkYXRhLXRleHQ9IlBIT1RPR1JBUEhZICYgSE9CQklFUyI+UEhPVE9HUkFQSFkgJiBIT0JCSUVTPC9oMj4KICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImhlYWRlci1saW5lIj48L2Rpdj4KICAgICAgICAgICAgPC9kaXY+CgogICAgICAgICAgICA8cCBzdHlsZT0iZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtYm9keSk7IG9wYWNpdHk6IDAuODsgbWFyZ2luLWJvdHRvbTogM3JlbTsiPgogICAgICAgICAgICAgICAgQmV5b25kIHRoZSB0ZXJtaW5hbDogY2FwdHVyaW5nIGxpZ2h0LCBmb3JtLCBhbmQgdGhlICJnaG9zdCBpbiB0aGUgbWFjaGluZS4iCiAgICAgICAgICAgIDwvcD4KCiAgICAgICAgICAgIDxkaXYgY2xhc3M9InBob3RvZ3JhcGh5LWdyaWQiPgogICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0icGhvdG8tY2FyZCBicnV0YWwtYm9yZGVyIGJydXRhbC1zaGFkb3ciPgogICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPSJhc3NldHMvaW1nL2hvYmJ5MS5wbmciIGFsdD0iSG9iYnkgUGhvdG9ncmFwaHkgMSI+CiAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9InBob3RvLWNhcmQgYnJ1dGFsLWJvcmRlciBicnV0YWwtc2hhZG93Ij4KICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz0iYXNzZXRzL2ltZy9ob2JieTIucG5nIiBhbHQ9IkhvYmJ5IFBob3RvZ3JhcGh5IDIiPgogICAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJwaG90by1jYXJkIGJydXRhbC1ib3JkZXIgYnJ1dGFsLXNoYWRvdyI+CiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9ImFzc2V0cy9pbWcvaG9iYnkzLnBuZyIgYWx0PSJIb2JieSBQaG90b2dyYXBoeSAzIj4KICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICA8L2Rpdj4KCiAgICAgICAgICAgIDwhLS0gSG9iYnkgU2tpbGwgVHJlZSAmIE11c2ljIFBsYXllciAtLT4KICAgICAgICAgICAgPGRpdiBzdHlsZT0iZGlzcGxheTogZ3JpZDsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgzMDBweCwgMWZyKSk7IGdhcDogNHJlbTsgbWFyZ2luLXRvcDogNnJlbTsiPgogICAgICAgICAgICAgICAgPCEtLSBTa2lsbCBUcmVlIC0tPgogICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iaG9iYnktc2tpbGwtdHJlZSBicnV0YWwtYm9yZGVyIGJydXRhbC1zaGFkb3ciIHN0eWxlPSJwYWRkaW5nOiAycmVtOyI+CiAgICAgICAgICAgICAgICAgICAgPGgzIHN0eWxlPSJmb250LWZhbWlseTogdmFyKC0tZm9udC1oZWFkaW5nKTsgbWFyZ2luLWJvdHRvbTogMnJlbTsgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHZhcigtLXRleHQtcHJpbWFyeSk7IGRpc3BsYXk6IGlubGluZS1ibG9jazsiPlBFUlNPTkFMX1NUQVRTLlNZUzwvaDM+CiAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ic2tpbGwtbWV0ZXItZ3JvdXAiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJza2lsbC1tZXRlci1sYWJlbCI+UEhPVE9HUkFQSFkgPHNwYW4gY2xhc3M9InNraWxsLXZhbCI+TFZMIDA4PC9zcGFuPjwvZGl2PgogICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJza2lsbC1tZXRlci1iYXIgYnJ1dGFsLWJvcmRlciI+PGRpdiBjbGFzcz0ic2tpbGwtbWV0ZXItZmlsbCIgc3R5bGU9IndpZHRoOiA4MCU7Ij48L2Rpdj48L2Rpdj4KICAgICAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJza2lsbC1tZXRlci1ncm91cCI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9InNraWxsLW1ldGVyLWxhYmVsIj5HQU1JTkcgPHNwYW4gY2xhc3M9InNraWxsLXZhbCI+TFZMIDA5PC9zcGFuPjwvZGl2PgogICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJza2lsbC1tZXRlci1iYXIgYnJ1dGFsLWJvcmRlciI+PGRpdiBjbGFzcz0ic2tpbGwtbWV0ZXItZmlsbCIgc3R5bGU9IndpZHRoOiA5MCU7Ij48L2Rpdj48L2Rpdj4KICAgICAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJza2lsbC1tZXRlci1ncm91cCI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9InNraWxsLW1ldGVyLWxhYmVsIj5UUkVLS0lORyA8c3BhbiBjbGFzcz0ic2tpbGwtdmFsIj5MVkwgMDU8L3NwYW4+PC9kaXY+CiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9InNraWxsLW1ldGVyLWJhciBicnV0YWwtYm9yZGVyIj48ZGl2IGNsYXNzPSJza2lsbC1tZXRlci1maWxsIiBzdHlsZT0id2lkdGg6IDUwJTsiPjwvZGl2PjwvZGl2PgogICAgICAgICAgICAgICAgICAgIDwvZGl2PgoKICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJza2lsbC1tZXRlci1ncm91cCI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9InNraWxsLW1ldGVyLWxhYmVsIj5DSEVTUyA8c3BhbiBjbGFzcz0ic2tpbGwtdmFsIj5MVkwgMDc8L3NwYW4+PC9kaXY+CiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9InNraWxsLW1ldGVyLWJhciBicnV0YWwtYm9yZGVyIj48ZGl2IGNsYXNzPSJza2lsbC1tZXRlci1maWxsIiBzdHlsZT0id2lkdGg6IDcwJTsiPjwvZGl2PjwvZGl2PgogICAgICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICAgPC9kaXY+CgogICAgICAgICAgICAgICAgPCEtLSBNdXNpYyBQbGF5ZXIgLS0+CiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJyZXRyby1wbGF5ZXIgYnJ1dGFsLWJvcmRlciBicnV0YWwtc2hhZG93IiBzdHlsZT0icGFkZGluZzogMnJlbTsgYmFja2dyb3VuZDogIzExMTsgY29sb3I6ICMwMGZmMDA7Ij4KICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJwbGF5ZXItaGVhZGVyIiBzdHlsZT0iZGlzcGxheTogZmxleDsganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyBtYXJnaW4tYm90dG9tOiAxLjVyZW07IGZvbnQtc2l6ZTogMC43cmVtOyBmb250LWZhbWlseTogdmFyKC0tZm9udC1ib2R5KTsiPgogICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5TX1BMQVlFUi5FWEU8L3NwYW4+CiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9InBsYXllci1zdGF0dXMiIHN0eWxlPSJjb2xvcjogI2ZmMDAwMDsiPlsgU1RPUFBFRCBdPC9kaXY+CiAgICAgICAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0icGxheWVyLWRpc3BsYXkgYnJ1dGFsLWJvcmRlciIgc3R5bGU9InBhZGRpbmc6IDFyZW07IGJhY2tncm91bmQ6ICMwMDA7IG1hcmdpbi1ib3R0b206IDEuNXJlbTsgcG9zaXRpb246IHJlbGF0aXZlOyI+CiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gSGlkZGVuIFlvdVR1YmUgUGxheWVyIC0tPgogICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPSJ5dC1wbGF5ZXItY29udGFpbmVyIiBzdHlsZT0icG9zaXRpb246IGFic29sdXRlOyB3aWR0aDogMXB4OyBoZWlnaHQ6IDFweDsgb3BhY2l0eTogMC4wMTsgcG9pbnRlci1ldmVudHM6IG5vbmU7Ij48L2Rpdj4KICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9InRyYWNrLWluZm8iIHN0eWxlPSJmb250LWZhbWlseTogdmFyKC0tZm9udC1ib2R5KTsgZm9udC1zaXplOiAwLjhyZW07IG92ZXJmbG93OiBoaWRkZW47IHdoaXRlLXNwYWNlOiBub3dyYXA7Ij4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJzY3JvbGxpbmctdGV4dCI+Tk9XX1BMQVlJTkc6IExPLUZJX0JFQVRTX0ZPUl9DT0RJTkdfJl9ERVNJR04gLy8gU0hBU0hXQVRfUkFESU8gLy88L3NwYW4+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPSJ2aXN1YWxpemVyIiBjbGFzcz0idmlzdWFsaXplciIgc3R5bGU9ImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBmbGV4LWVuZDsgZ2FwOiA0cHg7IGhlaWdodDogMzBweDsgbWFyZ2luLXRvcDogMXJlbTsiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0idi1iYXIiPjwvZGl2PjxkaXYgY2xhc3M9InYtYmFyIj48L2Rpdj48ZGl2IGNsYXNzPSJ2LWJhciI+PC9kaXY+PGRpdiBjbGFzcz0idi1iYXIiPjwvZGl2PjxkaXYgY2xhc3M9InYtYmFyIj48L2Rpdj48ZGl2IGNsYXNzPSJ2LWJhciI+PC9kaXY+PGRpdiBjbGFzcz0idi1iYXIiPjwvZGl2PjxkaXYgY2xhc3M9InYtYmFyIj48L2Rpdj4KICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgICAgICAgICAgPC9kaXY+CgogICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9InBsYXllci1jb250cm9scyIgc3R5bGU9ImRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogY2VudGVyOyBnYXA6IDFyZW07Ij4KICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD0icGxheWVyLXByZXYiIGNsYXNzPSJwbGF5ZXItYnRuIGJydXRhbC1ib3JkZXIiPiZsdDsmbHQ7PC9idXR0b24+CiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9InBsYXllci1wbGF5LXBhdXNlIiBjbGFzcz0icGxheWVyLWJ0biBicnV0YWwtYm9yZGVyIj5QTEFZPC9idXR0b24+CiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9InBsYXllci1uZXh0IiBjbGFzcz0icGxheWVyLWJ0biBicnV0YWwtYm9yZGVyIj4mZ3Q7Jmd0OzwvYnV0dG9uPgogICAgICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9ImZvbnQtc2l6ZTogMC42cmVtOyBtYXJnaW4tdG9wOiAxcmVtOyB0ZXh0LWFsaWduOiBjZW50ZXI7IG9wYWNpdHk6IDAuNTsgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtYm9keSk7Ij4KICAgICAgICAgICAgICAgICAgICAgICAgQVVUT1BMQVkgQkxPQ0tFRCBCWSBCUk9XU0VSIC8vIENMSUNLIFBMQVkgVE8gU1RBUlQKICAgICAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICA8L2Rpdj4=";

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject UI Components (System Activity, CRT Overlay, Terminal)
    const body = document.body;
    const isBlogPage = window.location.pathname.includes('blog.html');
    let activityFeed = null;
    let terminalOverlay = null;

    // Activity Feed (Disabled on Blog)
    if (!isBlogPage) {
        activityFeed = document.createElement('div');
        activityFeed.id = 'activity-feed';
        body.appendChild(activityFeed);
    }

    // CRT Overlay (Disabled on Blog)
    if (!isBlogPage) {
        const crtOverlay = document.createElement('div');
        crtOverlay.id = 'crt-overlay';
        body.appendChild(crtOverlay);
    }

    // Terminal Overlay (Disabled on Blog)
    if (!isBlogPage) {
        terminalOverlay = document.createElement('div');
        terminalOverlay.id = 'terminal-overlay';
    terminalOverlay.innerHTML = `
        <div class="terminal-header">
            <div>SHASHWAT_OS [VERSION 1.0.42]</div>
            <div>(C) 2026 SHASHWAT. ALL RIGHTS RESERVED.</div>
            <div style="margin-top: 0.5rem; font-size: 0.8rem; opacity: 0.7;">TYPE 'HELP' FOR COMMANDS // 'ESC' TO EXIT</div>
        </div>
        <div id="terminal-output">
            <div>WELCOME TO THE CORE SHELL.</div>
        </div>
        <div class="terminal-input-line">
            <span>></span>
            <input type="text" id="terminal-input" autofocus spellcheck="false">
        </div>
    `;
    body.appendChild(terminalOverlay);
    }

    // 0. Inject Footer Hint & Log Toggle
    const footerContent = document.querySelector('.footer-content');
    if (footerContent && !isBlogPage) {
        const container = document.createElement('div');
        container.className = 'footer-hints-container';
        container.style.cssText = "display: flex; flex-direction: column; align-items: flex-start; gap: 0.3rem; font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; margin-top: 5px;";

        // CTRL+K Hint Wrapper
        const hintWrapper = document.createElement('div');
        hintWrapper.style.cssText = "display: flex; align-items: center; gap: 0.5rem;";

        const hintTitle = document.createElement('span');
        hintTitle.style.opacity = "0.4";
        hintTitle.textContent = "SYSTEM SHELL:";

        const hint = document.createElement('span');
        hint.style.cssText = "opacity: 0.6; border: 1px solid currentColor; padding: 2px 5px; border-radius: 3px;";
        hint.textContent = 'CTRL + K';

        hintWrapper.appendChild(hintTitle);
        hintWrapper.appendChild(hint);

        // Log Toggle Text & Button
        const toggleWrapper = document.createElement('div');
        toggleWrapper.style.cssText = "display: flex; align-items: center; gap: 0.5rem; opacity: 0.4;";

        const toggleDesc = document.createElement('span');
        toggleDesc.textContent = "WANT TO SILENCE THE LOGS?";

        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'log-toggle-btn';
        toggleBtn.style.cssText = "background: none; border: 1px solid currentColor; color: inherit; font-family: inherit; font-size: inherit; cursor: pointer; padding: 1px 4px; text-transform: uppercase;";

        // Load initial state
        let logsEnabled = localStorage.getItem('systemLogsEnabled') !== 'false';
        toggleBtn.textContent = logsEnabled ? 'TURN OFF' : 'TURN ON';
        if (!logsEnabled) document.getElementById('activity-feed')?.style.setProperty('display', 'none');

        toggleBtn.addEventListener('click', () => {
            logsEnabled = !logsEnabled;
            localStorage.setItem('systemLogsEnabled', logsEnabled);
            toggleBtn.textContent = logsEnabled ? 'TURN OFF' : 'TURN ON';

            const feed = document.getElementById('activity-feed');
            if (feed) feed.style.display = logsEnabled ? 'flex' : 'none';
        });

        toggleWrapper.appendChild(toggleDesc);
        toggleWrapper.appendChild(toggleBtn);

        container.appendChild(hintWrapper);
        container.appendChild(toggleWrapper);
        footerContent.appendChild(container);
    }

    // 2. Activity Logger Function
    function logActivity(message) {
        if (!activityFeed) return;
        // Respect toggle
        if (localStorage.getItem('systemLogsEnabled') === 'false') return;

        const entry = document.createElement('div');
        entry.className = 'log-entry';
        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        entry.textContent = `[${timestamp}] ${message}`;
        activityFeed.prepend(entry);

        // Auto-remove log after 10 seconds
        setTimeout(() => {
            entry.style.opacity = '0';
            entry.style.transform = 'translateX(-20px)';
            entry.style.transition = 'all 0.5s ease';
            setTimeout(() => {
                if (activityFeed && entry.parentNode === activityFeed) {
                    activityFeed.removeChild(entry);
                }
            }, 500);
        }, 10000);

        // Cycle logs to keep memory low (fallback)
        if (activityFeed.childNodes.length > 20) {
            activityFeed.removeChild(activityFeed.lastChild);
        }
    }

    // Initial OS Boot Logs
    const initialLogsEnabled = localStorage.getItem('systemLogsEnabled') !== 'false';
    if (initialLogsEnabled) {
        logActivity('SYSTEM_BOOT_COMPLETE');
        logActivity('SECURE_SHELL_INITIALIZED');
        logActivity('USER_ACCESS_GRANTED');
        setTimeout(() => logActivity('HINT: PRESS_CTRL+K_FOR_SHELL'), 2000);
    }

    // Monitor global click events for the activity feed
    document.addEventListener('click', (e) => {
        const target = e.target.closest('a, button');
        if (target) {
            const label = target.innerText.trim().replace(/\s+/g, '_').toUpperCase() || 'ELEMENT';
            logActivity(`INTERACTION: CLICK_${label}`);
        }
    });

    // Monitor scroll stabilization
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            logActivity(`VIEWPORT_STABILIZED: Y_${window.scrollY}PX`);
        }, 500);
    });

    // 3. CRT Mode Logic
    function toggleCRT() {
        body.classList.toggle('crt-active');
        logActivity(`SYSTEM_MODE: CRT_${body.classList.contains('crt-active') ? 'ENABLED' : 'DISABLED'}`);
    }

    // 4. Terminal Command Center
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');

    if (!isBlogPage && (!termInput || !termOutput || !terminalOverlay)) {
        console.error('Terminal components missing');
    }

    function printToTerminal(text, color = '#00ff00') {
        if (!termOutput) return;
        const div = document.createElement('div');
        div.style.color = color;
        div.innerHTML = text;
        termOutput.appendChild(div);
        termOutput.scrollTop = termOutput.scrollHeight;
    }

    // Hotkey: Ctrl + K (Global)
    document.addEventListener('keydown', (e) => {
        if (!terminalOverlay || !termInput) return;
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            terminalOverlay.classList.toggle('active');
            if (terminalOverlay.classList.contains('active')) {
                termInput.focus();
                logActivity('SHELL: TERMINAL_OPENED');
            } else {
                logActivity('SHELL: TERMINAL_CLOSED');
            }
        }
        if (e.key === 'Escape' && terminalOverlay.classList.contains('active')) {
            terminalOverlay.classList.remove('active');
            logActivity('SHELL: TERMINAL_CLOSED');
        }
    });

    if (termInput) {
        termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = termInput.value.trim().toLowerCase();
            termInput.value = '';
            printToTerminal(`<span>> ${cmd}</span>`, '#555');

            switch (cmd) {
                case 'help':
                    printToTerminal('AVAILABLE_SYSTEM_COMMANDS:');
                    printToTerminal(' - LS: LIST_S_FILES');
                    printToTerminal(' - CAT [FILE]: READ_S_FILE');
                    printToTerminal(' - GOTO [PAGE]: NAVIGATE_SYSTEM');
                    printToTerminal(' - SKILLS: FETCH_TECH_STACK');
                    printToTerminal(' - SOCIAL: LIST_COMM_LINKS');
                    printToTerminal(' - DATE: SHOW_SYSTEM_TIME');
                    printToTerminal(' - CRT: TOGGLE_IMMERSIVE_MODE');
                    printToTerminal(' - WHOAMI: DISPLAY_IDENTITY');
                    printToTerminal(' - CLEAR: PURGE_OUTPUT');
                    printToTerminal(' - EXIT: DISCONNECT');
                    break;
                case 'ls':
                    printToTerminal('DRV_C_ROOT_DIRECTORY_LISTING:');
                    printToTerminal('MODE       SIZE       DATE          NAME');
                    printToTerminal('----       ----       ----          ----');
                    printToTerminal('dir        -          MAR_07_2026   assets/');
                    printToTerminal('dir        -          MAR_07_2026   docs/');
                    printToTerminal('-r--       8.6KB      MAR_07_2026   index.html');
                    printToTerminal('-r--       13.1KB     MAR_07_2026   about.html');
                    printToTerminal('-r--       7.4KB      MAR_07_2026   projects.html');
                    printToTerminal('-r--       8.8KB      MAR_07_2026   resume.html');
                    printToTerminal('-r--       8.4KB      MAR_07_2026   blog.html');
                    printToTerminal('-r--       5.8KB      MAR_07_2026   contact.html');
                    printToTerminal('-------------------------------------------');
                    printToTerminal('USE "LS [DIR]" TO VIEW SUBDIRECTORIES.');
                    break;
                case 'ls assets':
                case 'ls assets/':
                    printToTerminal('DRV_C_ROOT/ASSETS:');
                    printToTerminal('MODE       SIZE       DATE          NAME');
                    printToTerminal('----       ----       ----          ----');
                    printToTerminal('dir        -          MAR_07_2026   css/');
                    printToTerminal('dir        -          MAR_07_2026   js/');
                    printToTerminal('dir        -          MAR_07_2026   img/');
                    break;
                case 'ls docs':
                case 'ls docs/':
                    printToTerminal('DRV_C_ROOT/DOCS:');
                    printToTerminal('MODE       SIZE       DATE          NAME');
                    printToTerminal('----       ----       ----          ----');
                    printToTerminal('-r--       264KB      MAR_07_2026   RESUME_FINAL.pdf');
                    printToTerminal('-r--       1.2KB      MAR_07_2026   bio.txt');
                    printToTerminal('-r--       2.4KB      MAR_07_2026   experience.md');
                    printToTerminal('-r--       1.8KB      MAR_07_2026   tech_stack.sys');
                    printToTerminal('-r--       0.8KB      MAR_07_2026   education.log');
                    printToTerminal('-r--       1.1KB      MAR_07_2026   certs.list');
                    break;
                case 'cat bio.txt':
                    printToTerminal('### USER_IDENTITY_FILE:');
                    printToTerminal('NAME: SHASHWAT KARNA');
                    printToTerminal('ROLE: FULL STACK DEVELOPER // AI ENTHUSIAST');
                    printToTerminal('BIO: Hands-on experience in full-stack dev, machine learning, and backend systems. Developed AI tools, chatbots, and web apps through self-driven projects. Quick learner focused on practical, scalable solutions.');
                    break;
                case 'cat experience.md':
                    printToTerminal('### WORK_EXPERIENCE_LOG:');
                    printToTerminal('1. WEB_DEV_INTERN @ JABSZ_GAMING_STUDIO (MAY-JUL 2025)');
                    printToTerminal('   - Built "MindFlip" game using React Expo for cross-platform compatibility.');
                    printToTerminal('2. AI_CHATBOT_INTERN @ AIDC, AMITY_UNIVERSITY (MAY-JUL 2025)');
                    printToTerminal('   - Developed NLP system for campus community using Hugging Face Transformers.');
                    printToTerminal('3. VOLUNTEER @ SWACHH_HEALTH_VIKAS (JUL-OCT 2023)');
                    printToTerminal('   - Mentored 20+ children in digital literacy.');
                    break;
                case 'cat tech_stack.sys':
                case 'skills':
                    printToTerminal('### CORE_SYSTEM_MODULES:');
                    printToTerminal(' - LANGUAGES: C/C++, Python, Java, JavaScript, HTML/CSS');
                    printToTerminal(' - FRAMEWORKS: React, Next.js, Node.js, Flask, FastAPI, LangChain');
                    printToTerminal(' - LIBRARIES: NumPy, Pandas, scikit-learn, PyTorch, TensorFlow');
                    printToTerminal(' - TOOLS: Git, Docker, GCP, VS Code, Travis CI');
                    printToTerminal(' - DATABASE: MongoDB, MySQL');
                    break;
                case 'cat projects.db':
                    printToTerminal('### PROJECT_DATABASE_ENTRIES:');
                    printToTerminal(' - PORTFOLIO_WEBSITE: Dynamic Next.js/Flask site showcasing achievements.');
                    printToTerminal(' - MINDCARE_AI: Mental health chatbot (8k+ convos) using Fine-tuned Transformers.');
                    printToTerminal(' - OBJECTRACK: YOLOv5 object detection (92% accuracy) on 5k+ custom images.');
                    printToTerminal(' - TALENTTRACK: Career recommendation system using Decision Trees.');
                    printToTerminal(' - QUESTIFY: Automated MCQ generator using Sense2Vec & WordNet.');
                    break;
                case 'cat education.log':
                    printToTerminal('### EDUCATION_HISTORY:');
                    printToTerminal(' - B.TECH IN IT @ AMITY UNIVERSITY (2022-2026) // CGPA: 7.36');
                    printToTerminal(' - SENIOR SECONDARY @ GREENFIELDS PUBLIC SCHOOL (2021)');
                    break;
                case 'cat certs.list':
                    printToTerminal('### CERTIFICATION_MANIFEST:');
                    printToTerminal(' - CISCO: Python Essentials 1 & 2');
                    printToTerminal(' - CISCO: CCNA - Introduction to Networks');
                    printToTerminal(' - CISCO: Introduction to Cybersecurity');
                    printToTerminal(' - IBM: Cybersecurity Fundamentals');
                    printToTerminal(' - DATA_ANALYSIS: Data Analysis Using Python');
                    printToTerminal(' - NVIDIA: Fundamentals of Deep Learning');
                    printToTerminal(' - AWS: Academy Graduate - Cloud Foundations');
                    break;
                case 'cat cyber_stats.bin':
                    printToTerminal('### CYBERSECURITY_PROFILE:');
                    printToTerminal(' - PLATFORM: TRYHACKME');
                    printToTerminal(' - STATUS: ACTIVE_CTF_PLAYER');
                    printToTerminal(' - ROOMS: 120+ COMPLETED');
                    printToTerminal(' - FOCUS: PEN-TESTING, WEB_EXPLOITATION, LINUX_PRIV_ESC');
                    break;
                case 'social':
                    printToTerminal('### COMMUNICATIONS_NETWORK_MAP:');
                    printToTerminal(' - GITHUB: github.com/shashwatkarna');
                    printToTerminal(' - LINKEDIN: linkedin.com/in/shashwatkarna');
                    printToTerminal(' - TRYHACKME: tryhackme.com/p/shashwatkarna');
                    printToTerminal(' - LEETCODE: leetcode.com/u/intervuln/');
                    printToTerminal(' - PEERLIST: peerlist.io/shashwhat');
                    printToTerminal(' - INSTAGRAM: instagram.com/karn_shashwat');
                    printToTerminal(' - SNAPCHAT: snapchat.com/add/shashhh03');
                    printToTerminal(' - TWITTER/X: x.com/shashwat_karna');
                    break;
                case 'date':
                    printToTerminal(`CURRENT_SYSTEM_TIME: ${new Date().toLocaleString()}`);
                    break;
                case 'clear':
                    termOutput.innerHTML = '';
                    break;
                case 'crt':
                    toggleCRT();
                    printToTerminal('CRT_IMMERSIVE_MODE_TOGGLED_SUCCESS.');
                    break;
                case 'whoami':
                    printToTerminal('USER: SHASHWAT_KARNA');
                    printToTerminal('PERMISSIONS: ROOT_ADMIN_ACCESS');
                    break;
                case 'exit':
                    terminalOverlay.classList.remove('active');
                    break;
                case cmd.startsWith('goto ') ? cmd : '---':
                    const page = cmd.split(' ')[1];
                    const routeMap = {
                        'home': 'index.html',
                        'about': 'about.html',
                        'projects': 'projects.html',
                        'resume': 'about.html#resume',
                        'blog': 'blog.html',
                        'contact': 'about.html#contact'
                    };
                    if (routeMap[page]) {
                        printToTerminal(`INITIATING_HANDSHAKE_WITH_${page.toUpperCase()}...`);
                        setTimeout(() => window.location.href = routeMap[page], 600);
                    } else {
                        printToTerminal(`ERROR: DIRECTORY_'${page}'_NOT_ACCESSIBLE.`, '#ff0000');
                    }
                    break;
                default:
                    if (cmd.startsWith('cat ')) {
                        printToTerminal(`ERROR: FILE_'${cmd.split(' ')[1]}'_CORRUPTED_OR_MISSING.`, '#ff0000');
                    } else if (cmd !== '') {
                        printToTerminal(`CRITICAL_ERROR: COMMAND_'${cmd}'_NOT_FOUND. TYPE_HELP.`, '#ff0000');
                    }
            }
        }
    });
    }

    // 6. Contact Form AJAX Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);

            // Log interaction
            logActivity('SYSTEM: PROCESSING_FORM_SUBMISSION');

            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'UPLOADING...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.textContent = 'SUCCESS: DATA_TRANSMITTED. I WILL GET BACK TO YOU SOON.';
                    formStatus.style.color = '#00ff00';
                    formStatus.style.display = 'block';
                    contactForm.reset();
                    logActivity('SYSTEM: FORM_DATA_SECURED');
                } else {
                    const data = await response.json();
                    formStatus.textContent = `ERROR: ${data.errors.map(error => error.message).join(', ')}`;
                    formStatus.style.color = '#ff0000';
                    formStatus.style.display = 'block';
                    logActivity('WARN: FORM_TRANSMISSION_FAILED');
                }
            } catch (error) {
                formStatus.textContent = 'ERROR: SYSTEM_OFFLINE. PLEASE TRY AGAIN LATER.';
                formStatus.style.color = '#ff0000';
                formStatus.style.display = 'block';
                logActivity('CRITICAL: NETWORK_TIMEOUT');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Resume Writing Button Hover Cycler
    const writingBtn = document.getElementById('writing-btn');
    if (writingBtn) {
        const defaultText = "I WRITE TOO // SEE HERE &rarr;";
        const synonyms = [
            "BLOGS // READ MORE &rarr;",
            "ARTICLES // EXPLORE &rarr;",
            "TECH_LOGS // INITIATE &rarr;",
            "ESSAYS // LOAD &rarr;",
            "THOUGHTS // DECRYPT &rarr;",
            "PUBLICATIONS // VIEW &rarr;",
            "TUTORIALS // EXECUTE &rarr;",
            "CHRONICLES // ACCESS &rarr;",
            "REVIEWS // ANALYZE &rarr;",
            "NOTES // PARSE &rarr;",
            "ARCHIVES // EXTRACT &rarr;"
        ];
        let cycleInterval;
        let index = 0;

        // Resume Writing Button Hover Cycler
        writingBtn.addEventListener('mouseenter', () => {
            cycleInterval = setInterval(() => {
                writingBtn.innerHTML = synonyms[index];
                index = (index + 1) % synonyms.length;
            }, 400); // 400ms medium swap
        });

        writingBtn.addEventListener('mouseleave', () => {
            clearInterval(cycleInterval);
            writingBtn.innerHTML = defaultText;
            index = 0;
        });
    }

});
