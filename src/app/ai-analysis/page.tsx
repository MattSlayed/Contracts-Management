'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Select, Spinner } from '@/components/ui';

// Mock AI analysis data
const mockAnalysis = {
  contractName: 'Vendor Service Agreement',
  party: 'Acme Corp',
  summary: 'This is a comprehensive service agreement between NOVATEK LLC and Acme Corp for the provision of vendor management services. The contract outlines service delivery terms, payment schedules, and termination clauses.',
  keyTerms: [
    { term: 'Parties', value: 'NOVATEK LLC, Acme Corp', confidence: 98 },
    { term: 'Effective Date', value: 'January 15, 2024', confidence: 100 },
    { term: 'Expiration Date', value: 'December 31, 2025', confidence: 100 },
    { term: 'Contract Value', value: '$125,000 USD', confidence: 95 },
    { term: 'Payment Terms', value: 'Net 30 days', confidence: 92 },
    { term: 'Governing Law', value: 'South African Law', confidence: 88 },
  ],
  obligations: [
    {
      party: 'NOVATEK LLC',
      obligation: 'Provide monthly vendor management reports',
      deadline: '5th of each month',
      status: 'active',
    },
    {
      party: 'Acme Corp',
      obligation: 'Make payment within 30 days of invoice',
      deadline: 'Net 30',
      status: 'active',
    },
    {
      party: 'NOVATEK LLC',
      obligation: 'Maintain confidentiality of proprietary information',
      deadline: 'Duration of agreement',
      status: 'active',
    },
    {
      party: 'Acme Corp',
      obligation: 'Provide necessary access to vendor systems',
      deadline: 'Within 5 business days',
      status: 'completed',
    },
  ],
  risks: [
    {
      type: 'High',
      title: 'Unlimited Liability Clause',
      description: 'Section 8.2 contains an unlimited liability clause that exposes the company to significant financial risk. Standard industry practice limits liability to contract value.',
      clause: 'Section 8.2: Indemnification',
      recommendation: 'Negotiate a liability cap equal to 2x the annual contract value.',
    },
    {
      type: 'Medium',
      title: 'Auto-Renewal Terms',
      description: 'The contract automatically renews unless notice is given 90 days prior to expiration. This is longer than typical 30-60 day notice periods.',
      clause: 'Section 12.1: Term and Renewal',
      recommendation: 'Request reduction of notice period to 60 days to align with industry standards.',
    },
    {
      type: 'Low',
      title: 'Non-Standard Force Majeure',
      description: 'Force majeure clause does not include cyber-attacks or pandemic events, which are increasingly common risk factors.',
      clause: 'Section 15.3: Force Majeure',
      recommendation: 'Add language to include cyber incidents and pandemic events in force majeure definition.',
    },
  ],
  clauses: [
    { category: 'Payment Terms', status: 'standard', text: 'Net 30 payment terms with 2% late fee after 60 days' },
    { category: 'Termination', status: 'review', text: 'Either party may terminate with 90 days written notice' },
    { category: 'Confidentiality', status: 'standard', text: 'Standard mutual NDA provisions for 5 years post-termination' },
    { category: 'Liability', status: 'non-standard', text: 'Unlimited liability for both parties' },
    { category: 'Governing Law', status: 'standard', text: 'South African law with Johannesburg jurisdiction' },
  ],
};

const contractOptions = [
  { value: '1', label: 'Vendor Service Agreement - Acme Corp' },
  { value: '2', label: 'Software License Agreement - TechSoft Solutions' },
  { value: '3', label: 'Consulting Services Contract - Global Consultants Inc' },
  { value: '4', label: 'Maintenance Agreement - ServicePro Ltd' },
];

export default function AIAnalysisPage() {
  const [selectedContract, setSelectedContract] = useState('1');
  const [analyzing, setAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'risks' | 'obligations' | 'clauses'>('summary');

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => setAnalyzing(false), 2000);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-primary">AI Analysis</h1>
          <p className="text-text-secondary mt-1">Claude-powered contract analysis and risk assessment</p>
        </div>

        {/* Contract Selection */}
        <Card variant="bordered">
          <CardContent>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Select
                  label="Select Contract for Analysis"
                  options={contractOptions}
                  value={selectedContract}
                  onChange={(e) => setSelectedContract(e.target.value)}
                  fullWidth
                />
              </div>
              <Button variant="primary" onClick={handleAnalyze} loading={analyzing}>
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Analyze with AI
              </Button>
            </div>
          </CardContent>
        </Card>

        {analyzing ? (
          <Card variant="elevated">
            <CardContent>
              <div className="py-12">
                <Spinner size="lg" text="Analyzing contract with Claude AI..." />
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Analysis Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex gap-8">
                {[
                  { id: 'summary', label: 'Summary & Key Terms', icon: '📄' },
                  { id: 'risks', label: 'Risk Assessment', icon: '⚠️' },
                  { id: 'obligations', label: 'Obligations', icon: '✓' },
                  { id: 'clauses', label: 'Clause Analysis', icon: '📋' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-4 px-2 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-primary font-medium'
                        : 'border-transparent text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'summary' && (
                <>
                  {/* Contract Summary */}
                  <Card variant="bordered">
                    <CardHeader>
                      <CardTitle>AI-Generated Summary</CardTitle>
                      <CardDescription>Claude's analysis of the contract overview</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                        <p className="text-text-primary leading-relaxed">{mockAnalysis.summary}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key Terms Extraction */}
                  <Card variant="bordered">
                    <CardHeader>
                      <CardTitle>Extracted Key Terms</CardTitle>
                      <CardDescription>Critical contract information identified by AI</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mockAnalysis.keyTerms.map((item, index) => (
                          <div key={index} className="flex justify-between items-start p-4 bg-neutral-bg rounded-lg">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-text-secondary mb-1">{item.term}</p>
                              <p className="text-base text-text-primary font-medium">{item.value}</p>
                            </div>
                            <Badge
                              variant={item.confidence >= 95 ? 'success' : item.confidence >= 85 ? 'info' : 'warning'}
                              size="sm"
                            >
                              {item.confidence}%
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {activeTab === 'risks' && (
                <div className="space-y-4">
                  {mockAnalysis.risks.map((risk, index) => (
                    <Card key={index} variant="bordered">
                      <CardContent>
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            risk.type === 'High' ? 'bg-red-100 text-red-600' :
                            risk.type === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {risk.type === 'High' ? '🚨' : risk.type === 'Medium' ? '⚠️' : 'ℹ️'}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg font-heading font-semibold text-text-primary">{risk.title}</h3>
                              <Badge
                                variant={
                                  risk.type === 'High' ? 'danger' :
                                  risk.type === 'Medium' ? 'warning' :
                                  'info'
                                }
                              >
                                {risk.type} Risk
                              </Badge>
                            </div>
                            <p className="text-text-primary mb-3">{risk.description}</p>
                            <div className="bg-neutral-bg p-3 rounded-lg mb-3">
                              <p className="text-sm text-text-secondary mb-1">Referenced Clause:</p>
                              <p className="text-sm font-mono text-text-primary">{risk.clause}</p>
                            </div>
                            <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                              <p className="text-sm font-medium text-green-800 mb-1">💡 Recommendation</p>
                              <p className="text-sm text-green-700">{risk.recommendation}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === 'obligations' && (
                <Card variant="bordered">
                  <CardHeader>
                    <CardTitle>Contract Obligations</CardTitle>
                    <CardDescription>Responsibilities and commitments for each party</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockAnalysis.obligations.map((obligation, index) => (
                        <div
                          key={index}
                          className="flex items-start justify-between p-4 bg-neutral-bg rounded-lg hover:bg-primary/5 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="primary" size="sm">{obligation.party}</Badge>
                              <Badge
                                variant={obligation.status === 'active' ? 'success' : 'neutral'}
                                size="sm"
                                dot
                              >
                                {obligation.status}
                              </Badge>
                            </div>
                            <p className="text-text-primary font-medium mb-1">{obligation.obligation}</p>
                            <p className="text-sm text-text-secondary">⏰ {obligation.deadline}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'clauses' && (
                <Card variant="bordered">
                  <CardHeader>
                    <CardTitle>Clause-by-Clause Analysis</CardTitle>
                    <CardDescription>AI assessment of contract clauses against industry standards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockAnalysis.clauses.map((clause, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 bg-neutral-bg rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-text-primary">{clause.category}</h4>
                              <Badge
                                variant={
                                  clause.status === 'standard' ? 'success' :
                                  clause.status === 'review' ? 'warning' :
                                  'danger'
                                }
                                size="sm"
                              >
                                {clause.status === 'standard' ? '✓ Standard' :
                                 clause.status === 'review' ? '⚠ Review' :
                                 '⚠ Non-Standard'}
                              </Badge>
                            </div>
                            <p className="text-sm text-text-secondary">{clause.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
