export default function jsonp(props = {}) {
  return new Promise((resolve, reject) => {
    let {url = '', param = 'callback', query = {}, timeout = 10 * 1000} = props;
    let script = document.createElement('script');

    let callbackName = query[param] = `__jsonp__${Date.now()}`;

    let arr = [];
    for (let key in query) {
      arr.push(key + '=' + query[key]);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + arr.join('&');

    script.src = url;
    document.body.appendChild(script);

    window[callbackName] = function (data) {
      resolve(data);
      clearTimeout(jsonp.timer);
      document.body.removeChild(script);
      delete window[callbackName];
    };

    jsonp.timer = setTimeout(() => {
      reject();
      document.body.removeChild(script);
      delete window[callbackName];
    }, timeout);

  })
}
