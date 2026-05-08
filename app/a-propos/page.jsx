import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { MapPin, Code, Rocket, Shield } from 'lucide-react'
import Link from 'next/link'

export default function APropos() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-md shadow-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-[#FF9900] rounded-full mb-4">
              <Code size={48} className="text-black"/>
            </div>
            <h1 className="text-4xl font-bold mb-2">BransMarket</h1>
            <p className="text-xl text-gray-600">La marketplace 100% camerounaise</p>
          </div>

          <div className="bg-gradient-to-r from-[#FF9900] to-orange-600 text-black p-6 rounded-md mb-8">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <Rocket/> Développé par Brandon Technologie
            </h2>
            <p className="text-lg">
              BransMarket est une plateforme e-commerce créée par <span className="font-bold">Brandon Technologie</span>, 
              entreprise tech basée au Cameroun, spécialisée dans les solutions digitales pour l'Afrique.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border p-6 rounded-md">
              <MapPin className="text-[#FF9900] mb-3" size={32}/>
              <h3 className="font-bold text-xl mb-2">Made in Cameroun</h3>
              <p className="text-gray-600">
                Conçu et développé à Yaoundé par des ingénieurs camerounais. 
                Hébergé localement pour des performances optimales en Afrique Centrale.
              </p>
            </div>

            <div className="border p-6 rounded-md">
              <Shield className="text-[#FF9900] mb-3" size={32}/>
              <h3 className="font-bold text-xl mb-2">Sécurité & Confiance</h3>
              <p className="text-gray-600">
                Paiements MTN MoMo & Orange Money certifiés. 
                Données hébergées au Cameroun. Support client local 7j/7.
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-bold text-xl mb-4">Notre Mission</h3>
            <p className="text-gray-700 mb-4">
              Digitaliser le commerce camerounais en connectant directement les grossistes aux consommateurs. 
              Permettre à chaque PME d'avoir sa boutique en ligne sans coder.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>0% frais d'inscription pour les grossistes</li>
              <li>Commission de 5% uniquement sur ventes réalisées</li>
              <li>Paiement instantané via Mobile Money</li>
              <li>Support technique WhatsApp en français</li>
            </ul>
          </div>

          <div className="border-t pt-6 mt-6">
            <h3 className="font-bold text-xl mb-4">Contact Brandon Technologie</h3>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-bold">Adresse:</span> Yaoundé, Centre Region, Cameroun</p>
              <p><span className="font-bold">Email:</span> contact@brandontech.cm</p>
              <p><span className="font-bold">WhatsApp:</span> +237 6XX XX XX XX</p>
              <p><span className="font-bold">Site:</span> www.brandontech.cm</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="btn-amazon inline-block">
              Retour à la boutique
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
