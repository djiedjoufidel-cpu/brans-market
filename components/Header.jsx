'use client'
import { Bell, ShoppingCart, Search, Menu } from 'lucide-react'
import Link from 'next/link'
import { useStore } from '@/store/useStore'
import { useState } from 'react'

export default function Header() {
  const { cart, notifications, markAsRead } = useStore()
  const [showNotif, setShowNotif] = useState(false)
  const unread = notifications.filter(n =>!n.read).length
  const cartTotal = cart.reduce((acc, item) => acc + item.qty, 0)

  return (
    <header className="bg-[#131921] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link href="/" className="text-2xl font-bold text-[#FF9900]">BransMarket</Link>

        <div className="flex-1 hidden md:flex">
          <select className="bg-gray-200 text-black px-2 rounded-l-md text-sm">
            <option>Toutes</option>
            <option>Électronique</option>
            <option>Mode</option>
            <option>Maison</option>
          </select>
          <input type="text" placeholder="Rechercher..." className="w-full px-4 py-2 text-black focus:outline-none" />
          <button className="bg-[#FF9900] px-4 rounded-r-md hover:bg-[#e88b00]">
            <Search size={20} className="text-black"/>
          </button>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/compte" className="text-xs hidden lg:block hover:outline hover:outline-1 hover:outline-white p-1">
            <p>Bonjour, Identifiez-vous</p>
            <p className="font-bold">Compte et listes</p>
          </Link>

          <Link href="/commandes" className="text-xs hidden lg:block hover:outline hover:outline-1 hover:outline-white p-1">
            <p>Retours</p>
            <p className="font-bold">& Commandes</p>
          </Link>

          <div className="relative">
            <button
              onClick={() => {setShowNotif(!showNotif); markAsRead()}}
              className="hover:outline hover:outline-1 hover:outline-white p-1"
            >
              <Bell size={26}/>
              {unread > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF9900] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {unread}
                </span>
              )}
            </button>
            {showNotif && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-black rounded-md shadow-lg p-2 z-50 max-h-96 overflow-y-auto">
                {notifications.length === 0? <p className="p-4 text-sm">Aucune notification</p> :
                  notifications.map(n => (
                    <div key={n.id} className="p-2 border-b text-sm hover:bg-gray-100">{n.text}</div>
                  ))
                }
              </div>
            )}
          </div>

          <Link href="/panier" className="relative flex items-end hover:outline hover:outline-1 hover:outline-white p-1">
            <ShoppingCart size={32}/>
            <span className="absolute -top-1 left-4 text-[#FF9900] font-bold">{cartTotal}</span>
            <p className="font-bold hidden md:block">Panier</p>
          </Link>
        </div>
      </div>

      <div className="bg-[#232f3e] px-4 py-2 text-sm">
        <div className="max-w-7xl mx-auto flex gap-6 items-center overflow-x-auto">
          <button className="flex items-center gap-1 font-bold hover:outline hover:outline-1 hover:outline-white p-1">
            <Menu size={20}/>Toutes
          </button>
          <Link href="/categorie/electronique" className="hover:outline hover:outline-1 hover:outline-white p-1 whitespace-nowrap">Électronique</Link>
          <Link href="/categorie/mode" className="hover:outline hover:outline-1 hover:outline-white p-1 whitespace-nowrap">Mode</Link>
          <Link href="/categorie/maison" className="hover:outline hover:outline-1 hover:outline-white p-1 whitespace-nowrap">Maison</Link>
          <Link href="/dashboard" className="text-[#FF9900] hover:outline hover:outline-1 hover:outline-white p-1 whitespace-nowrap">Espace Grossiste</Link>
        </div>
      </div>
    </header>
  )
}
