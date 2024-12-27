export type EnvKeys = 'API_URL'

const config: Record<EnvKeys, string> = {
  API_URL:
    process.env.NEXT_PUBLIC_API_URL ||
    'https://nodebook-b4axckeya0abe4aq.germanywestcentral-01.azurewebsites.net/api',
}

export default config
