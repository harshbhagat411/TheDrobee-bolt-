import { useState, useEffect } from 'react';
import { LayoutDashboard, UserCheck, Users } from 'lucide-react';
import AnalyticsDashboard from '../components/Admin/AnalyticsDashboard';
import VerificationList from '../components/Admin/VerificationList';
import UserManagement from '../components/Admin/UserManagement';

type TabType = 'dashboard' | 'verification' | 'users';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [adminData, setAdminData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/adminData.json')
      .then(res => res.json())
      .then(data => {
        setAdminData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading admin data:', error);
        setLoading(false);
      });
  }, []);

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'verification' as TabType, label: 'Verification Requests', icon: UserCheck },
    { id: 'users' as TabType, label: 'User Management', icon: Users },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your Drobe platform</p>
          </div>

          <div className="flex space-x-1 overflow-x-auto pb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gray-50 text-red-600 border-b-2 border-red-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && adminData && (
          <AnalyticsDashboard data={adminData.analytics} />
        )}

        {activeTab === 'verification' && adminData && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Creator Verification Requests</h2>
              <p className="text-gray-600 mt-1">
                Review and approve creators who want to rent out their fashion items
              </p>
            </div>
            <VerificationList requests={adminData.verificationRequests} />
          </div>
        )}

        {activeTab === 'users' && adminData && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">User Management</h2>
              <p className="text-gray-600 mt-1">
                View and manage all registered users on the platform
              </p>
            </div>
            <UserManagement users={adminData.users} />
          </div>
        )}
      </div>
    </div>
  );
}
