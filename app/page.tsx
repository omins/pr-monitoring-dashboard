'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  Eye,
  ExternalLink,
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
import { DashboardLayout } from '@/components/dashboard-layout';
import { useToast } from '@/hooks/use-toast';

type AlertLevel = 'danger' | 'warning' | 'info';

type CrisisAlert = {
  id: number;
  level: AlertLevel;
  title: string;
  url: string;
  journalist_name: string;
  journalist_phone: string;
  reason: string;
  key_sentence: string;
  action_plan: string;
  time: string;
  source: string;
};

const crisisAlerts: CrisisAlert[] = [
  {
    id: 1,
    level: 'danger',
    title: '“KT 전 지사에 사제폭탄 설치” 협박글…경찰 추적',
    url: 'https://v.daum.net/v/20250826131837036',
    journalist_name: '기자명',
    journalist_phone: '010-1234-5678',
    reason:
      '공공 안전 위협과 기업 이미지 훼손 위험. 사실 여부와 무관하게 대중 불안 및 고객 이탈 우려.',
    key_sentence:
      '인터넷 커뮤니티에 “KT 지사 건물에 폭탄을 설치하겠다”는 글이 올라와 경찰이 작성자 추적에 착수했다.',
    action_plan:
      '경찰과 공조한 사실관계 공지, 안전 점검 상황 실시간 공유, 고객센터 비상 응대와 오프라인 영업장 보안 강화.',
    time: '15분 전',
    source: '연합뉴스',
  },
  {
    id: 2,
    level: 'warning',
    title: 'KT 소액결제 해킹 피해 확산…피해 규모 커질 듯',
    url: 'https://www.asiatime.co.kr/article/20250906500017',
    journalist_name: '기자명',
    journalist_phone: '010-2345-6789',
    reason: '결제 보안 신뢰도 저하로 민원 및 규제 리스크 확대 가능.',
    key_sentence:
      '일부 이용자는 악성앱 설치나 링크 클릭 이력이 없다고 주장해 원인 규명과 보안 점검이 시급하다는 지적이 나온다.',
    action_plan:
      '피해 접수 전용 창구 개설, 무과실 보상 원칙 안내, 결제 경로 포렌식·이통 3사 공조, 결과 공개.',
    time: '1시간 전',
    source: '아시아타임즈',
  },
  {
    id: 3,
    level: 'warning',
    title: '“방통위 결정 무시” 논란…SKT·KT 소비자 뒷전 비판',
    url: 'https://v.daum.net/v/20250904173115436',
    journalist_name: '기자명',
    journalist_phone: '010-3456-7890',
    reason: '규제기관과의 갈등 노출로 평판·정책 리스크 확대 우려.',
    key_sentence:
      '일각에선 통신사의 소비자 보호 의무를 소홀히 했다는 지적이 제기됐다.',
    action_plan:
      '방통위 협의체 즉시 제안, 이행 일정과 소비자 보호 조치 공개, 개선 현황 정기 보고.',
    time: '2시간 전',
    source: '서울경제',
  },
];

const recentActivity = [
  {
    workflow: '네이버 뉴스 모니터링',
    time: '2분 전',
    status: 'success',
    duration: '실시간',
  },
  {
    workflow: '위험 기사 감지',
    time: '5분 전',
    status: 'success',
    duration: '30초',
  },
  {
    workflow: '다음 뉴스 수집',
    time: '12분 전',
    status: 'success',
    duration: '2분 15초',
  },
  {
    workflow: '키워드 분석',
    time: '18분 전',
    status: 'success',
    duration: '1분 8초',
  },
  {
    workflow: 'RSS 피드 수집',
    time: '32분 전',
    status: 'failed',
    duration: '45초',
  },
];

export default function CrisisCenter() {
  const [selectedAlert, setSelectedAlert] = useState<CrisisAlert | null>(null);
  const { toast } = useToast();

  const getLevelColor = (level: AlertLevel) => {
    switch (level) {
      case 'danger':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'warning':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'info':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getLevelText = (level: AlertLevel) => {
    switch (level) {
      case 'danger':
        return '긴급';
      case 'warning':
        return '주의';
      case 'info':
        return '정보';
      default:
        return '알 수 없음';
    }
  };

  const handleComingSoon = () => {
    toast({
      title: '준비중입니다',
      description: '해당 기능은 현재 개발 중입니다.',
    });
  };

  return (
    <DashboardLayout>
      <div className='mb-8'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h1 className='text-2xl font-semibold text-gray-900'>
              실시간 위기 대응 센터
            </h1>
            <p className='text-gray-600 mt-1'>
              긴급 대응이 필요한 위험 기사 및 알림 관리
            </p>
          </div>
        </div>

        {/* Crisis Alert Summary */}
        <div className='grid grid-cols-4 gap-6 mb-8'>
          <Card className='border-red-200 bg-red-50'>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between mb-2'>
                <div className='w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center'>
                  <AlertTriangle className='w-4 h-4 text-red-600' />
                </div>
                <div className='flex items-center gap-1 text-sm text-red-600'>
                  <TrendingUp className='w-3 h-3' />
                  +1
                </div>
              </div>
              <div className='text-xl font-semibold text-red-900 mb-0'>1</div>
              <div className='text-sm text-red-700'>긴급 알림</div>
            </CardContent>
          </Card>

          <Card className='border-orange-200 bg-orange-50'>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between mb-2'>
                <div className='w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center'>
                  <Clock className='w-4 h-4 text-orange-600' />
                </div>
                <div className='flex items-center gap-1 text-sm text-orange-600'>
                  <TrendingUp className='w-3 h-3' />
                  +2
                </div>
              </div>
              <div className='text-xl font-semibold text-orange-900 mb-0'>
                2
              </div>
              <div className='text-sm text-orange-700'>주의 알림</div>
            </CardContent>
          </Card>

          <Card className='border-gray-200'>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between mb-2'>
                <div className='w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center'>
                  <CheckCircle className='w-4 h-4 text-gray-600' />
                </div>
                <div className='flex items-center gap-1 text-sm text-green-600'>
                  <TrendingUp className='w-3 h-3' />
                  +5
                </div>
              </div>
              <div className='text-xl font-semibold text-gray-900 mb-0'>12</div>
              <div className='text-sm text-gray-600'>처리 완료</div>
            </CardContent>
          </Card>

          <Card className='border-gray-200'>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between mb-2'>
                <div className='w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center'>
                  <RefreshCw className='w-4 h-4 text-gray-600' />
                </div>
                <div className='flex items-center gap-1 text-sm text-green-600'>
                  <TrendingDown className='w-3 h-3' />
                  -0.5분
                </div>
              </div>
              <div className='text-xl font-semibold text-gray-900 mb-0'>
                1.8분
              </div>
              <div className='text-sm text-gray-600'>평균 대응시간</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-8'>
        {/* Crisis Alerts List */}
        <div className='col-span-2'>
          <Card className='border-gray-200'>
            <CardHeader className='pb-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle className='text-lg font-semibold'>
                    위험 기사 알림
                  </CardTitle>
                  <CardDescription>
                    즉시 대응이 필요한 기사 목록
                  </CardDescription>
                </div>
                <Button variant='outline' size='sm'>
                  <Eye className='w-4 h-4 mr-2' />
                  전체보기
                </Button>
              </div>
            </CardHeader>
            <CardContent className='p-0'>
              <div className='space-y-0'>
                {crisisAlerts.map(alert => (
                  <div
                    key={alert.id}
                    className='p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer'
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <div className='flex items-start justify-between mb-3'>
                      <div className='flex-1'>
                        <div className='flex items-center gap-3 mb-2'>
                          <Badge
                            className={`${getLevelColor(alert.level)} border`}
                          >
                            {getLevelText(alert.level)}
                          </Badge>
                          <span className='text-sm text-gray-600'>
                            {alert.source} • {alert.time}
                          </span>
                        </div>
                        <h3 className='font-semibold text-gray-900 mb-2'>
                          {alert.title}
                        </h3>
                        <p className='text-sm text-gray-600 mb-3 line-clamp-2'>
                          {alert.reason}
                        </p>
                        <div className='bg-gray-50 p-3 rounded-lg mb-3'>
                          <p className='text-sm text-gray-700 italic'>
                            "{alert.key_sentence}"
                          </p>
                        </div>
                        <div className='bg-blue-50 p-3 rounded-lg mb-3 border-l-4 border-blue-400'>
                          <div className='flex items-start gap-2'>
                            <div className='w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 shrink-0'>
                              <span className='text-xs text-white font-bold'>
                                !
                              </span>
                            </div>
                            <div>
                              <p className='text-xs font-medium text-blue-800 mb-1'>
                                권장 대응 방안
                              </p>
                              <p className='text-sm text-blue-700'>
                                {alert.action_plan}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Button
                        size='sm'
                        variant='outline'
                        className='bg-transparent'
                        onClick={e => {
                          e.stopPropagation();
                          window.open(alert.url, '_blank');
                        }}
                      >
                        <ExternalLink className='w-3 h-3 mr-1' />
                        기사보기
                      </Button>
                      <div className='flex items-center gap-2 text-sm text-gray-600'>
                        <span>{alert.journalist_name}</span>
                        <Button
                          size='sm'
                          variant='outline'
                          className='bg-transparent px-2'
                          onClick={e => {
                            e.stopPropagation();
                            window.open(
                              `tel:${alert.journalist_phone}`,
                              '_self'
                            );
                          }}
                        >
                          📞
                        </Button>
                      </div>
                      <Button
                        size='sm'
                        className='bg-red-600 hover:bg-red-700'
                        onClick={handleComingSoon}
                      >
                        대응하기
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Quick Actions */}
          <Card className='border-gray-200'>
            <CardHeader className='pb-4'>
              <CardTitle className='text-lg font-semibold'>빠른 대응</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <Button
                className='w-full bg-red-600 hover:bg-red-700'
                onClick={handleComingSoon}
              >
                <AlertTriangle className='w-4 h-4 mr-2' />
                긴급 대응팀 호출
              </Button>
              <Button
                variant='outline'
                className='w-full bg-transparent'
                onClick={handleComingSoon}
              >
                <ExternalLink className='w-4 h-4 mr-2' />
                보도자료 작성
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className='border-gray-200'>
            <CardHeader className='pb-4'>
              <CardTitle className='text-lg font-semibold'>최근 활동</CardTitle>
            </CardHeader>
            <CardContent className='p-0'>
              <div className='space-y-0'>
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className='flex items-center gap-3 p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0'
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.status === 'success'
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                    ></div>
                    <div className='flex-1 min-w-0'>
                      <div className='font-medium text-sm text-gray-900 truncate'>
                        {activity.workflow}
                      </div>
                      <div className='text-xs text-gray-600'>
                        {activity.time} • {activity.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alert Statistics */}
          <Card className='border-gray-200'>
            <CardHeader className='pb-4'>
              <CardTitle className='text-lg font-semibold'>
                오늘의 통계
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-gray-600'>총 모니터링</span>
                  <span className='text-sm font-medium'>1,247건</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-gray-600'>위험 감지</span>
                  <span className='text-sm font-medium text-red-600'>3건</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-gray-600'>대응 완료</span>
                  <span className='text-sm font-medium text-green-600'>
                    12건
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-gray-600'>평균 대응시간</span>
                  <span className='text-sm font-medium'>1.8분</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
