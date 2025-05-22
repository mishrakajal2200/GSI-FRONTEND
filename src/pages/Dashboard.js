import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Home, BarChart2, ShoppingCart, Users, Settings, Search, Bell, User, ChevronDown, DollarSign, Package, CreditCard, Activity, Menu, LogOut, MessageSquare, Upload, Download, Mail, ChevronRight } from 'lucide-react';

// Sample Data for the Chart
const salesData = [
  { name: 'Jan', sales: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', sales: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', sales: 5000, pv: 9800, amt: 2290 },
  { name: 'Apr', sales: 4500, pv: 3908, amt: 2000 },
  { name: 'May', sales: 6000, pv: 4800, amt: 2181 },
  { name: 'Jun', sales: 5500, pv: 3800, amt: 2500 },
  { name: 'Jul', sales: 6200, pv: 4300, amt: 2100 },
  { name: 'Aug', sales: 5800, pv: 4500, amt: 2300 },
  { name: 'Sep', sales: 7000, pv: 5000, amt: 2400 },
  { name: 'Oct', sales: 6500, pv: 4700, amt: 2200 },
  { name: 'Nov', sales: 7200, pv: 5200, amt: 2500 },
  { name: 'Dec', sales: 8000, pv: 6000, amt: 2600 },
];

// Sample Data for Recent Orders Table (Expanded for infinite pagination demonstration)
const allRecentOrders = [
  { id: '#001', customer: 'Alice Smith', date: '2023-05-10', amount: '$120.00', status: 'Completed' },
  { id: '#002', customer: 'Bob Johnson', date: '2023-05-09', amount: '$85.50', status: 'Pending' },
  { id: '#003', customer: 'Charlie Brown', date: '2023-05-08', amount: '$210.75', status: 'Shipped' },
  { id: '#004', customer: 'Diana Prince', date: '2023-05-07', amount: '$50.00', status: 'Cancelled' },
  { id: '#005', customer: 'Eve Adams', date: '2023-05-06', amount: '$150.20', status: 'Completed' },
  { id: '#006', customer: 'Frank White', date: '2023-05-05', amount: '$99.99', status: 'Completed' },
  { id: '#007', customer: 'Grace Lee', date: '2023-05-04', amount: '$300.00', status: 'Shipped' },
  { id: '#008', customer: 'Henry King', date: '2023-05-03', amount: '$75.25', status: 'Pending' },
  { id: '#009', customer: 'Ivy Green', date: '2023-05-02', amount: '$180.00', status: 'Completed' },
  { id: '#010', customer: 'Jack Black', date: '2023-05-01', amount: '$25.00', status: 'Cancelled' },
  { id: '#011', customer: 'Karen Blue', date: '2023-04-30', amount: '$110.00', status: 'Completed' },
  { id: '#012', customer: 'Liam Red', date: '2023-04-29', amount: '$195.00', status: 'Shipped' },
  { id: '#013', customer: 'Mia Green', date: '2023-04-28', amount: '$220.00', status: 'Completed' },
  { id: '#014', customer: 'Noah Brown', date: '2023-04-27', amount: '$65.00', status: 'Pending' },
  { id: '#015', customer: 'Olivia White', date: '2023-04-26', amount: '$175.00', status: 'Shipped' },
];


// Sample Data for Recent Activities
const recentActivities = [
  { id: 1, type: 'Order', description: 'New order from Alice Smith', time: '2 hours ago' },
  { id: 2, type: 'User', description: 'John Doe updated his profile', time: '5 hours ago' },
  { id: 3, type: 'Product', description: 'Product "Laptop Pro" added to inventory', time: '1 day ago' },
  { id: 4, type: 'Report', description: 'Monthly sales report generated', time: '2 days ago' },
];

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);

  // Infinite Pagination states for Recent Orders
  const initialLoadCount = 5; // Number of orders to display initially
  const loadMoreStep = 5;    // Number of additional orders to load each time
  const [visibleOrdersCount, setVisibleOrdersCount] = React.useState(initialLoadCount);

  // Get current orders for the table
  const currentOrders = allRecentOrders.slice(0, visibleOrdersCount);

  // Check if there are more orders to load
  const hasMoreOrders = visibleOrdersCount < allRecentOrders.length;

  // Handle loading more orders
  const handleLoadMore = () => {
    setVisibleOrdersCount(prevCount => prevCount + loadMoreStep);
  };

  // Function to close sidebar when clicking outside on mobile
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Function to handle export action
  const handleExport = () => {
    console.log('Export button clicked!');
    alert('Export functionality would be implemented here!');
  };

  // Function to handle import action
  const handleImport = () => {
    console.log('Import button clicked!');
    alert('Import functionality would be implemented here!');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans text-gray-800">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-gray-200 shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } rounded-r-3xl`}
      >
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-3xl font-extrabold text-indigo-400 tracking-wider">AdminFlow</h1>
        </div>
        <nav className="mt-8">
          <a
            href="cdkd"
            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-indigo-400 transition-all duration-200 rounded-xl mx-3 my-2 font-medium group"
          >
            <Home className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Dashboard
          </a>
          <a
            href="dmmkc"
            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-indigo-400 transition-all duration-200 rounded-xl mx-3 my-2 font-medium group"
          >
            <BarChart2 className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Analytics
          </a>
          <a
            href="dcdk"
            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-indigo-400 transition-all duration-200 rounded-xl mx-3 my-2 font-medium group"
          >
            <ShoppingCart className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Products
          </a>
          <a
            href="dcndkd"
            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-indigo-400 transition-all duration-200 rounded-xl mx-3 my-2 font-medium group"
          >
            <Users className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Users
          </a>
          <a
            href="dcdkc"
            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-indigo-400 transition-all duration-200 rounded-xl mx-3 my-2 font-medium group"
          >
            <Mail className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Subscribers
          </a>
          <a
            href="dcdkc"
            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-indigo-400 transition-all duration-200 rounded-xl mx-3 my-2 font-medium group"
          >
            <Settings className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Settings
          </a>
        </nav>
      </aside>

      {/* Backdrop for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden animate-fade-in"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-lg p-4 flex items-center justify-between sticky top-0 z-40 rounded-b-3xl border-b border-gray-100">
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="relative flex-1 max-w-md mx-4 lg:mx-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all duration-200 text-sm"
            />
          </div>
          <div className="flex items-center space-x-4">
            {/* Export Button */}
            <button
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-2 text-sm font-semibold transform hover:scale-105"
              onClick={handleExport}
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:block">Export</span>
            </button>
            {/* Import Button */}
            <button
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-2 text-sm font-semibold transform hover:scale-105"
              onClick={handleImport}
            >
              <Upload className="w-4 h-4" />
              <span className="hidden md:block">Import</span>
            </button>

            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors duration-200 relative" aria-label="Notifications">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
            </button>
            <div className="relative">
              <div
                className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                aria-haspopup="true"
                aria-expanded={isUserDropdownOpen}
              >
                <User className="w-9 h-9 text-indigo-600 bg-indigo-100 p-1.5 rounded-full shadow-inner" />
                <span className="font-semibold hidden md:block text-gray-700">John Doe</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-1 z-50 transform origin-top-right animate-scale-in">
                  <a href="cdc" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-150">
                    <User className="w-4 h-4 mr-2" /> Profile
                  </a>
                  <a href="dcd" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-150">
                    <Settings className="w-4 h-4 mr-2" /> Settings
                  </a>
                  <div className="border-t border-gray-100 my-1"></div>
                  <a href="dcd" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-150">
                    <LogOut className="w-4 h-4 mr-2" /> Sign Out
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-3xl shadow-xl flex items-center justify-between transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-gray-100">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Sales</p>
                <h3 className="text-3xl font-extrabold text-gray-900">$12,450</h3>
              </div>
              <DollarSign className="w-14 h-14 text-green-500 opacity-50" />
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-xl flex items-center justify-between transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-gray-100">
              <div>
                <p className="text-sm text-gray-500 mb-1">New Orders</p>
                <h3 className="text-3xl font-extrabold text-gray-900">256</h3>
              </div>
              <Package className="w-14 h-14 text-blue-500 opacity-50" />
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-xl flex items-center justify-between transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-gray-100">
              <div>
                <p className="text-sm text-gray-500 mb-1">Revenue</p>
                <h3 className="text-3xl font-extrabold text-gray-900">$8,900</h3>
              </div>
              <CreditCard className="w-14 h-14 text-purple-500 opacity-50" />
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-xl flex items-center justify-between transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-gray-100">
              <div>
                <p className="text-sm text-gray-500 mb-1">Active Users</p>
                <h3 className="text-3xl font-extrabold text-gray-900">1,234</h3>
              </div>
              <Activity className="w-14 h-14 text-orange-500 opacity-50" />
            </div>
          </div>

          {/* Sales Chart, Recent Orders, and Recent Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Sales Performance</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={salesData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <Tooltip
                      cursor={{ strokeDasharray: '3 3', stroke: '#a78bfa' }}
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.15)', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(5px)' }}
                      labelStyle={{ color: '#4b5563', fontWeight: 'bold', marginBottom: '5px' }}
                      itemStyle={{ color: '#4b5563' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#6366f1"
                      strokeWidth={3}
                      dot={{ r: 5, fill: '#6366f1', stroke: 'white', strokeWidth: 2 }}
                      activeDot={{ r: 8, fill: '#4f46e5', stroke: '#4f46e5', strokeWidth: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-xl">Order ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-xl">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {currentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-indigo-50 transition-colors duration-150">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === 'Completed'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : order.status === 'Shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{order.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Load More Button */}
              {hasMoreOrders && (
                <div className="mt-6 text-center">
                  <button
                    onClick={handleLoadMore}
                    className="px-6 py-2 bg-indigo-500 text-white rounded-full shadow-md hover:bg-indigo-600 transition-colors duration-200 text-sm font-semibold"
                  >
                    Load More Orders
                  </button>
                </div>
              )}
              {!hasMoreOrders && (
                <div className="mt-6 text-center text-gray-500 text-sm">
                  All orders loaded.
                </div>
              )}
            </div>

            {/* Recent Activities */}
            <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Activities</h3>
              <ul className="divide-y divide-gray-100">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="py-3 flex items-start hover:bg-indigo-50 transition-colors duration-150 rounded-lg px-2 -mx-2">
                    <MessageSquare className="w-5 h-5 text-indigo-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-right">
                <a href="dck" className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center justify-end">
                  View All Activities <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
