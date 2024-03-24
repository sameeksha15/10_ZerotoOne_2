import openai

from dotenv import load_dotenv
import os
from pathlib import Path

load_dotenv()
env_path = Path('.')/'.env'
load_dotenv(dotenv_path=env_path)

openai.api_key = os.getenv("OPENAI_API_KEY")

def dietchatbot(user_message):
  messages = [
    {"role": "system", 
     "content": "You will be given the name of a plant or crop disease, you have to give general information of the disese and its causes in 10-12 lines and then also  display a few bullet points on precautionary measures to be taken to spread further spread and occurence. This is supposed to be focusing on farmers"
    },
  ]

  messages.append({"role": "user", "content": user_message})

  response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=messages
  )

  result = response['choices'][0]['message']['content']

  return result


