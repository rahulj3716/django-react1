export const addNote = text => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" }
    let body = JSON.stringify({ text })
    let { token } = getState().auth

    if (token) {
      headers["Authorization"] = `Token ${token}`
    }
    return fetch("/api/notes/", { headers, method: "POST", body })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data }
          })
        }
        else {
          console.log("server Error !")
          throw res
        }
      }
      ).then(res => {
        if (res.status === 200) {
          dispatch({ type: "ADD_NOTE", note: res.data })
        }
        else if (res.status === 403 || res.status === 401) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data })
          throw res.data
        }
      })
  }
}

export const updateNote = (index, text) => {
  return (dispatch, getState) => {
    let headers = { "Content-type": "application/json" };
    let token = getState().auth

    if (token) {
      headers["Authorization"] = `Token ${token}`
    }
    let body = JSON.stringify({ text });
    let noteId = getState().notes[index].id;
    return fetch(`/api/notes/${noteId}/`, { headers, method: "PUT", body })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data }
          })
        }
        else {
          console.log("server Error !")
          throw res
        }
      }
      ).then(res => {
        if (res.status === 200) {
          dispatch({ type: "UPDATE_NOTE", note: res.data, index })
        }
        else if (res.status === 403 || res.status === 401) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data })
          throw res.data
        }
      })
  }
}

export const deleteNote = id => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" }
    let { token } = getState().auth

    if (token) {
      headers["Authorization"] = `Token ${token}`
    }
    /*let noteId = getState().notes[index].id;*/
    fetch(`/api/notes/${id}`, { headers, method: "DELETE" })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data }
          })
        }
        else {
          console.log("server Error !")
          throw res
        }
      }
      ).then(res => {
        if (res.status === 200) {
          dispatch({ type: "DELETE_NOTE", id })
        }
        else if (res.status === 403 || res.status === 401) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data })
          throw res.data
        }
      })
  }
}

export const fetchNotes = () => {
  return (dispatch, getState) => {
    let headers = {
      "Content-Type": "application/json"
    }
    let { token } = getState().auth

    if (token) {
      headers["Authorization"] = `Token ${token}`
    }
    return fetch(`/api/notes/`, { headers })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data }
          })
        }
        else {
          console.log("server Error !")
          throw res
        }
      }
      ).then(res => {
        if (res.status === 200) {
          dispatch({ type: "FETCH_NOTES", notes: res.data })
        }
        else if (res.status === 403 || res.status === 401) {
          dispatch({ type: "AUTHENTICATION_ERROR", data: res.data })
          throw res.data
        }
      })
  }
}