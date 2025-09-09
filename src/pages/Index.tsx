import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const [scenario, setScenario] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scenario.trim()) {
      toast({
        title: "Please enter a scenario",
        description: "Try something like 'What if gravity was half?'",
      });
      return;
    }
    navigate(`/simulation?q=${encodeURIComponent(scenario)}`);
  };

  const handlePopularClick = (popularScenario: string) => {
    setScenario(popularScenario);
    navigate(`/simulation?q=${encodeURIComponent(popularScenario)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-indigo-900">
            What If Simulator
          </h1>
          <p className="text-xl text-indigo-700">
            Explore alternate realities through semi-scientific simulations
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Enter your scenario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  placeholder="What if gravity was half?"
                  className="text-lg py-6 px-4"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  What if...
                </span>
              </div>
              <Button type="submit" className="w-full py-6 text-lg">
                Simulate
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-900">
            Popular Simulations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "What if gravity was half?",
              "What if I invested ₹10,000 in Bitcoin in 2015?",
              "What if humans could photosynthesize?",
            ].map((item) => (
              <Card
                key={item}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handlePopularClick(item)}
              >
                <CardContent className="p-4">
                  <p className="text-lg">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;