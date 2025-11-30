"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { Navbar } from "./navbar"
import { HeroSection } from "./hero-section"
import { DonationCard } from "./donation-card"
import { StatsSection } from "./stats-section"
import { ParticleBackground } from "./particle-background"

const contractAddress = "0x31a1A54627B7A118140472A7e555c820E0A514eA"

const abi = [
  {
    inputs: [],
    name: "endFunding",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "setFund",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_endTime", type: "uint256" },
      { internalType: "uint256", name: "_goalAmount", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "withdrawalSomeFunds",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawlAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "checkAllFunds",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "myAddress", type: "address" }],
    name: "checkYourFunds",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "endTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "goalAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isStarted",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
]

export default function Crowdfund() {
  const [balance, setBalance] = useState<string | null>(null)
  const [contract, setContract] = useState<ethers.Contract | null>(null)
  const [contract2, setContract2] = useState<ethers.Contract | null>(null)
  const [yourBalance, setYourBalance] = useState<string | null>(null)
  const [accounts, setAccounts] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [txStatus, setTxStatus] = useState<string | null>(null)

  async function connectWallet() {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("Please install MetaMask to use this DApp")
      return
    }

    setIsConnecting(true)
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      setAccounts(accounts[0])

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer1 = await provider.getSigner(accounts[0])
      const signer2 = accounts[1] ? await provider.getSigner(accounts[1]) : signer1

      const crowdFundContract = new ethers.Contract(contractAddress, abi, signer1)
      const crowdFundContract2 = new ethers.Contract(contractAddress, abi, signer2)

      setContract(crowdFundContract)
      setContract2(crowdFundContract2)
    } catch (error) {
      console.error("Connection failed:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  async function handleBalanceCheck() {
    if (!contract) return
    setIsLoading(true)
    try {
      const balanceAll = await contract.checkAllFunds()
      setBalance(ethers.formatEther(balanceAll))
    } catch (error) {
      console.error("Failed to check balance:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleYourBalance() {
    if (!contract) return
    setIsLoading(true)
    try {
      const address = await contract.runner?.getAddress()
      if (address) {
        const yourFunds = await contract.checkYourFunds(address)
        setYourBalance(ethers.formatEther(yourFunds))
      }
    } catch (error) {
      console.error("Failed to check your balance:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSetFund(value: string) {
    if (!contract2 || !value) return
    setIsLoading(true)
    setTxStatus("pending")
    try {
      const txn = await contract2.setFund({
        value: ethers.parseEther(value),
      })
      await txn.wait()
      setTxStatus("success")
      handleBalanceCheck()
      handleYourBalance()
    } catch (error) {
      console.error("Donation failed:", error)
      setTxStatus("error")
    } finally {
      setIsLoading(false)
      setTimeout(() => setTxStatus(null), 3000)
    }
  }

  async function withdrawAll() {
    if (!contract2) return
    setIsLoading(true)
    setTxStatus("pending")
    try {
      const txn = await contract2.withdrawlAll()
      await txn.wait()
      setTxStatus("success")
      handleBalanceCheck()
      handleYourBalance()
    } catch (error) {
      console.error("Withdrawal failed:", error)
      setTxStatus("error")
    } finally {
      setIsLoading(false)
      setTimeout(() => setTxStatus(null), 3000)
    }
  }

  useEffect(() => {
    if (contract) {
      handleBalanceCheck()
      handleYourBalance()
    }
  }, [contract])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleBackground />

      <Navbar accounts={accounts} isConnecting={isConnecting} onConnect={connectWallet} />

      <main className="relative z-10">
        <HeroSection isConnected={!!accounts} />

        <div className="container mx-auto px-4 pb-20">
          <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
            <DonationCard
              isConnected={!!accounts}
              isLoading={isLoading}
              txStatus={txStatus}
              onDonate={handleSetFund}
              onWithdraw={withdrawAll}
              onConnect={connectWallet}
            />

            <StatsSection
              balance={balance}
              yourBalance={yourBalance}
              isConnected={!!accounts}
              isLoading={isLoading}
              onCheckBalance={handleBalanceCheck}
              onCheckYourBalance={handleYourBalance}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
