import React, { useState } from "react";
import { FaUsers, FaShoppingCart, FaMoneyBillWave, FaChartBar, FaBell, FaSearch, FaCog, FaSignOutAlt, FaClipboardList, FaUserCog } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ProductForm from "./ProductForm.jsx";
import InventoryForm from "./InventoryForm.jsx";
import CategoryForm from "./CategoryForm.jsx";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeProductTab, setActiveProductTab] = useState("product");

  const stats = [
    { title: "Total Users", value: "10,283", icon: FaUsers, color: "bg-blue-500" },
    { title: "Total Orders", value: "1,849", icon: FaShoppingCart, color: "bg-green-500" },
    { title: "Total Revenue", value: "$45,290", icon: FaMoneyBillWave, color: "bg-yellow-500" },
    { title: "Total Products", value: "1,423", icon: FaChartBar, color: "bg-purple-500" }
  ];

  const recentOrders = [
    { id: "#12345", customer: "John Doe", date: "2023-06-01", status: "Completed", total: "$129.99" },
    { id: "#12346", customer: "Jane Smith", date: "2023-06-02", status: "Processing", total: "$79.99" },
    { id: "#12347", customer: "Bob Johnson", date: "2023-06-03", status: "Shipped", total: "$199.99" },
    { id: "#12348", customer: "Alice Brown", date: "2023-06-04", status: "Pending", total: "$59.99" },
    { id: "#12349", customer: "Charlie Wilson", date: "2023-06-05", status: "Completed", total: "$149.99" }
  ];

  const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4500 },
    { name: "May", sales: 6000 },
    { name: "Jun", sales: 5500 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className={`${stat.color} text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{stat.title}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <stat.icon className="text-5xl opacity-50" />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Sales Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Recent Orders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">Order ID</th>
                      <th className="px-4 py-2 text-left">Customer</th>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {recentOrders.map((order, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2 font-medium">{order.id}</td>
                        <td className="px-4 py-2">{order.customer}</td>
                        <td className="px-4 py-2">{order.date}</td>
                        <td className="px-4 py-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              order.status === "Completed" ? "bg-green-200 text-green-800" :
                                order.status === "Processing" ? "bg-yellow-200 text-yellow-800" :
                                  order.status === "Shipped" ? "bg-blue-200 text-blue-800" :
                                    "bg-red-200 text-red-800"
                            }`}>
                              {order.status}
                            </span>
                        </td>
                        <td className="px-4 py-2 font-medium">{order.total}</td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      case "products":
        return (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Products Management</h2>
            <div className="mb-6">
              <nav className="flex space-x-4">
                <button
                  className={`px-4 py-2 rounded-lg ${activeProductTab === "product" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                  onClick={() => setActiveProductTab("product")}
                >
                  Product Management
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${activeProductTab === "inventory" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                  onClick={() => setActiveProductTab("inventory")}
                >
                  Inventory Management
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${activeProductTab === "category" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                  onClick={() => setActiveProductTab("category")}
                >
                  Category Management
                </button>
              </nav>
            </div>
            <div>
              {activeProductTab === "product" && <ProductForm />}
              {activeProductTab === "inventory" && <InventoryForm />}
              {activeProductTab === "category" && <CategoryForm />}
            </div>
          </div>
        );
      case "orders":
        return <h2 className="text-3xl font-bold text-gray-800">Order Management</h2>;
      case "customers":
        return <h2 className="text-3xl font-bold text-gray-800">Customer Management</h2>;
      case "inventory":
        return <h2 className="text-3xl font-bold text-gray-800">Inventory Management</h2>;
      case "settings":
        return <h2 className="text-3xl font-bold text-gray-800">Settings</h2>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-600 text-white shadow-xl">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="mt-6">
          {[
            { name: "dashboard", icon: FaChartBar },
            { name: "products", icon: FaShoppingCart },
            { name: "orders", icon: FaMoneyBillWave },
            { name: "customers", icon: FaUsers },
            { name: "inventory", icon: FaClipboardList },
            { name: "settings", icon: FaUserCog }
          ].map(({ name, icon: Icon }) => (
            <a
              key={name}
              href="#"
              className={`flex items-center py-3 px-6 ${activeTab === name ? "bg-blue-700" : "hover:bg-blue-700"} transition-colors duration-200`}
              onClick={() => setActiveTab(name)}
            >
              <Icon className="mr-3" />
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-md z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <button className="ml-2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                <FaSearch />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none relative">
                <FaBell />
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">3</span>
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                <FaCog />
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none transition-colors duration-200">
                <FaSignOutAlt className="mr-2 inline-block" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;