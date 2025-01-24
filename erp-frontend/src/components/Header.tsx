"use client"
import Link from 'next/link'
import React, { useState } from 'react'

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const menuItems = [
    { name: 'Item', href: '/item' },
    { name: 'Customer', href: '/customer' },
    { 
      name: 'Sales', 
      subItems: [
        { name: 'Sales Order', href: '/sales/salesorder' },
        { name: 'Sales Invoice', href: '/sales/salesinvoice' }
      ]
    }
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
          <nav className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item) => (
              item.subItems ? (
                <div 
                  key={item.name} 
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.name)}
                  //onMouseLeave={() => setOpenMenu(null)}
                >
                  <button 
                    onClick={() => setOpenMenu(openMenu === item.name ? null : item.name)}
                    className="text-white hover:bg-blue-700 
                    px-4 py-2 rounded-md 
                    transition duration-300 
                    font-medium tracking-wider
                    flex items-center"
                  >
                    {item.name}
                    <svg 
                      className="w-4 h-4 ml-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 9l-7 7-7-7" 
                      />
                    </svg>
                  </button>
                  {openMenu === item.name && (
                    <div 
                      className="absolute z-50 
                      bg-white shadow-lg rounded-md 
                      mt-2 py-2 w-48 
                      border border-gray-200"
                    >
                      {item.subItems.map((subItem) => (
                        <Link 
                          key={subItem.name}
                          href={subItem.href} 
                          className="block px-4 py-2 
                            text-gray-800 
                            hover:bg-blue-100 
                            hover:text-blue-700 
                            text-base"
                          onClick={() => setOpenMenu(null)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
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
              )
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
