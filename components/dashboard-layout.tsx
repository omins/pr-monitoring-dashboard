'use client';

import type React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AlertTriangle, FileText, Activity } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const navigation = [
  { name: '실시간 위기 대응 센터', href: '/', icon: AlertTriangle },
  { name: '조간 브리핑', href: '/briefing', icon: FileText },
  { name: '모니터링 현황', href: '/progress', icon: Activity },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <header className='h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <Avatar className='w-8 h-8'>
              <AvatarFallback className='text-[10px] font-semibold text-white bg-gradient-to-br from-emerald-500 via-sky-500 to-fuchsia-600'></AvatarFallback>
            </Avatar>
            <span className='font-semibold text-gray-900'>Mi:dm 지킴이</span>
          </div>
          <div className='text-sm text-gray-500'>
            <span>
              {pathname === '/'
                ? '실시간 위기 대응 센터'
                : pathname === '/briefing'
                ? '조간 브리핑'
                : '모니터링 현황'}
            </span>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <div className='text-sm text-gray-600'>
            마지막 업데이트: {new Date().toLocaleString('ko-KR')}
          </div>
        </div>
      </header>

      <div className='flex'>
        {/* Sidebar */}
        <aside className='w-60 border-r border-gray-200 bg-white h-[calc(100vh-4rem)] overflow-y-auto'>
          <div className='p-4'>
            <nav className='space-y-1'>
              {navigation.map(item => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center w-full justify-start px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-red-50 text-red-700 hover:bg-red-100'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className='w-4 h-4 mr-3' />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className='flex-1 p-8 bg-gray-50'>{children}</main>
      </div>
    </div>
  );
}
