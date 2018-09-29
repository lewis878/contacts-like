import jsonp from '../common/js/jsonp'
export default function () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  return jsonp({
    url,
    param:'jsonpCallback',
    query:{
      g_tk: 0,
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      format: 'jsonp',
      channel: 'singer',
      page: 'list',
      key: 'all_all_all',
      pagesize: 100,
      pagenum: 1,
      hostUin: 0,
      needNewCode: 0,
      platform: 'yqq'
    }
  })
}
