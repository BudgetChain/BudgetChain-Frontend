import AdminDashboardPage from '../components/admin/adminDashboard';
import { AdminAuthGuard } from '../components/admin/auth/adminAuthGuard';

function AdminDashboard() {
  return (
    <AdminAuthGuard>
      <div className="container mx-auto">
        <AdminDashboardPage />
      </div>
    </AdminAuthGuard>
  );
}

export default AdminDashboard;
