import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroBanner from '@/components/HeroBanner'
import ProductCard from '@/components/ProductCard'
import { Toaster } from 'react-hot-toast'

const fakeProducts = [
  { id: 1, name: "Samsung Galaxy A55 5G 256Go", price: "185000", image: "https://picsum.photos/seed/phone1/300", reviews: 142, promo: 20, stock: 5 },
  { id: 2, name: "iPhone 13 128Go Reconditionné Grade A+", price: "320000", image: "https://picsum.photos/seed/phone2/300", reviews: 89, stock: 15 },
  { id: 3, name: "T-shirt Coton Bio Lot de 3 Pièces", price: "12000", image: "https://picsum.photos/seed/shirt/300", reviews: 234, promo: 15, stock: 3 },
  { id: 4, name: "Mixeur Blender Pro 1000W Inox", price: "25000", image: "https://picsum.photos/seed/mixeur/300", reviews: 67, stock: 20 },
  { id: 5, name: "Ordinateur Portable HP 15.6\" i5 8Go", price: "285000", image: "https://picsum.photos/seed/laptop/300", reviews: 201, promo: 10, stock: 8 },
  { id: 6, name: "Chaussures Nike Air Max Running", price: "45000", image: "https://picsum.photos/seed/shoes/300", reviews: 312, stock: 12 },
  { id: 7, name: "Télévision Smart TV 43\" 4K Android", price: "175000", image: "https://picsum.photos/seed/tv/300", reviews: 98, promo: 25, stock: 4 },
  { id: 8, name: "Parfum Homme Eau de Toilette 100ml", price: "18000", image: "https://picsum.photos/seed/parfum/300", reviews: 156, stock: 25 },
]

export default function Home() {
  return (
    <div id="top" className="bg-gray-100">
      <Toaster position="bottom-right"/>
      <Header />
      <HeroBanner />
      <main className="max-w-7xl mx-auto px-4 -mt-16 md:-mt-20 relative z-10">
        <section className="bg-white p-4 md:p-6 rounded-md shadow-md mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Offres du moment</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {fakeProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        <section className="bg-white p-4 md:p-6 rounded-md shadow-md mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Meilleures ventes Électronique</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {fakeProducts.slice(0,4).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
