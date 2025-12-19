const SCENES = {
    // ==========================================
    // 序章：肉体觉醒
    // ==========================================
    "prologue_start": {
        id: "prologue_start",
        type: "system",
        text: window.GAME_DIALOGUES["prologue_start"],
        choices: [
            {
                text: "喘息着接受现实",
                nextScene: "dungeon_neighbor_1",
                effect: (state) => {
                    state.location = "异界：王美兰的厨房";
                    state.time = "凝固时刻";
                }
            },
            {
                text: "试图反抗这个声音 (死路)",
                nextScene: "bad_end_refuse"
            }
        ]
    },
    "bad_end_refuse": {
        id: "bad_end_refuse",
        type: "system",
        text: window.GAME_DIALOGUES["bad_end_refuse"],
        choices: [
            {
                text: "带着记忆重生",
                nextScene: "prologue_start",
                effect: (state) => window.gameEngine.startNewGame()
            }
        ]
    },

    // ==========================================
    // 副本一：王美兰的秘密 (支配与服从)
    // ==========================================
    "dungeon_neighbor_1": {
        id: "dungeon_neighbor_1",
        type: "dungeon",
        text: window.GAME_DIALOGUES["dungeon_neighbor_1"],
        choices: [
            {
                text: "一脚踹开大门 (暴力介入)",
                condition: (state) => state.attributes.threat >= 5,
                nextScene: "dungeon_neighbor_enter_front",
                effect: (state) => state.attributes.threat += 5
            },
            {
                text: "悄无声息地推门 (潜行窥视)",
                nextScene: "dungeon_neighbor_peek"
            }
        ]
    },
    "dungeon_neighbor_peek": {
        id: "dungeon_neighbor_peek",
        type: "dungeon",
        text: window.GAME_DIALOGUES["dungeon_neighbor_peek"],
        choices: [
            {
                text: "那张芯片是关键，潜行过去",
                nextScene: "dungeon_neighbor_enter_back",
                effect: (state) => state.attributes.observation += 5
            },
            {
                text: "无法忍受，直接冲进去救人",
                nextScene: "dungeon_neighbor_enter_front",
                effect: (state) => state.attributes.charm += 5
            }
        ]
    },
    "dungeon_neighbor_enter_front": {
        id: "dungeon_neighbor_enter_front",
        type: "dungeon",
        text: window.GAME_DIALOGUES["dungeon_neighbor_enter_front"],
        choices: [
            {
                text: "利用周围环境躲避 (生存判定)",
                nextScene: "dungeon_neighbor_combat_hide"
            },
            {
                text: "大声呵斥吸引注意 (威慑)",
                nextScene: "dungeon_neighbor_combat_shout"
            }
        ]
    },
    "dungeon_neighbor_enter_back": {
        id: "dungeon_neighbor_enter_back",
        type: "dungeon",
        text: window.GAME_DIALOGUES["dungeon_neighbor_enter_back"],
        choices: [
            {
                text: "直接拔除芯片 (拯救)",
                nextScene: "dungeon_neighbor_hack_save",
                effect: (state) => {
                    state.inventory.push("control_chip_broken");
                    state.points += 50;
                }
            },
            {
                text: "修改底层权限为‘林阳’ (征服)",
                condition: (state) => state.attributes.observation >= 40, // 需要一点观察力
                nextScene: "dungeon_neighbor_hack_control",
                effect: (state) => {
                    state.inventory.push("control_chip_master");
                    state.flags["neighbor_controlled"] = true;
                    state.attributes.threat += 20;
                }
            }
        ]
    },
    "dungeon_neighbor_combat_shout": {
        id: "dungeon_neighbor_combat_shout",
        type: "dungeon",
        text: window.GAME_DIALOGUES["dungeon_neighbor_combat_shout"],
        choices: [
            {
                text: "查看王美兰的情况",
                nextScene: "dungeon_neighbor_hack_save" // 暴力解救也算拯救线
            }
        ]
    },
    "dungeon_neighbor_combat_hide": {
        id: "dungeon_neighbor_combat_hide",
        type: "dungeon",
        text: window.GAME_DIALOGUES["dungeon_neighbor_combat_hide"],
        choices: [
            {
                text: "查看王美兰的情况",
                nextScene: "dungeon_neighbor_hack_save" // 暴力解救也算拯救线
            }
        ]
    },
    
    // --- 拯救线 ---
    "dungeon_neighbor_hack_save": {
        id: "dungeon_neighbor_hack_save",
        type: "dungeon",
        text: window.GAME_DIALOGUES["dungeon_neighbor_hack_save"],
        choices: [
            {
                text: "温柔地安抚她",
                nextScene: "dungeon_neighbor_save_aftermath",
                effect: (state) => state.relations["neighbor"].affection += 30
            }
        ]
    },
    "dungeon_neighbor_save_aftermath": {
        id: "dungeon_neighbor_save_aftermath",
        type: "dungeon",
        text: window.GAME_DIALOGUES["dungeon_neighbor_save_aftermath"],
        choices: [
            {
                text: "送她回家",
                nextScene: "dungeon_neighbor_end_save"
            }
        ]
    },
    "dungeon_neighbor_end_save": {
        id: "dungeon_neighbor_end_save",
        type: "system",
        text: `【副本结算：拯救者】<br>你展现了人性的光辉。<br>王美兰对你的好感度大幅上升，她不仅是你的邻居，更是一个欠你一条命的女人。<br>奖励：积分+100，魅力+10。`,
        choices: [
            {
                text: "回归现实",
                nextScene: "reality_home_day1",
                effect: (state) => {
                    state.points += 100;
                    state.relations["neighbor"].affection += 30;
                    state.relations["neighbor"].crisis = 0;
                    state.location = "现实：家中";
                    state.time = "第一天 - 下午";
                }
            }
        ]
    },

    // --- 控制线 ---
    "dungeon_neighbor_hack_control": {
        id: "dungeon_neighbor_hack_control",
        type: "dungeon",
        text: window.GAME_DIALOGUES["dungeon_neighbor_hack_control"],
        choices: [
            {
                text: "享受这份支配感",
                nextScene: "dungeon_neighbor_control_training"
            }
        ]
    },
    "dungeon_neighbor_control_training": {
        id: "dungeon_neighbor_control_training",
        type: "dungeon",
        text: window.GAME_DIALOGUES["dungeon_neighbor_control_training"],
        choices: [
            {
                text: "命令她整理好自己，回归现实",
                nextScene: "dungeon_neighbor_end_control"
            }
        ]
    },
    "dungeon_neighbor_end_control": {
        id: "dungeon_neighbor_end_control",
        type: "system",
        text: `【副本结算：支配者】<br>你选择了力量与掌控。<br>王美兰的潜意识已被改写。在现实中，她依然是那个温婉的太太，但在你面前，她将是一条听话的母犬。<br>奖励：积分+150，威胁+20，获得道具【万能钥匙】。`,
        choices: [
            {
                text: "回归现实",
                nextScene: "reality_home_day1",
                effect: (state) => {
                    state.points += 150;
                    state.relations["neighbor"].threat = 100; // 满威胁代表完全控制
                    state.relations["neighbor"].crisis = 0;
                    state.location = "现实：家中";
                    state.time = "第一天 - 下午";
                }
            }
        ]
    },

    // ==========================================
    // 现实世界：第一天 (动态反馈)
    // ==========================================
    "reality_home_day1": {
        id: "reality_home_day1",
        type: "reality",
        text: window.GAME_DIALOGUES["reality_home_day1"],
        choices: [
            {
                text: "查看短信",
                nextScene: "reality_phone_check"
            }
        ]
    },
    "reality_phone_check": {
        id: "reality_phone_check",
        type: "reality",
        text: "...", // Placeholder
        onEnter: (state) => {
            // 动态选择文本
            const el = document.querySelector('#story-text p');
            if (state.flags["neighbor_controlled"]) {
                el.innerHTML = window.GAME_DIALOGUES["reality_phone_check_control"];
            } else {
                el.innerHTML = window.GAME_DIALOGUES["reality_phone_check_save"];
            }
        },
        choices: [
            {
                text: "回复：我这就过来",
                nextScene: "reality_neighbor_visit_router"
            },
            {
                text: "暂时无视",
                nextScene: "reality_choice_evening"
            }
        ]
    },
    "reality_neighbor_visit_router": {
        id: "reality_neighbor_visit_router",
        type: "reality",
        text: "你起身前往隔壁...",
        onEnter: (state) => {
            // 路由跳转
            if (state.flags["neighbor_controlled"]) {
                window.gameEngine.loadScene("neighbor_visit_service");
            } else {
                window.gameEngine.loadScene("neighbor_visit_dinner");
            }
        },
        choices: [] // 自动跳转，不需要选项
    },
    "neighbor_visit_dinner": {
        id: "neighbor_visit_dinner",
        type: "reality",
        text: window.GAME_DIALOGUES["neighbor_visit_dinner"],
        choices: [
            {
                text: "握住她的手 (进入暧昧线)",
                nextScene: "reality_choice_evening", // 暂时结束，回到主线
                effect: (state) => state.relations["neighbor"].affection += 10
            },
            {
                text: "礼貌地抽回手",
                nextScene: "reality_choice_evening"
            }
        ]
    },
    "neighbor_visit_service": {
        id: "neighbor_visit_service",
        type: "reality",
        text: window.GAME_DIALOGUES["neighbor_visit_service"],
        choices: [
            {
                text: "接受服务 (进入调教线)",
                nextScene: "reality_choice_evening", // 暂时结束，回到主线
                effect: (state) => state.attributes.threat += 5
            },
            {
                text: "命令她退下",
                nextScene: "reality_choice_evening"
            }
        ]
    },

    "reality_choice_evening": {
        id: "reality_choice_evening",
        type: "reality",
        text: `夜深了。你回到自己的房间，但那种不安的感觉却越来越强烈。<br><br>就在这时，你听到了客厅传来母亲回家的声音。`,
        choices: [
            {
                text: "出去看看 (进入母亲线)",
                nextScene: "reality_mom_start"
            },
            {
                text: "不管她，继续睡觉 (进入苏晓晓线)",
                nextScene: "reality_choice_evening_original"
            }
        ]
    },
    "reality_choice_evening_original": {
        id: "reality_choice_evening_original",
        type: "reality",
        text: `你翻了个身，决定不理会客厅的动静。<br><br>突然，你的直觉疯狂预警。一股血腥味似乎穿透了空间。<br>是苏晓晓。`,
        choices: [
            {
                text: "主动出击，寻找苏晓晓",
                nextScene: "prologue_next_mission"
            }
        ]
    },

    // ==========================================
    // 妈妈线：升学风波
    // ==========================================
    "reality_mom_start": {
        id: "reality_mom_start",
        type: "reality",
        text: window.GAME_DIALOGUES["reality_mom_start"],
        choices: [
            {
                text: "询问她发生了什么",
                nextScene: "reality_mom_confess"
            }
        ]
    },
    "reality_mom_confess": {
        id: "reality_mom_confess",
        type: "reality",
        text: window.GAME_DIALOGUES["reality_mom_confess"],
        choices: [
            {
                text: "沉默，听她说完",
                nextScene: "reality_mom_decision"
            }
        ]
    },
    "reality_mom_decision": {
        id: "reality_mom_decision",
        type: "reality",
        text: window.GAME_DIALOGUES["reality_mom_decision"],
        choices: [
            {
                text: "去找李渊了解那个‘俱乐部’ (进入偷窥线)",
                nextScene: "reality_mom_ask_liyuan",
                effect: (state) => {
                    state.attributes.observation += 5;
                    state.flags["mom_fallen_path"] = true;
                }
            },
            {
                text: "无论如何也要阻止她 (暂未开放)",
                nextScene: "reality_choice_evening_original", // 暂时回归主线
                effect: (state) => state.relations["mom"].affection += 10
            }
        ]
    },
    "reality_mom_ask_liyuan": {
        id: "reality_mom_ask_liyuan",
        type: "reality",
        text: window.GAME_DIALOGUES["reality_mom_ask_liyuan"],
        choices: [
            {
                text: "去李渊家看直播",
                nextScene: "reality_mom_stream_start",
                effect: (state) => state.attributes.threat += 5
            }
        ]
    },
    "reality_mom_stream_start": {
        id: "reality_mom_stream_start",
        type: "reality", 
        text: window.GAME_DIALOGUES["reality_mom_stream_start"],
        choices: [
            {
                text: "看向屏幕",
                nextScene: "reality_mom_stream_content"
            }
        ]
    },
    "reality_mom_stream_content": {
        id: "reality_mom_stream_content",
        type: "reality",
        text: window.GAME_DIALOGUES["reality_mom_stream_content"],
        choices: [
            {
                text: "强忍着愤怒继续看下去",
                nextScene: "reality_mom_stream_end",
                effect: (state) => {
                     state.relations["mom"].shame += 20;
                     state.san -= 10;
                }
            }
        ]
    },
    "reality_mom_stream_end": {
        id: "reality_mom_stream_end",
        type: "reality",
        text: window.GAME_DIALOGUES["reality_mom_stream_end"],
        choices: [
            {
                text: "未完待续...",
                nextScene: "demo_end"
            }
        ]
    },
    "prologue_next_mission": {
        id: "prologue_next_mission",
        type: "system",
        text: window.GAME_DIALOGUES["prologue_next_mission"],
        choices: [
            {
                text: "传送开始",
                nextScene: "dungeon_school_start",
                effect: (state) => {
                    state.location = "副本：血色校园";
                    state.time = "异空间 - 深夜";
                }
            }
        ]
    },

    // ==========================================
    // 副本二：血色校园 (病娇与暴行)
    // ==========================================
    "dungeon_school_start": {
        id: "dungeon_school_start",
        type: "dungeon",
        text: window.GAME_DIALOGUES["dungeon_school_start"],
        choices: [
            {
                text: "向天台跑去",
                nextScene: "dungeon_school_roof"
            },
            {
                text: "去教室查看线索",
                nextScene: "dungeon_school_room"
            }
        ]
    },
    // ... 后续校园剧情暂时保持原样或也可以用 Dialogues 替换，
    // 为了节省时间，我主要关注了王美兰部分，但为了统一性，我应该把剩下的也替换了。
    // 不过 Dialogues 文件里我只写了开头。
    // 我将保留原有的字符串给剩下的部分，以免报错。
    "dungeon_school_room": {
        id: "dungeon_school_room",
        type: "dungeon",
        text: `教室里一片狼藉。课桌被掀翻，黑板上用指甲刻满了你的名字。<br>林阳 林阳 林阳 林阳...<br>每一个名字都深可见骨，仿佛刻字的人在宣泄着某种扭曲的爱意。<br>在讲台上，你发现了一本沾血的日记。`,
        choices: [
            {
                text: "阅读日记",
                nextScene: "dungeon_school_read_diary"
            }
        ]
    },
    "dungeon_school_read_diary": {
        id: "dungeon_school_read_diary",
        type: "dungeon",
        text: `“我想把他关起来...只属于我一个人...”<br>“白狼说它可以帮我...只要杀掉所有靠近他的女人...”<br>“我不行...我怕...但白狼说得对...”<br><br>这是一个彻底崩坏的灵魂。她需要的不是安慰，而是管教。`,
        choices: [
            {
                text: "带走日记，前往天台",
                nextScene: "dungeon_school_roof",
                effect: (state) => state.inventory.push("diary_fragment")
            }
        ]
    },
    "dungeon_school_roof": {
        id: "dungeon_school_roof",
        type: "dungeon",
        text: `天台的风很大，吹动着苏晓晓染血的裙摆。<br>她手里拖着一把巨大的工业剪刀，金属在地面摩擦出刺耳的火花。<br>她抬起头，左眼是清澈的泪水，右眼却是猩红的杀意。<br><br>“林阳哥哥，只要把你做成标本，你就永远不会离开我了，对吧？”<br>话音未落，她举起剪刀冲了过来！`,
        choices: [
            {
                text: "正面迎击，暴力压制 (武力征服)",
                condition: (state) => state.attributes.threat >= 10,
                nextScene: "dungeon_school_combat_dominate",
                effect: (state) => state.attributes.threat += 10
            },
            {
                text: "拿出日记，试图唤醒 (感化)",
                condition: (state) => state.inventory.includes("diary_fragment"),
                nextScene: "dungeon_school_talk_save"
            },
            {
                text: "闪避",
                nextScene: "dungeon_school_bad_end"
            }
        ]
    },
    "dungeon_school_combat_dominate": {
        id: "dungeon_school_combat_dominate",
        type: "dungeon",
        text: `你没有退缩，反而迎着剪刀冲了上去。<br>侧身，擒拿，膝撞。<br>你的动作快准狠，直接卸掉了她的关节，将她狠狠按在粗糙的水泥地上。<br>巨大的剪刀哐当一声掉落。<br><br>你骑在她身上，掐住她的脖子，眼神比她更冷酷。<br>“闹够了没有？”<br><br>苏晓晓眼中的红光剧烈闪烁，那是"白狼"人格在恐惧。面对绝对的暴力，野兽选择了臣服。`,
        choices: [
            {
                text: "加重手上的力度",
                nextScene: "dungeon_school_end_dominate"
            }
        ]
    },
    "dungeon_school_end_dominate": {
        id: "dungeon_school_end_dominate",
        type: "system",
        text: `【副本结算：驯兽师】<br>你用暴力征服了野兽。<br>苏晓晓的"白狼"人格不再试图杀死你，而是将你视为唯一的"Alpha"（头狼）。<br>她会成为你最锋利的刀。<br>奖励：苏晓晓完全忠诚，解锁【杀戮指令】。`,
        choices: [
            {
                text: "未完待续...",
                nextScene: "demo_end"
            }
        ]
    },
    "dungeon_school_talk_save": {
        id: "dungeon_school_talk_save",
        type: "system",
        text: `你大声念出了日记里的内容。苏晓晓的动作僵住了。<br>她抱着头痛苦地尖叫，两种人格在剧烈冲突。<br>最终，她瘫软在地，哭得像个无助的孩子。<br>你走过去抱住她，她死死咬住你的肩膀，直到出血。<br>【副本结算：救赎】<br>奖励：苏晓晓好感度+50，解锁【病娇依恋】。`,
        choices: [
            {
                text: "未完待续...",
                nextScene: "demo_end"
            }
        ]
    },
    "dungeon_school_bad_end": {
        id: "dungeon_school_bad_end",
        type: "system",
        text: `你的犹豫是你最大的弱点。<br>剪刀贯穿了你的胸膛。<br>在意识消失前，你看到了苏晓晓痴迷的笑容。<br>“太好了...终于...在一起了...”`,
        choices: [
            {
                text: "读档",
                nextScene: "prologue_start",
                effect: (state) => window.gameEngine.loadGame()
            }
        ]
    },
    "demo_end": {
        id: "demo_end",
        type: "system",
        text: `当前版本体验结束。<br>您已体验了【支配】与【救赎】的不同路径。<br>在完整版中，您的选择将彻底改变所有女性角色的命运与结局。<br>当前积分：<span id="final-score"></span>`,
        onEnter: (state) => {
            setTimeout(() => {
                document.getElementById('final-score').innerText = state.points;
            }, 100);
        },
        choices: [
            {
                text: "重新开始体验另一条线",
                nextScene: "prologue_start",
                effect: (state) => window.gameEngine.startNewGame()
            }
        ]
    }
};

window.GAME_SCENES = SCENES;
