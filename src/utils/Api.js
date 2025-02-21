import axios from 'axios';
export const loginApiCall=async(payload)=>{
    try {
        let response = await axios.post('https://fundoonotes.incubation.bridgelabz.com/api/user/login', payload);
        // console.log(response.data.id)
        localStorage.setItem("Authorization",response.data.id);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error during login-up:', error);
        throw error;
    }
}
export const signUpApiCall = async (payload) => {
    try {
        console.log(payload);
        let response = await axios.post('https://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp', payload);
        console.log(response)
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error during sign-up:', error);
        throw error; // Re-throw the error for handling
    }
};