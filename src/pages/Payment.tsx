import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Car, Route } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Matatu Details Card */}
        <Card className="p-6">
          <AspectRatio ratio={16 / 9} className="mb-4">
            <img
              src={matatuDetails.image}
              alt="Matatu"
              className="rounded-lg object-cover w-full h-full"
            />
          </AspectRatio>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{matatuDetails.numberPlate}</h2>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                {matatuDetails.availableSeats} seats available
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Car className="w-4 h-4" />
              <span>Driver: {matatuDetails.driverName}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Route className="w-4 h-4" />
              <span>Route: {matatuDetails.route}</span>
            </div>

            <SeatMap availableSeats={matatuDetails.availableSeats} />
          </div>
        </Card>

        {paymentStep === "details" && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Enter Destination</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="destination">Your Destination</Label>
                <Input
                  id="destination"
                  placeholder="e.g., Westlands, Karen, etc."
                  value={destination}
                  onChange={(e) => handleDestinationChange(e.target.value)}
                />
              </div>
              
              {fare > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fare Amount:</span>
                    <span className="text-xl font-bold text-blue-600">KSh {fare}</span>
                  </div>
                </div>
              )}
              
              <Button 
                onClick={handlePayment} 
                className="w-full"
                disabled={!destination}
              >
                Proceed to Payment
              </Button>
            </div>
          </Card>
        )}

        {paymentStep === "payment" && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Destination:</span>
                  <span className="font-medium">{destination}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fare:</span>
                  <span className="font-medium">KSh {fare}</span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone">M-Pesa Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="0712345678"
                  type="tel"
                />
              </div>
              
              <Button onClick={confirmPayment} className="w-full bg-green-600 hover:bg-green-700">
                Pay with M-Pesa
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setPaymentStep("details")}
                className="w-full"
              >
                Back
              </Button>
            </div>
          </Card>
        )}

        {paymentStep === "confirmation" && (
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-xl font-semibold text-green-600 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-4">
              Your payment of KSh {fare} has been processed successfully.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Transaction ID:</span>
                <span className="font-mono">MPX{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span>Matatu:</span>
                <span>{matatuDetails.numberPlate}</span>
              </div>
              <div className="flex justify-between">
                <span>Destination:</span>
                <span>{destination}</span>
              </div>
            </div>
            
            <Button onClick={() => setPaymentStep("details")} className="w-full">
              Make Another Payment
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Payment;
