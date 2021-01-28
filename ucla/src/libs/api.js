import axios from 'axios'

export const signOut = async token => {
    const headers = {
        user: token
    };

    const { data } = await axios.get('http://192.249.18.163:3001/api/logout', {
        headers
    });

    return data;
}