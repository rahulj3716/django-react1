const initialState = [];

export default function notes(state = initialState, action) {
  let noteList = state.slice();
  switch (action.type) {
    case "ADD_NOTE":
      return [...state, action.note];
    case "UPDATE_NOTE":
      let noteToUpdate = noteList[action.index];
      noteToUpdate.text = action.note.text;
      noteList.splice(action.index, 1, noteToUpdate);
      return noteList;
    case "DELETE_NOTE":
      noteList.splice(action.id, 1);
      return noteList;
    case "FETCH_NOTES":
      return [...state, action.notes];
    default:
      return state;
  }
}
