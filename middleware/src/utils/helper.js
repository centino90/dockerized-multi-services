import axios from 'axios';

export async function send(uri, payload, headers = {}) {
  const response = await axios.post(uri, headers = headers, payload);

  return response;
}
