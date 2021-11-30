'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

async function get_all_item(input) {
    if (!input) {
        throw "Missing argument.";
    }
    if (typeof input != "string") {
        throw "Invalid argument (not string).";
    }
    if (input.trim() == "") {
        throw "Invalid argument (empty string).";
    }

    const valid_inputs = ['base', 'protein', 'topping', 'sauce'];

    if (!valid_inputs.includes(input)) {
        throw "Invalid argument: input is not an index in elastic"
    }

    const { body } = await client.search({
        index: input,
        body: {
            query: {
                match_all: { }
            }
        }
    })

    let data = body.hits.hits;
    let return_array = [];
    for (let i = 0; i < data.length; i++) {
        let obj = data[i]._source;
        return_array.push(obj);
    }

    // console.log(return_array)
    return return_array
}

async function filtered_base() {
    // all the options that are gluten free are the same as vegan options
    // so we can be lazy here and this will work whether someone checks
    // gluten free, vegan, or both
    const { body } = await client.search({
        index: 'base',
        body: {
            query: {
                match: { gluten_free: true }
            }
        }
    })

    let data = body.hits.hits;
    let return_array = [];
    for (let i = 0; i < data.length; i++) {
        let obj = data[i]._source;
        return_array.push(obj);
    }

    // console.log(return_array)
    return return_array
}

async function filtered_protein_or_toppings(input, gluten_free, raw, vegan) {
    if (input == null || gluten_free == null || raw == null || vegan == null) {
        throw "Missing argument.";
    }
    if (typeof input != "string" ||typeof gluten_free != "boolean" || typeof raw != "boolean" || typeof vegan != "boolean") {
        throw "Invalid argument (not bool/string).";
    }
    if (input.trim() == "") {
        throw "Invalid argument (empty string).";
    }

    const valid_inputs = ['protein', 'topping'];

    if (!valid_inputs.includes(input)) {
        throw "Invalid argument: input is not an index in elastic"
    }

    const { body } = await client.msearch({
        body: [
            {index: input},
            {query: {match: {gluten_free: gluten_free}}, size: 100},

            {index: input},
            {query: {match: {raw: raw}}, size: 100},

            {index: input},
            {query: {match: {vegan: vegan}}, size: 100}

        ]
        
    })

    let data = body.responses;

    let temp_array0 = [];
    let temp_array1 = [];
    let temp_array2 = [];
    for (let i = 0; i < data.length; i++) {
        let curr_array = data[i].hits.hits;
        for (let j = 0; j < curr_array.length; j++) {
            let to_add = curr_array[j]._source;
            if (i == 0) {
                temp_array0.push(JSON.stringify(to_add));
            }
            else if (i == 1) {
                temp_array1.push(JSON.stringify(to_add));
            }
            else {
                temp_array2.push(JSON.stringify(to_add));
            }
        }
    }

    let intersection = temp_array0.filter(x => temp_array1.includes(x));
    let intersection2 = intersection.filter(x => temp_array2.includes(x));

    let return_array = intersection2.map(x => JSON.parse(x));
    // console.log(return_array)
    return return_array
}

async function filtered_sauce(gluten_free, vegan) {
    if (gluten_free == null || vegan == null) {
        throw "Missing argument.";
    }
    if (typeof gluten_free != "boolean" || typeof vegan != "boolean") {
        throw "Invalid argument (not bool/string).";
    }

    const { body } = await client.msearch({
        body: [
            {index: 'sauce'},
            {query: {match: {gluten_free: gluten_free}}, size: 100},

            {index: 'sauce'},
            {query: {match: {vegan: vegan}}, size: 100}

        ]
        
    })

    let data = body.responses;

    let temp_array0 = [];
    let temp_array1 = [];
    for (let i = 0; i < data.length; i++) {
        let curr_array = data[i].hits.hits;
        for (let j = 0; j < curr_array.length; j++) {
            let to_add = curr_array[j]._source;
            if (i == 0) {
                temp_array0.push(JSON.stringify(to_add));
            }
            else if (i == 1) {
                temp_array1.push(JSON.stringify(to_add));
            }
        }
    }

    let intersection = temp_array0.filter(x => temp_array1.includes(x));


    let return_array = intersection.map(x => JSON.parse(x));
    // console.log(return_array)
    return return_array
}

module.exports = {
    get_all_item,
    filtered_base,
    filtered_protein_or_toppings,
    filtered_sauce
}

