const CLIENT_ID = '<YOUR_CLIENT_ID>'
const API_KEY = '<YOUR_API_KEY>'

const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
]

const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly'

export async function initClient(signInCallback) {
  await window.isGoogleApiReady
  const google = window.gapi

  await new Promise((resolve, reject) => {
    google.load('client:auth2', resolve())
  })

  await google.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES,
  })

  const signedIn = google.auth2.getAuthInstance().isSignedIn
  // Listen for sign-in state changes.
  signedIn.listen(signInCallback)
  // Handle the initial sign-in state.
  signInCallback(signedIn.get())
}
