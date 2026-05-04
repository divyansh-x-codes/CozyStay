import { NavLink } from "react-router-dom";
import { Home, CalendarDays, Heart, User } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/bookings", label: "Bookings", icon: CalendarDays },
  { to: "/favourites", label: "Favourites", icon: Heart },
  { to: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  return (
    <nav className="sticky bottom-0 z-30 bg-card/95 backdrop-blur border-t border-border pb-safe">
      <ul className="grid grid-cols-4 px-2 py-1.5">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-1 text-[10px] font-bold transition-all duration-300 ${
                  isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-primary/70"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                    {isActive && (
                      <motion.div 
                        layoutId="nav-glow"
                        className="absolute -inset-2 bg-primary/10 rounded-full -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </div>
                  <span className="tracking-tight">{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
