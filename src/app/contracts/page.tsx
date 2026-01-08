'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout';
import { Button, Input, Select, Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Modal, ModalFooter } from '@/components/ui';

// Mock contract data
const mockContracts = [
  {
    id: 1,
    name: 'Vendor Service Agreement',
    party: 'Acme Corp',
    type: 'Service Agreement',
    status: 'active',
    startDate: '2024-01-15',
    expiryDate: '2025-12-31',
    value: '$125,000',
    tags: ['Vendor', 'Critical'],
  },
  {
    id: 2,
    name: 'Software License Agreement',
    party: 'TechSoft Solutions',
    type: 'License',
    status: 'expiring',
    startDate: '2023-02-20',
    expiryDate: '2025-02-15',
    value: '$45,000',
    tags: ['Software', 'IT'],
  },
  {
    id: 3,
    name: 'Consulting Services Contract',
    party: 'Global Consultants Inc',
    type: 'Professional Services',
    status: 'active',
    startDate: '2024-07-01',
    expiryDate: '2026-06-30',
    value: '$230,000',
    tags: ['Consulting', 'Strategic'],
  },
  {
    id: 4,
    name: 'Maintenance Agreement',
    party: 'ServicePro Ltd',
    type: 'Service Agreement',
    status: 'pending',
    startDate: '2024-10-01',
    expiryDate: '2025-09-20',
    value: '$18,500',
    tags: ['Maintenance'],
  },
  {
    id: 5,
    name: 'Office Lease Agreement',
    party: 'Property Holdings LLC',
    type: 'Real Estate',
    status: 'active',
    startDate: '2023-01-01',
    expiryDate: '2028-12-31',
    value: '$1,200,000',
    tags: ['Real Estate', 'Long-term'],
  },
  {
    id: 6,
    name: 'Marketing Services Agreement',
    party: 'Creative Agency Co',
    type: 'Professional Services',
    status: 'active',
    startDate: '2024-03-15',
    expiryDate: '2025-03-14',
    value: '$95,000',
    tags: ['Marketing'],
  },
];

const contractTypes = [
  { value: '', label: 'All Types' },
  { value: 'service', label: 'Service Agreement' },
  { value: 'license', label: 'License' },
  { value: 'professional', label: 'Professional Services' },
  { value: 'realestate', label: 'Real Estate' },
];

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'expiring', label: 'Expiring Soon' },
  { value: 'pending', label: 'Pending' },
  { value: 'expired', label: 'Expired' },
];

export default function ContractsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    // Handle upload logic here
    console.log('Uploading file:', selectedFile?.name);
    setShowUploadModal(false);
    setSelectedFile(null);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-heading font-bold text-content">Contract Repository</h1>
            <p className="text-content-muted mt-1">Manage and organize your contract portfolio</p>
          </div>
          <Button variant="primary" onClick={() => setShowUploadModal(true)}>
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload Contract
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search by contract name, party, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
              />
            </div>
            <Select
              options={contractTypes}
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              placeholder="Filter by type"
            />
            <Select
              options={statusOptions}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              placeholder="Filter by status"
            />
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-content-muted">Total Contracts</p>
            <p className="text-2xl font-heading font-bold text-content mt-1">2,847</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-content-muted">Active</p>
            <p className="text-2xl font-heading font-bold text-green-600 mt-1">2,456</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-content-muted">Expiring Soon</p>
            <p className="text-2xl font-heading font-bold text-yellow-600 mt-1">24</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-content-muted">Total Value</p>
            <p className="text-2xl font-heading font-bold text-content mt-1">$24.8M</p>
          </div>
        </div>

        {/* Contracts Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contract Name</TableHead>
                <TableHead>Party</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockContracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-content">{contract.name}</p>
                      <div className="flex gap-1 mt-1">
                        {contract.tags.map((tag, index) => (
                          <Badge key={index} variant="neutral" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{contract.party}</TableCell>
                  <TableCell>{contract.type}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>{contract.expiryDate}</TableCell>
                  <TableCell className="font-medium">{contract.value}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-content-muted">Showing 1-6 of 2,847 contracts</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">1</Button>
            <Button variant="primary" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">...</Button>
            <Button variant="outline" size="sm">475</Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload New Contract"
        description="Upload a contract document for AI-powered analysis and processing"
        size="lg"
      >
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
            <svg className="w-12 h-12 mx-auto text-content-muted mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-content font-medium mb-1">Drop your file here or click to browse</p>
            <p className="text-sm text-content-muted mb-4">Supported formats: PDF, DOCX, DOC (Max 50MB)</p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-content hover:bg-gray-50 transition-colors cursor-pointer">
              Choose File
            </label>
            {selectedFile && (
              <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                <p className="text-sm text-content">
                  <span className="font-medium">Selected:</span> {selectedFile.name}
                </p>
              </div>
            )}
          </div>

          <Input label="Contract Name" placeholder="Enter contract name" fullWidth />
          <Input label="Counterparty" placeholder="Enter other party name" fullWidth />
          <Select
            label="Contract Type"
            options={contractTypes.slice(1)}
            placeholder="Select contract type"
            fullWidth
          />
        </div>

        <ModalFooter>
          <Button variant="outline" onClick={() => setShowUploadModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpload} disabled={!selectedFile}>
            Upload & Analyze
          </Button>
        </ModalFooter>
      </Modal>
    </AppLayout>
  );
}
