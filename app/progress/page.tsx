"use client"

import { useState } from "react"
import {
  Activity,
  RefreshCw,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Play,
  Pause,
  Square,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"

const workflowData = [
  {
    id: 6734,
    name: "네이버 뉴스 모니터링",
    started: "2025년 6월 22일, 10:48",
    duration: "실시간",
    status: "running",
    error: null,
    progress: 99,
    nextRun: "연속 실행",
  },
  {
    id: 6733,
    name: "다음 뉴스 수집",
    started: "2025년 6월 22일, 10:12",
    duration: "30초",
    status: "success",
    error: null,
    progress: 100,
    nextRun: "10분 후",
  },
  {
    id: 6732,
    name: "조간 브리핑 생성",
    started: "2025년 6월 22일, 09:00",
    duration: "2분 15초",
    status: "success",
    error: null,
    progress: 100,
    nextRun: "내일 09:00",
  },
  {
    id: 6731,
    name: "위험도 분석",
    started: "2025년 6월 22일, 09:30",
    duration: "1분 8초",
    status: "running",
    error: null,
    progress: 65,
    nextRun: "진행 중",
  },
  {
    id: 6730,
    name: "키워드 매칭",
    started: "2025년 6월 22일, 09:15",
    duration: "45초",
    status: "success",
    error: null,
    progress: 100,
    nextRun: "5분 후",
  },
  {
    id: 6729,
    name: "언론사 RSS 수집",
    started: "2025년 6월 22일, 08:58",
    duration: "45초",
    status: "failed",
    error: "HTTP 오류 404: RSS 피드 접근 불가",
    progress: 0,
    nextRun: "재시도 대기",
  },
]

const systemMetrics = [
  { label: "실행 중인 작업", value: "2", status: "running" },
  { label: "완료된 작업", value: "3", status: "success" },
  { label: "실패한 작업", value: "1", status: "failed" },
  { label: "대기 중인 작업", value: "0", status: "pending" },
]

const recentLogs = [
  { time: "10:48:32", level: "INFO", message: "네이버 뉴스 API 연결 성공", workflow: "네이버 뉴스 모니터링" },
  { time: "10:47:15", level: "SUCCESS", message: "키워드 매칭 완료 (127건 처리)", workflow: "키워드 매칭" },
  { time: "10:45:22", level: "WARNING", message: "응답 시간 지연 감지 (3.2초)", workflow: "위험도 분석" },
  { time: "10:43:08", level: "ERROR", message: "RSS 피드 접근 실패", workflow: "언론사 RSS 수집" },
  { time: "10:41:55", level: "INFO", message: "조간 브리핑 PDF 생성 완료", workflow: "조간 브리핑 생성" },
]

export default function WorkflowProgress() {
  const [selectedFilter, setSelectedFilter] = useState("전체")
  const { toast } = useToast()

  const showComingSoonToast = () => {
    toast({
      title: "준비중입니다",
      description: "해당 기능은 준비 중입니다.",
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "running":
        return "bg-blue-100 text-blue-700"
      case "success":
        return "bg-green-100 text-green-700"
      case "failed":
        return "bg-red-100 text-red-700"
      case "pending":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "running":
        return "실행중"
      case "success":
        return "완료"
      case "failed":
        return "실패"
      case "pending":
        return "대기"
      default:
        return "알 수 없음"
    }
  }

  const getLevelColor = (level) => {
    switch (level) {
      case "ERROR":
        return "text-red-600"
      case "WARNING":
        return "text-orange-600"
      case "SUCCESS":
        return "text-green-600"
      case "INFO":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">모니터링 현황</h1>
            <p className="text-gray-600 mt-1">모니터링 작업 및 시스템 상태 관리</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 bg-transparent" onClick={showComingSoonToast}>
              <RefreshCw className="w-4 h-4" />
              새로고침
            </Button>
          </div>
        </div>

        {/* System Status Overview */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {systemMetrics.map((metric, index) => (
            <Card key={index} className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(metric.status)}`}
                  >
                    {metric.status === "running" && <Activity className="w-5 h-5" />}
                    {metric.status === "success" && <CheckCircle className="w-5 h-5" />}
                    {metric.status === "failed" && <XCircle className="w-5 h-5" />}
                    {metric.status === "pending" && <Clock className="w-5 h-5" />}
                  </div>
                </div>
                <div className="text-2xl font-semibold text-gray-900 mb-1">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Workflow Status Table */}
        <div className="col-span-2">
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">모니터링 작업 현황</CardTitle>
                  <CardDescription>실시간 뉴스 수집 및 분석 작업 상태</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={showComingSoonToast}>
                  <Eye className="w-4 h-4 mr-2" />
                  전체보기
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-medium text-gray-700">작업 ID</TableHead>
                    <TableHead className="font-medium text-gray-700">모니터링 작업</TableHead>
                    <TableHead className="font-medium text-gray-700">시작 시간</TableHead>
                    <TableHead className="font-medium text-gray-700">소요 시간</TableHead>
                    <TableHead className="font-medium text-gray-700">상태</TableHead>
                    <TableHead className="font-medium text-gray-700">진행률</TableHead>
                    <TableHead className="font-medium text-gray-700">다음 실행</TableHead>
                    <TableHead className="font-medium text-gray-700 w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workflowData.map((workflow) => (
                    <TableRow key={workflow.id} className="hover:bg-gray-50">
                      <TableCell className="font-mono text-sm">{workflow.id}</TableCell>
                      <TableCell className="font-medium">{workflow.name}</TableCell>
                      <TableCell className="text-gray-600">{workflow.started}</TableCell>
                      <TableCell className="text-gray-600">{workflow.duration}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(workflow.status)} border`}>
                          {workflow.status === "running" && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                          )}
                          {workflow.status === "success" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {workflow.status === "failed" && <XCircle className="w-3 h-3 mr-1" />}
                          {getStatusText(workflow.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${
                                workflow.status === "success"
                                  ? "bg-green-500"
                                  : workflow.status === "failed"
                                    ? "bg-red-500"
                                    : "bg-blue-500"
                              } ${workflow.status === "running" ? "animate-pulse" : ""}`}
                              style={{ width: `${workflow.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">{workflow.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">{workflow.nextRun}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="w-8 h-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={showComingSoonToast}>
                              <Play className="w-4 h-4 mr-2" />
                              시작
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={showComingSoonToast}>
                              <Pause className="w-4 h-4 mr-2" />
                              일시정지
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={showComingSoonToast}>
                              <RefreshCw className="w-4 h-4 mr-2" />
                              재시작
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={showComingSoonToast}>상세보기</DropdownMenuItem>
                            <DropdownMenuItem onClick={showComingSoonToast}>로그보기</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={showComingSoonToast}>
                              <Square className="w-4 h-4 mr-2" />
                              중단
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* System Control */}
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">시스템 제어</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={showComingSoonToast}>
                <Play className="w-4 h-4 mr-2" />
                모든 작업 시작
              </Button>
              <Button variant="outline" className="w-full bg-transparent" onClick={showComingSoonToast}>
                <Pause className="w-4 h-4 mr-2" />
                모든 작업 일시정지
              </Button>
              <Button variant="outline" className="w-full bg-transparent" onClick={showComingSoonToast}>
                <RefreshCw className="w-4 h-4 mr-2" />
                실패한 작업 재시작
              </Button>
            </CardContent>
          </Card>

          {/* Recent Logs */}
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">최근 로그</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0 max-h-96 overflow-y-auto">
                {recentLogs.map((log, index) => (
                  <div key={index} className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-1">
                      <span className={`text-xs font-medium ${getLevelColor(log.level)}`}>{log.level}</span>
                      <span className="text-xs text-gray-500">{log.time}</span>
                    </div>
                    <div className="text-sm text-gray-900 mb-1">{log.message}</div>
                    <div className="text-xs text-gray-600">{log.workflow}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">성능 지표</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">평균 처리 시간</span>
                  <span className="text-sm font-medium">1.2분</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">성공률</span>
                  <span className="text-sm font-medium text-green-600">94.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">시간당 처리량</span>
                  <span className="text-sm font-medium">847건</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">시스템 가동률</span>
                  <span className="text-sm font-medium text-green-600">99.8%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
