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