# Quickly Setup & Populate MongoDB

Assuming Ubuntu.

Default port is 27017

## Install

- 1 - Import pubkey
```
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
```

- 2 - Create list file

```
$ echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
```

- 3 - Reload packages and Install
```
$ sudo apt-get update && sudo apt-get install -y mongodb-org
```

- 4 - Starting and stopping the server

```
$ sudo service mongod start
$ sudo service mongod stop
```

## Create DB & Populate with dataset

The dataset is in the same folder as this readme.

- Create the db & import dataset.

This will create a collection 'pokemons' in the web4 database (The drop command makes it drop the existing collection if it exist). The --headerline tells it how to interpret the fields (first line in the csv).

*Note: In the original dataset from the zip file the headerline is different from what we use. This is already changed in the included Pokemon.csv, but if you unzip it yourself make sure to change it.*

```
$ mongoimport --db web4 --collection pokemons --drop --type csv --headerline --file pokemon.csv
2017-10-21T21:01:26.284+0200	connected to: localhost
2017-10-21T21:01:26.284+0200	dropping: web4.pokemons
2017-10-21T21:01:26.814+0200	imported 800 documents
```

## Query DB

Now that we have our db running we can query it.

- Enter mongodb's cli
```
$ mongo
```

- Use correct db
```
> use web4
switched to db pokemon
```

- Now we can query using regex inside JSON.
```
> db.pokemons.find({id:25})
{ "_id" : ObjectId("59f19a4a0174c55230850d8c"), "id" : 25, "pokemon" : "pikachu", "species_id" : 25, "height" : 4, "weight" : 60, "base_experience" : 112, "type_1" : "electric", "type_2" : "NA", "attack" : 55, "defense" : 40, "hp" : 35, "special_attack" : 50, "special_defense" : 50, "speed" : 90, "ability_1" : "static", "ability_2" : "NA", "ability_hidden" : "lightning-rod", "color_1" : "#F8D030", "color_2" : "NA", "color_f" : "NA", "egg_group_1" : "ground", "egg_group_2" : "fairy", "url_image" : "25.png", "generation_id" : 1, "evolves_from_species_id" : 172, "evolution_chain_id" : 10, "shape_id" : 8, "shape" : "quadruped" }
> db.pokemons.find({pokemon:/^pidg/})
{ "_id" : ObjectId("59f19a4a0174c55230850d82"), "id" : 16, "pokemon" : "pidgey", "species_id" : 16, "height" : 3, "weight" : 18, "base_experience" : 50, "type_1" : "normal", "type_2" : "flying", "attack" : 45, "defense" : 40, "hp" : 40, "special_attack" : 35, "special_defense" : 35, "speed" : 56, "ability_1" : "keen-eye", "ability_2" : "tangled-feet", "ability_hidden" : "big-pecks", "color_1" : "#A8A878", "color_2" : "#A890F0", "color_f" : "#A8A295", "egg_group_1" : "flying", "egg_group_2" : "NA", "url_image" : "16.png", "generation_id" : 1, "evolves_from_species_id" : "NA", "evolution_chain_id" : 6, "shape_id" : 9, "shape" : "wings" }
{ "_id" : ObjectId("59f19a4a0174c55230850d84"), "id" : 17, "pokemon" : "pidgeotto", "species_id" : 17, "height" : 11, "weight" : 300, "base_experience" : 122, "type_1" : "normal", "type_2" : "flying", "attack" : 60, "defense" : 55, "hp" : 63, "special_attack" : 50, "special_defense" : 50, "speed" : 71, "ability_1" : "keen-eye", "ability_2" : "tangled-feet", "ability_hidden" : "big-pecks", "color_1" : "#A8A878", "color_2" : "#A890F0", "color_f" : "#A8A295", "egg_group_1" : "flying", "egg_group_2" : "NA", "url_image" : "17.png", "generation_id" : 1, "evolves_from_species_id" : 16, "evolution_chain_id" : 6, "shape_id" : 9, "shape" : "wings" }
{ "_id" : ObjectId("59f19a4a0174c55230850d85"), "id" : 18, "pokemon" : "pidgeot", "species_id" : 18, "height" : 15, "weight" : 395, "base_experience" : 216, "type_1" : "normal", "type_2" : "flying", "attack" : 80, "defense" : 75, "hp" : 83, "special_attack" : 70, "special_defense" : 70, "speed" : 101, "ability_1" : "keen-eye", "ability_2" : "tangled-feet", "ability_hidden" : "big-pecks", "color_1" : "#A8A878", "color_2" : "#A890F0", "color_f" : "#A8A295", "egg_group_1" : "flying", "egg_group_2" : "NA", "url_image" : "18.png", "generation_id" : 1, "evolves_from_species_id" : 17, "evolution_chain_id" : 6, "shape_id" : 9, "shape" : "wings" }
{ "_id" : ObjectId("59f19a4a0174c5523085108d"), "id" : 10073, "pokemon" : "pidgeot-mega", "species_id" : 18, "height" : 220, "weight" : 505, "base_experience" : 261, "type_1" : "normal", "type_2" : "flying", "attack" : 80, "defense" : 80, "hp" : 83, "special_attack" : 135, "special_defense" : 80, "speed" : 121, "ability_1" : "no-guard", "ability_2" : "NA", "ability_hidden" : "NA", "color_1" : "#A8A878", "color_2" : "#A890F0", "color_f" : "#A8A295", "egg_group_1" : "flying", "egg_group_2" : "NA", "url_image" : "NA", "generation_id" : "NA", "evolves_from_species_id" : "NA", "evolution_chain_id" : "NA", "shape_id" : "NA", "shape" : "NA" }
```
