'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input, Select, TextArea, Badge } from '@/components/ui';

const settingsTabs = [
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'users', label: 'User Management', icon: '👥' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'integrations', label: 'Integrations', icon: '🔌' },
  { id: 'security', label: 'Security', icon: '🔒' },
];

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@novatek.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@novatek.com', role: 'Manager', status: 'active' },
  { id: 3, name: 'Mike Johnson', email: 'mike.johnson@novatek.com', role: 'User', status: 'active' },
  { id: 4, name: 'Sarah Williams', email: 'sarah.williams@novatek.com', role: 'User', status: 'inactive' },
];

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'user', label: 'User' },
  { value: 'viewer', label: 'Viewer' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-primary">Settings</h1>
          <p className="text-text-secondary mt-1">Manage your account and application preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <Card variant="bordered">
              <CardContent>
                <nav className="space-y-1">
                  {settingsTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                        activeTab === tab.id
                          ? 'bg-primary text-white'
                          : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
                      }`}
                    >
                      <span className="text-xl">{tab.icon}</span>
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'profile' && (
              <>
                <Card variant="bordered">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and profile information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-heading font-bold">
                          JD
                        </div>
                        <div>
                          <Button variant="outline" size="sm">Change Photo</Button>
                          <p className="text-xs text-text-secondary mt-2">JPG, PNG or GIF (Max 2MB)</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Input label="First Name" defaultValue="John" fullWidth />
                        <Input label="Last Name" defaultValue="Doe" fullWidth />
                      </div>
                      <Input label="Email Address" type="email" defaultValue="john.doe@novatek.com" fullWidth />
                      <Input label="Job Title" defaultValue="Contract Manager" fullWidth />
                      <Input label="Phone Number" defaultValue="+27 11 123 4567" fullWidth />
                      <div className="flex justify-end gap-3">
                        <Button variant="outline">Cancel</Button>
                        <Button variant="primary">Save Changes</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="bordered">
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password to keep your account secure</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Input label="Current Password" type="password" fullWidth />
                      <Input label="New Password" type="password" fullWidth />
                      <Input label="Confirm New Password" type="password" fullWidth />
                      <div className="flex justify-end">
                        <Button variant="primary">Update Password</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === 'users' && (
              <Card variant="bordered">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>Manage team members and their permissions</CardDescription>
                    </div>
                    <Button variant="primary">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Invite User
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 bg-neutral-bg rounded-lg hover:bg-primary/5 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">{user.name}</p>
                            <p className="text-sm text-text-secondary">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant={user.role === 'Admin' ? 'primary' : 'neutral'}>
                            {user.role}
                          </Badge>
                          <Badge variant={user.status === 'active' ? 'success' : 'neutral'} dot>
                            {user.status}
                          </Badge>
                          <div className="flex gap-2">
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
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-text-primary mb-4">Email Notifications</h4>
                      <div className="space-y-3">
                        {[
                          { label: 'Contract Expiring Soon', description: 'Get notified 30 days before contract expiration' },
                          { label: 'New Risk Identified', description: 'AI detects potential risks in contracts' },
                          { label: 'Obligation Due Soon', description: 'Reminders for upcoming obligations' },
                          { label: 'Weekly Summary Report', description: 'Receive weekly portfolio summary' },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-neutral-bg rounded-lg">
                            <div>
                              <p className="font-medium text-text-primary">{item.label}</p>
                              <p className="text-sm text-text-secondary">{item.description}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" defaultChecked className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary mb-4">Push Notifications</h4>
                      <div className="space-y-3">
                        {[
                          { label: 'Browser Notifications', description: 'Show desktop notifications' },
                          { label: 'Mobile Notifications', description: 'Push notifications to mobile app' },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-neutral-bg rounded-lg">
                            <div>
                              <p className="font-medium text-text-primary">{item.label}</p>
                              <p className="text-sm text-text-secondary">{item.description}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" defaultChecked={index === 0} className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'integrations' && (
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>Connect with third-party services and APIs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Claude AI API', description: 'AI-powered contract analysis', connected: true, icon: '🤖' },
                      { name: 'Google Drive', description: 'Cloud storage integration', connected: true, icon: '📁' },
                      { name: 'Slack', description: 'Team notifications and alerts', connected: false, icon: '💬' },
                      { name: 'Microsoft 365', description: 'Calendar and email integration', connected: false, icon: '📧' },
                      { name: 'DocuSign', description: 'E-signature integration', connected: false, icon: '✍️' },
                    ].map((integration, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-neutral-bg rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center text-2xl">
                            {integration.icon}
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">{integration.name}</p>
                            <p className="text-sm text-text-secondary">{integration.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {integration.connected && (
                            <Badge variant="success" dot>Connected</Badge>
                          )}
                          <Button variant={integration.connected ? 'outline' : 'primary'} size="sm">
                            {integration.connected ? 'Configure' : 'Connect'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'security' && (
              <>
                <Card variant="bordered">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security and privacy</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-neutral-bg rounded-lg">
                        <div>
                          <p className="font-medium text-text-primary">Two-Factor Authentication</p>
                          <p className="text-sm text-text-secondary">Add an extra layer of security to your account</p>
                        </div>
                        <Button variant="primary" size="sm">Enable</Button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-neutral-bg rounded-lg">
                        <div>
                          <p className="font-medium text-text-primary">Active Sessions</p>
                          <p className="text-sm text-text-secondary">Manage devices logged into your account</p>
                        </div>
                        <Button variant="outline" size="sm">View Sessions</Button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-neutral-bg rounded-lg">
                        <div>
                          <p className="font-medium text-text-primary">API Keys</p>
                          <p className="text-sm text-text-secondary">Manage API keys for integrations</p>
                        </div>
                        <Button variant="outline" size="sm">Manage Keys</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="bordered">
                  <CardHeader>
                    <CardTitle>Data & Privacy</CardTitle>
                    <CardDescription>Control your data and privacy settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-neutral-bg rounded-lg">
                        <p className="font-medium text-text-primary mb-2">Export Your Data</p>
                        <p className="text-sm text-text-secondary mb-3">Download a copy of your contract data</p>
                        <Button variant="outline" size="sm">Request Export</Button>
                      </div>
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="font-medium text-red-800 mb-2">Delete Account</p>
                        <p className="text-sm text-red-700 mb-3">Permanently delete your account and all data</p>
                        <Button variant="danger" size="sm">Delete Account</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
