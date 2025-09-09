import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Share2, Bookmark, History } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { SimulationChart } from "@/components/SimulationChart";

const SimulationResult = () => {
  const scenario = "What if gravity was half?";
  const result = {
    explanation: `If gravity were half as strong as it is now, many aspects of our world would change dramatically. Objects would weigh half as much, allowing humans to jump higher and lift heavier objects. Buildings could be constructed with less material, but would need different engineering to account for reduced compression. The atmosphere would expand, potentially making high-altitude areas less habitable. Animals and plants would evolve different structures to cope with the reduced force.`,
    visualData: {
      labels: ["Current Gravity", "Half Gravity"],
      values: [9.8, 4.9],
    },
    popularity: 1245,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-indigo-900">
              Simulation Result
            </h1>
            <p className="text-2xl text-indigo-700">{scenario}</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6">{result.explanation}</p>
              
              <div className="bg-white p-4 rounded-lg border mb-6">
                <SimulationChart 
                  data={result.visualData} 
                  scenario={scenario} 
                />
              </div>

              <div className="flex gap-4">
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Save
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
                  <span>{result.popularity.toLocaleString()} simulations</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <History className="text-indigo-500" />
                  <div>
                    <h3 className="font-medium">Your Simulation History</h3>
                    <p className="text-sm text-gray-500">
                      View your past what-if scenarios
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default SimulationResult;