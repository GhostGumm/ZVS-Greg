const ZETAPUSH_SERVEUR_URL = 'http://hq.zpush.io'
const ZETAPUSH_API_URL = `${ZETAPUSH_SERVEUR_URL}:9080/zbo/pub/business/`
const ZETAPUSH_SANDBOX_ID = 'Gfbi0sp8'
// const ZETAPUSH_PROXY_URL =  `http://file.zpush.ovh/${ZETAPUSH_SANDBOX_ID}/cnvrst_hdfs/`
const ZETAPUSH_PROXY_URL =  `${ZETAPUSH_SERVEUR_URL}:9081/str/rest/deployed/${ZETAPUSH_SANDBOX_ID}/cnvrst_hdfs/`

export const environment = {
  production: true,
  ZETAPUSH_API_URL, ZETAPUSH_PROXY_URL, ZETAPUSH_SANDBOX_ID
}
