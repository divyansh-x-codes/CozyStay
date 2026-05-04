import AppShell from "@/components/cozy/AppShell";
import { useApp } from "@/context/AppContext";
import { Link } from "react-router-dom";
import { CalendarDays, ChevronRight, MapPin } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Bookings() {
  const { bookings } = useApp();
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Past" | "Cancelled">("Upcoming");

  const filteredBookings = bookings.filter(b => b.status === activeTab);

  return (
    <AppShell>
      <header className="px-5 pt-8 pb-4">
        <h1 className="font-display font-bold text-2xl">My Bookings</h1>
        
        {/* Tabs */}
        <div className="flex gap-6 mt-6 border-b border-border">
          {(["Upcoming", "Past", "Cancelled"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-bold transition-all relative ${activeTab === tab ? "text-primary" : "text-muted-foreground"}`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 inset-x-0 h-0.5 bg-accent" />
              )}
            </button>
          ))}
        </div>
      </header>

      <div className="px-5 mt-2 space-y-4 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {filteredBookings.length === 0 ? (
              <div className="py-12 text-center">
                <div className="h-16 w-16 mx-auto rounded-full bg-secondary grid place-items-center mb-4">
                  <CalendarDays className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="font-bold text-lg">No {activeTab.toLowerCase()} bookings</p>
                <p className="text-sm text-muted-foreground mt-1 px-8">When you book a stay, it will appear here.</p>
                {activeTab === "Upcoming" && (
                  <Link to="/listings" className="inline-block mt-6 px-8 h-12 leading-[3rem] rounded-full bg-primary text-white font-bold shadow-lg shadow-primary/20">Find a stay</Link>
                )}
              </div>
            ) : (
              filteredBookings.map((b) => (
                <Link to={`/bookings/${b.id}`} key={b.id} className="block bg-white rounded-[24px] p-4 border border-border/50 shadow-sm active:scale-[0.98] transition-all">
                  <div className="flex gap-4">
                    <img src={b.hotelImage} alt={b.hotelName} className="h-20 w-24 rounded-2xl object-cover shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-[15px] truncate">{b.hotelName}</h3>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" /> {b.checkIn} – {b.checkOut}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{b.guests} Guests · {b.rooms} Room</p>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex gap-2">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${b.status === "Upcoming" ? "bg-[#16a34a]/10 text-[#16a34a]" : b.status === "Cancelled" ? "bg-danger/10 text-danger" : "bg-muted text-muted-foreground"}`}>
                            {b.status === "Upcoming" ? "Confirmed" : b.status}
                          </span>
                        </div>
                        <p className="text-sm font-bold">₹{b.total.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-dashed border-border flex justify-between items-center text-[10px] text-muted-foreground">
                    <span className="font-medium tracking-wider">Booking ID: {b.id}</span>
                  </div>
                </Link>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
