'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Select, Badge, Button } from '@/components/ui';

const timeRangeOptions = [
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: '6m', label: 'Last 6 Months' },
  { value: '1y', label: 'Last Year' },
  { value: 'all', label: 'All Time' },
];

// Mock analytics data
const contractsByStatus = [
  { status: 'Active', count: 2456, percentage: 86, color: 'bg-green-500' },
  { status: 'Expiring Soon', count: 24, percentage: 1, color: 'bg-yellow-500' },
  { status: 'Expired', count: 312, percentage: 11, color: 'bg-red-500' },
  { status: 'Pending', count: 55, percentage: 2, color: 'bg-blue-500' },
];

const topVendors = [
  { name: 'Acme Corp', contracts: 145, value: '$2.4M', trend: '+12%' },
  { name: 'TechSoft Solutions', contracts: 98, value: '$1.8M', trend: '+8%' },
  { name: 'Global Consultants Inc', contracts: 87, value: '$1.6M', trend: '-3%' },
  { name: 'ServicePro Ltd', contracts: 72, value: '$1.2M', trend: '+15%' },
  { name: 'Creative Agency Co', contracts: 64, value: '$980K', trend: '+5%' },
];

const contractTypes = [
  { type: 'Service Agreements', count: 1245, percentage: 44 },
  { type: 'Software Licenses', count: 678, percentage: 24 },
  { type: 'Professional Services', count: 512, percentage: 18 },
  { type: 'Real Estate', count: 234, percentage: 8 },
  { type: 'Other', count: 178, percentage: 6 },
];

const monthlyTrend = [
  { month: 'Aug', contracts: 42, value: 2.1 },
  { month: 'Sep', contracts: 38, value: 1.9 },
  { month: 'Oct', contracts: 51, value: 2.5 },
  { month: 'Nov', contracts: 46, value: 2.3 },
  { month: 'Dec', contracts: 58, value: 2.8 },
  { month: 'Jan', contracts: 54, value: 2.7 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6m');

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-heading font-bold text-text-primary">Analytics Dashboard</h1>
            <p className="text-text-secondary mt-1">Comprehensive insights into your contract portfolio</p>
          </div>
          <div className="flex gap-3">
            <Select
              options={timeRangeOptions}
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            />
            <Button variant="outline">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card variant="elevated">
            <CardContent>
              <p className="text-sm text-text-secondary mb-1">Total Portfolio Value</p>
              <h3 className="text-3xl font-heading font-bold text-text-primary">$24.8M</h3>
              <p className="text-sm text-green-600 mt-2">↑ 8.2% from last period</p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent>
              <p className="text-sm text-text-secondary mb-1">Active Contracts</p>
              <h3 className="text-3xl font-heading font-bold text-text-primary">2,456</h3>
              <p className="text-sm text-green-600 mt-2">↑ 12.5% from last period</p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent>
              <p className="text-sm text-text-secondary mb-1">Avg Contract Value</p>
              <h3 className="text-3xl font-heading font-bold text-text-primary">$8,712</h3>
              <p className="text-sm text-text-secondary mt-2">→ No change</p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent>
              <p className="text-sm text-text-secondary mb-1">Risk Score</p>
              <h3 className="text-3xl font-heading font-bold text-yellow-600">3.2/10</h3>
              <p className="text-sm text-green-600 mt-2">↓ 0.5 from last period</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contracts by Status */}
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Contracts by Status</CardTitle>
              <CardDescription>Current portfolio status distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contractsByStatus.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="text-sm font-medium text-text-primary">{item.status}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-text-primary">{item.count}</span>
                        <span className="text-xs text-text-secondary ml-2">({item.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contract Types */}
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Contract Types</CardTitle>
              <CardDescription>Distribution by contract category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contractTypes.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary mb-1">{item.type}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-sm font-bold text-text-primary">{item.count}</p>
                      <p className="text-xs text-text-secondary">{item.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trend */}
        <Card variant="bordered">
          <CardHeader>
            <CardTitle>Contract Activity Trend</CardTitle>
            <CardDescription>New contracts and value over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-4">
              {monthlyTrend.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center justify-end flex-1">
                    <div className="w-full bg-primary rounded-t-lg hover:bg-primary-accent transition-colors cursor-pointer relative group"
                         style={{ height: `${(item.contracts / 60) * 100}%` }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {item.contracts} contracts
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary mt-2 font-medium">{item.month}</p>
                  <p className="text-xs text-text-secondary">${item.value}M</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Vendors */}
        <Card variant="bordered">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Top Vendors by Value</CardTitle>
                <CardDescription>Highest value contract counterparties</CardDescription>
              </div>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topVendors.map((vendor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-neutral-bg rounded-lg hover:bg-primary/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-heading font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{vendor.name}</p>
                      <p className="text-sm text-text-secondary">{vendor.contracts} contracts</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-text-primary">{vendor.value}</p>
                    <p className={`text-sm ${vendor.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {vendor.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card variant="bordered">
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
            <CardDescription>Portfolio risk assessment across all contracts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="danger">High Risk</Badge>
                  <span className="text-2xl font-heading font-bold text-red-600">18</span>
                </div>
                <p className="text-sm text-text-secondary">Contracts require immediate attention</p>
              </div>
              <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="warning">Medium Risk</Badge>
                  <span className="text-2xl font-heading font-bold text-yellow-600">47</span>
                </div>
                <p className="text-sm text-text-secondary">Contracts need review and monitoring</p>
              </div>
              <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="success">Low Risk</Badge>
                  <span className="text-2xl font-heading font-bold text-green-600">2,782</span>
                </div>
                <p className="text-sm text-text-secondary">Contracts in good standing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
