from dotenv import load_dotenv
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

from openai import OpenAI
load_dotenv() #get api key from .env
PERPLEXITY_API_KEY = os.environ.get('PERPLEXITY_API_KEY')

@app.route("/market", methods=['POST'])
def market_research():
    data = request.json
    idea = data.get("idea")

    if not idea:
        return jsonify({"error": "no idea"}), 400
    
    prompt = f"gimme market research for {idea}"

    messages = [
        {
            "role": "system",
            "content": (
                "You are an artificial intelligence assistant and you need to "
                "engage in a helpful, detailed, polite conversation with a user."
            ),
        },
        {   
            "role": "user",
            "content": (prompt),
        },
    ]

    client = OpenAI(api_key=PERPLEXITY_API_KEY, base_url="https://api.perplexity.ai")

    #won't load until query completes
    try:
        response = client.chat.completions.create(
            model="sonar-deep-research",
            messages=messages,
        )
        try:
            return jsonify(response.choices[0].messages[0]), 200
        except Exception as e:
            return jsonify({"error" : str(e)}), 500
    except Exception as e: 
        return jsonify({"error" : str(e)}), 500
    
if(__name__ == "__main__"):
    app.run()


#{Market size estimation, market trend identification, SWOT analysis, competitive landscape analysis}