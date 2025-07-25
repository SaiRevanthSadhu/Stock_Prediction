"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Target, Percent } from "lucide-react"

interface PredictionResultsProps {
  prediction: {
    nextPrice: number
    trend: "up" | "down"
    confidence: number
  }
  currentPrice: number
  stockSymbol: string
}

export default function PredictionResults({ prediction, currentPrice, stockSymbol }: PredictionResultsProps) {
  const priceChange = prediction.nextPrice - currentPrice
  const priceChangePercent = (priceChange / currentPrice) * 100

  return (
    <Card className="border-2 border-dashed border-slate-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          AI Prediction Results
        </CardTitle>
        <CardDescription>Neural network prediction for next trading session</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Predicted Price */}
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <div className="text-3xl font-bold text-slate-900 mb-1">${prediction.nextPrice.toFixed(2)}</div>
            <div className="text-sm text-slate-600">Predicted Price</div>
          </div>

          {/* Price Change */}
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <div
              className={`text-3xl font-bold mb-1 flex items-center justify-center gap-1 ${
                priceChange >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {priceChange >= 0 ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}$
              {Math.abs(priceChange).toFixed(2)}
            </div>
            <div className="text-sm text-slate-600">Expected Change</div>
          </div>

          {/* Percentage Change */}
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <div
              className={`text-3xl font-bold mb-1 flex items-center justify-center gap-1 ${
                priceChangePercent >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <Percent className="h-6 w-6" />
              {priceChangePercent >= 0 ? "+" : ""}
              {priceChangePercent.toFixed(2)}%
            </div>
            <div className="text-sm text-slate-600">Percentage Change</div>
          </div>

          {/* Confidence */}
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-1">{(prediction.confidence * 100).toFixed(1)}%</div>
            <div className="text-sm text-slate-600">Confidence Level</div>
          </div>
        </div>

        {/* Trend Analysis */}
        <div className="mt-6 p-4 rounded-lg border-l-4 border-l-blue-500 bg-blue-50">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-full ${prediction.trend === "up" ? "bg-green-100" : "bg-red-100"}`}>
              {prediction.trend === "up" ? (
                <TrendingUp className="h-5 w-5 text-green-600" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-600" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Market Trend Analysis</h3>
              <p className="text-slate-700 text-sm">
                The neural network predicts a <strong>{prediction.trend === "up" ? "bullish" : "bearish"}</strong> trend
                for {stockSymbol} with a confidence level of {(prediction.confidence * 100).toFixed(1)}%. The model
                expects the price to {prediction.trend === "up" ? "increase" : "decrease"} by $
                {Math.abs(priceChange).toFixed(2)} ({Math.abs(priceChangePercent).toFixed(2)}%) in the next trading
                session.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-xs">
            <strong>Disclaimer:</strong> This prediction is generated by an AI model for educational purposes only. It
            should not be used as financial advice. Always consult with financial professionals before making investment
            decisions.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
