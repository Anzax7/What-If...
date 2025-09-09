import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Keep these imports for sub-components
import { useToast } from "@/components/ui/use-toast";
import { useSimulations } from "@/context/SimulationContext";
import { sanitizeOutput } from "@/lib/utils";
import { SciFiInput } from "@/components/SciFiInput";
import { SciFiCard } from "@/components/SciFiCard"; // Import the new SciFiCard

const Index = () => {
  const [scenario, setScenario] = useState("");
  const [webhookResponseMessage, setWebhookResponseMessage] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const { toast, dismiss } = useToast();
  const navigate = useNavigate();
  const { leaderboard } = useSimulations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWebhookResponseMessage(null);
    if (!scenario.trim()) {
      toast({
        title: "Please enter a scenario",
        description: "Try something like 'What if gravity was half?'",
      });
      return;
    }

    setIsSimulating(true);
    const loadingToast = toast({
      title: "Submitting scenario...",
      description: "Please wait while we process your request.",
      duration: 999999,
    });

    try {
      const webhookUrl = "http://localhost:5678/webhook-test/c0540016-ee92-459e-8737-26d58df96e6e";
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ scenario: scenario }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const webhookResponse = await response.json();
      setWebhookResponseMessage(webhookResponse.output || "No output received from webhook.");

      dismiss(loadingToast.id);
      toast({
        title: "Scenario submitted!",
        description: "Your scenario has been sent to the webhook.",
        variant: "success",
      });

    } catch (error) {
      console.error("Error submitting scenario:", error);
      dismiss(loadingToast.id);
      toast({
        title: "Submission failed",
        description: "There was an error sending your scenario. Please ensure the webhook is running and try again.",
        variant: "destructive",
      });
      setWebhookResponseMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsSimulating(false);
    }
  };

  const handlePopularClick = (popularScenario: string) => {
    setScenario(popularScenario);
    navigate(`/simulation?q=${encodeURIComponent(popularScenario)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950/70 to-black/70 text-foreground relative z-[0]">
      <div className="container mx-auto px-4 py-12 animate-fade-in-up">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-indigo-100 font-orbitron">
            What If Simulator
          </h1>
          <p className="text-xl text-indigo-300">
            Explore alternate realities through semi-scientific simulations
          </p>
        </div>

        <SciFiCard className="max-w-2xl mx-auto"> {/* Use SciFiCard here */}
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Enter your scenario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <SciFiInput
                  type="text"
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  placeholder="What if..."
                  disabled={isSimulating}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full py-6 text-lg bg-purple-800 text-white hover:bg-purple-700"
                disabled={isSimulating}
              >
                {isSimulating ? (
                  <div className="flex items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                    Simulating...
                  </div>
                ) : (
                  "Simulate"
                )}
              </Button>
            </form>
            {webhookResponseMessage && (
              <SciFiCard className="mt-6"> {/* Use SciFiCard here */}
                <CardHeader>
                  <CardTitle>Here is the what if scenario</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg whitespace-pre-wrap">
                    {sanitizeOutput(webhookResponseMessage)}
                  </p>
                </CardContent>
              </SciFiCard>
            )}
          </CardContent>
        </SciFiCard>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-100">
              Popular Simulations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {leaderboard.slice(0, 4).map((item) => (
                <SciFiCard // Use SciFiCard here
                  key={item.scenario}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handlePopularClick(item.scenario)}
                >
                  <CardContent className="p-4">
                    <p className="text-lg">{item.scenario}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.count.toLocaleString()} simulations
                    </p>
                  </CardContent>
                </SciFiCard>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-100">
              Leaderboard
            </h2>
            <SciFiCard> {/* Use SciFiCard here */}
              <CardContent className="p-0">
                <div className="divide-y">
                  {leaderboard.slice(0, 5).map((item, index) => (
                    <div 
                      key={item.scenario} 
                      className="p-4 hover:bg-accent cursor-pointer flex justify-between items-center"
                      onClick={() => handlePopularClick(item.scenario)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                          ${index === 0 ? 'bg-yellow-700 text-yellow-100' : 
                            index === 1 ? 'bg-gray-700 text-gray-100' : 
                            index === 2 ? 'bg-amber-700 text-amber-100' : 'bg-blue-700 text-blue-100'}`}>
                          {index + 1}
                        </div>
                        <p className="font-medium">{item.scenario}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {item.count.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </SciFiCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;