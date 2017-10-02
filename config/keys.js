if(process.env.NODE_ENV === 'production'){
  //return the production keys
  module.exports = require('./prod');
}else{
  //return the development keys
  module.exports = require('./dev');
}
