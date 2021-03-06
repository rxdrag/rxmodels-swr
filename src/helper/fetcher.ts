import { rxModelsSwrConfig } from '../rxModelsSwrConfig';
import { trimServerUrl } from "./trimServerUrl";

const fetcher = async (url:string) => {
  const token = localStorage.getItem(rxModelsSwrConfig.tokenName) || rxModelsSwrConfig.token;
  const res = await fetch(
    trimServerUrl(rxModelsSwrConfig.serverUrl) + url,
      {
        method: 'GET',
        headers:{
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    )

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.') as any;
    // 将额外的信息附加到错误对象上。
    error.message = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

export {fetcher};