const SCENES = {
    // ==========================================
    // 序章：肉体觉醒
    // ==========================================
    "prologue_start": {
        id: "prologue_start",
        type: "system",
        text: `剧痛。像是有无数根烧红的钢针同时刺入你的大脑皮层。<br><br>你试图惨叫，却发现喉咙里发不出任何声音。视网膜上一片血红，混乱的噪点中，一行行冰冷的文字像烙印般浮现：<br><br><span style="color:#00f3ff; font-weight:bold;">>> 神经接驳完成...</span><br><span style="color:#ff0055; font-weight:bold;">>> 宿主生命体征确认...</span><br><br>那个声音直接在你颅骨内响起，带着某种不可抗拒的威压：<br>“欢迎来到真实世界，林阳。不想死的话，就按照我说的做。”<br><br>你的心脏剧烈跳动，仿佛要撞破胸膛。这不是梦。`,
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
        text: `你试图将那个意识赶出脑海。但下一秒，你的心脏骤停了。<br>那是纯粹的、生理性的抹杀。<br>你的意识在黑暗中迅速消散，最后听到的只有那个声音的冷笑。<br><span style="color:red">【结局：由于愚蠢而夭折】</span>`,
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
        text: `浓重的铁锈味混杂着刺鼻的消毒水气息钻进你的鼻腔。<br>你站在邻居王美兰家的厨房门口。但这绝不是你记忆中那个充满饭菜香气的地方。<br><br>门缝里透出幽幽的蓝光，像是深海怪物的眼睛。你能听到里面传来某种粘稠的、湿漉漉的蠕动声，以及...女人被堵住嘴后发出的、绝望的呜咽。<br><br>那是王美兰的声音。平时那个端庄温婉的妇人，现在正遭受着某种难以想象的折磨。`,
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
        text: `你屏住呼吸，透过门缝向内窥视。<br><br>视觉冲击让你瞳孔骤缩。原本的餐桌变成了一张冰冷的手术台。王美兰赤身裸体地被皮革束带固定在上面，几根冰冷的机械触手正在她身上游走，每一次触碰都引起她剧烈的颤栗。<br><br>她满脸潮红，眼神涣散，似乎已经被注射了某种药物。在房间角落，一个控制台正闪烁着红光，上面插着一张<span style="color:#00f3ff">蓝色芯片</span>。`,
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
        text: `你冲进房间，巨大的动静让机械触手瞬间停滞，随后像受惊的毒蛇一样转向你！<br>王美兰费力地抬起头，看到你的瞬间，她眼中闪过一丝错愕和羞耻。<br>“林...林阳？快跑...不要看...”<br><br>机械臂尖端的激光探头锁定了你的眉心。`,
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
        text: `你像一只猫一样无声地滑过地板。机械臂正全神贯注地在王美兰身上操作，没有发现你。<br>你摸到了控制台前。那张蓝色的芯片正散发着微热的温度。<br><br>屏幕上显示着：<span style="color:#ff0055">>> 记忆清洗程序进行中... 进度 85%</span><br><br>如果你拔掉它，机械臂会停下。如果你...修改它？`,
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
        text: `“给我停下！”你爆发出野兽般的怒吼。<br>那一瞬间，你身上散发出的杀气似乎干扰了机械的逻辑判定。趁着它们僵直的瞬间，你抓起一把手术刀狠狠插进了控制台。<br>火花四溅。机械臂无力地垂落。<br>你救下了她，但方式很粗暴。`,
        choices: [
            {
                text: "查看王美兰的情况",
                nextScene: "dungeon_neighbor_end_save"
            }
        ]
    },
    "dungeon_neighbor_combat_hide": {
        id: "dungeon_neighbor_combat_hide",
        type: "dungeon",
        text: `激光擦着你的头皮飞过，烧焦了一缕头发。你翻滚到冰箱后，抓起一瓶液氮罐狠狠砸向控制台。<br>随着一声脆响，低温瞬间冻结了电路。<br>危机解除。`,
        choices: [
            {
                text: "查看王美兰的情况",
                nextScene: "dungeon_neighbor_end_save"
            }
        ]
    },
    // --- 分支结局 ---
    "dungeon_neighbor_hack_save": {
        id: "dungeon_neighbor_hack_save",
        type: "dungeon",
        text: `你一把扯下芯片。机械臂瞬间瘫痪。<br>你解开王美兰身上的束缚。她浑身瘫软，直接滑进了你的怀里。她赤裸的皮肤滚烫，充满了汗水和体香。<br>她紧紧抓着你的衣服，像是抓着救命稻草，泪水打湿了你的胸口。<br>“谢谢...谢谢你，林阳...”`,
        choices: [
            {
                text: "温柔地安抚她",
                nextScene: "dungeon_neighbor_end_save",
                effect: (state) => state.relations["neighbor"].affection += 30
            }
        ]
    },
    "dungeon_neighbor_hack_control": {
        id: "dungeon_neighbor_hack_control",
        type: "dungeon",
        text: `你的手指在键盘上飞快跳动，将最高管理员权限修改为你的生物波段。<br>屏幕上的红光变成了顺从的绿光。<br><br>机械臂缓缓退开，但并没有停止运作，而是静静地悬浮在空中，等待你的指令。<br>王美兰迷离地睁开眼，她的瞳孔深处闪过一丝数据流的光芒。她看着你，不再是看邻家晚辈的眼神，而是一种...<span style="color:#ff0055">对主人的敬畏</span>。<br><br>“指令...确认。”她低声呢喃。`,
        choices: [
            {
                text: "享受这份支配感",
                nextScene: "dungeon_neighbor_end_control"
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
        text: `当你再次睁开眼，熟悉的卧室天花板映入眼帘。窗外阳光正好，仿佛刚才的黑暗只是一场噩梦。<br>但你手中的触感告诉你，一切都是真的。<br><br>手机震动了一下。是王美兰发来的短信。`,
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
        text: `你点亮屏幕。<br><br>`,
        onEnter: (state) => {
            // 动态生成文本
            const el = document.querySelector('#story-text p');
            if (state.flags["neighbor_controlled"]) {
                el.innerHTML += `<span style="color:#ff0055">发件人：王美兰</span><br>“主人，身体已恢复。今晚...需要我过来服侍您吗？门没锁。”<br><br>字里行间透着一股卑微与顺从。`;
            } else {
                el.innerHTML += `<span style="color:#00f3ff">发件人：王阿姨</span><br>“林阳...今晚来阿姨家吃饭吧。做了你爱吃的红烧肉。还有...关于刚才的事，我想当面谢谢你。”<br><br>短信似乎带着一丝暧昧的温度。`;
            }
        },
        choices: [
            {
                text: "回复：知道了",
                nextScene: "reality_choice_evening"
            },
            {
                text: "不回复 (冷处理)",
                nextScene: "reality_choice_evening"
            }
        ]
    },
    "reality_choice_evening": {
        id: "reality_choice_evening",
        type: "reality",
        text: `放下手机，你感到一阵深深的疲惫，但体内却涌动着前所未有的力量。<br>你走到窗前，看着楼下熙熙攘攘的人群。他们不知道，这个世界已经变了。<br><br>突然，你的直觉疯狂预警。一股血腥味似乎穿透了空间。<br>是苏晓晓。`,
        choices: [
            {
                text: "主动出击，寻找苏晓晓",
                nextScene: "prologue_next_mission"
            }
        ]
    },
    "prologue_next_mission": {
        id: "prologue_next_mission",
        type: "system",
        text: `[系统警报]<br>目标编号002：【苏晓晓】<br>地点：城南高中<br>状态：<span style="color:red">人格解离中</span><br><br>任务目标：压制暴走的"白狼"人格。<br>提示：常规劝说已无效，建议采取极端手段。`,
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
        text: `你站在学校走廊里。墙壁上涂满了鲜红的油漆——不，那是血。<br>空气中弥漫着一股甜腻的铁锈味。<br>远处传来一声凄厉的惨叫，随后是重物落地的声音。<br><br>“林阳哥哥...”<br>一个幽幽的声音从你身后传来。你猛地回头，却空无一人。<br>“你终于来找晓晓了吗？嘻嘻...”`,
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
