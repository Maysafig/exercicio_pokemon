//criando uma variável para acessar os filmes
const pokedexJson = require('./models/pokedex.json')

//ativando a biblioteca express para facilitar apresentação dos valores
const express = require('express');
const app = express()

//esta fazendo o body parser
app.use(express.json())

//conferir no terminal se a porta está funcionando
app.listen(3030,() => {
    console.log("Servidor na porta 3030")
})

//conferir se esta funcionando no postaman

app.get("/", (request, response) => {
    response.status(200).json([
        {
            "message" : "Deu certo, API do Pokemon"
        }

    ])
})

//Retornar todos os pokemons
app.get("/pokedex", (request, response) => {
    response.status(200).send(pokedexJson)
})

//Retornar um pokemon pelo id
app.get("/pokedex/:id", (request, response) => {

    let idRequest = request.params.id
    // response.send(idRequest)

    let pokemonEncontrado = pokedexJson.find(pokemon => pokemon.id == idRequest)

    response.status(200).send(pokemonEncontrado)
})

//Retornar um pokemon pelo tipo(type)
app.get("/pokedex/buscar/type", (request, response) => {

    let typeRequest = request.query.type.toLowerCase()

     let pokemonEncontrado = pokedexJson.filter( pokemon => pokemon.type.includes(typeRequest))

    response.status(200).send(pokemonEncontrado)
})

//Retornar um pokemon pelo nome(name)
app.get("/pokedex/buscar/name", (request, response) => {

    let nameRequest = request.query.name.toLowerCase()

    let pokemonEncontrado = pokedexJson.filter( pokemon => pokemon.name.toLowerCase().includes(nameRequest))

    response.status(200).send(pokemonEncontrado)
})

//Criar um novo pokemon
app.post("/pokedex/criar", (request, response) => {

    let nameRequest = request.body.name
    let typeRequest = request.body.type
    let statsRequest = request.body.stats

    let novoPokemon = {

        id: (pokedexJson.length) + 1,
        name: nameRequest,
        type: typeRequest,
        stats: statsRequest
    }

    // //Outra forma de criar 
    // let pokemon = request.body

    // let novoPokemon = {
        // id: (pokedexJson.length) + 1,
        // "name": "pokemon.name",
        // "type": pokemon.type,
        // "stats": {
        //     "total": pokemon.total,
        //     "hp": pokemon.hp,
        //     "attack": pokemon.attack,
        //     "defense": pokemon.defense,
        //     "sp-atk": pokemon.sp-atk,
        //     "sp-def": pokemon.sp-def,
        //     "speed": pokemon.speed
    //     }
    // }


    pokedexJson.push(novoPokemon) 
        
    response.status(201).json(
        [{
            "mensagem" : "Foi incluído um novo pokemon na Pokedex",
            novoPokemon
        }]
    )
})