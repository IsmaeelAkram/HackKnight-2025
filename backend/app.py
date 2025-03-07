import os

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

    prompt = f"gimme market research for {idea}"

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

    # won't load until query completes
    try:
        print("Starting research...")
        response = client.chat.completions.create(
            model="sonar",
            messages=messages,
        )
        print("Research complete.")
        print(response)
        return jsonify(response.choices[0].message.content), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run()


# {Market size estimation, market trend identification, SWOT analysis, competitive landscape analysis}
