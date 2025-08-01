'use client'
import { useState, useEffect } from 'react'
import { Eye, EyeOff, CreditCard, TrendingUp } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'

export default function AccountBalance() {
  const [account, setAccount] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showBalance, setShowBalance] = useState(true)

  useEffect(() => {
    fetchAccount()
  }, [])

  const fetchAccount = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/account')
      if (!response.ok) throw new Error('Failed to fetch account data')
      const data = await response.json()
      setAccount(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} onRetry={fetchAccount} />

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 items-stretch">
      {/* Main Balance Card */}
      <div className="card h-full bg-gradient-to-br from-primary-500 to-primary-700 text-white flex flex-col justify-between">

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-6 h-6" />
            <span className="font-medium">Account Balance</span>
          </div>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="mb-">
          <span className="text-2xl font-bold">
            {showBalance ? `$${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '*****'}
          </span>
          <span className="text-primary-100 ml-2">{account.currency}</span>
        </div>
        
        <div className="text-sm text-primary-100 mt-4">
          {account.accountType} • {account.accountNumber}
        </div>
      </div>

      {/* Account Details */}
      <div className="card h-full flex flex-col justify-between">

        <h3 className="font-semibold text-lg mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
          Account Details
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Account Holder</span>
            <span className="font-medium">{account.accountHolder}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Account Type</span>
            <span className="font-medium">{account.accountType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Updated</span>
            <span className="font-medium text-sm">
              {new Date(account.lastUpdated).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}