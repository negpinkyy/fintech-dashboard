'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, CreditCard, Building, Hash, Tag } from 'lucide-react'
import Link from 'next/link'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorMessage from '@/components/ErrorMessage'

export default function TransactionDetail({ params }) {
  const [transaction, setTransaction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetchTransaction()
  }, [params.id])

  const fetchTransaction = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/transactions/${params.id}`)
      if (!response.ok) throw new Error('Transaction not found')
      const data = await response.json()
      setTransaction(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} onRetry={fetchTransaction} />

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Transaction Details</h1>
      </div>

      {/* Transaction Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Details */}
        <div className="card bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-6">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <CreditCard className={`w-8 h-8 ${
                transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
              }`} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{transaction.description}</h2>
            <div className={`text-3xl font-bold ${
              transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.type === 'credit' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
            </div>
          </div>

          <div className="flex justify-center">
            <span className={`px-4 py-2 rounded-full border text-sm font-medium ${getStatusColor(transaction.status)}`}>
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Additional Information */}
        <div className="card bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-lg mb-4">Transaction Information</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-medium">Date & Time</div>
                <div className="text-gray-600 text-sm">
                  {new Date(transaction.date).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <Building className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-medium">Merchant</div>
                <div className="text-gray-600 text-sm">{transaction.merchant}</div>
              </div>
            </div>

            <div className="flex items-center">
              <Tag className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-medium">Category</div>
                <div className="text-gray-600 text-sm">{transaction.category}</div>
              </div>
            </div>

            <div className="flex items-center">
              <Hash className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-medium">Reference</div>
                <div className="text-gray-600 text-sm font-mono">{transaction.reference}</div>
              </div>
            </div>

            <div className="flex items-center">
              <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="font-medium">Transaction ID</div>
                <div className="text-gray-600 text-sm font-mono">{transaction.id}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}