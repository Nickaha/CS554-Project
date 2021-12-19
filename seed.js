'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
const uuid = require('uuid');

async function run () {
  // clean up db 
  await client.indices.delete({
    index: "*"
  })

  await client.index({
    index: 'base',
    id: '1',
    body: {
      item: 'white rice',
      gluten_free: true,
      vegan: true
    }
  })

  await client.index({
    index: 'base',
    id: '2',
    body: {
      item: 'brown rice',
      gluten_free: true,
      vegan: true
    }
  })

  await client.index({
    index: 'base',
    id: '3',
    body: {
      item: 'quinoa',
      gluten_free: true,
      vegan: true
    }
  })

  await client.index({
    index: 'base',
    id: '4',
    body: {
      item: 'egg noodles',
      gluten_free: false,
      vegan: false
    }
  })

  await client.indices.refresh({ index: 'base' })

  await client.index({
    index: 'protein',
    id: '1',
    body: {
      item: 'chicken',
      gluten_free: true,
      raw: false,
      vegan: false
    }
  })

  await client.index({
    index: 'protein',
    id: '2',
    body: {
      item: 'steak',
      gluten_free: true,
      raw: false,
      vegan: false
    }
  })

  await client.index({
    index: 'protein',
    id: '3',
    body: {
      item: 'pulled pork',
      gluten_free: true,
      raw: false,
      vegan: false
    }
  })

  await client.index({
    index: 'protein',
    id: '4',
    body: {
      item: 'beyond meat',
      gluten_free: true,
      raw: false,
      vegan: true
    }
  })

  await client.index({
    index: 'protein',
    id: '5',
    body: {
      item: 'fried tofu',
      gluten_free: true,
      raw: false,
      vegan: true
    }
  })

  await client.index({
    index: 'protein',
    id: '6',
    body: {
      item: 'salmon',
      gluten_free: true,
      raw: true,
      vegan: false
    }
  })

  await client.index({
    index: 'protein',
    id: '7',
    body: {
      item: 'tuna',
      gluten_free: true,
      raw: true,
      vegan: false
    }
  })

  await client.index({
    index: 'protein',
    id: '8',
    body: {
      item: 'eel',
      gluten_free: false,
      raw: false,
      vegan: false
    }
  })

  await client.indices.refresh({ index: 'protein' })

  await client.index({
    index: 'topping',
    id: '1',
    body: {
      item: 'romaine lettuce',
      gluten_free: true,
      raw: true,
      vegan: true
    }
  })

  await client.index({
    index: 'topping',
    id: '2',
    body: {
      item: 'tomato',
      gluten_free: true,
      raw: true,
      vegan: true
    }
  })

  await client.index({
    index: 'topping',
    id: '3',
    body: {
      item: 'corn',
      gluten_free: true,
      raw: false,
      vegan: true
    }
  })

  await client.index({
    index: 'topping',
    id: '4',
    body: {
      item: 'cucumber',
      gluten_free: true,
      raw: true,
      vegan: true
    }
  })

  await client.index({
    index: 'topping',
    id: '5',
    body: {
      item: 'avocado',
      gluten_free: true,
      raw: true,
      vegan: true
    }
  })

  await client.index({
    index: 'topping',
    id: '6',
    body: {
      item: 'green pepper',
      gluten_free: true,
      raw: false,
      vegan: true
    }
  })

  await client.index({
    index: 'topping',
    id: '7',
    body: {
      item: 'sweet onion',
      gluten_free: true,
      raw: false,
      vegan: true
    }
  })

  await client.index({
    index: 'topping',
    id: '8',
    body: {
      item: 'carrot',
      gluten_free: true,
      raw: true,
      vegan: true
    }
  })

  await client.index({
    index: 'topping',
    id: '9',
    body: {
      item: 'pineapple',
      gluten_free: true,
      raw: true,
      vegan: true
    }
  })

  await client.index({
    index: 'topping',
    id: '10',
    body: {
      item: 'cheese',
      gluten_free: true,
      raw: false,
      vegan: false
    }
  })

  await client.index({
    index: 'topping',
    id: '11',
    body: {
      item: 'guacamole',
      gluten_free: true,
      raw: true,
      vegan: true
    }
  })

  await client.index({
    index: 'topping',
    id: '12',
    body: {
      item: 'kani salad',
      gluten_free: true,
      raw: false,
      vegan: false
    }
  })

  await client.index({
    index: 'topping',
    id: '13',
    body: {
      item: 'seaweed salad',
      gluten_free: true,
      raw: true,
      vegan: true
    }
  })

  await client.indices.refresh({ index: 'topping' })

  await client.index({
    index: 'sauce',
    id: '1',
    body: {
      item: 'sour cream',
      gluten_free: true,
      vegan: false
    }
  })

  await client.index({
    index: 'sauce',
    id: '2',
    body: {
      item: 'poke sauce',
      gluten_free: false,
      vegan: true
    }
  })

  await client.index({
    index: 'sauce',
    id: '3',
    body: {
      item: 'teriyaki sauce',
      gluten_free: false,
      vegan: true
    }
  })

  await client.index({
    index: 'sauce',
    id: '4',
    body: {
      item: 'sweet and sour sauce',
      gluten_free: true,
      vegan: true
    }
  })

  await client.index({
    index: 'sauce',
    id: '5',
    body: {
      item: 'spicy mayo',
      gluten_free: false,
      vegan: false
    }
  })

  await client.indices.refresh({ index: 'sauce' })

  await client.index({
    index: 'premade-bowls',
    id: '1',
    body: {
      name: 'Gold Standard Chicken',
      base: 'white rice',
      protein: ['chicken'],
      topping: ['sweet onion', 'green pepper', 'pineapple'],
      sauce: ['teriyaki sauce'],
      gluten_free: false,
      vegan: false,
      price: 11.00
    }
  })

  await client.index({
    index: 'premade-bowls',
    id: '2',
    body: {
      name: 'Fish Lover',
      base: 'white rice',
      protein: ['salmon', 'tuna'],
      topping: ['corn', 'cucumber', 'kani salad', 'seaweed salad'],
      sauce: ['poke sauce'],
      gluten_free: false,
      vegan: false,
      price: 14.70
    }
  })

  await client.index({
    index: 'premade-bowls',
    id: '3',
    body: {
      name: 'I Love Chipotle',
      base: 'brown rice',
      protein: ['steak'],
      topping: ['romaine lettuce', 'cheese', 'guacamole'],
      sauce: ['sour cream'],
      gluten_free: true,
      vegan: false,
      price: 13.40
    }
  })

  await client.index({
    index: 'premade-bowls',
    id: '4',
    body: {
      name: 'No Meat For Me',
      base: 'brown rice',
      protein: ['beyond meat', 'fried tofu'],
      topping: ['romaine lettuce', 'sweet onion', 'green pepper'],
      sauce: ['teriyaki sauce'],
      gluten_free: true,
      vegan: true,
      price: 14.40
    }
  })

  await client.index({
    index: 'reviews',
    body: {
      name: 'Customer A',
      review: 'All dishes are delicious!!',
      date: "12/15/2021 16:44"
    }
  })

  // remember to comment out this dummy data out when you submit
  let first_uuid = uuid.v4();
  let second_uuid = uuid.v4();
  let third_uuid = uuid.v4();
  await client.index({
    index: 'orders',
    id: first_uuid,
    body: {
      name: "My Order",
      base: "white rice",
      protein: ['steak'],
      topping: ['romaine lettuce', 'sweet onion', 'green pepper'],
      sauce: ['teriyaki sauce'],
      served: false,
      id: first_uuid,
    }
  })

  await client.index({
    index: 'orders',
    id: second_uuid,
    body: {
      user_id: "91e51f28-b551-4c9f-93be-dc4faef4b114",
      name: "My Order2",
      base: "white rice",
      protein: ['steak'],
      topping: ['romaine lettuce', 'sweet onion', 'green pepper'],
      sauce: ['teriyaki sauce'],
      served: false,
      id: second_uuid,
    }
  })
  await client.index({
    index: 'orders',
    id: third_uuid,
    body: {
      user_id: "91e51f28-b551-4c9f-93be-dc4faef4b114",
      name: "My Order",
      base: "white rice",
      protein: ['steak'],
      topping: ['romaine lettuce', 'sweet onion', 'green pepper'],
      sauce: ['teriyaki sauce'],
      served: true,
      id: third_uuid,
    }
  })
 

  await client.indices.refresh({ index: 'premade-bowls' })

  await client.indices.refresh({ index: 'reviews' })

  await client.indices.refresh({ index: 'orders' })

  console.log("Seeding done...")

}

run().catch(console.log)