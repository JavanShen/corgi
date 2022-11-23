import { URL } from 'node:url'

globalThis.URL = URL as unknown as typeof globalThis.URL
