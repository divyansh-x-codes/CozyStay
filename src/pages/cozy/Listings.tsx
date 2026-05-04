import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, SlidersHorizontal, Star, ShieldCheck, Compass, Map as MapIcon, List as ListIcon } from "lucide-react";
import AppShell from "@/components/cozy/AppShell";
import { hotels } from "@/data/hotels";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import Room3DViewer from "@/components/cozy/Room3DViewer";

const tags = ["Safe Stays", "Budget", "Luxury", "Family"];

export default function Listings() {
  const { search } = useApp();
  const navigate = useNavigate();
  const [active, setActive] = useState("Safe Stays");
  const [view, setView] = useState<"list" | "map">("list");

  return (
    <AppShell>
      <header className="sticky top-0 z-20 bg-card/95 backdrop-blur px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="h-9 w-9 grid place-items-center rounded-full hover:bg-secondary"><ChevronLeft className="h-5 w-5" /></button>
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-bold text-base truncate">{search.location}</h1>
            <p className="text-[11px] text-muted-foreground truncate">{search.checkIn} – {search.checkOut} · {search.guests} Guest · {search.rooms} Room</p>
          </div>
          <button className="chip bg-secondary text-primary px-3 py-2"><SlidersHorizontal className="h-3.5 w-3.5" /> Filters</button>
        </div>
        <div className="flex items-center justify-between mt-3 text-xs">
          <span className="text-muted-foreground">{hotels.length} properties found</span>
          <button className="text-primary font-medium">Sort by ▾</button>
        </div>
      </header>

      <div className="px-4 mt-3 flex gap-2 overflow-x-auto scrollbar-none pb-1">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`chip border whitespace-nowrap ${active === t ? "bg-accent/15 text-accent border-accent/30" : "bg-card border-border text-muted-foreground"}`}
          >
            {t === "Safe Stays" && <ShieldCheck className="h-3 w-3" />}
            {t}
          </button>
        ))}
      </div>

      {view === "list" ? (
        <div className="px-4 py-4 space-y-4">
          {hotels.map((h) => (
            <div key={h.id} className="block card-soft overflow-hidden relative">
              <div className="relative h-44 bg-secondary">
                {h.has360 ? (
                  <Room3DViewer imageUrl={h.image} sketchfabId={h.sketchfabId} hideButton simple />
                ) : (
                  <img src={h.image} alt={h.name} loading="lazy" className="w-full h-full object-cover" />
                )}
                <span className="absolute top-2.5 left-2.5 chip bg-card/95 text-safety z-10">
                  <ShieldCheck className="h-3 w-3" /> {h.safetyScore}% Safe
                </span>
                <Link to={`/hotel/${h.id}`} className="absolute inset-0 z-[5]" />
              </div>
              <Link to={`/hotel/${h.id}`} className="p-4 block">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold">{h.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{h.location}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs shrink-0">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    <span className="font-semibold">{h.rating}</span>
                    <span className="text-muted-foreground">({h.reviews})</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {h.amenities.slice(0, 3).map((a) => (
                    <span key={a} className="text-[11px] text-muted-foreground">· {a}</span>
                  ))}
                </div>
                <div className="flex items-end justify-between mt-3">
                  <div>
                    <p className="font-bold">₹{h.price.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">/ night</span></p>
                    <p className="text-[11px] text-muted-foreground">Includes all taxes</p>
                  </div>
                  <span className="chip bg-safety/10 text-safety">Lowest price</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative flex-1 bg-secondary overflow-hidden">
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-[#e5e3df] opacity-50 bg-[radial-gradient(#999_1px,transparent_1px)] [background-size:20px_20px]" />
          
          {/* Mock Map Markers */}
          {hotels.map((h, i) => (
            <div 
              key={h.id} 
              className="absolute animate-in fade-in zoom-in duration-500"
              style={{ 
                top: `${20 + i * 15}%`, 
                left: `${15 + i * 20}%` 
              }}
            >
              <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-[10px] font-bold shadow-lg border-2 border-white relative whitespace-nowrap">
                ₹{h.price.toLocaleString()}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45 border-r border-b border-white" />
              </div>
            </div>
          ))}

          {/* Map Info Card (Small floating card at bottom) */}
          <div className="absolute bottom-6 inset-x-4">
            <div className="card-soft p-3 flex gap-3 bg-card/90 backdrop-blur">
              <img src={hotels[0].image} className="h-16 w-16 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold truncate">{hotels[0].name}</h4>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{hotels[0].location}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-xs text-primary">₹{hotels[0].price.toLocaleString()}</span>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Star className="h-2.5 w-2.5 fill-accent text-accent" /> {hotels[0].rating}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Toggle FAB */}
      <button 
        onClick={() => setView(view === "list" ? "map" : "list")}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 h-11 px-5 rounded-full bg-primary text-primary-foreground font-semibold shadow-xl flex items-center gap-2 z-40 animate-in slide-in-from-bottom-4 duration-500"
      >
        {view === "list" ? <MapIcon className="h-4 w-4" /> : <ListIcon className="h-4 w-4" />}
        {view === "list" ? "Map View" : "List View"}
      </button>
    </AppShell>
  );
}
