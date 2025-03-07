import os
import json

from dotenv import load_dotenv
from flask import Flask, jsonify, request

app = Flask(__name__)

from openai import OpenAI

load_dotenv()  # get api key from .env
PERPLEXITY_API_KEY = os.environ.get("PERPLEXITY_API_KEY")
client = OpenAI(api_key=PERPLEXITY_API_KEY, base_url="https://api.perplexity.ai")


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

    prompt = f'''These are all your qualifications, 
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


if __name__ == "__main__":
    app.run()


# {Market size estimation, market trend identification, SWOT analysis, competitive landscape analysis}
