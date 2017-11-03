const READ_SCOPE = 'https://www.googleapis.com/auth/drive.readonly'
const WRITE_SCOPE = 'https://www.googleapis.com/auth/drive'

export default class GoogleApi {
  constructor() {
    this.client = null
    this.authInstance = null

    this.init = this.init.bind(this)
    this.login = this.login.bind(this)
    this.getFilesInFolder = this.getFilesInFolder.bind(this)
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
        scope: READ_SCOPE
      })

      this.authInstance = google.auth2.getAuthInstance()

      const callback = googleUser => {
        const profile = googleUser.getBasicProfile()
        const user = profile
          ? {
              id: profile.getId(),
              name: profile.getName(),
              imageUrl: profile.getImageUrl(),
              email: profile.getEmail()
            }
          : null
        userChangeCallback(user)
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

  async getFilesInFolder(id) {
    if (!this.authInstance.isSignedIn.get()) {
      return Promise.reject('Not logged in')
    }

    return getFiles(this.client, {
      orderBy: 'name',
      q: `'${id}' in parents`
    })
  }

  async getRecentFiles() {
    if (!this.authInstance.isSignedIn.get()) {
      return Promise.reject('Not logged in')
    }

    return getFiles(this.client, { orderBy: 'viewdByMeTime desc' })
  }
}

async function getFiles(client, parameters = {}) {
  try {
    const params = {
      corpora: 'user',
      fields: `files(${[
        'id',
        'name',
        'mimeType',
        'modifiedTime',
        'iconLink',
        'webViewLink',
        'webContentLink'
      ].join()}), nextPageToken`,
      ...parameters
    }
    const response = await client.request({
      path: 'https://www.googleapis.com/drive/v3/files',
      params
    })
    const result = response.result

    return result.nextPageToken
      ? result.files.concat(
          getFiles(client, { pageToken: result.nextPageToken, ...params })
        )
      : result.files
  } catch (err) {
    console.error('Could not get files from Google Drive', err)
    return []
  }
}
