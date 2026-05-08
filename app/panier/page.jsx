'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useStore } from '@/store/useStore'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function Panier() {
  const { cart, removeFromCart, updateQty, getCartTotal, clearCart, addNotification } = useStore()
  const total = getCartTotal()

  const handleCheckout = async () => {
    if (cart.length === 0) return
    toast.loading('Initialisation paiement MoMo...')
    setTimeout(() => {
      toast.dismiss()
      toast.success('Commande payée avec MTN MoMo!')
      addNotification(`Commande de ${total.toLocaleString()} FCFA validée`)
      clearCart()
    }, 2000)
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-3"><ShoppingBag/> Votre Panier</h1>
          {cart.length === 0? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-xl mb-6">Votre panier est vide.</p>
              <Link href="/" className="btn-amazon inline-block">Continuer vos achats</Link>
            </div>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} className="flex flex-col md:flex-row items-center gap-4 border-b py-6">
                  <img src={item.image} alt={item.name} className="w-32 h-32 object-contain"/>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-green-700 text-sm">En stock</p>
                    <p className="text-2xl mt-2">{parseInt(item.price).toLocaleString()} FCFA</p>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-100 rounded-md p-1">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="bg-gray-300 hover:bg-gray-400 p-2 rounded"><Minus size={16}/></button>
                    <span className="w-12 text-center font-bold">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="bg-gray-300 hover:bg-gray-400 p-2 rounded"><Plus size={16}/></button>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-xl font-bold mb-2">{(parseInt(item.price) * item.qty).toLocaleString()} FCFA</p>
                    <button onClick={() => {removeFromCart(item.id); toast.error(`${item.name} supprimé`)}} className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1 mx-auto md:mx-0"><Trash2 size={16}/> Supprimer</button>
                  </div>
                </div>
              ))}
              <div className="mt-8 bg-gray-50 p-6 rounded-md">
                <div className="flex justify-between text-lg mb-2">
                  <span>Sous-total ({cart.reduce((acc, item) => acc + item.qty, 0)} articles):</span>
                  <span className="font-bold">{total.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-lg mb-4">
                  <span>Livraison Yaoundé:</span>
                  <span className="font-bold text-green-600">GRATUITE</span>
                </div>
                <hr className="my-4"/>
                <div className="flex justify-between text-2xl font-bold mb-6">
                  <span>Total:</span>
                  <span>{total.toLocaleString()} FCFA</span>
                </div>
                <button onClick={handleCheckout} className="btn-amazon w-full text-lg py-4">Payer avec MTN MoMo / Orange Money</button>
                <p className="text-xs text-gray-500 text-center mt-3">Paiement 100% sécurisé</p>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
