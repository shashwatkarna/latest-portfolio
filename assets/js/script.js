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

    // Secret Section Toggle
    const secretTrigger = document.getElementById('secret-trigger');
    const secretSection = document.getElementById('secret-section');

    if (secretTrigger && secretSection) {
        secretTrigger.addEventListener('click', () => {
            secretSection.classList.toggle('active');

            if (secretSection.classList.contains('active')) {
                // Scroll to secret section with a slight delay for glitch effect
                setTimeout(() => {
                    secretSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        });
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
function onYouTubeIframeAPIReady() {
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

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject UI Components (System Activity, CRT Overlay, Terminal)
    const body = document.body;

    // Activity Feed
    const activityFeed = document.createElement('div');
    activityFeed.id = 'activity-feed';
    body.appendChild(activityFeed);

    // CRT Overlay
    const crtOverlay = document.createElement('div');
    crtOverlay.id = 'crt-overlay';
    body.appendChild(crtOverlay);

    // Terminal Overlay
    const terminalOverlay = document.createElement('div');
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

    // 0. Inject Footer Hint & Log Toggle
    const footerContent = document.querySelector('.footer-content');
    if (footerContent) {
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
                if (entry.parentNode === activityFeed) {
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

    function printToTerminal(text, color = '#00ff00') {
        const div = document.createElement('div');
        div.style.color = color;
        div.innerHTML = text;
        termOutput.appendChild(div);
        termOutput.scrollTop = termOutput.scrollHeight;
    }

    // Hotkey: Ctrl + K (Global)
    document.addEventListener('keydown', (e) => {
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
});

