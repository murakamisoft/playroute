-- ============================================
-- ユーザー情報
-- ============================================
CREATE TABLE m_user (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    budget_limit NUMERIC(10,2),           -- 予算上限
    default_transport VARCHAR(20),        -- 車・電車・徒歩
    interests TEXT,                        -- 興味ジャンル（カンマ区切りなど）
    created_at TIMESTAMP DEFAULT NOW(),
    created_by VARCHAR(100),               -- 作成者
    updated_at TIMESTAMP DEFAULT NOW(),
    updated_by VARCHAR(100)                -- 更新者
);

-- ============================================
-- スポット情報
-- ============================================
CREATE TABLE m_spot (
    spot_id SERIAL PRIMARY KEY,
    spot_name VARCHAR(100) NOT NULL,
    type VARCHAR(50),                      -- カフェ、キャンプ、バーなど
    lat NUMERIC(9,6),                      -- 緯度
    lng NUMERIC(9,6),                      -- 経度
    cost NUMERIC(10,2),                    -- 想定費用
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by VARCHAR(100),               -- 作成者
    updated_at TIMESTAMP DEFAULT NOW(),
    updated_by VARCHAR(100)                -- 更新者
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
    spots JSONB,                            -- プラン内のスポット一覧（JSON形式）
    created_at TIMESTAMP DEFAULT NOW(),
    created_by VARCHAR(100),               -- 作成者
    updated_at TIMESTAMP DEFAULT NOW(),
    updated_by VARCHAR(100)                -- 更新者
);

-- ============================================
-- プランスポット詳細
-- ============================================
CREATE TABLE t_plan_spot (
    id SERIAL PRIMARY KEY,
    plan_id INT NOT NULL REFERENCES t_plan(plan_id),
    spot_id INT NOT NULL REFERENCES m_spot(spot_id),
    spot_order INT NOT NULL,               -- ルート順
    duration INTERVAL,                      -- 滞在時間
    created_at TIMESTAMP DEFAULT NOW(),
    created_by VARCHAR(100),               -- 作成者
    updated_at TIMESTAMP DEFAULT NOW(),
    updated_by VARCHAR(100)                -- 更新者
);
