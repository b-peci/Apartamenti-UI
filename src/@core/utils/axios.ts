import axios, { AxiosRequestConfig } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchData(uri: string) {
  const request = await axios.get(API_URL + uri, {
    responseType: 'json'
  })
  if (request.status === 200) {
    return request.data
  }
}

export async function fetchDataWithConfig(uri: string, config: AxiosRequestConfig) {
  const request = await axios.get(API_URL + uri, config)
  return request
}

export async function postData(uri: string, body: any) {
  const request = await axios.post(API_URL + uri, body, {
    responseType: 'json'
  })

  return request
}

export async function postDataWithConfig(uri: string, body: any, config: AxiosRequestConfig) {
  const request = await axios.post(API_URL + uri, body, config)

  return request
}

export async function deleteDataWithConfig(uri: string,  config: AxiosRequestConfig) {
  const request = await axios.delete(API_URL +  uri, config)
  return request;
}
