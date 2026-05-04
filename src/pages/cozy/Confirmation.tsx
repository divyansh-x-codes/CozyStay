import { Link, useParams, useSearchParams } from "react-router-dom";
import { Check, Calendar, Users, MapPin, ChevronLeft, MoreVertical, X, ShieldCheck, Smartphone, Lock, ArrowRight } from "lucide-react";
import AppShell from "@/components/cozy/AppShell";
import { getHotel } from "@/data/hotels";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Confirmation() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const hotel = getHotel(id || "");
  const bookingId = searchParams.get("bookingId");
  const amount = searchParams.get("amount");
  
  const [manageOpen, setManageOpen] = useState(false);
  const [cancelStep, setCancelStep] = useState<"idle" | "confirm" | "otp" | "success">("idle");
  const [otp, setOtp] = useState("");

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

  const handleRefund = () => {
    setCancelStep("otp");
  };

  const verifyOtp = () => {
    setCancelStep("success");
  };

  return (
    <AppShell hideNav>
      <div className="min-h-screen bg-white flex flex-col items-center pt-8 px-6 pb-24 overflow-y-auto">
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-8">
          <Link to="/" className="h-10 w-10 grid place-items-center rounded-full bg-secondary/50">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <button className="h-10 w-10 grid place-items-center rounded-full bg-secondary/50">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>

        {/* Success Icon Animation */}
        <div className="relative mb-6">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="h-16 w-16 rounded-full bg-[#16a34a] grid place-items-center relative z-10"
          >
            <Check className="h-8 w-8 text-white" strokeWidth={4} />
          </motion.div>
        </div>

        <h1 className="text-2xl font-bold font-display text-center">Payment Successful!</h1>
        <p className="text-sm text-muted-foreground text-center mt-1">Your booking is confirmed.</p>

        {/* Info Card */}
        <div className="mt-8 w-full bg-white rounded-[32px] border border-border shadow-soft overflow-hidden">
          <div className="relative h-48 w-full">
            <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full flex items-center gap-1.5 shadow-sm">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-green-600 uppercase">Confirmed</span>
            </div>
            <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur rounded-full">
              <span className="text-[9px] font-bold text-white/90 uppercase tracking-wider">ID: {bookingId}</span>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold font-display">{hotel.name}</h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3" /> {hotel.location}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Check-in</p>
                <p className="text-sm font-bold">29 Apr, 2025 (Tue)</p>
                <p className="text-[11px] text-muted-foreground">2:00 PM onwards</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Check-out</p>
                <p className="text-sm font-bold">30 Apr, 2025 (Wed)</p>
                <p className="text-[11px] text-muted-foreground">Before 11:00 AM</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-secondary grid place-items-center text-muted-foreground">
                    <Users className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">Guests</span>
                </div>
                <span className="text-sm font-bold">2 Adults · 1 Room</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-secondary grid place-items-center text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">Room Type</span>
                </div>
                <span className="text-sm font-bold text-right">Deluxe Room with Sea View</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border/30">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-secondary grid place-items-center text-muted-foreground">
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">Amount Paid</span>
                </div>
                <span className="text-lg font-bold">₹{Number(amount || 4805).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Manage Button */}
        <div className="w-full mt-8">
          <button 
            onClick={() => setManageOpen(true)}
            className="w-full h-16 rounded-full bg-[#0f172a] text-white font-bold text-lg shadow-xl shadow-black/10 active:scale-[0.98] transition-transform"
          >
            Manage Booking
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="w-full mt-4 flex gap-3">
          <Link to="/" className="flex-1 h-12 rounded-full border border-border flex items-center justify-center font-bold text-sm bg-white">
            Home
          </Link>
          <button className="flex-1 h-12 rounded-full border border-border flex items-center justify-center font-bold text-sm bg-white">
            Help Center
          </button>
        </div>

        {/* Manage Modal */}
        <AnimatePresence>
          {manageOpen && (
            <div className="fixed inset-0 z-50 flex items-end justify-center">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => { setManageOpen(false); setCancelStep("idle"); }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-[480px] bg-card rounded-t-[40px] shadow-2xl p-8 overflow-hidden"
              >
                <div className="w-12 h-1.5 bg-muted/40 rounded-full mx-auto mb-8" />
                
                {cancelStep === "idle" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold font-display">Manage Booking</h2>
                    <div className="space-y-3">
                      <button className="w-full p-5 rounded-2xl bg-secondary flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-white grid place-items-center text-primary">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-sm">Reschedule Booking</p>
                            <p className="text-[10px] text-muted-foreground">Change your check-in/out dates</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-active:translate-x-1 transition-transform" />
                      </button>
                      
                      <button 
                        onClick={() => setCancelStep("confirm")}
                        className="w-full p-5 rounded-2xl bg-danger/5 border border-danger/10 flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-white grid place-items-center text-danger">
                            <X className="h-5 w-5" />
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-sm text-danger">Cancel Booking</p>
                            <p className="text-[10px] text-danger/60">Full refund available before 28 Apr</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-danger/40 group-active:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}

                {cancelStep === "confirm" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <button onClick={() => setCancelStep("idle")} className="h-10 w-10 rounded-full bg-secondary grid place-items-center">
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <h2 className="text-2xl font-bold font-display">Cancel Booking</h2>
                    </div>
                    
                    <div className="p-6 rounded-3xl bg-secondary/50 space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Refundable Amount</span>
                        <span className="font-bold">₹{Number(amount || 4805).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Cancellation Fee</span>
                        <span className="text-green-600 font-bold">₹0</span>
                      </div>
                      <div className="pt-4 border-t border-border flex justify-between items-center">
                        <span className="font-bold text-lg">Total Refund</span>
                        <span className="font-bold text-2xl text-green-600">₹{Number(amount || 4805).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-accent/10 rounded-2xl border border-accent/20 flex items-start gap-3">
                      <ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <p className="text-xs text-accent font-medium leading-relaxed">Refund will be processed instantly to your original payment method (UPI).</p>
                    </div>

                    <button 
                      onClick={handleRefund}
                      className="w-full h-14 rounded-full bg-[#ef4444] text-white font-bold text-lg shadow-xl shadow-danger/20"
                    >
                      Refund Proceed
                    </button>
                  </div>
                )}

                {cancelStep === "otp" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <button onClick={() => setCancelStep("confirm")} className="h-10 w-10 rounded-full bg-secondary grid place-items-center">
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <h2 className="text-2xl font-bold font-display">Verify OTP</h2>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">We've sent a 4-digit code to your registered mobile number ending in <span className="text-primary font-bold">**210</span>.</p>

                    <div className="flex gap-4 justify-center py-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-14 w-14 rounded-2xl bg-secondary border border-border flex items-center justify-center font-bold text-xl">
                          {otp[i-1] || ""}
                          {otp.length === i-1 && <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="h-6 w-0.5 bg-primary" />}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "delete"].map((key, i) => (
                        <button 
                          key={i}
                          onClick={() => {
                            if (key === "delete") setOtp(otp.slice(0, -1));
                            else if (typeof key === "number" && otp.length < 4) setOtp(otp + key);
                          }}
                          className={`h-14 rounded-2xl font-bold text-lg flex items-center justify-center ${key === "" ? "bg-transparent pointer-events-none" : "bg-secondary active:bg-secondary/70 transition-colors"}`}
                        >
                          {key === "delete" ? <X className="h-5 w-5" /> : key}
                        </button>
                      ))}
                    </div>

                    <button 
                      disabled={otp.length < 4}
                      onClick={verifyOtp}
                      className="w-full h-14 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-xl disabled:opacity-40"
                    >
                      Verify & Refund
                    </button>
                  </div>
                )}

                {cancelStep === "success" && (
                  <div className="py-8 text-center space-y-6">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-24 w-24 rounded-full bg-green-500 mx-auto grid place-items-center text-white shadow-xl shadow-green-500/20"
                    >
                      <Check className="h-12 w-12" strokeWidth={4} />
                    </motion.div>
                    
                    <div>
                      <h2 className="text-2xl font-bold font-display">Refund Processed!</h2>
                      <p className="text-sm text-muted-foreground mt-2 px-8">
                        The amount of <span className="text-primary font-bold">₹{Number(amount || 4805).toLocaleString()}</span> has been credited back to your bank account.
                      </p>
                    </div>

                    <div className="p-4 bg-secondary/50 rounded-2xl border border-border inline-flex items-center gap-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Reference: RFN9012384</span>
                    </div>

                    <button 
                      onClick={() => { setManageOpen(false); setCancelStep("idle"); }}
                      className="w-full h-14 rounded-full bg-primary text-primary-foreground font-bold text-lg"
                    >
                      Done
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}

function ChevronRight(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>; }
