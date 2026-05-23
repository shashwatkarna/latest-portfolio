/**
 * SHASHWAT_PORTFOLIO - Main Script
 * Features: Terminal, Guestbook, Secret Section (Dynamic Obfuscation), Scrollytelling, Parallax
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initUIComponents();
    initScrollyteller();
    initParallax();
    initMagneticGrid();
    initKonamiCode();
    initSecretSection();
    initTitleCycling();
    initAntiInspect();
    initMobileMenu();
    initHeroAnimation();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    loadComments();
    document.getElementById('guestbook-send')?.addEventListener('click', sendComment);
});

// --- Secret Section Module (Dynamic Fetch) ---
function initSecretSection() {
    const trigger = document.getElementById('secret-trigger');
    if (!trigger) return;

    const injectAndReveal = () => {
        if (!document.getElementById('secret-section')) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = `
                <section id="secret-section">
                    <div class="container">
                        <div id="secret-locked-content" style="text-align: center; margin: 2rem 0; opacity: 0.9;">
                            <h2 style="font-family: 'JetBrains Mono', monospace; font-size: 1.5rem; color: #ff0000; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1rem; text-decoration: line-through;">NOT AVAILABLE</h2>
                            <div>
                                <input type="password" id="secret-mini-key" autocomplete="off" spellcheck="false" placeholder="ENTER ACCESS KEY" style="width: 15rem; text-align: center; background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.2); color: #00ff00; outline: none; font-family: 'JetBrains Mono', monospace; font-size: 1.2rem; padding: 5px;">
                            </div>
                            <p id="secret-error" style="color: #ff0000; display: none; font-size: 0.8rem; margin-top: 10px;">INVALID KEY</p>
                        </div>
                        <div id="secret-unlocked-content" style="display: none;"></div>
                    </div>
                </section>
            `;
            const sectionNode = wrapper.firstElementChild;

            const closeBtn = document.createElement('button');
            closeBtn.innerText = '[X] SECURE & CLOSE';
            closeBtn.style.cssText = 'position: absolute; top: 2rem; right: clamp(1rem, 5vw, 4rem); background: transparent; border: 1px solid #ff0000; padding: 0.5rem 1rem; color: #ff0000; font-family: var(--font-body); font-size: 0.7rem; cursor: pointer; letter-spacing: 2px; z-index: 100; transition: all 0.3s ease;';
            closeBtn.onmouseenter = () => { closeBtn.style.background = '#ff0000'; closeBtn.style.color = '#000'; };
            closeBtn.onmouseleave = () => { closeBtn.style.background = 'transparent'; closeBtn.style.color = '#ff0000'; };
            closeBtn.addEventListener('click', () => {
                sectionNode.classList.remove('active');
                setTimeout(() => sectionNode.remove(), 1200);
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            });
            sectionNode.appendChild(closeBtn);

            document.body.appendChild(sectionNode);

            const input = document.getElementById('secret-mini-key');
            input?.addEventListener('input', (e) => checkPassword(e.target.value));
        }

        const section = document.getElementById('secret-section');
        requestAnimationFrame(() => {
            section.classList.add('active');
            setTimeout(() => {
                section.scrollIntoView({ behavior: 'smooth' });
                document.getElementById('secret-mini-key')?.focus();
            }, 100);
        });
    };

    let isChecking = false;
    const checkPassword = async (val) => {
        if (val.trim().length >= 8 && !isChecking) {
            isChecking = true;
            try {
                const res = await fetch('/.netlify/functions/secure_access', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password: val.trim() })
                });
                
                if (res.ok) {
                    const data = await res.json();
                    renderSecretContent(data.html);
                    document.getElementById('secret-error').style.display = 'none';
                } else {
                    document.getElementById('secret-error').style.display = 'block';
                }
            } catch (err) {
                console.error(err);
            }
            isChecking = false;
        }
    };

    function renderSecretContent(htmlContent) {
        const lockedDiv = document.getElementById('secret-locked-content');
        const unlockedDiv = document.getElementById('secret-unlocked-content');
        if (!lockedDiv || !unlockedDiv) return;

        unlockedDiv.innerHTML = htmlContent;
        lockedDiv.style.display = 'none';
        unlockedDiv.style.display = 'block';
        initVibePlayer();
    }

    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        injectAndReveal();
    });
}

// --- Title Cycling (Synonyms) ---
function initTitleCycling() {
    document.querySelectorAll('.cycling-title').forEach(el => {
        const originalText = el.innerText;
        const synonyms = JSON.parse(el.getAttribute('data-synonyms') || '[]');
        const triggerEl = el.closest('.card, #writing-btn') || el;
        let cycleInterval;
        let index = 0;

        if (synonyms.length === 0) return;

        triggerEl.addEventListener('mouseenter', () => {
            clearInterval(cycleInterval);
            cycleInterval = setInterval(() => {
                index = (index + 1) % synonyms.length;
                el.innerText = synonyms[index];
            }, 400);
        });

        triggerEl.addEventListener('mouseleave', () => {
            clearInterval(cycleInterval);
            el.innerText = originalText;
            index = 0;
        });
    });
}

// --- Anti-Inspect Security ---
function initAntiInspect() {
    eval(atob('ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoZSkgPT4geyBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlY3JldC1zZWN0aW9uJykgfHwgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnc2VjcmV0X3VubG9ja2VkJykgPT09ICd0cnVlJykgeyBlLnByZXZlbnREZWZhdWx0KCk7IH0gfSk7IGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4geyBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlY3JldC1zZWN0aW9uJykgfHwgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnc2VjcmV0X3VubG9ja2VkJykgPT09ICd0cnVlJykgeyBpZiAoIGUua2V5ID09PSAnRjEyJyB8fCAoZS5jdHJsS2V5ICYmIGUuc2hpZnRLZXkgJiYgWydJJywgJ0onLCAnQycsICdpJywgJ2onLCAnYyddLmluY2x1ZGVzKGUua2V5KSkgfHwgKGUuY3RybEtleSAmJiBbJ1UnLCAndSddLmluY2x1ZGVzKGUua2V5KSkgfHwgKGUubWV0YUtleSAmJiBlLmFsdEtleSAmJiBbJ0knLCAnSicsICdDJywgJ2knLCAnaicsICdjJ10uaW5jbHVkZXMoZS5rZXkpKSB8fCAoZS5tZXRhS2V5ICYmIFsnVScsICd1J10uaW5jbHVkZXMoZS5rZXkpKSApIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyB9IH0gfSk7'));
}

// --- Video Player (YouTube API) ---
let vibePlayer;
function initVibePlayer() {
    const playBtn = document.getElementById('play-btn');
    const stopBtn = document.getElementById('stop-btn');
    const status = document.getElementById('player-status');
    if (!playBtn || !stopBtn) return;
    window.onYouTubeIframeAPIReady = function () {
        vibePlayer = new YT.Player('player', {
            height: '0', width: '0', videoId: 'jfKfPfyJRdk',
            playerVars: { 'autoplay': 0, 'controls': 0 },
            events: { 'onStateChange': (e) => { if (e.data === YT.PlayerState.ENDED) status.textContent = "[ STATUS: END_OF_TRANSMISSION ]"; } }
        });
    };
    if (window.YT && window.YT.Player) window.onYouTubeIframeAPIReady();
    playBtn.addEventListener('click', () => { vibePlayer?.playVideo(); status.textContent = "[ STATUS: STREAMING_SIGNAL ]"; });
    stopBtn.addEventListener('click', () => { vibePlayer?.pauseVideo(); status.textContent = "[ STATUS: SIGNAL_TERMINATED ]"; });
}

// --- UI / Aesthetics ---
function initUIComponents() {
    const isBlogPage = window.location.pathname.includes('blog.html');
    if (!isBlogPage) {
        if (!document.getElementById('crt-overlay')) {
            const crt = document.createElement('div');
            crt.id = 'crt-overlay';
            document.body.appendChild(crt);
        }
        if (!document.getElementById('terminal-overlay')) {
            const term = document.createElement('div');
            term.id = 'terminal-overlay';
            term.innerHTML = `
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
            document.body.appendChild(term);
            initTerminalLogic();
        }
    }
}

function initTerminalLogic() {
    const termOverlay = document.getElementById('terminal-overlay');
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');
    if (!termInput || !termOutput) return;

    const print = (text, color = '#00ff00') => {
        const div = document.createElement('div');
        div.style.color = color;
        div.innerHTML = text;
        termOutput.appendChild(div);
        termOutput.scrollTop = termOutput.scrollHeight;
    };

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            termOverlay.classList.toggle('active');
            if (termOverlay.classList.contains('active')) termInput.focus();
        }
        if (e.key === 'Escape') termOverlay.classList.remove('active');
    });

    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmdInput = termInput.value.trim();
            const cmd = cmdInput.toLowerCase();
            termInput.value = '';
            print(`> ${cmdInput}`, '#555');

            if (cmd === 'help') {
                print('AVAILABLE_SYSTEM_COMMANDS:');
                print('- LS: LIST_S_FILES');
                print('- CAT [FILE]: READ_S_FILE');
                print('- GOTO [PAGE]: NAVIGATE_SYSTEM');
                print('- SKILLS: FETCH_TECH_STACK');
                print('- SOCIAL: LIST_COMM_LINKS');
                print('- DATE: SHOW_SYSTEM_TIME');
                print('- CRT: TOGGLE_IMMERSIVE_MODE');
                print('- STATUS: SYSTEM_INTEGRITY_CHECK');
                print('- LOGS: TOGGLE_ACTIVITY_FEED');
                print('- KONAMI: SHOW_SECRET_HINT');
                print('- WHOAMI: DISPLAY_IDENTITY');
                print('- CLEAR: PURGE_OUTPUT');
                print('- EXIT: DISCONNECT');
            } else if (cmd === 'ls') {
                print('DRV_C_ROOT_DIRECTORY_LISTING:');
                print('MODE SIZE DATE NAME', '#aaa');
                print('---- ---- ---- ----', '#aaa');
                print('dir - MAR_07_2026 assets/');
                print('dir - MAR_07_2026 docs/');
                print('-r-- 8.6KB MAR_07_2026 index.html');
                print('-r-- 13.1KB MAR_07_2026 about.html');
                print('-r-- 7.4KB MAR_07_2026 projects.html');
                print('-r-- 8.8KB MAR_07_2026 resume.html');
                print('-r-- 8.4KB MAR_07_2026 blog.html');
                print('-r-- 5.8KB MAR_07_2026 contact.html');
                print('---------------------------', '#aaa');
                print('USE "LS [DIR]" TO VIEW SUBDIRECTORIES.');
            } else if (cmd === 'social') {
                print('### COMMUNICATIONS_NETWORK_MAP:');
                print('- GITHUB: <a href="https://github.com/shashwatkarna" target="_blank" style="color:inherit;">github.com/shashwatkarna</a>');
                print('- LINKEDIN: <a href="https://linkedin.com/in/shashwatkarna" target="_blank" style="color:inherit;">linkedin.com/in/shashwatkarna</a>');
                print('- TRYHACKME: <a href="https://tryhackme.com/p/shashwatkarna" target="_blank" style="color:inherit;">tryhackme.com/p/shashwatkarna</a>');
                print('- LEETCODE: <a href="https://leetcode.com/u/intervuln/" target="_blank" style="color:inherit;">leetcode.com/u/intervuln/</a>');
                print('- PEERLIST: <a href="https://peerlist.io/shashwhat" target="_blank" style="color:inherit;">peerlist.io/shashwhat</a>');
                print('- INSTAGRAM: <a href="https://instagram.com/karn_shashwat" target="_blank" style="color:inherit;">instagram.com/karn_shashwat</a>');
                print('- SNAPCHAT: <a href="https://snapchat.com/add/shashhh03" target="_blank" style="color:inherit;">snapchat.com/add/shashhh03</a>');
                print('- TWITTER/X: <a href="https://x.com/shashwat_karna" target="_blank" style="color:inherit;">x.com/shashwat_karna</a>');
            } else if (cmd === 'skills') {
                print('### TECHNICAL_STACK_MATRIX:');
                print('- FRONTEND: HTML5, CSS3, JS (ES6+), REACT, VITE');
                print('- BACKEND: NODE.JS, EXPRESS, PYTHON, FLASK');
                print('- DATABASE: MONGODB, FIREBASE, SQL');
                print('- TOOLS: GIT, DOCKER, NETLIFY, VERCEL');
                print('- ART: FIGMA, ADOBE SUITE, BLENDER');
            } else if (cmd === 'status') {
                print('SYSTEM_INTEGRITY: 100% // ALL_NODES_OPERATIONAL');
            } else if (cmd === 'whoami') {
                print('IDENTITY: SHASHWAT_KARNA // FULL_STACK_DEV // AI_ENTHUSIAST');
            } else if (cmd === 'date') {
                print(new Date().toLocaleString());
            } else if (cmd === 'clear') {
                termOutput.innerHTML = '';
            } else if (cmd === 'crt') {
                const crt = document.getElementById('crt-overlay');
                if (crt) {
                    crt.style.display = crt.style.display === 'none' ? 'block' : 'none';
                    print(`CRT_MODE: ${crt.style.display === 'none' ? 'DEACTIVATED' : 'ACTIVE'}`);
                }
            } else if (cmd === 'exit') {
                termOverlay.classList.remove('active');
            } else if (cmd.startsWith('goto ')) {
                const target = cmd.split(' ')[1];
                print(`INITIATING_HANDSHAKE_WITH_${target.toUpperCase()}...`);
                setTimeout(() => {
                    const pages = ['index', 'about', 'projects', 'resume', 'blog', 'contact'];
                    if (pages.includes(target)) {
                        window.location.href = `${target}.html`;
                    } else {
                        print(`ERR: HOST_${target.toUpperCase()} UNREACHABLE.`, '#ff0000');
                    }
                }, 800);
            } else if (cmd.startsWith('cat ')) {
                print(`READING_FILE: ${cmd.split(' ')[1]}...`);
                print('ERROR: PERMISSION_DENIED. SUDO_REQUIRED.', '#ff0000');
            } else if (cmd !== '') {
                print(`CRITICAL_ERROR: COMMAND_${cmd.toUpperCase()}_NOT_FOUND. TYPE 'HELP'.`, '#ff0000');
            }
        }
    });
}

function initThemeToggle() {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;

    const updateIcon = (isDark) => {
        btn.innerHTML = isDark ? '☼' : '☽';
        btn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    };

    // Default to dark mode if no preference is explicitly set to 'light'
    const isDark = localStorage.getItem('portfolio-theme') !== 'light';
    if (isDark) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    updateIcon(isDark);

    btn.addEventListener('click', () => {
        const d = document.body.classList.toggle('dark-mode');
        localStorage.setItem('portfolio-theme', d ? 'dark' : 'light');
        updateIcon(d);
    });
}

// --- Hero Image Animation ---
function initHeroAnimation() {
    const frame = document.getElementById('hero-portrait-frame');
    if (!frame) return;
    const images = frame.querySelectorAll('.portrait');
    if (images.length <= 1) return;
    
    let currentIndex = 0;

    // Cycle automatically
    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 2500);
}

function initScrollyteller() {
    const obs = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } }), { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function initParallax() {
    window.addEventListener('scroll', () => {
        const s = window.scrollY;
        document.querySelectorAll('.deco-text').forEach(el => {
            const spd = parseFloat(el.getAttribute('data-speed')) || 1;
            el.style.transform = `translate3d(0, ${-(s * spd * 0.1)}px, 0)`;
        });
    }, { passive: true });
}

function initMagneticGrid() {
    window.addEventListener('mousemove', (e) => {
        document.querySelector('.grid-bg')?.style.setProperty('--mouse-x', `${(e.clientX / window.innerWidth) * 100}%`);
        document.querySelector('.grid-bg')?.style.setProperty('--mouse-y', `${(e.clientY / window.innerHeight) * 100}%`);
    }, { passive: true });
}

function initKonamiCode() {
    const s = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let i = [];
    document.addEventListener('keydown', (e) => {
        i.push(e.key); i = i.slice(-s.length);
        if (JSON.stringify(i) === JSON.stringify(s)) document.body.classList.toggle('crt-active');
    });
}

const GUESTBOOK_ENDPOINT = "/.netlify/functions/guestbook";
async function loadComments() {
    const list = document.getElementById('guestbook-list');
    if (!list) return;
    try {
        const res = await fetch(GUESTBOOK_ENDPOINT);
        const data = await res.json();
        list.innerHTML = data.result ? data.result.map(raw => {
            const c = JSON.parse(raw);
            return `<div class="card border shadow" style="padding:1.2rem;"><div style="font-size:0.7rem;opacity:0.4;">${new Date(c.timestamp).toLocaleDateString()}</div><div>${c.text.replace(/</g, "&lt;")}</div></div>`;
        }).join('') : '';
    } catch (e) { }
}

async function sendComment() {
    const input = document.getElementById('guestbook-input');
    if (!input?.value.trim()) return;
    try {
        await fetch(GUESTBOOK_ENDPOINT, { method: 'POST', body: JSON.stringify({ text: input.value.trim() }) });
        input.value = ''; loadComments();
    } catch (e) { }
}

function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}
