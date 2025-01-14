"use client"
import Link from 'next/link'
import React, { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { name: 'Item', href: '/item' },
    { name: 'Customer', href: '/customer' },
    { name: 'Sales', href: '/sales/salesorder' }
  ]

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Area */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-white font-bold text-2xl hover:text-gray-200 transition duration-300"
            >
              ERP Ultra
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href} 
                className="text-white hover:bg-blue-700 
                           px-4 py-2 rounded-md 
                           transition duration-300 
                           font-medium tracking-wider"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-700">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:bg-blue-800 
                             block px-3 py-2 rounded-md 
                             text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
