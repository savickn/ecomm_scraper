
import Product from './product.model';
import Price from '../PriceHistory/price.model';

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
export const searchProducts = (req, res) => {
  const search = JSON.parse(req.query.search); // need JSON.parse??
  const pagination = JSON.parse(req.query.pagination);

  console.log('searchProducts args --> ', search);
  console.log('searchProducts pagination --> ', pagination);
  console.log('searchProducts sorting --> ', '');

  let searchObj = {
    //outOfStock: false, 
  };

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

  console.log('searchObj --> ', searchObj);

  // apply pagination
  let skip = 0; 
  let limit = 100;
  if(pagination.currentPage && pagination.pageSize) {
    skip = (pagination.currentPage - 1) * pagination.pageSize;
    limit = pagination.pageSize;
  }

  // aggregation with pagination + count
  Product.aggregate([
    { $match: searchObj }, 
    { $group: {
      _id: "$pid", 
      assets: {$push: "$$ROOT"}
    }},
    { $facet: {
      paginatedResults: [{$skip: skip}, {$limit: limit}], 
      totalCount: [{$count: "count"}]
    }}, 
  ])
  .then(data => {
    console.log('searchProducts  --> ', data);
    let products = data[0].paginatedResults;
    let count = data[0].totalCount;
    return res.status(200).json({ products, count })
  })
  .catch(err => {
    console.log('searchProducts err --> ', err);
    return res.status(500).send(err);
  })
}

/*
** get one product with full priceHistory
*/
export const getProduct = (req, res) => {
  Product.find({ 'pid': req.params.pid })
    .populate('history', Price)
    .exec((err, product) => {
      console.log(err, '\n \n', product);
      if(err) return res.status(401).send(err);
      return res.status(200).json({ product });
  })
}

/*
** add/update product entry
*/
export const upsertProduct = (data) => {
  if(!data.url || !data.name || !data.pid || !data.color) {
    console.error('Invalid arguments!');
    return;
  }

  return Product.findOneAndUpdate({ pid: data.pid, color: data.color }, data, { new: true, runValidators: true, upsert: true }).then((product) => {
    //console.log('\n Success! Updated Product --> ', product);
    return product;
  }).catch((err) => {
    console.error('Unable to locate product. Error --> ', err);
    return err;
  })
};



/* OLD */
  /*Product.count(searchObj, (err, count) => {
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

    /*query.exec(function (err, products) {
        if(err) return res.status(501).send(err);
        return res.status(200).json({products, count});
    });
  });*/



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


/*
** Used to add/update product entry, OLD BUT WORKING
*/
/*const upsertProduct = (data) => {
  if(!data.url || !data.name || !data.pid) {
    console.error('Invalid arguments!');
    return;
  }

  return Product.findOne({ pid: data.pid }).then((product) => {
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
};*/


