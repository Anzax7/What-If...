import { createContext, useContext, useState, ReactNode } from "react";

interface Simulation {
  id: string;
  scenario: string;
  timestamp: number;
  result: any;
}

interface SimulationContextType {
  simulations: Simulation[];
  leaderboard: { scenario: string; count: number }[];
  addSimulation: (scenario: string, result: any) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [leaderboard, setLeaderboard] = useState([
    { scenario: "What if gravity was half?", count: 1245 },
    { scenario: "What if I invested ₹10,000 in Bitcoin in 2015?", count: 892 },
    { scenario: "What if humans could photosynthesize?", count: 673 },
  ]);

  const addSimulation = (scenario: string, result: any) => {
    const newSimulation = {
      id: Date.now().toString(),
      scenario,
      timestamp: Date.now(),
      result,
    };
    
    setSimulations(prev => [newSimulation, ...prev].slice(0, 50));
    
    setLeaderboard(prev => {
      const existing = prev.find(item => item.scenario === scenario);
      if (existing) {
        return prev.map(item => 
          item.scenario === scenario 
            ? { ...item, count: item.count + 1 } 
            : item
        ).sort((a, b) => b.count - a.count);
      }
      return [...prev, { scenario, count: 1 }]
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    });
  };

  return (
    <SimulationContext.Provider value={{ simulations, leaderboard, addSimulation }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulations = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error("useSimulations must be used within a SimulationProvider");
  }
  return context;
};