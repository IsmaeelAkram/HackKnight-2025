# Inspiration
AI has proved it can do almost anything, and now, even access the internet. When trying to do research and setup for my own start-up, I found my workspace cluttered with a bunch of different AI tools: all behind different paywalls and settings. I AM A DEVELOPER, NOT A BUSINESSMAN (yet). Launchpad takes your startup idea from just an idea, to a fully-fledged business.

# What it does

Launchpad is an all-in-one service that handles market research, budget allocation, branding, and outreach/marketing. 

## Market Research
- Uses the web to perform deep market research in different industries and analyzes the potential for growth.
- Retrieves the TAM (Total Addressable Market), SAM/SOM (Serviceable Available/Obtainable Market) sizes and how these industries are trending every year (upwards and downwards).
- Analyzes customer segments (different customer audiences) and geographic distribution. Using news outlets, it retrieves current industry trends (such as rising demand and shifts towards new metas).
- Researches the competitive landscape and compares your potential market share to large competitors.
- Does SWOT analysis (Strengths, Weaknesses, Opportunities, Threats).

## Pricing Strategy
- Calculates potential profit margins based on industry-average pricing and costs, taking into account monthly costs.
- Recommends a pricing model (Subscription-based, One-time, or Usage-Based)
- Analyzes competitor pricing and compares their key differentiators (how they stand out), pricing models, and price points. Using this information, it provides "key insights."

## Budgeting & Financial Planning
- Connects to your CapitalOne bank account (we used the mock API)
- Analyzes your monthly expenditures and calculates your Monthly Burn Rate.
- Estimates a Runway time (possible months of operation without a profit)
- Gives suggestions on where to invest your money (marketing, commodities, or labor).
- Finds ways to efficiently save money in early-stages.
- Lets you customize your budget allocation to fit your needs, and adjusts the other allocations.
- Lets you view recent transactions

## Outreach & Marketing
- It creates cold email templates tailored to your industry
- It creates cold call scripts and responses to common questions, objections.
- It creates a follow-up calendar strategy and follow-up email templates.

## Branding
It generates your logo, brand colors, brand identity, website OpenGraph image, social media avatar, and email header image.

## How we built it

We leveraged Next.js and Tailwind CSS for the frontend as well as the ShadCN UI library for a clean and minimalistic look. The backend is a Flask API that calls the Perplexity API for things like pricing/market research as their model has access to search, and OpenAI for image generation for branding as their model created the cleanest logos. We also integrated this with the Capital OneHackathon API to produce mock data for our budgeting analytics.

## Challenges we ran into

On the backend we ran into the issue of returning the images in JSON format. We tried to convert into base64 format and decode it with UTF-8, but the response from OpenAI had a url object we could return instead, showing that the simpler solution is often times the correct solution.

When using the CapitalOne API, we ran into issues with specific value criteria. For example, we didn't know what a "valid" account number looked like.

## What's next

We'd like to expand bank integration to a variety of banks outside of just Capital One.

We also want to generate video advertisements.
