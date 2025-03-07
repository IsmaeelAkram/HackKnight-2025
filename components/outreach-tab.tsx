import { Mail, MessageSquare, Phone, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

interface OutreachTabProps {
  startupIdea: string
}

export function OutreachTab({ startupIdea }: OutreachTabProps) {
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
      <h2 className="text-xl font-bold mb-4">Outreach</h2>

      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="email">Email Scripts</TabsTrigger>
          <TabsTrigger value="call">Call Scripts</TabsTrigger>
          <TabsTrigger value="follow">Follow-up</TabsTrigger>
          <TabsTrigger value="personas">Personas</TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cold Email Template</CardTitle>
              <CardDescription>Initial outreach to potential customers</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-[200px] font-mono text-sm"
                value={`Subject: Solve Your ${startupIdea} Challenges with ${companyName}

Dear [Recipient Name],

I hope this email finds you well. My name is [Your Name] from ${companyName}, and I'm reaching out because I noticed that [Company Name] might be facing challenges with ${startupIdea.toLowerCase()}.

At ${companyName}, we've developed a solution that helps businesses like yours:
• [Benefit 1]
• [Benefit 2]
• [Benefit 3]

We've already helped companies like [Reference Company] achieve [specific result], and I'd love to show you how we could do the same for [Company Name].

Would you be available for a quick 15-minute call next week to discuss how ${companyName} could help your team? I'm free on [Date/Time] or [Date/Time].

Looking forward to connecting,

[Your Name]
[Your Title]
${companyName}
[Phone Number]
[Email]`}
                readOnly
              />
              <div className="flex justify-end mt-4">
                <Button size="sm">Copy to Clipboard</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Introduction Email</CardTitle>
              <CardDescription>For warm leads or referrals</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-[200px] font-mono text-sm"
                value={`Subject: Following Up on [Referrer]'s Introduction

Dear [Recipient Name],

I hope this email finds you well. [Referrer Name] suggested I reach out to you regarding the ${startupIdea.toLowerCase()} challenges your team might be facing.

At ${companyName}, we specialize in helping businesses like yours overcome these challenges through our innovative platform. Our solution enables:

• [Key Feature 1] that delivers [Benefit 1]
• [Key Feature 2] that ensures [Benefit 2]
• [Key Feature 3] that provides [Benefit 3]

I'd love to schedule a brief call to learn more about your specific needs and show you how ${companyName} might be able to help. Would you have 15 minutes available this week?

Looking forward to connecting,

[Your Name]
[Your Title]
${companyName}
[Phone Number]
[Email]`}
                readOnly
              />
              <div className="flex justify-end mt-4">
                <Button size="sm">Copy to Clipboard</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="call" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cold Call Script</CardTitle>
              <CardDescription>Guide for initial phone conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-medium">Introduction</h3>
                  <p className="text-sm mt-2">
                    "Hi [Name], this is [Your Name] from {companyName}. How are you doing today? [Pause for response]
                    Great! The reason I'm calling is that we help businesses overcome challenges with{" "}
                    {startupIdea.toLowerCase()}, and I was wondering if that's something your team is currently dealing
                    with?"
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-medium">If they show interest</h3>
                  <p className="text-sm mt-2">
                    "I'd love to learn more about your specific challenges. Could you tell me a bit about how your team
                    currently handles {startupIdea.toLowerCase()}? [Listen and take notes] That's really helpful to
                    understand. Many of our clients faced similar challenges before working with us. What we've
                    developed is a solution that [explain 1-2 key benefits relevant to their pain points]."
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-medium">Call to action</h3>
                  <p className="text-sm mt-2">
                    "I'd love to show you a quick demo of how our solution works and discuss how it might fit your
                    specific needs. Would you be available for a 20-minute call later this week? I have openings on
                    [suggest 2-3 specific times]."
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-medium">Handling objections</h3>
                  <p className="text-sm mt-2">
                    <strong>"We're already using another solution"</strong>
                    <br />
                    "I understand. Many of our current clients switched from other solutions because of our [unique
                    value proposition]. Would you be open to seeing how we compare to your current solution?"
                    <br />
                    <br />
                    <strong>"We don't have budget right now"</strong>
                    <br />
                    "I completely understand budget constraints. Our solution actually helps companies save [average
                    savings amount] within the first [timeframe]. Would it make sense to at least explore if those
                    savings could apply to your situation?"
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button size="sm">Download Script</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="follow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Follow-up Strategy</CardTitle>
              <CardDescription>Maintaining engagement with prospects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Follow-up Timeline</h3>
                  <ol className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Day 1: Initial Contact</p>
                        <p className="text-sm text-muted-foreground">Send initial email or make first call</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Day 3: First Follow-up</p>
                        <p className="text-sm text-muted-foreground">
                          Send a follow-up email with additional value (case study, article, etc.)
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Day 7: Second Follow-up</p>
                        <p className="text-sm text-muted-foreground">
                          Try a different channel (call if you emailed, or vice versa)
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                        4
                      </div>
                      <div>
                        <p className="font-medium">Day 14: Third Follow-up</p>
                        <p className="text-sm text-muted-foreground">
                          Share a relevant success story or new feature announcement
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                        5
                      </div>
                      <div>
                        <p className="font-medium">Day 30: Final Follow-up</p>
                        <p className="text-sm text-muted-foreground">Send a "break-up" email to create urgency</p>
                      </div>
                    </li>
                  </ol>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Follow-up Email Template</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      className="min-h-[150px] font-mono text-sm"
                      value={`Subject: Following up on ${companyName} for [Company Name]

Dear [Name],

I wanted to follow up on my previous message about how ${companyName} can help [Company Name] with ${startupIdea.toLowerCase()}.

I thought you might find this [case study/article/resource] valuable: [Link]

It shows how [Company Similar to Prospect] was able to [achieve specific result] after implementing our solution.

I'd still love to schedule a quick call to discuss your specific needs. Would any of these times work for you?
- [Date/Time Option 1]
- [Date/Time Option 2]
- [Date/Time Option 3]

Looking forward to connecting,

[Your Name]
${companyName}`}
                      readOnly
                    />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personas" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Decision Maker</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>C-Suite / VP Level</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Pain Points</h3>
                  <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                    <li>ROI and bottom-line impact</li>
                    <li>Competitive advantage</li>
                    <li>Resource allocation</li>
                    <li>Strategic alignment</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Messaging Focus</h3>
                  <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                    <li>Cost savings and revenue impact</li>
                    <li>Market differentiation</li>
                    <li>Long-term strategic benefits</li>
                    <li>Case studies with similar companies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Outreach Channels</h3>
                  <div className="flex gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-sm">High</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-sm">Medium</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Low</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Influencer</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Director / Manager Level</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Pain Points</h3>
                  <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                    <li>Team productivity and efficiency</li>
                    <li>Process optimization</li>
                    <li>Reporting and visibility</li>
                    <li>Resource constraints</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Messaging Focus</h3>
                  <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                    <li>Time savings and efficiency gains</li>
                    <li>Ease of implementation</li>
                    <li>Team adoption and usability</li>
                    <li>Integration with existing tools</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Outreach Channels</h3>
                  <div className="flex gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-sm">High</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-sm">High</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      <span className="text-sm">Medium</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">End User</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Individual Contributors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Pain Points</h3>
                  <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                    <li>Daily workflow friction</li>
                    <li>Manual, repetitive tasks</li>
                    <li>Tool usability and learning curve</li>
                    <li>Access to information</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Messaging Focus</h3>
                  <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                    <li>Ease of use and intuitive interface</li>
                    <li>Time saved on daily tasks</li>
                    <li>Training and support resources</li>
                    <li>Specific feature benefits</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Outreach Channels</h3>
                  <div className="flex gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Low</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Low</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      <span className="text-sm">High</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Gatekeeper</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Administrative / Support Staff</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Pain Points</h3>
                  <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                    <li>Managing multiple priorities</li>
                    <li>Filtering relevant information</li>
                    <li>Protecting decision-maker's time</li>
                    <li>Clear communication</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Messaging Focus</h3>
                  <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                    <li>Clear value proposition</li>
                    <li>Respect for time constraints</li>
                    <li>Relevance to organization</li>
                    <li>Professionalism and courtesy</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Outreach Channels</h3>
                  <div className="flex gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Low</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-sm">High</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Low</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

