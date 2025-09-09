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
import { mockBriefingData } from '@/lib/mock-data';

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

const transformMockDataToBriefingEntry = (
  date: string
): BriefingEntry | null => {
  const mockData = mockBriefingData[date as keyof typeof mockBriefingData];
  if (!mockData) return null;

  const groupedArticles = mockData.articles.reduce((acc, article) => {
    const categoryName = article.category || '기타';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(article);
    return acc;
  }, {} as Record<string, typeof mockData.articles>);

  const articles: BriefingCategory[] = Object.entries(groupedArticles).map(
    ([category, categoryArticles]) => ({
      category,
      count: categoryArticles.length,
      sources: categoryArticles.map(article => ({
        name: article.media_outlet,
        title: article.title,
        count: 1,
        url: article.url,
      })),
    })
  );

  const totalArticles = mockData.articles.length;
  const uniqueSources = new Set(mockData.articles.map(a => a.media_outlet))
    .size;

  return {
    report_at: `${date.split('-')[0]}년 ${parseInt(
      date.split('-')[1]
    )}월 ${parseInt(date.split('-')[2])}일`,
    content: mockData.content,
    articles,
    stats: {
      total: totalArticles,
      positive: Math.floor(totalArticles * 0.7),
      caution: Math.floor(totalArticles * 0.2),
      sources: uniqueSources,
    },
  };
};

export default function SharedBriefing() {
  const params = useParams();
  const { toast } = useToast();
  const [briefingData, setBriefingData] = useState<BriefingEntry | null>(null);

  useEffect(() => {
    const dateParam = params.date as string;
    const data = transformMockDataToBriefingEntry(dateParam);
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
