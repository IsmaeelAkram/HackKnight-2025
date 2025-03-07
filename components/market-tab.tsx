import { BarChart, LineChart } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MarketTabProps {
  startupIdea: string
}

export function MarketTab({ startupIdea }: MarketTabProps) {
  return (
    <div className="h-full p-4">
      <h2 className="text-xl font-bold mb-4">Market Analysis</h2>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="competition">Competition</TabsTrigger>
          <TabsTrigger value="swot">SWOT</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Market Size</CardTitle>
              <CardDescription>Estimated total addressable market</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-4">
              <div className="flex items-center gap-2">
                <BarChart className="h-12 w-12 text-primary" />
                <div>
                  <p className="text-2xl font-bold">$4.2B</p>
                  <p className="text-sm text-muted-foreground">Growing at 12% YoY</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Customer Segments</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    <span>Small Businesses (42%)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span>Enterprise (28%)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                    <span>Consumers (30%)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    <span>North America (55%)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                    <span>Europe (25%)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                    <span>Asia Pacific (20%)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Market Trends</CardTitle>
              <CardDescription>Key trends affecting {startupIdea}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-4">
                <LineChart className="h-32 w-32 text-primary" />
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  <span>Increasing demand for digital solutions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                  <span>Shift towards subscription-based models</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                  <span>Growing focus on sustainability</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  <span>Integration of AI and automation</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Competitive Landscape</CardTitle>
              <CardDescription>Key players in the market</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Competitor A</span>
                  <div className="w-2/3 bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Competitor B</span>
                  <div className="w-2/3 bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Competitor C</span>
                  <div className="w-2/3 bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Your Position</span>
                  <div className="w-2/3 bg-muted rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="swot" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-blue-50 dark:bg-blue-950">
              <CardHeader>
                <CardTitle className="text-base">Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Innovative product offering</li>
                  <li>Strong founding team expertise</li>
                  <li>Low overhead costs</li>
                  <li>Agility and adaptability</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-red-50 dark:bg-red-950">
              <CardHeader>
                <CardTitle className="text-base">Weaknesses</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Limited initial resources</li>
                  <li>Brand awareness challenges</li>
                  <li>Unproven business model</li>
                  <li>Small customer base</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950">
              <CardHeader>
                <CardTitle className="text-base">Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Expanding market size</li>
                  <li>Strategic partnerships</li>
                  <li>International expansion</li>
                  <li>New feature development</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 dark:bg-yellow-950">
              <CardHeader>
                <CardTitle className="text-base">Threats</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Established competitors</li>
                  <li>Changing regulations</li>
                  <li>Economic downturns</li>
                  <li>Rapid technological changes</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

