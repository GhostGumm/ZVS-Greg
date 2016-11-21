const ZETAPUSH_API_URL = 'http://hq.zpush.io:9080/zbo/pub/business/'
const ZETAPUSH_SANDBOX_ID = 'dq3eV2XI'
const ZETAPUSH_PROXY_URL =  `http://file.zpush.ovh/${ZETAPUSH_SANDBOX_ID}/cnvrst_hdfs/`

export const environment = {
  production: false,
  ZETAPUSH_API_URL, ZETAPUSH_PROXY_URL, ZETAPUSH_SANDBOX_ID
}
