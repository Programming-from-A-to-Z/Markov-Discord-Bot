# Markov-Discord-Bot
A Discord bot that uses Markov Chains to generate text based on the data fetched from a specific API endpoint.

* `bot.js` - The entry point of the application where the bot is initialized.
* `commands/thesis.js` - Contains the logic for loading data from an API and feeding it into the Markov generator.
* `venues.json` - A JSON file containing venues to request from ITP projects database.

## Why Axios Instead of Fetch?

I'm using [Axios](https://axios-http.com/) to fetch data from an API endpoint because the server where the data resides doesn't have SSL/TLS properly configured. Axios allows bypassing this issue, enabling the retrieval of the necessary data. However, bypassing SSL/TLS certificate verification is not recommended due to potential security risks, and this approach is utilized here for demonstration purposes only!

