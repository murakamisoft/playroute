-- ============================================
-- 既存テーブルを削除
-- ============================================
DROP TABLE IF EXISTS t_plan_spot CASCADE;
DROP TABLE IF EXISTS t_plan CASCADE;
DROP TABLE IF EXISTS m_spot CASCADE;
DROP TABLE IF EXISTS m_user CASCADE;

-- ============================================
-- ユーザー情報
-- ============================================
CREATE TABLE m_user (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    budget_limit NUMERIC(10,2),           
    default_transport VARCHAR(20),        
    interests TEXT,                        
    created_at TIMESTAMP DEFAULT NOW(),
    created_by VARCHAR(100),               
    updated_at TIMESTAMP DEFAULT NOW(),
    updated_by VARCHAR(100)                
);

-- ============================================
-- スポット情報
-- ============================================
CREATE TABLE m_spot (
    spot_id SERIAL PRIMARY KEY,
    spot_name VARCHAR(100) NOT NULL,
    type VARCHAR(50),                      
    lat NUMERIC(9,6),                      
    lng NUMERIC(9,6),                      
    cost NUMERIC(10,2),          
    duration VARCHAR(20),          
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by VARCHAR(100),               
    updated_at TIMESTAMP DEFAULT NOW(),
    updated_by VARCHAR(100)                
);

-- ============================================
-- プラン情報
-- ============================================
CREATE TABLE t_plan (
    plan_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES m_user(user_id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    total_cost NUMERIC(10,2),
    spots JSONB,                            
    created_at TIMESTAMP DEFAULT NOW(),
    created_by VARCHAR(100),               
    updated_at TIMESTAMP DEFAULT NOW(),
    updated_by VARCHAR(100)                
);

-- ============================================
-- プランスポット詳細
-- ============================================
CREATE TABLE t_plan_spot (
    id SERIAL PRIMARY KEY,
    plan_id INT NOT NULL REFERENCES t_plan(plan_id),
    spot_id INT NOT NULL REFERENCES m_spot(spot_id),
    spot_order INT NOT NULL,
    duration INTERVAL,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by VARCHAR(100),               
    updated_at TIMESTAMP DEFAULT NOW(),
    updated_by VARCHAR(100)                
);

-- ============================================
-- コメント
-- ============================================
COMMENT ON TABLE m_user IS 'ユーザー情報を格納するテーブル';
COMMENT ON TABLE m_spot IS 'スポット情報を格納するテーブル';
COMMENT ON TABLE t_plan IS 'ユーザーの旅行プラン情報を格納するテーブル';
COMMENT ON TABLE t_plan_spot IS 'プラン内のスポット詳細を格納するテーブル';

-- ============================================
-- コメント（上書きされるので安全）
-- ============================================
COMMENT ON TABLE m_user IS 'ユーザー情報を格納するテーブル';
COMMENT ON COLUMN m_user.user_id IS 'ユーザーID（主キー、自動採番）';
COMMENT ON COLUMN m_user.user_name IS 'ユーザー名';
COMMENT ON COLUMN m_user.budget_limit IS '予算上限';
COMMENT ON COLUMN m_user.default_transport IS 'デフォルトの移動手段（車・電車・徒歩など）';
COMMENT ON COLUMN m_user.interests IS '興味ジャンル（カンマ区切りなど）';
COMMENT ON COLUMN m_user.created_at IS '作成日時（デフォルトは現在時刻）';
COMMENT ON COLUMN m_user.created_by IS '作成者';
COMMENT ON COLUMN m_user.updated_at IS '更新日時（デフォルトは現在時刻）';
COMMENT ON COLUMN m_user.updated_by IS '更新者';

COMMENT ON TABLE m_spot IS 'スポット情報を格納するテーブル';
COMMENT ON COLUMN m_spot.spot_id IS 'スポットID（主キー、自動採番）';
COMMENT ON COLUMN m_spot.spot_name IS 'スポット名';
COMMENT ON COLUMN m_spot.type IS 'スポットの種類（カフェ、キャンプ、バーなど）';
COMMENT ON COLUMN m_spot.lat IS '緯度';
COMMENT ON COLUMN m_spot.lng IS '経度';
COMMENT ON COLUMN m_spot.cost IS '想定費用';
COMMENT ON COLUMN m_spot.duration IS '滞在時間（例: 1 hour, 30 minutes など INTERVAL 形式）';
COMMENT ON COLUMN m_spot.description IS 'スポットの説明';
COMMENT ON COLUMN m_spot.created_at IS '作成日時';
COMMENT ON COLUMN m_spot.created_by IS '作成者';
COMMENT ON COLUMN m_spot.updated_at IS '更新日時';
COMMENT ON COLUMN m_spot.updated_by IS '更新者';

COMMENT ON TABLE t_plan IS 'ユーザーの旅行プラン情報を格納するテーブル';
COMMENT ON COLUMN t_plan.plan_id IS 'プランID（主キー、自動採番）';
COMMENT ON COLUMN t_plan.user_id IS 'プラン所有者のユーザーID（外部キー）';
COMMENT ON COLUMN t_plan.start_time IS 'プラン開始日時';
COMMENT ON COLUMN t_plan.end_time IS 'プラン終了日時';
COMMENT ON COLUMN t_plan.total_cost IS 'プラン合計費用';
COMMENT ON COLUMN t_plan.spots IS 'プラン内のスポット一覧（JSON形式、[{ "spot_id": 1, "order": 1 }, ...] のような構造）';
COMMENT ON COLUMN t_plan.created_at IS '作成日時';
COMMENT ON COLUMN t_plan.created_by IS '作成者';
COMMENT ON COLUMN t_plan.updated_at IS '更新日時';
COMMENT ON COLUMN t_plan.updated_by IS '更新者';

COMMENT ON TABLE t_plan_spot IS 'プラン内のスポット詳細を格納するテーブル';
COMMENT ON COLUMN t_plan_spot.id IS 'プランスポットID（主キー、自動採番）';
COMMENT ON COLUMN t_plan_spot.plan_id IS 'プランID（外部キー）';
COMMENT ON COLUMN t_plan_spot.spot_id IS 'スポットID（外部キー）';
COMMENT ON COLUMN t_plan_spot.spot_order IS 'プラン内でのスポット順';
COMMENT ON COLUMN t_plan_spot.duration IS '滞在時間（例: 1 hour, 30 minutes など INTERVAL 形式）';
COMMENT ON COLUMN t_plan_spot.created_at IS '作成日時';
COMMENT ON COLUMN t_plan_spot.created_by IS '作成者';
COMMENT ON COLUMN t_plan_spot.updated_at IS '更新日時';
COMMENT ON COLUMN t_plan_spot.updated_by IS '更新者';
