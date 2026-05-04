import { createContext, useContext, useState, ReactNode } from "react";

export type User = { name: string; email: string; phone: string; verified: boolean } | null;
export type Booking = {
  id: string;
  hotelId: string;
  hotelName: string;
  hotelImage: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  total: number;
  status: "Upcoming" | "Completed" | "Cancelled";
};

export type Notification = { id: string; title: string; desc: string; time: string; unread: boolean; type?: "booking" | "safety" | "promo" };

type Ctx = {
  user: User;
  login: (u: NonNullable<User>) => void;
  logout: () => void;
  favourites: string[];
  toggleFavourite: (id: string) => void;
  bookings: Booking[];
  addBooking: (b: Booking) => void;
  notifications: Notification[];
  markAllRead: () => void;
  search: { location: string; checkIn: string; checkOut: string; guests: number; rooms: number };
  setSearch: (s: Ctx["search"]) => void;
  sosOpen: boolean;
  openSOS: () => void;
  closeSOS: () => void;
};

const AppCtx = createContext<Ctx | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({ name: "Aarav Sharma", email: "aarav@gmail.com", phone: "+91 98765 43210", verified: true });
  const [favourites, setFavourites] = useState<string[]>(["sea-breeze"]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "n1", title: "Welcome to CozyStay", desc: "Enjoy your safe and comfortable travel experience.", time: "Just now", unread: true },
    { id: "n2", title: "New Safety Badge", desc: "CozyStay just launched 'Safe-Stay Verified'.", time: "5h ago", unread: false },
  ]);
  const [search, setSearch] = useState({ location: "Goa, India", checkIn: "29 Apr 2026", checkOut: "30 Apr 2026", guests: 2, rooms: 1 });
  const [sosOpen, setSosOpen] = useState(false);

  return (
    <AppCtx.Provider value={{
      user,
      login: (u) => setUser(u),
      logout: () => setUser(null),
      favourites,
      toggleFavourite: (id) => setFavourites((f) => f.includes(id) ? f.filter(x => x !== id) : [...f, id]),
      bookings,
      addBooking: (b) => {
        setBookings((bs) => [b, ...bs]);
        setNotifications((ns) => [
          { id: Date.now().toString(), title: "Booking Confirmed", desc: `Your stay at ${b.hotelName} is confirmed.`, time: "Just now", unread: true, type: "booking" },
          ...ns
        ]);
      },
      notifications,
      markAllRead: () => setNotifications((ns) => ns.map(n => ({ ...n, unread: false }))),
      search,
      setSearch,
      sosOpen,
      openSOS: () => setSosOpen(true),
      closeSOS: () => setSosOpen(false),
    }}>
      {children}
    </AppCtx.Provider>
  );
};

export const useApp = () => {
  const c = useContext(AppCtx);
  if (!c) throw new Error("useApp must be used inside AppProvider");
  return c;
};
