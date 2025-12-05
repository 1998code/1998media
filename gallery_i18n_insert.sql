-- SQL statements to insert i18n translations for Gallery spatial filters and photo titles
-- Table structure: position | key | en | zh | zh-HK | ko | ja

-- Filter buttons
INSERT INTO i18n (position, key, en, zh, "zh-HK", ko, ja) VALUES
('gallery', 'ALL', 'ALL', '全部', '全部', '전체', 'すべて'),
('gallery', 'Spatial Photo', 'Spatial Photo', '空间照片', '空間照片', '공간 사진', '空間写真'),
('gallery', 'Spatial Video', 'Spatial Video', '空间视频', '空間影片', '공간 비디오', '空間動画'),
('gallery', 'Panorama', 'Panorama', '全景', '全景', '파노라마', 'パノラマ'),
('gallery', 'Spatial', 'Spatial', '空间', '空間', '공간', '空間');

-- Photo titles
INSERT INTO i18n (position, key, en, zh, "zh-HK", ko, ja) VALUES
('gallery', 'Osaka Expo Panorama', 'Osaka Expo Panorama', '大阪世博会全景', '大阪世博會全景', '오사카 엑스포 파노라마', '大阪万博パノラマ'),
('gallery', 'Osaka Expo East Gate', 'Osaka Expo East Gate', '大阪世博会东门', '大阪世博會東門', '오사카 엑스포 동문', '大阪万博東ゲート'),
('gallery', 'Osaka Expo Water Plaza', 'Osaka Expo Water Plaza', '大阪世博会水广场', '大阪世博會水廣場', '오사카 엑스포 워터 플라자', '大阪万博ウォータープラザ'),
('gallery', 'Juzizhou Panorama', 'Juzizhou Panorama', '橘子洲全景', '橘子洲全景', '주즈저우 파노라마', '橘子洲パノラマ'),
('gallery', 'Juzizhou', 'Juzizhou', '橘子洲', '橘子洲', '주즈저우', '橘子洲'),
('gallery', 'Changsha South Station', 'Changsha South Station', '长沙南站', '長沙南站', '창사 남역', '長沙南駅'),
('gallery', 'Tokyo Tower Night', 'Tokyo Tower Night', '东京塔夜景', '東京塔夜景', '도쿄 타워 야경', '東京タワー夜景'),
('gallery', 'Akasaka Palace', 'Akasaka Palace', '赤坂离宫', '赤坂離宮', '아카사카 궁전', '赤坂離宮'),
('gallery', 'Golden Gate Bridge', 'Golden Gate Bridge', '金门大桥', '金門大橋', '금문교', 'ゴールデンゲートブリッジ'),
('gallery', 'San Francisco Sea', 'San Francisco Sea', '旧金山海景', '舊金山海景', '샌프란시스코 바다', 'サンフランシスコの海'),
('gallery', 'San Francisco Night Panorama', 'San Francisco Night Panorama', '旧金山夜景全景', '舊金山夜景全景', '샌프란시스코 야경 파노라마', 'サンフランシスコ夜景パノラマ'),
('gallery', 'Nagoya Rocket', 'Nagoya Rocket', '名古屋火箭', '名古屋火箭', '나고야 로켓', '名古屋ロケット'),
('gallery', 'Nagoya Station Day', 'Nagoya Station Day', '名古屋站日景', '名古屋站日景', '나고야역 낮', '名古屋駅昼'),
('gallery', 'Nagoya Station Night', 'Nagoya Station Night', '名古屋站夜景', '名古屋站夜景', '나고야역 밤', '名古屋駅夜'),
('gallery', 'Nagoya Station Night Panorama', 'Nagoya Station Night Panorama', '名古屋站夜景全景', '名古屋站夜景全景', '나고야역 야경 파노라마', '名古屋駅夜景パノラマ');

-- Note: If you want to use UPDATE instead of INSERT (in case some keys already exist), use:
-- UPDATE i18n SET en = 'ALL', zh = '全部', "zh-HK" = '全部', ko = '전체', ja = 'すべて' WHERE position = 'gallery' AND key = 'ALL';

-- Or use INSERT ... ON CONFLICT (if you have a unique constraint):
-- INSERT INTO i18n (position, key, en, zh, "zh-HK", ko, ja) VALUES
-- ('gallery', 'ALL', 'ALL', '全部', '全部', '전체', 'すべて')
-- ON CONFLICT (position, key) DO UPDATE SET
--   en = EXCLUDED.en,
--   zh = EXCLUDED.zh,
--   "zh-HK" = EXCLUDED."zh-HK",
--   ko = EXCLUDED.ko,
--   ja = EXCLUDED.ja;

