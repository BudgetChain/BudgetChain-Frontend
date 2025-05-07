'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock audit data
const MOCK_AUDIT_LOGS = [
  {
    id: 1,
    action: 'User Login',
    user: 'john@example.com',
    timestamp: '2023-11-01T09:23:45Z',
    ipAddress: '192.168.1.1',
    details: 'Successful login',
  },
  {
    id: 2,
    action: 'User Created',
    user: 'admin@example.com',
    timestamp: '2023-11-01T08:15:22Z',
    ipAddress: '192.168.1.10',
    details: 'Created user jane@example.com',
  },
  {
    id: 3,
    action: 'Permission Changed',
    user: 'admin@example.com',
    timestamp: '2023-10-31T15:42:18Z',
    ipAddress: '192.168.1.10',
    details: 'Updated role permissions for Manager role',
  },
  {
    id: 4,
    action: 'Transaction Approved',
    user: 'manager@example.com',
    timestamp: '2023-10-31T14:05:37Z',
    ipAddress: '192.168.1.15',
    details: 'Approved transaction #12345',
  },
  {
    id: 5,
    action: 'Settings Updated',
    user: 'admin@example.com',
    timestamp: '2023-10-30T11:30:12Z',
    ipAddress: '192.168.1.10',
    details: 'Updated system settings',
  },
  {
    id: 6,
    action: 'User Deactivated',
    user: 'admin@example.com',
    timestamp: '2023-10-29T16:22:05Z',
    ipAddress: '192.168.1.10',
    details: 'Deactivated user bob@example.com',
  },
  {
    id: 7,
    action: 'Failed Login Attempt',
    user: 'unknown',
    timestamp: '2023-10-29T08:17:45Z',
    ipAddress: '203.0.113.42',
    details: 'Failed login attempt for account john@example.com',
  },
  {
    id: 8,
    action: 'Database Backup',
    user: 'system',
    timestamp: '2023-10-28T02:00:00Z',
    ipAddress: 'localhost',
    details: 'Automated database backup completed',
  },
  {
    id: 9,
    action: 'API Key Generated',
    user: 'dev@example.com',
    timestamp: '2023-10-27T14:12:33Z',
    ipAddress: '192.168.1.20',
    details: 'Generated new API key for integration',
  },
  {
    id: 10,
    action: 'File Downloaded',
    user: 'john@example.com',
    timestamp: '2023-10-27T11:05:22Z',
    ipAddress: '192.168.1.5',
    details: 'Downloaded financial report',
  },
];

export default function AuditLogs() {
  const [logs, setLogs] = useState(MOCK_AUDIT_LOGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [actionFilter, setActionFilter] = useState('');

  // Filter logs based on search term and filters
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm);

    const matchesDate = dateFilter
      ? new Date(log.timestamp).toLocaleDateString() ===
        new Date(dateFilter).toLocaleDateString()
      : true;

    const matchesAction = actionFilter ? log.action === actionFilter : true;

    return matchesSearch && matchesDate && matchesAction;
  });

  // Get unique actions for the filter dropdown
  const uniqueActions = [...new Set(logs.map((log) => log.action))];

  // Format timestamp for display
  const formatTimestamp = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Audit Logs</h2>
        <p className="text-gray-500">Track and monitor all system activities</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <Input
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <div>
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="w-full h-10 px-3 border rounded"
            >
              <option value="">All Actions</option>
              {uniqueActions.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </div>

          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setDateFilter('');
              setActionFilter('');
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        log.action.includes('Failed')
                          ? 'bg-red-100 text-red-800'
                          : log.action.includes('Created') ||
                              log.action.includes('Approved')
                            ? 'bg-green-100 text-green-800'
                            : log.action.includes('Updated') ||
                                log.action.includes('Changed')
                              ? 'bg-blue-100 text-blue-800'
                              : log.action.includes('Deactivated')
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {log.action}
                    </span>
                  </TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{formatTimestamp(log.timestamp)}</TableCell>
                  <TableCell>{log.ipAddress}</TableCell>
                  <TableCell>{log.details}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No logs matching your search criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {filteredLogs.length} of {logs.length} logs
        </div>
        <Button variant="outline">Export Logs</Button>
      </div>
    </div>
  );
}
