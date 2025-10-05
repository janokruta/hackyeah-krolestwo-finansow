"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  "Wszystkie",
  "Podstawy inwestowania",
  "Produkty emerytalne (IKE/IKZE)",
  "Strategie długoterminowe",
  "ETF-y",
  "Akcje",
  "Obligacje",
  "Ryzyko inwestycyjne",
  "Słownik pojęć",
]

const articles = [
  {
    id: 1,
    title: "Czym jest IKE i IKZE?",
    description:
      "Jak oszczędzać na emeryturę i płacić mniejsze podatki? Coraz więcej osób w Polsce zdaje sobie sprawę, że sama emerytura z ZUS nie wystarczy, by utrzymać dotychczasowy standard życia.",
    image: "/piggy-bank-calculator-savings.jpg",
    categories: ["Podstawy inwestowania", "Ryzyko inwestycyjne"],
    featured: true,
  },
  {
    id: 2,
    title: "Jak kupować obligacje skarbowe?",
    description:
      "Bezpieczny sposób na oszczędzanie z gwarancją państwa. W czasach niepewności gospodarczej coraz więcej osób szuka stabilnych form inwestowania.",
    image: "/stock-traders-at-computer-screens-trading-floor.jpg",
    categories: ["Obligacje", "Podstawy inwestowania"],
    featured: false,
  },
  {
    id: 3,
    title: "Podstawy analizy wykresów",
    description: "Naucz się czytać wykresy giełdowe i rozpoznawać kluczowe formacje techniczne.",
    image: "/stock-market-charts-technical-analysis-annotations.jpg",
    categories: ["Podstawy inwestowania", "Akcje"],
    featured: false,
  },
  {
    id: 4,
    title: "Jak działa Wall Street?",
    description: "Poznaj mechanizmy działania największej giełdy świata i jej wpływ na globalne rynki.",
    image: "/wall-street-trading-floor-stock-exchange.jpg",
    categories: ["Podstawy inwestowania", "Akcje"],
    featured: false,
  },
]

export default function EdukacjaPage() {
  const [activeCategory, setActiveCategory] = useState("Wszystkie")

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Baza wiedzy</h1>
          <p className="text-gray-600 text-lg">Dowiedz się więcej o inwestowaniu i planowaniu emerytalnym</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mb-8">
          {articles
            .filter((article) => article.featured)
            .map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.categories.map((cat) => (
                        <span
                          key={cat}
                          className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{article.title}</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">{article.description}</p>
                    <Button className="bg-green-600 hover:bg-green-700 text-white w-fit">
                      Czytaj dalej
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles
            .filter((article) => !article.featured)
            .map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {article.categories.map((cat) => (
                      <span key={cat} className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{article.description}</p>
                  <button className="text-gray-900 font-medium text-sm flex items-center hover:text-green-600 transition-colors">
                    Czytaj więcej
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
