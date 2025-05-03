'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Role {
  id: number;
  name: string;
  description: string;
}

interface Permission {
  id: number;
  name: string;
  description: string;
}

export default function RolePermissions() {
  const [roles, setRoles] = useState<Role[]>([
    { id: 1, name: 'Admin', description: 'Full system access' },
    { id: 2, name: 'Manager', description: 'Departmental management access' },
    { id: 3, name: 'User', description: 'Basic user access' },
  ]);

  const [permissions, setPermissions] = useState<Permission[]>([
    { id: 1, name: 'View Users', description: 'Can view user listings' },
    { id: 2, name: 'Edit Users', description: 'Can edit user information' },
    { id: 3, name: 'Delete Users', description: 'Can remove users' },
    {
      id: 4,
      name: 'Manage Roles',
      description: 'Can modify roles and permissions',
    },
    {
      id: 5,
      name: 'View Transactions',
      description: 'Can view transaction data',
    },
    {
      id: 6,
      name: 'Approve Transactions',
      description: 'Can approve pending transactions',
    },
  ]);

  //   Investor
  // DAO Member
  // Mock role-permission mappings
  const [rolePermissions, setRolePermissions] = useState<
    Record<number, number[]>
  >({
    1: [1, 2, 3, 4, 5, 6], // Admin has all permissions
    2: [1, 2, 5, 6], // Manager has some permissions
    3: [1, 5], // User has limited permissions
  });

  const togglePermission = (roleId: number, permissionId: number) => {
    setRolePermissions((prev) => {
      const updatedPermissions = { ...prev };

      if (updatedPermissions[roleId].includes(permissionId)) {
        updatedPermissions[roleId] = updatedPermissions[roleId].filter(
          (id) => id !== permissionId
        );
      } else {
        updatedPermissions[roleId] = [
          ...updatedPermissions[roleId],
          permissionId,
        ];
      }

      return updatedPermissions;
    });

    // Log for audit
    console.log(`AUDIT LOG: Permission access changed`, {
      roleId,
      permissionId,
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Roles & Permissions</h2>
        <p className="text-gray-500">
          Manage access control for different user roles
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Permission</TableHead>
              {roles.map((role) => (
                <TableHead key={role.id}>{role.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{permission.name}</div>
                    <div className="text-sm text-gray-500">
                      {permission.description}
                    </div>
                  </div>
                </TableCell>
                {roles.map((role) => (
                  <TableCell key={role.id} className="text-center">
                    <input
                      type="checkbox"
                      checked={rolePermissions[role.id]?.includes(
                        permission.id
                      )}
                      onChange={() => togglePermission(role.id, permission.id)}
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
