
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Car className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-gray-800">MataPay</h1>
        <p className="text-lg text-gray-600 mb-8">
          Simple and secure matatu payments
        </p>
        
        <div className="space-y-4">
          <Link to="/payment">
            <Button className="w-full py-3 text-lg">
              Scan QR Code to Pay
            </Button>
          </Link>
          
          <p className="text-sm text-gray-500">
            Scan the QR code on your matatu to get started
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
