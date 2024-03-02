# Event-Driven Mentality towards the Renaissance of NFTs

Our project innovatively bridges existing NFT collections and their communities with web3 applications by introducing an event-driven mechanism to enhance NFT utility across different applications. Our method transforms NFTs from static to dynamic assets, capable of evolving within web3 applications without changing their on-chain metadata, thus expanding their utility beyond traditional uses like profile pictures (PFPs). In gaming, this approach enables the integration of existing NFT collections into games, allowing for a more personalized and enriched gaming experience. This event-driven standard fosters a more interconnected and versatile ecosystem, enhancing the value and application of NFTs across gaming platforms and beyond.

<img width="1754" alt="image" src="https://github.com/ZeroX-Games/eth-denver/assets/131199919/89475e31-b89f-4ca0-8f87-28c75afa286a">

## Problem

People are trying to boost the usage of NFTs beyond profile pictures PFPs, for example gaming. But there is a big gap between the PFPs and web3 applications because most applications are minting their own NFT collections, very isolated. Traditionally, a game, for example, will mint its own NFTs. As the game progresses, the metadata gets updated on-chain and the NFT also progresses with the game. Such data structure makes the NFT collection dedicated to the game, and restricts existing NFT collections to be used in the game.

![image](https://github.com/ZeroX-Games/eth-denver/assets/131199919/4b1532c3-bf01-406c-9541-d689a8c79829)

## Solution

Now, how can we enable the utility of existing NFT collections to the game efficiently, Pudgy Penguins for example, through the Event-Driven Mentality? We just need an event-driven standard smart contract which the game follows. As the game progresses, instead of changing the metadata on-chain, we update the status changes through an event emitted to this contract. These status changes will be efficiently logged on-chan, and will result in a chain of events for the game. Similarly, if we extend this idea to other applications like a social meadia, each application will have its own chain of events representing the application statuses.

![image](https://github.com/ZeroX-Games/eth-denver/assets/131199919/22b722b7-9e81-4de6-a904-fed91810a425)

## Live Demo

https://zeroxarcade.netlify.app/

## How to Run it Locally?

Follow the instructions to setup [backend](https://github.com/ZeroX-Games/eth-denver/tree/main/backend) and [frontend](https://github.com/ZeroX-Games/eth-denver/blob/main/frontend/README.md).

## Screenshots

![image](https://github.com/ZeroX-Games/eth-denver/assets/131199919/8dd8b92e-40e6-47e8-a5c3-681198693f5d)

![image](https://github.com/ZeroX-Games/eth-denver/assets/131199919/16cf0c51-2127-43b2-b144-4dd02a47d34a)

![image](https://github.com/ZeroX-Games/eth-denver/assets/131199919/e5c81ccc-5390-43f4-bd94-1b98dea3d05b)

