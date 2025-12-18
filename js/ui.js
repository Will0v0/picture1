class UIController {
    constructor() {
        this.els = {
            app: document.getElementById('app'),
            storyText: document.getElementById('story-text'),
            optionsContainer: document.getElementById('options-container'),
            
            // Stats (Now progress bars)
            statCharm: document.getElementById('stat-charm'),
            valCharm: document.getElementById('val-charm'),
            statThreat: document.getElementById('stat-threat'),
            valThreat: document.getElementById('val-threat'),
            statObs: document.getElementById('stat-observation'),
            valObs: document.getElementById('val-observation'),
            statSurv: document.getElementById('stat-survival'),
            valSurv: document.getElementById('val-survival'),
            
            // HUD
            location: document.getElementById('location-display'),
            time: document.getElementById('time-display'),
            points: document.getElementById('points-display'),
        };
        this.currentSceneId = null;
    }

    setTheme(theme) {
        if (theme === 'reality') {
            this.els.app.classList.remove('theme-system');
            this.els.app.classList.add('theme-reality');
        } else {
            this.els.app.classList.remove('theme-reality');
            this.els.app.classList.add('theme-system');
        }
    }

    updateStats(state) {
        const updateBar = (elBar, elVal, val) => {
            // Ensure width is between 0% and 100%
            const pct = Math.min(100, Math.max(0, val));
            elBar.style.width = `${pct}%`;
            elVal.textContent = val;
        };

        updateBar(this.els.statCharm, this.els.valCharm, state.attributes.charm);
        updateBar(this.els.statThreat, this.els.valThreat, state.attributes.threat);
        updateBar(this.els.statObs, this.els.valObs, state.attributes.observation);
        updateBar(this.els.statSurv, this.els.valSurv, state.attributes.survival);

        this.els.location.textContent = state.location || '未知区域';
        this.els.time.textContent = state.time || '--:--';
        
        // Format points with leading zeros (e.g. 0150)
        const formattedPoints = state.points.toString().padStart(4, '0');
        this.els.points.textContent = formattedPoints;
    }

    updateScene(scene) {
        this.currentSceneId = scene.id;
        
        // Clear previous options
        this.els.optionsContainer.innerHTML = '';
        
        // Render Text with simple animation reset
        // We use innerHTML directly, but could add typing effect later
        this.els.storyText.innerHTML = ''; // Clear first
        
        // Create a wrapper for animation
        const p = document.createElement('p');
        p.innerHTML = scene.text;
        this.els.storyText.appendChild(p);
        
        // Scroll to bottom
        const scrollArea = document.querySelector('.content-scroll-area');
        if (scrollArea) scrollArea.scrollTop = scrollArea.scrollHeight;
        
        // Render Options
        scene.choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'game-btn';
            
            // Create inner content for styling potential
            btn.innerHTML = `<span>${choice.text}</span>`;
            
            if (choice.condition && !choice.condition(window.gameEngine.state)) {
                btn.disabled = true;
                const reason = choice.failureText || "条件不足";
                btn.innerHTML += ` <span style="font-size:0.8em; opacity:0.7">[${reason}]</span>`;
            } else {
                btn.onclick = () => window.gameEngine.makeChoice(index);
            }

            this.els.optionsContainer.appendChild(btn);
        });
    }

    showNotification(msg) {
        // Use the modal as a notification for now, or could be a toast
        alert(msg); 
    }
}

window.uiController = new UIController();
