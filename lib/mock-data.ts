// Mock data for K-Intelligence PR Monitoring System
// This structure is designed to be easily migrated to Supabase

export interface BriefingData {
  id: string;
  date: string;
  report_at: string;
  content: string;
  total_articles: number;
  categories: {
    name: string;
    count: number;
    articles: {
      title: string;
      source: string;
      url: string;
      count: number;
    }[];
  }[];
  trending_keywords: string[];
  insights: string[];
}

export interface CrisisAlert {
  id: string;
  level: 'danger' | 'warning' | 'info';
  title: string;
  url: string;
  journalist_name: string;
  journalist_phone: string;
  reason: string;
  key_sentence: string;
  action_plan: string;
  created_at: string;
  status: 'active' | 'resolved' | 'monitoring';
}

export interface SystemStatus {
  id: string;
  metric: string;
  value: number;
  status: 'normal' | 'warning' | 'critical';
  last_updated: string;
}

// Mock briefing data for 3 dates
export const mockBriefings: BriefingData[] = [
  {
    id: '1',
    date: '2025-09-05',
    report_at: '2025년 9월 5일 오전 8시',
    content: `금일 KT 관련 주요 보도입니다.
보안·AI 분야 투자와 서비스 상용화가 집중 보도되었습니다.
특히 보이스피싱 탐지 2.0 상용화와 보안 투자 확대가 부각되었습니다.

업계 동향으로는 AI 기반 미디어·플랫폼 확산과 6G·위성 협력 이슈가 지속 보도되고 있습니다.`,
    total_articles: 45,
    categories: [
      {
        name: '재무 및 경영 관련 기사',
        count: 25,
        articles: [
          {
            title: '“잃는 것보다 선제 투자가 낫다”…KT 정보보안 1조 투자',
            source: '뉴시스',
            url: 'https://www.newsis.com/view/NISX20250715_0003252267',
            count: 12,
          },
          {
            title: 'KT, AI 보이스피싱 탐지 2.0 상용화',
            source: '다음뉴스',
            url: 'https://v.daum.net/v/20250729143405675',
            count: 13,
          },
        ],
      },
      {
        name: '일반 기사',
        count: 12,
        articles: [
          {
            title: 'KT, 브랜드 캠페인 영상 공개',
            source: '다음뉴스',
            url: 'https://v.daum.net/v/20240901090255927',
            count: 6,
          },
          {
            title: '경주시·KT, 영업장 6곳 “기후동맹 쉼터” 운영',
            source: '다음뉴스',
            url: 'https://v.daum.net/v/20240807225538660',
            count: 6,
          },
        ],
      },
      {
        name: '업계 동향',
        count: 8,
        articles: [
          {
            title: 'KT, AI 특화 기술로 미디어 혁신 추진',
            source: '세계일보',
            url: 'https://www.segye.com/newsView/20240429514791',
            count: 4,
          },
          {
            title: 'KT·KT SAT·KAI, 6G·저궤도 위성 협력',
            source: '뉴스1',
            url: 'https://www.news1.kr/photos/6963099',
            count: 4,
          },
        ],
      },
    ],
    trending_keywords: ['보안투자', 'AI보이스피싱', '미디어혁신', '6G위성'],
    insights: [
      'AI·보안 축으로의 투자 메시지가 강화됨',
      'AI 보이스피싱 대응 상용화로 사회적 기대감 확대',
      'AI 미디어·위성 협력 이슈로 기술 선도 이미지 부각',
    ],
  },
  {
    id: '2',
    date: '2025-09-08',
    report_at: '2025년 9월 8일 오전 8시',
    content: `금일 KT 관련 주요 보도입니다.
미디어·콘텐츠 사업 전략과 AI 투자·플랫폼 확장이 비중 있게 다뤄졌습니다.
OTT 경쟁 심화 속 대응 전략과 AI 기반 미디어 서비스 확대가 눈에 띕니다.`,
    total_articles: 38,
    categories: [
      {
        name: '재무 및 경영 관련 기사',
        count: 22,
        articles: [
          {
            title: '“글로벌 OTT 공세에 위기…콘텐츠·AI로 반격”',
            source: '뉴데일리경제',
            url: 'https://biz.newdaily.co.kr/site/data/html/2025/04/16/2025041600196.html',
            count: 11,
          },
          {
            title: 'KT, AI 특화 기술로 미디어·콘텐츠 혁신',
            source: '세계일보',
            url: 'https://www.segye.com/newsView/20240429514791',
            count: 11,
          },
        ],
      },
      {
        name: '일반 기사',
        count: 10,
        articles: [
          {
            title: 'KT, 로봇·AICC 등 디지털 전환 협력',
            source: '디지털데일리',
            url: 'https://www.ddaily.co.kr/page/view/2024031309570536423',
            count: 5,
          },
          {
            title: 'KT, 브랜드 캠페인 철학 담은 영상 공개',
            source: '다음뉴스',
            url: 'https://v.daum.net/v/20240901090255927',
            count: 5,
          },
        ],
      },
      {
        name: '업계 동향',
        count: 6,
        articles: [
          {
            title: 'KT, AI 숏폼·지니TV AI 에이전트 전략',
            source: '서울경제 시그널',
            url: 'https://signalm.sedaily.com/NewsView/2GRK1U233H/GK01',
            count: 3,
          },
          {
            title: 'KT, AI 보이스피싱 탐지 2.0',
            source: '다음뉴스',
            url: 'https://v.daum.net/v/20250729143405675',
            count: 3,
          },
        ],
      },
    ],
    trending_keywords: ['콘텐츠전략', 'AI투자', 'OTT경쟁', 'AICC'],
    insights: [
      'OTT 경쟁 심화 국면에서 AI·콘텐츠 전략 커뮤니케이션 강화 필요',
      'AI 기반 고객 접점 혁신이 브랜드 선호도에 기여',
      '미디어 매출 다변화 메시지 일관성 유지 필요',
    ],
  },
  {
    id: '3',
    date: '2025-09-09',
    report_at: '2025년 9월 9일 오전 8시',
    content: `금일 KT 관련 주요 보도입니다.
AI·플랫폼 중심 사업 전환과 6G·위성·디지털 전환 이슈가 이어지고 있습니다.
이슈의 연속성 차원에서 전일 보도와 동일 트렌드가 지속되었습니다.`,
    total_articles: 42,
    categories: [
      {
        name: '재무 및 경영 관련 기사',
        count: 24,
        articles: [
          {
            title: 'KT알파, 미래 성장전략 N.EX.T 발표',
            source: '디지털데일리',
            url: 'https://www1.ddaily.co.kr/page/view/2023061612010790068',
            count: 12,
          },
          {
            title: 'KT, AI 특화 기술로 미디어 혁신',
            source: '세계일보',
            url: 'https://www.segye.com/newsView/20240429514791',
            count: 12,
          },
        ],
      },
      {
        name: '일반 기사',
        count: 11,
        articles: [
          {
            title: 'KT, 지니TV AI트래블뷰 캐나다편 공개',
            source: '네이트뉴스',
            url: 'https://news.nate.com/view/20240923n19825',
            count: 6,
          },
          {
            title: 'KT, AI 고객센터·로봇 협력',
            source: '디지털데일리',
            url: 'https://www.ddaily.co.kr/page/view/2024031309570536423',
            count: 5,
          },
        ],
      },
      {
        name: '업계 동향',
        count: 7,
        articles: [
          {
            title: '국내 통신사, 6G·저궤도 위성 협력 확대',
            source: '뉴스1',
            url: 'https://www.news1.kr/photos/6963099',
            count: 4,
          },
          {
            title: 'KT, AI 숏폼·AI 에이전트 전략',
            source: '서울경제 시그널',
            url: 'https://signalm.sedaily.com/NewsView/2GRK1U233H/GK01',
            count: 3,
          },
        ],
      },
    ],
    trending_keywords: ['AI전환', '플랫폼', '6G', '위성협력'],
    insights: [
      'AI·콘텐츠·플랫폼 축의 스토리텔링 일관성 유지 필요',
      '6G·위성 협력은 중장기 포지셔닝 차별화 요소',
      'B2C/B2B 동시 확장 메시지 간섭 최소화 필요',
    ],
  },
];

// Mock crisis alerts
export const mockCrisisAlerts: CrisisAlert[] = [
  {
    id: '1',
    level: 'danger',
    title: '“KT 전 지사에 사제폭탄 설치” 협박글…경찰 추적',
    url: 'https://v.daum.net/v/20250826131837036',
    journalist_name: '문경근',
    journalist_phone: '010-1234-5678',
    reason:
      '공공 안전 위협과 기업 이미지 훼손 위험. 사실 여부와 무관하게 대중 불안 및 고객 이탈 우려.',
    key_sentence:
      '인터넷 커뮤니티에 “KT 지사 건물에 폭탄을 설치하겠다”는 글이 올라와 경찰이 작성자 추적에 착수했다.',
    action_plan:
      '경찰과 공조한 사실관계 공지, 안전 점검 상황을 실시간으로 공유하며, 고객센터 비상 응대 및 영업장 보안을 강화해야 합니다.',
    created_at: '2025-08-26T04:30:00Z',
    status: 'active',
  },
  {
    id: '2',
    level: 'warning',
    title: '“방통위 결정 무시” 논란…SKT·KT 소비자 뒷전 비판',
    url: 'https://v.daum.net/v/20250904173115436',
    journalist_name: '김지호',
    journalist_phone: '010-2345-6789',
    reason: '규제기관과의 갈등 노출로 평판·정책 리스크 확대 우려.',
    key_sentence:
      '일각에선 통신사의 소비자 보호 의무를 소홀히 했다는 지적이 제기됐다.',
    action_plan:
      '방통위 협의체를 즉시 제안하고, 이행 일정과 소비자 보호 조치를 공개하며, 개선 현황을 정기적으로 보고해야 합니다.',
    created_at: '2025-09-04T08:15:00Z',
    status: 'monitoring',
  },
  {
    id: '3',
    level: 'info',
    title: 'KT 인터넷 대규모 장애, 라우팅 오류로 확인(2021.10.25)',
    url: 'https://v.daum.net/v/20211029170049419',
    journalist_name: '안지혜',
    journalist_phone: '010-3456-7890',
    reason: '과거 이슈이나 반복 우려 상존. 장애 대응 표준 절차 점검 필요.',
    key_sentence: 'KT는 디도스 공격이 아닌 내부 라우팅 오류였다고 정정했다.',
    action_plan:
      '변경관리 및 롤백 절차를 재점검하고, 재발방지 대책을 대외에 공개하며, 모의훈련을 정례화해야 합니다.',
    created_at: '2021-10-29T08:45:00Z',
    status: 'resolved',
  },
];

// Mock system status
export const mockSystemStatus: SystemStatus[] = [
  {
    id: '1',
    metric: '뉴스 수집률',
    value: 98.5,
    status: 'normal',
    last_updated: '2025-09-09T15:00:00Z',
  },
  {
    id: '2',
    metric: 'AI 분석 정확도',
    value: 94.2,
    status: 'normal',
    last_updated: '2025-09-09T15:00:00Z',
  },
  {
    id: '3',
    metric: '알림 응답 시간',
    value: 2.3,
    status: 'warning',
    last_updated: '2025-09-09T15:00:00Z',
  },
  {
    id: '4',
    metric: '시스템 가동률',
    value: 99.9,
    status: 'normal',
    last_updated: '2025-09-09T15:00:00Z',
  },
];

// Mock system status
export const mockBriefingData = {
  '2025-09-05': {
    content: mockBriefings[0].content,
    articles: mockBriefings[0].categories.flatMap(category =>
      category.articles.map(article => ({
        title: article.title,
        url: article.url,
        media_outlet: article.source,
        journalist_name: '기자명',
        category: category.name,
      }))
    ),
  },
  '2025-09-08': {
    content: mockBriefings[1].content,
    articles: mockBriefings[1].categories.flatMap(category =>
      category.articles.map(article => ({
        title: article.title,
        url: article.url,
        media_outlet: article.source,
        journalist_name: '기자명',
        category: category.name,
      }))
    ),
  },
  '2025-09-09': {
    content: mockBriefings[2].content,
    articles: mockBriefings[2].categories.flatMap(category =>
      category.articles.map(article => ({
        title: article.title,
        url: article.url,
        media_outlet: article.source,
        journalist_name: '기자명',
        category: category.name,
      }))
    ),
  },
};
