import React from 'react'

const READ_SCOPE = 'https://www.googleapis.com/auth/drive.readonly'
const WRITE_SCOPE = 'https://www.googleapis.com/auth/drive'

export default class GoogleData extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isInitialized: new Promise((resolve, reject) => {
        this.resolveInit = resolve
        this.rejectInit = reject
      }),
      client: null,
      authInstance: null,
      user: this.getUser(),
    }

    this.login = this.login.bind(this)
    this.getFilesInFolder = this.getFilesInFolder.bind(this)
    this.getRecentFiles = this.getRecentFiles.bind(this)
  }

  componentDidMount() {
    this.init().catch(err => {
      console.error('Error during login:', err)
      this.rejectInit(err)
    })
  }

  getUser() {
    return JSON.parse(localStorage.getItem('currentUser'))
  }

  setUser(user) {
    this.setState({ user })
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  async init() {
    await window.isGoogleApiReady
    const google = window.gapi

    await new Promise(resolve => {
      google.load('client:auth2', resolve)
    })

    const client = google.client
    await client.init({
      apiKey: process.env.API_KEY,
      clientId: process.env.CLIENT_ID,
      scope: READ_SCOPE,
    })

    const authInstance = google.auth2.getAuthInstance()

    const handleUserChange = googleUser => {
      const profile = googleUser.getBasicProfile()
      const user = profile
        ? {
            id: profile.getId(),
            name: profile.getName(),
            imageUrl: profile.getImageUrl(),
            email: profile.getEmail(),
          }
        : null
      this.setUser(user)
    }

    // Initial call to this handleUserChange
    handleUserChange(authInstance.currentUser.get())
    // Listen for future user changes.
    authInstance.currentUser.listen(handleUserChange)

    this.setState({ client, authInstance }, () => {
      this.resolveInit()
    })
  }

  async login() {
    await this.state.isInitialized
    return this.state.authInstance.signIn()
  }

  async getFilesInFolder(id) {
    return this.getFiles({
      orderBy: 'name',
      q: `'${id}' in parents`,
    })
  }

  async getRecentFiles() {
    return this.getFiles({ orderBy: 'viewdByMeTime desc' })
  }

  async getFiles(parameters = {}) {
    await this.state.isInitialized

    const params = {
      corpora: 'user',
      fields: `files(${[
        'id',
        'name',
        'mimeType',
        'modifiedTime',
        'iconLink',
        'webViewLink',
        'webContentLink',
      ].join()}), nextPageToken`,
      ...parameters,
    }
    const response = await this.state.client.request({
      path: 'https://www.googleapis.com/drive/v3/files',
      params,
    })
    const result = response.result

    return result.nextPageToken
      ? result.files.concat(
          this.getFiles({ pageToken: result.nextPageToken, ...params })
        )
      : result.files
  }

  render() {
    return this.props.children(
      this.state.user,
      this.login,
      this.getFilesInFolder,
      this.getRecentFiles
    )
  }
}
