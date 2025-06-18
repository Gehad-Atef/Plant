import React from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 600 },
  { name: "Mar", value: 800 },
  { name: "Apr", value: 500 },
  { name: "May", value: 900 },
  { name: "Jun", value: 700 },
  { name: "Jul", value: 600 },
  { name: "Aug", value: 450 },
  { name: "Sep", value: 650 },
  { name: "Oct", value: 400 },
  { name: "Nov", value: 300 },
  { name: "Dec", value: 350 },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Overview</h1>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        />
      </div>

      {/* Revenue & Customers Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow col-span-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Total Revenue</h2>
            <span className="text-green-600 text-sm bg-green-100 dark:bg-green-900 px-2 py-1 rounded">
              This Year
            </span>
          </div>
          <p className="text-2xl font-bold mt-2">980,273.00 L.E</p>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="value" fill="#4ade80" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customers */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Customers</h2>
          <div className="space-y-4">
            {[
              { label: "Current Customers", percent: 85, color: "purple" },
              { label: "New Customers", percent: 66, color: "orange" },
              { label: "Target Customers", percent: 90, color: "orange" },
              { label: "Retarget Customers", percent: 30, color: "red" },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm font-medium">
                  <span>{item.label}</span>
                  <span>{item.percent}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded">
                  <div
                    className={`h-2 rounded ${
                      item.color === "purple"
                        ? "bg-purple-500"
                        : item.color === "orange"
                        ? "bg-orange-400"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stats Summary */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Visits
              </p>
              <p className="text-xl font-bold">10.8m</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Sales
              </p>
              <p className="text-xl font-bold">100,345</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Made
              </p>
              <p className="text-xl font-bold">$200k</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Orders Completed
              </p>
              <p className="text-xl font-bold">98,771</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-2">Top Products</h3>
          <div className="space-y-4">
            {[
              {
                name: "Lavender",
                orders: 50,
                inventory: 700,
                sale: "1,000.60 L.E",
                price: "1,300.92 L.E",
                today: "17,000.92 L.E",
              },
              {
                name: "Lewisia",
                orders: 25,
                inventory: 200,
                sale: "1,200.60 L.E",
                price: "1,500.92 L.E",
                today: "12,000.82 L.E",
              },
            ].map((p, i) => (
              <div key={i} className="border dark:border-gray-600 p-3 rounded">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">{p.name}</p>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {p.orders} orders
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <p>Inventory: {p.inventory}</p>
                  <p>Sale: {p.sale}</p>
                  <p>Price: {p.price}</p>
                </div>
                <p className="text-right text-sm mt-2">Today: {p.today}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Overview by Gender */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Stats Overview</h2>
          {[
            { label: "Women", percent: 63, color: "yellow" },
            { label: "Men", percent: 88, color: "red" },
            { label: "Kids", percent: 38, color: "purple" },
          ].map((item, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between text-sm font-medium">
                <span>{item.label}</span>
                <span>{item.percent}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded">
                <div
                  className={`h-2 rounded ${
                    item.color === "yellow"
                      ? "bg-yellow-400"
                      : item.color === "red"
                      ? "bg-red-500"
                      : "bg-purple-500"
                  }`}
                  style={{ width: `${item.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
