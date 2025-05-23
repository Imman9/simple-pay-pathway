
import React from 'react';

interface SeatMapProps {
  availableSeats: number;
  totalSeats?: number;
}

const SeatMap = ({ availableSeats, totalSeats = 14 }: SeatMapProps) => {
  const occupiedSeats = totalSeats - availableSeats;
  
  // Create seat arrangement (typical matatu layout: 2+1 seating)
  const seats = Array.from({ length: totalSeats }, (_, index) => ({
    id: index + 1,
    isOccupied: index < occupiedSeats
  }));

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
      <h4 className="text-sm font-semibold mb-4 text-center text-gray-800">Seat Availability</h4>
      <div className="grid grid-cols-3 gap-2 max-w-36 mx-auto">
        {seats.map((seat) => (
          <div
            key={seat.id}
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shadow-sm transition-all duration-200 ${
              seat.isOccupied 
                ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-red-200' 
                : 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-green-200 hover:scale-105'
            }`}
          >
            {seat.id}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-6 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-green-600 rounded-md shadow-sm"></div>
          <span className="font-medium text-gray-700">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-red-600 rounded-md shadow-sm"></div>
          <span className="font-medium text-gray-700">Occupied</span>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
