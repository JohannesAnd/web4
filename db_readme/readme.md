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

This will create a collection 'monsters' in the database (The drop command makes it drop the existing collection if it exist). The --headerline tells it how to interpret the fields (first line in the csv).

*Note: In the original dataset from the zip file the ID is noted with a #. This must be changed to 'Id' for mongo to be able to import it. This is already done in the included pokemon.csv, but if you unzip it yourself make sure to change this.*

```
$ mongoimport --db pokemon --collection monsters --drop --type csv --headerline --file pokemon.csv
2017-10-21T21:01:26.284+0200	connected to: localhost
2017-10-21T21:01:26.284+0200	dropping: pokemon.monsters
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
> use pokemon
switched to db pokemon
```

- Now we can query using regex inside JSON.
```
> db.monsters.find({Id:25})
{ "_id" : ObjectId("59eb998615055449ebf3248f"), "Id" : 25, "Name" : "Pikachu", "Type 1" : "Electric", "Type 2" : "", "Total" : 320, "HP" : 35, "Attack" : 55, "Defense" : 40, "Sp" : { " Atk" : 50, " Def" : 50 }, "Speed" : 90, "Generation" : 1, "Legendary" : "False" }
> db.monsters.find({Name:/^Pidg/})
{ "_id" : ObjectId("59eb998615055449ebf32485"), "Id" : 17, "Name" : "Pidgeotto", "Type 1" : "Normal", "Type 2" : "Flying", "Total" : 349, "HP" : 63, "Attack" : 60, "Defense" : 55, "Sp" : { " Atk" : 50, " Def" : 50 }, "Speed" : 71, "Generation" : 1, "Legendary" : "False" }
{ "_id" : ObjectId("59eb998615055449ebf32486"), "Id" : 16, "Name" : "Pidgey", "Type 1" : "Normal", "Type 2" : "Flying", "Total" : 251, "HP" : 40, "Attack" : 45, "Defense" : 40, "Sp" : { " Atk" : 35, " Def" : 35 }, "Speed" : 56, "Generation" : 1, "Legendary" : "False" }
{ "_id" : ObjectId("59eb998615055449ebf32487"), "Id" : 18, "Name" : "PidgeotMega Pidgeot", "Type 1" : "Normal", "Type 2" : "Flying", "Total" : 579, "HP" : 83, "Attack" : 80, "Defense" : 80, "Sp" : { " Atk" : 135, " Def" : 80 }, "Speed" : 121, "Generation" : 1, "Legendary" : "False" }
{ "_id" : ObjectId("59eb998615055449ebf32488"), "Id" : 18, "Name" : "Pidgeot", "Type 1" : "Normal", "Type 2" : "Flying", "Total" : 479, "HP" : 83, "Attack" : 80, "Defense" : 75, "Sp" : { " Atk" : 70, " Def" : 70 }, "Speed" : 101, "Generation" : 1, "Legendary" : "False" }
```
