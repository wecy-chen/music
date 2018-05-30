import {commonParams} from './config'
import axios from 'axios'

export function getLyric(mid) {
  const url = '/api/lyric/fcgi-bin/fcg_query_lyric_new.fcg' //api代理好了
  //原地址:var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

  const data = Object.assign({}, commonParams, { //参数
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'jsonp'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    //console.log(res.data)
    //处理字符串数据MusicJsonCallback()
    var ret=res.data
    if(typeof ret==="string"){
      var reg=/^\w+\(({[^()]+})\)$/
      var matches=ret.match(reg)
      if(matches){
        ret=JSON.parse(matches[1]) //括号里的内容
      }
    }
    return Promise.resolve(ret)
  })
}
