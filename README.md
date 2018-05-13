# mochaBot
A Microsoft LUIS Bot example for ordering Coffee (Just for fun)

Pre-requisites:
 - node.js 8.9.1
 - npm (latest)
 - knowledge about spanish language, as the bot is just a little bit like Manuel  (https://en.wikipedia.org/wiki/Fawlty_Towers#Manuel) from Fawlty Towers...

 First you will need to:
    - sign up at http://luis.ai to create an account
    - Import mochaBot.json 
    - Train and publish

Then install dependecies with:
```
 npm install
```
and Create a .env file like this one: 
```
# Bot Framework Variables
MICROSOFT_APP_ID=
MICROSOFT_APP_PASSWORD=

# This Url can be obtained by uploading or creating your model from the LUIS portal: https://www.luis.ai/
LUIS_MODEL_URL= (your Endpoint URL)
# Boolean value to enable correcting the text before processing it
IS_SPELL_CORRECTION_ENABLED=false

# Subscribe to Cognitive Services Bing Spell Check API to obtain a Trial Key.
# Subscription URL: https://azure.microsoft.com/en-us/try/cognitive-services/?api=spellcheck-api
BING_SPELL_CHECK_API_KEY=
BING_SPELL_CHECK_API_ENDPOINT=https://api.cognitive.microsoft.com/bing/v7.0/spellcheck
```

where you just need to paste the Endpoint URL you'll get when publishing your LUIS app. No need for ID or PASSWORD.

Next step Download the Microsoft Bot Emulator (https://github.com/Microsoft/BotFramework-Emulator/releases) install and run. Load the mochaBot.bot

Then run the app
```
node app
```

Go back to the Bot Emulator and ready to have some fun!

I wrote this just to test LUIS capabilities, so it's a very basic bot, don't expect your coffee to arrive on time.