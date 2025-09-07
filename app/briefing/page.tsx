"use client"

import { useState, useEffect } from "react"
import { FileText, Share, Calendar, Building, Globe, ChevronDown, ExternalLink, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import { mockBriefingData } from "@/lib/mock-data"

interface BriefingData {
  id: string
  date: string
  content: string
  created_at: string
  updated_at: string
}

interface ArticleData {
  id: string
  title: string
  url: string
  source: string
  journalist_name?: string
  category: {
    name: string
  }
}

interface BriefingStats {
  total: number
  positive: number
  caution: number
  sources: number
}

export default function MorningBriefing() {
  const [selectedDate, setSelectedDate] = useState("2024-09-05")
  const [briefingData, setBriefingData] = useState<BriefingData | null>(null)
  const [articles, setArticles] = useState<ArticleData[]>([])
  const [stats, setStats] = useState<BriefingStats>({ total: 0, positive: 0, caution: 0, sources: 0 })
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchBriefingData = async (date: string) => {
    setLoading(true)
    try {
      if (!supabase) {
        console.log("[v0] Using mock data - Supabase not configured")
        const mockData = mockBriefingData[date as keyof typeof mockBriefingData]
        if (mockData) {
          setBriefingData({
            id: date,
            date: date,
            content: mockData.content,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })

          const mockArticles = mockData.articles.map((article, index) => ({
            id: `${date}-${index}`,
            title: article.title,
            url: article.url,
            source: article.media_outlet,
            journalist_name: article.journalist_name,
            category: { name: article.category },
          }))

          setArticles(mockArticles)

          const totalArticles = mockArticles.length
          const uniqueSources = new Set(mockArticles.map((a) => a.source)).size

          setStats({
            total: totalArticles,
            positive: Math.floor(totalArticles * 0.7),
            caution: Math.floor(totalArticles * 0.2),
            sources: uniqueSources,
          })
        } else {
          setBriefingData(null)
          setArticles([])
          setStats({ total: 0, positive: 0, caution: 0, sources: 0 })
        }
        setLoading(false)
        return
      }

      // Fetch briefing
      const { data: briefing, error: briefingError } = await supabase
        .from("briefings")
        .select("*")
        .eq("date", date)
        .single()

      if (briefingError) {
        console.error("Error fetching briefing:", briefingError)
        setBriefingData(null)
        setArticles([])
        setStats({ total: 0, positive: 0, caution: 0, sources: 0 })
        setLoading(false)
        return
      }

      setBriefingData(briefing)

      // Fetch categories for this briefing
      const { data: categories, error: categoriesError } = await supabase
        .from("categories")
        .select("id, name")
        .eq("briefing_id", briefing.id)

      if (categoriesError) {
        console.error("Error fetching categories:", categoriesError)
        setArticles([])
        setStats({ total: 0, positive: 0, caution: 0, sources: 0 })
        setLoading(false)
        return
      }

      // Fetch articles for these categories
      const categoryIds = categories.map((cat) => cat.id)
      const { data: articlesData, error: articlesError } = await supabase
        .from("articles")
        .select("id, title, url, source, category_id")
        .in("category_id", categoryIds)

      if (articlesError) {
        console.error("Error fetching articles:", articlesError)
        setArticles([])
        setStats({ total: 0, positive: 0, caution: 0, sources: 0 })
        setLoading(false)
        return
      }

      // Transform articles with category names
      const transformedArticles =
        articlesData?.map((article) => {
          const category = categories.find((cat) => cat.id === article.category_id)
          return {
            id: article.id,
            title: article.title,
            url: article.url,
            source: article.source,
            category: { name: category?.name || "기타" },
          }
        }) || []

      setArticles(transformedArticles)

      // Calculate stats
      const totalArticles = transformedArticles.length
      const uniqueSources = new Set(transformedArticles.map((a) => a.source)).size

      setStats({
        total: totalArticles,
        positive: Math.floor(totalArticles * 0.7), // Mock calculation
        caution: Math.floor(totalArticles * 0.2), // Mock calculation
        sources: uniqueSources,
      })
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "데이터 로드 실패",
        description: "브리핑 데이터를 불러오는 중 오류가 발생했습니다.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBriefingData(selectedDate)
  }, [selectedDate])

  const groupedArticles = articles.reduce(
    (acc, article) => {
      const categoryName = article.category?.name || "기타"
      if (!acc[categoryName]) {
        acc[categoryName] = []
      }
      acc[categoryName].push(article)
      return acc
    },
    {} as Record<string, ArticleData[]>,
  )

  const handleArticleClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const handleCopyBriefing = async () => {
    if (!briefingData) return

    try {
      await navigator.clipboard.writeText(briefingData.content)
      toast({
        title: "복사 완료",
        description: "경영진 브리핑이 클립보드에 복사되었습니다.",
        duration: 3000,
      })
    } catch (err) {
      toast({
        title: "복사 실패",
        description: "클립보드 복사 중 오류가 발생했습니다.",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  const handleQuickAction = (actionName: string) => {
    toast({
      title: "준비중입니다",
      description: `${actionName} 기능은 현재 개발 중입니다.`,
      duration: 3000,
    })
  }

  const formatDateForDisplay = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">브리핑 데이터를 불러오는 중...</div>
        </div>
      </DashboardLayout>
    )
  }

  if (!briefingData) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">선택한 날짜의 브리핑 데이터가 없습니다.</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">조간 브리핑</h1>
            <p className="text-gray-600 mt-1">오늘의 주요 언론 동향 및 분석 보고서</p>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Calendar className="w-4 h-4" />
                  {formatDateForDisplay(selectedDate)} <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedDate("2024-09-05")}>2024년 9월 5일</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedDate("2024-09-08")}>2024년 9월 8일</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedDate("2024-09-09")}>2024년 9월 9일</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              className="gap-2 bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                const shareUrl = `/briefing/share/${selectedDate}`
                window.open(shareUrl, "_blank")
              }}
            >
              <Share className="w-4 h-4" />
              공유
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Main Briefing Content */}
        <div className="col-span-2 space-y-8">
          {/* Executive Summary */}
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">경영진 브리핑</CardTitle>
                  <CardDescription>{formatDateForDisplay(briefingData.date)} 조간 보고</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleCopyBriefing}>
                  <Copy className="w-4 h-4" />
                  복사
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line leading-relaxed text-gray-950">{briefingData.content}</div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Coverage */}
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">
                주요 언론 보도 ({formatDateForDisplay(briefingData.date)} 조간)
              </CardTitle>
              <CardDescription>보도 건수: 총 {stats.total}건</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(groupedArticles).map(([categoryName, categoryArticles]) => (
                <div key={categoryName} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {categoryName} (보도 {categoryArticles.length}건)
                  </h3>
                  <div className="space-y-2">
                    {categoryArticles.map((article) => (
                      <div
                        key={article.id}
                        className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="bg-gray-50">
                            {article.source}
                          </Badge>
                          <span className="text-sm text-gray-700">"{article.title}"</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 hover:bg-blue-50"
                            onClick={() => handleArticleClick(article.url)}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">빠른 작업</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => handleQuickAction("보도자료 작성")}
              >
                <FileText className="w-4 h-4 mr-2" />
                보도자료 작성
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => handleQuickAction("경쟁사 분석")}
              >
                <Building className="w-4 h-4 mr-2" />
                경쟁사 분석
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => handleQuickAction("소셜미디어 확인")}
              >
                <Globe className="w-4 h-4 mr-2" />
                소셜미디어 확인
              </Button>
            </CardContent>
          </Card>

          {/* Briefing Statistics */}
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">브리핑 통계</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">총 보도 건수</span>
                  <span className="text-sm font-medium">{stats.total}건</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">긍정적 보도</span>
                  <span className="text-sm font-medium text-green-600">{stats.positive}건</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">주의 필요</span>
                  <span className="text-sm font-medium text-orange-600">{stats.caution}건</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">언론사 수</span>
                  <span className="text-sm font-medium">{stats.sources}개</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Briefings */}
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">최근 브리핑</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {["2024-09-09", "2024-09-08", "2024-09-05"].map((date) => (
                  <div
                    key={date}
                    className={`flex items-center gap-3 p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer ${
                      date === selectedDate ? "bg-blue-50" : ""
                    }`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${date === selectedDate ? "bg-blue-500" : "bg-gray-300"}`}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-gray-900 truncate">{formatDateForDisplay(date)}</div>
                      <div className="text-xs text-gray-600">브리핑 데이터</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
