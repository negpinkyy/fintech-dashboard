import AccountBalance from "../components/AccountBalance";
import TransactionList from "../components/Transaction";


export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Manage your finances with ease</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-1">
        <AccountBalance/>
        </div>
        <div className="lg:col-span-2">
         <TransactionList/>
        </div>
      </div>
    </div>
  )
}