const READ_SCOPE = 'https://www.googleapis.com/auth/drive.readonly'
const WRITE_SCOPE = 'https://www.googleapis.com/auth/drive'

export default class GoogleApi {
  constructor() {
    this._loggedIn = false
    this._client = null
    this._auth = null
  }

  async _login() {
    try {
      await window.isGoogleApiReady
      const google = window.gapi

      await new Promise((resolve, reject) => {
        google.load('client:auth2', resolve)
      })

      this._client = google.client

      await this._client
        .init({
          apiKey: process.env.API_KEY,
          clientId: process.env.CLIENT_ID,
          scope: READ_SCOPE,
        })
        .then(() => {
          console.log('instance', google.auth2.getAuthInstance())
        })

      console.log('login, init done')

      this._auth = google.auth2
      console.log(google.auth2)
      console.log(google.auth2.getAuthInstance())

      await google.auth2
        .init({
          client_id: process.env.CLIENT_ID,
          scope: READ_SCOPE,
        })
        .then(() => {
          console.log('instance 2', google.auth2.getAuthInstance())
        })

      this._loggedIn = this._auth.getAuthInstance().isSignedIn.get()

      console.log('before return 0')
      // Listen for sign-in state changes.
      this._auth.getAuthInstance().isSignedIn.listen(signedIn => {
        this._loggedIn = signedIn
      })

      console.log('before return')

      return true
    } catch (err) {
      console.log('Error during login:', err)
      return false
    }
  }

  async listFiles(id) {
    console.log('list files')
    if (!this._loggedIn) {
      console.log('list files, not logged in')
      await this._login()
    }

    console.log('returning files')
    return this._listFilesWithParams(id, {})
  }

  async _listFilesWithParams(id, params) {
    try {
      const resp = await this._client.request({
        path: 'https://www.googleapis.com/drive/v3/files',
        params: {
          corpora: 'user',
          orderBy: 'name',
          q: `'${id}' in parents`,
          fields: 'files(id, name, kind, modifiedTime), nextPageToken',
          ...params,
        },
      })

      return resp.nextPageToken
        ? resp.files.concat(
            this._listFilesWithParams(id, { pageToken: resp.nextPageToken })
          )
        : resp.files
    } catch (e) {
      console.log('get files error', e)
      return []
    }
  }
}
