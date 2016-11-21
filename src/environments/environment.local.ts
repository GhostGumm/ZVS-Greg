const ZETAPUSH_SERVEUR_URL = 'http://localhost:10080'
const ZETAPUSH_API_URL = `${ZETAPUSH_SERVEUR_URL}/zbo/pub/business/`
const ZETAPUSH_SANDBOX_ID = 'yZWGxtkN'
// const ZETAPUSH_PROXY_URL =  `http://file.zpush.ovh/${ZETAPUSH_SANDBOX_ID}/cnvrst_hdfs/`
const ZETAPUSH_PROXY_URL =  `${ZETAPUSH_SERVEUR_URL}/str/rest/deployed/${ZETAPUSH_SANDBOX_ID}/cnvrst_hdfs/`

export const environment = {
  production: false,
  ZETAPUSH_API_URL, ZETAPUSH_PROXY_URL, ZETAPUSH_SANDBOX_ID
}
