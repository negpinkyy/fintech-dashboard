import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

export async function GET() {
  try {
    const jsonDirectory = path.join(process.cwd(), 'data')
    const filePath = path.join(jsonDirectory, 'transactions.json')
    
    console.log('Attempting to read file from:', filePath) // Debug log
    
    // Check if file exists
    try {
      await fs.access(filePath)
    } catch (error) {
      console.error('File does not exist:', filePath)
      return NextResponse.json(
        { error: 'Transactions data file not found. Please ensure data/transactions.json exists.' },
        { status: 404 }
      )
    }
    
    const fileContents = await fs.readFile(filePath, 'utf8')
    const transactions = JSON.parse(fileContents)
    
    // Sort by date (newest first)
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date))
    
    return NextResponse.json(transactions)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to load transactions',
        details: error.message,
        path: process.cwd()
      },
      { status: 500 }
    )
  }
}