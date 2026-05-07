'use client'
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalSales: 0, totalRevenue: 0, data: [] });

  useEffect(() => {
    if (!user) return;
    const fetchStats = async () => {
      const q = query(collection(db, 'sales'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      let totalRevenue = 0;
      const salesByDate = {};

      querySnapshot.forEach((doc) => {
        const sale = doc.data();
        totalRevenue += sale.amount;
        const date = new Date(sale.createdAt?.toDate()).toLocaleDateString();
        salesByDate[date] = (salesByDate[date] || 0) + sale.amount;
      });

      const data = Object.keys(salesByDate).map(date => ({ date, revenue: salesByDate[date] }));
      setStats({ totalSales: querySnapshot.size, totalRevenue, data });
    };
    fetchStats();
  }, [user]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="font-bold text-xl mb-4">Statistiques</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-gray-500">Chiffre d’affaires</p>
          <p className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} FCFA</p>
        </div>
        <div>
          <p className="text-gray-500">Ventes totales</p>
          <p className="text-2xl font-bold">{stats.totalSales}</p>
        </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={stats.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
