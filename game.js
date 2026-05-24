import { longformPlan } from "./story-plan.js";

const assets = {
  backgrounds: {
    throne: "./assets/backgrounds/throne_hall.png",
    bed: "./assets/backgrounds/bedchamber.png",
    council: "./assets/backgrounds/council_chamber.png",
    entrance: "./assets/backgrounds/forbidden_entrance.png",
    library: "./assets/backgrounds/forbidden_library.png",
  },
  characters: {
    cat: {
      guarded: "./assets/characters/cat_guarded.png",
      angry: "./assets/characters/cat_angry.png",
      soft: "./assets/characters/cat_soft.png",
    },
    antalia: {
      guarded: "./assets/characters/antalia_guarded.png",
      angry: "./assets/characters/antalia_angry.png",
      soft: "./assets/characters/antalia_soft.png",
    },
    cedric: {
      neutral: "./assets/characters/cedric_neutral.png",
      stern: "./assets/characters/cedric_stern.png",
      soft: "./assets/characters/cedric_soft.png",
    },
    general: {
      proud: "./assets/characters/general_proud.png",
      stern: "./assets/characters/general_stern.png",
      uneasy: "./assets/characters/general_uneasy.png",
    },
    minister: {
      smile: "./assets/characters/minister_smile.png",
      offended: "./assets/characters/minister_offended.png",
      nervous: "./assets/characters/minister_nervous.png",
    },
    scribe: {
      gentle: "./assets/characters/scribe_gentle.png",
      warning: "./assets/characters/scribe_warning.png",
      tired: "./assets/characters/scribe_tired.png",
    },
    maid: {
      polite: "./assets/characters/maid_polite.png",
      concerned: "./assets/characters/maid_concerned.png",
      surprised: "./assets/characters/maid_surprised.png",
    },
    servant: {
      neutral: "./assets/characters/servant_neutral.png",
      startled: "./assets/characters/servant_startled.png",
      ashamed: "./assets/characters/servant_ashamed.png",
    },
  },
  cg: {
    catIntro: "./assets/cg/antalia_cat_intro.png",
    throneGift: "./assets/cg/throne_gift.png",
    softOrder: "./assets/cg/soft_order.png",
    openCage: "./assets/cg/open_cage.png",
    morningBreakfast: "./assets/cg/morning_breakfast.png",
    saveCat: "./assets/cg/save_the_cat.png",
    councilSignal: "./assets/cg/council_map_signal.png",
    eveningFable: "./assets/cg/evening_fable.png",
    moonCorridor: "./assets/cg/moon_corridor.png",
    humanReveal: "./assets/cg/antalia_human_reveal.png",
    librarySpellbook: "./assets/cg/library_spellbook.png",
    libraryConfrontation: "./assets/cg/library_confrontation.png",
    truceLibrary: "./assets/cg/truce_library.png",
    refugeeCamp: "./assets/cg/refugee_camp.png",
    archiveLedger: "./assets/cg/archive_ledger.png",
    oldCapitalRuins: "./assets/cg/old_capital_ruins.png",
    altarMemory: "./assets/cg/altar_memory.png",
    palaceCoup: "./assets/cg/palace_coup.png",
    infirmaryAftermath: "./assets/cg/infirmary_aftermath.png",
    finalRitual: "./assets/cg/final_ritual.png",
    sunriseEnding: "./assets/cg/sunrise_ending.png",
  },
  music: {
    goldberg: "./assets/music/goldberg_aria.ogg",
    gymnopedie: "./assets/music/gymnopedie_no1.ogg",
    toccata: "./assets/music/toccata_bwv565.ogg",
  },
};

const initialStats = {
  closeness: 0,
  vigilance: 0,
  observation: 0,
};

const story = {
  start: {
    chapter: "序章",
    bg: "throne",
    speaker: "旁白",
    text: "圣历一七四年，灭国战争结束后的第三十日。王城广场上，三十七名猫族俘虏跪在雪里。",
    next: "general_gift",
  },
  general_gift: {
    speaker: "大将军",
    text: "陛下，军中已经架好刑台。只等您一句话，猫族残部今夜就会闭嘴。",
    next: "throne_gift_cg",
  },
  throne_gift_cg: {
    cg: "throneGift",
    cgMotion: "throneGift",
    speaker: "旁白",
    text: "与此同时，金丝笼被抬上台阶。笼里那只布偶猫没有缩成一团，只隔着栏杆看向王座。",
    next: "cat_intro_cg",
  },
  cat_intro_cg: {
    cg: "catIntro",
    cgMotion: "catIntro",
    speaker: "旁白",
    text: "她的前爪压着一枚烧黑的王印。那是猫族王室才有的印记，也是改写战报的证物。",
    next: "cat_reveal",
  },
  cat_reveal: {
    sprite: "cat",
    speaker: "旁白",
    text: "满殿臣子只看见一只猫。塞德里克却看见她把王印往身下藏了半寸。",
    next: "cedric_first_line",
  },
  cedric_first_line: {
    speaker: "塞德里克",
    text: "笼子留下。广场那边，先不许落刀。",
    next: "inner_observe",
  },
  inner_observe: {
    speaker: "塞德里克",
    text: "这句话一出口，我就听见甲胄摩擦。将军不满，大臣松气，笼里的猫抬了眼。",
    next: "opening_image",
  },
  opening_image: {
    speaker: "旁白",
    text: "塞德里克坐在王座上。年轻国王的每一次犹豫，都会被人记成软弱。",
    next: "cedric_mask",
  },
  cedric_mask: {
    speaker: "塞德里克",
    text: "可那枚王印若是真的，广场上跪着的人就是证人。",
    next: "minister_execute",
  },
  minister_execute: {
    speaker: "大臣",
    text: "陛下，拖延会乱军心。百姓要看王室的刀，没人会信一只猫叼来的破印。",
    next: "theme_stated",
  },
  theme_stated: {
    speaker: "老书记官",
    text: "陛下，刀落得快，真相也死得快。先王当年最怕的，正是活人开口。",
    next: "cedric_lie",
  },
  cedric_lie: {
    speaker: "塞德里克",
    text: "我十六岁学会一件事：王不能只做好人。好人会被拖下王座。",
    next: "spare_prisoners",
  },
  spare_prisoners: {
    speaker: "塞德里克",
    text: "但王若只会杀人，就永远只能听死人替自己作证。",
    next: "spare_prisoners_reason",
  },
  spare_prisoners_reason: {
    speaker: "塞德里克",
    text: "广场上的鼓声越来越急。所有人都在等我选一边。",
    next: "court_reacts",
  },
  court_reacts: {
    speaker: "旁白",
    text: "笼中的猫把爪子按在王印上。她知道，自己也在这道选择里。",
    next: "injured_paw",
  },
  injured_paw: {
    speaker: "旁白",
    text: "如果他准许处决，她会失去最后的证人。如果他拦下刀，他会失去军心。",
    next: "soft_order",
  },
  soft_order: {
    speaker: "塞德里克",
    text: "把军令拿来。现在。",
    next: "soft_order_cg",
  },
  soft_order_cg: {
    cg: "softOrder",
    cgMotion: "softOrder",
    speaker: "旁白",
    text: "侍女换下沾血软垫时，军令也被呈到王座前。朱砂还没干，像一滴没落下的血。",
    next: "mask_cost",
  },
  mask_cost: {
    speaker: "旁白",
    text: "此刻，玩家替塞德里克握住军令。落笔能稳住刀锋，停笔能保住活口。",
    next: "mask_cost_b",
  },
  mask_cost_b: {
    speaker: "旁白",
    text: "他要她信自己，可王座后面站着一支等着血的军队。",
    next: "choice_throne",
  },
  choice_throne: {
    choices: [
      {
        label: "斩袭营者",
        hint: "先稳军心",
        effects: { vigilance: 2, closeness: -1 },
        flags: { harshOpening: true },
        next: "opening_execute",
      },
      {
        label: "扣军令",
        hint: "保住证人",
        effects: { observation: 1, closeness: 1 },
        flags: { sparedWitnesses: true },
        next: "opening_delay",
      },
    ],
  },
  opening_execute: {
    speaker: "塞德里克",
    text: "只准处决持刀袭营者。其余人押回北门营地，谁私自动刀，连坐。",
    next: "opening_execute_cost",
  },
  opening_execute_cost: {
    speaker: "旁白",
    text: "将军得到了血，大臣失去了借口。笼中的猫却缓缓收回爪子，蓝眼睛冷了下去。",
    next: "opening_execute_mark",
  },
  opening_execute_mark: {
    speaker: "旁白",
    text: "她把王印压回身下，像把最后一点求救也藏了起来。",
    next: "bedroom_night",
  },
  opening_delay: {
    speaker: "塞德里克",
    text: "军令扣下。三日内重审俘虏。谁急着让他们闭嘴，谁就先来见朕。",
    next: "observed_light",
  },
  observed_light: {
    speaker: "旁白",
    text: "殿中一片死寂。笼中的猫盯着他，像终于确认这个敌人还没完全烂透。",
    next: "opening_delay_mark",
  },
  opening_delay_mark: {
    speaker: "旁白",
    text: "将军按住剑柄。塞德里克看见了，也知道这份安静会在夜里反扑。",
    next: "bedroom_night",
  },
  bedroom_night: {
    chapter: "序章",
    bg: "bed",
    sprite: "cat",
    cg: "openCage",
    cgMotion: "openCage",
    speaker: "旁白",
    text: "当夜，金丝笼被摆在国王寝宫一角。按照惯例，兽族战俘应当关在笼中，但塞德里克下令打开了笼门。",
    next: "bedroom_call",
  },
  bedroom_call: {
    speaker: "塞德里克",
    text: "出来。门已经开了，别逼我像个无聊的暴君一样对一只猫宣布恩典。我不喜欢笼中鸟，也不喜欢把自己寝宫弄得像战俘营。",
    next: "cat_out",
  },
  cat_out: {
    speaker: "旁白",
    text: "猫从笼中慢慢走出，每一步都带着戒备。她在壁炉前蜷成一团，尾巴盖住鼻子。",
    next: "cat_understands",
  },
  cat_understands: {
    speaker: "塞德里克",
    text: "你听得懂，对吧？刚才我说“军令”时，你先看广场。",
    next: "ear_twitch",
  },
  ear_twitch: {
    speaker: "旁白",
    text: "猫的耳朵猛地动了一下。壁炉火光映在她眼底，像两颗压住怒意的宝石。",
    next: "bedroom_end",
  },
  bedroom_end: {
    speaker: "塞德里克",
    text: "想咬死我可以排队。宫里想做这件事的人不少，你未必排得上第一。",
    next: "night_scratch",
  },
  night_scratch: {
    speaker: "旁白",
    text: "几秒后，黑暗中传来极轻的脚步声。她没有慌乱冲向门口，每一步落下前都先试探地砖的重量。",
    next: "cedric_awake",
  },
  cedric_awake: {
    speaker: "塞德里克",
    text: "我没有睁眼。猎物若以为猎人睡着，才会露出真正的路线。",
    next: "cat_checks_door",
  },
  cat_checks_door: {
    speaker: "旁白",
    text: "她绕开门口，先到了书桌前。爪子拨开一卷边境地图，停在猫族旧王都的位置。",
    next: "cedric_wound",
  },
  cedric_wound: {
    speaker: "塞德里克",
    text: "那座城的火，账不该全算在我头上。至少，那夜有几份战报被人改得太干净。",
    next: "ring_memory",
  },
  ring_memory: {
    speaker: "旁白",
    text: "他指尖碰到枕下的旧银戒。那是先王留下的遗物，也是他至今不愿给任何人看的弱点。王冠太重，重到每个人都默认他没有伤口。",
    next: "cat_returns",
  },
  cat_returns: {
    speaker: "旁白",
    text: "天亮前，她无声地回到床边。没有偷走地图，也没有碰那枚戒指，只在桌角留下一缕浅杏色长毛。",
    next: "morning",
  },
  morning: {
    chapter: "第一章",
    bg: "bed",
    sprite: "cat",
    speaker: "旁白",
    text: "晨光洒入寝宫。塞德里克醒来时，烧黑的王印被放在他枕边。",
    next: "morning_line",
  },
  morning_line: {
    speaker: "塞德里克",
    text: "你把证据递给我，是想合作，还是想看我怎么死？",
    next: "morning_paw",
  },
  morning_paw: {
    speaker: "旁白",
    text: "猫趴在床尾，前爪压着绷带。她没有叫，只把尾巴挡在王印前。",
    next: "breakfast_cg",
  },
  breakfast_cg: {
    cg: "morningBreakfast",
    cgMotion: "morningBreakfast",
    speaker: "旁白",
    text: "晨光落在银盘和白瓷碗上，鱼汤的热气慢慢升起。寝宫里第一次像一个可以吃早饭的地方，冷硬的囚室气味淡了下去。",
    next: "breakfast_arrives",
  },
  breakfast_arrives: {
    speaker: "侍女",
    text: "陛下，早膳送到。外间还有大臣候着，说广场处置不能再拖。",
    next: "cat_surprised",
  },
  cat_surprised: {
    speaker: "旁白",
    text: "安塔莉亚的耳尖动了一下。她听见广场两个字，爪尖几乎刺进床单。",
    next: "cedric_excuse",
  },
  cedric_excuse: {
    speaker: "塞德里克",
    text: "你现在有两个危险。外面的人想杀证人，里面的人想确认你是否就是证据。",
    next: "cedric_excuse_b",
  },
  cedric_excuse_b: {
    speaker: "塞德里克",
    text: "而我，偏偏也需要知道。",
    next: "cat_first_soften",
  },
  cat_first_soften: {
    speaker: "旁白",
    text: "她没有退。蓝眼睛死死盯着他，像在等一把刀落下来。",
    next: "choice_morning",
  },
  choice_morning: {
    choices: [
      {
        label: "逼她现形",
        hint: "抢占主动",
        effects: { vigilance: 2, observation: 1, closeness: -1 },
        next: "touch_cat",
      },
      {
        label: "装作不知",
        hint: "先保住她",
        effects: { closeness: 1, vigilance: -1, observation: -1 },
        flags: { cold: true },
        next: "ignore_cat",
      },
      {
        label: "设铃试探",
        hint: "逼出反应",
        effects: { vigilance: 1, observation: 2, closeness: -1 },
        flags: { teaser: true },
        next: "teaser_cat",
      },
    ],
  },
  touch_cat: {
    speaker: "旁白",
    text: "塞德里克伸手去拿王印。猫猛地扑上来，牙尖停在他手腕前一寸。",
    next: "touch_cat_cost",
  },
  touch_cat_cost: {
    speaker: "旁白",
    text: "她没有咬下去，却也没有退。那一寸距离，比真正的伤口更难处理。",
    next: "breakfast_result",
  },
  ignore_cat: {
    speaker: "旁白",
    text: "他把王印压进书页，像什么都没看见。猫的尾巴慢慢松开，却没有移开视线。",
    next: "ignore_cat_cost",
  },
  ignore_cat_cost: {
    speaker: "旁白",
    text: "这份沉默暂时护住了她，也把塞德里克挡在真相门外。",
    next: "breakfast_result",
  },
  teaser_cat: {
    speaker: "旁白",
    text: "他把银铃放到王印旁。铃舌刻着猫族旧王都的纹样，绝不该出现在这里。",
    next: "teaser_line",
  },
  teaser_line: {
    speaker: "塞德里克",
    text: "你认得它。很好。现在我们都握着对方的把柄了。",
    next: "teaser_cost",
  },
  teaser_cost: {
    speaker: "旁白",
    text: "安塔莉亚把银铃推回去。动作很轻，拒绝却锋利得像一枚小刀。",
    next: "breakfast_result",
  },
  breakfast_result: {
    speaker: "旁白",
    text: "早膳冷了。门外的大臣还在催。屋内一人一猫，都知道沉默撑不了太久。",
    next: "save_the_cat",
  },
  save_the_cat: {
    cg: "saveCat",
    cgMotion: "saveCat",
    speaker: "旁白",
    text: "午后，王宫花园传来侍从的呵斥。一只从战俘营跑来的灰白小猫被逼到喷泉边，浑身湿透，爪子还勾着半块发硬的面包。",
    next: "servant_raise_hand",
  },
  servant_raise_hand: {
    speaker: "侍从",
    text: "陛下，这种野东西会弄脏花园。它还从战俘营偷了面包，若让管事看见，属下也要挨罚。属下这就把它带走，绝不会让它再惊扰您。",
    next: "cedric_save_cat",
  },
  cedric_save_cat: {
    speaker: "塞德里克",
    text: "处理？北门营地今天缺一个会抓老鼠的。把它擦干，送过去。",
    next: "cedric_save_cat_b",
  },
  cedric_save_cat_b: {
    speaker: "塞德里克",
    text: "再让厨房多煮一锅鱼汤。若有人问起，告诉他，朕讨厌浪费能活下来的东西。",
    next: "antalia_watches",
  },
  antalia_watches: {
    speaker: "旁白",
    text: "安塔莉亚站在窗台阴影里看着这一幕。她明明还是猫的模样，眼神却像一个失去国家的人，第一次看见敌人没有踩碎一件小小的东西。",
    next: "cedric_need",
  },
  cedric_need: {
    speaker: "塞德里克",
    text: "我不救猫。我只是不喜欢无意义的损耗。",
    next: "antalia_silent_answer",
  },
  antalia_silent_answer: {
    speaker: "旁白",
    text: "她没有拆穿他，只在经过他脚边时，用尾巴尖很轻地扫了一下他的靴面。像一句不情愿的：我看见了。",
    next: "council",
  },
  council: {
    chapter: "第一章",
    bg: "council",
    sprite: "cat",
    speaker: "旁白",
    text: "议事厅里，大臣们为边境粮草争吵不休。塞德里克坐在主位，一只手撑着下巴，另一只手放在膝盖上。",
    next: "minister_cat",
  },
  minister_cat: {
    speaker: "大臣",
    text: "陛下！议事厅乃国政重地，带着兽族玩物入席，外臣若听见，只会以为我国朝纲散乱。边境刚平，礼法更不能先乱。",
    next: "quiet_reply",
  },
  quiet_reply: {
    speaker: "塞德里克",
    text: "她比你们安静多了。至少她不会把同一句“有失体统”换三种说法再讲一遍。继续，粮草的账还没算完。",
    next: "cat_pat",
  },
  cat_pat: {
    speaker: "旁白",
    text: "猫似乎听懂了，尾巴轻轻拍了一下塞德里克的手背，然后闭上眼睛继续睡。",
    next: "council_info",
  },
  council_info: {
    speaker: "塞德里克",
    text: "这个动作不像猫会做的。更像是一个不耐烦的女孩子，在用肢体语言表达：闭嘴。",
    next: "grain_case",
  },
  grain_case: {
    speaker: "大臣",
    text: "北境雪灾，粮草告急。若要救民，就得从南境抽粮；可南境刚被战火掏空。",
    next: "grain_case_b",
  },
  grain_case_b: {
    speaker: "大臣",
    text: "再抽一次，地方贵族会借题发难。陛下，无论拨不拨粮，都有人等着把罪名写到您头上。",
    next: "cedric_hard_choice",
  },
  cedric_hard_choice: {
    speaker: "旁白",
    text: "这是王最熟悉的题。无论选哪边，都有人会死；无论怎么解释，史书只会留下一句轻飘飘的昏聩或残忍。",
    next: "cat_map_signal",
  },
  cat_map_signal: {
    cg: "councilSignal",
    cgMotion: "councilSignal",
    speaker: "旁白",
    text: "膝上的猫忽然伸爪，按住地图上一条废弃水道。那条水道通向猫族旧仓，战报里说那里已经被烧成灰烬。",
    next: "cedric_reads_signal",
  },
  cedric_reads_signal: {
    speaker: "塞德里克",
    text: "北境军走水道。若旧仓还有粮，先救三座城；若没有，就把水道改成撤民路线。",
    next: "cedric_reads_signal_b",
  },
  cedric_reads_signal_b: {
    speaker: "塞德里克",
    text: "传令的人别提这只猫。写成朕临时想起的旧战图，省得你们又争爪印合不合礼法。",
    next: "minister_mock",
  },
  minister_mock: {
    speaker: "大臣",
    text: "陛下，这是那只猫碰出来的位置，怎能当真？朝堂决策若靠一只猫的爪子，史官明日就敢把臣等写成笑话。",
    next: "cedric_public_shield",
  },
  cedric_public_shield: {
    speaker: "塞德里克",
    text: "所以功劳归我，错也归我。你们若连一条废水道都不敢查，明日就把官印交给她，至少她找位置比你们吵架快。",
    next: "cat_reaction_council",
  },
  cat_reaction_council: {
    speaker: "旁白",
    text: "满厅寂静里，安塔莉亚低下头，假装自己只是在舔爪。但塞德里克感觉到，她的尾巴没有再离开他的手背。",
    next: "after_council",
  },
  after_council: {
    speaker: "旁白",
    text: "散朝后，塞德里克独自回到寝宫。猫跟在三步之外，始终保持着能逃跑、也能听见他说话的距离。",
    next: "cedric_confesses_little",
  },
  cedric_confesses_little: {
    speaker: "塞德里克",
    text: "我十五岁时，也被人关在这座宫殿里。我的笼子铺着红毯，门口站着礼官，外面的人见了还要下跪。可笼子大一点，并不会让夜里更暖。",
    next: "cat_listens",
  },
  cat_listens: {
    speaker: "旁白",
    text: "她停住脚步。信任还远，同情也谈不上。可她听懂了笼子的形状，听懂了他为何把话说得那么轻。",
    next: "false_victory",
  },
  false_victory: {
    speaker: "旁白",
    text: "傍晚，北境传来急报：水道确有旧仓，粮草足够三城撑过七日。朝臣赞颂国王英明，没人知道那是猫族公主给出的路。",
    next: "cedric_reward",
  },
  cedric_reward: {
    speaker: "塞德里克",
    text: "今晚的鱼汤多放一份。理由？朕今日心情好。谁若问这份赏赐给谁，就说给那张旧地图，毕竟它比某些活人有用。",
    next: "antalia_almost_purr",
  },
  antalia_almost_purr: {
    speaker: "旁白",
    text: "猫埋头喝汤，喉间差点滚出一声轻微的呼噜。她猛地停住，羞恼地抬眼看他，像是在警告他不准听见。",
    next: "evening_book",
  },
  evening_book: {
    speaker: "旁白",
    text: "入夜前，塞德里克在书桌上摊开一本旧童话。那是王宫里少数没有被战争和政务染脏的东西，纸页边缘已经被翻得发软。",
    next: "cedric_reads_fable",
  },
  cedric_reads_fable: {
    cg: "eveningFable",
    cgMotion: "eveningFable",
    speaker: "塞德里克",
    text: "故事里说，月亮把迷路的猫藏进国王的袖子里。国王起初以为自己捡到宝物。",
    next: "cedric_reads_fable_b",
  },
  cedric_reads_fable_b: {
    speaker: "塞德里克",
    text: "后来他才明白，那只猫每天夜里都在替他赶走噩梦。小孩子才信这种结尾。",
    next: "cedric_reads_fable_c",
  },
  cedric_reads_fable_c: {
    speaker: "塞德里克",
    text: "不过老书记官念的时候，我每次都装睡。",
    next: "cat_pretends_sleep",
  },
  cat_pretends_sleep: {
    speaker: "旁白",
    text: "窗台上的猫闭着眼，尾巴却一下比一下慢地晃。她显然在听，又坚决不肯承认自己在听。",
    next: "cedric_tutor_memory",
  },
  cedric_tutor_memory: {
    speaker: "塞德里克",
    text: "老书记官以前也给我念过这段。他说人会把害怕失去的东西叫作所有物，这样失去时就能假装只是财产损坏。",
    next: "antalia_opens_eye",
  },
  antalia_opens_eye: {
    speaker: "旁白",
    text: "安塔莉亚睁开一只眼。那一眼没有温柔，却有判断。她在判断这个国王说这些话，是诱饵，是忏悔，还是他自己也不懂的求救。",
    next: "cedric_not_ready",
  },
  cedric_not_ready: {
    speaker: "塞德里克",
    text: "别这样看我。我还没高尚到能放你走。可我也没低劣到要靠一把锁证明你属于我。今晚先这样，半步也算进步。",
    next: "quiet_bond",
  },
  quiet_bond: {
    speaker: "旁白",
    text: "她轻轻跳下窗台，绕开他的手，最后选在离书桌半步远的地毯上蜷下。原谅还没有来，今晚她暂时不走。",
    next: "moon",
  },
  moon: {
    chapter: "月圆之夜",
    bg: "entrance",
    sprite: null,
    speaker: "旁白",
    text: "月圆之夜，猫窝里只剩一团被精心整理过的毯子。塞德里克放下酒杯，身形无声地没入走廊阴影。",
    next: "debate_follow",
  },
  debate_follow: {
    cg: "moonCorridor",
    cgMotion: "moonCorridor",
    speaker: "塞德里克",
    text: "我本可以叫卫兵，封死密道，再让宫廷法师把每一块石砖刻上禁制。",
    next: "debate_follow_b",
  },
  debate_follow_b: {
    speaker: "塞德里克",
    text: "那样很省事，我也很擅长省事。可她若明天继续装睡，我大概会觉得自己赢得很难看。",
    next: "arc_choice_private",
  },
  arc_choice_private: {
    speaker: "塞德里克",
    text: "我想起老书记官那句讨厌的话。锁能关门，关不住人愿不愿意回头。至少今晚，我想看看她究竟要去哪，也看看我有没有胆量不先伸手抓住她。",
    next: "magic_wall",
  },
  magic_wall: {
    speaker: "旁白",
    text: "王宫深处的死胡同前，幽蓝色术式一条接一条熄灭。月光照在猫的身上，然后皮毛褪去，少女的身影缓缓成形。",
    next: "human_reveal_cg",
  },
  human_reveal_cg: {
    cg: "humanReveal",
    cgMotion: "humanReveal",
    speaker: "旁白",
    text: "月光像银色王冠落在她发间。塞德里克终于看见安塔莉亚真正的样子，也看见她拼命藏住的孤独与骄傲。",
    next: "human_reveal",
  },
  human_reveal: {
    sprite: "antalia",
    speaker: "旁白",
    text: "金发如瀑，蓝眼如海。她头顶竖着浅杏色猫耳，腰间垂着蓬松长尾，赤足踩在冰凉石板上。",
    next: "antalia_first",
  },
  antalia_first: {
    speaker: "安塔莉亚",
    text: "破。别抖，别停，别回头。父王说过，王室血脉记得回家的路。哪怕那条路只剩一页被人藏起来的旧书。",
    next: "antalia_goal",
  },
  antalia_goal: {
    speaker: "旁白",
    text: "那道咒没有指向王宫外墙。幽蓝色术式向内塌陷，禁书库的封印露出缝隙。一个急着逃走的人，不会先去偷一本七百年前的旧书。",
    next: "follow_library",
  },
  follow_library: {
    speaker: "塞德里克",
    text: "玩够了。",
    next: "library_inside",
  },
  library_inside: {
    chapter: "禁书库",
    bg: "library",
    sprite: "antalia",
    speaker: "旁白",
    text: "禁书库内，黑色书架与苍白长明灯围住石台。安塔莉亚背对入口，俯身阅读摊开的羊皮纸。",
    next: "library_page",
  },
  library_page: {
    speaker: "旁白",
    text: "羊皮纸上画着一枚被剖开的月轮。旁边的古语被她用指尖一行行描过：灵魂可切，记忆可封，形体可伪。",
    next: "antalia_private_goal",
  },
  antalia_private_goal: {
    cg: "librarySpellbook",
    cgMotion: "librarySpellbook",
    speaker: "安塔莉亚",
    text: "父王说过，王室血脉不会无故退化。我醒来时只剩猫的身体，记忆像被剪断的线。",
    next: "antalia_private_goal_b",
  },
  antalia_private_goal_b: {
    speaker: "安塔莉亚",
    text: "若我找不到术式源头，就只能听别人用笼子、项圈和食盆定义我是谁。",
    next: "cedric_hears_name",
  },
  cedric_hears_name: {
    speaker: "旁白",
    text: "她说“父王”时，声音几乎碎在喉咙里。公主的骄傲撑着她站直，女儿的痛却从每个字缝里漏出来。",
    next: "cedric_memory_of_report",
  },
  cedric_memory_of_report: {
    speaker: "塞德里克",
    text: "战报里写的是猫族王族死于宫廷自焚。可自焚的宫殿不会把术式痕迹擦得那么干净。",
    next: "cedric_can_use_her",
  },
  cedric_can_use_her: {
    speaker: "塞德里克",
    text: "如果她真能解开灵魂切割术，我就能拿到先王战争的证据，也能把朝堂上那些老狐狸从暗处逼出来。",
    next: "cedric_catches_self",
  },
  cedric_catches_self: {
    speaker: "旁白",
    text: "他本该只想到利用。可看见她赤足站在寒冷石地上，指节因为翻书太久而发白，他忽然觉得这念头有些刺耳。",
    next: "caught",
  },
  caught: {
    cg: "libraryConfrontation",
    cgMotion: "libraryConfrontation",
    speaker: "塞德里克",
    text: "三年来，你每天晚上从我的床上爬起来，变成人，光着脚走到这里。",
    next: "caught_b",
  },
  caught_b: {
    speaker: "塞德里克",
    text: "就为了偷看一本七百年前的旧书？路线倒是谨慎，偏偏忘了石地会留下水痕。",
    next: "antalia_startled",
  },
  antalia_startled: {
    speaker: "旁白",
    text: "安塔莉亚猛地回身。猫耳完全竖起，尾巴炸开，蓝眼睛缩成细线。她先扫过他的手，确认那里没有刀，再看向门。",
    next: "cedric_no_guards",
  },
  cedric_no_guards: {
    speaker: "塞德里克",
    text: "别找了。没有卫兵，没有锁链，也没有魔法师。今晚这里只有我。你若要逃，门在我身后；你若要打，我也不会喊人。",
    next: "antalia_accuse",
  },
  antalia_accuse: {
    speaker: "安塔莉亚",
    text: "所以你跟了一路，只为了欣赏战利品会说话的样子？还是想确认我除了装猫、认路和翻旧书以外，还剩多少能被你放进账本里的价值？",
    next: "cedric_answer_badly",
  },
  cedric_answer_badly: {
    speaker: "塞德里克",
    text: "都有。我可以撒谎，说自己只是担心你踩伤脚，也可以说全是为了王国。可你已经听过太多漂亮话了，我不想再拿一张新网盖住旧网。",
    next: "truth_hurts",
  },
  truth_hurts: {
    speaker: "旁白",
    text: "这句诚实比谎言更伤人。安塔莉亚抿紧嘴唇，刚刚在花园和议事厅里积攒起的一点点松动，又被迫缩回坚硬的壳里。",
    next: "cedric_learns",
  },
  cedric_learns: {
    speaker: "塞德里克",
    text: "话出口的一瞬间，我就知道自己错了。王习惯把真心藏进刀鞘里，说出口时总带着刃。",
    next: "cedric_learns_b",
  },
  cedric_learns_b: {
    speaker: "塞德里克",
    text: "可她今晚没有站在朝堂上。她只是光着脚，抱着残页，还在找家的女孩。",
    next: "teaser_reveal",
  },
  teaser_reveal: {
    speaker: "旁白",
    text: "为了不让自己显得太认真，他从身后拿出那根逗猫棒。银铃在禁书库里响起，清脆得近乎残忍。",
    next: "choice_library",
  },
  choice_library: {
    choices: [
      {
        label: "逼近一步",
        hint: "逼她先露牌",
        effects: { vigilance: 3, closeness: -1 },
        next: "pressure",
      },
      {
        label: "退开半步",
        hint: "把选择还给她",
        effects: { vigilance: -2, closeness: 2 },
        next: "step_back",
      },
      {
        label: "轻碰耳尖",
        hint: "只有足够近才做得到",
        requires: (stats) => stats.closeness >= 5 && stats.observation >= 1,
        effects: { closeness: 3, vigilance: 1 },
        next: "ear_touch",
      },
    ],
  },
  pressure: {
    speaker: "旁白",
    text: "她的尾巴炸成一团，蓝眼睛里翻起尖锐的敌意。你得到了答案，也把门关得更紧了一些。",
    next: "truth_hint",
  },
  step_back: {
    speaker: "塞德里克",
    text: "行了，不逗你了。刚才那句话很难听，我知道。你可以继续讨厌我，但别因为我嘴硬，就把能救你的线索一起扔掉。",
    next: "ask_discovered",
  },
  ear_touch: {
    speaker: "旁白",
    text: "指尖触到猫耳的一瞬间，她整个人僵住。下一秒，她猛地按住你的手腕，却没有真的推开。",
    next: "ask_discovered",
  },
  ask_discovered: {
    speaker: "安塔莉亚",
    text: "你什么时候发现的？别说从今晚开始。你看我的眼神早就不对，像猎人盯着陷阱，又像……算了，后半句当我没说。",
    next: "first_day",
  },
  first_day: {
    speaker: "塞德里克",
    text: "第一天。普通猫被挠下巴会舒服得眯眼睛，你却先缩瞳孔，再放松。那是有意识地在控制自己的反应。",
    next: "truth_hint",
  },
  truth_hint: {
    speaker: "塞德里克",
    text: "灵魂切割术。你查这个，是为了找猫族覆灭的真相？如果这东西也牵到我父王留下的旧案，我们就都没有退路了。",
    next: "same_goal",
  },
  same_goal: {
    speaker: "塞德里克",
    text: "你有没有想过，我留着你的命，也许不只出于占有欲。你要找夺走身体的人，我要找篡改战报的人。两条路撞在一起，总比各自撞墙强。",
    next: "chapter_end",
  },
  chapter_end: {
    speaker: "旁白",
    text: "长明灯的火光跳了一下。羊皮纸右下角的小字一闪而过：施术者亦可自我切割。",
    next: "ch2_dawn",
  },
  ch2_dawn: {
    chapter: "第二章",
    bg: "library",
    sprite: "antalia",
    cg: "truceLibrary",
    cgMotion: "librarySpellbook",
    speaker: "旁白",
    text: "天快亮时，两人还坐在禁书库里。桌上只有一页残卷，一盏冷灯，还有一场谁都不肯先服软的沉默。",
    next: "ch2_cedric_apology",
  },
  ch2_cedric_apology: {
    speaker: "塞德里克",
    text: "昨晚那句“都有”，我收回一半。利用是真的。担心也是真的。我说得太像审讯。",
    next: "ch2_antalia_boundary",
  },
  ch2_antalia_boundary: {
    speaker: "安塔莉亚",
    text: "我不需要你把话修得好听。你要用我，就明说。你要帮我，也别装成施舍。",
    next: "ch2_terms",
  },
  ch2_terms: {
    speaker: "塞德里克",
    text: "那就立约。你查灵魂切割术，我查战报。证据共享，行动同路。谁先藏刀，谁先退出。",
    next: "ch2_antalia_terms",
  },
  ch2_antalia_terms: {
    speaker: "安塔莉亚",
    text: "再加一条。猫族俘虏归我查问。你的人不准逼供，不准拿他们当筹码。",
    next: "ch2_cedric_terms",
  },
  ch2_cedric_terms: {
    speaker: "塞德里克",
    text: "可以。你也答应我，今晚之后别再光脚踩石地。王室血脉冻病了，很难写进盟约。",
    next: "ch2_first_smile",
  },
  ch2_first_smile: {
    speaker: "旁白",
    text: "安塔莉亚盯了他一会儿。她没有笑，只是把尾巴从椅脚边收了回来。那已经很接近让步。",
    next: "choice_truce",
  },
  choice_truce: {
    choices: [
      {
        label: "写下契约",
        hint: "把话写死",
        effects: { vigilance: -1, observation: 1 },
        flags: { formalPact: true },
        next: "ch2_write_pact",
      },
      {
        label: "伸手言和",
        hint: "先给温度",
        effects: { closeness: 2 },
        flags: { warmPact: true },
        next: "ch2_handshake",
      },
    ],
  },
  ch2_write_pact: {
    speaker: "旁白",
    text: "他们把盟约写在残卷背面。字迹并不漂亮，却每一条都清楚。安塔莉亚收下了那页纸。",
    next: "ch2_morning_camp",
  },
  ch2_handshake: {
    speaker: "旁白",
    text: "塞德里克伸出手。安塔莉亚迟疑片刻，指尖碰上去，又很快撤开。她的耳尖红得很明显。",
    next: "ch2_morning_camp",
  },
  ch2_morning_camp: {
    bg: "entrance",
    cg: "refugeeCamp",
    cgMotion: "moonCorridor",
    speaker: "旁白",
    text: "清晨，他们去了北门营地。雪水和药草味混在一起。猫族俘虏看见安塔莉亚，先跪下，再哭出声。",
    next: "ch2_child",
  },
  ch2_child: {
    speaker: "旁白",
    text: "一个小女孩发着烧，怀里抱着昨夜那只灰白小猫。她看见王冠，下意识把面包藏进袖子。",
    next: "ch2_antalia_kneel",
  },
  ch2_antalia_kneel: {
    speaker: "安塔莉亚",
    text: "别跪。活下来的人不欠我跪礼。把手伸出来，我看看你烧到哪里了。",
    next: "ch2_cedric_glove",
  },
  ch2_cedric_glove: {
    speaker: "塞德里克",
    text: "药箱给她。还有，营门外的贵族车队拦住。今天谁都别来认领功劳。",
    next: "ch2_servant_report",
  },
  ch2_servant_report: {
    speaker: "侍从",
    text: "陛下，南境贵族已经在门口等了半个时辰。他们说粮车迟到，要您给说法。",
    next: "ch2_cedric_small_rule",
  },
  ch2_cedric_small_rule: {
    speaker: "塞德里克",
    text: "让他们等。这里的孩子先退烧。粮车的事，我亲自记账。",
    next: "ch2_antalia_question",
  },
  ch2_antalia_question: {
    speaker: "安塔莉亚",
    text: "你总说记账。人命在你的账里排第几？",
    next: "ch2_cedric_answer",
  },
  ch2_cedric_answer: {
    speaker: "塞德里克",
    text: "排在最前。只是很多人喜欢把自己的名字写在前面，挡住后面的人命。",
    next: "ch2_antalia_watch",
  },
  ch2_antalia_watch: {
    speaker: "旁白",
    text: "安塔莉亚没有接话。她低头喂女孩喝药，尾巴却轻轻绕过小猫，替它挡住冷风。",
    next: "ch2_child_name",
  },
  ch2_child_name: {
    speaker: "侍从",
    text: "陛下，那孩子问灰猫能不能留下。营规里没有这一条。",
    next: "ch2_antalia_rule",
  },
  ch2_antalia_rule: {
    speaker: "安塔莉亚",
    text: "那就添一条。营地里能活下来的小东西，都有名字。",
    next: "ch2_cedric_watch_rule",
  },
  ch2_cedric_watch_rule: {
    speaker: "塞德里克",
    text: "你给我的律令写得倒快。",
    next: "ch2_antalia_name_cat",
  },
  ch2_antalia_name_cat: {
    speaker: "安塔莉亚",
    text: "它叫面包。因为它为了半块面包差点被扔出去。",
    next: "ch2_cedric_nearly_laugh",
  },
  ch2_cedric_nearly_laugh: {
    speaker: "旁白",
    text: "塞德里克偏过脸，像是咳了一声。安塔莉亚看见了，却很宽容地放过他。",
    next: "ch2_future",
  },
  ch2_future: {
    speaker: "塞德里克",
    text: "若旧王都还能重建，你第一条律令也打算这么写？",
    next: "ch2_antalia_future",
  },
  ch2_antalia_future: {
    speaker: "安塔莉亚",
    text: "第一条写：不准把活物关进漂亮笼子。第二条写：国王犯错也要道歉。",
    next: "ch2_cedric_future",
  },
  ch2_cedric_future: {
    speaker: "塞德里克",
    text: "第二条很危险。会让很多国王失业。",
    next: "ch2_archive",
  },
  ch2_archive: {
    bg: "library",
    cg: "archiveLedger",
    cgMotion: "librarySpellbook",
    speaker: "旁白",
    text: "午后，老书记官带来一箱封存账册。灰尘落下时，塞德里克第一次看见先王的私印压在猫族粮单上。",
    next: "ch2_scribe_warning",
  },
  ch2_scribe_warning: {
    speaker: "老书记官",
    text: "陛下，这些账册我藏了七年。先王死前烧过一批，剩下的只够指向一个人。",
    next: "ch2_minister_name",
  },
  ch2_minister_name: {
    speaker: "塞德里克",
    text: "大臣。难怪他急着处决俘虏。活口越少，账越好改。",
    next: "ch2_antalia_memory",
  },
  ch2_antalia_memory: {
    speaker: "安塔莉亚",
    text: "我记得他的声音。王宫起火那晚，有人在父王门外说：钥匙已经换了。",
    next: "ch2_cedric_guilt",
  },
  ch2_cedric_guilt: {
    speaker: "塞德里克",
    text: "我攻城时只看见火。我以为自己来晚了。也许从一开始，就有人等我背这口锅。",
    next: "ch2_scribe_push",
  },
  ch2_scribe_push: {
    speaker: "老书记官",
    text: "真相不怕晚，怕的是你们查到一半，又用王的骄傲把门关上。",
    next: "ch2_choice_archive",
  },
  ch2_choice_archive: {
    choices: [
      {
        label: "先查账册",
        hint: "先稳证据",
        effects: { observation: 2 },
        flags: { ledgerProof: true },
        next: "ch2_check_books",
      },
      {
        label: "先问活口",
        hint: "先追活口",
        effects: { vigilance: 1 },
        flags: { witnessProof: true },
        next: "ch2_question_camp",
      },
    ],
  },
  ch2_check_books: {
    speaker: "旁白",
    text: "他们逐页核对粮印。每一笔都很小，连起来却像一条从猫族王宫拖回朝堂的血线。",
    next: "ch2_depart",
  },
  ch2_question_camp: {
    speaker: "旁白",
    text: "他们回到营地。老俘虏听见大臣的名字，手抖得连碗都拿不稳，却还是点了头。",
    next: "ch2_depart",
  },
  ch2_depart: {
    chapter: "第三章",
    bg: "entrance",
    speaker: "旁白",
    text: "第三日，塞德里克带少数护卫出城。安塔莉亚披上灰斗篷，第一次以自己的脚走向故国。",
    next: "ch3_road",
  },
  ch3_road: {
    speaker: "塞德里克",
    text: "若你想现在回头，还来得及。旧王都不会因为你迟一天去，就少疼一点。",
    next: "ch3_antalia_reply",
  },
  ch3_antalia_reply: {
    speaker: "安塔莉亚",
    text: "我怕疼。可我更怕有一天，我只记得自己怕过。",
    next: "ch3_night_camp",
  },
  ch3_night_camp: {
    speaker: "旁白",
    text: "夜里他们在废城外停下。风吹过断墙，篝火很小，小到照不亮任何人的表情。",
    next: "ch3_cedric_father",
  },
  ch3_cedric_father: {
    speaker: "塞德里克",
    text: "我父王教我第一件事，是别在别人面前哭。他说眼泪会变成把柄。",
    next: "ch3_antalia_father",
  },
  ch3_antalia_father: {
    speaker: "安塔莉亚",
    text: "我父王教我第一件事，是摔倒后先看自己痛不痛。痛就哭，哭完再站。",
    next: "ch3_cedric_envy",
  },
  ch3_cedric_envy: {
    speaker: "塞德里克",
    text: "听起来很奢侈。",
    next: "ch3_antalia_reply_soft",
  },
  ch3_antalia_reply_soft: {
    speaker: "安塔莉亚",
    text: "明天到旧王都，我可能会哭。你可以转过身，也可以递手帕。",
    next: "ch3_cedric_promise",
  },
  ch3_cedric_promise: {
    speaker: "塞德里克",
    text: "我带了两块。多的一块给面包擦爪子。",
    next: "ch3_ruins",
  },
  ch3_ruins: {
    cg: "oldCapitalRuins",
    cgMotion: "moonCorridor",
    speaker: "旁白",
    text: "旧王都只剩半截月门。风穿过焦黑的廊柱，带起一串碎铃声。安塔莉亚在祭坛前停住。",
    next: "ch3_bell",
  },
  ch3_bell: {
    speaker: "旁白",
    text: "她捡起一枚小小的银铃。铃舌已经断了，摇起来没有声音。她却像被那片安静刺中。",
    next: "ch3_antalia_memory",
  },
  ch3_antalia_memory: {
    speaker: "安塔莉亚",
    text: "这是我弟弟的。他总把铃系在尾巴上，跑过走廊时吵得人头痛。",
    next: "ch3_cedric_space",
  },
  ch3_cedric_space: {
    speaker: "旁白",
    text: "塞德里克停在三步之外。他没有安慰，也没有碰她。安塔莉亚终于允许自己哭了一会儿。",
    next: "ch3_general_arrive",
  },
  ch3_general_arrive: {
    speaker: "大将军",
    text: "陛下，废墟东侧发现地下门。臣当年攻城时没有见过那条路。",
    next: "ch3_antalia_anger",
  },
  ch3_antalia_anger: {
    speaker: "安塔莉亚",
    text: "你当然没有见过。那是王族逃生道。知道它的人，本该都在这里死了。",
    next: "ch3_general_guilt",
  },
  ch3_general_guilt: {
    speaker: "大将军",
    text: "臣攻下城门时，内宫已经起火。若臣当日多追一步，也许还能救人。",
    next: "ch3_cedric_stop",
  },
  ch3_cedric_stop: {
    speaker: "塞德里克",
    text: "悔罪留到查完再说。她现在需要路，不需要第二个男人在废墟里谈自己有多痛。",
    next: "ch3_antalia_look",
  },
  ch3_antalia_look: {
    speaker: "旁白",
    text: "安塔莉亚抬头看了他一眼。这次她没有反驳。风把她的发尾吹到他披风上，又很快分开。",
    next: "ch3_altar",
  },
  ch3_altar: {
    cg: "altarMemory",
    cgMotion: "humanReveal",
    speaker: "旁白",
    text: "地下祭坛亮起时，月石映出一段残影。先王倒在阵中，大臣的手按着王印，念完最后一句咒。",
    next: "ch3_memory_voice",
  },
  ch3_memory_voice: {
    speaker: "大臣",
    text: "王族血脉可分，王国也可分。猫族的身，给新王做锁；猫族的魂，替旧王续命。",
    next: "ch3_antalia_break",
  },
  ch3_antalia_break: {
    speaker: "安塔莉亚",
    text: "他把我变成猫，为了把我带到你身边。你一直在替他看守钥匙。",
    next: "ch3_cedric_recoil",
  },
  ch3_cedric_recoil: {
    speaker: "塞德里克",
    text: "我戴了三年的王冠，原来只是他留给大臣的一把锁。",
    next: "ch3_choice_altar",
  },
  ch3_choice_altar: {
    choices: [
      {
        label: "追回火光",
        hint: "立刻回宫",
        effects: { vigilance: 2 },
        flags: { urgentReturn: true },
        next: "ch3_return_now",
      },
      {
        label: "护住她",
        hint: "先接住她",
        effects: { closeness: 2 },
        flags: { heldGrief: true },
        next: "ch3_hold_grief",
      },
      {
        label: "问清铃声",
        hint: "补上记忆",
        effects: { observation: 2 },
        next: "ch3_ask_bell",
      },
    ],
  },
  ch3_return_now: {
    speaker: "旁白",
    text: "塞德里克立刻下令回宫。安塔莉亚握紧断铃，跟上他时脚步很稳，眼睛却红着。",
    next: "ch3_return",
  },
  ch3_hold_grief: {
    speaker: "旁白",
    text: "他把披风披到她肩上。安塔莉亚抓住披风边缘，像抓住最后一块还没有烧尽的布。",
    next: "ch3_return",
  },
  ch3_ask_bell: {
    speaker: "塞德里克",
    text: "铃声断了，不代表没人听见。你弟弟叫什么？",
    next: "ch3_name",
  },
  ch3_name: {
    speaker: "安塔莉亚",
    text: "莱恩。他总说自己长大后要当最吵的国王。",
    next: "ch3_return",
  },
  ch3_return: {
    chapter: "第四章",
    bg: "throne",
    speaker: "旁白",
    text: "他们赶回王宫时，钟声已经乱了。大臣站在王座前，手里拿着本该封在禁库里的旧王印。",
    next: "ch4_coup_cg",
  },
  ch4_coup_cg: {
    cg: "palaceCoup",
    cgMotion: "humanReveal",
    speaker: "旁白",
    text: "蓝色锁链从地砖里升起。朝臣们跪倒一片，没人敢看王座，也没人敢看那个被锁链护住的大臣。",
    next: "ch4_minister_claim",
  },
  ch4_minister_claim: {
    speaker: "大臣",
    text: "陛下，您被兽族妖女蛊惑。臣请出先王遗印，暂代国政，保王室清明。",
    next: "ch4_cedric_laugh",
  },
  ch4_cedric_laugh: {
    speaker: "塞德里克",
    text: "你说保王室时，手别抖。那枚印只认血，不认你这种偷印的人。",
    next: "ch4_antalia_public",
  },
  ch4_antalia_public: {
    speaker: "安塔莉亚",
    text: "他认得我。你把我变成猫，把我送到王座边。现在钥匙自己走回来了。",
    next: "ch4_minister_cut",
  },
  ch4_minister_cut: {
    speaker: "大臣",
    text: "钥匙就该插在锁里。公主殿下，你的魂本来就不完整。",
    next: "ch4_chain",
  },
  ch4_chain: {
    speaker: "旁白",
    text: "锁链穿过月光，直扑安塔莉亚。塞德里克一步挡在她身前，手背被蓝火划开。",
    next: "ch4_cedric_wound",
  },
  ch4_cedric_wound: {
    speaker: "塞德里克",
    text: "我说过，谁先藏刀，谁先退出。你连上桌的资格都没了。",
    next: "ch4_antalia_rune",
  },
  ch4_antalia_rune: {
    speaker: "旁白",
    text: "安塔莉亚抓住锁链上的符文。她的猫耳被魔力压得发颤，却硬生生撕下一片蓝光。",
    next: "ch4_false_loss",
  },
  ch4_false_loss: {
    speaker: "旁白",
    text: "王印突然亮起。塞德里克膝盖一软，眼神空了一瞬。大臣终于露出笑意。",
    next: "ch4_minister_win",
  },
  ch4_minister_win: {
    speaker: "大臣",
    text: "先王留下的不只一把锁。陛下，您身体里的那一半魂，也该物归原主。",
    next: "ch4_antalia_choice",
  },
  ch4_antalia_choice: {
    speaker: "安塔莉亚",
    text: "塞德里克，看着我。你属于你自己。你是那个把笼门打开的人。",
    next: "ch4_cedric_return",
  },
  ch4_cedric_return: {
    speaker: "塞德里克",
    text: "我听见了。别喊那么大声，我还没死。",
    next: "ch4_retreat",
  },
  ch4_retreat: {
    speaker: "旁白",
    text: "大将军率兵撞开侧门。老书记官把账册举过头顶。朝臣的沉默裂出第一道缝。",
    next: "ch4_after",
  },
  ch4_after: {
    cg: "infirmaryAftermath",
    cgMotion: "moonCorridor",
    speaker: "旁白",
    text: "深夜，雨落在旧礼拜堂的彩窗上。塞德里克坐在长椅边，手上缠着安塔莉亚打的结。",
    next: "ch4_bandage",
  },
  ch4_bandage: {
    speaker: "安塔莉亚",
    text: "你刚才差点站不起来。",
    next: "ch4_cedric_joke",
  },
  ch4_cedric_joke: {
    speaker: "塞德里克",
    text: "差点而已。王的膝盖很贵，不能随便送给叛臣看。",
    next: "ch4_antalia_angry_soft",
  },
  ch4_antalia_angry_soft: {
    speaker: "安塔莉亚",
    text: "别开玩笑。我叫你的时候，你真的不在了。",
    next: "ch4_cedric_soft",
  },
  ch4_cedric_soft: {
    speaker: "塞德里克",
    text: "我回来了。因为你叫的是我的名字。",
    next: "ch4_near_confession",
  },
  ch4_near_confession: {
    speaker: "旁白",
    text: "安塔莉亚低头系紧绷带。她的手指很稳，耳尖却比烛火还红。",
    next: "ch4_choice_after",
  },
  ch4_choice_after: {
    choices: [
      {
        label: "坐近一些",
        hint: "别退",
        effects: { closeness: 2 },
        next: "ch4_closer",
      },
      {
        label: "留下守夜",
        hint: "先稳住",
        effects: { vigilance: -1, observation: 1 },
        next: "ch4_watch",
      },
    ],
  },
  ch4_closer: {
    speaker: "旁白",
    text: "他没有再说话，只把受伤的手放到她能碰到的位置。安塔莉亚没有躲。",
    next: "ch5_plan",
  },
  ch4_watch: {
    speaker: "旁白",
    text: "他们隔着一盏烛火坐到天亮。谁都没睡，谁也没把沉默当成逃避。",
    next: "ch5_plan",
  },
  ch5_plan: {
    chapter: "终章",
    bg: "library",
    speaker: "旁白",
    text: "最后的术式藏在王座下。要破它，必须让两份被切开的魂同时承认自己的名字。",
    next: "ch5_scribe_key",
  },
  ch5_scribe_key: {
    speaker: "老书记官",
    text: "先王把恐惧切给儿子，把罪证切给猫族。你们若互相怀疑，术式就会合上。",
    next: "ch5_antalia_fear",
  },
  ch5_antalia_fear: {
    speaker: "安塔莉亚",
    text: "如果我失败，会变回猫吗？",
    next: "ch5_cedric_answer",
  },
  ch5_cedric_answer: {
    speaker: "塞德里克",
    text: "你变成什么都行。别把自己交给他就行。",
    next: "ch5_antalia_smile",
  },
  ch5_antalia_smile: {
    speaker: "安塔莉亚",
    text: "这句话听起来很难听。",
    next: "ch5_cedric_smile",
  },
  ch5_cedric_smile: {
    speaker: "塞德里克",
    text: "我知道。可你听懂了。",
    next: "ch5_final_cg",
  },
  ch5_final_cg: {
    bg: "throne",
    cg: "finalRitual",
    cgMotion: "humanReveal",
    speaker: "旁白",
    text: "月升到王座正上方时，断开的王印在两人掌心合拢。银蓝色光芒照亮整座大厅。",
    next: "ch5_minister_last",
  },
  ch5_minister_last: {
    speaker: "大臣",
    text: "你们以为信任能改写术式？王国从来靠恐惧活着。",
    next: "ch5_cedric_last",
  },
  ch5_cedric_last: {
    speaker: "塞德里克",
    text: "恐惧只能让人跪下。站起来的人，你管不住。",
    next: "ch5_antalia_last",
  },
  ch5_antalia_last: {
    speaker: "安塔莉亚",
    text: "我的名字是安塔莉亚。钥匙、战利品、宠物，这些名字都滚开。",
    next: "ch5_break_spell",
  },
  ch5_break_spell: {
    speaker: "旁白",
    text: "锁链一寸寸碎开。王印里的旧魂发出尖啸，又被晨光吞没。大臣手中的印章裂成粉末。",
    next: "ch5_public_truth",
  },
  ch5_public_truth: {
    speaker: "旁白",
    text: "账册、残卷和俘虏证词摆上朝堂。旧案终于有了名字。死者仍然沉默，活人开始作证。",
    next: "ch5_public_choice",
  },
  ch5_public_choice: {
    speaker: "旁白",
    text: "有人要求立刻处死大臣。有人害怕牵出更多旧贵族。大厅里第一次吵得像真正的朝堂。",
    next: "choice_trial",
  },
  choice_trial: {
    choices: [
      {
        label: "公开证词",
        hint: "让众人听见",
        effects: { observation: 1 },
        next: "ch5_open_trial",
      },
      {
        label: "护住证人",
        hint: "保住活口",
        effects: { vigilance: -1 },
        next: "ch5_guard_witness",
      },
    ],
  },
  ch5_open_trial: {
    speaker: "塞德里克",
    text: "公开审。每一份证词都念出来。王冠怕丢脸，百姓就只能丢命。",
    next: "ch5_antalia_public_grief",
  },
  ch5_guard_witness: {
    speaker: "安塔莉亚",
    text: "先护住证人。死得太快的罪人，只会把真相一起带走。",
    next: "ch5_antalia_public_grief",
  },
  ch5_antalia_public_grief: {
    speaker: "旁白",
    text: "猫族俘虏站上台阶时，安塔莉亚没有替他们说话。她只是站在那里，让他们自己说。",
    next: "ch5_cedric_public_grief",
  },
  ch5_cedric_public_grief: {
    speaker: "旁白",
    text: "塞德里克也没有替父王辩解。他听完每一个名字，把手放在王冠上，又慢慢放下。",
    next: "ch5_minister_end",
  },
  ch5_minister_end: {
    speaker: "大臣",
    text: "陛下，臣只是替王国做了必要的事。",
    next: "ch5_sentence",
  },
  ch5_sentence: {
    speaker: "塞德里克",
    text: "王国不需要你替它杀人。押下去，公开审判。让每个失去家的人都能听见判词。",
    next: "ch5_after_trial",
  },
  ch5_after_trial: {
    speaker: "旁白",
    text: "秋天来时，北门营地拆了围栏。旧王都的月门被扶正，第一批猫族孩子回去种下白花。",
    next: "ch5_garden_cg",
  },
  ch5_garden_cg: {
    cg: "sunriseEnding",
    cgMotion: "softOrder",
    speaker: "旁白",
    text: "新修好的花园里，喷泉再次流动。那只灰白小猫跳上石沿，骄傲得像刚巡视完自己的王国。",
    next: "ch5_no_crown",
  },
  ch5_no_crown: {
    speaker: "安塔莉亚",
    text: "你今天没戴王冠。",
    next: "ch5_cedric_end",
  },
  ch5_cedric_end: {
    speaker: "塞德里克",
    text: "太重。偶尔也该让脖子休息。再说，有人看见王冠就想咬。",
    next: "ch5_antalia_end",
  },
  ch5_antalia_end: {
    speaker: "安塔莉亚",
    text: "我现在可以用人的牙咬。",
    next: "ch5_choice_end",
  },
  ch5_choice_end: {
    choices: [
      {
        label: "牵住她手",
        hint: "留在此刻",
        effects: { closeness: 1 },
        next: "ch5_hold_hand",
      },
      {
        label: "并肩出城",
        hint: "走向城门",
        effects: { observation: 1 },
        next: "ch5_side_by_side",
      },
    ],
  },
  ch5_hold_hand: {
    speaker: "旁白",
    text: "塞德里克伸出手。这一次，安塔莉亚没有碰一下就逃。她握住他，掌心温热。",
    next: "final_words",
  },
  ch5_side_by_side: {
    speaker: "旁白",
    text: "他们并肩走向城门。阳光落在两道影子上，中间没有笼子，也没有锁链。",
    next: "final_words",
  },
  final_words: {
    speaker: "塞德里克",
    text: "安塔莉亚，留下来由你。离开也由你。你自己选。",
    next: "final_answer",
  },
  final_answer: {
    speaker: "安塔莉亚",
    text: "那我今天留下。明天也许出去看看。后天回来吵你。",
    next: "final_soft",
  },
  final_soft: {
    speaker: "塞德里克",
    text: "听起来很麻烦。",
    next: "final_smile",
  },
  final_smile: {
    speaker: "安塔莉亚",
    text: "你最讨厌无意义的损耗吧？我很有用。",
    next: "final_close",
  },
  final_close: {
    speaker: "旁白",
    text: "塞德里克笑了。那笑意卸下王座的重量，像一个终于学会开门的人，在日光里松了一口气。",
    next: "result",
  },
  result: {
    choices: [
      {
        label: "审判",
        hint: "真相上台",
        next: "ending_gate_trial",
      },
      {
        label: "王座",
        hint: "权力归处",
        next: "ending_gate_throne",
      },
      {
        label: "旧都",
        hint: "离宫远行",
        next: "ending_gate_exile",
      },
      {
        label: "暗线",
        hint: "失败情报",
        next: "ending_gate_shadow",
      },
    ],
  },
  ending_gate_trial: {
    choices: [
      {
        label: "白王座",
        hint: "公开审判",
        next: "ending_white_throne",
      },
      {
        label: "白猫",
        hint: "共犯来信",
        next: "ending",
      },
      {
        label: "白审",
        hint: "书记官证词",
        next: "ending_white_trial",
      },
      {
        label: "零周目",
        hint: "坏结局拼图",
        next: "ending_loop_zero",
      },
    ],
  },
  ending_gate_throne: {
    choices: [
      {
        label: "铁冠",
        hint: "保国失她",
        next: "ending_iron_crown",
      },
      {
        label: "双王座",
        hint: "共治路线",
        next: "ending_shared_throne",
      },
      {
        label: "金笼",
        hint: "沉默存活",
        next: "ending_silent_cage",
      },
      {
        label: "北刀",
        hint: "军方坐大",
        next: "ending_northern_blade",
      },
    ],
  },
  ending_gate_exile: {
    choices: [
      {
        label: "猫王女",
        hint: "旧都复国",
        next: "ending_cat_queen",
      },
      {
        label: "米拉",
        hint: "宫门打开",
        next: "ending_mira_gate",
      },
      {
        label: "落雪",
        hint: "旧都新家",
        next: "ending_old_snow",
      },
      {
        label: "再见",
        hint: "放下王名",
        next: "ending_goodbye_king",
      },
    ],
  },
  ending_gate_shadow: {
    choices: [
      {
        label: "账灰",
        hint: "灰烬编号",
        next: "ending_burned_ledger",
      },
      {
        label: "空床",
        hint: "证据失人",
        next: "ending_empty_bed",
      },
      {
        label: "钥匙",
        hint: "侍从背叛",
        next: "ending_luca_key",
      },
      {
        label: "无月",
        hint: "月相失败",
        next: "ending_moonless",
      },
      {
        label: "黑日",
        hint: "幕后夺取",
        next: "ending_black_sun",
      },
    ],
  },
  ending_white_throne: {
    chapter: "大结局",
    bg: "throne",
    sprite: "antalia",
    cg: "finalRitual",
    cgMotion: "moonCorridor",
    speaker: "系统",
    text: "大结局达成：白王座。王冠接受审判，活人得到重新作证的席位。",
    next: null,
  },
  ending: {
    chapter: "大结局",
    bg: "throne",
    sprite: "antalia",
    cg: "sunriseEnding",
    cgMotion: "softOrder",
    speaker: "系统",
    text: "大结局达成：白猫之约。笼门打开后，留下和离开都成了自由。",
    next: null,
  },
  ending_iron_crown: {
    chapter: "结局群",
    bg: "throne",
    sprite: "cedric",
    cg: "throneGift",
    cgMotion: "throneGift",
    speaker: "系统",
    text: "结局达成：铁王冠。国家活下来，塞德里克独自记住她的名字。",
    next: null,
  },
  ending_cat_queen: {
    chapter: "结局群",
    bg: "entrance",
    sprite: "antalia",
    cg: "oldCapitalRuins",
    cgMotion: "moonCorridor",
    speaker: "系统",
    text: "结局达成：猫王女复国。旧都钟声响起，她把王印还给雪地。",
    next: null,
  },
  ending_shared_throne: {
    chapter: "结局群",
    bg: "council",
    sprite: "antalia",
    cg: "councilSignal",
    cgMotion: "softOrder",
    speaker: "系统",
    text: "结局达成：双王座。共治从拥抱开始，也从公开反对开始。",
    next: null,
  },
  ending_burned_ledger: {
    chapter: "坏结局",
    bg: "library",
    sprite: "minister",
    cg: "archiveLedger",
    cgMotion: "libraryConfrontation",
    speaker: "系统",
    text: "坏结局：烧毁的账册。灰烬留下编号，下一轮能先抓住账房。",
    next: null,
  },
  ending_silent_cage: {
    chapter: "坏结局",
    bg: "bed",
    sprite: "cat",
    cg: "openCage",
    cgMotion: "openCage",
    speaker: "系统",
    text: "坏结局：沉默金笼。她还活着，笼底留下半句敌方咒语。",
    next: null,
  },
  ending_northern_blade: {
    chapter: "坏结局",
    bg: "council",
    sprite: "general",
    cg: "palaceCoup",
    cgMotion: "libraryConfrontation",
    speaker: "系统",
    text: "坏结局：北境刀声。军令印泥暴露先王密使的手。",
    next: null,
  },
  ending_empty_bed: {
    chapter: "坏结局",
    bg: "bed",
    sprite: "cedric",
    cg: "infirmaryAftermath",
    cgMotion: "moonCorridor",
    speaker: "系统",
    text: "坏结局：空床。枕下银戒解锁记忆切割的副作用。",
    next: null,
  },
  ending_white_trial: {
    chapter: "结局群",
    bg: "council",
    sprite: "scribe",
    cg: "finalRitual",
    cgMotion: "moonCorridor",
    speaker: "系统",
    text: "结局达成：白色审判。书记官交出记忆，名单终于能念完。",
    next: null,
  },
  ending_luca_key: {
    chapter: "坏结局",
    bg: "entrance",
    sprite: "servant",
    cg: "palaceCoup",
    cgMotion: "softOrder",
    speaker: "系统",
    text: "坏结局：侍从的钥匙。小人物的怨恨打开王城侧门。",
    next: null,
  },
  ending_mira_gate: {
    chapter: "结局群",
    bg: "entrance",
    sprite: "maid",
    cg: "refugeeCamp",
    cgMotion: "softOrder",
    speaker: "系统",
    text: "结局达成：米拉开的门。她不再递盘子，她递出逃生路。",
    next: null,
  },
  ending_moonless: {
    chapter: "坏结局",
    bg: "library",
    sprite: "antalia",
    cg: "moonCorridor",
    cgMotion: "moonCorridor",
    speaker: "系统",
    text: "坏结局：无月夜。月相表暴露第零周目的日期异常。",
    next: null,
  },
  ending_old_snow: {
    chapter: "结局群",
    bg: "entrance",
    sprite: "antalia",
    cg: "oldCapitalRuins",
    cgMotion: "moonCorridor",
    speaker: "系统",
    text: "结局达成：旧都落雪。他们失去王位，换到能命名的家。",
    next: null,
  },
  ending_loop_zero: {
    chapter: "隐藏结局",
    bg: "library",
    sprite: "scribe",
    cg: "altarMemory",
    cgMotion: "libraryConfrontation",
    speaker: "系统",
    text: "隐藏结局：第零周目。全部失败拼成第一封未来来信。",
    next: null,
  },
  ending_goodbye_king: {
    chapter: "结局群",
    bg: "entrance",
    sprite: "cedric",
    cg: "sunriseEnding",
    cgMotion: "softOrder",
    speaker: "系统",
    text: "结局达成：再见，国王。他终于不用王座证明自己。",
    next: null,
  },
  ending_black_sun: {
    chapter: "坏结局",
    bg: "throne",
    sprite: "minister",
    cg: "finalRitual",
    cgMotion: "libraryConfrontation",
    speaker: "系统",
    text: "坏结局：黑日。幕后者夺走仪式，太阳背面出现新声音。",
    next: null,
  },
};

const storySections = {
  "序章：献礼与开笼": ["throneGift", "catIntro", "softOrder", "openCage"],
  "第一章：早膳、救猫与议事厅": ["morningBreakfast", "saveCat", "councilSignal", "eveningFable"],
  "月圆夜：真身、禁书与对峙": ["moonCorridor", "humanReveal", "librarySpellbook", "libraryConfrontation"],
  "第二章：临时同盟与营地": ["truceLibrary", "refugeeCamp", "archiveLedger"],
  "第三章：旧王都与真相": ["oldCapitalRuins", "altarMemory", "palaceCoup"],
  "终章：政变、破咒与自由": ["infirmaryAftermath", "finalRitual", "sunriseEnding"],
};

const branchMap = [
  {
    id: "choice_throne",
    chapter: "序章",
    title: "刑台与王印",
    prompt: "广场等着处决俘虏，笼中猫压着证物。塞德里克要稳军心，还是保住活口。",
  },
  {
    id: "choice_morning",
    chapter: "第一章",
    title: "枕边证物",
    prompt: "王印出现在寝宫里。他要逼她暴露、装作不知，还是用旧铃试出她的身份。",
  },
  {
    id: "choice_library",
    chapter: "月圆夜",
    title: "禁书库对峙",
    prompt: "真相近在眼前，他选择施压、退让，还是用亲近打破僵局。",
  },
  {
    id: "choice_truce",
    chapter: "第二章",
    title: "临时同盟",
    prompt: "这份同盟可以写成契约，也可以先从伸手开始。",
  },
  {
    id: "ch2_choice_archive",
    chapter: "第二章",
    title: "追查旧账",
    prompt: "线索分成两端：死账册里的证据，和活人口中的证词。",
  },
  {
    id: "ch3_choice_altar",
    chapter: "第三章",
    title: "旧王都祭坛",
    prompt: "记忆正在崩落，塞德里克必须决定先追线索，还是先接住她。",
  },
  {
    id: "ch4_choice_after",
    chapter: "终章前夜",
    title: "伤后守候",
    prompt: "政变之后，亲近和克制都可能是照顾。",
  },
  {
    id: "choice_trial",
    chapter: "终章",
    title: "公开审判",
    prompt: "王座要选择把真相交给众人，还是先保住能说话的人。",
  },
  {
    id: "ch5_choice_end",
    chapter: "大结局",
    title: "城门前",
    prompt: "笼门已经打开，他最后要牵住此刻，或与她并肩走向城外。",
  },
  {
    id: "result",
    chapter: "大结局",
    title: "尾声",
    prompt: "进入结局确认。",
  },
];

const dom = {
  title: document.querySelector("#title-screen"),
  stage: document.querySelector("#stage"),
  start: document.querySelector("#start-game"),
  continue: document.querySelector("#continue-game"),
  bg: document.querySelector("#background"),
  cgStage: document.querySelector("#cg-stage"),
  cg: document.querySelector("#event-cg"),
  cgEffects: document.querySelector("#cg-effects"),
  cast: document.querySelector("#cast-layer"),
  character: document.querySelector("#character"),
  chapter: document.querySelector("#chapter-label"),
  stats: document.querySelector("#stats-label"),
  speaker: document.querySelector("#speaker"),
  line: document.querySelector("#line"),
  dialogue: document.querySelector("#dialogue"),
  choices: document.querySelector("#choice-panel"),
  modal: document.querySelector("#modal"),
  modalTitle: document.querySelector("#modal-title"),
  modalBody: document.querySelector("#modal-body"),
  history: document.querySelector("#history-button"),
  inlineHistory: document.querySelector("#log-inline-button"),
  auto: document.querySelector("#auto-button"),
  skip: document.querySelector("#skip-button"),
  map: document.querySelector("#map-button"),
  save: document.querySelector("#save-button"),
  load: document.querySelector("#load-button"),
  quickSave: document.querySelector("#quick-save-button"),
  quickLoad: document.querySelector("#quick-load-button"),
  settings: document.querySelector("#settings-button"),
  inlineSettings: document.querySelector("#settings-inline-button"),
};

const storeKey = "thirtieth-day-throne-save-v1";
const quickStoreKey = "thirtieth-day-throne-quick-save-v1";
const settingsKey = "thirtieth-day-throne-settings-v1";
const readKey = "thirtieth-day-throne-read-v1";
const musicMoods = {
  throne: "goldberg",
  bed: "gymnopedie",
  council: "goldberg",
  entrance: "toccata",
  library: "toccata",
};

const speakerActors = {
  塞德里克: "cedric",
  安塔莉亚: "antalia",
  大将军: "general",
  大臣: "minister",
  老书记官: "scribe",
  侍女: "maid",
  侍从: "servant",
};

const actorNames = {
  cedric: "塞德里克",
  antalia: "安塔莉亚",
  cat: "安塔莉亚",
  general: "大将军",
  minister: "大臣",
  scribe: "老书记官",
  maid: "侍女",
  servant: "侍从",
};

const defaultExpressions = {
  cedric: "neutral",
  antalia: "guarded",
  cat: "guarded",
  general: "proud",
  minister: "smile",
  scribe: "gentle",
  maid: "polite",
  servant: "neutral",
};

const sceneCasts = {
  throne: ["cedric", "general", "minister", "scribe", "cat"],
  bed: ["cedric", "cat"],
  council: ["cedric", "minister", "cat"],
  entrance: ["cedric", "cat"],
  library: ["cedric", "antalia"],
};

const slotStyles = {
  farLeft: { x: "14%", height: "72vh", width: "min(25vw, 320px)" },
  left: { x: "30%", height: "78vh", width: "min(30vw, 380px)" },
  center: { x: "50%", height: "82vh", width: "min(34vw, 430px)" },
  right: { x: "70%", height: "78vh", width: "min(30vw, 380px)" },
  farRight: { x: "86%", height: "72vh", width: "min(25vw, 320px)" },
};

let state = {
  node: "start",
  stats: { ...initialStats },
  flags: {},
  history: [],
  choiceLog: {},
  currentBg: null,
  currentSprite: null,
};

window.__SOYA_DEBUG__ = {
  assets,
  story,
  storySections,
  speakerActors,
  longformPlan,
  get state() {
    return state;
  },
};

let typing = false;
let fullText = "";
let textTimer = null;
let autoTimer = null;
let autoMode = false;
let skipMode = false;
let currentNodeWasRead = false;
let linePages = [];
let linePageIndex = 0;
let readNodes = loadReadNodes();
let settings = loadSettings();
let audio = {
  ctx: null,
  tracks: {},
  current: null,
  mood: null,
};

function loadSettings() {
  try {
    return { speed: 18, music: 0.28, ...JSON.parse(localStorage.getItem(settingsKey)) };
  } catch {
    return { speed: 18, music: 0.28 };
  }
}

function saveSettings() {
  localStorage.setItem(settingsKey, JSON.stringify(settings));
}

function loadReadNodes() {
  try {
    const saved = JSON.parse(localStorage.getItem(readKey));
    return new Set(Array.isArray(saved) ? saved : []);
  } catch {
    return new Set();
  }
}

function saveReadNodes() {
  localStorage.setItem(readKey, JSON.stringify([...readNodes]));
}

function preload() {
  const characterSources = Object.values(assets.characters).flatMap((expressions) => Object.values(expressions));
  [...Object.values(assets.backgrounds), ...characterSources, ...Object.values(assets.cg)].forEach((src) => {
    const image = new Image();
    image.src = src;
  });
}

function initAudio() {
  if (settings.music <= 0) return;
  if (!Object.keys(audio.tracks).length) {
    for (const [key, src] of Object.entries(assets.music)) {
      const track = new Audio(src);
      track.loop = true;
      track.preload = "auto";
      track.volume = 0;
      audio.tracks[key] = track;
    }
  }
  if (!audio.ctx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audio.ctx = new AudioContext();
  }
  if (audio.ctx?.state === "suspended") audio.ctx.resume();
}

function stopMood() {
  if (audio.current) {
    audio.current.pause();
    audio.current.currentTime = 0;
    audio.current.volume = 0;
  }
  audio.current = null;
}

function setMusicVolume(value) {
  settings.music = value;
  saveSettings();
  if (value <= 0) {
    stopMood();
    audio.mood = null;
  } else {
    initAudio();
    if (audio.current) audio.current.volume = value;
    if (state.currentBg) startMood(state.currentBg);
  }
}

function startMood(mood) {
  if (settings.music <= 0 || !musicMoods[mood]) return;
  initAudio();
  if (audio.mood === mood) return;
  const nextTrack = audio.tracks[musicMoods[mood]];
  if (!nextTrack) return;
  if (audio.current && audio.current !== nextTrack) {
    audio.current.pause();
    audio.current.currentTime = 0;
    audio.current.volume = 0;
  }
  audio.mood = mood;
  audio.current = nextTrack;
  audio.current.volume = settings.music;
  audio.current.play().catch(() => {});
}

function playUiTone(kind = "next") {
  if (settings.music <= 0 || !audio.ctx) return;
  const now = audio.ctx.currentTime;
  const osc = audio.ctx.createOscillator();
  const gain = audio.ctx.createGain();
  const master = audio.ctx.createGain();
  master.gain.value = 0.35;
  master.connect(audio.ctx.destination);
  osc.type = "sine";
  osc.frequency.value = kind === "choice" ? 740 : 520;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.035, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
  osc.connect(gain);
  gain.connect(master);
  osc.start(now);
  osc.stop(now + 0.2);
}

function startGame(fromSave = false) {
  initAudio();
  clearAutoTimer();
  setSkipMode(false);
  if (fromSave) {
    loadGame(false);
  } else {
    state = {
      node: "start",
      stats: { ...initialStats },
      flags: {},
      history: [],
      choiceLog: {},
      currentBg: null,
      currentSprite: null,
    };
  }
  dom.title.classList.add("hidden");
  dom.stage.classList.remove("hidden");
  renderNode();
}

function applyEffects(node) {
  if (!node.effects) return;
  for (const [key, value] of Object.entries(node.effects)) {
    state.stats[key] = Math.max(0, (state.stats[key] ?? 0) + value);
  }
  if (node.flags) {
    Object.assign(state.flags, node.flags);
  }
}

function speakerActor(node) {
  return speakerActors[node.speaker] ?? null;
}

function expressionFor(actor, node) {
  if (node.expression?.[actor]) return node.expression[actor];
  const text = node.text ?? "";
  if (actor === "cedric") {
    if (/陛下|朕|别|没有|错|处理|战报|所以/.test(text)) return "stern";
    if (/晚安|故事|十五岁|行了|同一样东西/.test(text)) return "soft";
  }
  if (actor === "antalia") {
    if (/价值|战利品|破|父王|什么时候/.test(text)) return "angry";
    if (/孤独|骄傲|真正/.test(text)) return "guarded";
  }
  if (actor === "cat") {
    if (/愤怒|警告|炸|戒备|敌人/.test(text)) return "angry";
    if (/尾巴|默许|呼噜|暂时不走/.test(text)) return "soft";
  }
  if (actor === "minister") {
    if (/失体统|怎能当真|告急|造反/.test(text)) return "offended";
    if (/官印/.test(text)) return "nervous";
  }
  if (actor === "general") return /废墟|寻得/.test(text) ? "proud" : "stern";
  if (actor === "scribe") return /锁|留下/.test(text) ? "warning" : "gentle";
  if (actor === "maid") return /不适|吩咐/.test(text) ? "concerned" : "polite";
  if (actor === "servant") return /处理掉/.test(text) ? "ashamed" : "neutral";
  return defaultExpressions[actor] ?? "neutral";
}

function castForNode(node) {
  if (node.cast) return node.cast.slice();
  if (node.cg && !speakerActor(node)) return [];
  if (node.speaker === "系统" || node.choices) return [];
  const bg = Object.hasOwn(node, "bg") ? node.bg : state.currentBg;
  let cast = (sceneCasts[bg] ?? []).slice();
  if (node.sprite === "antalia" || node.cg === "humanReveal" || state.currentSprite === "antalia") {
    cast = cast.map((actor) => (actor === "cat" ? "antalia" : actor));
  }
  if (node.speaker === "侍女") cast = ["cedric", "cat", "maid"];
  if (node.speaker === "侍从") cast = ["cedric", "cat", "servant"];
  const active = speakerActor(node);
  if (active && !cast.includes(active)) cast.push(active);
  return [...new Set(cast)];
}

function slotFor(actor, cast) {
  const fixed = {
    cedric: cast.length >= 4 ? "farLeft" : "left",
    general: "left",
    minister: cast.length >= 4 ? "right" : "right",
    scribe: "farRight",
    cat: cast.length >= 3 ? "center" : "right",
    antalia: "right",
    maid: "right",
    servant: "right",
  };
  return fixed[actor] ?? "center";
}

function ensurePortrait(actor) {
  let portrait = dom.cast.querySelector(`[data-actor="${actor}"]`);
  if (!portrait) {
    portrait = document.createElement("img");
    portrait.dataset.actor = actor;
    portrait.alt = "";
    dom.cast.appendChild(portrait);
  }
  return portrait;
}

function ensureIdentityLabel(actor) {
  let label = dom.cast.querySelector(`[data-label-actor="${actor}"]`);
  if (!label) {
    label = document.createElement("span");
    label.dataset.labelActor = actor;
    label.textContent = actorNames[actor] ?? actor;
    dom.cast.appendChild(label);
  }
  return label;
}

function renderCast(node) {
  const cast = castForNode(node);
  const active = speakerActor(node);
  const visible = new Set(cast);
  for (const actor of cast) {
    const portrait = ensurePortrait(actor);
    const expression = expressionFor(actor, node);
    const source = assets.characters[actor]?.[expression] ?? assets.characters[actor]?.[defaultExpressions[actor]];
    if (source && portrait.getAttribute("src") !== source) portrait.src = source;
    const slot = slotFor(actor, cast);
    const style = slotStyles[slot] ?? slotStyles.center;
    portrait.dataset.slot = slot;
    portrait.className = `portrait ${actor} visible ${actor === active ? "speaking" : ""}`;
    portrait.style.setProperty("--portrait-x", style.x);
    portrait.style.setProperty("--portrait-height", style.height);
    portrait.style.setProperty("--portrait-width", style.width);

    const label = ensureIdentityLabel(actor);
    label.dataset.slot = slot;
    label.className = `portrait-label ${actor} visible ${actor === active ? "speaking" : ""}`;
    label.style.setProperty("--portrait-x", style.x);
  }
  for (const portrait of dom.cast.querySelectorAll(".portrait")) {
    if (!visible.has(portrait.dataset.actor)) {
      portrait.className = `portrait ${portrait.dataset.actor ?? ""}`;
    }
  }
  for (const label of dom.cast.querySelectorAll(".portrait-label")) {
    if (!visible.has(label.dataset.labelActor)) {
      label.className = `portrait-label ${label.dataset.labelActor ?? ""}`;
    }
  }
}

function renderNode() {
  clearTimeout(textTimer);
  clearAutoTimer();
  const node = story[state.node];
  if (!node) return;
  currentNodeWasRead = readNodes.has(state.node);
  linePages = [];
  linePageIndex = 0;

  dom.stage.classList.remove("has-choices");
  dom.choices.classList.add("hidden");
  dom.choices.innerHTML = "";

  if (node.chapter) dom.chapter.textContent = node.chapter;
  if (Object.hasOwn(node, "bg") && node.bg !== state.currentBg) {
    state.currentBg = node.bg;
    dom.bg.style.opacity = "0";
    window.setTimeout(() => {
      dom.bg.src = assets.backgrounds[node.bg];
      dom.bg.style.opacity = "1";
    }, 90);
    startMood(node.bg);
  }
  if (Object.hasOwn(node, "sprite")) {
    state.currentSprite = node.sprite;
  }
  if (Object.hasOwn(node, "cg")) {
    if (!node.cg) {
      dom.cgStage.classList.add("hidden");
    } else {
      dom.cg.src = assets.cg[node.cg];
      dom.cgStage.className = `cg-stage ${node.cgMotion ?? node.cg}`;
      dom.cg.style.animation = "none";
      dom.cgEffects.style.animation = "none";
      void dom.cg.offsetWidth;
      dom.cg.style.animation = "";
      dom.cgEffects.style.animation = "";
    }
  } else if (!node.choices) {
    dom.cgStage.classList.add("hidden");
  }

  renderCast(node);

  updateStats();

  if (node.choices) {
    typing = false;
    markNodeRead(state.node);
    setAutoMode(false);
    setSkipMode(false);
    dom.stage.classList.add("has-choices");
    dom.speaker.classList.remove("hidden");
    dom.speaker.textContent = "塞德里克";
    dom.line.textContent = "塞德里克的选择。";
    renderChoices(node.choices);
    return;
  }

  if ((node.speaker ?? "旁白") === "旁白") {
    dom.speaker.textContent = "";
    dom.speaker.classList.add("hidden");
  } else {
    dom.speaker.classList.remove("hidden");
    dom.speaker.textContent = node.speaker ?? "";
  }
  linePages = splitTextPages(node.text ?? "");
  showTextPage(0);
}

function splitTextPages(text) {
  if (!text) return [""];
  const target = 34;
  const parts = text.match(/[^。！？；]+[。！？；]?|[^。！？；]+$/g) ?? [text];
  const pages = [];
  let buffer = "";
  for (const raw of parts) {
    const part = raw.trim();
    if (!part) continue;
    if (!buffer) {
      buffer = part;
    } else if (buffer.length + part.length <= target) {
      buffer += part;
    } else {
      pages.push(buffer);
      buffer = part;
    }
    while (buffer.length > target + 8) {
      pages.push(buffer.slice(0, target));
      buffer = buffer.slice(target);
    }
  }
  if (buffer) pages.push(buffer);
  return pages.length ? pages : [text];
}

function showTextPage(index) {
  const page = linePages[index] ?? "";
  linePageIndex = index;
  typeLine(page);
  state.history.push({ speaker: story[state.node]?.speaker ?? "旁白", text: page });
  trimHistory();
}

function typeLine(text) {
  typing = true;
  fullText = text;
  dom.line.textContent = "";
  let index = 0;
  const tick = () => {
    index += 1;
    dom.line.textContent = fullText.slice(0, index);
    if (index < fullText.length) {
      textTimer = window.setTimeout(tick, settings.speed);
    } else {
      typing = false;
      if (linePageIndex >= linePages.length - 1) markNodeRead(state.node);
      continueManagedAdvance();
    }
  };
  tick();
}

function finishTyping() {
  clearTimeout(textTimer);
  dom.line.textContent = fullText;
  typing = false;
  if (linePageIndex >= linePages.length - 1) markNodeRead(state.node);
  continueManagedAdvance();
}

function next() {
  clearAutoTimer();
  if (typing) {
    finishTyping();
    playUiTone();
    return;
  }
  if (linePageIndex < linePages.length - 1) {
    showTextPage(linePageIndex + 1);
    playUiTone();
    return;
  }
  const node = story[state.node];
  if (!node || node.choices) return;
  if (!node.next) {
    showModal("通关", resultSummary());
    setAutoMode(false);
    setSkipMode(false);
    return;
  }
  state.node = node.next;
  playUiTone();
  renderNode();
}

function renderChoices(choices) {
  dom.choices.classList.remove("hidden");
  choices.forEach((choice) => {
    const button = document.createElement("button");
    const enabled = !choice.requires || choice.requires(state.stats, state.flags);
    button.disabled = !enabled;
    button.textContent = enabled ? choice.label : `${choice.label} · 未解锁`;
    button.addEventListener("click", () => {
      clearAutoTimer();
      setAutoMode(false);
      setSkipMode(false);
      initAudio();
      applyEffects(choice);
      state.choiceLog = state.choiceLog ?? {};
      state.choiceLog[state.node] = choice.label;
      state.node = choice.next;
      state.history.push({ speaker: "选择", text: choice.label });
      playUiTone("choice");
      renderNode();
    });
    dom.choices.appendChild(button);
  });
}

function markNodeRead(id) {
  if (!id || readNodes.has(id)) return;
  readNodes.add(id);
  saveReadNodes();
}

function clearAutoTimer() {
  if (autoTimer) {
    clearTimeout(autoTimer);
    autoTimer = null;
  }
}

function setAutoMode(value) {
  autoMode = value;
  dom.auto?.classList.toggle("active", autoMode);
  if (autoMode) setSkipMode(false);
}

function setSkipMode(value) {
  skipMode = value;
  dom.skip?.classList.toggle("active", skipMode);
  if (skipMode) setAutoMode(false);
}

function continueManagedAdvance() {
  const node = story[state.node];
  if (!node || node.choices || dom.modal.open) return;
  if (skipMode) {
    if (currentNodeWasRead) {
      autoTimer = window.setTimeout(next, 90);
    } else {
      setSkipMode(false);
    }
    return;
  }
  if (autoMode) {
    const delay = Math.min(2800, Math.max(1100, fullText.length * 45));
    autoTimer = window.setTimeout(next, delay);
  }
}

function updateStats() {
  dom.stats.textContent = `亲近 ${state.stats.closeness} · 警戒 ${state.stats.vigilance} · 观察 ${state.stats.observation}`;
}

function trimHistory() {
  if (state.history.length > 80) state.history.splice(0, state.history.length - 80);
}

function saveGame(showToast = true, key = storeKey, title = "已存档") {
  localStorage.setItem(key, JSON.stringify(state));
  if (key === storeKey) dom.continue.disabled = false;
  if (showToast) showModal(title, "<p>当前进度已保存到浏览器。</p>");
}

function loadGame(showToast = true, key = storeKey, title = "已读档") {
  const raw = localStorage.getItem(key);
  if (!raw) {
    if (showToast) showModal("没有存档", "<p>还没有可读取的存档。</p>");
    return false;
  }
  state = JSON.parse(raw);
  state.choiceLog = state.choiceLog ?? {};
  if (showToast) {
    dom.title.classList.add("hidden");
    dom.stage.classList.remove("hidden");
    showModal(title, "<p>已恢复到保存的位置。</p>");
  }
  renderNode();
  return true;
}

function quickSave() {
  saveGame(true, quickStoreKey, "快速存档");
}

function quickLoad() {
  loadGame(true, quickStoreKey, "快速读档");
}

function resultSummary() {
  let route = "双刃之契";
  if (state.stats.closeness >= 8 && state.stats.vigilance <= 2) route = "掌中猫";
  if (state.stats.vigilance >= 5) route = "野猫归林";
  if (state.flags.cold && state.stats.closeness <= 1) route = "笼中鸟";
  return `<p>大结局：<strong>白猫之约</strong></p><p>当前导向：<strong>${route}</strong></p><p>亲近 ${state.stats.closeness} · 警戒 ${state.stats.vigilance} · 观察 ${state.stats.observation}</p><p>笼门打开后，留下和离开都成了自由。</p>`;
}

function showModal(title, html) {
  clearAutoTimer();
  setAutoMode(false);
  setSkipMode(false);
  dom.modalTitle.textContent = title;
  dom.modalBody.innerHTML = html;
  dom.modal.showModal();
}

function showHistory() {
  const rows = state.history
    .slice()
    .reverse()
    .map((item) => `<div class="history-line"><strong>${escapeHtml(item.speaker)}</strong><br>${escapeHtml(item.text)}</div>`)
    .join("");
  showModal("历史", rows || "<p>暂无历史。</p>");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function branchStatus(id) {
  if (state.node === id) return "当前";
  if (state.choiceLog?.[id]) return "已选择";
  if (readNodes.has(id)) return "已读到";
  return "未到达";
}

function branchMapHtml() {
  const cards = branchMap
    .map((entry, index) => {
      const node = story[entry.id];
      const selected = state.choiceLog?.[entry.id] ?? "";
      const status = branchStatus(entry.id);
      const statusClass = status === "未到达" ? "locked" : status === "当前" ? "current" : "read";
      const options = (node?.choices ?? [])
        .map((choice) => {
          const selectedClass = selected === choice.label ? " selected" : "";
          return `<span class="branch-option${selectedClass}">${escapeHtml(choice.label)}</span>`;
        })
        .join("");
      const selectedText = selected ? `<p class="branch-picked">本轮选择：${escapeHtml(selected)}</p>` : "";
      return `<article class="branch-card ${statusClass}">
        <div class="branch-card-head">
          <span class="branch-index">${String(index + 1).padStart(2, "0")}</span>
          <span class="branch-chapter">${escapeHtml(entry.chapter)}</span>
          <span class="branch-status">${status}</span>
        </div>
        <h3>${escapeHtml(entry.title)}</h3>
        <p>${escapeHtml(entry.prompt)}</p>
        <div class="branch-options">${options}</div>
        ${selectedText}
      </article>`;
    })
    .join("");
  return `<div class="branch-map">
    <p class="branch-intro">你正在扮演塞德里克。这里按剧情顺序回顾关键选择，只保留玩家真正需要判断的路线节点。</p>
    <div class="branch-cards">${cards}</div>
  </div>`;
}

function showBranchMap() {
  showModal("路线", branchMapHtml());
}

function showSettings() {
  showModal(
    "设置",
    `<label class="settings-row">文字速度
      <input id="speed-range" type="range" min="4" max="40" value="${settings.speed}" />
    </label>
    <label class="settings-row">音乐音量
      <input id="music-range" type="range" min="0" max="0.5" step="0.01" value="${settings.music}" />
    </label>
    <p>文字速度数值越小，文字出现越快。音乐会随场景切换。</p>`,
  );
  document.querySelector("#speed-range").addEventListener("input", (event) => {
    settings.speed = Number(event.target.value);
    saveSettings();
  });
  document.querySelector("#music-range").addEventListener("input", (event) => {
    setMusicVolume(Number(event.target.value));
  });
}

function shouldIgnoreStageAdvance(event) {
  return Boolean(event.target.closest("button, dialog, .choice-panel, .topbar"));
}

dom.start.addEventListener("click", () => startGame(false));
dom.continue.addEventListener("click", () => startGame(true));
dom.dialogue.addEventListener("click", (event) => {
  if (!shouldIgnoreStageAdvance(event)) next();
});
dom.dialogue.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") next();
});
dom.history.addEventListener("click", showHistory);
dom.inlineHistory.addEventListener("click", showHistory);
dom.auto.addEventListener("click", () => {
  setAutoMode(!autoMode);
  if (autoMode && !typing) continueManagedAdvance();
});
dom.skip.addEventListener("click", () => {
  setSkipMode(!skipMode);
  if (skipMode) {
    if (typing) finishTyping();
    continueManagedAdvance();
  }
});
dom.map.addEventListener("click", showBranchMap);
dom.save.addEventListener("click", () => saveGame(true));
dom.load.addEventListener("click", () => loadGame(true));
dom.quickSave.addEventListener("click", quickSave);
dom.quickLoad.addEventListener("click", quickLoad);
dom.settings.addEventListener("click", showSettings);
dom.inlineSettings.addEventListener("click", showSettings);
dom.stage.addEventListener("click", (event) => {
  if (!shouldIgnoreStageAdvance(event) && !event.target.closest(".dialogue")) next();
});
dom.stage.addEventListener(
  "wheel",
  (event) => {
    if (event.deltaY < 0 && !dom.modal.open) {
      event.preventDefault();
      showHistory();
    }
  },
  { passive: false },
);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && dom.modal.open) dom.modal.close();
  if (event.key === "F5") {
    event.preventDefault();
    quickSave();
    return;
  }
  if (event.key === "F9") {
    event.preventDefault();
    quickLoad();
    return;
  }
  if ((event.key === "Enter" || event.key === " ") && !dom.modal.open) next();
});

preload();
dom.continue.disabled = !localStorage.getItem(storeKey);

export { story, assets, initialStats, storySections, speakerActors, longformPlan };
