'use client'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import Price from './Price'

export default function Header() {
  const { cart } = useCart()
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-full">
            <span className="text-white font-bold">B</span>
          </div>
          <div>
            <h1 className="font-bold text-xl">BransMarket</h1>
            <p className="text-xs">Made in 🇨🇲</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/checkout" className="relative flex items-center">
            <span className="text-2xl">🛒</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
            <span className="ml-2 font-semibold">
              <Price value={total} />
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}
