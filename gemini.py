import google.generativeai as genai
import os

gemini_api_key = 'AIzaSyDXWwMhn1EJaLietlstWQtrzt55yl-MTbI'
genai.configure(api_key=gemini_api_key)

prompt =  "Make a twitter twitter thread on the topic \"History of America\". Use emojis as needed. Hashtags must be used only in the first tweet. It must consist of 5 tweets in total including a catch beginning thread. Generate tweets in a JSON format"

model = genai.GenerativeModel('gemini-1.5-pro-latest')
response = model.generate_content(prompt)
print(response.text)
