// src/services/photoService.js
import axios from './axiosInstance';

// 🔁 Save Live Photos (delta-based)
export const saveLivePhotos = async ({ added, updated, deleted }) => {
  return axios.post('/apiPhotos/SaveLivePhotos', { added, updated, deleted });
};

// 📥 Fetch all photos
export const fetchLivePhotos = async () => {
  return axios.get('/apiPhotos/GetLivePhotos');
};
