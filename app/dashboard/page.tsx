"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
import { ArrowLeft, Rocket } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { MarketTab } from "@/components/market-tab"
import { BrandingTab } from "@/components/branding-tab"
import { OutreachTab } from "@/components/outreach-tab"
import { PricingTab } from "@/components/pricing-tab"

import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

const ResponsiveGridLayout = WidthProvider(Responsive)

export default function Dashboard() {
  const searchParams = useSearchParams()
  const startupIdea = searchParams.get("idea") || "My Startup"
  const description = searchParams.get("description") || "A new business venture"

  // Default layouts for different screen sizes
  const [layouts, setLayouts] = useState({
    lg: [
      { i: "market", x: 0, y: 0, w: 6, h: 8 },
      { i: "branding", x: 6, y: 0, w: 6, h: 8 },
      { i: "outreach", x: 0, y: 8, w: 6, h: 8 },
      { i: "pricing", x: 6, y: 8, w: 6, h: 8 },
    ],
    md: [
      { i: "market", x: 0, y: 0, w: 6, h: 8 },
      { i: "branding", x: 6, y: 0, w: 6, h: 8 },
      { i: "outreach", x: 0, y: 8, w: 6, h: 8 },
      { i: "pricing", x: 6, y: 8, w: 6, h: 8 },
    ],
    sm: [
      { i: "market", x: 0, y: 0, w: 12, h: 8 },
      { i: "branding", x: 0, y: 8, w: 12, h: 8 },
      { i: "outreach", x: 0, y: 16, w: 12, h: 8 },
      { i: "pricing", x: 0, y: 24, w: 12, h: 8 },
    ],
    xs: [
      { i: "market", x: 0, y: 0, w: 12, h: 8 },
      { i: "branding", x: 0, y: 8, w: 12, h: 8 },
      { i: "outreach", x: 0, y: 16, w: 12, h: 8 },
      { i: "pricing", x: 0, y: 24, w: 12, h: 8 },
    ],
  })

  const onLayoutChange = (layout, layouts) => {
    setLayouts(layouts)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <Rocket className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">{startupIdea}</h1>
          </div>
          <div className="text-sm text-muted-foreground hidden md:block max-w-md truncate">{description}</div>
          <Button size="sm">Save Dashboard</Button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
          cols={{ lg: 12, md: 12, sm: 12, xs: 12 }}
          rowHeight={40}
          onLayoutChange={onLayoutChange}
          isDraggable={true}
          isResizable={true}
          margin={[16, 16]}
        >
          <div key="market" className="bg-card rounded-lg shadow-sm border overflow-auto">
            <MarketTab startupIdea={startupIdea} />
          </div>
          <div key="branding" className="bg-card rounded-lg shadow-sm border overflow-auto">
            <BrandingTab startupIdea={startupIdea} />
          </div>
          <div key="outreach" className="bg-card rounded-lg shadow-sm border overflow-auto">
            <OutreachTab startupIdea={startupIdea} />
          </div>
          <div key="pricing" className="bg-card rounded-lg shadow-sm border overflow-auto">
            <PricingTab startupIdea={startupIdea} />
          </div>
        </ResponsiveGridLayout>
      </main>
    </div>
  )
}

