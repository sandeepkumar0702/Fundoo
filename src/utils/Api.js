import axios from "axios";

export const loginApiCall = async (payload) => {
    try {
        const response = await axios.post('https://fundoonotes.incubation.bridgelabz.com/api/user/login', payload);
        // console.log('Response data:', response.data);

        localStorage.setItem("token",response.data.id);
        localStorage.setItem("email",response.data.email);

        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export const signupApiCall = async (payload)=>{
    try {
        const response = await axios.post('https://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp', payload);
        console.log('Response data:', response.data);

        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};


export const getNotes = () => {
    return axios.get('https://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList', {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}

export const addNoteApiCall = async(payload) => {
    return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes", payload, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}



export const archiveNotesApiCall = async(payload) => {
    return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes", payload, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}



export const trashNotesApiCall = async (payload) => {
    return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes", payload, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
};
  
  export const restoreNotesApiCall = async (payload) => {
    return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes", payload, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
  };