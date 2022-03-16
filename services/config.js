import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URI,
  headers: {
     'Authorization':`Bearer AAAAAAAAAAAAAAAAAAAAALbZaAEAAAAAhIBBjaU4eUNvyu%2FWdLIeSB681cw%3Dl3CTTwhbyfFblJkU0GxPHYQZ6W3pvHT8NruoBy6jfHUI2iiIrE`
  },
});

export default instance;
