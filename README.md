## Inspiration
In the age of AI tools it's never been faster to get your startup up and running with a functioning website. However, despite this 90% of startups still fail, usually due to running
out of money. Launchpad was created to handle the non-technical portions of startup creation, such as creating cold call scripts to streamline marketing, as well as allocate funds based off
of your account details and provide a realistic pricing structure/timeline.

## What it does
Launchpad is an all-in-one service that handles market research, budgeting, branding, and outreach. It analyzes the market size, as well as prominent competitors with their respective market share
It also creates relevant branding such as your logo, social media avatar, email header etc. It generates email and cold calling scripts, fitted with objection handling for a variety of situations
Lastly, it selects a pricing strategy as well as speciifc price points to ensure you remain competitive in your market. This is paired with your bank account information to let you know
where funds should be allocated to maximize chances of startup success

## How we built it
We leveraged Next.js and Tailwind CSS for the frontend as well as the ShadCN UI library for a clean and minimalistic look. The backend is a Flask API that calls perplexity API for things like
pricing/market research as their model has access to search, and OpenAI for image generation for branding as their model created the cleanest logos. We also integrated this with the Capital One
Hackathon API to produce mock data for our budgeting analytics.

## Challenges we ran into
On the backend we ran into the issue of returning the images in JSON format. We tried to convert into base64 format and decode it with UTF-8, but the response from OpenAI had a url object we could
return instead, showing that the simpler solution is often times the correct solution.

## What's next for Sentinel - Safeguarding your data on the web
We'd like to expand bank integration to a variety of banks outside of just Capital One.
