class GameEngine {
    constructor() {
        this.state = {
            attributes: {
                charm: 50,
                threat: 0,
                observation: 50,
                survival: 50
            },
            inventory: [], // Array of item IDs
            flags: {},     // Story flags: { "met_neighbor": true }
            relations: {   // Character ID -> { affection: 50, threat: 0, crisis: 0 }
                "neighbor": { name: "王美兰", affection: 50, threat: 0, crisis: 0 },
                "friend": { name: "苏晓晓", affection: 50, threat: 0, crisis: 0 },
                "colleague": { name: "李娜", affection: 50, threat: 0, crisis: 0 }
            },
            location: "现实世界",
            time: "Day 1 - Morning",
            points: 0
        };
        
        this.scenes = {}; // Scene registry
        this.ui = null;   // UI Controller reference
    }

    init(uiController, scenesData) {
        this.ui = uiController;
        this.scenes = scenesData;
        this.loadGame(); // Try loading save, or start new
    }

    startNewGame() {
        this.state.points = 0;
        // Reset state...
        this.loadScene("prologue_start");
    }

    loadScene(sceneId) {
        const scene = this.scenes[sceneId];
        if (!scene) {
            console.error(`Scene ${sceneId} not found!`);
            return;
        }

        // Apply scene-on-enter effects (if any)
        if (scene.onEnter) {
            scene.onEnter(this.state);
        }

        // Update UI
        this.ui.updateScene(scene);
        this.ui.updateStats(this.state);
        
        // Handle Theme Switching
        if (scene.type === "dungeon") {
            this.ui.setTheme("system");
        } else {
            this.ui.setTheme("reality");
        }
    }

    makeChoice(choiceIndex) {
        const currentSceneId = this.ui.currentSceneId;
        const scene = this.scenes[currentSceneId];
        const choice = scene.choices[choiceIndex];

        // Check requirements
        if (choice.condition && !choice.condition(this.state)) {
            return; // Should be disabled in UI anyway
        }

        // Apply effects
        if (choice.effect) {
            choice.effect(this.state);
        }

        // Transition
        if (choice.nextScene) {
            this.loadScene(choice.nextScene);
        } else {
            console.warn("Choice has no nextScene!");
        }
    }

    // Utility: Attribute Check
    checkAttribute(attr, value) {
        return this.state.attributes[attr] >= value;
    }

    // Utility: RNG Check (d100)
    rollCheck(threshold) {
        const roll = Math.floor(Math.random() * 100) + 1;
        return roll <= threshold;
    }

    saveGame() {
        localStorage.setItem('theChosenOne_save', JSON.stringify(this.state));
        this.ui.showNotification("游戏已保存");
    }

    loadGame() {
        const save = localStorage.getItem('theChosenOne_save');
        if (save) {
            this.state = JSON.parse(save);
            // Resume from last scene logic would go here, 
            // for now let's just start new if no scene tracked, or load last scene
            // Ideally we save 'currentSceneId' in state
        } else {
            this.startNewGame();
        }
    }
}

// Global instance
window.gameEngine = new GameEngine();
