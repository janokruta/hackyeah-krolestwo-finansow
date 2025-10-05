"use client"

import { useState } from "react"
import { UserCircle } from "lucide-react"

export default function PanelOpiekuna() {
  const [monthlyBenefits, setMonthlyBenefits] = useState(3196.8)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Panel opiekuna</h1>
        <button className="flex items-center gap-2 bg-[#009F3F] text-white px-6 py-3 rounded-lg hover:bg-[#008835] transition-colors">
          <UserCircle className="w-5 h-5" />
          Połącz z kontem ZUS
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Moje świadczenia */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Moje świadczenia</h2>

          {/* Main benefit card */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <p className="text-sm text-blue-700 mb-2">Otrzymuję miesięcznie</p>
            <p className="text-4xl font-bold text-blue-600 mb-1">
              {monthlyBenefits.toLocaleString("pl-PL", { minimumFractionDigits: 2 })} zł
            </p>
            <p className="text-xs text-blue-600">Wszystkie świadczenia razem</p>
          </div>

          {/* Benefit breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Zasiłek pielęgnacyjny</span>
              <span className="font-semibold text-gray-900">215,84 zł</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Świadczenie wspierające</span>
              <span className="font-semibold text-gray-900">1.200,00 zł</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-600">Renta socjalna</span>
              <span className="font-semibold text-gray-900">1.780,96 zł</span>
            </div>
          </div>
        </div>

        {/* Right Column - Materiały dla Ciebie */}
        <div className="space-y-4">
          {/* Financial Education Card */}
          <div className="bg-purple-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-purple-900 mb-2">Edukacja finansowa</h3>
            <p className="text-sm text-purple-700">Dowiedz się, jak zarządzać pieniędzmi i planować swoją przyszłość</p>
          </div>

          {/* Goals Card */}
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-900 mb-2">Moje cele</h3>
            <p className="text-sm text-green-700">Ustal cele oszczędnościowe i śledź swoje postępy</p>
          </div>

          {/* CTA Button */}
          <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Zobacz wszystkie materiały
          </button>
        </div>
      </div>
    </div>
  )
}
