export default function (req, res) {
    if (!req.query.lang) {
        res.status(400).json({ error: "Language is required" });
        return;
    };

    const lang = req.query.lang;

    const i18nRaw = {
        "en": {
            "header": {
                "Hi": "Hi",
                "I'm": "I'm",
                "MING": "MING",
                "Glad to see you here": "Glad to see you here"
            },
            "about": {
                "I'm a": "I'm a",
                "Software Engineer": "Software Engineer",
                "working on": "working on",
                "UI Design,": "UI Design,",
                "App Development,": "App Development,",
                "Neural Network,": "Neural Network,",
                "and": "and",
                "Deep Machine Learning Research.": "Deep Machine Learning Research.",
                "As an": "As an",
                "outgoing & motivated": "outgoing & motivated",
                "person with": "person with",
                "unlimited": "unlimited",
                "creativity": "creativity",
                "studying within a great IT environment.": "studying within a great IT environment.",
                "Eager to work in a large and professional MNC in Design and Programming related industry": "Eager to work in a large and professional MNC in Design and Programming related industry",
                "in the future.": "in the future."
            },
            "achievements": {
                "5": "5",
                "#1": "#1",
                "Trusted by customers from over 175 countries and regions": "Trusted by customers from over 175 countries and regions",
                "People love my apps, and I'd believe you will, too.": "People love my apps, and I'd believe you will, too.",
                "Graphics & Design App in Uzbekistan": "Graphics & Design App in Uzbekistan",
                "Developer Tools in Kuwait": "Developer Tools in Kuwait",
                "Developer Tools in Taiwan": "Developer Tools in Taiwan",
                "Developer Tools in Canada": "Developer Tools in Canada",
                "Developer Tools in the United States": "Developer Tools in the United States",
                "Apple Worldwide Developers Conference (WWDC)": "Apple Worldwide Developers Conference (WWDC)",
                "Winner": "Winner",
                "Paid Apps in Different Categories Globally": "Paid Apps in Different Categories Globally",
                "Top-100": "Top-100",
                "Unsplash 3D & Photography": "Unsplash 3D & Photography",
                "til Now": "til Now",
                "Total Views": "Total Views",
                "Over 500,000": "Over 500,000",
                "Total Releases": "Total Releases",
                "Average Views": "Average Views",
                "Over 100,000": "Over 100,000"
            },
            "skills": {
                "Skills & Languages": "Skills & Languages",
                "Certified": "Certified",
                "Softwares": "Softwares",
                "Languages & Technologies": "Languages & Technologies",
                "Speak & Write": "Speak & Write",
                "*Random sort - does not mean the order of proficient level": "*Random sort - does not mean the order of proficient level"
            },
            "experience": {
                "Experience": "Experience",
                "Works and society contributions.": "Works and society contributions."
            },
            "projects": {
                "Projects": "Projects",
                "Find out the latest inspiration.": "Find out the latest inspiration."
            },
            "blog": {
                "Blog": "Blog",
                "Find out the latest posts and tutorials.": "Find out the latest posts and tutorials."
            },
            "ai": {
                "AI": "AI",
                "The latest prompt design and experimental results.": "The latest prompt design and experimental results.",
                "🏆 Hall of Fame": "🏆 Hall of Fame",
                "Open in Discord": "Open in Discord",
                "NEW": "NEW",
                "DALL·E 2 Experimental": "DALL·E 2 Experimental",
                "Create a 3D model of a cute and playful red panda sitting on a tree branch in a lush forest. The red panda should be depicted with soft, fluffy fur in...": "Create a 3D model of a cute and playful red panda sitting on a tree branch in a lush forest. The red panda should be depicted with soft, fluffy fur in...",
                "Create a line of high-performance athletic shoes that are not only functional but also visually stunning, featuring innovative design elements and cutting-edge technology.": "Create a line of high-performance athletic shoes that are not only functional but also visually stunning, featuring innovative design elements and cutting-edge technology.",
                "Create a series of whimsical illustrations that tell a story of a magical forest filled with mtstical creatures and hidden secrets.": "Create a series of whimsical illustrations that tell a story of a magical forest filled with mtstical creatures and hidden secrets.",
                "Design a modern and sustainable urban building that seamlessly blends with its surroundings and serves as a community hub for both business and leisure.": "Design a modern and sustainable urban building that seamlessly blends with its surroundings and serves as a community hub for both business and leisure.",
                "In the heart of Tokyo, a young girl with bright pink hair made her way through the bustling city streets her eyes fixed on the horizon. She was on a...": "In the heart of Tokyo, a young girl with bright pink hair made her way through the bustling city streets her eyes fixed on the horizon. She was on a...",
                "The sun was setting over the city skyline as a sleek black cat crept along the rooftop, her eyes fixed on the street below. She was on a mission...": "The sun was setting over the city skyline as a sleek black cat crept along the rooftop, her eyes fixed on the street below. She was on a mission...",
                "In a Disney Pixar-inspired anime-manga, the protagonist, a magical creature named Hikari, embarks on a journey to find the lost kingdom of Fantasia...": "In a Disney Pixar-inspired anime-manga, the protagonist, a magical creature named Hikari, embarks on a journey to find the lost kingdom of Fantasia...",
                "Laboratory": "Laboratory",
                "Models are running on cloud servers.": "Models are running on cloud servers.",
                "Feel free to tryout and share your thoughts via contact below.": "Feel free to tryout and share your thoughts via contact below."
            },
            "faq": {
                "Ask": "Ask",
                "Cannot find what you are looking for": "Cannot find what you are looking for",
                "Contact now.": "Contact now.",
                "How to support your projects?": "How to support your projects?",
                "Github Sponsorship": "Github Sponsorship",
                "Where does your Open Source Software (OSS) project host?": "Where does your Open Source Software (OSS) project host?"
            },
            "contact": {
                "Contact": "Contact",
                "Email or Chat Available. Response in 72 hours.": "Email or Chat Available. Response in 72 hours.",
                "Email": "Email"
            },
            "credits": {
                "Special Thanks": "Special Thanks"
            },
            "footer": {
                "Made with": "Made with",
                "by MING": "by MING",
                "Ver.": "Ver.",
                "Since": "Since",
                "Open Source": "Open Source",
                ".": ".",
                ",": ",",
                "Compatible with": "Compatible with",
                "You come from": "You come from"
            }
        },
        "zh": {
            "header": {
                "Hi": "嗨",
                "I'm": "我是",
                "MING": "铭",
                "Glad to see you here": "很高兴在这里见到你"
            },
            "about": {
                "I'm a": "我是一名",
                "Software Engineer": "软件工程师",
                "working on": "致力于",
                "UI Design,": "用户界面设计，",
                "App Development,": "应用程式开发，",
                "Neural Network,": "人工神经网络规划，",
                "and": "以及",
                "Deep Machine Learning Research.": "深度机器学习研究。",
                "As an": "作为一个",
                "outgoing & motivated": "外向且积极进取",
                "person with": "的人，具有",
                "unlimited": "无限",
                "creativity": "的创造力",
                "studying within a great IT environment.": "在优秀的 IT 环境中学习。",
                "Eager to work in a large and professional MNC in Design and Programming related industry": "渴望未来在设计和编程相关专业行业的大型跨国公司工作",
                "in the future.": "。"
            },
            "achievements": {
                "5": "五个",
                "#1": "第一",
                "Trusted by customers from over 175 countries and regions": "深受超过 175 个国家和地区客户的信赖",
                "People love my apps, and I'd believe you will, too.": "人们喜欢我的应用程式，我相信你也会喜欢的。",
                "Graphics & Design App in Uzbekistan": "乌兹别克 App Store 开发者工具",
                "Developer Tools in Kuwait": "科威特 App Store 开发者工具",
                "Developer Tools in Taiwan": "台湾 App Store 开发者工具",
                "Developer Tools in Canada": "加拿大 App Store 开发者工具",
                "Developer Tools in the United States": "美国 App Store 开发者工具",
                "Apple Worldwide Developers Conference (WWDC)": "Apple WWDC 全球开发者大会",
                "Winner": "获奖",
                "Paid Apps in Different Categories Globally": "全球不同类别的应用排行",
                "Top-100": "前一百",
                "Unsplash 3D & Photography": "Unsplash 3D 和摄影",
                "til Now": "至今",
                "Total Views": "总浏览量",
                "Over 500,000": "超过 五十万 以上",
                "Total Releases": "作品量",
                "Average Views": "作品平均浏览量",
                "Over 100,000": "超过 十万 以上"
            },
            "skills": {
                "Skills & Languages": "技能和语言",
                "Certified": "认证",
                "Softwares": "软体",
                "Languages & Technologies": "技术语言",
                "Speak & Write": "说话和写作",
                "*Random sort - does not mean the order of proficient level": "*随机排序-并不意味着熟练水准的顺序"
            },
            "experience": {
                "Experience": "经验",
                "Works and society contributions.": "工作和社会贡献。"
            },
            "projects": {
                "Projects": "开源专案",
                "Find out the latest inspiration.": "查找最新项目（只提供英语版本）。"
            },
            "blog": {
                "Blog": "文章专栏",
                "Find out the latest posts and tutorials.": "查找最新的文章和教程（只提供英语版本）。"
            },
            "ai": {
                "AI": "人工智能",
                "The latest prompt design and experimental results.": "最新提示设计和实验结果。",
                "🏆 Hall of Fame": "🏆 荣誉殿堂",
                "Open in Discord": "在 Discord 中打开",
                "NEW": "新的",
                "DALL·E 2 Experimental": "DALL·E 2 实验",
                "Create a 3D model of a cute and playful red panda sitting on a tree branch in a lush forest. The red panda should be depicted with soft, fluffy fur in...": "创建一个可爱俏皮的小熊猫坐在茂密森林中的树枝上的 3D 模型。小熊猫应该被描绘成具有柔软、蓬松的皮毛……",
                "Create a line of high-performance athletic shoes that are not only functional but also visually stunning, featuring innovative design elements and cutting-edge technology.": "创造一系列高性能运动鞋，不仅功能强大，而且视觉上令人惊叹，采用创新设计元素和尖端技术。",
                "Create a series of whimsical illustrations that tell a story of a magical forest filled with mtstical creatures and hidden secrets.": "创建一系列异想天开的插图，讲述一个充满神奇生物和隐藏秘密的神奇森林的故事。",
                "Design a modern and sustainable urban building that seamlessly blends with its surroundings and serves as a community hub for both business and leisure.": "设计一座现代且可持续发展的城市建筑，与周围环境无缝融合，并作为商务和休闲的社区中心。",
                "In the heart of Tokyo, a young girl with bright pink hair made her way through the bustling city streets her eyes fixed on the horizon. She was on a...": "在东京的中心，一个有着亮粉色头发的年轻女孩穿过繁华的城市街道，她的眼睛盯着地平线。她在...",
                "The sun was setting over the city skyline as a sleek black cat crept along the rooftop, her eyes fixed on the street below. She was on a mission...": "太阳落在城市天际线上，一只光滑的黑猫沿着屋顶爬行，她的眼睛盯着下面的街道。她正在执行任务……"
            },
            "faq": {
                "Ask": "查询",
                "Cannot find what you are looking for": "无法找到您想要的",
                "Contact now.": "现在联系",
                "How to support your projects?": "如何支持您的项目？",
                "Github Sponsorship": "Github 赞助",
                "Where does your Open Source Software (OSS) project host?": "您的开源软件 (OSS) 项目在哪里托管？"
            },
            "contact": {
                "Contact": "联系",
                "Email or Chat Available. Response in 72 hours.": "请使用电子邮件。72 小时内回覆。",
                "Email": "电邮"
            },
            "credits": {
                "Special Thanks": "特别感谢"
            },
            "footer": {
                "Made with": "MING 用 ",
                "by MING": "制作",
                "Ver.": "版本",
                "Since": "自",
                "Open Source": "完全开源",
                ".": "。",
                ",": "，",
                "Compatible with": "兼容",
                "You come from": "您的 IP 源自"
            }
        },
        "zh-HK": {
            "header": {
                "Hi": "嗨",
                "I'm": "我是",
                "MING": "銘",
                "Glad to see you here": "很高興在這裡見到你"
            },
            "about": {
                "I'm a": "我是一名",
                "Software Engineer": "軟件工程師",
                "working on": "致力於",
                "UI Design,": "用戶界面設計，",
                "App Development,": "應用程式開發，",
                "Neural Network,": "人工神經網絡規劃，",
                "and": "以及",
                "Deep Machine Learning Research.": "深度機器學習研究。",
                "As an": "作為一個",
                "outgoing & motivated": "外向且積極進取",
                "person with": "的人，具有",
                "unlimited": "無限",
                "creativity": "的創造力",
                "studying within a great IT environment.": "在優秀的 IT 環境中學習。",
                "Eager to work in a large and professional MNC in Design and Programming related industry": "渴望未來在設計和編程相關專業行業的大型跨國公司工作",
                "in the future.": "。"
            },
            "achievements": {
                "5": "五個",
                "#1": "第一",
                "Trusted by customers from over 175 countries and regions": "深受超過 175 個國家和地區客戶的信賴",
                "People love my apps, and I'd believe you will, too.": "人們喜歡我的應用程式，我相信你也會喜歡的。",
                "Graphics & Design App in Uzbekistan": "烏茲別克 App Store 開發者工具",
                "Developer Tools in Kuwait": "科威特 App Store 開發者工具",
                "Developer Tools in Taiwan": "台灣 App Store 開發者工具",
                "Developer Tools in Canada": "加拿大 App Store 開發者工具",
                "Developer Tools in the United States": "美國 App Store 開發者工具",
                "Apple Worldwide Developers Conference (WWDC)": "Apple WWDC 全球開發者大會",
                "Winner": "獲獎",
                "Paid Apps in Different Categories Globally": "全球不同類別的應用排行",
                "Top-100": "前一百",
                "Unsplash 3D & Photography": "Unsplash 3D 和攝影",
                "til Now": "至今",
                "Total Views": "總瀏覽量",
                "Over 500,000": "超過 五十萬 以上",
                "Total Releases": "作品量",
                "Average Views": "作品平均瀏覽量",
                "Over 100,000": "超過 十萬 以上"
            },
            "skills": {
                "Skills & Languages": "技能和語言",
                "Certified": "認證",
                "Softwares": "軟體",
                "Languages & Technologies": "技術語言",
                "Speak & Write": "說話和寫作",
                "*Random sort - does not mean the order of proficient level": "*隨機排序-並不意味著熟練水準的順序"
            },
            "experience": {
                "Experience": "經驗",
                "Works and society contributions.": "工作和社會貢獻。"
            },
            "projects": {
                "Projects": "開源專案",
                "Find out the latest inspiration.": "查找最新項目（只提供英語版本）。"
            },
            "blog": {
                "Blog": "文章專欄",
                "Find out the latest posts and tutorials.": "查找最新的文章和教程（只提供英語版本）。"
            },
            "ai": {
                "AI": "人工智能",
                "The latest prompt design and experimental results.": "最新提示設計和實驗結果。",
                "🏆 Hall of Fame": "🏆 榮譽殿堂",
                "Open in Discord": "在 Discord 中打開",
                "NEW": "新的",
                "DALL·E 2 Experimental": "DALL·E 2 實驗",
                "Create a 3D model of a cute and playful red panda sitting on a tree branch in a lush forest. The red panda should be depicted with soft, fluffy fur in...": "創建一個可愛俏皮的小熊貓坐在茂密森林中的樹枝上的 3D 模型。小熊貓應該被描繪成具有柔軟、蓬鬆的皮毛……",
                "Create a line of high-performance athletic shoes that are not only functional but also visually stunning, featuring innovative design elements and cutting-edge technology.": "創造一系列高性能運動鞋，不僅功能強大，而且視覺上令人驚嘆，採用創新設計元素和尖端技術。",
                "Create a series of whimsical illustrations that tell a story of a magical forest filled with mtstical creatures and hidden secrets.": "創建一系列異想天開的插圖，講述一個充滿神奇生物和隱藏秘密的神奇森林的故事。",
                "Design a modern and sustainable urban building that seamlessly blends with its surroundings and serves as a community hub for both business and leisure.": "設計一座現代且可持續發展的城市建築，與周圍環境無縫融合，並作為商務和休閒的社區中心。",
                "In the heart of Tokyo, a young girl with bright pink hair made her way through the bustling city streets her eyes fixed on the horizon. She was on a...": "在東京的中心，一個有著亮粉色頭髮的年輕女孩穿過繁華的城市街道，她的眼睛盯著地平線。她在...",
                "The sun was setting over the city skyline as a sleek black cat crept along the rooftop, her eyes fixed on the street below. She was on a mission...": "太陽落在城市天際線上，一隻光滑的黑貓沿著屋頂爬行，她的眼睛盯著下面的街道。她正在執行任務……",
                "In a Disney Pixar-inspired anime-manga, the protagonist, a magical creature named Hikari, embarks on a journey to find the lost kingdom of Fantasia...": "在迪士尼皮克斯風格的動漫漫畫中，主角，一個名為光的神奇生物，開始了尋找失落的幻想曲王國的旅程...",
                "Laboratory": "實驗室",
                "Models are running on cloud servers.": "模型在雲服務器上運行。",
                "Feel free to tryout and share your thoughts via contact below.": "隨時嘗試並通過下面的聯繫方式分享您的想法。"
            },
            "faq": {
                "Ask": "查詢",
                "Cannot find what you are looking for": "無法找到您想要的",
                "Contact now.": "現在聯繫",
                "How to support your projects?": "如何支持您的項目？",
                "Github Sponsorship": "Github 贊助",
                "Where does your Open Source Software (OSS) project host?": "您的開源軟件 (OSS) 項目在哪里托管？"
            },
            "contact": {
                "Contact": "聯繫",
                "Email or Chat Available. Response in 72 hours.": "請使用電子郵件。72 小時內回覆。",
                "Email": "電郵"
            },
            "credits": {
                "Special Thanks": "特別感謝"
            },
            "footer": {
                "Made with": "MING 用 ",
                "by MING": "製作",
                "Ver.": "版本",
                "Since": "自",
                "Open Source": "完全開源",
                ".": "。",
                ",": "，",
                "Compatible with": "兼容",
                "You come from": "您的 IP 源自"
            }
        },
        "ko": {
            "header": {
                "Hi": "안녕하세요",
                "I'm": "저는",
                "MING": "밍",
                "Glad to see you here": "여기서 만나서 반가워요"
            },
            "about": {
                "I'm a": "저는",
                "Software Engineer": "소프트웨어 엔지니어",
                "working on": "작업 중",
                "UI Design,": "UI 디자인,",
                "App Development,": "앱 개발,",
                "Neural Network,": "신경망,",
                "and": "과",
                "Deep Machine Learning Research.": "딥 머신 러닝 연구.",
                "As an": "A와",
                "outgoing & motivated": "외향적이고 의욕적인",
                "person with": "를 가진 사람",
                "unlimited": "무제한",
                "creativity": "창의성",
                "studying within a great IT environment.": "훌륭한 IT 환경에서 공부하세요.",
                "Eager to work in a large and professional MNC in Design and Programming related industry": "디자인 및 프로그래밍 관련 업계의 크고 전문적인 다국적 기업에서 일하고 싶습니다.",
                "in the future.": "미래에는."
            },
            "achievements": {
                "5": "5",
                "#1": "#1",
                "Trusted by customers from over 175 countries and regions": "175개 이상의 국가 및 지역의 고객으로부터 신뢰를 받고 있습니다.",
                "People love my apps, and I'd believe you will, too.": "사람들은 제 앱을 좋아하고 여러분도 그럴 것이라고 믿습니다.",
                "Graphics & Design App in Uzbekistan": "우즈베키스탄의 그래픽 및 디자인 앱",
                "Developer Tools in Kuwait": "쿠웨이트의 개발자 도구",
                "Developer Tools in Taiwan": "대만의 개발자 도구",
                "Developer Tools in Canada": "캐나다의 개발자 도구",
                "Developer Tools in the United States": "미국의 개발자 도구",
                "Apple Worldwide Developers Conference (WWDC)": "애플 월드와이드 디벨로퍼 컨퍼런스 (WWDC)",
                "Winner": "승자",
                "Paid Apps in Different Categories Globally": "전 세계 다양한 카테고리의 유료 앱",
                "Top-100": "상위 100위",
                "Unsplash 3D & Photography": "언스플래쉬 3D 및 사진",
                "til Now": "지금까지",
                "Total Views": "전체 조회수",
                "Over 500,000": "50만 이상",
                "Total Releases": "전체 릴리즈",
                "Average Views": "평균 조회수",
                "Over 100,000": "10만 명 이상"
            },
            "skills": {
                "Skills & Languages": "기술 및 언어",
                "Certified": "인증을 받았습니다",
                "Softwares": "소프트웨어",
                "Languages & Technologies": "언어 및 기술",
                "Speak & Write": "말하기 및 쓰기",
                "*Random sort - does not mean the order of proficient level": "*무작위 정렬 - 숙련된 레벨의 순서를 의미하지는 않습니다."
            },
            "experience": {
                "Experience": "경험하기",
                "Works and society contributions.": "근로 및 사회 공헌."
            },
            "projects": {
                "Projects": "프로젝트",
                "Find out the latest inspiration.": "최신 영감을 찾아보세요."
            },
            "blog": {
                "Blog": "블로그",
                "Find out the latest posts and tutorials.": "최신 게시물과 튜토리얼을 확인하세요."
            },
            "ai": {
                "AI": "인공 지능",
                "The latest prompt design and experimental results.": "최신 프롬프트 디자인 및 실험 결과.",
                "🏆 Hall of Fame": "🏆 명예의 전당",
                "Open in Discord": "디스코드에서 열기",
                "NEW": "새",
                "DALL·E 2 Experimental": "DALL·E 2 익스페리멘탈",
                "Create a 3D model of a cute and playful red panda sitting on a tree branch in a lush forest. The red panda should be depicted with soft, fluffy fur in...": "울창한 숲의 나뭇 가지에 앉아 있는 귀엽고 장난기 많은 레드 팬더를 3D 모델로 만들어 보세요.붉은색 판다는 부드럽고 푹신한 털로 그려야 합니다.",
                "Create a line of high-performance athletic shoes that are not only functional but also visually stunning, featuring innovative design elements and cutting-edge technology.": "혁신적인 디자인 요소와 최첨단 기술로 기능적일 뿐만 아니라 시각적으로도 멋진 고성능 운동화 라인을 만들어 보세요.",
                "Create a series of whimsical illustrations that tell a story of a magical forest filled with mtstical creatures and hidden secrets.": "신비로운 생물과 숨겨진 비밀로 가득한 마법의 숲에 대한 이야기를 담은 기발한 일러스트레이션 시리즈를 만들어 보세요.",
                "Design a modern and sustainable urban building that seamlessly blends with its surroundings and serves as a community hub for both business and leisure.": "주변 환경과 완벽하게 조화를 이루고 비즈니스와 레저 모두를 위한 커뮤니티 허브 역할을 하는 현대적이고 지속 가능한 도시 건물을 설계하세요.",
                "In the heart of Tokyo, a young girl with bright pink hair made her way through the bustling city streets her eyes fixed on the horizon. She was on a...": "도쿄 한복판에서 밝은 분홍색 머리를 한 어린 소녀가 지평선에 고정된 채 북적이는 도시 거리를 헤쳐나갔습니다.그녀는...",
                "The sun was setting over the city skyline as a sleek black cat crept along the rooftop, her eyes fixed on the street below. She was on a mission...": "도시의 스카이라인 너머로 해가 지고 있었고, 매끈한 검은 고양이 한 마리가 옥상을 따라 기어들어왔고, 그녀의 눈은 아래 거리에 고정되어 있었다.그녀는 임무를 수행 중이었어요..."
            },
            "faq": {
                "Ask": "물어보세요",
                "Cannot find what you are looking for": "찾으시는 내용을 찾을 수 없습니다",
                "Contact now.": "지금 연락하세요.",
                "How to support your projects?": "프로젝트를 어떻게 지원할 수 있나요?",
                "Github Sponsorship": "깃허브 스폰서십",
                "Where does your Open Source Software (OSS) project host?": "오픈소스 소프트웨어 (OSS) 프로젝트는 어디에서 호스팅되나요?"
            },
            "contact": {
                "Contact": "연락처",
                "Email or Chat Available. Response in 72 hours.": "이메일 또는 채팅 가능.72 시간 내에 응답합니다.",
                "Email": "이메일"
            },
            "credits": {
                "Special Thanks": "특별 감사"
            },
            "footer": {
                "Made with": "로 제작",
                "by MING": "작성자: MING",
                "Ver.": "버전.",
                "Since": "이후",
                "Open Source": "오픈 소스",
                ".": ".",
                ",": ",",
                "Compatible with": "호환 가능 제품",
                "You come from": "당신은 출신입니다"
            }
        },
        "ja": {
            "header": {
                "Hi": "こんにちは",
                "I'm": "私は",
                "MING": "銘",
                "Glad to see you here": "ここでお会いできてうれしいです"
            },
            "about": {
                "I'm a": "私は",
                "Software Engineer": "ソフトウェアエンジニア",
                "working on": "取り組んでいます",
                "UI Design,": "UI デザイン、",
                "App Development,": "アプリ開発、",
                "Neural Network,": "ニューラルネットワーク、",
                "and": "そして",
                "Deep Machine Learning Research.": "ディープ機械学習研究。",
                "As an": "として",
                "outgoing & motivated": "社交的でやる気がある",
                "person with": "を持つ人",
                "unlimited": "無制限",
                "creativity": "創造性",
                "studying within a great IT environment.": "素晴らしいIT環境の中で勉強しています。",
                "Eager to work in a large and professional MNC in Design and Programming related industry": "デザインおよびプログラミング関連業界の大規模でプロフェッショナルな多国籍企業で働きたい",
                "in the future.": "将来的には。"
            },
            "achievements": {
                "5": "5",
                "#1": "#1",
                "Trusted by customers from over 175 countries and regions": "175以上の国と地域のお客様から信頼されています",
                "People love my apps, and I'd believe you will, too.": "みんな私のアプリが大好きで、あなたもきっと気に入ると思います。",
                "Graphics & Design App in Uzbekistan": "ウズベキスタンのグラフィック＆デザインアプリ",
                "Developer Tools in Kuwait": "クウェートの開発者ツール",
                "Developer Tools in Taiwan": "台湾の開発者ツール",
                "Developer Tools in Canada": "カナダの開発者ツール",
                "Developer Tools in the United States": "米国の開発者ツール",
                "Apple Worldwide Developers Conference (WWDC)": "アップル・ワールドワイド・デベロッパーズ・カンファレンス (WWDC)",
                "Winner": "勝者",
                "Paid Apps in Different Categories Globally": "世界中のさまざまなカテゴリの有料アプリ",
                "Top-100": "トップ100",
                "Unsplash 3D & Photography": "アンスプラッシュ 3D & フォトグラフィー",
                "til Now": "今まで",
                "Total Views": "合計視聴回数",
                "Over 500,000": "50万以上",
                "Total Releases": "リリース総数",
                "Average Views": "平均視聴回数",
                "Over 100,000": "10万人以上"
            },
            "skills": {
                "Skills & Languages": "スキルと言語",
                "Certified": "認定済み",
                "Softwares": "ソフトウェア",
                "Languages & Technologies": "言語とテクノロジー",
                "Speak & Write": "スピーク・アンド・ライティング",
                "*Random sort - does not mean the order of proficient level": "*ランダムソート-熟練度順ではありません"
            },
            "experience": {
                "Experience": "エクスペリエンス",
                "Works and society contributions.": "作品と社会への貢献。"
            },
            "projects": {
                "Projects": "プロジェクト",
                "Find out the latest inspiration.": "最新のインスピレーションをご覧ください。"
            },
            "blog": {
                "Blog": "ブログ",
                "Find out the latest posts and tutorials.": "最新の投稿とチュートリアルをご覧ください。"
            },
            "ai": {
                "AI": "人工知能",
                "The latest prompt design and experimental results.": "最新のプロンプトデザインと実験結果。",
                "🏆 Hall of Fame": "🏆 ホール・オブ・フェイム",
                "Open in Discord": "Discordで開く",
                "NEW": "新規",
                "DALL·E 2 Experimental": "DAL·E 2 エクスペリメンタル",
                "Create a 3D model of a cute and playful red panda sitting on a tree branch in a lush forest. The red panda should be depicted with soft, fluffy fur in...": "緑豊かな森の木の枝に座っているかわいくて遊び心のあるレッサーパンダの3Dモデルを作りましょう。レッサーパンダは、柔らかくてふわふわの毛皮で描かれるべきです...",
                "Create a line of high-performance athletic shoes that are not only functional but also visually stunning, featuring innovative design elements and cutting-edge technology.": "革新的なデザイン要素と最先端のテクノロジーを取り入れた、機能性だけでなく視覚的にも美しい高性能アスレチックシューズのラインを作りましょう。",
                "Create a series of whimsical illustrations that tell a story of a magical forest filled with mtstical creatures and hidden secrets.": "神秘的な生き物と隠された秘密に満ちた魔法の森の物語を伝える一風変わったイラストのシリーズを作成してください。",
                "Design a modern and sustainable urban building that seamlessly blends with its surroundings and serves as a community hub for both business and leisure.": "周囲とシームレスに調和し、ビジネスとレジャーの両方のコミュニティハブとして機能する、モダンで持続可能な都市建物を設計してください。",
                "In the heart of Tokyo, a young girl with bright pink hair made her way through the bustling city streets her eyes fixed on the horizon. She was on a...": "東京の中心部で、明るいピンクの髪の少女が、地平線に目を向けながらにぎやかな街の通りを通り抜けました。彼女は...",
                "The sun was setting over the city skyline as a sleek black cat crept along the rooftop, her eyes fixed on the street below. She was on a mission...": "おしゃれな黒い猫が屋上に忍び寄り、下の通りに目を向けていると、街のスカイラインに太陽が沈みかけていました。彼女は使命を帯びていた..."
            },
            "faq": {
                "Ask": "尋ねる",
                "Cannot find what you are looking for": "お探しのものが見つからない",
                "Contact now.": "今すぐお問い合わせください。",
                "How to support your projects?": "プロジェクトをサポートするには？",
                "Github Sponsorship": "Github スポンサーシップ",
                "Where does your Open Source Software (OSS) project host?": "オープンソースソフトウェア (OSS) プロジェクトはどこでホストしていますか?"
            },
            "contact": {
                "Contact": "コンタクト",
                "Email or Chat Available. Response in 72 hours.": "メールまたはチャットをご利用いただけます。72時間以内に応答します。",
                "Email": "Eメール"
            },
            "credits": {
                "Special Thanks": "スペシャルサンクス"
            },
            "footer": {
                "Made with": "で作った",
                "by MING": "ミン著",
                "Ver.": "バージョン。",
                "Since": "以来",
                "Open Source": "オープンソース",
                ".": "。",
                ",": "、",
                "Compatible with": "対応機種",
                "You come from": "あなたの出身地は"
            }
        }
    }

    const selectedLang = lang => {
        if (lang.includes('en')) return 'en'
        else if (lang.includes('ja')) return 'ja'
        else if (lang.includes('ko')) return 'ko'
        else if (lang.includes('zh-TW')) return 'zh-HK'
        else if (lang.includes('zh-MO')) return 'zh-HK'
        else if (lang.includes('zh-CN')) return 'zh'
        else return lang
    }
    res.status(200).json(i18nRaw[selectedLang(lang)])
}