import axios from "axios";

const base_url = 'https://el-nasip-gates-default-rtdb.asia-southeast1.firebasedatabase.app'

export const API = {
  getUsers: () => axios.get(`${base_url}/users.json`),
  postUser: (data) => axios.post(`${base_url}/users.json`, data),
  openClose: (value) => axios.put(`${base_url}/openClose.json`)
}