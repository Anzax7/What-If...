import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Share2, Bookmark, History, Copy, Twitter, Facebook, Linkedin } from "lucide-react";
import { SimulationChart } from "@/components/SimulationChart";
import { useSimulations } from "@/context/SimulationContext";
import { useToast } from "@/components/ui/use-toast";

// Removed WebhookResponse interface as it's no longer directly used here for state passing

const SimulationResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addSimulation, simulations } = useSimulations();
  const [scenario, setScenario] = useState("");
  const [simulationData, setSimulationData] = useState<any>(null); // Stores the full simulation result (explanation, visualData)
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scenarioParam = params.get('q');
    // Removed state handling for webhookResponse

    if (!scenarioParam) {
      navigate('/');
      return;
    }

    setScenario(scenarioParam);
    simulateScenario(scenarioParam);
  }, [location.search]);

  const simulateScenario = (scenario: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const result = generateSimulationResult(scenario); // Always generate mock data here
      
      addSimulation(scenario, result);
      setSimulationData(result); // Store the result
      setIsLoading(false);
    }, 1000);
  };

  const generateSimulationResult = (scenario: string) => {
    const scenarios = {
      "What if gravity was half?": {
        explanation: `If gravity were half as strong as it is now, many aspects of our world would change dramatically. Objects would weigh half as much, allowing humans to jump higher and lift heavier objects. Buildings could be constructed with less material, but would need different engineering to account for reduced compression. The atmosphere would expand, potentially making high-altitude areas less habitable. Animals and plants would evolve different structures to cope with the reduced force.`,
        visualData: {
          labels: ["Current Gravity", "Half Gravity"],
          values: [9.8, 4.9],
        }
      },
      "What if I invested ₹10,000 in Bitcoin in 2015?": {
        explanation: `If you had invested ₹10,000 in Bitcoin in 2015 when the price was around ₹20,000 per BTC, you would have approximately 0.5 BTC. As of today, that investment would be worth around ₹15,00,000 (assuming ₹30,00,000 per BTC). That's a 15,000% return on investment over 8 years.`,
        visualData: {
          labels: ["2015 Investment", "Current Value"],
          values: [10000, 1500000],
        }
      },
      "What if humans could photosynthesize?": {
        explanation: `If humans could photosynthesize like plants, we would need much less food. Our skin would likely be green due to chlorophyll. We'd need to spend several hours in sunlight each day to meet our energy needs. This could lead to changes in work schedules, architecture (more glass buildings), and even fashion (clothing designed to maximize sunlight exposure). However, we'd still need some nutrients that photosynthesis can't provide.`,
        visualData: {
          labels: ["Current Energy", "Photosynthesis Energy"],
          values: [100, 30],
        }
      }
    };

    return scenarios[scenario as keyof typeof scenarios] || {
      explanation: `Our simulation shows that "${scenario}" would lead to interesting changes. While we don't have specific data for this scenario, our models suggest significant impacts across multiple domains. Further research would be needed for precise predictions.`,
      visualData: {
        labels: ["Current State", "Simulated State"],
        values: [100, Math.floor(Math.random() * 200) + 50],
      }
    };
  };

  const handleShare = () => {
    const url = `${window.location.origin}/simulation?q=${encodeURIComponent(scenario)}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "Share this simulation with others",
    });
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this simulation: "${scenario}"`)}&url=${encodeURIComponent(`${window.location.origin}/simulation?q=${encodeURIComponent(scenario)}`)}`;
    window.open(url, '_blank');
  };

  if (isLoading || !simulationData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950/70 to-black/70 flex items-center justify-center text-foreground relative z-[0]"> {/* Added transparency and z-index */}
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-indigo-100">Simulating...</h2>
          <p className="text-indigo-300">{scenario}</p>
        </div>
      </div>
    );
  }

  const popularity = Math.floor(Math.random() * 5000) + 500;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950/70 to-black/70 text-foreground relative z-[0]"> {/* Added transparency and z-index */}
      <div className="container mx-auto px-4 py-12 animate-fade-in-up"> {/* Applied animation here */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-indigo-100">
              Simulation Result
            </h1>
            <p className="text-2xl text-indigo-300">{scenario}</p>
          </div>

          {/* Removed conditional rendering for webhookMessage here */}

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6">{simulationData.explanation}</p>
              
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6">
                <SimulationChart 
                  data={simulationData.visualData} 
                  scenario={scenario}
                  chartType={chartType}
                  onChartTypeChange={setChartType}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={handleShare}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </Button>
                <Button variant="outline" onClick={shareOnTwitter}>
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </Button>
                <Button variant="outline">
                  <Facebook className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
                <Button variant="outline">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Community</CardTitle>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span>{popularity.toLocaleString()} simulations</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {simulations.slice(0, 3).map((sim) => (
                  <div 
                    key={sim.id} 
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent cursor-pointer"
                    onClick={() => navigate(`/simulation?q=${encodeURIComponent(sim.scenario)}`)}
                  >
                    <History className="text-indigo-400" />
                    <div>
                      <h3 className="font-medium">{sim.scenario}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(sim.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SimulationResult;