# -*- coding: utf-8 -*-
"""
Summarizing news articles by integrating open source Python AI summarization tool. - Rameshwari Kothapalli
"""
from __future__ import absolute_import
from __future__ import division, print_function, unicode_literals
from flask import Flask
from flask_cors import CORS

import requests

from sumy.parsers.html import HtmlParser
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer as Summarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words

app = Flask(__name__) #Flask helps us to implement backend in Python
CORS(app)

LANGUAGE = "english" 
SENTENCES_COUNT = 4 # The count of sentences to which the articles will be summarized.

@app.route('/api/summary', methods=['GET']) #Endpoint of the api
def hello_world(): 
    response = requests.get("https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=649fd9f8a3cb46bf9da57a9f1116cfa7") # open source news api
    data = response.json() # fetching data from api and iterating through the AI script to summarize articles.
    for article in data["articles"]:
        parser = HtmlParser.from_url(article["url"], Tokenizer(LANGUAGE))
        stemmer = Stemmer(LANGUAGE)
        result = ""
        summarizer = Summarizer(stemmer)
        summarizer.stop_words = get_stop_words(LANGUAGE)

        for sentence in summarizer(parser.document, SENTENCES_COUNT): #converting the Sentence type of summarized articles to string
            result += str(sentence)
        article["summary"] = result  #storing the summarized news articles in new json parameter "summary" and appending it to the original json response
    return data #returning the modified response to Next.js frontend.
  

if __name__ == '__main__':
    app.run(port=5328) #Running the server on port 5328 locally. Also deployed the app on Versel. Please refer to README.md file.