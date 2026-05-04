import { Link, useNavigate } from "react-router-dom";
import { Bell, Menu, MapPin, Calendar, Users, Search, ShieldCheck, Compass, Siren, BadgeCheck, ChevronRight, ShieldHalf, X, Plus, Minus } from "lucide-react";
import AppShell from "@/components/cozy/AppShell";
import Logo from "@/components/cozy/Logo";
import HotelCard from "@/components/cozy/HotelCard";
import { hotels } from "@/data/hotels";
import { useApp } from "@/context/AppContext";
import heroBg from "@/assets/hero-bg.png";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  { icon: ShieldCheck, label: "Verified Stays", color: "bg-safety/10 text-safety" },
  { icon: Compass, label: "360° View", color: "bg-primary/10 text-primary" },
  { icon: Siren, label: "One-tap SOS", color: "bg-danger/10 text-danger" },
  { icon: BadgeCheck, label: "ID Verified", color: "bg-accent/15 text-accent" },
];

const locations = ["Mumbai, Maharashtra", "Delhi, NCR", "Jaipur, Rajasthan", "Goa, India", "Munnar, Kerala", "Udaipur, Rajasthan", "Rishikesh, Uttarakhand", "Bangalore, Karnataka"];

export default function Home() {
  const { search, setSearch } = useApp();
  const navigate = useNavigate();
  const [picker, setPicker] = useState<"location" | "date" | "guests" | null>(null);

  const updateSearch = (updates: Partial<typeof search>) => {
    setSearch({ ...search, ...updates });
  };

  return (
    <AppShell showSOS>
      {/* Hero */}
      <section className="relative text-primary-foreground h-[290px] overflow-hidden">
        <img src={heroBg} alt="Cozy hotel room at dusk" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 h-full bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        <div className="relative px-5 pt-3">
          <div className="flex items-center justify-between">
            <button className="h-8 w-8 grid place-items-center rounded-full bg-white/10 backdrop-blur"><Menu className="h-4 w-4" /></button>
            <Logo light />
            <button className="h-8 w-8 grid place-items-center rounded-full bg-white/10 backdrop-blur relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
            </button>
          </div>
          <div className="mt-5">
            <h1 className="font-display font-bold text-2xl leading-[1.1]">
              Feel safe. Stay <span className="text-accent">cozy.</span>
            </h1>
            <p className="mt-0.5 text-xs text-white/80 max-w-[200px]">
              Verified stays. Total peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Content Sheet */}
      <div className="relative -mt-20 bg-card rounded-t-[28px] pt-5 pb-8 z-10 shadow-2xl">
        <div className="px-5">
          {/* Search card */}
          <div className="card-soft p-3 space-y-2 text-foreground shadow-xl relative -mt-14 bg-card border border-border/10">
            <SearchRow 
              icon={MapPin} 
              label="Where are you going?" 
              value={search.location} 
              onClick={() => setPicker("location")}
            />
            <div className="border-t border-border/40" />
            <div className="grid grid-cols-2 gap-2">
              <SearchRow 
                icon={Calendar} 
                label="Check-in" 
                value={search.checkIn} 
                compact 
                onClick={() => setPicker("date")}
              />
              <SearchRow 
                label="Check-out" 
                value={search.checkOut} 
                compact 
                onClick={() => setPicker("date")}
              />
            </div>
            <div className="border-t border-border/40" />
            <SearchRow 
              icon={Users} 
              label="Guests & Rooms" 
              value={`${search.guests} G · ${search.rooms} R`} 
              onClick={() => setPicker("guests")}
            />
            <button
              onClick={() => navigate("/listings")}
              className="w-full h-10 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 mt-0.5 hover:opacity-95 transition-opacity"
            >
              <Search className="h-3.5 w-3.5" /> Search Stays
            </button>
          </div>

          {/* Features */}
          <section className="mt-5">
            <ul className="grid grid-cols-4 gap-2">
              {features.map((f) => (
                <li key={f.label} className="flex flex-col items-center text-center gap-1.5">
                  <div className={`h-12 w-12 rounded-2xl grid place-items-center ${f.color} shadow-sm`}>
                    <f.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <span className="text-[9px] font-extrabold leading-tight tracking-normal uppercase opacity-90">{f.label}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Popular */}
          <section className="mt-7">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display font-bold text-base">Popular Stays</h2>
              <Link to="/listings" className="text-[11px] text-accent font-bold flex items-center gap-0.5">
                View all <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="flex gap-2.5 overflow-x-auto -mx-5 px-5 pb-1.5 scrollbar-none">
              {hotels.map((h) => <HotelCard key={h.id} hotel={h} compact />)}
            </div>
          </section>

          {/* Why CozyStay */}
          <section className="mt-5">
            <div className="card-soft bg-accent/5 p-3 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary grid place-items-center text-accent shrink-0">
                <ShieldHalf className="h-4.5 w-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-xs">Why CozyStay?</h3>
                <p className="text-[10px] text-muted-foreground truncate">Verified stays for your safety.</p>
              </div>
              <button className="h-7 w-7 rounded-full bg-card grid place-items-center shadow-soft">
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {picker && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPicker(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[480px] bg-card rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-xl uppercase tracking-wider">
                  {picker === "location" ? "Select Location" : picker === "date" ? "Select Dates" : "Guests & Rooms"}
                </h2>
                <button onClick={() => setPicker(null)} className="h-10 w-10 rounded-full bg-secondary grid place-items-center hover:bg-secondary/80">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {picker === "location" && (
                <div className="space-y-2">
                  {locations.map((loc) => (
                    <button 
                      key={loc}
                      onClick={() => { updateSearch({ location: loc }); setPicker(null); }}
                      className={`w-full p-4 rounded-2xl text-left transition-all flex items-center justify-between ${search.location === loc ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80"}`}
                    >
                      <span className="font-medium">{loc}</span>
                      {search.location === loc && <ShieldCheck className="h-5 w-5" />}
                    </button>
                  ))}
                </div>
              )}

              {picker === "date" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Check-in</label>
                      <input 
                        type="text" 
                        value={search.checkIn} 
                        onChange={(e) => updateSearch({ checkIn: e.target.value })}
                        className="w-full p-4 rounded-2xl bg-secondary font-medium focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Check-out</label>
                      <input 
                        type="text" 
                        value={search.checkOut} 
                        onChange={(e) => updateSearch({ checkOut: e.target.value })}
                        className="w-full p-4 rounded-2xl bg-secondary font-medium focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                  </div>
                  <button onClick={() => setPicker(null)} className="w-full h-14 rounded-full bg-primary text-primary-foreground font-bold shadow-soft">
                    Apply Dates
                  </button>
                </div>
              )}

              {picker === "guests" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary">
                    <div>
                      <p className="font-bold">Guests</p>
                      <p className="text-xs text-muted-foreground">Number of travelers</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => updateSearch({ guests: Math.max(1, search.guests - 1) })}
                        className="h-10 w-10 rounded-full bg-card grid place-items-center shadow-soft disabled:opacity-50"
                        disabled={search.guests <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-bold text-lg min-w-[20px] text-center">{search.guests}</span>
                      <button 
                        onClick={() => updateSearch({ guests: Math.min(10, search.guests + 1) })}
                        className="h-10 w-10 rounded-full bg-card grid place-items-center shadow-soft"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary">
                    <div>
                      <p className="font-bold">Rooms</p>
                      <p className="text-xs text-muted-foreground">Number of units</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => updateSearch({ rooms: Math.max(1, search.rooms - 1) })}
                        className="h-10 w-10 rounded-full bg-card grid place-items-center shadow-soft disabled:opacity-50"
                        disabled={search.rooms <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-bold text-lg min-w-[20px] text-center">{search.rooms}</span>
                      <button 
                        onClick={() => updateSearch({ rooms: Math.min(5, search.rooms + 1) })}
                        className="h-10 w-10 rounded-full bg-card grid place-items-center shadow-soft"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => setPicker(null)} className="w-full h-14 rounded-full bg-primary text-primary-foreground font-bold shadow-soft">
                    Confirm Selection
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}

function SearchRow({ icon: Icon, label, value, compact = false, onClick }: { icon?: any; label: string; value: string; compact?: boolean; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-3 w-full text-left active:scale-[0.98] transition-transform"
    >
      {Icon && <div className="h-10 w-10 rounded-full bg-primary grid place-items-center text-primary-foreground shrink-0 shadow-sm"><Icon className="h-5 w-5" strokeWidth={2.5} /></div>}
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-muted-foreground font-medium">{label}</div>
        <div className={`font-bold ${compact ? "text-sm" : "text-[15px]"} truncate`}>{value}</div>
      </div>
      {!compact && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
    </button>
  );
}
