# DEFIMarket

# Links

> * Frontend: http://tokentab.surge.sh/coins/bitcoin *
> * Backend: https://tokentab.herokuapp.com/coins *

# APP Features
> *The goal of this app is to list all available coins on the market on a simple and clean interface, also letting a crypto-enthusiast choose a variety of coin’s and add them to a watch-list while giving them the option to connect a metamask wallet to get stats on coins they are holding!*

## The Data

Using the CoinGecko API I can get a coin on the market and return JSON like this

    "symbol": "string",
    "high": "number (double)",
    "low": "number (double)",
    "volume": "number (double)",
    "quoteVolume": "number (double)",
    "percentChange": "number (double)",
    "updatedAt": "string (date-time)"

## **Schema Design**

![plot](https://github.com/phoenixtahoe/DEFIMarket/blob/main/Schema.png)

`3 Tables`

`User, Coin, Watchlist `

`User stores id, username, password, email, metamask, and an address`

`Coin stores name as the id, and stores the unique symbol`

`Watchlist reference a User and an array of coin id's`

## User flow
> Coins that we grab from API will be listed and limted too the top 50 coins and said **User** will be able to click said **Coin** and list all available data on the coin and see the data displayed on a chart.

![plot](https://user-images.githubusercontent.com/32720718/172044631-10bc0406-3ec7-411e-9930-d12d3cbf27d2.png)

> User's will be able to add their favorite coins to a watch list and will be able to connect a Metamask wallet.

![Watchlist](https://user-images.githubusercontent.com/32720718/172044667-cc4aad95-42c0-4b93-a064-c696978bfa82.png)

> Find a **Coin** using the search bar to find one that isn't listed.
