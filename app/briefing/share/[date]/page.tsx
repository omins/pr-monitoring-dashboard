'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  TrendingUp,
  TrendingDown,
  Newspaper,
  Globe,
  ExternalLink,
  Copy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface BriefingSource {
  name: string;
  title: string;
  count: number;
  url: string;
}

interface BriefingCategory {
  category: string;
  count: number;
  sources: BriefingSource[];
}

interface BriefingEntry {
  report_at: string;
  content: string;
  articles: BriefingCategory[];
  stats: { total: number; positive: number; caution: number; sources: number };
}

const briefingDataByDate: Record<string, BriefingEntry> = {
  '2025-09-05': {
    report_at: '2025년 9월 5일',
    content: `금일 당사 관련 주요 언론보도 현황입니다.

개인정보 보호 강화 방안에 대해 게재되었습니다.
더불어 5G 네트워크 품질 개선 노력이라고 언급되었습니다.

주요 업계 동향입니다.
윤석열 대통령의 지시에 따라
정부는 개인정보보호법 개정에 나설 예정입니다.
기존 과징금은 매출액의 3%로 강화되고, 개인정보 영향평가가 의무화될 예정입니다.
(https://www.chosun.com/economy/tech_it/2024/09/05/privacy-law-reform/)`,

    articles: [
      {
        category: '재무 및 경영 관련 기사',
        count: 25,
        sources: [
          {
            name: '조선일보',
            title: 'KT, 개인정보 보호 투자 확대',
            count: 12,
            url: 'https://www.chosun.com/economy/tech_it/2024/09/05/kt-privacy-investment/',
          },
          {
            name: '한국경제',
            title: '통신업계 규제 강화 대응',
            count: 13,
            url: 'https://www.hankyung.com/economy/article/2024090512341',
          },
        ],
      },
      {
        category: '일반 기사',
        count: 15,
        sources: [
          {
            name: '중앙일보',
            title: '5G 네트워크 품질 개선 현황',
            count: 8,
            url: 'https://www.joongang.co.kr/article/25199876',
          },
          {
            name: '동아일보',
            title: '통신 3사 서비스 경쟁',
            count: 7,
            url: 'https://www.donga.com/news/Economy/article/all/20240905/127456789/1',
          },
        ],
      },
    ],
    stats: { total: 40, positive: 28, caution: 8, sources: 12 },
  },
  '2025-09-08': {
    report_at: '2025년 9월 8일',
    content: `금일 당사 관련 주요 언론보도 현황입니다.

AI 서비스 확장 계획에 대해 집중 보도되었습니다.
더불어 디지털 헬스케어 사업 진출이라고 언급되었습니다.

주요 업계 동향입니다.
과학기술정보통신부 장관의 발표에 따라
정부는 AI 산업 육성법 제정에 나설 예정입니다.
기존 규제 샌드박스는 확대되고, AI 윤리 가이드라인이 의무화될 예정입니다.
(https://www.etnews.com/20240908000123)`,

    articles: [
      {
        category: '재무 및 경영 관련 기사',
        count: 35,
        sources: [
          {
            name: '전자신문',
            title: 'KT, AI 플랫폼 투자 본격화',
            count: 18,
            url: 'https://www.etnews.com/20240908000456',
          },
          {
            name: '디지털타임스',
            title: '통신사 AI 경쟁 가속화',
            count: 17,
            url: 'https://www.dt.co.kr/contents.html?article_no=2024090802109931731001',
          },
        ],
      },
      {
        category: '기술 및 혁신',
        count: 22,
        sources: [
          {
            name: '아이뉴스24',
            title: 'KT, 헬스케어 AI 솔루션 공개',
            count: 12,
            url: 'https://www.inews24.com/view/1234567',
          },
          {
            name: 'ZDNet Korea',
            title: '통신업계 디지털 전환 가속',
            count: 10,
            url: 'https://zdnet.co.kr/view/?no=20240908123456',
          },
        ],
      },
    ],
    stats: { total: 57, positive: 45, caution: 6, sources: 16 },
  },
  '2025-09-09': {
    report_at: '2025년 9월 9일',
    content: `금일 당사 관련 주요 언론보도 현황입니다.

ESG 경영 성과에 대해 긍정적으로 보도되었습니다.
더불어 탄소중립 달성 로드맵이라고 언급되었습니다.

주요 업계 동향입니다.
환경부 장관의 발표에 따라
정부는 탄소중립 기본법 시행령 개정에 나설 예정입니다.
기존 탄소배출권은 확대되고, 녹색금융 지원이 강화될 예정입니다.
(https://www.mk.co.kr/news/economy/10845123)`,

    articles: [
      {
        category: 'ESG 및 지속가능경영',
        count: 28,
        sources: [
          {
            name: '매일경제',
            title: 'KT, ESG 경영 우수 평가',
            count: 15,
            url: 'https://www.mk.co.kr/news/economy/10845456',
          },
          {
            name: '서울경제',
            title: '통신업계 친환경 투자 확대',
            count: 13,
            url: 'https://www.sedaily.com/NewsView/29ABCD123',
          },
        ],
      },
      {
        category: '사회공헌 활동',
        count: 18,
        sources: [
          {
            name: '연합뉴스',
            title: 'KT, 디지털 격차 해소 사업',
            count: 10,
            url: 'https://www.yna.co.kr/view/AKR20240909123000017',
          },
          {
            name: '뉴시스',
            title: '통신 3사 사회적 책임 강화',
            count: 8,
            url: 'https://newsis.com/view/?id=NISX20240909_0002456789',
          },
        ],
      },
    ],
    stats: { total: 46, positive: 38, caution: 4, sources: 14 },
  },
};

export default function SharedBriefing() {
  const params = useParams();
  const { toast } = useToast();
  const [briefingData, setBriefingData] = useState<BriefingEntry | null>(null);

  useEffect(() => {
    const dateParam = params.date as string;
    const data = briefingDataByDate[dateParam];
    if (data) {
      setBriefingData(data);
    }
  }, [params.date]);

  const handleArticleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyBriefing = async () => {
    if (!briefingData) return;

    try {
      await navigator.clipboard.writeText(briefingData.content);
      toast({
        title: '복사 완료',
        description: '경영진 브리핑이 클립보드에 복사되었습니다.',
        duration: 3000,
      });
    } catch (err) {
      toast({
        title: '복사 실패',
        description: '클립보드 복사 중 오류가 발생했습니다.',
        variant: 'destructive',
        duration: 3000,
      });
    }
  };

  if (!briefingData) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-semibold text-gray-900 mb-2'>
            브리핑을 찾을 수 없습니다
          </h1>
          <p className='text-gray-600'>
            요청하신 날짜의 브리핑 데이터가 존재하지 않습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-white border-b border-gray-200 px-6 py-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-semibold text-gray-900'>
                K-Intelligence 조간 브리핑
              </h1>
              <p className='text-gray-600 mt-1'>
                {briefingData.report_at} 언론 동향 분석 보고서
              </p>
            </div>
            <Button
              variant='outline'
              size='sm'
              className='gap-2 bg-transparent'
              onClick={handleCopyBriefing}
            >
              <Copy className='w-4 h-4' />
              복사
            </Button>
          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-6 py-8'>
        {/* Summary Cards */}
        <div className='grid grid-cols-4 gap-6 mb-8'>
          <Card className='border-gray-200'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <Newspaper className='w-5 h-5 text-blue-600' />
                </div>
                <div className='flex items-center gap-1 text-sm text-green-600'>
                  <TrendingUp className='w-3 h-3' />
                  +8%
                </div>
              </div>
              <div className='text-2xl font-semibold text-gray-900 mb-1'>
                {briefingData.stats.total}
              </div>
              <div className='text-sm text-gray-600'>총 보도 건수</div>
            </CardContent>
          </Card>

          <Card className='border-gray-200'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
                  <TrendingUp className='w-5 h-5 text-green-600' />
                </div>
                <div className='flex items-center gap-1 text-sm text-green-600'>
                  <TrendingUp className='w-3 h-3' />
                  +12%
                </div>
              </div>
              <div className='text-2xl font-semibold text-gray-900 mb-1'>
                {briefingData.stats.positive}
              </div>
              <div className='text-sm text-gray-600'>긍정적 보도</div>
            </CardContent>
          </Card>

          <Card className='border-gray-200'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center'>
                  <TrendingDown className='w-5 h-5 text-orange-600' />
                </div>
                <div className='flex items-center gap-1 text-sm text-red-600'>
                  <TrendingUp className='w-3 h-3' />
                  +3
                </div>
              </div>
              <div className='text-2xl font-semibold text-gray-900 mb-1'>
                {briefingData.stats.caution}
              </div>
              <div className='text-sm text-gray-600'>주의 필요</div>
            </CardContent>
          </Card>

          <Card className='border-gray-200'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center'>
                  <Globe className='w-5 h-5 text-purple-600' />
                </div>
                <div className='flex items-center gap-1 text-sm text-green-600'>
                  <TrendingUp className='w-3 h-3' />
                  +2
                </div>
              </div>
              <div className='text-2xl font-semibold text-gray-900 mb-1'>
                {briefingData.stats.sources}
              </div>
              <div className='text-sm text-gray-600'>언론사 수</div>
            </CardContent>
          </Card>
        </div>

        <div className='space-y-8'>
          {/* Executive Summary */}
          <Card className='border-gray-200'>
            <CardHeader className='pb-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle className='text-lg font-semibold'>
                    경영진 브리핑
                  </CardTitle>
                  <CardDescription>
                    {briefingData.report_at} 조간 보고
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className='prose prose-sm max-w-none'>
                <div className='whitespace-pre-line leading-relaxed text-gray-950'>
                  {briefingData.content}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Coverage */}
          <Card className='border-gray-200'>
            <CardHeader className='pb-4'>
              <CardTitle className='text-lg font-semibold'>
                주요 언론 보도 ({briefingData.report_at} 조간)
              </CardTitle>
              <CardDescription>
                보도 건수: 총{' '}
                {briefingData.articles.reduce(
                  (sum: number, cat: BriefingCategory) => sum + cat.count,
                  0
                )}
                건
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              {briefingData.articles.map(
                (category: BriefingCategory, index: number) => (
                  <div key={index} className='border-l-4 border-blue-500 pl-4'>
                    <h3 className='font-semibold text-gray-900 mb-3'>
                      {category.category} (보도 {category.count}건)
                    </h3>
                    <div className='space-y-2'>
                      {category.sources.map(
                        (source: BriefingSource, sourceIndex: number) => (
                          <div
                            key={sourceIndex}
                            className='flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0'
                          >
                            <div className='flex items-center gap-3'>
                              <Badge variant='outline' className='bg-gray-50'>
                                {source.name}
                              </Badge>
                              <span className='text-sm text-gray-700'>
                                "{source.title}" 외
                              </span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='text-sm text-gray-600'>
                                (총 {source.count}건)
                              </span>
                              <Button
                                variant='ghost'
                                size='sm'
                                className='h-6 px-2 hover:bg-blue-50'
                                onClick={() => handleArticleClick(source.url)}
                              >
                                <ExternalLink className='w-3 h-3' />
                              </Button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
