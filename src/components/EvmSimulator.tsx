import { useState, useRef, useEffect } from "react";
import { Flower2, Hand, Sunrise, Bike, Fan, Flag, Ban } from "lucide-react";

type Candidate = {
  id: number;
  name: string;
  party: string;
  icon: React.ElementType;
};

const candidates: Candidate[] = [
  { id: 1, name: "BJP Candidate", party: "BJP", icon: Flower2 },
  { id: 2, name: "Congress Candidate", party: "Congress", icon: Hand },
  { id: 3, name: "DMK Candidate", party: "DMK", icon: Sunrise },
  { id: 4, name: "TDP Candidate", party: "TDP", icon: Bike },
  { id: 5, name: "YSRCP Candidate", party: "YSRCP", icon: Fan },
  { id: 6, name: "TVK Candidate", party: "TVK", icon: Flag },
  { id: 7, name: "NOTA", party: "None of the Above", icon: Ban },
];

export const EvmSimulator = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [showSlip, setShowSlip] = useState(false);
  const [slipDropped, setSlipDropped] = useState(false);

  // Web Audio API for authentic EVM Beep sound
  const playBeep = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // Beep frequency
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    
    // Stop after 3 seconds (EVM beep duration)
    setTimeout(() => {
      oscillator.stop();
      audioCtx.close();
    }, 3000);
  };

  const handleVote = (candidate: Candidate) => {
    if (isVoting) return; // Prevent multiple votes at once
    
    setIsVoting(true);
    setSelectedCandidate(candidate);
    setShowSlip(false);
    setSlipDropped(false);

    // 1. Play sound and light up the red LED
    playBeep();

    // 2. Show VVPAT slip
    setTimeout(() => {
      setShowSlip(true);
    }, 500);

    // 3. Drop slip after 7 seconds
    setTimeout(() => {
      setSlipDropped(true);
      
      // Reset state after slip drops
      setTimeout(() => {
        setIsVoting(false);
        setSelectedCandidate(null);
        setShowSlip(false);
        setSlipDropped(false);
      }, 1000);
    }, 7500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100 my-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Interactive EVM Simulator</h2>
        <p className="text-gray-600">Experience how to vote using an Electronic Voting Machine and VVPAT. Try casting a mock vote!</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-center md:items-start">
        
        {/* BALLOT UNIT */}
        <div className="w-full md:w-1/2 bg-[#e0e0e0] p-4 rounded-lg border-4 border-gray-400 shadow-xl relative">
          <div className="absolute top-2 right-4 text-xs font-bold text-gray-500">BALLOT UNIT</div>
          <div className="mt-6 space-y-2">
            {candidates.map((c) => (
              <div key={c.id} className="flex items-center bg-white p-2 border border-gray-300 rounded shadow-sm">
                <div className="w-8 font-bold text-gray-500 text-center">{c.id}</div>
                <div className="flex-1 font-bold text-gray-800">{c.name}</div>
                <div className="w-12 flex justify-center items-center text-blue-600">
                  <c.icon size={24} />
                </div>
                
                {/* Red LED */}
                <div className="w-8 flex justify-center">
                  <div className={`w-3 h-3 rounded-full border border-gray-400 transition-colors duration-200 ${
                    selectedCandidate?.id === c.id && isVoting && !slipDropped
                      ? "bg-red-600 shadow-[0_0_10px_red]" 
                      : "bg-red-900/20"
                  }`} />
                </div>

                {/* Blue Button */}
                <div className="w-16 flex justify-center">
                  <button
                    onClick={() => handleVote(c)}
                    disabled={isVoting}
                    className={`w-10 h-6 rounded-full shadow-md transition-all ${
                      isVoting ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-95"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between px-2 text-xs font-bold text-gray-600 uppercase">
            <span>Ready</span>
            <div className={`w-3 h-3 rounded-full border border-gray-400 ${!isVoting ? "bg-green-500 shadow-[0_0_8px_green]" : "bg-green-900/20"}`} />
          </div>
        </div>

        {/* VVPAT UNIT */}
        <div className="w-full md:w-1/3 bg-[#333333] p-4 rounded-lg border-4 border-gray-500 shadow-xl flex flex-col items-center">
          <div className="text-white text-xs font-bold w-full text-left mb-2">VVPAT</div>
          
          {/* Transparent Glass Window */}
          <div className="w-full h-48 bg-[#111111] rounded border-8 border-gray-400 relative overflow-hidden flex flex-col justify-start items-center">
            
            {/* Glass reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 z-10 pointer-events-none" />

            {/* Paper Slip */}
            <div 
              className={`w-28 bg-[#fdfdfd] shadow-lg flex flex-col items-center justify-center py-4 px-2 border-x border-b border-gray-300 absolute top-0 transition-transform duration-700 ease-in-out ${
                showSlip ? (slipDropped ? "translate-y-48 opacity-0" : "translate-y-4") : "-translate-y-full"
              }`}
            >
              {selectedCandidate && (
                <>
                  <div className="text-xs text-gray-500 mb-1">Sl No. {selectedCandidate.id}</div>
                  <div className="font-bold text-sm text-center mb-2">{selectedCandidate.name}</div>
                  <selectedCandidate.icon size={32} className="text-black" />
                </>
              )}
            </div>
            
            {/* Dark bottom area where slip drops */}
            <div className="absolute bottom-0 w-full h-6 bg-gradient-to-t from-black to-transparent z-20" />
          </div>

          <div className="text-gray-400 text-xs mt-4 text-center">
            {isVoting ? (
              <span className="text-green-400 animate-pulse">Printing Audit Trail...</span>
            ) : (
              "Paper slip will be visible for 7 seconds"
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
