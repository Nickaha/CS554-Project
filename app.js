const express = require('express');
const app = express();
const data = require("./data");
const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient();
const cors = require('cors');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// get_all versions without filters
// base
app.get('/base', async (req, res, next) => {
  let cachePageExists = await client.getAsync('all_base');
  if (cachePageExists) {
      let json_version = JSON.parse(cachePageExists);
      res.json(json_version);
  } else {
      next();
  }
});


app.get('/base', async (req, res) => {
    try {
      const results = await data.get_all_item('base');
      let json_results = JSON.stringify(results)
      let cachedForId = await client.setAsync(
          "all_base",
          json_results
      );
      res.json(results)
    } catch (e) {
        const er = {
          title: "ERROR",
          errors: e.message
        }
      res.status(404).json(er);
    }
  }
);

// protein
app.get('/protein', async (req, res, next) => {
  let cachePageExists = await client.getAsync('all_protein');
  if (cachePageExists) {
      let json_version = JSON.parse(cachePageExists);
      res.json(json_version);
  } else {
      next();
  }
});


app.get('/protein', async (req, res) => {
    try {
      const results = await data.get_all_item('protein');
      let json_results = JSON.stringify(results)
      let cachedForId = await client.setAsync(
          "all_protein",
          json_results
      );
      res.json(results)
    } catch (e) {
        const er = {
          title: "ERROR",
          errors: e.message
        }
      res.status(404).json(er);
    }
  }
);

// topping
app.get('/topping', async (req, res, next) => {
  let cachePageExists = await client.getAsync('all_topping');
  if (cachePageExists) {
      let json_version = JSON.parse(cachePageExists);
      res.json(json_version);
  } else {
      next();
  }
});


app.get('/topping', async (req, res) => {
    try {
      const results = await data.get_all_item('topping');
      let json_results = JSON.stringify(results)
      let cachedForId = await client.setAsync(
          "all_topping",
          json_results
      );
      res.json(results)
    } catch (e) {
        const er = {
          title: "ERROR",
          errors: e.message
        }
      res.status(404).json(er);
    }
  }
);

// sauce
app.get('/sauce', async (req, res, next) => {
  let cachePageExists = await client.getAsync('all_sauce');
  if (cachePageExists) {
      let json_version = JSON.parse(cachePageExists);
      res.json(json_version);
  } else {
      next();
  }
});


app.get('/sauce', async (req, res) => {
    try {
      const results = await data.get_all_item('sauce');
      let json_results = JSON.stringify(results)
      let cachedForId = await client.setAsync(
          "all_sauce",
          json_results
      );
      res.json(results)
    } catch (e) {
        const er = {
          title: "ERROR",
          errors: e.message
        }
      res.status(404).json(er);
    }
  }
);

// filtered versions 
// base 
// like mentioned before this can be done lazy version
// if someone doesn't use filter then it uses /base route
app.get('/base/filter', async (req, res, next) => {
  let cachePageExists = await client.getAsync('filtered_base');
  if (cachePageExists) {
      let json_version = JSON.parse(cachePageExists);
      res.json(json_version);
  } else {
      next();
  }
});


app.get('/base/filter', async (req, res) => {

    try {
      const results = await data.filtered_base();
      let json_results = JSON.stringify(results)
      let cachedForId = await client.setAsync(
          "filtered_base",
          json_results
      );
      res.json(results)
    } catch (e) {
        const er = {
          title: "ERROR",
          errors: e.message
        }
      res.status(404).json(er);
    }
  }
);

// protein
app.get('/protein/filter', async (req, res, next) => {
  let id_string = "";
  if (Number(req.query.gluten_free) == 1) {
    id_string += "1";
  }
  if (Number(req.query.gluten_free) == 0) {
    id_string += "0";
  }
  if (Number(req.query.raw) == 1) {
    id_string += "1";
  }
  if (Number(req.query.raw) == 0) {
    id_string += "0";
  }
  if (Number(req.query.vegan) == 1) {
    id_string += "1";
  }
  if (Number(req.query.vegan) == 0) {
    id_string += "0";
  }
  let input = 'filtered_protein' + id_string;
  let cachePageExists = await client.getAsync(input);
  if (cachePageExists) {
      let json_version = JSON.parse(cachePageExists);
      res.json(json_version);
  } else {
      next();
  }
});

app.get('/protein/filter', async (req, res) => {
    
    let id_string = "";
    let gluten_free = null;
    let raw = null;
    let vegan = null;
    if (Number(req.query.gluten_free) == 1) {
      id_string += "1";
      gluten_free = true;
    }
    if (Number(req.query.gluten_free) == 0) {
      id_string += "0";
      gluten_free = false;
    }
    if (Number(req.query.raw) == 1) {
      id_string += "1";
      raw = true;
    }
    if (Number(req.query.raw) == 0) {
      id_string += "0";
      raw = false;
    }
    if (Number(req.query.vegan) == 1) {
      id_string += "1";
      vegan = true;
    }
    if (Number(req.query.vegan) == 0) {
      id_string += "0";
      vegan = false;
    }

    try {
      const results = await data.filtered_protein_or_toppings('protein', gluten_free, raw, vegan);
      let json_results = JSON.stringify(results)
      let cachedForId = await client.setAsync(
          "filtered_protein" + id_string,
          json_results
      );
      res.json(results)
    } catch (e) {
        const er = {
          title: "ERROR",
          errors: e
        }
      res.status(404).json(er);
    }
  }
);

// topping
app.get('/topping/filter', async (req, res, next) => {
  let id_string = "";
  if (Number(req.query.gluten_free) == 1) {
    id_string += "1";
  }
  if (Number(req.query.gluten_free) == 0) {
    id_string += "0";
  }
  if (Number(req.query.raw) == 1) {
    id_string += "1";
  }
  if (Number(req.query.raw) == 0) {
    id_string += "0";
  }
  if (Number(req.query.vegan) == 1) {
    id_string += "1";
  }
  if (Number(req.query.vegan) == 0) {
    id_string += "0";
  }
  let input = 'filtered_topping' + id_string;
  let cachePageExists = await client.getAsync(input);
  if (cachePageExists) {
      let json_version = JSON.parse(cachePageExists);
      res.json(json_version);
  } else {
      next();
  }
});

app.get('/topping/filter', async (req, res) => {
    
    let id_string = "";
    let gluten_free = null;
    let raw = null;
    let vegan = null;
    if (Number(req.query.gluten_free) == 1) {
      id_string += "1";
      gluten_free = true;
    }
    if (Number(req.query.gluten_free) == 0) {
      id_string += "0";
      gluten_free = false;
    }
    if (Number(req.query.raw) == 1) {
      id_string += "1";
      raw = true;
    }
    if (Number(req.query.raw) == 0) {
      id_string += "0";
      raw = false;
    }
    if (Number(req.query.vegan) == 1) {
      id_string += "1";
      vegan = true;
    }
    if (Number(req.query.vegan) == 0) {
      id_string += "0";
      vegan = false;
    }

    try {
      const results = await data.filtered_protein_or_toppings('topping', gluten_free, raw, vegan);
      let json_results = JSON.stringify(results)
      let cachedForId = await client.setAsync(
          "filtered_topping" + id_string,
          json_results
      );
      res.json(results)
    } catch (e) {
        const er = {
          title: "ERROR",
          errors: e
        }
      res.status(404).json(er);
    }
  }
);

// sauce
app.get('/sauce/filter', async (req, res, next) => {
  let id_string = "";
  if (Number(req.query.gluten_free) == 1) {
    id_string += "1";
  }
  if (Number(req.query.gluten_free) == 0) {
    id_string += "0";
  }
  if (Number(req.query.vegan) == 1) {
    id_string += "1";
  }
  if (Number(req.query.vegan) == 0) {
    id_string += "0";
  }
  let input = 'filtered_sauce' + id_string;
  let cachePageExists = await client.getAsync(input);
  if (cachePageExists) {
      let json_version = JSON.parse(cachePageExists);
      res.json(json_version);
  } else {
      next();
  }
});

app.get('/sauce/filter', async (req, res) => {
    
    let id_string = "";
    let gluten_free = null;
    let vegan = null;
    if (Number(req.query.gluten_free) == 1) {
      id_string += "1";
      gluten_free = true;
    }
    if (Number(req.query.gluten_free) == 0) {
      id_string += "0";
      gluten_free = false;
    }
    if (Number(req.query.vegan) == 1) {
      id_string += "1";
      vegan = true;
    }
    if (Number(req.query.vegan) == 0) {
      id_string += "0";
      vegan = false;
    }

    try {
      const results = await data.filtered_sauce(gluten_free, vegan);
      let json_results = JSON.stringify(results)
      let cachedForId = await client.setAsync(
          "filtered_sauce" + id_string,
          json_results
      );
      res.json(results)
    } catch (e) {
        const er = {
          title: "ERROR",
          errors: e
        }
      res.status(404).json(er);
    }
  }
);

// premade bowl routes
app.get('/premade', async (req, res, next) => {
  let cachePageExists = await client.getAsync('all_premade');
  if (cachePageExists) {
      let json_version = JSON.parse(cachePageExists);
      res.json(json_version);
  } else {
      next();
  }
});

app.get('/premade', async (req, res) => {
  try {
    const results = await data.get_all_premade();
    let json_results = JSON.stringify(results)
    let cachedForId = await client.setAsync(
        "all_premade",
        json_results
    );
    res.json(results)
  } catch (e) {
      const er = {
        title: "ERROR",
        errors: e.message
      }
    res.status(404).json(er);
  }
}
);

// filtered premade
app.get('/premade/filter', async (req, res, next) => {
  let id_string = "";
  if (Number(req.query.gluten_free) == 1) {
    id_string += "1";
  }
  if (Number(req.query.gluten_free) == 0) {
    id_string += "0";
  }
  if (Number(req.query.vegan) == 1) {
    id_string += "1";
  }
  if (Number(req.query.vegan) == 0) {
    id_string += "0";
  }
  let input = 'filtered_premade' + id_string;
  let cachePageExists = await client.getAsync(input);
  if (cachePageExists) {
      let json_version = JSON.parse(cachePageExists);
      res.json(json_version);
  } else {
      next();
  }
});

app.get('/premade/filter', async (req, res) => {
    
    let id_string = "";
    let gluten_free = null;
    let vegan = null;
    if (Number(req.query.gluten_free) == 1) {
      id_string += "1";
      gluten_free = true;
    }
    if (Number(req.query.gluten_free) == 0) {
      id_string += "0";
      gluten_free = false;
    }
    if (Number(req.query.vegan) == 1) {
      id_string += "1";
      vegan = true;
    }
    if (Number(req.query.vegan) == 0) {
      id_string += "0";
      vegan = false;
    }

    try {
      const results = await data.filtered_premade(gluten_free, vegan);
      let json_results = JSON.stringify(results)
      let cachedForId = await client.setAsync(
          "filtered_premade" + id_string,
          json_results
      );
      res.json(results)
    } catch (e) {
        const er = {
          title: "ERROR",
          errors: e
        }
      res.status(404).json(er);
    }
  }
);


// post route for adding order to db
app.post('/order/post', async (req, res) => {
  const orderPostData = req.body;
    if (!orderPostData.user_id) {
      res.status(400).json({ error: 'You must provide user ID' });
      return;
    }
    if (!orderPostData.name) {
      res.status(400).json({ error: 'You must provide name' });
      return;
    }
    if (!orderPostData.base) {
      res.status(400).json({ error: 'You must provide base' });
      return;
    }
    if (!orderPostData.protein) {
      res.status(400).json({ error: 'You must provide protein' });
      return;
    }
    if (!orderPostData.topping) {
      res.status(400).json({ error: 'You must provide topping' });
      return;
    }
    if (!orderPostData.sauce) {
      res.status(400).json({ error: 'You must provide sauce' });
      return;
    }
    try {
      let order_to_add = {
          user_id: orderPostData.user_id,
          name: orderPostData.name,
          base: orderPostData.base,
          protein: orderPostData.protein,
          topping: orderPostData.topping,
          sauce: orderPostData.sauce,
          served: false
      }
      const result = await data.add_order(order_to_add);
      res.json({status: 'SUCCESS'});
    } catch (e) {
      res.status(500).json({ error: e });
  }
})

// get route for getting orders
app.get('/order', async (req, res) => {
  try {
    const results = await data.get_all_item('orders');
    res.json(results)
  } catch (e) {
      const er = {
        title: "ERROR",
        errors: e.message
      }
    res.status(404).json(er);
  }
}
);

//patch route
app.patch('/order/patch', async (req, res) => {
  let updated_order = req.body;
  console.log(req.body,"hgello");
  const results = await data.update_order(updated_order)
  res.json(updated_order)
}
);

// get route for reviews
// can't cache in redis because it is going to get 
// updated by new reviews that get posted 
app.get('/reviews', async (req, res) => {
  try {
    const results = await data.get_all_item('reviews');
    res.json(results)
  } catch (e) {
      const er = {
        title: "ERROR",
        errors: e.message
      }
    res.status(404).json(er);
  }
}
);

// post route for reviews 
app.post('/reviews/post', async (req, res) => {
  const reviewPostData = req.body;
    if (!reviewPostData.name) {
      res.status(400).json({ error: 'You must provide name' });
      return;
    }
    if (!reviewPostData.review) {
      res.status(400).json({ error: 'You must provide review' });
      return;
    }
    try {
      const result = await data.add_review(reviewPostData.name, reviewPostData.review,reviewPostData.date);
      res.json({status: 'SUCCESS'});
    } catch (e) {
      res.status(500).json({ error: e });
  }
})

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(3001, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3001');
});