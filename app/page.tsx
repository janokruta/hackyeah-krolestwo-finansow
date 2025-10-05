"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Trophy, CheckCircle2 } from "lucide-react"
import Image from "next/image"

type SavedFormData = {
  age: string
  gender: string
  grossSalary: string
  workStartYear: string
  retirementYear: string
  retirementGoalPercentage: number
  zusAccount: string
  zusSubaccount: string
}

export default function Dashboard() {
  const [retirementGoal, setRetirementGoal] = useState(5000)
  const [currentRetirement, setCurrentRetirement] = useState(2450)

  const loadAndCalculateRetirementData = () => {
    const savedData = localStorage.getItem("retirementFormData")
    if (savedData) {
      try {
        const formData: SavedFormData = JSON.parse(savedData)

        // Calculate retirement goal
        if (formData.grossSalary && formData.retirementGoalPercentage) {
          const calculatedGoal = (Number.parseFloat(formData.grossSalary) * formData.retirementGoalPercentage) / 100
          setRetirementGoal(Math.round(calculatedGoal))
        }

        // Calculate projected retirement based on age, gender, and salary
        if (formData.age && formData.gender && formData.grossSalary) {
          const age = Number.parseInt(formData.age)
          const salary = Number.parseFloat(formData.grossSalary)
          let percentage = 0.4 // Default 40%

          if (formData.gender === "male") {
            percentage = age >= 65 ? 0.95 : 0.4
          } else if (formData.gender === "female") {
            percentage = age >= 60 ? 0.95 : 0.4
          }

          const projectedRetirement = Math.round(salary * percentage)
          setCurrentRetirement(projectedRetirement)
        }
      } catch (error) {
        console.error("Error loading saved form data:", error)
      }
    }
  }

  useEffect(() => {
    loadAndCalculateRetirementData()

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadAndCalculateRetirementData()
      }
    }

    const handleFocus = () => {
      loadAndCalculateRetirementData()
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("focus", handleFocus)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("focus", handleFocus)
    }
  }, [])

  const progressPercentage = Math.round((currentRetirement / retirementGoal) * 100)

  const otherInvestments = 15230
  const totalSavings = 26580
  const leaguePoints = 420
  const leagueMaxPoints = 1000
  const leagueProgressPercentage = Math.round((leaguePoints / leagueMaxPoints) * 100)

  const weeklyTasks = [
    {
      id: 1,
      emoji: "🔥",
      title: "Legenda o Inflacji",
      description: "Obejrzyj film o inflacji w materiałach edukacyjnych.",
      completed: true,
    },
    {
      id: 2,
      emoji: "💰",
      title: "Pierwsza Moneta w Skarbcu",
      description: "Wpłać pierwsze 10 zł do swojego funduszu i zobacz, jak zmienia się Twój zamek.",
      completed: false,
    },
    {
      id: 3,
      emoji: "🕰️",
      title: "Strażnik Bramy",
      description: "Loguj się codziennie przez 7 dni",
      completed: false,
    },
    {
      id: 4,
      emoji: "🗺️",
      title: "Mapa Przyszłego Królestwa",
      description: "Sprawdź Symulator Emerytury",
      completed: false,
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Section - Current Retirement Progress */}
        <Card className="p-8 bg-white border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Twoja prognozowana emerytura </p>
              <p className="text-4xl font-bold text-gray-900">{currentRetirement.toLocaleString("pl-PL")} zł</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Cel emerytalny</p>
              <p className="text-4xl font-bold text-gray-900">{retirementGoal.toLocaleString("pl-PL")} zł</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#009F3F] to-[#00C853] rounded-full flex items-center justify-end pr-3"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="w-4 h-4 bg-white rounded-full border-2 border-[#009F3F]"></div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">0 zł</span>
              <span className="font-semibold text-gray-900">{progressPercentage}% osiągnięte</span>
              <span className="text-gray-600">{retirementGoal.toLocaleString("pl-PL")} zł</span>
            </div>
          </div>
        </Card>

        {/* Middle Section - Your Accounts */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Twoje konta</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm text-gray-600 mb-2">Prognozowana emerytura ZUS</p>
              <p className="text-3xl font-bold text-gray-900 mb-3">
                {currentRetirement.toLocaleString("pl-PL")} zł/msc
              </p>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm text-gray-600 mb-2">Pozostałe Twoje inwestycje</p>
              <p className="text-3xl font-bold text-gray-900 mb-3">{otherInvestments.toLocaleString("pl-PL")} zł</p>
            </Card>
          </div>
        </div>

        {/* Bottom Section - Savings Castle and Weekly Tasks */}
        <div className="grid md:grid-cols-[2fr,1fr] gap-6">
          {/* Savings Castle */}
          <Card className="p-8 bg-white border border-gray-200 shadow-sm min-w-0">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Twój Zamek Oszczędności</h2>
            <p className="text-sm text-gray-600 text-center mb-8">Liga: Srebrna</p>

            {/* Castle Illustration */}
            <div className="bg-gray-50 rounded-lg px-8 py-4 mb-6 flex items-center justify-center h-64">
              <div className="relative w-96 h-full">
                <Image src="/castle-savings.png" alt="Zamek Oszczędności" fill className="object-contain" priority />
              </div>
            </div>

            {/* Total Savings */}
            <div className="text-center mb-6">
              <p className="text-4xl font-bold text-gray-900 mb-1">{totalSavings.toLocaleString("pl-PL")} zł</p>
              <p className="text-sm text-gray-600">Całkowite oszczędności</p>
            </div>

            {/* League Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Postęp do Złotej Ligi</span>
                <span className="font-semibold text-gray-900">
                  {leaguePoints} / {leagueMaxPoints} PKT
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#009F3F] to-[#00C853] rounded-full"
                  style={{ width: `${leagueProgressPercentage}%` }}
                ></div>
              </div>
            </div>
          </Card>

          {/* Weekly Tasks */}
          <Card className="p-6 bg-white border border-gray-200 shadow-sm min-w-0">
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="w-6 h-6 text-gray-900" />
              <h2 className="text-xl font-bold text-gray-900">Tygodniowe zadania</h2>
            </div>

            <div className="space-y-3">
              {weeklyTasks.map((task) => (
                <div
                  key={task.id}
                  className={`relative p-4 rounded-lg transition-colors ${
                    task.completed ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 text-2xl">{task.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm">{task.title}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{task.description}</p>
                    </div>
                    {task.completed && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
