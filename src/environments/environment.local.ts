const ZETAPUSH_SERVEUR_URL = 'http://localhost'
const ZETAPUSH_API_URL = `${ZETAPUSH_SERVEUR_URL}:10080/zbo/pub/business/`
const ZETAPUSH_SANDBOX_ID = 'xDJr37Zq'
// const ZETAPUSH_PROXY_URL =  `http://file.zpush.ovh/${ZETAPUSH_SANDBOX_ID}/cnvrst_hdfs/`
const ZETAPUSH_PROXY_URL =  `${ZETAPUSH_SERVEUR_URL}:10081/str/rest/deployed/${ZETAPUSH_SANDBOX_ID}/cnvrst_hdfs/`
const ZETAPUSH_DELEGATING_TOKEN_KEY = 'ServicesAuthToken'

export const environment = {
  production: false,
  ZETAPUSH_API_URL, ZETAPUSH_DELEGATING_TOKEN_KEY, ZETAPUSH_PROXY_URL, ZETAPUSH_SANDBOX_ID
}
