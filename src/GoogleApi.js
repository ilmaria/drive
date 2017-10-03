const READ_SCOPE = 'https://www.googleapis.com/auth/drive.readonly'
const WRITE_SCOPE = 'https://www.googleapis.com/auth/drive'

export default class GoogleApi {
  constructor() {
    this.resolveClient = function() {}
    this.resolveAuthInstance = function() {}

    this._client = new Promise(resolve => {
      console.log('client promise')
      this.resolveClient = resolve
    })
    this._authInstance = new Promise(resolve => {
      this.resolveClient = resolve
    })
  }

  async init(userChangeCallback) {
    try {
      console.log('init')
      await window.isGoogleApiReady
      const google = window.gapi
      console.log('ready')

      google.load('client:auth2', () => {
        console.log('resolve func', this.resolveClient.toString())
        this.resolveClient(google.client)
        console.log('client resolved')
      })

      const client = await this._client
      console.log('client', client)
      await client.init({
        apiKey: process.env.REACT_APP_API_KEY,
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: READ_SCOPE,
      })

      const authInstance = google.auth2.getAuthInstance()
      this.resolveAuthInstance(authInstance)
      console.log('auth resolved')

      const callback = user => {
        const profile = user.getBasicProfile()
        userChangeCallback({
          id: profile.getId(),
          name: profile.getName(),
          imageUrl: profile.getImageUrl(),
          email: profile.getEmail(),
        })
      }

      // Initial call to this callback
      callback(authInstance.currentUser.get())
      // Listen for future user changes.
      authInstance.currentUser.listen(callback)

      return true
    } catch (err) {
      console.error('Error during login:', err)
      return err
    }
  }

  async login() {
    const auth = await this._authInstance
    return auth.signIn()
  }

  async listFiles(id) {
    const auth = await this._authInstance

    if (!auth.isSignedIn.get()) {
      return Promise.reject('Not logged in')
    }

    return this._listFilesWithParams(id, {})
  }

  async _listFilesWithParams(id, params) {
    try {
      const client = await this._client
      const response = await client.request({
        path: 'https://www.googleapis.com/drive/v3/files',
        params: {
          corpora: 'user',
          orderBy: 'name',
          q: `'${id}' in parents`,
          fields: `files(${[
            'id',
            'name',
            'kind',
            'modifiedTime',
            'iconLink',
            'webViewLink',
          ].join()}), nextPageToken`,
          ...params,
        },
      })
      const result = response.result

      return result.nextPageToken
        ? result.files.concat(
            this._listFilesWithParams(id, { pageToken: result.nextPageToken })
          )
        : result.files
    } catch (err) {
      console.error('Could not get files from Google Drive', err)
      return []
    }
  }
}
