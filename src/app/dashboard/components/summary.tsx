import { ChevronDown } from 'lucide-react';
export default function AdminSummary(){
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 mt-16 md:mt-6 ">
        <div className="bg-custom-gradient rounded-xl p-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white text-sm">Total Money Available</h3>
            <span className="text-white/70 text-xs flex items-center gap-1">STRK <ChevronDown/></span>
          </div>
          <div className="text-white text-2xl font-bold mb-2">$203,500,568</div>
          <div className="text-white/70 text-xs">NATIVE MINTED $5.5K</div>
        </div>

        <div className="bg-custom-gradient rounded-xl p-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white text-sm">Total Money Received</h3>
            <span className="text-white/70 text-xs flex items-center gap-1">STRK <ChevronDown/></span>
          </div>
          <div className="text-white text-2xl font-bold">$117,000.00</div>
        </div>

        <div className="bg-custom-gradient rounded-xl p-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white text-sm">Total Money Withdrawn</h3>
            <span className="text-white/70 text-xs flex items-center gap-1">STRK <ChevronDown/></span>
         
          </div>
          <div className="text-white text-2xl font-bold">$20,500.017</div>
        </div>
      </div>
    )
}