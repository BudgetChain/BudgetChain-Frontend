import { ChevronDown } from 'lucide-react';
export default function AdminSummary(){
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 mt-16 md:mt-0 ">
        <div className="bg-custom-gradient rounded-xl p-6 flex flex-col justify-center">
         <div>
         <div className="flex justify-between items-center mb-2">
            <h3 className="text-white text-sm">Total Money Available</h3>
            <span className="text-white/70 text-xs flex items-center gap-1">STRK <ChevronDown/></span>
          </div>
          <div className="text-white text-2xl font-bold mb-3">$203,500,568</div>
          <button className="text-white/70 text-xs border px-4 py-2 rounded-xl">Make Transfer</button>
      
         </div>
         
           </div>

        <div className="bg-custom-gradient rounded-xl p-6 flex flex-col justify-center">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white text-sm">Total Money Received</h3>
            <span className="text-white/70 text-xs flex items-center gap-1">STRK <ChevronDown/></span>
          </div>
          <div className="text-white text-2xl font-bold">$36,500</div>
        </div>

        <div className="bg-custom-gradient rounded-xl p-6 flex flex-col justify-center">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white text-sm">Total Number of Active DAOs</h3>
           </div>
          <div className="text-white text-2xl font-bold">2 </div>
        </div>
      </div>
    )
}