import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

export async function GET(request, { params }) {
  try {
    const jsonDirectory = path.join(process.cwd(), 'data')
    const filePath = path.join(jsonDirectory, 'transactions.json')
    
    const fileContents = await fs.readFile(filePath, 'utf8')
    const transactions = JSON.parse(fileContents)
    
    const transaction = transactions.find(t => t.id === params.id)
    
    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(transaction)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to load transaction',
        details: error.message 
      },
      { status: 500 }
    )
  }
}