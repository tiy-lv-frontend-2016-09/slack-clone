import axios from 'axios';
import Cookie from 'js-cookie';

// 'api-token-auth':"Authorization: Token ${token}";
var instance = axios.create();

instance.new = function (url) {
  this.defaults.baseURL = url;
  // this.defaults.headers = {'Content-Type' : 'application/x-www-form-urlencoded'};
};

instance.setTokenPath = function (path = '/token') {
  this.tokenPath = path;
}

instance.getTokenPath = function () {
  return this.tokenPath || '/token';
}

if (Cookie.get('token')) {
  var token = Cookie.get('token');
  instance.interceptors.request.use(function(config){
    config.headers['Authorization'] = 'Token ' + token;
    return config;
  });
}

instance.login = function(user, pass, cb) {
  return this.post(this.getTokenPath(), {username: user, password:pass})
    .then(resp => {
      var token = resp.data.token;
      Cookie.set('token', token);
      this.interceptors.request.use(config => {
        config.headers['Authorization'] = 'Token ' + token;
        return config;
      })
      cb()
    })
};

instance.logout = function() {
  Cookie.remove('token');
}

export default instance;
