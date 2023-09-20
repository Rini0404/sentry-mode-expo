export const BASE_URL = 'https://app.devusol.net/'

export const GOOGLE_REDIRECT_URI = 'https://app.devusol.net/api/v1/google'

export const googleAuthEndpoint = `https://accounts.google.com/o/oauth2/v2/auth?client_id=477985071118-h8hj5iagdgq5hnk051nqkbf6b83a11v0.apps.googleusercontent.com&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`