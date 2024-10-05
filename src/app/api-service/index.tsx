import { userInterface } from '../../interface';
import axios from 'axios';

const API_URL = 'https://memora-app-sigma.vercel.app/api/users'; 

export const getUsers = async (): Promise<userInterface[]> => {
    try {
        const response = await axios.get(`${API_URL}`);
        if (Array.isArray(response.data)) {
            return response.data;
        } else {
            throw new Error('Invalid data format');
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const getUserById = async (id: number): Promise<userInterface> => {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  };

export const postUser = async (formData: FormData) => {
    try {
        const response = await axios.post(`${API_URL}/users`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
};

export const editUser = async (formData: FormData, id: number): Promise<userInterface> => {
    try {
        const response = await axios.put(`${API_URL}/users/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteAllUsers = async () => {
    try {
        const response = await axios.delete(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error deleting all users:', error);
        throw error;
    }
};

export const deleteUserById = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting user with ID ${id}:`, error);
        throw error;
    }
};
