import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

export async function GET() {
  try {
    
    const jsonDirectory = path.join(process.cwd(), 'data')
    const filePath = path.join(jsonDirectory, 'account.json')
    
    // console.log('Attempting to read file from:', filePath) 
    
    // Check if file exists
    try {
      await fs.access(filePath)
    } catch (error) {
      console.error('File does not exist:', filePath)
      return NextResponse.json(
        { error: 'Account data file not found. Please ensure data/account.json exists.' },
        { status: 404 }
      )
    }
    
    const fileContents = await fs.readFile(filePath, 'utf8')
    const account = JSON.parse(fileContents)
    
    return NextResponse.json(account)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to load account data',
        details: error.message,
        path: process.cwd()
      },
      { status: 500 }
    )
  }
}