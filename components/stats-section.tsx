"use client"

import { useEffect, useState } from "react"
import { TrendingUp, User, RefreshCw, Loader2, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface StatsSectionProps {
  balance: string | null
  yourBalance: string | null
  isConnected: boolean
  isLoading: boolean
  onCheckBalance: () => void
  onCheckYourBalance: () => void
}

function AnimatedNumber({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState("0.00")

  useEffect(() => {
    if (value) {
      setDisplayValue(Number.parseFloat(value).toFixed(4))
    }
  }, [value])

  return <span className="tabular-nums animate-in fade-in slide-in-from-bottom-2 duration-500">{displayValue}</span>
}

export function StatsSection({
  balance,
  yourBalance,
  isConnected,
  isLoading,
  onCheckBalance,
  onCheckYourBalance,
}: StatsSectionProps) {
  return (
    <div className="space-y-6">
      <Card className="relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-xl group hover:border-primary/30 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardContent className="p-6 relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Pool Balance</h3>
                <p className="text-xs text-muted-foreground/60">All contributions</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCheckBalance}
              disabled={!isConnected || isLoading}
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            </Button>
          </div>

          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-foreground">
              {balance ? <AnimatedNumber value={balance} /> : "--"}
            </span>
            <span className="text-xl font-semibold text-primary mb-1">ETH</span>
          </div>

          <div className="mt-4">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: balance ? `${Math.min(Number.parseFloat(balance) * 10, 100)}%` : "0%",
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-xl group hover:border-secondary/30 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardContent className="p-6 relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:scale-110 transition-transform duration-300">
                <User className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Your Contribution</h3>
                <p className="text-xs text-muted-foreground/60">Personal stake</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCheckYourBalance}
              disabled={!isConnected || isLoading}
              className="text-muted-foreground hover:text-secondary hover:bg-secondary/10 transition-colors"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            </Button>
          </div>

          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-foreground">
              {yourBalance ? <AnimatedNumber value={yourBalance} /> : "--"}
            </span>
            <span className="text-xl font-semibold text-secondary mb-1">ETH</span>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
              <Activity className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Network Status</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Contract Status</span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium text-primary">Active</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Network</span>
              <span className="text-sm font-medium text-foreground">Ethereum</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Wallet Status</span>
              <span className={`text-sm font-medium ${isConnected ? "text-primary" : "text-muted-foreground"}`}>
                {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
