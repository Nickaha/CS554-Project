'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

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
      item: 'tomatoe',
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
      raw: false,
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

  console.log("Seeding done...")

}

run().catch(console.log)