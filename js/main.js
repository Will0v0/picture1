window.addEventListener('DOMContentLoaded', () => {
    console.log("System Initializing...");
    
    // Check dependencies
    if (!window.gameEngine || !window.uiController || !window.GAME_SCENES) {
        console.error("Critical Error: Core modules missing.");
        alert("游戏加载失败：核心模块缺失。");
        return;
    }

    // Initialize Engine with Data
    window.gameEngine.init(window.uiController, window.GAME_SCENES);

    // Bind Global UI Buttons
    document.getElementById('btn-save').addEventListener('click', () => {
        window.gameEngine.saveGame();
    });

    document.getElementById('btn-inventory').addEventListener('click', () => {
        const inventoryList = window.gameEngine.state.inventory.map(itemId => {
            const item = window.GAME_ITEMS[itemId];
            return item ? `<li>${item.name}: ${item.desc}</li>` : `<li>未知物品 (${itemId})</li>`;
        }).join('');
        
        showModal("背包", inventoryList || "<p>背包是空的。</p>");
    });

    document.getElementById('btn-relations').addEventListener('click', () => {
        const rels = window.gameEngine.state.relations;
        let html = '<div class="relation-grid">';
        for (const [key, val] of Object.entries(rels)) {
            html += `
                <div class="relation-card" style="border:1px solid #444; padding:10px; margin-bottom:10px;">
                    <h3>${val.name}</h3>
                    <p>好感度: ${val.affection}</p>
                    <p>威胁度: ${val.threat}</p>
                    <p>危机值: ${val.crisis}%</p>
                </div>
            `;
        }
        html += '</div>';
        showModal("人际关系", html);
    });

    // Modal Logic
    const modal = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    function showModal(title, content) {
        modalTitle.innerText = title;
        modalBody.innerHTML = content;
        modal.classList.remove('hidden');
    }

    modalClose.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Mobile Navigation Logic
    const navBtns = document.querySelectorAll('.nav-btn');
    const leftPanel = document.querySelector('.left-panel');
    const rightPanel = document.querySelector('.right-panel');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update Active State
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const target = btn.dataset.target;

            // Hide all panels first
            leftPanel.classList.remove('active');
            rightPanel.classList.remove('active');

            if (target === 'status') {
                leftPanel.classList.add('active');
            } else if (target === 'menu') {
                rightPanel.classList.add('active');
            } else if (target === 'main') {
                // Default view (Main + Deck) is always visible in background,
                // just hiding the overlays reveals it.
            }
        });
    });

    console.log("System Ready.");
});
