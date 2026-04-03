const fs = require('fs');
const filePath = './assets/js/script.js';
let content = fs.readFileSync(filePath, 'utf8');

const codeToObfuscate = `document.addEventListener('contextmenu', (e) => { if (document.getElementById('secret-section') || sessionStorage.getItem('secret_unlocked') === 'true') { e.preventDefault(); } }); document.addEventListener('keydown', (e) => { if (document.getElementById('secret-section') || sessionStorage.getItem('secret_unlocked') === 'true') { if ( e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)) || (e.ctrlKey && ['U', 'u'].includes(e.key)) || (e.metaKey && e.altKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)) || (e.metaKey && ['U', 'u'].includes(e.key)) ) { e.preventDefault(); } } });`;

const base64Str = Buffer.from(codeToObfuscate).toString('base64');

const targetFunction = `// --- Anti-Inspect Security ---
function initAntiInspect() {
    // Disable right-click context menu
    document.addEventListener('contextmenu', (e) => {
        if (document.getElementById('secret-section') || sessionStorage.getItem('secret_unlocked') === 'true') {
            e.preventDefault();
        }
    });

    // Disable DevTools keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('secret-section') || sessionStorage.getItem('secret_unlocked') === 'true') {
            if (
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)) ||
                (e.ctrlKey && ['U', 'u'].includes(e.key)) ||
                (e.metaKey && e.altKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)) || // Mac Support
                (e.metaKey && ['U', 'u'].includes(e.key))
            ) {
                e.preventDefault();
            }
        }
    });
}`;

const obfuscatedFunction = `// --- Anti-Inspect Security ---
function initAntiInspect() {
    eval(atob('${base64Str}'));
}`;

content = content.replace(targetFunction, obfuscatedFunction);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully obfuscated initAntiInspect');
