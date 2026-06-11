exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const body = JSON.parse(event.body);
        const password = body.password;

        // Fetch the expected password from Netlify Environment Variables
        const expectedPassword = process.env.SECRET_ACCESS_KEY;

        // If the environment variable is not set, fail securely
        if (!expectedPassword) {
            console.error("CRITICAL: SECRET_ACCESS_KEY environment variable is not set in Netlify.");
            return {
                statusCode: 500,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ success: false, error: 'Server configuration error' })
            };
        }

        if (password === expectedPassword) {
            const secretHtml = `
<div class="photography-gallery" style="margin-top: 1.5rem;">
    <div class="section-header">
        <div class="header-square" style="background: var(--text-primary);"></div>
        <h2 class="section-title">NARRATIVE_FRAMES</h2>
        <div class="header-line"></div>
    </div>
    <div class="photo-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-top: 1rem;">
        <div class="border shadow-hover" style="position:relative; aspect-ratio:1; overflow:hidden;">
            <img src="assets/img/hobby1.jpg" style="width:100%; height:100%; object-fit: cover; filter: grayscale(100%); transition: filter 0.3s ease;" onmouseover="this.style.filter='grayscale(0%)'" onmouseout="this.style.filter='grayscale(100%)'" alt="FRAME_01">
            <div style="position:absolute; bottom:0.5rem; left:0.5rem; background:var(--bg-color); color:var(--text-primary); padding:2px 8px; font-size:0.6rem; font-weight:bold; letter-spacing:1px; border:1px solid var(--text-primary);">01_CHRONICLE</div>
        </div>
        <div class="border shadow-hover" style="position:relative; aspect-ratio:1; overflow:hidden;">
            <img src="assets/img/hobby2.jpg" style="width:100%; height:100%; object-fit: cover; filter: grayscale(100%); transition: filter 0.3s ease;" onmouseover="this.style.filter='grayscale(0%)'" onmouseout="this.style.filter='grayscale(100%)'" alt="FRAME_02">
            <div style="position:absolute; bottom:0.5rem; left:0.5rem; background:var(--bg-color); color:var(--text-primary); padding:2px 8px; font-size:0.6rem; font-weight:bold; letter-spacing:1px; border:1px solid var(--text-primary);">02_EXPLORE</div>
        </div>
        <div class="border shadow-hover" style="position:relative; aspect-ratio:1; overflow:hidden;">
            <img src="assets/img/hobby3.jpg" style="width:100%; height:100%; object-fit: cover; filter: grayscale(100%); transition: filter 0.3s ease;" onmouseover="this.style.filter='grayscale(0%)'" onmouseout="this.style.filter='grayscale(100%)'" alt="FRAME_03">
            <div style="position:absolute; bottom:0.5rem; left:0.5rem; background:var(--bg-color); color:var(--text-primary); padding:2px 8px; font-size:0.6rem; font-weight:bold; letter-spacing:1px; border:1px solid var(--text-primary);">03_OBSERVE</div>
        </div>
    </div>
</div>
<div class="hobby-skill-tree" style="margin-top: 2rem;">
    <div class="section-header">
        <div class="header-square"></div>
        <h2 class="section-title">SKILL_TREE // HOBBIES</h2>
        <div class="header-line"></div>
    </div>
    <div class="border shadow-hover" style="margin-top: 1rem; padding: 1.5rem; background: transparent; color: var(--text-primary); font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; line-height: 2;">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--text-primary); margin-bottom: 0.5rem;"><span>[+] PHOTOGRAPHY</span><span>LVL_85</span></div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--text-primary); margin-bottom: 0.5rem;"><span>[+] TRAVEL</span><span>LVL_70</span></div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--text-primary); margin-bottom: 0.5rem;"><span>[+] MUSIC_CURATION</span><span>LVL_90</span></div>
        <div style="display: flex; justify-content: space-between;"><span>[+] TECH_DISCOVERY</span><span>LVL_95</span></div>
    </div>
</div>
<div class="music-player border shadow-hover" style="margin-top: 2rem; padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; background: var(--bg-color); color: var(--text-primary);">
    <h3 style="margin: 0; font-family: var(--font-heading); font-size: 0.8rem; letter-spacing: 2px;">RETRO_MUSIC_SYNC // AMBIENT</h3>
    <div id="player" style="display: none;"></div>
    <div class="controls" style="display: flex; gap: 1rem; align-items: center;">
        <p id="player-status" style="margin: 0; font-size: 0.65rem; letter-spacing: 2px; padding-right: 1.5rem;">[ IDLE ]</p>
        <button id="play-btn" class="border" style="padding: 0.3rem 0.8rem; cursor: pointer; background: var(--text-primary); color: var(--bg-color); font-family: var(--font-body); font-weight: bold; font-size: 0.65rem; transition: transform 0.2s ease;">PLAY</button>
        <button id="stop-btn" class="border" style="padding: 0.3rem 0.8rem; cursor: pointer; background: transparent; color: var(--text-primary); font-family: var(--font-body); font-weight: bold; font-size: 0.65rem; transition: transform 0.2s ease;">STOP</button>
    </div>
</div>
            `;
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ success: true, html: secretHtml })
            };
        } else {
            return {
                statusCode: 401,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ success: false, error: 'Invalid key' })
            };
        }
    } catch (e) {
        return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
    }
};
