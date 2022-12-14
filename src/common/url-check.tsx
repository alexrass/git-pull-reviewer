export const isValidUrl = (url: string): boolean => {
  return /https:\/\/github.com\/.*\/pull\/\d+/.test(url)
}
