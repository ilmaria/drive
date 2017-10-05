const READ_SCOPE = 'https://www.googleapis.com/auth/drive.readonly'
const WRITE_SCOPE = 'https://www.googleapis.com/auth/drive'

export default class GoogleApi {
  constructor() {
    this.client = null
    this.authInstance = null

    this.init = this.init.bind(this)
    this.login = this.login.bind(this)
    this.listFiles = this.listFiles.bind(this)
  }

  /**
   * This class has to be initialized before any of its methods can be used.
   * @param {*} userChangeCallback 
   */
  async init(userChangeCallback) {
    try {
      await window.isGoogleApiReady
      const google = window.gapi

      await new Promise(resolve => {
        google.load('client:auth2', resolve)
      })

      this.client = google.client
      await this.client.init({
        apiKey: process.env.REACT_APP_API_KEY,
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: READ_SCOPE,
      })

      this.authInstance = google.auth2.getAuthInstance()

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
      callback(this.authInstance.currentUser.get())
      // Listen for future user changes.
      this.authInstance.currentUser.listen(callback)
    } catch (err) {
      console.error('Error during login:', err)
    }

    return this
  }

  async login() {
    return this.authInstance.signIn()
  }

  async listFiles(id) {
    if (!this.authInstance.isSignedIn.get()) {
      return Promise.reject('Not logged in')
    }

    return this._listFilesWithParams(id, {})
  }

  async _listFilesWithParams(id, params) {
    try {
      const response = await this.client.request({
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
