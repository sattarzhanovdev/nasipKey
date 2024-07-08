import axios from "axios";

const base_url = 'https://el-nasip-gates-default-rtdb.asia-southeast1.firebasedatabase.app'

export const API = {
  getUsers: () => axios.get(`${base_url}/users.json`),
  getUser: (id) => axios.get(`${base_url}/users/${id}.json`),
  postUser: (data) => axios.post(`${base_url}/users.json`, data),
  openClose: (value) => axios.put(`${base_url}/openClose.json`, {value: value}),
  gateStatus: () => axios.get(`${base_url}/openClose/value.json`),
  blockApartment: (id, value) => axios.put(`${base_url}/users/${id}.json`, value)
  // blockApartment: (id, value) => console.log(`${base_url}/users/${id}/isBlocked.json`)
}