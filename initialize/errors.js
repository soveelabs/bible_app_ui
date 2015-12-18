var errorface = require('errorface');

function errors(app) {
  // setup error handling
  if(app.get('env') === 'development'){
    app.use(errorface.errorHandler())
  } else {
    app.use(function (req, res, next){
      res.status(404).json({error: "Not found"});
    });

    app.use(function(err, req, res, next){
      res.status(500).json({error: "There was an error"});
    });
  }
};

exports = module.exports = errors; 
