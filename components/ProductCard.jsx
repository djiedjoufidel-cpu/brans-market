'use client'
import { useStore } from '@/store/useStore'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export default function ProductCard({ product }) {
  const { addToCart, addNotification } = useStore()

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    addNotification(`${product.name} ajouté au panier`)
    toast.success('Ajouté au panier!')
  }

  const whatsappNumber = "237699999999"
  const whatsappMsg = `Bonjour, je suis intéressé par ${product.name}`

  return (
    <div className="bg-white p-4 rounded-md card-hover border h-full flex flex-col">
      <Link href={`/produit/${product.id}`}>
        <div className="relative cursor-pointer">
          <img src={product.image} alt={product.name} className="w-full h-48 object-contain mb-4"/>
          {product.promo && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              -{product.promo}%
            </span>
          )}
        </div>
        <h3 className="text-sm line-clamp-2 h-10 mb-1">{product.name}</h3>
        <div className="flex items-center gap-1 my-1">
          <span className="text-[#FF9900]">★★★★☆</span>
          <span className="text-xs text-blue-600 hover:underline">{product.reviews}</span>
        </div>
        <div className="my-2 mt-auto">
          <span className="text-2xl">{parseInt(product.price).toLocaleString()}</span>
          <span className="text-sm"> FCFA</span>
        </div>
        {product.stock < 10 && (
          <p className="text-xs text-red-600 mb-2">Plus que {product.stock} en stock</p>
        )}
      </Link>
      
      <button onClick={handleAdd} className="btn-amazon w-full text-sm mb-2">
        Ajouter au panier
      </button>
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2"
      >
        <MessageCircle size={16}/> WhatsApp
      </a>
    </div>
  )
}
