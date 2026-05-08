'use client'
import { useCart } from '../../context/CartContext'
import Price from '../../components/Price'
import Link from 'next/link'

export default function PanierPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  
  const prixUnitaire = (item) => item.price
  const totalProduits = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const livraison = 1000
  const total = totalProduits + livraison

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl mb-4">Panier vide</h1>
        <Link href="/" className="text-blue-600">Retour à la boutique</Link>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mon Panier</h1>
      
      {cart.map((item) => (
        <div key={item.id} className="flex items-center justify-between border-b py-4">
          <div className="flex items-center gap-3">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
            <div>
              <h3 className="font-semibold text-sm">{item.name}</h3>
              <p className="text-sm">
                <Price value={prixUnitaire(item) * item.qty} />
              </p>
              <p className="text-xs text-gray-500">
                <Price value={prixUnitaire(item)} />/unité
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              className="w-12 border rounded px-1 py-1 text-sm"
            />
            <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-xl">×</button>
          </div>
        </div>
      ))}
      
      <div className="mt-6 space-y-2">
        <div className="flex justify-between">
          <span>Sous-total:</span>
          <span><Price value={totalProduits} /></span>
        </div>
        <div className="flex justify-between">
          <span>Livraison:</span>
          <span><Price value={livraison} /></span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total:</span>
          <span className="text-red-600"><Price value={total} /></span>
        </div>
      </div>
      
      <Link href="/checkout" className="block w-full bg-blue-600 text-white text-center py-3 rounded mt-6">
        Commander
      </Link>
    </div>
  )
}
