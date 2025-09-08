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
    content: `금일 당사 관련 주요 언론보도 현황입니다.
신제품 출시에 대해 긍정적으로 게재되었습니다.
더불어 시장 점유율 확대 전략이라고 언급되었습니다.

주요 업계 동향입니다.
정부의 디지털 전환 정책에 따라
관련 법 개정에 나설 예정입니다.
기존 규제는 완화되고, 혁신 지원이 의무화될 예정입니다.`,
    total_articles: 45,
    categories: [
      {
        name: '재무 및 경영 관련 기사',
        count: 25,
        articles: [
          {
            title: '신제품 출시로 매출 증가 전망',
            source: '한국경제',
            url: 'https://hankyung.com/article/1',
            count: 12,
          },
          {
            title: '디지털 전환 투자 확대',
            source: '매일경제',
            url: 'https://mk.co.kr/article/1',
            count: 13,
          },
        ],
      },
      {
        name: '일반 기사',
        count: 12,
        articles: [
          {
            title: '기업 사회공헌 활동 확대',
            source: '조선일보',
            url: 'https://chosun.com/article/1',
            count: 6,
          },
          {
            title: '친환경 경영 실천',
            source: '중앙일보',
            url: 'https://joongang.co.kr/article/1',
            count: 6,
          },
        ],
      },
      {
        name: '업계 동향',
        count: 8,
        articles: [
          {
            title: '업계 전반 성장세',
            source: '서울경제',
            url: 'https://sedaily.com/article/1',
            count: 4,
          },
          {
            title: '경쟁사 동향 분석',
            source: '이데일리',
            url: 'https://edaily.co.kr/article/1',
            count: 4,
          },
        ],
      },
    ],
    trending_keywords: ['신제품', '디지털전환', '매출증가', '투자확대'],
    insights: [
      '신제품 출시 관련 긍정적 반응이 주를 이룸',
      '디지털 전환 투자에 대한 시장의 기대감 상승',
      '경쟁사 대비 우위 포지션 확보',
    ],
  },
  {
    id: '2',
    date: '2025-09-08',
    report_at: '2025년 9월 8일 오전 8시',
    content: `금일 당사 관련 주요 언론보도 현황입니다.
분기 실적 발표에 대해 집중 보도되었습니다.
더불어 해외 진출 계획이 주목받고 있습니다.

주요 업계 동향입니다.
글로벌 경제 불확실성 속에서도
국내 기업들의 해외 진출이 활발합니다.
정부 지원 정책도 확대될 예정입니다.`,
    total_articles: 38,
    categories: [
      {
        name: '재무 및 경영 관련 기사',
        count: 22,
        articles: [
          {
            title: '3분기 실적 시장 기대치 상회',
            source: '한국경제',
            url: 'https://hankyung.com/article/2',
            count: 11,
          },
          {
            title: '해외 진출 로드맵 공개',
            source: '매일경제',
            url: 'https://mk.co.kr/article/2',
            count: 11,
          },
        ],
      },
      {
        name: '일반 기사',
        count: 10,
        articles: [
          {
            title: 'CEO 인터뷰 - 미래 비전',
            source: '조선일보',
            url: 'https://chosun.com/article/2',
            count: 5,
          },
          {
            title: '직원 복지 개선 소식',
            source: '중앙일보',
            url: 'https://joongang.co.kr/article/2',
            count: 5,
          },
        ],
      },
      {
        name: '업계 동향',
        count: 6,
        articles: [
          {
            title: '글로벌 시장 진출 트렌드',
            source: '서울경제',
            url: 'https://sedaily.com/article/2',
            count: 3,
          },
          {
            title: '업계 리더십 평가',
            source: '이데일리',
            url: 'https://edaily.co.kr/article/2',
            count: 3,
          },
        ],
      },
    ],
    trending_keywords: ['분기실적', '해외진출', '글로벌', '성장전략'],
    insights: [
      '분기 실적에 대한 긍정적 평가 지속',
      '해외 진출 계획에 대한 투자자 관심 증가',
      '업계 내 리더십 포지션 강화',
    ],
  },
  {
    id: '3',
    date: '2025-09-09',
    report_at: '2025년 9월 9일 오전 8시',
    content: `금일 당사 관련 주요 언론보도 현황입니다.
신기술 개발 성과에 대해 주요 언론에서 다뤘습니다.
더불어 지속가능경영 실천이 높이 평가받고 있습니다.

주요 업계 동향입니다.
ESG 경영이 기업 평가의 핵심 요소로 부상하며
관련 투자와 정책이 확대되고 있습니다.`,
    total_articles: 42,
    categories: [
      {
        name: '재무 및 경영 관련 기사',
        count: 24,
        articles: [
          {
            title: '신기술 특허 출원 완료',
            source: '한국경제',
            url: 'https://hankyung.com/article/3',
            count: 12,
          },
          {
            title: 'ESG 경영 우수 기업 선정',
            source: '매일경제',
            url: 'https://mk.co.kr/article/3',
            count: 12,
          },
        ],
      },
      {
        name: '일반 기사',
        count: 11,
        articles: [
          {
            title: '지역사회 상생 프로그램',
            source: '조선일보',
            url: 'https://chosun.com/article/3',
            count: 6,
          },
          {
            title: '청년 일자리 창출 기여',
            source: '중앙일보',
            url: 'https://joongang.co.kr/article/3',
            count: 5,
          },
        ],
      },
      {
        name: '업계 동향',
        count: 7,
        articles: [
          {
            title: 'ESG 투자 확산 현황',
            source: '서울경제',
            url: 'https://sedaily.com/article/3',
            count: 4,
          },
          {
            title: '기술혁신 경쟁 심화',
            source: '이데일리',
            url: 'https://edaily.co.kr/article/3',
            count: 3,
          },
        ],
      },
    ],
    trending_keywords: ['신기술', 'ESG경영', '지속가능성', '특허'],
    insights: [
      '신기술 개발 성과에 대한 업계 주목도 상승',
      'ESG 경영 실천으로 기업 이미지 제고',
      '지속가능한 성장 동력 확보',
    ],
  },
];

// Mock crisis alerts
export const mockCrisisAlerts: CrisisAlert[] = [
  {
    id: '1',
    level: 'danger',
    title: '경쟁사 제품 결함 관련 당사 언급',
    url: 'https://news.example.com/crisis-1',
    journalist_name: '김기자',
    journalist_phone: '010-1234-5678',
    reason:
      '경쟁사 제품 결함 사태와 관련하여 당사 제품의 안전성에 대한 의구심이 제기될 수 있어 기업 이미지에 타격을 줄 수 있습니다.',
    key_sentence:
      '업계 전반의 품질 관리 시스템에 대한 재점검이 필요하다는 지적이 나오고 있다.',
    action_plan:
      '당사 제품의 안전성과 품질 관리 시스템의 우수성을 강조하는 보도자료를 신속히 배포하고, 해당 기자에게 정확한 정보를 제공해야 합니다.',
    created_at: '2025-09-09T14:30:00Z',
    status: 'active',
  },
  {
    id: '2',
    level: 'warning',
    title: '업계 규제 강화 논의',
    url: 'https://news.example.com/warning-1',
    journalist_name: '이기자',
    journalist_phone: '010-2345-6789',
    reason:
      '새로운 규제가 도입될 경우 당사 사업 운영에 제약이 생길 수 있어 투자자들의 우려를 불러일으킬 수 있습니다.',
    key_sentence:
      '정부는 관련 업계에 대한 규제 강화 방안을 검토 중인 것으로 알려졌다.',
    action_plan:
      '규제 변화에 대한 당사의 대응 계획과 준비 상황을 투명하게 공개하여 시장의 불안감을 해소해야 합니다.',
    created_at: '2025-09-09T11:15:00Z',
    status: 'monitoring',
  },
  {
    id: '3',
    level: 'info',
    title: '업계 동향 분석 기사',
    url: 'https://news.example.com/info-1',
    journalist_name: '박기자',
    journalist_phone: '010-3456-7890',
    reason:
      '업계 전반의 성장 전망에 대한 긍정적 분석이지만, 당사의 포지션이 명확히 언급되지 않아 추가 홍보가 필요할 수 있습니다.',
    key_sentence:
      '업계 전문가들은 올해 하반기 시장 성장률이 예상보다 높을 것으로 전망한다고 밝혔다.',
    action_plan:
      '업계 성장 트렌드 속에서 당사의 경쟁 우위와 성장 계획을 부각시키는 후속 보도를 추진하는 것이 좋겠습니다.',
    created_at: '2025-09-09T09:45:00Z',
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
