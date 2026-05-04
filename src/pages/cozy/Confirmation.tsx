import { Link, useParams, useSearchParams } from "react-router-dom";
import { Check, Calendar, Users, MapPin, ChevronLeft } from "lucide-react";
import AppShell from "@/components/cozy/AppShell";
import { getHotel } from "@/data/hotels";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";

export default function Confirmation() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const hotel = getHotel(id || "");
  const bookingId = searchParams.get("bookingId");
  const amount = searchParams.get("amount");
  
  if (!hotel) return null;

  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).replace(/ /g, ' ') + ' · ' + new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <AppShell hideNav>
      <div className="min-h-screen bg-white flex flex-col items-center pt-12 px-6">
        {/* Success Icon Animation */}
        <div className="relative mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="h-20 w-20 rounded-full bg-[#16a34a] grid place-items-center relative z-10"
          >
            <Check className="h-10 w-10 text-white" strokeWidth={4} />
          </motion.div>
          
          {/* Decorative dots */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], x: [0, (i % 2 ? 40 : -40)], y: [0, (i < 3 ? -40 : 40)] }}
              transition={{ delay: 0.2, duration: 1, repeat: Infinity, repeatDelay: 1 }}
              className="absolute top-1/2 left-1/2 h-1.5 w-1.5 rounded-full bg-accent"
            />
          ))}
        </div>

        <h1 className="text-2xl font-bold font-display text-center">Payment Successful!</h1>
        <p className="text-sm text-muted-foreground text-center mt-1">Your booking is confirmed.</p>

        {/* Booking ID Badge */}
        <div className="mt-6 px-8 py-3 rounded-2xl bg-[#16a34a]/5 border border-[#16a34a]/10 text-center">
          <p className="text-[10px] font-bold text-[#16a34a] uppercase tracking-widest mb-0.5">Booking ID</p>
          <p className="text-sm font-bold text-primary">{bookingId || "COZYSTAY123456"}</p>
        </div>

        {/* Hotel Summary Card */}
        <div className="mt-8 w-full p-4 rounded-[24px] bg-[#f8fafc] border border-border/50 flex gap-4">
          <img src={hotel.image} alt={hotel.name} className="h-20 w-24 rounded-2xl object-cover shadow-sm" />
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h3 className="font-bold text-sm truncate">{hotel.name}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {hotel.location}
            </p>
            <div className="flex items-center gap-3 mt-2 text-[10px] font-bold text-primary">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> 29 Apr – 30 Apr</span>
              <span className="flex items-center gap-1"><Users className="h-3 w-3" /> 2 Guests</span>
            </div>
          </div>
        </div>

        {/* Payment Details List */}
        <div className="w-full mt-8 space-y-4 px-2">
          <div className="flex justify-between items-center text-sm">
            <p className="text-muted-foreground font-medium">Amount Paid</p>
            <p className="font-bold text-lg">₹{Number(amount || 4290).toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center text-sm">
            <p className="text-muted-foreground font-medium">Paid on</p>
            <p className="font-bold text-primary">{today}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full mt-auto mb-10 space-y-3">
          <Link to="/bookings" className="block w-full h-14 rounded-full bg-primary text-primary-foreground font-bold grid place-items-center shadow-lg shadow-primary/20 transition-transform active:scale-95">
            View Booking
          </Link>
          <Link to="/" className="block w-full h-14 rounded-full bg-white border border-border text-primary font-bold grid place-items-center transition-transform active:scale-95">
            Go to Home
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
