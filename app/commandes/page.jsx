import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Package } from 'lucide-react'

export default function Commandes() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-3"><Package/> Vos Commandes</h1>
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">Vous n'avez pas encore passé de commande.</p>
            <p className="text-sm text-gray-400 mt-2">Quand vous le ferez, elles apparaîtront ici.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
