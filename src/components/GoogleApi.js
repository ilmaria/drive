const CLIENT_ID = '<YOUR_CLIENT_ID>'
const API_KEY = '<YOUR_API_KEY>'
const READ_SCOPE = 'https://www.googleapis.com/auth/drive.readonly'
const WRITE_SCOPE = 'https://www.googleapis.com/auth/drive'

export default class GoogleApi {
  constructor() {
    this._loggedIn = false
    this._client = null
    this._auth = null
  }

  async _login(signInCallback) {
    await window.isGoogleApiReady
    const google = window.gapi

    await new Promise((resolve, reject) => {
      google.load('client:auth2', resolve())
    })

    this._client = google.client

    await this._client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: READ_SCOPE
    })

    this._auth = google.auth2.getAuthInstance()
    this._loggedIn = auth.isSignedIn.get()

    // Listen for sign-in state changes.
    auth.isSignedIn.listen(signedIn => {
      this._loggedIn = signedIn
    })
  }

  async listFiles(id) {
    if (!this._loggedIn) {
      await this._login()
    }

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
          ...params
        }
      })

      return resp.nextPageToken
        ? resp.files.concat(
            this._listFilesWithParams(id, { pageToken: resp.nextPageToken })
          )
        : resp.files
    } catch (e) {
      return []
    }
  }
}
