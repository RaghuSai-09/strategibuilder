'use client';

import { useCallback, useEffect, useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { useNotifications, type Toast as ToastType } from '@/context/NotificationProvider';

function ToastItem({ toast, onDismiss }: { toast: ToastType; onDismiss: () => void }) {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);
  const duration = toast.duration ?? 5000;

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(onDismiss, 300);
  }, [onDismiss]);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(timer);
        handleDismiss();
      }
    }, 50);

    return () => clearInterval(timer);
  }, [duration, handleDismiss]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const progressColors = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div
      className={`relative bg-white rounded-xl shadow-2xl border border-navy-100 overflow-hidden transform transition-all duration-300 pointer-events-auto max-w-sm w-full ${
        isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100 animate-slide-in-right'
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        <div className="flex-shrink-0 mt-0.5">{icons[toast.type]}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-navy-900">{toast.title}</p>
          {toast.message && (
            <p className="text-xs text-navy-600 mt-0.5 leading-relaxed">{toast.message}</p>
          )}
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 text-navy-400 hover:text-navy-600 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-navy-50">
        <div
          className={`h-full ${progressColors[toast.type]} transition-all duration-100 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export function ToastContainer() {
  const { toasts, dismissToast } = useNotifications();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col-reverse gap-3 pointer-events-none">
      {toasts.slice(-5).map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => dismissToast(toast.id)} />
      ))}
    </div>
  );
}
