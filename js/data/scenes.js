const SCENES = {
    // ==========================================
    // 序章：觉醒
    // ==========================================
    "prologue_start": {
        id: "prologue_start",
        type: "system",
        text: `[系统启动中...] <br> [神经连接建立...] <br> 欢迎回来，<b>被选中者 - 林阳</b>。<br><br> 检测到现实世界波动，编号001号目标【邻居太太-王美兰】危机值已突破80%。<br>根据协议，你必须立即执行干预任务。`,
        choices: [
            {
                text: "接受任务 (开始游戏)",
                nextScene: "dungeon_neighbor_1",
                effect: (state) => {
                    state.location = "副本：王美兰的厨房";
                    state.time = "异空间";
                }
            },
            {
                text: "拒绝任务 (进入坏结局)",
                nextScene: "bad_end_refuse"
            }
        ]
    },
    "bad_end_refuse": {
        id: "bad_end_refuse",
        type: "system",
        text: `警告！拒绝执行系统指令。<br>抹杀程序启动...<br><br><span style="color:red">你已被系统抹杀。</span>`,
        choices: [
            {
                text: "重新开始",
                nextScene: "prologue_start",
                effect: (state) => window.gameEngine.startNewGame()
            }
        ]
    },

    // ==========================================
    // 副本一：邻居太太的厨房 (教程关)
    // ==========================================
    "dungeon_neighbor_1": {
        id: "dungeon_neighbor_1",
        type: "dungeon",
        text: `你站在邻居太太王美兰家的厨房门口。四周是一片死寂的黑暗，只有门缝中透出诡异的<b>蓝光</b>。<br>空气中弥漫着一股铁锈和消毒水的混合气味。<br>门内传来隐约的呼救声，但声音似乎被某种力量扭曲了，听起来像是在水底呐喊。`,
        choices: [
            {
                text: "直接推门而入 (魅力≥50)",
                condition: (state) => state.attributes.charm >= 50,
                nextScene: "dungeon_neighbor_enter_front",
                effect: (state) => state.attributes.threat += 5
            },
            {
                text: "绕道后门潜入 (观察力≥50)",
                condition: (state) => state.attributes.observation >= 50,
                nextScene: "dungeon_neighbor_enter_back",
                effect: (state) => state.attributes.survival += 5
            },
            {
                text: "先贴在门上偷听 (无消耗)",
                nextScene: "dungeon_neighbor_listen"
            }
        ]
    },
    "dungeon_neighbor_listen": {
        id: "dungeon_neighbor_listen",
        type: "dungeon",
        text: `你贴在门上仔细聆听...<br>除了呼救声，你还听到了机械运转的滋滋声，以及一个冰冷的电子音：<br>“实验体7号，生命体征下降，准备进行记忆清洗。”<br>王美兰不仅仅是家庭主妇？`,
        choices: [
            {
                text: "必须立刻救人！破门而入！",
                nextScene: "dungeon_neighbor_enter_front",
                effect: (state) => state.attributes.survival -= 5 // 鲁莽扣分
            },
            {
                text: "寻找其他入口",
                nextScene: "dungeon_neighbor_enter_back"
            }
        ]
    },
    "dungeon_neighbor_enter_front": {
        id: "dungeon_neighbor_enter_front",
        type: "dungeon",
        text: `你猛地推开门！<br>厨房早已面目全非，原本的灶台变成了一个巨大的<b>手术台</b>，王美兰被拘束带捆绑在上面，几个机械臂正在她头顶盘旋。<br>看到你进来，机械臂突然停止了动作，转向了你。`,
        choices: [
            {
                text: "大声呵斥 (威胁判定)",
                nextScene: "dungeon_neighbor_combat_shout"
            },
            {
                text: "寻找掩体 (生存判定)",
                nextScene: "dungeon_neighbor_combat_hide"
            }
        ]
    },
    "dungeon_neighbor_enter_back": {
        id: "dungeon_neighbor_enter_back",
        type: "dungeon",
        text: `你悄悄绕到后窗，用铁丝撬开了锁。<br>你发现自己处于"手术台"的后方视野盲区。王美兰被困在中央，而在角落里，你发现了一个闪烁的控制台。<br>控制台上插着一张<b>蓝色芯片</b>。`,
        choices: [
            {
                text: "拔掉芯片 (可能解除防御)",
                nextScene: "dungeon_neighbor_hack_success",
                effect: (state) => {
                    state.inventory.push("control_chip");
                    state.points += 50;
                }
            },
            {
                text: "潜行接近王美兰",
                nextScene: "dungeon_neighbor_sneak_save"
            }
        ]
    },
    // ... 中间战斗过程简化，直接导向结局 ...
    "dungeon_neighbor_combat_shout": {
        id: "dungeon_neighbor_combat_shout",
        type: "dungeon",
        text: `你大喝一声：“住手！”<br>你的威胁值似乎起了作用，机械臂迟疑了片刻。趁着这个机会，你冲上去切断了电源。<br>蓝光消散，厨房恢复了原状，王美兰昏倒在地上。`,
        choices: [
            {
                text: "查看情况",
                nextScene: "dungeon_neighbor_end_save"
            }
        ]
    },
    "dungeon_neighbor_combat_hide": {
        id: "dungeon_neighbor_combat_hide",
        type: "dungeon",
        text: `你滚到冰箱后面。机械臂发射了一道激光，烧焦了你刚才站的地方。<br>太危险了！你必须想办法反击。<br>你发现手边有一瓶"强力清洁剂"。`,
        choices: [
            {
                text: "泼洒清洁剂干扰电路",
                nextScene: "dungeon_neighbor_end_save",
                effect: (state) => state.attributes.observation += 5
            }
        ]
    },
    "dungeon_neighbor_hack_success": {
        id: "dungeon_neighbor_hack_success",
        type: "dungeon",
        text: `你拔掉了芯片，所有的机械臂瞬间瘫痪坠落。<br>你获得了【损坏的控制芯片】。<br>王美兰虚弱地睁开眼睛，看到是你，眼神复杂。`,
        choices: [
            {
                text: "带她离开",
                nextScene: "dungeon_neighbor_end_save"
            }
        ]
    },
    "dungeon_neighbor_sneak_save": {
        id: "dungeon_neighbor_sneak_save",
        type: "dungeon",
        text: `你解开了王美兰的束缚。她突然抓住你的手，低声说：“快跑，它们要重启了！”<br>你们在警报声响起前逃出了厨房。`,
        choices: [
            {
                text: "逃离副本",
                nextScene: "dungeon_neighbor_end_save"
            }
        ]
    },

    // ==========================================
    // 副本结算
    // ==========================================
    "dungeon_neighbor_end_save": {
        id: "dungeon_neighbor_end_save",
        type: "system",
        text: `【副本完成】<br>目标：拯救王美兰 - 达成<br>评价：A<br>奖励：积分+100，王美兰好感度+20。<br><br>正在传送回现实世界...`,
        choices: [
            {
                text: "回归现实",
                nextScene: "reality_home_day1",
                effect: (state) => {
                    state.points += 100;
                    state.relations["neighbor"].affection += 20;
                    state.relations["neighbor"].crisis = 0;
                    state.location = "现实：家中";
                    state.time = "第一天 - 下午";
                }
            }
        ]
    },

    // ==========================================
    // 现实世界：第一天
    // ==========================================
    "reality_home_day1": {
        id: "reality_home_day1",
        type: "reality",
        text: `你猛地从床上坐起，冷汗浸透了衣衫。<br>窗外阳光明媚，知了在叫。一切看起来都很正常。<br>你走到窗前，看到邻居王美兰正在楼下浇花。她似乎感应到了你的目光，抬头对你温柔一笑。<br>但你知道，那笑容背后藏着秘密。`,
        choices: [
            {
                text: "下楼去找王美兰聊天",
                nextScene: "reality_talk_neighbor"
            },
            {
                text: "查看手机信息",
                nextScene: "reality_check_phone"
            },
            {
                text: "在家休息 (提升生存本能)",
                nextScene: "reality_rest",
                effect: (state) => state.attributes.survival += 2
            }
        ]
    },
    "reality_talk_neighbor": {
        id: "reality_talk_neighbor",
        type: "reality",
        text: `你来到楼下。王美兰看到你，眼神闪烁了一下。<br>“林阳啊，今天怎么有空下来？”<br>她的语气很自然，但你注意到她的右手在微微颤抖——那是副本中被机械臂勒住的地方。`,
        choices: [
            {
                text: "试探：“王阿姨，你手怎么了？”",
                nextScene: "reality_talk_neighbor_2"
            },
            {
                text: "闲聊：“天气不错。”",
                nextScene: "reality_home_day1_loop"
            }
        ]
    },
    "reality_talk_neighbor_2": {
        id: "reality_talk_neighbor_2",
        type: "reality",
        text: `王美兰赶紧把手藏到身后：“哦，没什么，做饭不小心烫到了。”<br>由于你在副本中救了她，她对你的戒备心降低了。<br>“林阳，如果你遇到什么奇怪的事情...可以来找阿姨。”<br>【获得情报：王美兰的信任】`,
        choices: [
            {
                text: "记住了",
                nextScene: "reality_home_day1_loop",
                effect: (state) => state.relations["neighbor"].affection += 5
            }
        ]
    },
    "reality_check_phone": {
        id: "reality_check_phone",
        type: "reality",
        text: `你打开手机。只有一条未读短信，来自青梅竹马苏晓晓。<br>“林阳哥，今晚学校有晚自习，我可能晚点回去。最近学校...感觉怪怪的。”<br>系统提示：苏晓晓危机值上升至30。`,
        choices: [
            {
                text: "回复：注意安全",
                nextScene: "reality_home_day1_loop"
            },
            {
                text: "回复：我去接你 (魅力+2)",
                nextScene: "reality_home_day1_loop",
                effect: (state) => {
                    state.attributes.charm += 2;
                    state.relations["friend"].affection += 5;
                }
            }
        ]
    },
    "reality_rest": {
        id: "reality_rest",
        type: "reality",
        text: `你躺回床上，整理思绪。<br>虽然身体很累，但你的生存本能似乎更加敏锐了。<br>【生存本能+2】`,
        choices: [
            {
                text: "起床活动",
                nextScene: "reality_home_day1_loop"
            }
        ]
    },
    "reality_home_day1_loop": {
        id: "reality_home_day1_loop",
        type: "reality",
        text: `下午的时间过得很快。天色渐晚。<br>你感到一股莫名的寒意。<br>系统警告：检测到新的高能反应！`,
        choices: [
            {
                text: "准备迎接冲击",
                nextScene: "prologue_next_mission"
            }
        ]
    },
    "prologue_next_mission": {
        id: "prologue_next_mission",
        type: "system",
        text: `[系统警报]<br>目标编号002：【苏晓晓】<br>地点：城南高中<br>危机值：90 (极度危险)<br>任务类型：人格修正 / 逃生<br>强制传送倒计时... 3... 2... 1...`,
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
    // 副本二：血色校园 (苏晓晓篇)
    // ==========================================
    "dungeon_school_start": {
        id: "dungeon_school_start",
        type: "dungeon",
        text: `你被传送到了城南高中的校门口。<br>原本熟悉的校园此刻被血红色的迷雾笼罩。校门上挂着奇怪的肉块，仿佛某种生物的内脏。<br>远处教学楼的窗户像一只只眼睛，死死盯着你。`,
        choices: [
            {
                text: "翻墙进入 (生存判定)",
                nextScene: "dungeon_school_wall"
            },
            {
                text: "从正门突破 (威胁判定)",
                nextScene: "dungeon_school_gate"
            }
        ]
    },
    "dungeon_school_wall": {
        id: "dungeon_school_wall",
        type: "dungeon",
        text: `你试图翻墙，但墙壁突然变软，像舌头一样试图卷住你！<br>你奋力挣脱，跌落在操场上。<br>操场上游荡着穿着校服的...无面人。`,
        choices: [
            {
                text: "躲进器材室",
                nextScene: "dungeon_school_room"
            },
            {
                text: "冲向教学楼",
                nextScene: "dungeon_school_building"
            }
        ]
    },
    "dungeon_school_gate": {
        id: "dungeon_school_gate",
        type: "dungeon",
        text: `你一脚踹开正门。巨大的响声吸引了周围怪物的注意。<br>你必须快速移动！`,
        choices: [
            {
                text: "冲向教学楼",
                nextScene: "dungeon_school_building"
            }
        ]
    },
    "dungeon_school_building": {
        id: "dungeon_school_building",
        type: "dungeon",
        text: `你冲进了教学楼。走廊里回荡着苏晓晓的笑声，那是你从未听过的、疯狂的笑声。<br>“林阳哥...你来陪我玩了吗？”<br>声音来自顶楼天台。`,
        choices: [
            {
                text: "上楼找她",
                nextScene: "dungeon_school_roof"
            }
        ]
    },
    "dungeon_school_room": {
        id: "dungeon_school_room",
        type: "dungeon",
        text: `你躲进器材室，发现这里竟然是一个祭坛。<br>墙上写满了苏晓晓的名字，还有一张撕碎的日记。<br>日记上写着：“我不想杀人...是‘白狼’逼我的...救救我...”`,
        choices: [
            {
                text: "带走日记碎片",
                nextScene: "dungeon_school_building",
                effect: (state) => {
                    state.inventory.push("diary_fragment");
                    state.flags["know_secret"] = true;
                }
            }
        ]
    },
    "dungeon_school_roof": {
        id: "dungeon_school_roof",
        type: "dungeon",
        text: `天台上，苏晓晓穿着一身染血的校服，手里拿着一把巨大的剪刀。<br>她的左眼是正常的黑色，右眼却是猩红的。<br>“林阳哥，你是来杀我的吗？还是...爱我？”<br>她举起剪刀冲了过来！`,
        choices: [
            {
                text: "使用【日记碎片】唤醒她 (需持有道具)",
                condition: (state) => state.inventory.includes("diary_fragment"),
                nextScene: "dungeon_school_good_end"
            },
            {
                text: "战斗：制服她 (威胁≥10)",
                condition: (state) => state.attributes.threat >= 10,
                nextScene: "dungeon_school_normal_end"
            },
            {
                text: "闪避并逃跑",
                nextScene: "dungeon_school_bad_end"
            }
        ]
    },
    "dungeon_school_good_end": {
        id: "dungeon_school_good_end",
        type: "system",
        text: `你大声朗读日记的内容。苏晓晓的动作停滞了。<br>她痛苦地抱住头：“滚出去...白狼...滚出我的身体！”<br>猩红的眼眸褪去，她瘫软在你怀里。<br>【副本完成：完美拯救】<br>奖励：积分+200，苏晓晓好感度+50 (解锁盟友状态)`,
        choices: [
            {
                text: "未完待续...",
                nextScene: "demo_end"
            }
        ]
    },
    "dungeon_school_normal_end": {
        id: "dungeon_school_normal_end",
        type: "system",
        text: `你凭借武力打飞了她的剪刀，将她按在地上。<br>苏晓晓昏了过去。<br>【副本完成：暴力压制】<br>奖励：积分+100，苏晓晓好感度-10，威胁值+20。`,
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
        text: `你试图逃跑，但天台的门锁死了。<br>巨大的剪刀贯穿了你的胸膛。<br>在意识模糊前，你听到苏晓晓哭着说：“对不起...”<br>【Bad End】`,
        choices: [
            {
                text: "读档重来",
                nextScene: "prologue_start",
                effect: (state) => window.gameEngine.loadGame()
            }
        ]
    },
    "demo_end": {
        id: "demo_end",
        type: "system",
        text: `感谢游玩《被选中者》早期测试版。<br>更多内容（女白领副本、特工组织线、外星人线）正在开发中。<br>您的当前积分：<span id="final-score"></span>`,
        onEnter: (state) => {
            setTimeout(() => {
                document.getElementById('final-score').innerText = state.points;
            }, 100);
        },
        choices: [
            {
                text: "重新开始",
                nextScene: "prologue_start",
                effect: (state) => window.gameEngine.startNewGame()
            }
        ]
    }
};

window.GAME_SCENES = SCENES;
