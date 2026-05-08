'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useStore } from '@/store/useStore'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, Smartphone, Truck, MapPin } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Checkout() {
  const { cart, getCartTotal, userType } = useStore()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    nom: '',
    tel: '',
    ville: 'Yaoundé',
    quartier: '',
    adresse: '',
    paymentMethod: 'whatsapp'
  })

  const fraisLivraison = {
    'Yaoundé': 1000,
    'Douala': 1500,
    'Bafoussam': 2000,
    'Autre': 2500
  }

  const totalProduits = getCartTotal()
  const livraison = fraisLivraison[formData.ville]
  const total = totalProduits + livraison

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.nom ||!formData.tel ||!formData.quartier) {
      toast.error('Remplis tous les champs')
      return
    }

    const commande = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      items: cart,
      client: formData,
      total,
      status: 'En attente'
    }

    const whatsappText = `*NOUVELLE COMMANDE BRANSMARKET*\n\n` +
      `Client: ${formData.nom}\n` +
      `Tel: ${formData.tel}\n` +
      `Ville: ${formData.ville} - ${formData.quartier}\n` +
      `Adresse: ${formData.adresse}\n\n` +
      `*Produits:*\n${cart.map(item => `- ${item.name} x${item.qty} = ${(item.price * item.qty).toLocaleString()} FCFA`).join('\n')}\n\n` +
      `Sous-total: ${totalProduits.toLocaleString()} FCFA\n` +
      `Livraison: ${livraison.toLocaleString()} FCFA\n` +
      `*TOTAL: ${total.toLocaleString()} FCFA*\n\n` +
      `Mode: ${userType === 'grossiste'? 'GROSSISTE' : 'DÉTAIL'}`

    window.open(`https://wa.me/237699999999?text=${encodeURIComponent(whatsappText)}`, '_blank')
    toast.success('Commande envoyée! On te contacte sur WhatsApp')
    useStore.setState({ cart: [] })
    router.push('/commandes')
  }

  if (cart.length === 0) {
    router.push('/panier')
    return null
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Finaliser la commande</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white p-6 rounded-md">
            <div className="flex items-center gap-4 mb-6 border-b pb-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1? 'bg-[#FF9900] text-white' : 'bg-gray-300'}`}>1</div>
              <span className="font-bold">Livraison</span>
              <div className="flex-1 h-0.5 bg-gray-300"></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2? 'bg-[#FF9900] text-white' : 'bg-gray-300'}`}>2</div>
              <span>Paiement</span>
            </div>

            <form onSubmit={handleSubmit}>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <MapPin size={20}/> Adresse de livraison
              </h3>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Nom complet *"
                  value={formData.nom}
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  className="border px-4 py-2 rounded"
                  required
                />
                <input
                  type="tel"
                  placeholder="Téléphone WhatsApp *"
                  value={formData.tel}
                  onChange={(e) => setFormData({...formData, tel: e.target.value})}
                  className="border px-4 py-2 rounded"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <select
                  value={formData.ville}
                  onChange={(e) => setFormData({...formData, ville: e.target.value})}
                  className="border px-4 py-2 rounded"
                >
                  <option value="Yaoundé">Yaoundé</option>
                  <option value="Douala">Douala</option>
                  <option value="Bafoussam">Bafoussam</option>
                  <option value="Autre">Autre ville</option>
                </select>
                <input
                  type="text"
                  placeholder="Quartier *"
                  value={formData.quartier}
                  onChange={(e) => setFormData({...formData, quartier: e.target.value})}
                  className="border px-4 py-2 rounded"
                  required
                />
              </div>

              <textarea
                placeholder="Adresse détaillée (rue, repère...)"
                value={formData.adresse}
                onChange={(e) => setFormData({...formData, adresse: e.target.value})}
                className="w-full border px-4 py-2 rounded mb-6"
                rows="3"
              />

              <h3 className="font-bold mb-4 flex items-center gap-2">
                <CreditCard size={20}/> Mode de paiement
              </h3>

              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-3 border p-4 rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="whatsapp"
                    checked={formData.paymentMethod === 'whatsapp'}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  />
                  <Smartphone size={24} className="text-green-600"/>
                  <div>
                    <p className="font-bold">WhatsApp + Mobile Money</p>
                    <p className="text-sm text-gray-600">Paiement à la livraison ou MTN/Orange Money</p>
                  </div>
                </label>
              </div>

              <button type="submit" className="btn-amazon w-full">
                Confirmer la commande - {total.toLocaleString()} FCFA
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-md h-fit sticky top-24">
            <h3 className="font-bold mb-4">Récapitulatif</h3>
            <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 text-sm border-b pb-2">
                  <img src={item.image} className="w-12 h-12 object-contain"/>
                  <div className="flex-1">
                    <p className="font-medium line-clamp-1">{item.name}</p>
                    <p className="text-gray-600">Qté: {item.qty} x {item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span>Sous-total</span>
                <span>{totalProduits.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Livraison</span>
                <span>{livraison.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total</span>
                <span className="text-red-600">{total.toLocaleString()} FCFA</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
