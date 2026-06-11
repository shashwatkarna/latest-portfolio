(function initDogs() {
    let container = document.querySelector('footer');
    if (!container) {
        container = document.body;
    } else {
        container.style.position = 'relative'; 
    }

    // Global CSS for all dogs
    const style = document.createElement('style');
    style.innerHTML = `
        .pacing-dog {
            position: absolute;
            pointer-events: none;
            filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.4));
            transition: transform 0.3s ease;
        }
        .dog-leg { animation: walk 0.3s infinite alternate ease-in-out; transform-origin: center top; transform-box: fill-box; }
        .dog-leg-back { animation-delay: -0.3s; }
        .dog-tail { animation: wag 0.2s infinite alternate ease-in-out; transform-origin: bottom left; transform-box: fill-box; }
        @keyframes walk {
          0% { transform: rotate(-25deg); }
          100% { transform: rotate(25deg); }
        }
        @keyframes wag {
          0% { transform: rotate(-10deg); }
          100% { transform: rotate(20deg); }
        }
    `;
    document.head.appendChild(style);

    // Reusable SVG Dog Generator
    function createDogSVG(primaryColor, darkColor, bellyColor) {
        return `
        <svg viewBox="0 0 64 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(8, 16)">
            <!-- Tail -->
            <path class="dog-tail" d="M 6,14 C 0,8 0,0 6,0 C 12,0 12,8 6,14 Z" fill="${primaryColor}"/>
            
            <!-- Back Legs -->
            <rect class="dog-leg dog-leg-back" x="12" y="24" width="5" height="12" rx="2.5" fill="${darkColor}"/>
            <rect class="dog-leg dog-leg-back" x="28" y="24" width="5" height="12" rx="2.5" fill="${darkColor}"/>
            
            <!-- Body -->
            <rect x="8" y="10" width="30" height="18" rx="8" fill="${primaryColor}"/>
            <rect x="8" y="20" width="30" height="8" rx="4" fill="${bellyColor}"/>
            
            <!-- Front Legs -->
            <rect class="dog-leg" x="16" y="24" width="5" height="12" rx="2.5" fill="${primaryColor}"/>
            <rect class="dog-leg" x="32" y="24" width="5" height="12" rx="2.5" fill="${primaryColor}"/>
            
            <!-- Head -->
            <circle cx="38" cy="10" r="11" fill="${primaryColor}"/>
            <!-- Snout -->
            <circle cx="45" cy="12" r="6" fill="${bellyColor}"/>
            <!-- Nose & Eye -->
            <circle cx="49" cy="10" r="2.5" fill="#111111"/> 
            <circle cx="40" cy="7" r="2" fill="#111111"/>
            
            <!-- Ears -->
            <polygon points="30,3 34,-5 39,3" fill="${primaryColor}"/>
            <polygon points="32,2 34,-3 37,2" fill="#ffb6c1"/>
          </g>
        </svg>
        `;
    }

    // Configure our pack of dogs
    const dogConfigs = [
        { size: 64, primary: '#f0a500', dark: '#c28500', belly: '#ffffff', speed: 0.8, startPos: -50, zIndex: 9999 }, // Orange Shiba
        { size: 48, primary: '#8b4513', dark: '#5c2e0b', belly: '#d2b48c', speed: 1.4, startPos: 200, zIndex: 9998 }, // Fast little Brown dog
        { size: 56, primary: '#d3d3d3', dark: '#a9a9a9', belly: '#ffffff', speed: 0.5, startPos: -150, zIndex: 9997 } // Slow Grey dog
    ];

    const activeDogs = [];

    // Spawn each dog
    dogConfigs.forEach((config) => {
        const dogEl = document.createElement('div');
        dogEl.className = 'pacing-dog';
        dogEl.style.top = `-${config.size}px`;
        dogEl.style.width = `${config.size}px`;
        dogEl.style.height = `${config.size}px`;
        dogEl.style.zIndex = config.zIndex;
        dogEl.innerHTML = createDogSVG(config.primary, config.dark, config.belly);
        
        container.appendChild(dogEl);

        activeDogs.push({
            el: dogEl,
            pos: config.startPos,
            speed: config.speed,
            direction: 1 // 1 for right, -1 for left
        });
    });

    // Animate all dogs independently
    function animate() {
        const containerWidth = container.offsetWidth || window.innerWidth;

        activeDogs.forEach(dog => {
            dog.pos += dog.speed * dog.direction;

            if (dog.pos > containerWidth + 50) {
                dog.direction = -1; // Turn left
                dog.el.style.transform = 'scaleX(-1)';
            } else if (dog.pos < -100) {
                dog.direction = 1; // Turn right
                dog.el.style.transform = 'scaleX(1)';
            }

            dog.el.style.left = dog.pos + 'px';
        });
        
        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
})();
