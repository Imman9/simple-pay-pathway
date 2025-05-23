
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
    <div className="bg-gray-100 p-4 rounded-lg">
      <h4 className="text-sm font-medium mb-3 text-center">Seat Availability</h4>
      <div className="grid grid-cols-3 gap-1 max-w-32 mx-auto">
        {seats.map((seat) => (
          <div
            key={seat.id}
            className={`w-6 h-6 rounded-sm flex items-center justify-center text-xs font-medium ${
              seat.isOccupied 
                ? 'bg-red-500 text-white' 
                : 'bg-green-500 text-white'
            }`}
          >
            {seat.id}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
          <span>Occupied</span>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
