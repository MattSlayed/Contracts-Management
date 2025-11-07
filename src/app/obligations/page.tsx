'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, Select, Input, Modal, ModalFooter, TextArea } from '@/components/ui';

// Mock obligations data
const obligations = [
  {
    id: 1,
    title: 'Quarterly Business Review',
    contract: 'Vendor Service Agreement - Acme Corp',
    assignee: 'John Doe',
    dueDate: '2025-02-15',
    priority: 'high',
    status: 'upcoming',
    description: 'Conduct quarterly review meeting with Acme Corp stakeholders',
  },
  {
    id: 2,
    title: 'Submit Monthly Report',
    contract: 'Consulting Services Contract - Global Consultants Inc',
    assignee: 'Jane Smith',
    dueDate: '2025-02-05',
    priority: 'medium',
    status: 'in_progress',
    description: 'Prepare and submit monthly progress report',
  },
  {
    id: 3,
    title: 'Renewal Notice Period',
    contract: 'Software License Agreement - TechSoft Solutions',
    assignee: 'Mike Johnson',
    dueDate: '2025-02-20',
    priority: 'high',
    status: 'upcoming',
    description: 'Send non-renewal notice if not continuing',
  },
  {
    id: 4,
    title: 'Payment Processing',
    contract: 'Maintenance Agreement - ServicePro Ltd',
    assignee: 'Sarah Williams',
    dueDate: '2025-01-31',
    priority: 'medium',
    status: 'overdue',
    description: 'Process vendor payment for Q1 maintenance',
  },
  {
    id: 5,
    title: 'Performance Evaluation',
    contract: 'Marketing Services Agreement - Creative Agency Co',
    assignee: 'John Doe',
    dueDate: '2025-03-01',
    priority: 'low',
    status: 'upcoming',
    description: 'Evaluate vendor performance against KPIs',
  },
  {
    id: 6,
    title: 'Insurance Certificate Renewal',
    contract: 'Office Lease Agreement - Property Holdings LLC',
    assignee: 'Mike Johnson',
    dueDate: '2025-02-10',
    priority: 'high',
    status: 'in_progress',
    description: 'Submit updated insurance certificates',
  },
];

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'completed', label: 'Completed' },
];

const priorityOptions = [
  { value: 'all', label: 'All Priorities' },
  { value: 'high', label: 'High Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'low', label: 'Low Priority' },
];

export default function ObligationsPage() {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="info" dot>Upcoming</Badge>;
      case 'in_progress':
        return <Badge variant="warning" dot>In Progress</Badge>;
      case 'overdue':
        return <Badge variant="danger" dot>Overdue</Badge>;
      case 'completed':
        return <Badge variant="success" dot>Completed</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="danger" size="sm">High</Badge>;
      case 'medium':
        return <Badge variant="warning" size="sm">Medium</Badge>;
      case 'low':
        return <Badge variant="info" size="sm">Low</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{priority}</Badge>;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-heading font-bold text-text-primary">Obligations & Milestones</h1>
            <p className="text-text-secondary mt-1">Track and manage contract obligations and deadlines</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white rounded-lg border border-gray-200 p-1 flex">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewMode === 'calendar' ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Obligation
            </Button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card variant="elevated">
            <CardContent>
              <p className="text-sm text-text-secondary mb-1">Total Active</p>
              <h3 className="text-3xl font-heading font-bold text-text-primary">127</h3>
              <p className="text-sm text-text-secondary mt-2">Across all contracts</p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent>
              <p className="text-sm text-text-secondary mb-1">Due This Week</p>
              <h3 className="text-3xl font-heading font-bold text-yellow-600">18</h3>
              <p className="text-sm text-yellow-600 mt-2">Requires attention</p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent>
              <p className="text-sm text-text-secondary mb-1">Overdue</p>
              <h3 className="text-3xl font-heading font-bold text-red-600">3</h3>
              <p className="text-sm text-red-600 mt-2">Immediate action needed</p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent>
              <p className="text-sm text-text-secondary mb-1">Completed This Month</p>
              <h3 className="text-3xl font-heading font-bold text-green-600">42</h3>
              <p className="text-sm text-green-600 mt-2">↑ 15% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex gap-4">
          <Input
            placeholder="Search obligations..."
            className="flex-1"
            leftIcon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
          <Select
            options={statusOptions}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          />
          <Select
            options={priorityOptions}
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
          />
        </div>

        {/* Obligations List/Calendar */}
        {viewMode === 'list' ? (
          <div className="space-y-3">
            {obligations.map((obligation) => (
              <Card key={obligation.id} variant="bordered" hover>
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-heading font-semibold text-text-primary">
                              {obligation.title}
                            </h3>
                            {getPriorityBadge(obligation.priority)}
                            {getStatusBadge(obligation.status)}
                          </div>
                          <p className="text-sm text-text-secondary mb-2">{obligation.contract}</p>
                          <p className="text-sm text-text-primary mb-3">{obligation.description}</p>
                          <div className="flex items-center gap-6 text-sm text-text-secondary">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              {obligation.assignee}
                            </div>
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {obligation.dueDate}
                            </div>
                            <div className={`font-medium ${
                              obligation.status === 'overdue' ? 'text-red-600' :
                              getDaysUntilDue(obligation.dueDate).includes('tomorrow') || getDaysUntilDue(obligation.dueDate).includes('today') ? 'text-yellow-600' :
                              'text-text-secondary'
                            }`}>
                              {getDaysUntilDue(obligation.dueDate)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="ghost" size="sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>February 2025</CardTitle>
              <CardDescription>Calendar view of upcoming obligations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center font-semibold text-sm text-text-secondary p-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const dayNum = i - 2;
                  const hasObligation = [5, 10, 15, 20].includes(dayNum);

                  return (
                    <div
                      key={i}
                      className={`min-h-[80px] p-2 border rounded-lg ${
                        dayNum < 1 || dayNum > 29 ? 'bg-gray-50 text-text-secondary' :
                        hasObligation ? 'bg-primary/5 border-primary/20 cursor-pointer hover:bg-primary/10' :
                        'bg-white hover:bg-gray-50 cursor-pointer'
                      }`}
                    >
                      {dayNum > 0 && dayNum <= 29 && (
                        <>
                          <div className="font-medium text-sm mb-1">{dayNum}</div>
                          {hasObligation && (
                            <div className="text-xs">
                              <div className="bg-primary text-white rounded px-1 py-0.5 mb-1 truncate">
                                Task due
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Obligation Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Obligation"
        description="Create a new obligation or milestone for a contract"
        size="lg"
      >
        <div className="space-y-4">
          <Input label="Obligation Title" placeholder="Enter obligation title" fullWidth />
          <Select
            label="Related Contract"
            options={[
              { value: '1', label: 'Vendor Service Agreement - Acme Corp' },
              { value: '2', label: 'Software License Agreement - TechSoft Solutions' },
            ]}
            placeholder="Select contract"
            fullWidth
          />
          <TextArea
            label="Description"
            placeholder="Describe the obligation or milestone"
            rows={3}
            fullWidth
          />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Due Date" type="date" fullWidth />
            <Select
              label="Priority"
              options={priorityOptions.slice(1)}
              fullWidth
            />
          </div>
          <Input label="Assignee" placeholder="Assign to team member" fullWidth />
        </div>

        <ModalFooter>
          <Button variant="outline" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setShowAddModal(false)}>
            Create Obligation
          </Button>
        </ModalFooter>
      </Modal>
    </AppLayout>
  );
}
