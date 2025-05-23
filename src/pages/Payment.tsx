
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Car, Route, MapPin, CreditCard, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SeatMap from "@/components/SeatMap";

const Payment = () => {
  const [destination, setDestination] = useState("");
  const [fare, setFare] = useState(0);
  const [paymentStep, setPaymentStep] = useState("details"); // details, payment, confirmation
  const { toast } = useToast();

  const matatuDetails = {
    numberPlate: "KCD 123A",
    driverName: "John Mwangi",
    route: "CBD - Westlands",
    availableSeats: 8,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=300&fit=crop"
  };

  const handleDestinationChange = (value: string) => {
    setDestination(value);
    // Simple fare calculation based on destination
    const baseFare = 50;
    const extraFare = value.length * 5; // Simple calculation
    setFare(baseFare + extraFare);
  };

  const handlePayment = () => {
    if (!destination) {
      toast({
        title: "Error",
        description: "Please enter your destination",
        variant: "destructive"
      });
      return;
    }
    setPaymentStep("payment");
  };

  const confirmPayment = () => {
    setPaymentStep("confirmation");
    toast({
      title: "Payment Successful",
      description: `KSh ${fare} paid successfully via M-Pesa`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quick Pay</h1>
          <p className="text-gray-600">Fast & secure matatu payments</p>
        </div>

        {/* Matatu Details Card */}
        <Card className="overflow-hidden shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <AspectRatio ratio={16 / 9} className="relative">
            <img
              src={matatuDetails.image}
              alt="Matatu"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-xl font-bold">{matatuDetails.numberPlate}</h2>
              <p className="text-sm opacity-90">Now boarding</p>
            </div>
          </AspectRatio>
          
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Car className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{matatuDetails.driverName}</p>
                  <p className="text-sm text-gray-500">Driver</p>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  <Clock className="w-3 h-3" />
                  {matatuDetails.availableSeats} seats
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Route className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{matatuDetails.route}</p>
                <p className="text-sm text-gray-500">Route</p>
              </div>
            </div>

            <SeatMap availableSeats={matatuDetails.availableSeats} />
          </div>
        </Card>

        {paymentStep === "details" && (
          <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Where to?</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="destination" className="text-gray-700 font-medium">Your Destination</Label>
                <Input
                  id="destination"
                  placeholder="e.g., Westlands, Karen, Kilimani..."
                  value={destination}
                  onChange={(e) => handleDestinationChange(e.target.value)}
                  className="mt-2 h-12 text-base"
                />
              </div>
              
              {fare > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-xl border border-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Fare Amount</span>
                    <span className="text-2xl font-bold text-blue-600">KSh {fare}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Estimated fare</p>
                </div>
              )}
              
              <Button 
                onClick={handlePayment} 
                className="w-full h-12 text-base font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
                disabled={!destination}
              >
                Continue to Payment
              </Button>
            </div>
          </Card>
        )}

        {paymentStep === "payment" && (
          <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Destination</span>
                  <span className="font-medium text-gray-900">{destination}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Fare</span>
                  <span className="font-bold text-lg text-green-600">KSh {fare}</span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-gray-700 font-medium">M-Pesa Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="0712345678"
                  type="tel"
                  className="mt-2 h-12 text-base"
                />
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={confirmPayment} 
                  className="w-full h-12 text-base font-medium bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
                >
                  Pay with M-Pesa
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setPaymentStep("details")}
                  className="w-full h-12 text-base font-medium border-2"
                >
                  Back
                </Button>
              </div>
            </div>
          </Card>
        )}

        {paymentStep === "confirmation" && (
          <Card className="p-6 text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h3 className="text-xl font-bold text-green-600 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-6">
              Your payment of KSh {fare} has been processed successfully.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-xl mb-6 space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-mono font-medium">MPX{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Matatu</span>
                <span className="font-medium">{matatuDetails.numberPlate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Destination</span>
                <span className="font-medium">{destination}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Date & Time</span>
                <span className="font-medium">{new Date().toLocaleString()}</span>
              </div>
            </div>
            
            <Button 
              onClick={() => setPaymentStep("details")} 
              className="w-full h-12 text-base font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
            >
              Make Another Payment
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Payment;
