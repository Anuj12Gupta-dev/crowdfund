"use client"

import { useState } from "react"
import { Send, ArrowDownToLine, Loader2, CheckCircle2, XCircle, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DonationCardProps {
  isConnected: boolean
  isLoading: boolean
  txStatus: string | null
  onDonate: (value: string) => void
  onWithdraw: () => void
  onConnect: () => void
}

export function DonationCard({ isConnected, isLoading, txStatus, onDonate, onWithdraw, onConnect }: DonationCardProps) {
  const [amount, setAmount] = useState("")

  const presetAmounts = ["0.01", "0.05", "0.1", "0.5"]

  return (
    <Card className="relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-xl">
      <div className="absolute inset-0 rounded-lg p-px bg-gradient-to-br from-primary/50 via-transparent to-secondary/50 opacity-50" />

      <div className="relative bg-card rounded-lg">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img src="/ethereum-blockchain-abstract-digital-art.jpg" alt="Crowdfunding" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

          <div className="absolute top-4 right-4 flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full px-3 py-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-primary">LIVE</span>
          </div>
        </div>

        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-foreground">Contribute to the Pool</CardTitle>
          <p className="text-muted-foreground text-sm">Support the cause with Ethereum</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-4 gap-2">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  amount === preset
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                }`}
              >
                {preset} ETH
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-secondary">Ξ</span>
              </div>
            </div>
            <Input
              type="number"
              step="0.001"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter custom amount"
              className="pl-14 pr-16 py-6 bg-muted border-border/50 text-foreground placeholder:text-muted-foreground rounded-xl focus:ring-2 focus:ring-primary/50 transition-all"
              disabled={!isConnected}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
              ETH
            </span>
          </div>

          {txStatus && (
            <div
              className={`flex items-center gap-3 p-4 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                txStatus === "pending"
                  ? "bg-secondary/10 border border-secondary/30"
                  : txStatus === "success"
                    ? "bg-primary/10 border border-primary/30"
                    : "bg-destructive/10 border border-destructive/30"
              }`}
            >
              {txStatus === "pending" && (
                <>
                  <Loader2 className="w-5 h-5 text-secondary animate-spin" />
                  <span className="text-secondary font-medium">Transaction pending...</span>
                </>
              )}
              {txStatus === "success" && (
                <>
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium">Transaction successful!</span>
                </>
              )}
              {txStatus === "error" && (
                <>
                  <XCircle className="w-5 h-5 text-destructive" />
                  <span className="text-destructive font-medium">Transaction failed</span>
                </>
              )}
            </div>
          )}

          {isConnected ? (
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => onDonate(amount)}
                disabled={isLoading || !amount}
                className="relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:hover:scale-100"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  Donate
                </span>
              </Button>

              <Button
                onClick={onWithdraw}
                disabled={isLoading}
                variant="outline"
                className="bg-destructive/10 hover:bg-destructive/20 border-destructive/30 text-destructive font-semibold py-6 rounded-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <span className="flex items-center gap-2">
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowDownToLine className="w-5 h-5" />}
                  Withdraw
                </span>
              </Button>
            </div>
          ) : (
            <Button
              onClick={onConnect}
              className="w-full relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold py-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg animate-gradient"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Connect Wallet to Participate
              </span>
            </Button>
          )}
        </CardContent>
      </div>
    </Card>
  )
}
