// Data placeholders - will be populated with content
const ITEMS = {
    "time_card": { name: "时间回溯卡", desc: "可以重选一次选项", type: "consumable" },
    "control_chip": { name: "精神控制芯片", desc: "控制一名角色", type: "consumable" }
};

// Export to global scope for simplicity in this vanilla setup
window.GAME_ITEMS = ITEMS;
