-- ユーザーサンプル
INSERT INTO m_user (user_name, budget_limit, default_transport, interests, created_by, updated_by)
VALUES 
('のり', 10000, '車', '釣り,キャンプ,サッカー', 'system', 'system'),
('ゆかり', 8000, '徒歩', 'カフェ,映画', 'system', 'system');

-- スポットサンプル
INSERT INTO m_spot (spot_name, type, lat, lng, cost, description, created_by, updated_by)
VALUES
('渋谷カフェ', 'カフェ', 35.659108, 139.703728, 1200, '渋谷駅近くのカフェ', 'system', 'system'),
('奥多摩キャンプ場', 'キャンプ', 35.8365, 139.1767, 5000, '自然豊かなキャンプ場', 'system', 'system');

-- プランサンプル
INSERT INTO t_plan (user_id, start_time, end_time, total_cost, spots, created_by, updated_by)
VALUES
(1, '2025-10-20 09:00', '2025-10-20 18:00', 6200, '[{"spot_id":1,"order":1},{"spot_id":2,"order":2}]', 'system', 'system');

-- プランスポット詳細サンプル
INSERT INTO t_plan_spot (plan_id, spot_id, spot_order, duration, created_by, updated_by)
VALUES
(1, 1, 1, '02:00:00', 'system', 'system'),
(1, 2, 2, '05:00:00', 'system', 'system');
