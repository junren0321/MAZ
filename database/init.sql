USE MAZ;
SET NAMES utf8mb4;

INSERT INTO users (
    username,
    email,
    birthdate,
    password,
    profilePic_filename
) VALUES
(
    'gyeo',
    'yeoguanwei@gmail.com',
    '2003-02-23',
    '$2a$10$4cuKVRO4uIbHFEdzng1C1uLp5FoBJ/1IOwNpnalcXh0XjV2WbImwi', -- g123456
    'profile-4.png'
),
(
    'huan',
    'songhuantw@gmail.com',
    '2002-02-06',
    '$2a$10$lBTkWRgyFPWTMpPI3RqBVuOKZThWHQLh6M8Td/JGEJ94zJnRCYHXu', -- h123456
    'profile-default.png'
),
(
    'yanjenn',
    'angelaho89@gmail.com',
    '2006-11-16', -- 年年18歲
    '$2a$10$.2ms57i0I.z.Nmtyv2TCZeZIenDy4BiTYI9aCLdSLLsWmKhT4krqK', -- y123456
    'profile-default.png'
);

INSERT INTO books (
    filename,
    name,
    authors,
    language,
    tags,
    publisher,
    publish_date,
    translated_by,
    uploaded_by,
    page_count,
    isbn,
    description
) VALUES
(
    'python.pdf', -- 這一本用來測Reviews
    'python - 從入門到放棄',
    ',鬼父,黑獸,',
    'Chinese',
    ',Art,Others,Science Fiction,',
    '鬼父團',
    '1900-11-11',
    '本子漢化組',
    1,
    69,
    '1000000001',
    '哥，刪了唄，我是無所謂的，但是我一個朋友他可能有點汗流浹背了，他不太舒服想睡了。
    
    當然不是我哈，我一直都是行的，以一個旁觀者的心態看，也不至于破防吧，就是想照顧下我朋友的感受，他有點破防了，還是建議刪了吧，當然刪不刪随你哈，我是沒啥感覺的，就是為朋友感到不平罷了，也不是那么簡單就破防的。'
),
(
    'forest.pdf',
    '挪威的森林',
    ',村上春樹,',
    'Chinese',
    ',Emotions,Life Lessons,',
    '上海譯文出版社',
    '2024-06-13',
    '林少華',
    1,
    416,
    '9789571374697',
    '正如我這個人會被喜歡或不喜歡一樣，我想這本小說必然也會被人喜歡或不喜歡。對我來說，我只希望這部作品能夠凌駕我這個人而存續下去。──村上春樹
    
    無論每個人都有著所謂不存在的地方。
    某個時刻這個故事將會引導你。
    如同內心深處的森林。
    
    聆聽沉睡在心中的話語。
    彷彿全世界的雨落在全世界的草地上的寂靜中，我閉上了雙眼。
    當飛機穿過陰暗沉重的雨雲，降落在漢堡機場時，頭頂上的揚聲器輕聲地播放了披頭四的「挪威的森林」。我想起了一九六九年、將滿二十歲那年秋天所發生的事。
    
    1987年 挪威的森林
    奠定村上春樹地位
    戀愛小說不朽經典
    總銷量累積至今，突破千萬冊
    改編電影入選第67屆威尼斯影展正式競賽片
    一部有著「激情、寂靜、悲哀」的愛情故事
    一部百分之百的愛情小說
    
    一部設定在六O年代日本學運時代的東京少年故事，主角與兩名女子的愛情物語，一個有著恬靜形象、另一個則像旺盛的生命動力，村上自己曾說《挪威的森林》是一部有著「激情、寂靜、悲哀」的愛情故事，一部百分之百的愛情小說。'
),
(
    'eqiq.pdf',
    '情商',
    ',丹尼爾·瓦爾曼,',
    'Chinese',
    ',Emotions,',
    '中信出版社',
    '2024-06-13',
    '楊春曉',
    1,
    69,
    '9787508622361',
    'Something I dont have, however, I have EMOTIONAL DAMAGE.'
),
(
    'emo.pdf',
    'Overcoming Depression',
    ',Paul Gilbert,',
    'English',
    ',Emotions,',
    '笑死出版社',
    '2024-06-13',
    '陳文章',
    2,
    300,
    '696969696969',
    'I am gay, I mean happy.'
),
(
    'iamcat.pdf',
    '夏目漱石四部作',
    ',夏目漱石,',
    'Others',
    ',Imagination,Others,',
    'サンダーロケット',
    '2024-06-13',
    'ワンピース',
    2,
    300,
    '1111111111111',
    '私は太ったオタクです'
),
(
    'icecream.pdf',
    '冰菓',
    ',米澤穗信,',
    'Chinese',
    ',fiction,adventure,',
    '角川書店',
    '2024-06-13',
    '',
    2,
    300,
    '222222222222',
    '這部好看。推~'
),
(
    'photoshop.pdf',
    'Adobe Photoshop CC經典教程',
    ',美國ADOBE公司,',
    'Chinese',
    ',Others,',
    '人民郵電出版社',
    '2024-06-13',
    '周涛',
    3,
    319,
    '9787115391452',
    'Thank you for your contribution to the WEBAPP Group D.'
),
(
    'brain.pdf',
    '重塑大腦迴路：如何借助神經科學走出抑鬱症',
    ',亞歷克斯·科布,',
    'Chinese',
    ',fiction,adventure,',
    '機械工業出版社',
    '2024-06-13',
    '周涛',
    1,
    300,
    '9787111596813',
    '抑鬱症就像一個惡性循環，把你帶入悲傷、疲勞和冷漠的旋渦。神經科學家亞曆克斯·科布在本書中通俗易懂地講解了大腦如何導致抑鬱症，並提供了大量簡單有效的生活實用方法，幫助受到抑鬱困擾的讀者改善情緒，重新找回生活的美好和活力。本書基於新的神經科學研究，提供了許多簡單的技巧，你可以每天“重新連接”自己的大腦，創建一種更快樂、更健康的良性迴圈。'
);

INSERT INTO Reviews (
    userId,
    bookId,
    review
) VALUES
(
    1,
    1,
    '一日為父，終生為師。'
),
(
    1,
    1,
    '一日鬼父，終生為濕。'
),
(
    2,
    1,
    '所言甚是，
    
    好詩
        好濕。' -- tab 無效
),
(
    3,
    1,
    'three small dialogue = ='
);
