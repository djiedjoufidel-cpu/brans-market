'use client'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import DashboardStats from '@/components/DashboardStats';
import Link from 'next/link';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading &&!user) router.push('/login');
  }, [user, loading, router]);

  if (loading ||!user) return <div>Chargement...</div>;

  const isPro = user.plan === 'pro' && new Date(user.planEndsAt?.toDate()) > new Date();
  const isTrial = user.plan === 'trial' && new Date(user.trialEndsAt?.toDate()) > new Date();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard de {user.username}</h1>

      {!isPro &&!isTrial && (
        <div className="bg-red-100 p-4 rounded-lg mb-6">
          <p>Ton essai est terminé. <Link href="/subscribe" className="text-blue-600 font-bold">Passer Pro à 5000 FCFA/mois</Link></p>
        </div>
      )}

      {isTrial && (
        <div className="bg-green-100 p-4 rounded-lg mb-6">
          <p>Essai gratuit actif jusqu’au {new Date(user.trialEndsAt?.toDate()).toLocaleDateString()}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/dashboard/products" className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-lg">Mes Produits</h3>
          <p>Ajouter & gérer</p>
        </Link>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-lg">Ma Boutique</h3>
          <p className="text-blue-600 break-all">/store/{user.username}</p>
        </div>
        <Link href="/subscribe" className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold text-lg">Abonnement</h3>
          <p>{isPro? 'Pro actif' : 'Passer Pro'}</p>
        </Link>
      </div>

      <DashboardStats />
    </div>
  );
}
