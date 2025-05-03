'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock system metrics
const generateMockMetrics = () => {
  return {
    systemLoad: Math.random() * 100,
    memoryUsage: Math.random() * 100,
    diskUsage: 40 + Math.random() * 30,
    activeUsers: Math.floor(Math.random() * 100),
    apiRequests: {
      total: 12500 + Math.floor(Math.random() * 1000),
      successful: 12000 + Math.floor(Math.random() * 500),
      failed: Math.floor(Math.random() * 100),
    },
    responseTime: 100 + Math.random() * 200,
  };
};

export default function SystemMonitoring() {
  const [metrics, setMetrics] = useState(generateMockMetrics());
  const [refreshInterval, setRefreshInterval] = useState(30);

  useEffect(() => {
    // Simulate live metrics updates
    const interval = setInterval(() => {
      setMetrics(generateMockMetrics());
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  // Calculate API success rate
  const successRate =
    (metrics.apiRequests.successful / metrics.apiRequests.total) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">System Monitoring</h2>
          <p className="text-gray-500">
            Real-time system health and performance metrics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Refresh every:</span>
          <select
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
            className="p-1 border rounded text-sm"
          >
            <option value={10}>10 seconds</option>
            <option value={30}>30 seconds</option>
            <option value={60}>1 minute</option>
            <option value={300}>5 minutes</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.systemLoad.toFixed(2)}%
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${metrics.systemLoad > 80 ? 'bg-red-500' : metrics.systemLoad > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                style={{ width: `${metrics.systemLoad}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.memoryUsage.toFixed(2)}%
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${metrics.memoryUsage > 80 ? 'bg-red-500' : metrics.memoryUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                style={{ width: `${metrics.memoryUsage}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.diskUsage.toFixed(2)}%
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${metrics.diskUsage > 80 ? 'bg-red-500' : metrics.diskUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                style={{ width: `${metrics.diskUsage}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeUsers}</div>
            <div className="text-sm text-gray-500">Live connections</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>API Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Success Rate</span>
                  <span className="text-sm font-medium">
                    {successRate.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${successRate > 98 ? 'bg-green-500' : successRate > 95 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${successRate}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold">
                    {metrics.apiRequests.total.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">Total Requests</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-green-600">
                    {metrics.apiRequests.successful.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">Successful</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-red-600">
                    {metrics.apiRequests.failed.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">Failed</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Avg. Response Time</span>
                  <span className="text-sm font-medium">
                    {metrics.responseTime.toFixed(0)} ms
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${metrics.responseTime > 300 ? 'bg-red-500' : metrics.responseTime > 200 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${(metrics.responseTime / 500) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {[
                {
                  type: 'warning',
                  message: 'High memory usage detected',
                  time: '2 minutes ago',
                },
                {
                  type: 'error',
                  message: 'Database connection timeout',
                  time: '15 minutes ago',
                },
                {
                  type: 'info',
                  message: 'System backup completed',
                  time: '1 hour ago',
                },
                {
                  type: 'success',
                  message: 'Software update successful',
                  time: '3 hours ago',
                },
                {
                  type: 'info',
                  message: 'New user registration spike',
                  time: '5 hours ago',
                },
                {
                  type: 'warning',
                  message: 'Unusual login pattern detected',
                  time: '6 hours ago',
                },
              ].map((event, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50"
                >
                  <div
                    className={`rounded-full p-1
                    ${
                      event.type === 'error'
                        ? 'bg-red-100 text-red-600'
                        : event.type === 'warning'
                          ? 'bg-yellow-100 text-yellow-600'
                          : event.type === 'success'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {event.type === 'error' ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      ) : event.type === 'warning' ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      ) : event.type === 'success' ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      )}
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{event.message}</p>
                      <span className="text-xs text-gray-500">
                        {event.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
