"use client"

import { useMemo } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

interface RetirementChartProps {
  oneTimePayment: number
  monthlyPayment: number
  years: number
  annualReturn: number
}

export function RetirementChart({ oneTimePayment, monthlyPayment, years, annualReturn }: RetirementChartProps) {
  const chartData = useMemo(() => {
    const data = []
    const monthlyReturn = Math.pow(1 + annualReturn, 1 / 12) - 1

    // Generate data points for each year
    for (let year = 0; year <= years; year++) {
      const months = year * 12

      // Calculate total investment value
      const futureOneTime = oneTimePayment * Math.pow(1 + annualReturn, year)
      const futureMonthly =
        months > 0 ? monthlyPayment * ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn) : 0
      const totalValue = futureOneTime + futureMonthly

      // Calculate expected monthly retirement income (4% withdrawal rate)
      const monthlyIncome = (totalValue * 0.04) / 12

      data.push({
        year,
        totalValue,
        monthlyIncome,
        label: year === 0 ? "Dzisiaj" : `${year} lat`,
      })
    }

    return data
  }, [oneTimePayment, monthlyPayment, years, annualReturn])

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M zł`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k zł`
    }
    return `${value.toFixed(0)} zł`
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.5} />
        <XAxis
          dataKey="year"
          stroke="#6B7280"
          tick={{ fill: "#6B7280", fontSize: 12 }}
          tickFormatter={(value) => (value === 0 ? "Dzisiaj" : `${value} lat`)}
        />
        <YAxis stroke="#6B7280" tick={{ fill: "#6B7280", fontSize: 12 }} tickFormatter={formatCurrency} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "8px",
            color: "#111827",
          }}
          formatter={(value: number) => formatCurrency(value)}
          labelFormatter={(label) => (label === 0 ? "Dzisiaj" : `Rok ${label}`)}
        />
        <Line
          type="monotone"
          dataKey="totalValue"
          stroke="#6B7280"
          strokeWidth={2}
          dot={false}
          name="Wartość inwestycji"
        />
        <Line
          type="monotone"
          dataKey="monthlyIncome"
          stroke="#009F3F"
          strokeWidth={2}
          dot={false}
          name="Miesięczna emerytura"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
