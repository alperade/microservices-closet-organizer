# Wardrobify

Team:

* Person 1 - Which microservice?
Alper Ademoglu - Shoes
* Person 2 - Which microservice?
David Leung - Hats

## Design

## Shoes microservice

Explain your models and integration with the wardrobe
microservice, here.

The Shoes microservice has two models; Shoe and BinVO. The BinVO is a value object that gets created once poller.py pulls the data from the Wardrobe microservice. The Shoe poller requests data from Wardrobe microservice and gets a list of Bin objects. It then creates a BinVO value object using this information.


## Hats microservice

Explain your models and integration with the wardrobe
microservice, here.
