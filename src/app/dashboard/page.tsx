'use client';

import React from 'react';
import { AppLayout } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button } from '@/components/ui';

// Mock KPI data
const kpiData = [
  {
    title: 'Total Contracts',
    value: '2,847',
    change: '+12.5%',
    trend: 'up' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Expiring Soon',
    value: '24',
    change: 'Next 30 days',
    trend: 'warning' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Pending Actions',
    value: '18',
    change: 'Requires attention',
    trend: 'neutral' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    title: 'Total Value',
    value: '$24.8M',
    change: '+8.2%',
    trend: 'up' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

// Mock recent contracts
const recentContracts = [
  {
    id: 1,
    name: 'Vendor Service Agreement',
    party: 'Acme Corp',
    status: 'active',
    expiryDate: '2025-12-31',
    value: '$125,000',
  },
  {
    id: 2,
    name: 'Software License Agreement',
    party: 'TechSoft Solutions',
    status: 'expiring',
    expiryDate: '2025-02-15',
    value: '$45,000',
  },
  {
    id: 3,
    name: 'Consulting Services Contract',
    party: 'Global Consultants Inc',
    status: 'active',
    expiryDate: '2026-06-30',
    value: '$230,000',
  },
  {
    id: 4,
    name: 'Maintenance Agreement',
    party: 'ServicePro Ltd',
    status: 'pending',
    expiryDate: '2025-09-20',
    value: '$18,500',
  },
];

// Mock risk alerts
const riskAlerts = [
  {
    id: 1,
    contract: 'Vendor Service Agreement #1234',
    risk: 'High liability clause detected',
    severity: 'high',
    date: '2 hours ago',
  },
  {
    id: 2,
    contract: 'Partnership Agreement #5678',
    risk: 'Non-standard termination terms',
    severity: 'medium',
    date: '5 hours ago',
  },
  {
    id: 3,
    contract: 'Supplier Contract #9012',
    risk: 'Missing renewal clause',
    severity: 'low',
    date: '1 day ago',
  },
];

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-heading font-bold text-content">Dashboard</h1>
            <p className="text-content-muted mt-1">Welcome back! Here&apos;s your contract portfolio overview.</p>
          </div>
          <Button variant="primary">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Contract
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <Card key={index} variant="elevated" hover>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-content-muted mb-1">{kpi.title}</p>
                    <h3 className="text-3xl font-heading font-bold text-content">{kpi.value}</h3>
                    <p className={`text-sm mt-2 ${
                      kpi.trend === 'up' ? 'text-green-600' :
                      kpi.trend === 'warning' ? 'text-yellow-600' :
                      'text-content-muted'
                    }`}>
                      {kpi.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    kpi.trend === 'up' ? 'bg-green-100 text-green-600' :
                    kpi.trend === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-primary/10 text-primary'
                  }`}>
                    {kpi.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Contracts */}
          <div className="lg:col-span-2">
            <Card variant="bordered">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Contracts</CardTitle>
                    <CardDescription>Latest contract activity and updates</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentContracts.map((contract) => (
                    <div
                      key={contract.id}
                      className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-content">{contract.name}</h4>
                        <p className="text-sm text-content-muted mt-1">{contract.party}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-content">{contract.value}</p>
                          <p className="text-xs text-content-muted">Expires: {contract.expiryDate}</p>
                        </div>
                        <Badge
                          variant={
                            contract.status === 'active' ? 'success' :
                            contract.status === 'expiring' ? 'warning' :
                            'neutral'
                          }
                          dot
                        >
                          {contract.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Alerts */}
          <div>
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Risk Alerts</CardTitle>
                <CardDescription>AI-detected issues requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-3 border-l-4 rounded bg-surface cursor-pointer hover:bg-primary/5 transition-colors"
                      style={{
                        borderLeftColor:
                          alert.severity === 'high' ? '#dc2626' :
                          alert.severity === 'medium' ? '#f59e0b' :
                          '#6b7280'
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Badge
                          variant={
                            alert.severity === 'high' ? 'danger' :
                            alert.severity === 'medium' ? 'warning' :
                            'neutral'
                          }
                          size="sm"
                        >
                          {alert.severity}
                        </Badge>
                        <span className="text-xs text-content-muted">{alert.date}</span>
                      </div>
                      <h5 className="text-sm font-medium text-content mb-1">{alert.risk}</h5>
                      <p className="text-xs text-content-muted">{alert.contract}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" fullWidth className="mt-4">
                  View All Risks
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upcoming Milestones */}
        <Card variant="bordered">
          <CardHeader>
            <CardTitle>Upcoming Milestones</CardTitle>
            <CardDescription>Important dates and obligations in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-surface rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center font-heading font-bold">
                    15
                  </div>
                  <div>
                    <p className="text-sm font-medium text-content">Feb</p>
                    <p className="text-xs text-content-muted">2025</p>
                  </div>
                </div>
                <p className="text-sm text-content font-medium">License Renewal Due</p>
                <p className="text-xs text-content-muted mt-1">TechSoft Solutions</p>
              </div>
              <div className="p-4 bg-surface rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-heading font-bold">
                    22
                  </div>
                  <div>
                    <p className="text-sm font-medium text-content">Feb</p>
                    <p className="text-xs text-content-muted">2025</p>
                  </div>
                </div>
                <p className="text-sm text-content font-medium">Quarterly Review Meeting</p>
                <p className="text-xs text-content-muted mt-1">Global Consultants Inc</p>
              </div>
              <div className="p-4 bg-surface rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center font-heading font-bold">
                    28
                  </div>
                  <div>
                    <p className="text-sm font-medium text-content">Feb</p>
                    <p className="text-xs text-content-muted">2025</p>
                  </div>
                </div>
                <p className="text-sm text-content font-medium">Payment Milestone</p>
                <p className="text-xs text-content-muted mt-1">Acme Corp</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
