define c = Character("塞德里克")
define a = Character("安塔莉亚")
define g = Character("大将军")
define m = Character("大臣")

default closeness = 0
default vigilance = 0
default observation = 0
default cold_route = False
default teaser_seen = False

define audio.throne = "audio/throne_theme.ogg"
define audio.chamber = "audio/chamber_theme.ogg"
define audio.library = "audio/library_theme.ogg"

image bg throne = "assets/backgrounds/throne_hall.png"
image bg bed = "assets/backgrounds/bedchamber.png"
image bg council = "assets/backgrounds/council_chamber.png"
image bg entrance = "assets/backgrounds/forbidden_entrance.png"
image bg library = "assets/backgrounds/forbidden_library.png"
image antalia = "assets/characters/antalia.png"
image antalia_cat = "assets/characters/antalia_cat.png"
image cg antalia_cat_intro = "assets/cg/antalia_cat_intro.png"
image cg antalia_human_reveal = "assets/cg/antalia_human_reveal.png"

label start:
    scene bg throne
    # Web build uses procedural music; these names are placeholders for native Ren'Py audio assets.
    # play music throne fadein 1.0
    "圣历一七四年，灭国战争结束后的第三十日。王城广场上，三十七名猫族俘虏跪在雪里。"
    g "陛下！臣在猫族王宫废墟中寻得此物。布偶猫族最后的王室血脉，特献于陛下。"
    scene cg antalia_cat_intro
    "笼门后的蓝眼睛抬了起来。宠物不会用那样的目光看人。她隔着金丝笼，第一次审判她的新敌人。"
    scene bg throne
    show antalia_cat
    "金丝笼被抬上殿来。笼中蜷缩着一只布偶猫，蓝宝石般的眼睛藏在蓬松浅杏色长毛下。"
    c "长得倒是不错。可惜是只不能化人的兽族。养着玩吧。"
    c "她在发抖，爪尖却没有缩回去。那股怒意藏不住。有意思。"
    "王座厅的欢呼声像潮水一样涌来。塞德里克坐在最高处，年轻得几乎不该拥有这座阴冷的宫殿，也冷静得几乎不像一个刚赢下战争的人。"
    c "胜利刚落地，所有人已经开始计算下一次背叛的日子。"
    m "陛下，猫族残部尚有俘虏。依臣之见，应当今夜处决，以绝后患。"
    "老书记官低声提醒：笼子能关住身体，却关不住一个愿意等待的人。若要一个人留下，锁远远不够。"
    c "俘虏押去北门营地，给药，给热汤。明日让他们修桥。死人不会缴税，也不会告诉我猫族王宫里到底发生过什么。"
    "笼中那双蓝眼睛轻轻一颤，像是第一次意识到，这个年轻国王的残酷也许有两层皮。"

    menu:
        "沉默地转身回王座":
            pass
        "临走前多看她一眼":
            $ observation += 1
            c "刚才那一瞬间，她的眼睛里有光。那道光属于一个正在判断局势的人。"

    scene bg bed
    # play music chamber fadein 1.0
    show antalia_cat
    "当夜，金丝笼被摆在国王寝宫一角。塞德里克下令打开了笼门。"
    c "出来。我不喜欢养笼中鸟。"
    "猫从笼中慢慢走出，每一步都带着戒备。"
    c "你听得懂我说话，对吧？"
    "猫的耳朵猛地动了一下。"
    c "晚安，小猫。做个好梦，如果猫会做梦的话。"
    "几秒后，黑暗中传来极轻的脚步声。她没有奔向门口，先绕到书桌前。爪子拨开边境地图，停在猫族旧王都的位置。"
    c "那座城的火，账不该全算在我头上。至少，那夜有几份战报被人改得太干净。"
    "天亮前，她无声地回到床边，没有偷走地图，只在桌角留下一缕浅杏色长毛。"

    "晨光洒入寝宫。塞德里克从床上坐起，发现猫正趴在他胸口。"
    c "你什么时候跑上来的？胆子不小。"
    "猫先看他的脸，再看他枕边的银戒。她没有碰，只把受伤的前爪藏进胸前长毛里。"
    "侍女送来早膳，按塞德里克的吩咐，没有放会让猫族不适的香料。安塔莉亚的耳尖动了一下。"

    menu:
        "伸手去摸她":
            $ closeness += 2
            "她没有立刻躲开，只是用尾巴挡住自己的脸。"
        "叫侍从送早饭，不理她":
            $ closeness = max(0, closeness - 1)
            $ cold_route = True
            "她蹲在窗台上梳理毛发，偶尔扫过来一眼。"
        "拿出逗猫棒逗她玩":
            $ closeness += 5
            $ observation += 1
            $ teaser_seen = True
            "黑檀木杆，银色丝线，末端缀着羽毛和铃铛。猫的耳朵瞬间竖直。"
            c "啧，明明很想扑过来吧？行，有骨气。"

    "午后，王宫花园里，一只从战俘营跑来的灰白小猫被逼到喷泉边。"
    "侍从请示是否处理掉这只野东西。"
    c "北门营地今天缺一个会抓老鼠的。把它擦干，送过去。再让厨房多煮一锅鱼汤，就说是给士兵的。"
    "安塔莉亚站在窗台阴影里看着这一幕。她明明还是猫的模样，眼神却像一个失去国家的人，第一次看见敌人没有踩碎一件小小的东西。"

    scene bg council
    show antalia_cat
    "议事厅里，大臣们为边境粮草争吵不休。"
    m "陛下！议事之时携带兽族玩物，实在有失体统。"
    c "她比你们安静多了。"
    "猫似乎听懂了，尾巴轻轻拍了一下塞德里克的手背。"
    c "这个动作不像猫会做的。更像是一个不耐烦的女孩子，在表达：闭嘴。"
    "北境粮草告急，南境却刚被战火掏空。无论选择哪边，都有人会死。"
    "膝上的猫忽然伸爪，按住地图上一条废弃水道。那条水道通向猫族旧仓。"
    c "北境军走水道。若旧仓还有粮，先救三座城；若没有，就把水道改成撤民路线。"
    m "陛下，这是那只猫碰出来的位置，怎能当真？"
    c "所以功劳归我，错也归我。你们若连一只猫碰过的地图都不敢查，明日就把官印交给她。"
    "傍晚，急报传回：旧仓尚有粮草。朝臣赞颂国王英明，没人知道那是猫族公主给出的路。"
    "入夜前，塞德里克念起旧童话。故事里说，国王以为自己捡到一件宝物，后来才发现，是猫把他从孤独里捡了出来。"
    c "别这样看我。我还没高尚到能放你走。"
    "她绕开他的手，最后却选在离他书桌半步远的地毯上蜷下。没有原谅，只是暂时留下。"

    scene bg entrance
    hide antalia_cat
    "月圆之夜，猫窝里只剩一团被精心整理过的毯子。"
    "王宫深处的死胡同前，幽蓝色术式一条接一条熄灭。"
    scene cg antalia_human_reveal
    "月光像银色王冠落在她发间。塞德里克终于看见安塔莉亚真正的样子，也看见她拼命藏住的孤独与骄傲。"
    scene bg entrance
    show antalia
    "月光照在猫的身上，然后皮毛褪去，少女的身影缓缓成形。"
    a "破。"
    c "玩够了。"

    scene bg library
    # play music library fadein 1.0
    show antalia
    "禁书库内，安塔莉亚背对入口，俯身阅读摊开的羊皮纸。"
    "羊皮纸上画着一枚被剖开的月轮。旁边的古语写着：灵魂可切，记忆可封，形体可伪。"
    a "父王说过，王室血脉不会无故退化。若我只能当猫，说明有人把我作为人的那一半藏起来了。"
    "她说“父王”时，声音几乎碎在喉咙里。"
    c "三年来，你每天晚上从我的床上爬起来，变成人，光着脚走到这里，就是为了偷看一本七百年前的旧书？"
    a "所以你是来欣赏战利品会说话的样子？还是来确认我还剩多少价值？"
    c "都有。"
    "这句诚实比谎言更伤人。塞德里克立刻知道自己错了。王习惯把真心藏进刀鞘里，可刀柄碰到她，只会留下新的伤口。"

    menu:
        "继续逼近，看她还能忍多久":
            $ vigilance += 3
            $ closeness = max(0, closeness - 1)
            "她的尾巴炸成一团，蓝眼睛里翻起尖锐的敌意。"
        "收回逗猫棒，退后一步":
            $ vigilance = max(0, vigilance - 2)
            $ closeness += 2
            c "行了，不逗你了。"
            a "你什么时候发现的？"
            c "第一天。"
        "伸手捏住她的猫耳朵" if closeness >= 5 and observation >= 1:
            $ closeness += 3
            $ vigilance += 1
            "指尖触到猫耳的一瞬间，她猛地按住你的手腕，却没有真的推开。"
            a "你什么时候发现的？"
            c "第一天。"

    c "灵魂切割术。你查这个，是为了找猫族覆灭的真相？"
    c "你有没有想过，也许我留着你的命，是因为我和你在找同一样东西。"
    "长明灯的火光跳了一下。羊皮纸右下角的小字一闪而过：施术者亦可自我切割。"
    "第一章结束。第二章解锁：两人的秘密。"
    return
