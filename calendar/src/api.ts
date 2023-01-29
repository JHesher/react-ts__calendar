//@ts-ignore
import axios from 'axios';

const API = 'https://api.spaceflightnewsapi.net';
const Events_API = `${API}/v3/events`;
const Event_API = `${API}/v3/events`;

export async function getAllEventsAPI() {
  return axios.get(Events_API)
}

export async function addNewEventAPI(data: any) {
  return axios.post(`${Event_API}/${data.id}`, data)
}

export async function editEventAPI(data: any) {
  return axios.put(`${Event_API}/${data.id}`, data)
}

export async function removeEventAPI(idEvent: string) {
  return axios.delete(Event_API, idEvent)
}
