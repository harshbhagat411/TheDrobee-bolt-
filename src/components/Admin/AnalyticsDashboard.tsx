import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, ShoppingBag, DollarSign, UserCheck } from 'lucide-react';

interface AnalyticsData {
  totalUsers: number;
  totalRentals: number;
  totalRevenue: number;
  activeCreators: number;
  monthlyGrowth: Array<{ month: string; users: number; revenue: number }>;
  userRatio: Array<{ name: string; value: number }>;
}

interface AnalyticsDashboardProps {
  data: AnalyticsData;
}

const StatCard = ({
  icon: Icon,
  title,
  value,
  trend
}: {
  icon: any;
  title: string;
  value: string | number;
  trend?: string
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-red-50 rounded-lg">
        <Icon className="w-6 h-6 text-red-600" />
      </div>
      {trend && (
        <span className="text-sm text-green-600 font-medium flex items-center">
          <TrendingUp className="w-4 h-4 mr-1" />
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

export default function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
  const COLORS = ['#DC2626', '#FCA5A5'];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Users"
          value={data.totalUsers.toLocaleString()}
          trend="+12.5%"
        />
        <StatCard
          icon={ShoppingBag}
          title="Total Rentals"
          value={data.totalRentals.toLocaleString()}
          trend="+8.3%"
        />
        <StatCard
          icon={DollarSign}
          title="Total Revenue"
          value={formatCurrency(data.totalRevenue)}
          trend="+18.2%"
        />
        <StatCard
          icon={UserCheck}
          title="Active Creators"
          value={data.activeCreators}
          trend="+5.7%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.monthlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#DC2626"
                strokeWidth={2}
                name="Users"
                dot={{ fill: '#DC2626', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#FCA5A5"
                strokeWidth={2}
                name="Revenue ($)"
                dot={{ fill: '#FCA5A5', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">User Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.userRatio}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.userRatio.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {data.userRatio.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
