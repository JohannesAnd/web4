#!/bin/sh

mongoimport -d web4 -c pokemons --type csv --drop --file Pokemon.csv --headerline
