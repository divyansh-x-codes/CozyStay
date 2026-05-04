import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Share2, MapPin, CalendarDays, Users, Home, Info, Coffee, ShieldCheck, Clock9 } from "lucide-react";
import AppShell from "@/components/cozy/AppShell";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookings } = useApp();
  const booking = bookings.find(b => b.id === id);

  if (!booking) {
    return (
      <AppShell hideNav>
        <div className="p-8 text-center">Booking not found</div>
      </AppShell>
    );
  }

  return (
    <AppShell hideNav>
      <div className="min-h-screen bg-[#f8fafc] pb-24">
        {/* Header Image Section */}
        <div className="relative h-[280px]">
          <img src={booking.hotelImage} alt={booking.hotelName} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
            <button onClick={() => navigate(-1)} className="h-10 w-10 grid place-items-center rounded-full bg-white/90 backdrop-blur">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="h-10 w-10 grid place-items-center rounded-full bg-white/90 backdrop-blur">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="px-5 -mt-8 relative z-10">
          <div className="bg-white rounded-[32px] p-6 shadow-xl shadow-black/5 border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className="px-3 py-1 rounded-full bg-[#16a34a]/10 text-[#16a34a] text-[10px] font-bold border border-[#16a34a]/20 flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" /> Confirmed
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Booking ID: <span className="text-foreground">{booking.id}</span>
              </p>
            </div>

            <h1 className="text-2xl font-bold font-display">{booking.hotelName}</h1>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {booking.hotelId === "1" ? "Calangute, Goa" : "Candolim, Goa"}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 py-6 border-y border-border/50">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Check-in</p>
                <p className="text-sm font-bold">29 Apr, 2025 (Tue) 2:00 PM</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Check-out</p>
                <p className="text-sm font-bold">30 Apr, 2025 (Wed) 11:00 AM</p>
              </div>
            </div>

            <div className="py-6 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-secondary grid place-items-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground font-medium">Guests</span>
                </div>
                <span className="font-bold">2 Adults · 1 Room</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-secondary grid place-items-center">
                    <Home className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground font-medium">Room Type</span>
                </div>
                <span className="font-bold">Deluxe Room with Sea View</span>
              </div>
              <div className="flex items-center justify-between text-sm pt-2 border-t border-border/30">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-secondary grid place-items-center">
                    <Info className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground font-medium">Amount Paid</span>
                </div>
                <span className="font-bold text-lg">₹{booking.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-6">
            <h3 className="text-sm font-bold px-1">Your Benefits</h3>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-border/50 flex flex-col items-center gap-2 text-center shadow-sm">
                <div className="h-10 w-10 rounded-full bg-primary/5 grid place-items-center">
                  <Coffee className="h-5 w-5 text-primary" />
                </div>
                <span className="text-[10px] font-bold leading-tight">Free Breakfast</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-border/50 flex flex-col items-center gap-2 text-center shadow-sm">
                <div className="h-10 w-10 rounded-full bg-safety/5 grid place-items-center">
                  <ShieldCheck className="h-5 w-5 text-safety" />
                </div>
                <span className="text-[10px] font-bold leading-tight">Free Cancellation till 28 Apr, 2 PM</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-border/50 flex flex-col items-center gap-2 text-center shadow-sm">
                <div className="h-10 w-10 rounded-full bg-accent/5 grid place-items-center">
                  <Clock9 className="h-5 w-5 text-accent" />
                </div>
                <span className="text-[10px] font-bold leading-tight">24x7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="fixed bottom-0 inset-x-0 p-4 bg-white/80 backdrop-blur-md border-t border-border">
          <div className="max-w-[480px] mx-auto flex gap-3">
            <button className="flex-1 h-14 rounded-full bg-primary text-white font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
              Manage Booking
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
