import React from 'react'
import { FaChartBar, FaUsers, FaBoxOpen, FaDollarSign } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';


const Content = () => (
    <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <FaChartBar className="text-4xl mb-4 text-green-500" />
                <h2 className="text-xl font-bold">Analytics</h2>
                <p className="text-gray-600">View detailed analytics</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <FaUsers className="text-4xl mb-4 text-blue-500" />
                <h2 className="text-xl font-bold">Users</h2>
                <p className="text-gray-600">Manage users</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <FaBoxOpen className="text-4xl mb-4 text-yellow-500" />
                <h2 className="text-xl font-bold">Products</h2>
                <p className="text-gray-600">Manage products</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <FaDollarSign className="text-4xl mb-4  text-red-500" />
                <h2 className="text-xl font-bold">Orders</h2>
                <p className="text-gray-600">Manage orders</p>
            </div>
        </div>
    </div>
);

export default function Page() {
    return (
        <div className="flex">

            <Content />
        </div>
    );
}

