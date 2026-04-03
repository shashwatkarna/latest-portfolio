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

// --- Secret Section Module (Dynamic Obfuscation) ---
function initSecretSection() {
    const trigger = document.getElementById('secret-trigger');
    // Only allow the secret section on pages that actually have the trigger (About page)
    if (!trigger) return;

    const SECRET_KEY = "SHASHWAT03";

    // Payload 1: Entire Section Structure (Locked state)
    const structurePayload = "PHNlY3Rpb24gaWQ9InNlY3JldC1zZWN0aW9uIj48ZGl2IGNsYXNzPSJjb250YWluZXIiPjxkaXYgaWQ9InNlY3JldC1sb2NrZWQtY29udGVudCIgc3R5bGU9InRleHQtYWxpZ246IGNlbnRlcjsgbWFyZ2luOiAycmVtIDA7IG9wYWNpdHk6IDAuOTsiPjxoMiBzdHlsZT0iZm9udC1mYW1pbHk6ICdKZXRCcmFpbnMgTW9ubycsIG1vbm9zcGFjZTsgZm9udC1zaXplOiAxLjVyZW07IGNvbG9yOiAjZmYwMDAwOyB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyBsZXR0ZXItc3BhY2luZzogMnB4OyBtYXJnaW4tYm90dG9tOiAxcmVtOyB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDsiPk5PVCBBVkFJTEFCTEU8L2gyPjxkaXY+PGlucHV0IHR5cGU9InBhc3N3b3JkIiBpZD0ic2VjcmV0LW1pbmkta2V5IiBhdXRvY29tcGxldGU9Im9mZiIgc3BlbGxjaGVjaz0iZmFsc2UiIHN0eWxlPSJ3aWR0aDogMTVyZW07IHRleHQtYWxpZ246IGNlbnRlcjsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IGJvcmRlcjogbm9uZTsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4yKTsgY29sb3I6ICMwMGZmMDA7IG91dGxpbmU6IG5vbmU7IGZvbnQtZmFtaWx5OiAnSmV0QnJhaW5zIE1vbm8nLCBtb25vc3BhY2U7IGZvbnQtc2l6ZTogMS4ycmVtOyBwYWRkaW5nOiA1cHg7Ij48L2Rpdj48L2Rpdj48ZGl2IGlkPSJzZWNyZXQtdW5sb2NrZWQtY29udGVudCIgc3R5bGU9ImRpc3BsYXk6IG5vbmU7Ij48L2Rpdj48L2Rpdj48L3NlY3Rpb24+";

    const injectAndReveal = () => {
        if (!document.getElementById('secret-section')) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = atob(structurePayload);
            const sectionNode = wrapper.firstChild;

            // Add a dynamic Close / Lock button
            const closeBtn = document.createElement('button');
            closeBtn.innerText = '[X] SECURE & CLOSE';
            closeBtn.style.cssText = 'position: absolute; top: 2rem; right: clamp(1rem, 5vw, 4rem); background: transparent; border: 1px solid #ff0000; padding: 0.5rem 1rem; color: #ff0000; font-family: var(--font-body); font-size: 0.7rem; cursor: pointer; letter-spacing: 2px; z-index: 100; transition: all 0.3s ease;';
            closeBtn.onmouseenter = () => { closeBtn.style.background = '#ff0000'; closeBtn.style.color = '#000'; };
            closeBtn.onmouseleave = () => { closeBtn.style.background = 'transparent'; closeBtn.style.color = '#ff0000'; };
            closeBtn.addEventListener('click', () => {
                sectionNode.classList.remove('active');
                setTimeout(() => sectionNode.remove(), 1200); // Remove from DOM after CSS transition
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            });
            sectionNode.appendChild(closeBtn);

            document.body.appendChild(sectionNode);

            const input = document.getElementById('secret-mini-key');
            input?.addEventListener('input', (e) => checkPassword(e.target.value));
            input?.addEventListener('paste', (e) => checkPassword(e.clipboardData.getData('text')));
        }

        const section = document.getElementById('secret-section');
        // Small delay to ensure CSS transition triggers properly after injection
        requestAnimationFrame(() => {
            section.classList.add('active');
            setTimeout(() => {
                section.scrollIntoView({ behavior: 'smooth' });
                document.getElementById('secret-mini-key')?.focus();
            }, 100);
        });
    };

    const checkPassword = (val) => {
        if (val.trim().toUpperCase() === SECRET_KEY) {
            renderSecretContent();
        }
    };

    function renderSecretContent() {
        const lockedDiv = document.getElementById('secret-locked-content');
        const unlockedDiv = document.getElementById('secret-unlocked-content');
        if (!lockedDiv || !unlockedDiv) return;

        // Payload 2: Full Unlocked Content (Photography & Skill Tree)
        const contentPayload = "PGRpdiBjbGFzcz0icGhvdG9ncmFwaHktZ2FsbGVyeSIgc3R5bGU9Im1hcmdpbi10b3A6IDEuNXJlbTsiPiA8ZGl2IGNsYXNzPSJzZWN0aW9uLWhlYWRlciI+IDxkaXYgY2xhc3M9ImhlYWRlci1zcXVhcmUiIHN0eWxlPSJiYWNrZ3JvdW5kOiB2YXIoLS10ZXh0LXByaW1hcnkpOyI+PC9kaXY+IDxoMiBjbGFzcz0ic2VjdGlvbi10aXRsZSI+TkFSUkFUSVZFX0ZSQU1FUzwvaDI+IDxkaXYgY2xhc3M9ImhlYWRlci1saW5lIj48L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9InBob3RvLWdyaWQiIHN0eWxlPSJkaXNwbGF5OiBncmlkOyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpOyBnYXA6IDAuNXJlbTsgbWFyZ2luLXRvcDogMXJlbTsiPiA8ZGl2IGNsYXNzPSJib3JkZXIgc2hhZG93LWhvdmVyIiBzdHlsZT0icG9zaXRpb246cmVsYXRpdmU7IGFzcGVjdC1yYXRpbzoxOyBvdmVyZmxvdzpoaWRkZW47Ij48aW1nIHNyYz0iYXNzZXRzL2ltZy9ob2JieTEucG5nIiBzdHlsZT0id2lkdGg6MTAwJTsgaGVpZ2h0OjEwMCU7IG9iamVjdC1maXQ6IGNvdmVyOyBmaWx0ZXI6IGdyYXlzY2FsZSgxMDAlKTsgdHJhbnNpdGlvbjogZmlsdGVyIDAuM3MgZWFzZTsiIG9ubW91c2VvdmVyPSJ0aGlzLnN0eWxlLmZpbHRlcj0nZ3JheXNjYWxlKDAlKSciIG9ubW91c2VvdXQ9InRoaXMuc3R5bGUuZmlsdGVyPSdncmF5c2NhbGUoMTAwJSknIiBhbHQ9IkZSQU1FXzAxIj48ZGl2IHN0eWxlPSJwb3NpdGlvbjphYnNvbHV0ZTsgYm90dG9tOjAuNXJlbTsgbGVmdDowLjVyZW07IGJhY2tncm91bmQ6dmFyKC0tYmctY29sb3IpOyBjb2xvcjp2YXIoLS10ZXh0LXByaW1hcnkpOyBwYWRkaW5nOjJweCA4cHg7IGZvbnQtc2l6ZTowLjZyZW07IGZvbnQtd2VpZ2h0OmJvbGQ7IGxldHRlci1zcGFjaW5nOjFweDsgYm9yZGVyOjFweCBzb2xpZCB2YXIoLS10ZXh0LXByaW1hcnkpOyI+MDFfQ0hST05JQ0xFPC9kaXY+PC9kaXY+IDxkaXYgY2xhc3M9ImJvcmRlciBzaGFkb3ctaG92ZXIiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsgYXNwZWN0LXJhdGlvOjE7IG92ZXJmbG93OmhpZGRlbjsiPjxpbWcgc3JjPSJhc3NldHMvaW1nL2hvYmJ5Mi5wbmciIHN0eWxlPSJ3aWR0aDoxMDAlOyBoZWlnaHQ6MTAwJTsgb2JqZWN0LWZpdDogY292ZXI7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpOyB0cmFuc2l0aW9uOiBmaWx0ZXIgMC4zcyBlYXNlOyIgb25tb3VzZW92ZXI9InRoaXMuc3R5bGUuZmlsdGVyPSdncmF5c2NhbGUoMCUpJyIgb25tb3VzZW91dD0idGhpcy5zdHlsZS5maWx0ZXI9J2dyYXlzY2FsZSgxMDAlKSciIGFsdD0iRlJBTUVfMDIiPjxkaXYgc3R5bGU9InBvc2l0aW9uOmFic29sdXRlOyBib3R0b206MC41cmVtOyBsZWZ0OjAuNXJlbTsgYmFja2dyb3VuZDp2YXIoLS1iZy1jb2xvcik7IGNvbG9yOnZhcigtLXRleHQtcHJpbWFyeSk7IHBhZGRpbmc6MnB4IDhweDsgZm9udC1zaXplOjAuNnJlbTsgZm9udC13ZWlnaHQ6Ym9sZDsgbGV0dGVyLXNwYWNpbmc6MXB4OyBib3JkZXI6MXB4IHNvbGlkIHZhcigtLXRleHQtcHJpbWFyeSk7Ij4wMl9FWFBMT1JFPC9kaXY+PC9kaXY+IDxkaXYgY2xhc3M9ImJvcmRlciBzaGFkb3ctaG92ZXIiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTsgYXNwZWN0LXJhdGlvOjE7IG92ZXJmbG93OmhpZGRlbjsiPjxpbWcgc3JjPSJhc3NldHMvaW1nL2hvYmJ5My5wbmciIHN0eWxlPSJ3aWR0aDoxMDAlOyBoZWlnaHQ6MTAwJTsgb2JqZWN0LWZpdDogY292ZXI7IGZpbHRlcjogZ3JheXNjYWxlKDEwMCUpOyB0cmFuc2l0aW9uOiBmaWx0ZXIgMC4zcyBlYXNlOyIgb25tb3VzZW92ZXI9InRoaXMuc3R5bGUuZmlsdGVyPSdncmF5c2NhbGUoMCUpJyIgb25tb3VzZW91dD0idGhpcy5zdHlsZS5maWx0ZXI9J2dyYXlzY2FsZSgxMDAlKSciIGFsdD0iRlJBTUVfMDMiPjxkaXYgc3R5bGU9InBvc2l0aW9uOmFic29sdXRlOyBib3R0b206MC41cmVtOyBsZWZ0OjAuNXJlbTsgYmFja2dyb3VuZDp2YXIoLS1iZy1jb2xvcik7IGNvbG9yOnZhcigtLXRleHQtcHJpbWFyeSk7IHBhZGRpbmc6MnB4IDhweDsgZm9udC1zaXplOjAuNnJlbTsgZm9udC13ZWlnaHQ6Ym9sZDsgbGV0dGVyLXNwYWNpbmc6MXB4OyBib3JkZXI6MXB4IHNvbGlkIHZhcigtLXRleHQtcHJpbWFyeSk7Ij4wM19PQlNFUlZFPC9kaXY+PC9kaXY+IDwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9ImhvYmJ5LXNraWxsLXRyZWUiIHN0eWxlPSJtYXJnaW4tdG9wOiAycmVtOyI+IDxkaXYgY2xhc3M9InNlY3Rpb24taGVhZGVyIj4gPGRpdiBjbGFzcz0iaGVhZGVyLXNxdWFyZSI+PC9kaXY+IDxoMiBjbGFzcz0ic2VjdGlvbi10aXRsZSI+U0tJTExfVFJFRSAvLyBIT0JCSUVTPC9oMj4gPGRpdiBjbGFzcz0iaGVhZGVyLWxpbmUiPjwvZGl2PiA8L2Rpdj4gPGRpdiBjbGFzcz0iYm9yZGVyIHNoYWRvdy1ob3ZlciIgc3R5bGU9Im1hcmdpbi10b3A6IDFyZW07IHBhZGRpbmc6IDEuNXJlbTsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IGNvbG9yOiB2YXIoLS10ZXh0LXByaW1hcnkpOyBmb250LWZhbWlseTogJ0pldEJyYWlucyBNb25vJywgbW9ub3NwYWNlOyBmb250LXNpemU6IDAuOXJlbTsgbGluZS1oZWlnaHQ6IDI7Ij4gPGRpdiBzdHlsZT0iZGlzcGxheTogZmxleDsganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyBib3JkZXItYm90dG9tOiAxcHggZGFzaGVkIHZhcigtLXRleHQtcHJpbWFyeSk7IG1hcmdpbi1ib3R0b206IDAuNXJlbTsiPjxzcGFuPlsrXSBQSE9UT0dSQVBIWTwvc3Bhbj48c3Bhbj5MVkxfODU8L3NwYW4+PC9kaXY+IDxkaXYgc3R5bGU9ImRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgYm9yZGVyLWJvdHRvbTogMXB4IGRhc2hlZCB2YXIoLS10ZXh0LXByaW1hcnkpOyBtYXJnaW4tYm90dG9tOiAwLjVyZW07Ij48c3Bhbj5bK10gVFJBVkVMPC9zcGFuPjxzcGFuPkxWTF83MDwvc3Bhbj48L2Rpdj4gPGRpdiBzdHlsZT0iZGlzcGxheTogZmxleDsganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyBib3JkZXItYm90dG9tOiAxcHggZGFzaGVkIHZhcigtLXRleHQtcHJpbWFyeSk7IG1hcmdpbi1ib3R0b206IDAuNXJlbTsiPjxzcGFuPlsrXSBNVVNJQ19DVVJBVElPTjwvc3Bhbj48c3Bhbj5MVkxfOTA8L3NwYW4+PC9kaXY+IDxkaXYgc3R5bGU9ImRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsiPjxzcGFuPlsrXSBURUNIX0RJU0NPVkVSWTwvc3Bhbj48c3Bhbj5MVkxfOTU8L3NwYW4+PC9kaXY+IDwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9Im11c2ljLXBsYXllciBib3JkZXIgc2hhZG93LWhvdmVyIiBzdHlsZT0ibWFyZ2luLXRvcDogMnJlbTsgcGFkZGluZzogMS41cmVtIDJyZW07IGRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZmxleC13cmFwOiB3cmFwOyBiYWNrZ3JvdW5kOiB2YXIoLS1iZy1jb2xvcik7IGNvbG9yOiB2YXIoLS10ZXh0LXByaW1hcnkpOyI+IDxoMyBzdHlsZT0ibWFyZ2luOiAwOyBmb250LWZhbWlseTogdmFyKC0tZm9udC1oZWFkaW5nKTsgZm9udC1zaXplOiAwLjhyZW07IGxldHRlci1zcGFjaW5nOiAycHg7Ij5SRVRST19NVVNJQ19TWU5DIC8vIEFNQklFTlQ8L2gzPiA8ZGl2IGlkPSJwbGF5ZXIiIHN0eWxlPSJkaXNwbGF5OiBub25lOyI+PC9kaXY+IDxkaXYgY2xhc3M9ImNvbnRyb2xzIiBzdHlsZT0iZGlzcGxheTogZmxleDsgZ2FwOiAxcmVtOyBhbGlnbi1pdGVtczogY2VudGVyOyI+IDxwIGlkPSJwbGF5ZXItc3RhdHVzIiBzdHlsZT0ibWFyZ2luOiAwOyBmb250LXNpemU6IDAuNjVyZW07IGxldHRlci1zcGFjaW5nOiAycHg7IHBhZGRpbmctcmlnaHQ6IDEuNXJlbTsiPlsgSURMRSBdPC9wPiA8YnV0dG9uIGlkPSJwbGF5LWJ0biIgY2xhc3M9ImJvcmRlciIgc3R5bGU9InBhZGRpbmc6IDAuM3JlbSAwLjhyZW07IGN1cnNvcjogcG9pbnRlcjsgYmFja2dyb3VuZDogdmFyKC0tdGV4dC1wcmltYXJ5KTsgY29sb3I6IHZhcigtLWJnLWNvbG9yKTsgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtYm9keSk7IGZvbnQtd2VpZ2h0OiBib2xkOyBmb250LXNpemU6IDAuNjVyZW07IHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2U7Ij5QTEFZPC9idXR0b24+IDxidXR0b24gaWQ9InN0b3AtYnRuIiBjbGFzcz0iYm9yZGVyIiBzdHlsZT0icGFkZGluZzogMC4zcmVtIDAuOHJlbTsgY3Vyc29yOiBwb2ludGVyOyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgY29sb3I6IHZhcigtLXRleHQtcHJpbWFyeSk7IGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWJvZHkpOyBmb250LXdlaWdodDogYm9sZDsgZm9udC1zaXplOiAwLjY1cmVtOyB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycyBlYXNlOyI+U1RPUDwvYnV0dG9uPiA8L2Rpdj48L2Rpdj4=";
        unlockedDiv.innerHTML = atob(contentPayload);
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
            term.innerHTML = `<div class="terminal-header"><div>SHASHWAT_OS [VERSION 1.0.42]</div><div>(C) 2026 SHASHWAT. ALL RIGHTS RESERVED.</div><div style="margin-top: 0.5rem; font-size: 0.8rem; opacity: 0.7;">TYPE 'HELP' FOR COMMANDS // 'CTRL+K' TO TOGGLE</div></div><div id="terminal-output"><div>WELCOME TO THE CORE SHELL. TYPE 'HELP' TO START.</div></div><div class="terminal-input-line"><span>></span><input type="text" id="terminal-input" autofocus spellcheck="false"></div>`;
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
        const div = document.createElement('div'); div.style.color = color; div.innerHTML = text;
        termOutput.appendChild(div); termOutput.scrollTop = termOutput.scrollHeight;
    };
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'k') { e.preventDefault(); termOverlay.classList.toggle('active'); if (termOverlay.classList.contains('active')) termInput.focus(); }
        if (e.key === 'Escape') termOverlay.classList.remove('active');
    });
    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = termInput.value.trim().toLowerCase(); termInput.value = ''; print(`> ${cmd}`, '#555');
            const routes = { 'help': 'AVAILABLE: LS, CLEAR, EXIT, DATE, STATUS, WHOAMI, GOTO', 'ls': 'DRV_C_ROOT: index.html, about.html, projects.html, resume.html, contact.html', 'date': new Date().toLocaleString(), 'status': 'SYSTEM: STABLE', 'whoami': 'USER: SHASHWAT_KARNA', 'clear': 'CLEAR', 'exit': 'EXIT' };
            if (routes[cmd]) { if (cmd === 'clear') termOutput.innerHTML = ''; else if (cmd === 'exit') termOverlay.classList.remove('active'); else print(routes[cmd]); }
            else if (cmd.startsWith('goto ')) { const p = cmd.split(' ')[1]; print(`NAVIGATING TO ${p.toUpperCase()}...`); setTimeout(() => window.location.href = p.endsWith('.html') ? p : `${p}.html`, 500); }
            else print(`COMMAND NOT FOUND: ${cmd}`, '#ff0000');
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

    const isDark = localStorage.getItem('portfolio-theme') === 'dark';
    if (isDark) document.body.classList.add('dark-mode');
    updateIcon(isDark);

    btn.addEventListener('click', () => {
        const d = document.body.classList.toggle('dark-mode');
        localStorage.setItem('portfolio-theme', d ? 'dark' : 'light');
        updateIcon(d);
    });
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
