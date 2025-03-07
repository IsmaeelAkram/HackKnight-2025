from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

#openai key

@app.route("/market", methods = ['POST'])
def market_research():
    data = request.json()
    idea = data.get("idea")

    if not idea:
        return jsonify({"error": "no idea"}), 400
    
    prompt = f"gimme market research for {idea}"
    
    try:
        response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "developer", "content": "You are a helpful assistant."},
            {
                "role": "user",
                "content" : prompt
            }
        ]
        )
        try:
            return jsonify(response.choices[0].messages[0])
        except Exception as e:
            return jsonify({"error": str(e)}), 500 
        
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    

#{}}
#{Market size estimation, market trend identification, SWOT analysis, competitive landscape analysis}