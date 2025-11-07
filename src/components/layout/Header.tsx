'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui';

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Mock notifications count
  const notificationsCount = 3;

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search contracts, parties, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Right side: Notifications, Help, User Menu */}
      <div className="flex items-center gap-4 ml-8">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                {notificationsCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="font-heading font-semibold text-text-primary">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {/* Mock notifications */}
                <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                  <div className="flex items-start gap-3">
                    <Badge variant="warning" size="sm" dot />
                    <div className="flex-1">
                      <p className="text-sm text-text-primary">Contract expiring soon</p>
                      <p className="text-xs text-text-secondary mt-1">Vendor Agreement ABC expires in 7 days</p>
                      <p className="text-xs text-text-secondary mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                  <div className="flex items-start gap-3">
                    <Badge variant="success" size="sm" dot />
                    <div className="flex-1">
                      <p className="text-sm text-text-primary">Contract uploaded successfully</p>
                      <p className="text-xs text-text-secondary mt-1">Service Agreement XYZ has been processed</p>
                      <p className="text-xs text-text-secondary mt-1">5 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <Badge variant="danger" size="sm" dot />
                    <div className="flex-1">
                      <p className="text-sm text-text-primary">Risk identified in contract</p>
                      <p className="text-xs text-text-secondary mt-1">High-risk clause detected in Contract #1234</p>
                      <p className="text-xs text-text-secondary mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-2 border-t border-gray-200">
                <button className="text-sm text-primary hover:text-primary-accent font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help */}
        <button
          className="p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
          aria-label="Help"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
            aria-label="User menu"
          >
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-heading font-semibold">
              JD
            </div>
            <div className="text-left hidden md:block">
              <p className="text-sm font-medium text-text-primary">John Doe</p>
              <p className="text-xs text-text-secondary">Admin</p>
            </div>
            <svg className="w-4 h-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-sm font-medium text-text-primary">John Doe</p>
                <p className="text-xs text-text-secondary">john.doe@novatek.com</p>
              </div>
              <button className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors">
                Profile Settings
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors">
                Preferences
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors">
                Billing
              </button>
              <div className="border-t border-gray-200 my-2"></div>
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
