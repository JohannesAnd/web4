#!/bin/sh

mongoimport -d web4 -c pokemons --type csv --file Pokemon.csv --headerline
