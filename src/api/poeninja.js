import axios from 'axios'
export const POE_NINJA_BASE_URL = 'https://poe.ninja/api/data'

const poeNinjaAPIinstance = axios.create({
  baseURL: POE_NINJA_BASE_URL
})

export default function poeNinjaApi(config) {
  return poeNinjaAPIinstance(config)
}