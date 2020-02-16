
const Product = require('./product.model');
const _ = require('lodash');

/*
** get newly recommended products for home page if logged in
*/
/*export const getRecommendedProducts = (req, res) => {
  Order.find({products: {$in: [req.params.id]}}).sort({orderDate: 'desc'}).limit(100).exec(function(err, orders) {
    if(err) { return res.status(501).send(err); }

    //console.log('recommended err', err);
    //console.log('recommended orders', orders);

    let pCount = {};
    for(let o of orders) {
      for(let p of o.products) {
        pCount[p] = (pCount[p] || 0) + 1;
      }
    }
    //console.log('recommended products', pCount);

    let sortedArr = Object.keys(pCount).sort(function(a,b) { return pCount[b] - pCount[a] })
    let idx = sortedArr.indexOf(req.params.id);
    sortedArr.splice(idx, 1);
    let sliced = sortedArr.slice(req.query.offset, req.query.offset + 3);

    //console.log('sorted products', sortedArr);
    //console.log('slice', sliced);

    let moreProducts = sortedArr.length > req.query.offset + 3 ? true : false;

    Product.find({_id: {$in: sliced}}).select('-reviews -pictures -inventory').populate('displayPicture').exec(function(err, products) {
      if(err) { return res.status(501).send(err); }
      return res.status(200).json({products: products, moreProducts: moreProducts});
    })
  })
}*/

/*
** get a collection of Products with most recent priceHistory based on search params
*/
const searchProducts = (req, res) => {
  const search = JSON.parse(req.query.search); // need JSON.parse??
  const pagination = JSON.parse(req.query.pagination);

  console.log('searchProducts args --> ', search);
  console.log('searchProducts pagination --> ', pagination);
  console.log('searchProducts sorting --> ', '');

  let searchObj = {};

  // basic search features
  if(search.name) { searchObj.name = new RegExp(search.name, "i"); }
  if(search.minPrice >= 0) { searchObj.price["$gt"] = search.minPrice; }
  if(search.maxPrice >= 0) { searchObj.price["$lt"] = search.maxPrice; }
  
  // arrays from checkboxes
  if(search.brand && search.brand.length > 0) { searchObj.brand = { $in: search.brand }; }
  if(search.category && search.category.length > 0) { searchObj.category = { $in: search.category }; }
  if(search.size && search.size.length > 0) { searchObj.size = { $in: search.size }; }
  if(search.color && search.color.length > 0) { searchObj.color = { $in: search.color }; }

  // boolean filters
  // add all-time-low + 12-week-low filters
  // add 5% from all-time-low filter

  Product.count(searchObj, (err, count) => {
    if(err) return res.status(501).send(err);

    let query = Product.find(searchObj);

    // apply pagination
    if(pagination.currentPage && pagination.pageSize) {
      query = query.skip((pagination.currentPage - 1) * pagination.pageSize)
                   .limit(pagination.pageSize);
    }

    // apply sorting
    /*if(false) {
      query = query.sort();
    }*/

    query.exec(function (err, products) {
        if(err) return res.status(501).send(err);

        // should filter 'priceHistory' for most recent price here or at client???
        products = products.map((val) => {
          val.priceHistory = val.priceHistory[val.priceHistory.length - 1];
          return val;
        });

        return res.status(200).json({products, count});
    });
  });
}

/*
** get one product with full priceHistory
*/
const getProduct = (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if(err) return res.status(401).send(err);
    return res.status(200).json({product});
  })
}

/*
** Used to add/update product entry
*/
const upsertProduct = (data) => {
  console.log('upsert data --> ', data);
  if(!data.url || !data.name || !data.pid) {
    console.error('Invalid arguments!');
    return;
  }

  Product.findOne({ pid: data.pid }).then((product) => {
    console.log('upsert lookup --> ', product);
    
    // create new product db entry
    if(!product) {
      return Product.create(data).then((product) => {
        console.log('product --> ', product);
        return product;
      }).catch((err) => {
        console.error('Unable to create Product. Error --> ', err);
        throw err;
      });

    // update existing product db entry
    } else {
      product.priceHistory.push(data.priceHistory[0]);
      return product.save().then((product) => {
        console.log('Successfully updated Product.');
      }).catch((err) => {
        console.error('Unable to update Product. Error --> ', err);
        throw err;
      });
    }
  }).catch((err) => {
    console.error('Unable to locate product. Error --> ', err);
    throw err;
  })
};


module.exports = {
  searchProducts,
  getProduct, 
  upsertProduct, 
}



/*
  return Product.findOneAndUpdate({ pid: data.pid }, data, { upsert: true, new: true }).then((product) => {
    console.log('product --> ', product);
    return product;
  }).catch((err) => {
    console.error('Unable to create Product --> ', err);
    throw err;
  });
  */

/*const createProduct = (data) => {
  if(!data.url || !data.name) {
    console.error('Invalid arguments!');
    return;
  }

  return Product.create(data).then((product) => {
    console.log('product --> ', product);
    return product;
  }).catch((err) => {
    console.error('Unable to create Product --> ', err);
    throw err;
  });
};*/

/*const updateProduct = (id, data) => {
  if(!data.url || !data.name) {
    console.error('Invalid arguments!');
    return;
  }

  return Product.updateOne(id, data).then((product) => {
    console.log('product --> ', product);
    return product;
  }).catch((err) => {
    console.error('Unable to create Product --> ', err);
    throw err;
  });
}*/

