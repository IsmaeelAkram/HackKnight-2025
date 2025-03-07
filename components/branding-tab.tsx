import Image from "next/image"
import { Copy, Download, Instagram, Palette, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface BrandingTabProps {
  startupIdea: string
}

export function BrandingTab({ startupIdea }: BrandingTabProps) {
  // Generate a simple company name based on the startup idea
  const generateCompanyName = (idea: string) => {
    const words = idea.split(" ")
    if (words.length >= 2) {
      return `${words[0]}${words[1].charAt(0).toUpperCase() + words[1].slice(1)}`
    }
    return `${words[0]}Hub`
  }

  const companyName = generateCompanyName(startupIdea)

  return (
    <div className="h-full p-4">
      <h2 className="text-xl font-bold mb-4">Branding</h2>

      <Tabs defaultValue="logo" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="logo">Logo & Colors</TabsTrigger>
          <TabsTrigger value="voice">Brand Voice</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
        </TabsList>

        <TabsContent value="logo" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Logo</CardTitle>
                <CardDescription>AI-generated logo for {companyName}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <div className="bg-primary/10 rounded-full p-8 mb-4">
                  <div className="w-32 h-32 relative">
                    <Image
                      src="/placeholder.svg?height=128&width=128"
                      alt={`${companyName} logo`}
                      width={128}
                      height={128}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold">{companyName}</h3>
                  <p className="text-sm text-muted-foreground">Your brand identity</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-2">
                <Button size="sm" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button size="sm" variant="outline">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Brand Colors</CardTitle>
                <CardDescription>Color palette for your brand</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary"></div>
                      <span>Primary</span>
                      <Badge variant="outline" className="ml-auto">
                        #4F46E5
                      </Badge>
                    </div>
                    <div className="h-12 rounded-md bg-primary"></div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-secondary"></div>
                      <span>Secondary</span>
                      <Badge variant="outline" className="ml-auto">
                        #10B981
                      </Badge>
                    </div>
                    <div className="h-12 rounded-md bg-secondary"></div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-accent"></div>
                      <span>Accent</span>
                      <Badge variant="outline" className="ml-auto">
                        #F59E0B
                      </Badge>
                    </div>
                    <div className="h-12 rounded-md bg-accent"></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">
                  <Palette className="mr-2 h-4 w-4" />
                  Export Color Palette
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="voice" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Brand Voice & Tone</CardTitle>
              <CardDescription>How your brand communicates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Brand Personality</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Professional</Badge>
                    <Badge>Innovative</Badge>
                    <Badge>Trustworthy</Badge>
                    <Badge>Approachable</Badge>
                    <Badge>Solution-oriented</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Voice Characteristics</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Clear and concise communication</li>
                    <li>Confident but not arrogant</li>
                    <li>Helpful and educational</li>
                    <li>Conversational but professional</li>
                    <li>Empathetic to customer needs</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Language Guidelines</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-green-600 dark:text-green-400">Do</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Use active voice</li>
                        <li>Be specific and direct</li>
                        <li>Focus on benefits</li>
                        <li>Use inclusive language</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-red-600 dark:text-red-400">Don't</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Use jargon unnecessarily</li>
                        <li>Be overly technical</li>
                        <li>Make unsubstantiated claims</li>
                        <li>Use negative language</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">Twitter</CardTitle>
                <Twitter className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-3">
                    <p className="text-sm">
                      Excited to announce the launch of {companyName}! We're revolutionizing how businesses approach{" "}
                      {startupIdea.toLowerCase()}. Stay tuned for updates! #StartupLife #Innovation
                    </p>
                  </div>
                  <div className="rounded-md border p-3">
                    <p className="text-sm">
                      Did you know that 78% of businesses struggle with {startupIdea.toLowerCase()}? At {companyName},
                      we're changing that. Learn how: [link] #BusinessTips
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">LinkedIn</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-3">
                    <p className="text-sm">
                      We're thrilled to announce the launch of {companyName}! Our mission is to help businesses overcome
                      challenges with {startupIdea.toLowerCase()} through our innovative platform.
                    </p>
                    <p className="text-sm mt-2">
                      After months of research and development, we're ready to share our solution with the world.
                      Connect with us to learn how we can help your business grow.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">Instagram</CardTitle>
                <Instagram className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-3">
                    <p className="text-sm">✨ Introducing {companyName} ✨</p>
                    <p className="text-sm mt-2">
                      We're on a mission to transform how businesses handle {startupIdea.toLowerCase()}. Follow our
                      journey as we innovate and grow! #StartupLife #Innovation #BusinessSolutions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Content Calendar</CardTitle>
              <CardDescription>Suggested posting schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium">
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                  <div>Sun</div>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  <div className="rounded-md bg-blue-100 dark:bg-blue-900 p-2 text-xs">Industry Tips</div>
                  <div className="rounded-md bg-green-100 dark:bg-green-900 p-2 text-xs">Product Feature</div>
                  <div className="rounded-md bg-purple-100 dark:bg-purple-900 p-2 text-xs">Customer Story</div>
                  <div className="rounded-md bg-yellow-100 dark:bg-yellow-900 p-2 text-xs">Behind the Scenes</div>
                  <div className="rounded-md bg-red-100 dark:bg-red-900 p-2 text-xs">Industry News</div>
                  <div className="rounded-md bg-gray-100 dark:bg-gray-800 p-2 text-xs">Inspiration</div>
                  <div className="rounded-md bg-gray-100 dark:bg-gray-800 p-2 text-xs">Weekly Recap</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Brand Assets</CardTitle>
              <CardDescription>Download and use your brand assets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4 flex flex-col items-center">
                  <div className="bg-primary/10 rounded-md p-4 mb-4">
                    <Image
                      src="/placeholder.svg?height=100&width=200"
                      alt="Banner"
                      width={200}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-medium">Website Banner</h3>
                  <p className="text-sm text-muted-foreground mb-4">1200 x 600px</p>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>

                <div className="border rounded-md p-4 flex flex-col items-center">
                  <div className="bg-primary/10 rounded-md p-4 mb-4">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="Social Media Avatar"
                      width={100}
                      height={100}
                      className="object-contain rounded-full"
                    />
                  </div>
                  <h3 className="font-medium">Social Media Avatar</h3>
                  <p className="text-sm text-muted-foreground mb-4">500 x 500px</p>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>

                <div className="border rounded-md p-4 flex flex-col items-center">
                  <div className="bg-primary/10 rounded-md p-4 mb-4">
                    <Image
                      src="/placeholder.svg?height=100&width=200"
                      alt="Email Header"
                      width={200}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-medium">Email Header</h3>
                  <p className="text-sm text-muted-foreground mb-4">600 x 200px</p>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>

                <div className="border rounded-md p-4 flex flex-col items-center">
                  <div className="bg-primary/10 rounded-md p-4 mb-4 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-xl font-bold">{companyName}</h3>
                      <p className="text-sm">Your tagline here</p>
                    </div>
                  </div>
                  <h3 className="font-medium">Business Card</h3>
                  <p className="text-sm text-muted-foreground mb-4">3.5 x 2 inches</p>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

