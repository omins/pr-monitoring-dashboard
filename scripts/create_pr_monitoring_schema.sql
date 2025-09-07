-- K-Intelligence PR Monitoring System Database Schema
-- PostgreSQL schema for PR monitoring dashboard

-- Create database (run this separately if needed)
-- CREATE DATABASE pr_monitoring;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Briefings table - stores daily briefing reports
CREATE TABLE briefings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL UNIQUE,
    report_at TIMESTAMP WITH TIME ZONE NOT NULL,
    content TEXT NOT NULL,
    total_articles INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table - stores article categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    briefing_id UUID NOT NULL REFERENCES briefings(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Articles table - stores individual articles
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    source VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    count INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crisis alerts table - stores crisis monitoring alerts
CREATE TABLE crisis_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    level VARCHAR(20) NOT NULL CHECK (level IN ('danger', 'warning', 'info')),
    title VARCHAR(500) NOT NULL,
    url TEXT NOT NULL,
    journalist_name VARCHAR(255),
    journalist_phone VARCHAR(50),
    reason TEXT NOT NULL,
    key_sentence TEXT NOT NULL,
    action_plan TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'monitoring')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System status table - stores system monitoring metrics
CREATE TABLE system_status (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric VARCHAR(255) NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('normal', 'warning', 'critical')),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trending keywords table - stores trending keywords for each briefing
CREATE TABLE trending_keywords (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    briefing_id UUID NOT NULL REFERENCES briefings(id) ON DELETE CASCADE,
    keyword VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insights table - stores insights for each briefing
CREATE TABLE insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    briefing_id UUID NOT NULL REFERENCES briefings(id) ON DELETE CASCADE,
    insight TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_briefings_date ON briefings(date);
CREATE INDEX idx_categories_briefing_id ON categories(briefing_id);
CREATE INDEX idx_articles_category_id ON articles(category_id);
CREATE INDEX idx_crisis_alerts_level ON crisis_alerts(level);
CREATE INDEX idx_crisis_alerts_status ON crisis_alerts(status);
CREATE INDEX idx_crisis_alerts_created_at ON crisis_alerts(created_at);
CREATE INDEX idx_system_status_metric ON system_status(metric);
CREATE INDEX idx_trending_keywords_briefing_id ON trending_keywords(briefing_id);
CREATE INDEX idx_insights_briefing_id ON insights(briefing_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_briefings_updated_at BEFORE UPDATE ON briefings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crisis_alerts_updated_at BEFORE UPDATE ON crisis_alerts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE briefings IS 'Daily briefing reports for PR monitoring';
COMMENT ON TABLE categories IS 'Article categories within each briefing';
COMMENT ON TABLE articles IS 'Individual articles within each category';
COMMENT ON TABLE crisis_alerts IS 'Crisis monitoring alerts and notifications';
COMMENT ON TABLE system_status IS 'System monitoring metrics and status';
COMMENT ON TABLE trending_keywords IS 'Trending keywords for each briefing';
COMMENT ON TABLE insights IS 'Key insights for each briefing';
