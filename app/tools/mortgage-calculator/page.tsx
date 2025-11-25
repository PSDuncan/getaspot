"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator, Info } from "lucide-react"
import { useState } from "react"

export default function MortgageCalculatorPage() {
  const [propertyPrice, setPropertyPrice] = useState(2000000)
  const [deposit, setDeposit] = useState(200000)
  const [interestRate, setInterestRate] = useState(11.5)
  const [loanTerm, setLoanTerm] = useState(20)

  const [result, setResult] = useState<{
    monthlyPayment: number
    totalPayment: number
    totalInterest: number
  } | null>(null)

  const calculateMortgage = () => {
    const loanAmount = propertyPrice - deposit
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12

    const monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    const totalPayment = monthlyPayment * numberOfPayments
    const totalInterest = totalPayment - loanAmount

    setResult({
      monthlyPayment,
      totalPayment: totalPayment + deposit,
      totalInterest,
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Calculator className="w-16 h-16 mx-auto mb-4 text-teal-600" />
            <h1 className="text-4xl font-bold mb-4">Mortgage Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Calculate your monthly mortgage payments and see how much you can afford
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card>
              <CardHeader>
                <CardTitle>Loan Details</CardTitle>
                <CardDescription>Enter your property and loan information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="propertyPrice">Property Price</Label>
                  <Input
                    id="propertyPrice"
                    type="number"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    min={100000}
                    step={10000}
                  />
                  <p className="text-sm text-muted-foreground mt-1">{formatCurrency(propertyPrice)}</p>
                </div>

                <div>
                  <Label htmlFor="deposit">Deposit Amount</Label>
                  <Input
                    id="deposit"
                    type="number"
                    value={deposit}
                    onChange={(e) => setDeposit(Number(e.target.value))}
                    min={0}
                    step={10000}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatCurrency(deposit)} ({((deposit / propertyPrice) * 100).toFixed(1)}% deposit)
                  </p>
                </div>

                <div>
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    min={1}
                    max={25}
                    step={0.1}
                  />
                  <p className="text-sm text-muted-foreground mt-1">Current average: 11.5% p.a.</p>
                </div>

                <div>
                  <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                  <Input
                    id="loanTerm"
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    min={1}
                    max={30}
                  />
                  <p className="text-sm text-muted-foreground mt-1">{loanTerm * 12} months</p>
                </div>

                <Button onClick={calculateMortgage} className="w-full">
                  Calculate Payment
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {result ? (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Payment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold text-teal-600">{formatCurrency(result.monthlyPayment)}</div>
                      <p className="text-muted-foreground mt-2">per month for {loanTerm} years</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Loan Amount</span>
                        <span className="font-semibold">{formatCurrency(propertyPrice - deposit)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Interest</span>
                        <span className="font-semibold">{formatCurrency(result.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between pt-4 border-t">
                        <span className="text-muted-foreground">Total Payment</span>
                        <span className="font-semibold text-lg">{formatCurrency(result.totalPayment)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex gap-3">
                        <Info className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-muted-foreground">
                          <p className="mb-2">
                            This calculator provides an estimate of your monthly mortgage payments. Actual payments may
                            vary based on additional costs such as:
                          </p>
                          <ul className="list-disc list-inside space-y-1">
                            <li>Property insurance</li>
                            <li>Transfer fees</li>
                            <li>Bond registration costs</li>
                            <li>Municipal rates and taxes</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calculator className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Enter your details and click Calculate to see your monthly payment
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
