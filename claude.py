import anthropic

prompt =  "Make a twitter twitter thread on the topic \"History of America\". Use emojis as needed and make it entertaining to read. It must consist of 5 tweets in total including a catch beginning thread. Separate each tweet by a tilde (~)"


client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-3-opus-20240229", #"claude-3-5-sonnet-20240620",
    max_tokens=512,
    temperature=0,
    system="You are a world-class poet. Respond only with short poems.",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Why is the ocean salty?"
                }
            ]
        }
    ]
)
print(message.content)