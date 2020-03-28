
import Watch from './watch.model';

/*
** get collection of Watches by 'userId'
**/
export const getWatchlist = (req, res) => {
  if(!req.query.userId) {
    return res.status(500).send('Invalid Arguments!');
  }

  Watch.find({ userId: req.query.userId }).then((watchlist) => {
    console.log('getWatchlist success --> ', watchlist);
    return res.status(200).json({watchlist});
  }).catch((err) => {
    console.log('getWatchlist err --> ', err);
    return res.status(500).send(err);
  });
}

/*
** create a Watch to track a product
*/
export const createWatch = (req, res) => {
  if(!req.body.userId || !req.body.productId || !req.body.targetPrice) {
    return res.status(500).send('Invalid Arguments!');
  }

  Watch.create(req.body).then((watch) => {
    console.log('createWatch success --> ', watch);
    return res.status(200).json({watch});
  }).catch((err) => {
    console.log('createWatch err --> ', err);
    return res.status(500).send(err);
  })
}

/*
** delete an existing Watch
*/
export const deleteWatch = (req, res) => {
  Watch.findByIdAndDelete(req.params.id).then(() => {
    return res.status(200).end();
  }).catch((err) => {
    console.log('deleteWatch err --> ', err);
    return res.status(500).send(err);
  })
}

