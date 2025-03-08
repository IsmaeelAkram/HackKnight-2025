import json
import os
import base64

from dotenv import load_dotenv
from flask import Flask, jsonify, request

app = Flask(__name__)

from openai import OpenAI

load_dotenv()  # get api key from .env
PERPLEXITY_API_KEY = os.environ.get("PERPLEXITY_API_KEY")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
client = OpenAI(api_key=PERPLEXITY_API_KEY, base_url="https://api.perplexity.ai")
imageClient = OpenAI(api_key=OPENAI_API_KEY)


@app.route("/")
def index():
    return "HackKnight go!!! sike this is the backend that nobody cares about ^-^"


@app.route("/market", methods=["POST"])
def market_research():
    data = request.json
    idea = data.get("idea")

    if not idea:
        return jsonify({"error": "Do you not have any ideas?"}), 400

    print("Idea: ", idea)

    prompt = f"""These are all your qualifications, 
    You are a Market Research Analyst. 
    Your task is to tell me the estimated market size for my {idea} in my target market. Using available data, 
    make reasonable assumptions about the total addressable market (TAM), serviceable available market (SAM), and 
    serviceable obtainable market (SOM) of my product/service.

    
    You are a Trend Forecaster. 
    Your task is to tell me about any current and emerging market trends for my {idea}. 
    Using industry reports, news articles, and social media conversations, identify at least 3 to 5 
    trends relevant to my market. Each trend should include its characteristics, potential impact on my business,
    and examples of companies already practicing this trend.

    You are a Business Analyst. Your task is to conduct a SWOT analysis for my {idea} in my target market. 
    Identify the Strengths, Weaknesses, Opportunities, and Threats for my product/service. 
    The analysis should be in a standard SWOT matrix format, with bullet points for each section.

    You are a Market Research Analyst. Your task is to analyze the competitive landscape for my {idea}
    in my target market. Tell me about the top 5 competitors in my target market, including their market share, 
    strengths/weaknesses, pricing strategies, and marketing tactics. Present the information in a table format. 

    Now using all the information you've collected, return this information in JSON format.
    ONLY RETURN IN CORRECT JSON FORMAT, INCLUDE NO OTHER TEXT AND NO EXPLANATION. DO NOT PUT INTO MARKDOWN. DO NOT INCLUDE NEWLINES. DO NOT RETURN COMMENTS.

    Example (sample format, adjust data as needed): 
    {{
        "MarketSize": {{
            "TAM": "4B",
            "SAM": "3B",
            "SOM": "500M",
        }},
        "MarketSizeGrowingYOYPercent": {{
            "TAM": 20,
            "SAM": 12,
            "SOM": 5,
        }}
        "CustomerSegments": [
            {{"Name": "Small businesses", "Percent": 42}},
            {{"Name": "Enterprise", "Percent": 28}},
            {{"Name": "Consumers", "Percent": 30}},
        ],
        "GeographicDistribution": [
            {{"region": "North America", "Percent": 55}}
            {{"region": "Europe", "Percent": 25}}
            {{"region": "Asia Pacific", "Percent": 20}}
        ],
        "MarketTrends": [
            "Increasing demand for digital solutions",
            "Shift towards subscription-based models",
            "Growing focus on sustainability",
            "Integration of AI and automation"
        ],
        "CompetitiveLandscape": [
            {{"CompetitorName": "Competitor A", "MarketSharePercent": 40, "Strengths": "Brand recognition, global presence",
			"Weaknesses": "Perceived as commercial, less personalized"}},
            {{"CompetitorName": "Competitor B", "MarketSharePercent": 20, "Strengths": "Brand recognition, global presence",
			"Weaknesses": "Perceived as commercial, less personalized"}},
            {{"CompetitorName": "Competitor C", "MarketSharePercent": 15, "Strengths": "Brand recognition, global presence",
			"Weaknesses": "Perceived as commercial, less personalized"}},
            {{"CompetitorName": "Your position", "MarketSharePercent": 10, "Strengths": "Brand recognition, global presence",
			"Weaknesses": "Perceived as commercial, less personalized"}}, // THIS IS RESERVED TO COMPARE COMPETITORS WITH OUR STARTUP
        ],
        "SWOT": {{
            "Strengths": [
                "Innovative product offering",
                "Strong founding team expertise",
                "Low overhead costs",
                "Agility and adaptability"
            ],
            "Weaknesses": [
                "Limited initial resources",
                "Brand awareness challenges",
                "Unproven business model",
                "Small customer base"
            ],
            "Opportunities": [
                "Expanding market size",
                "Strategic partnerships",
                "International expansion",
                "New feature development"
            ],
            "Threats": [
                "Established competitors",
                "Changing regulations",
                "Economic downturns",
                "Rapid technological changes"
            ],
        }}
    }}
{idea}
"""

    messages = [
        {
            "role": "system",
            "content": "You are an artificial intelligence assistant and you need to "
            "engage in a helpful, detailed, polite conversation with a user.",
        },
        {
            "role": "user",
            "content": prompt,
        },
    ]

    print("payload", prompt)

    # won't load until query completes
    try:
        print("Starting research...")
        response = client.chat.completions.create(
            model="sonar-pro",
            messages=messages,
        )
        print("Research complete.")
        raw_out = response.choices[0].message.content
        print("ai output", raw_out)

        json_out = json.loads(raw_out)
        return jsonify(json_out), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/outreach", methods=["POST"])
def outreach():
    data = request.json
    idea = data.get("idea")

    if not idea:
        return jsonify({"error": "Do you not have any ideas?"}), 400
    
    prompt = f'''
        As a seasoned copywriter who specializes in website copy for a company which is {idea} , your task is to write email templates for cold outreach 
        and warm leads/referrals. Additionally you will write out the Cold Calling Script guide for initial phone conversations
        this will include an Introduction, what to say if they show interest, a call to action and objection handling. Additionally
        you will create a follow up email template. These emails generally should make reference to relevant market information.

        Return all this info in ONLY JSON FORMAT. ONLY RETURN IN CORRECT JSON FORMAT, INCLUDE NO OTHER TEXT AND NO EXPLANATION. 
        DO NOT PUT INTO MARKDOWN. DO NOT INCLUDE NEWLINES. DO NOT RETURN COMMENTS.

        Example (sample, adjust values when necessary):
        {{
            "Emails": {{
                "ColdEmailTemplate" : "Subject: Solve Your Coffee Challenges with CoffeeHub\n\nDear [Recipient Name],\n\nI hope this email finds you well. My name is [Your Name] from fdhsfhHub, and I'm reaching out because I noticed that [Company Name] might be facing challenges with fdhsfh.\n\nAt fdhsfhHub, we've developed a solution that helps businesses like yours:\n• [Benefit 1]\n• [Benefit 2]\n• [Benefit 3]\n\nWe've already helped companies like [Reference Company] achieve [specific result], and I'd love to show you how we could do the same for [Company Name].\n\nWould you be available for a quick 15-minute call next week to discuss how fdhsfhHub could help your team? I'm free on [Date/Time] or [Date/Time].\n\nLooking forward to connecting,\n\n[Your Name]\n[Your Title]\nfdhsfhHub\n[Phone Number]\n[Email]",
                "IntroductionEmail" : "Subject: Following Up on [Referrer]'s Introduction\n\nDear [Recipient Name],\n\nI hope this email finds you well. [Referrer Name] suggested I reach out to you regarding the coffee challenges your team might be facing.\n\nAt coffeeHub, we specialize in helping businesses like yours overcome these challenges through our innovative platform. Our solution enables:\n\n• [Key Feature 1] that delivers [Benefit 1]\n• [Key Feature 2] that ensures [Benefit 2]\n• [Key Feature 3] that provides [Benefit 3]\n\nI'd love to schedule a brief call to learn more about your specific needs and show you how coffeeHub might be able to help. Would you have 15 minutes available this week?\n\nLooking forward to connecting,\n\n[Your Name]\n[Your Title]\ncoffeeHub\n[Phone Number]\n[Email]",
                "FollowUpEmail" : "Subject: Following up on CoffeeHub for [Company Name]\n\nDear [Name],\n\nI wanted to follow up on my previous message about how CoffeeHub can help [Company Name] with coffee.\n\nI thought you might find this [case study/article/resource] valuable: [Link]\n\nIt shows how [Company Similar to Prospect] was able to [achieve specific result] after implementing our solution.\n\nI'd still love to schedule a quick call to discuss your specific needs. Would any of these times work for you?\n- [Date/Time Option 1]\n- [Date/Time Option 2]\n- [Date/Time Option 3]\n\nLooking forward to connecting,\n\n[Your Name]\nCoffeeHub"

    
            }}, 
            "Calls": {{
                "Introduction" : "Hi [Name], this is [Your Name] from CoffeeHub. How are you doing today? [Pause for response] Great! The reason I'm calling is that we help businesses overcome challenges with Coffee, and I was wondering if that's something your team is currently dealing with?",
                "Interested" : "I'd love to learn more about your specific challenges. Could you tell me a bit about how your team currently handles coffee? [Listen and take notes] That's really helpful to understand. Many of our clients faced similar challenges before working with us. What we've developed is a solution that [explain 1-2 key benefits relevant to their pain points].",
                "CallToAction" : "I'd love to show you a quick demo of how our solution works and discuss how it might fit your specific needs. Would you be available for a 20-minute call later this week? I have openings on [suggest 2-3 specific times].",
                "ObjectionHandling" : [
                {{
                    "objection": "We're already using another solution",
                    "response": "I understand. Many of our current clients switched from other solutions because of our [unique value proposition]. Would you be open to seeing how we compare to your current solution?"

                }},
                {{
                    "objection": "We don't have budget right now",
                    "response": "I completely understand budget constraints. Our solution actually helps companies save [average savings amount] within the first [timeframe]. Would it make sense to at least explore if those savings could apply to your situation?"
                }}
                ]
            }},
              
       }} 
    
    '''

    messages = [
        {
            "role": "system",
            "content": "You are an artificial intelligence assistant and you need to "
            "engage in a helpful, detailed, polite conversation with a user.",
        },
        {
            "role": "user",
            "content": prompt,
        },
    ]

    try:
        print("Starting Outreach Creation...")
        response = client.chat.completions.create(
            model="sonar-pro",
            messages=messages,
        )
        print("Outreach complete.")
        raw_out = response.choices[0].message.content
        print("ai output", raw_out)

        json_out = json.loads(raw_out)
        return jsonify(json_out), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/pricing", methods=["POST"])
def pricing_strategy():
    data = request.json
    idea = data.get("idea")

    if not idea:
        return jsonify({"error": str(e)}), 500
    #call market api first and pass in competitors as parameters into pricing strategy/modify prompt as well
    prompt = f'''
        You are an expert consultant for company who's premise is {idea}, and they need to come up with
        competitive pricing tiers. Select one of the following to be the selected pricing model: 1) Subscription-Based,
        2) One-Time Price 3)Usage-Based. Select the correct one based on the context for the idea being {idea}.

        After selecting the pricing model set three tiers of pricing, which could be for subscription based and usage based
        different monthly tiers at different price ranges a low tier, a mid tier, and a high tier, and if a one-time
        pricing model is selected, then 3 potential price points are selected.

        Afterwards analyze the top 3 competitors in this space and their prices/pricing models and the key differentiator
        whether that be the product itself or the difference in price. Based off this, generate 3 short and concise key insights.

        Next, based on the generated pricing model, calculate a sample monthly revenue, monthly costs, and monthly profit, as well as
        how much of the revenue comes from each pricing tier. For the monthly costs you should also have how you should allocate those funds. 
        You should also come up with some optimization opportunities with a profit-based focus.

        Now using all the information you've collected, return this information in JSON format.
        ONLY RETURN IN CORRECT JSON FORMAT, INCLUDE NO OTHER TEXT AND NO EXPLANATION. DO NOT PUT INTO MARKDOWN. DO NOT INCLUDE NEWLINES. DO NOT RETURN COMMENTS.

        Example (sample format, adjust data as needed): 

        {{
        "selected_pricing_model": "{{Subscription-Based}}",
        "pricing_tiers": {{
            "Low_Tier": {{
            "price": "{{29}}",
            "features": ["{{Up to 3 Users}}", "{{5 Projects}}"]
            }},
            "Mid_Tier": {{
            "price": "{{79}}",
            "features": ["{{Up to 10 Users}}", "{{20 Projects}}", "{{Adavanced Analytics}}"]
            }},
            "High_Tier": {{
            "price": "{{129}}",
            "features": ["{{Unlimited Users}}", "{{Unlimited Projects}}", "{{Custom Analytics}}", "{{API Access}}"]
            }}
        }},
        {{
        "competitor_analysis": [
            {{
            "name": "{{Netflix}}",
            "pricing_model": "{{Subscription-Based}}",
            "price_points": ["{{20}}", "{{35}}", "{{50}}"],
            "key_differentiator": "{{Well-known brand name}}"
            }},
            {{
            "name": "{{Dropbox}}",
            "pricing_model": "{{One-Time Price}}",
            "price_points": ["{{20}}", "{{null}}", "{{null}}"],
            "key_differentiator": "{{One-time Price}}"
            }},
            {{
            "name": "{{Youtube}}",
            "pricing_model": "{{Subscription-Based}}",
            "price_points": ["{{0}}", "{{80}}", "{{120}}"],
            "key_differentiator": "{{Creator economy}}"
            }}
        ],
        "key_insights": [
            "{{Your pricing is positioned in the mid-range of the market, offering a balance of features and affordability.}}",
            "{{Youtube's freemium model may attract price-sensitive customers, but their paid tiers offer fewer features than yours.}}",
            "{{Consider adding a free trial or money-back guarantee to reduce the perceived risk for new customers.}}"
        ],
        "financial_projection": {{
            "monthly_revenue": "{{15750}}",
            "monthly_costs": "{{6300}}",
            "monthly_profit": "{{9450}}",
            "profit_margin": "{{60}}, //return in terms of a percentage
            "revenue_distribution": {{
            "Low_Tier": "{{150}}", //number of basic users
            "Mid_Tier": "{{75}}",
            "High_Tier": "{{25}}"
            }},
            "cost_allocation": {{
                "Infrastructure": "{{2500}}",
                "Marketing": "{{1500}}",
                "Customer Support": "{{1200}}",
                "R&D": "{{700}}",
                "Miscellaneous": "{{400}}"
            }}
        }},
        "optimization_opportunities" : [
            "{{Focus marketing efforts on Professional tier for highest ROI}}",
            "{{Consider a 10% price increase on Enterprise tier to improve margins}}",
            "{{Implement annual billing discounts to improve cash flow}}",
            "{{Explore infrastructure cost optimizations to increase overall margins}}
        ]
        }}
        }}

    '''

    messages = [
        {
            "role": "system",
            "content": "You are an artificial intelligence assistant and you need to "
            "engage in a helpful, detailed, polite conversation with a user.",
        },
        {
            "role": "user",
            "content": prompt,
        },
    ]

    try:
        print("Starting Pricing Strategy...")
        response = client.chat.completions.create(
            model="sonar-pro",
            messages=messages,
        )
        print("Strategizing complete.")
        raw_out = response.choices[0].message.content
        print("ai output", raw_out)

        json_out = json.loads(raw_out)
        return jsonify(json_out), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.rout("/branding", methods=["POST"])
def branding():
    data = request.json
    idea = data.get("idea")

    if not idea:
        return jsonify({"error": "You don't have any ideas?"}), 500
    
    logoPrompt = f'''
        AI generated logo for {idea}
    '''

    websiteBannerPrompt = f'''
        AI generated website banner for {idea}
    '''

    socialMediaAvatarPrompt = f'''
        AI generated social media avatar for {idea}
    '''

    emailHeaderPrompt = f'''
        AI generated email header image for {idea}
    ''' 

    logo = imageClient.images.generate(
        model="dall-e-3",
        prompt=logoPrompt,
        size="480x480",
        quality="standard",
        n=1,
    )

    websiteBanner = imageClient.images.generate(
        model="dall-e-3",
        prompt=websiteBannerPrompt,
        size="480x480",
        quality="standard",
        n=1,
    )

    socialMediaAvatar = imageClient.images.generate(
        model="dall-e-3",
        prompt=socialMediaAvatarPrompt,
        size="480x480",
        quality="standard",
        n=1,
    )

    emailHeader = imageClient.images.generate(
        model="dall-e-3",
        prompt=emailHeaderPrompt,
        size="480x480",
        quality="standard",
        n=1,
    )
    

    logo_url = logo.data[0].url
    logo_data = request.get(logo_url).content
    encoded_logo = base64.b64encode((logo_data).decode("utf-8"))

    return jsonify({
        "logo" : encoded_logo
    })
@app.route("/budgeting")
def budgeting():
    return jsonify({"error": "Not implemented yet"}), 500


if __name__ == "__main__":
    app.run()


# {Market size estimation, market trend identification, SWOT analysis, competitive landscape analysis}
