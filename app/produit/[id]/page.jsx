'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useStore } from '@/store/useStore'
import toast from 'react-hot-toast'
import { useParams } from 'next/navigation'
import { Star } from 'lucide-react'

const fakeProducts = [
  { id: 1, name: "Samsung Galaxy A55 5G 256Go", price: "185000", image: "https://picsum.photos/seed/phone1/600", reviews: 142, promo: 20, stock: 5, desc: "Smartphone 5G, écran 6.5 pouces, triple caméra 50MP" },
  { id: 2, name: "iPhone 13 128Go Reconditionné Grade A+", price: "320000", image: "https://picsum.photos/seed/phone2/600", reviews: 89, stock: 15, desc: "iPhone 13 reconditionné, batterie 90%+, garanti 12 mois" },
  { id: 3, name: "T-shirt Coton Bio Lot de 3 Pièces", price: "12000", image: "https://picsum.photos/seed/shirt/600", reviews: 234, promo: 15, stock: 3, desc: "Lot de 3 t-shirts 100% coton bio, tailles S à XL" },
  { id: 4, name: "Mixeur Blender Pro 1000W Inox", price: "25000", image: "https://picsum.photos/seed/mixeur/600", reviews: 67, stock: 20, desc: "Mixeur 1000W, bol verre 1.5L, 5 vitesses + pulse" },
  { id: 5, name: "Ordinateur Portable HP 15.6\" i5 8Go", price: "285000", image: "https://picsum.photos/seed/laptop/600", reviews: 201, promo: 10, stock: 8, desc: "HP Core i5, 8Go RAM, SSD 512Go, Windows 11" },
  { id: 6, name: "Chaussures Nike Air Max Running", price: "45000", image: "https://picsum.photos/seed/shoes/600", reviews: 312, stock: 12, desc: "Nike Air Max, semelle amortie, pointures 39-46" },
  { id: 7, name: "Télévision Smart TV 43\" 4K Android", price: "175000", image: "https://picsum.photos/seed/tv/600", reviews: 98, promo: 25, stock: 4, desc: "TV 4K 43 pouces, Android TV, Netflix, YouTube" },
  { id: 8, name: "Parfum Homme Eau de Toilette 100ml", price: "18000", image: "https://picsum.photos/seed/parfum/600", reviews: 156, stock: 25, desc: "Parfum boisé, tenue 12h, flacon 100ml" },
]

export default function ProductPage() {
  const params = useParams()
  const { addToCart, addNotification } = useStore()
  const product = fakeProducts.find(p => p.id === parseInt(params.id))

  if (!product) {
    return <div className="min-h-screen"><Header /><div className="text-center py-20">Produit introuvable</div><Footer /></div>
  }

  const handleAdd = () => {
    addToCart(product)
    addNotification(`${product.name} ajouté au panier`)
    toast.success('Ajouté au panier!')
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-md shadow-md grid md:grid-cols-2 gap-8">
          <div>
            <img src={product.image} alt={product.name} className="w-full h-[400px] object-contain"/>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-[#FF9900]">{[...Array(5)].map((_, i) => <Star key={i} size={20} fill={i < 4? "#FF9900" : "none"}/>)}</div>
              <span className="text-blue-600 text-sm">{product.reviews} avis</span>
            </div>
            <hr className="my-4"/>
            <div className="mb-4">
              <span className="text-3xl">{parseInt(product.price).toLocaleString()}</span>
              <span className="text-lg"> FCFA</span>
              {product.promo && <span className="ml-4 text-red-600 font-bold">-{product.promo}%</span>}
            </div>
            {product.stock < 10 && <p className="text-red-600 mb-4">Plus que {product.stock} en stock</p>}
            <p className="text-gray-700 mb-6">{product.desc}</p>
            <button onClick={handleAdd} className="btn-amazon w-full text-lg py-3">
              Ajouter au panier
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
