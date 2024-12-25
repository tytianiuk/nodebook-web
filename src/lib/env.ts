export type EnvKeys = 'API_URL'

const config: Record<EnvKeys, string> = {
  API_URL: process.env.NEXT_PUBLIC_API_URL!,
}

export default config
