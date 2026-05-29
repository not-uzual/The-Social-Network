import axios from 'axios';
import { API_BASE_URL } from './config';

export const getFollowingPosts = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/post/following`,
      { withCredentials: true }
    );
    return response.data.posts;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching posts' };
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/post/all`,
      { withCredentials: true }
    );
    return response.data.posts;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching posts' };
  }
};
