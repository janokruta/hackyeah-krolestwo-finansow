"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Calendar, User, DollarSign, Briefcase, Handshake, Settings, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

type FormData = {
  age: string
  gender: string
  grossSalary: string
  workStartYear: string
  retirementYear: string
  retirementGoalPercentage: number
  zusAccount: string
  zusSubaccount: string
}

export default function FormularzStartowy() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    age: "",
    gender: "",
    grossSalary: "",
    workStartYear: "",
    retirementYear: "",
    retirementGoalPercentage: 70,
    zusAccount: "",
    zusSubaccount: "",
  })

  useEffect(() => {
    const savedData = localStorage.getItem("retirementFormData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData({
          age: parsedData.age || "",
          gender: parsedData.gender || "",
          grossSalary: parsedData.grossSalary || "",
          workStartYear: "", // Always recalculate
          retirementYear: "", // Always recalculate
          retirementGoalPercentage: parsedData.retirementGoalPercentage || 70,
          zusAccount: parsedData.zusAccount || "",
          zusSubaccount: parsedData.zusSubaccount || "",
        })
      } catch (error) {
        console.error("Failed to load saved form data:", error)
      }
    }
  }, [])

  useEffect(() => {
    if (currentStep === 4 && formData.age) {
      const currentYear = new Date().getFullYear()
      const age = Number.parseInt(formData.age)

      // Calculate work start year if not already set
      if (!formData.workStartYear) {
        const calculatedWorkStartYear = currentYear - (age - 25)
        updateFormData("workStartYear", calculatedWorkStartYear.toString())
      }

      // Calculate retirement year if not already set
      if (!formData.retirementYear && formData.gender) {
        const retirementAge = formData.gender === "male" ? 65 : 60
        const calculatedRetirementYear = retirementAge - age + currentYear
        updateFormData("retirementYear", calculatedRetirementYear.toString())
      }
    }
  }, [currentStep, formData.age, formData.gender, formData.workStartYear, formData.retirementYear])

  const updateFormData = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.age.trim() !== ""
      case 2:
        return formData.gender !== ""
      case 3:
        return formData.grossSalary.trim() !== ""
      case 4:
        return formData.workStartYear.trim() !== "" && formData.retirementYear.trim() !== ""
      case 5:
        return true // Step 5 has optional fields only
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else if (currentStep === 5) {
      localStorage.setItem("retirementFormData", JSON.stringify(formData))
      router.push("/")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progressPercentage = (currentStep / 5) * 100

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header with Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#00416E]">Krok {currentStep} z 5</h2>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Shield className="w-5 h-5 text-[#009F3F]" />
                <span className="text-sm font-medium text-[#00416E]">Tryb dostępności</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FFB34F] via-[#C8D64F] to-[#009F3F] transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-right text-sm text-gray-500 mt-2">{progressPercentage}%</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          {/* Step 1: Age */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-[#FFE8CC] flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-[#FFB34F]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#00416E]">Twój wiek</h3>
                  <p className="text-gray-500 mt-1">Pomożemy Ci zaplanować przyszłość</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-[#00416E] font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#3F84D2]" />
                  Wiek
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => updateFormData("age", e.target.value)}
                  className="h-12 text-base border-gray-300 focus-visible:ring-[#3F84D2]"
                  placeholder="45"
                />
              </div>
            </div>
          )}

          {/* Step 2: Gender */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-[#FFE8CC] flex items-center justify-center">
                  <User className="w-7 h-7 text-[#FFB34F]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#00416E]">Twoja płeć</h3>
                  <p className="text-gray-500 mt-1">Potrzebujemy tej informacji do obliczeń</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-[#00416E] font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-[#3F84D2]" />
                  Płeć
                </Label>
                <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                  <SelectTrigger className="h-12 text-base border-gray-300 focus:ring-[#3F84D2]">
                    <SelectValue placeholder="Wybierz płeć" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Mężczyzna</SelectItem>
                    <SelectItem value="female">Kobieta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 3: Salary */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-[#FFE8CC] flex items-center justify-center">
                  <DollarSign className="w-7 h-7 text-[#FFB34F]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#00416E]">Twoje wynagrodzenie</h3>
                  <p className="text-gray-500 mt-1">Podstawa do obliczenia emerytury</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary" className="text-[#00416E] font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#009F3F]" />
                  Wynagrodzenie brutto (PLN)
                </Label>
                <Input
                  id="salary"
                  type="number"
                  value={formData.grossSalary}
                  onChange={(e) => updateFormData("grossSalary", e.target.value)}
                  className="h-12 text-base border-gray-300 focus-visible:ring-[#3F84D2]"
                  placeholder="5000"
                />
              </div>
            </div>
          )}

          {/* Step 4: Career */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-[#FFE8CC] flex items-center justify-center">
                  <Briefcase className="w-7 h-7 text-[#FFB34F]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#00416E]">Twoja kariera</h3>
                  <p className="text-gray-500 mt-1">Kiedy zacząłeś i kiedy planujesz zakończyć</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workStart" className="text-[#00416E] font-medium flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#3F84D2]" />
                  Rok rozpoczęcia pracy
                </Label>
                <Input
                  id="workStart"
                  type="number"
                  value={formData.workStartYear}
                  onChange={(e) => updateFormData("workStartYear", e.target.value)}
                  className="h-12 text-base border-gray-300 focus-visible:ring-[#3F84D2]"
                  placeholder="2010"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="retirement" className="text-[#00416E] font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#009F3F]" />
                  Planowany rok emerytury
                </Label>
                <Input
                  id="retirement"
                  type="number"
                  value={formData.retirementYear}
                  onChange={(e) => updateFormData("retirementYear", e.target.value)}
                  className="h-12 text-base border-gray-300 focus-visible:ring-[#3F84D2]"
                  placeholder="2050"
                />
              </div>

              <div className="space-y-4 pt-2">
                <Label htmlFor="retirementGoal" className="text-[#00416E] font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#009F3F]" />
                  Jaka część Twoich zarobków jest celem emerytalnym?
                </Label>
                <div className="space-y-3">
                  <Slider
                    id="retirementGoal"
                    value={[formData.retirementGoalPercentage]}
                    onValueChange={(value) => updateFormData("retirementGoalPercentage", value[0])}
                    min={0}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">0%</span>
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#E8F5E9] rounded-lg">
                      <span className="text-2xl font-bold text-[#009F3F]">{formData.retirementGoalPercentage}%</span>
                    </div>
                    <span className="text-sm text-gray-500">100%</span>
                  </div>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Miesięczny cel emerytalny:</span>
                      <span className="text-xl font-bold text-[#00416E]">
                        {formData.grossSalary
                          ? `${(
                              (Number.parseFloat(formData.grossSalary) * formData.retirementGoalPercentage) / 100
                            ).toLocaleString("pl-PL", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })} zł`
                          : "0,00 zł"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Optional Info */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-[#FFE8CC] flex items-center justify-center">
                  <Handshake className="w-7 h-7 text-[#FFB34F]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#00416E]">Dodatkowe informacje</h3>
                  <p className="text-gray-500 mt-1">Opcjonalne dane dla dokładniejszych obliczeń</p>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-[#FFF8E6] border border-[#FFE8CC] rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#3F84D2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#00416E] mb-1">Opcjonalne dane</h4>
                    <p className="text-sm text-gray-600">
                      Te informacje pomogą nam lepiej zaplanować Twoją emeryturę, ale nie są wymagane.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="zusAccount" className="text-[#00416E] font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#FFB34F]" />
                  Środki na koncie ZUS (PLN)
                </Label>
                <Input
                  id="zusAccount"
                  type="number"
                  value={formData.zusAccount}
                  onChange={(e) => updateFormData("zusAccount", e.target.value)}
                  className="h-12 text-base border-gray-300 focus-visible:ring-[#3F84D2]"
                  placeholder="np. 50000 (opcjonalnie)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zusSubaccount" className="text-[#00416E] font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#FFB34F]" />
                  Środki na subkoncie (PLN)
                </Label>
                <Input
                  id="zusSubaccount"
                  type="number"
                  value={formData.zusSubaccount}
                  onChange={(e) => updateFormData("zusSubaccount", e.target.value)}
                  className="h-12 text-base border-gray-300 focus-visible:ring-[#3F84D2]"
                  placeholder="np. 20000 (opcjonalnie)"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            <Button
              onClick={handleBack}
              disabled={currentStep === 1}
              variant="outline"
              className="flex-1 h-12 text-base font-semibold border-2 border-gray-300 text-[#00416E] hover:bg-gray-50 disabled:opacity-50 bg-transparent"
            >
              Wstecz
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isCurrentStepValid()}
              className={`flex-1 h-12 text-base font-semibold ${
                currentStep === 5 ? "bg-[#009F3F] hover:bg-[#008835]" : "bg-[#00416E] hover:bg-[#003152]"
              } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {currentStep === 5 ? "Zakończ" : "Dalej"}
            </Button>
          </div>

          {/* Security Message */}
          <p className="text-center text-sm text-gray-500 mt-6">Twoje dane są bezpieczne i poufne</p>
        </div>

        {/* Help Text */}
        <p className="text-center text-gray-500">Potrzebujesz pomocy? Jesteśmy tutaj dla Ciebie.</p>
      </div>
    </div>
  )
}
