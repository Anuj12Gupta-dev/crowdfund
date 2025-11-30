"use client"

import { Wallet, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  accounts: string | null
  isConnecting: boolean
  onConnect: () => void
}

function shortenAddress(addr: string): string {
  return addr.slice(0, 6) + "..." + addr.slice(-4)
}

export function Navbar({ accounts, isConnecting, onConnect }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl group-hover:bg-primary/40 transition-all duration-500" />
              <div className="relative w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-all duration-300">
                <Zap className="w-5 h-5 text-primary" />
              </div>
            </div>
            <span className="text-xl font-bold text-foreground">
              Crowd<span className="text-primary">Fund</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {accounts ? (
              <div className="flex items-center gap-3 bg-muted/50 rounded-full px-4 py-2 border border-border/50">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground font-mono">{shortenAddress(accounts)}</span>
              </div>
            ) : (
              <Button
                onClick={onConnect}
                disabled={isConnecting}
                className="relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
