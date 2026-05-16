'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, Check, CheckCheck, Trash2, Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { useNotifications, type NotificationType } from '@/context/NotificationProvider';
import Link from 'next/link';

function getRelativeTime(dateStr: string): string {
  const now = Date.now();
  const diff = now - new Date(dateStr).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getTypeIcon(type: NotificationType) {
  switch (type) {
    case 'success':
      return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    case 'error':
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return <Info className="w-4 h-4 text-blue-500" />;
  }
}

function getTypeBg(type: NotificationType) {
  switch (type) {
    case 'success':
      return 'bg-emerald-50';
    case 'warning':
      return 'bg-amber-50';
    case 'error':
      return 'bg-red-50';
    default:
      return 'bg-blue-50';
  }
}

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll } =
    useNotifications();

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-navy-500 hover:text-navy-700 hover:bg-navy-50 rounded-lg transition-colors"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center px-1 bg-red-500 text-white text-[10px] font-bold rounded-full animate-scale-in">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-navy-100 overflow-hidden z-50 animate-scale-in origin-top-right">
          {/* Header */}
          <div className="px-5 py-4 border-b border-navy-100 flex items-center justify-between bg-gradient-to-r from-navy-50 to-slate-50">
            <div>
              <h3 className="font-bold text-navy-900 text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <p className="text-xs text-navy-500 mt-0.5">
                  {unreadCount} unread
                </p>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="p-1.5 text-navy-500 hover:text-navy-700 hover:bg-navy-100 rounded-lg transition-colors"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={() => {
                    clearAll();
                    setIsOpen(false);
                  }}
                  className="p-1.5 text-navy-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Clear all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Notification List */}
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <div className="w-12 h-12 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bell className="w-6 h-6 text-navy-300" />
                </div>
                <p className="text-sm font-medium text-navy-700">All caught up!</p>
                <p className="text-xs text-navy-500 mt-1">No notifications to show</p>
              </div>
            ) : (
              <div className="divide-y divide-navy-50">
                {notifications.map((notification) => {
                  const content = (
                    <div
                      className={`px-5 py-3.5 flex items-start gap-3 hover:bg-navy-50/50 transition-colors group cursor-pointer ${
                        !notification.read ? 'bg-blue-50/30' : ''
                      }`}
                      onClick={() => {
                        markAsRead(notification.id);
                        if (!notification.href) setIsOpen(false);
                      }}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg ${getTypeBg(notification.type)} flex items-center justify-center flex-shrink-0 mt-0.5`}
                      >
                        {getTypeIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-navy-900 truncate">
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-navy-600 mt-0.5 line-clamp-2 leading-relaxed">
                          {notification.message}
                        </p>
                        <p className="text-[11px] text-navy-400 mt-1.5">
                          {getRelativeTime(notification.timestamp)}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                        className="p-1 text-navy-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all rounded flex-shrink-0"
                        title="Remove"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );

                  if (notification.href) {
                    return (
                      <Link
                        key={notification.id}
                        href={notification.href}
                        onClick={() => setIsOpen(false)}
                        className="block"
                      >
                        {content}
                      </Link>
                    );
                  }

                  return <div key={notification.id}>{content}</div>;
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
