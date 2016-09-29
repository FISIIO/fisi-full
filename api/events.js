const fetch        = require('node-fetch');

const KEYS         = require(__dirname + '/../keys.json');

const BASE_PATH    = 'https://graph.facebook.com/v2.7';
const ACCESS_TOKEN = `access_token=${KEYS.appID}|${KEYS.appSecret}`;


function checkErrors(result){
  return new Promise((resolve, reject) => {
    result.error ? reject(result) : resolve(result);
  })
}

module.exports = function(api) {

  api.get('/events', (req, res) => {
    var path = BASE_PATH + '/fucitshipit/events' + `?${ACCESS_TOKEN}`;
    fetch(path)
      .then(result => result.json())
      .then(checkErrors)
      .then(result => res.send(result.data))
      .catch(err => res.status(500).send(err));
  })

  api.get('/events/:eventID', (req, res) => {
    var path = BASE_PATH + `/${req.params.eventID}` + `?${ACCESS_TOKEN}`;
    fetch(path)
      .then(result => result.json())
      .then(checkErrors)
      .then(result => res.send(result))
      .catch(err => res.status(500).send(err));
  });

}
