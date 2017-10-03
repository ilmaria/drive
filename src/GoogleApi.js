const READ_SCOPE = 'https://www.googleapis.com/auth/drive.readonly'
const WRITE_SCOPE = 'https://www.googleapis.com/auth/drive'

export default class GoogleApi {
  constructor() {
    this._client = null
    this._authInstance = null
  }

  async init(signInCallback) {
    try {
      await window.isGoogleApiReady
      const google = window.gapi

      await new Promise((resolve, reject) => {
        google.load('client:auth2', resolve)
      })

      this._client = google.client

      await this._client.init({
        apiKey: process.env.REACT_APP_API_KEY,
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: READ_SCOPE,
      })

      console.log('login, init done')

      console.log('API_KEY "' + process.env.REACT_APP_API_KEY + '"')
      console.log('CLIENT_ID "' + process.env.REACT_APP_CLIENT_ID + '"')

      this._authInstance = google.auth2.getAuthInstance()
      console.log(this._authInstance)

      signInCallback(this._authInstance.isSignedIn.get())
      console.log('callback listener')
      // Listen for sign-in state changes.
      this._authInstance.isSignedIn.listen(signInCallback)

      console.log('after callbacks')

      console.log('before true return')

      return true
    } catch (err) {
      console.error('Error during login:', err)
      return err
    }
  }

  async login() {
    if (this._authInstance) {
      return this._authInstance.signIn()
    }

    return false
  }

  listFiles(id) {
    console.log('list files')
    if (!this._authInstance) {
      return Promise.reject('Auth insatance was not initialized')
    }
    if (!this._authInstance.isSignedIn.get()) {
      console.log('list files, not logged in')
      return Promise.reject('Not logged in')
    }

    console.log('returning files')
    return this._listFilesWithParams(id, {})
  }

  async _listFilesWithParams(id, params) {
    try {
      const response = await this._client.request({
        path: 'https://www.googleapis.com/drive/v3/files',
        params: {
          corpora: 'user',
          orderBy: 'name',
          q: `'${id}' in parents`,
          fields: 'files(id, name, kind, modifiedTime), nextPageToken',
          ...params,
        },
      })
      const result = response.result

      return result.nextPageToken
        ? result.files.concat(
            this._listFilesWithParams(id, { pageToken: result.nextPageToken })
          )
        : result.files
    } catch (e) {
      console.error('get files error', e)
      return []
    }
  }
}
