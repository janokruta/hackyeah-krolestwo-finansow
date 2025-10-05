"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Info } from "lucide-react"
import { RetirementChart } from "@/components/retirement-chart"

export default function RetirementCalculator() {
  const [oneTimePayment, setOneTimePayment] = useState(20000) // Changed default one-time payment from 170000 to 20000
  const [monthlyPayment, setMonthlyPayment] = useState(1000) // Changed default monthly payment from 3000 to 1000
  const [investmentHorizon, setInvestmentHorizon] = useState(30)

  useEffect(() => {
    const savedData = localStorage.getItem("retirementFormData")
    if (savedData) {
      const formData = JSON.parse(savedData)
      if (formData.retirementYear) {
        const currentYear = new Date().getFullYear()
        const calculatedHorizon = Number.parseInt(formData.retirementYear) - currentYear
        if (calculatedHorizon > 0) {
          setInvestmentHorizon(calculatedHorizon)
        }
      }
    }
  }, [])

  // Calculate expected returns (simplified compound interest calculation)
  const annualReturn = 0.07 // 7% average annual return
  const monthlyReturn = Math.pow(1 + annualReturn, 1 / 12) - 1

  const calculateFutureValue = () => {
    const months = investmentHorizon * 12

    // Future value of one-time payment
    const futureOneTime = oneTimePayment * Math.pow(1 + annualReturn, investmentHorizon)

    // Future value of monthly payments (annuity)
    const futureMonthly = monthlyPayment * ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn)

    return futureOneTime + futureMonthly
  }

  const totalInvestment = calculateFutureValue()
  const monthlyRetirement = (totalInvestment * 0.04) / 12 // 4% withdrawal rate per year

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pl-PL", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="bg-white text-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Panel - Controls */}
          <div className="space-y-8">
            <h1 className="text-3xl md:text-4xl font-bold text-balance">Oblicz swoją przyszłą emeryturę</h1>

            {/* One-time Payment */}
            <div className="space-y-4">
              <label className="text-gray-600 text-sm md:text-base">Jednorazowa wpłata</label>
              <div className="relative">
                <input
                  type="number"
                  value={oneTimePayment}
                  onChange={(e) => setOneTimePayment(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-xl md:text-2xl font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#009F3F] focus:border-transparent transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">zł</span>
              </div>
              <Slider
                value={[oneTimePayment]}
                onValueChange={(value) => setOneTimePayment(value[0])}
                min={0}
                max={500000}
                step={1000}
                className="[&_[role=slider]]:bg-[#009F3F] [&_[role=slider]]:border-[#009F3F] [&_.bg-primary]:bg-[#009F3F]"
              />
            </div>

            {/* Monthly Payment */}
            <div className="space-y-4">
              <label className="text-gray-600 text-sm md:text-base">Miesięczna wpłata</label>
              <div className="relative">
                <input
                  type="number"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-xl md:text-2xl font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#009F3F] focus:border-transparent transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">zł</span>
              </div>
              <Slider
                value={[monthlyPayment]}
                onValueChange={(value) => setMonthlyPayment(value[0])}
                min={0}
                max={10000}
                step={100}
                className="[&_[role=slider]]:bg-[#009F3F] [&_[role=slider]]:border-[#009F3F] [&_.bg-primary]:bg-[#009F3F]"
              />
            </div>

            {/* Investment Horizon */}
            <div className="space-y-4">
              <label className="text-gray-600 text-sm md:text-base">Horyzont inwestycyjny</label>
              <div className="relative">
                <input
                  type="number"
                  value={investmentHorizon}
                  onChange={(e) => setInvestmentHorizon(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-xl md:text-2xl font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#009F3F] focus:border-transparent transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">lat</span>
              </div>
              <Slider
                value={[investmentHorizon]}
                onValueChange={(value) => setInvestmentHorizon(value[0])}
                min={1}
                max={50}
                step={1}
                className="[&_[role=slider]]:bg-[#009F3F] [&_[role=slider]]:border-[#009F3F] [&_.bg-primary]:bg-[#009F3F]"
              />
              <div className="flex justify-between text-xs text-gray-600">
                <span>1 rok</span>
                <span>{investmentHorizon} lat</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Results & Chart */}
          <div className="space-y-6">
            {/* Results Display */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 md:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-600 text-xs md:text-sm">Oczekiwana emerytura z Finansowego królestwa</span>
                  <Info className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[#009F3F] text-xl md:text-3xl font-bold">
                    {formatCurrency(monthlyRetirement)}
                  </span>
                  <span className="text-[#009F3F] text-sm md:text-base">zł</span>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 md:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-600 text-xs md:text-sm">Inwestowanie z Finansowym królestwem</span>
                  <Info className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-gray-900 text-xl md:text-3xl font-bold">{formatCurrency(totalInvestment)}</span>
                  <span className="text-gray-900 text-sm md:text-base">zł</span>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 md:p-6 h-[400px]">
              <RetirementChart
                oneTimePayment={oneTimePayment}
                monthlyPayment={monthlyPayment}
                years={investmentHorizon}
                annualReturn={annualReturn}
              />
            </div>

            {/* Warning Banner */}
            <div className="bg-orange-50 border border-orange-300 rounded-lg p-4">
              <p className="text-sm text-orange-800 leading-relaxed">
                Inwestowanie wiąże się z ryzykiem. Zyski z przeszłości nie gwarantują przyszłych zwrotów.{" "}
                <button className="underline hover:no-underline">Czytaj więcej o ryzyku.</button>
              </p>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Wykres ma charakter informacyjny, a przeszłe wyniki nie są gwarancją przyszłych rezultatów.
            </p>

            {/* CTA Button */}
            <Button
              size="lg"
              className="w-full bg-[#009F3F] hover:bg-[#008835] text-white font-semibold text-lg py-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Zacznij
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
