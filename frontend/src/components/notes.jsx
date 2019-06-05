import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { notes, auth } from "../actions"
import "./css/notes.css"

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: " ",
      upDateNoteId: null
    };
  }
  componentDidMount() {
    this.props.fetchNotes()
    console.log(this)
  }
  resetNote = () => {
    this.setState({
      text: " ",
      updateNoteId: null
    })
  }
  editNote = id => {
    let note = this.props.notes[id];
    this.setState({ text: note.text, updateNoteId: id })
  }
  submitNote = e => {
    e.preventDefault()
    if (this.state.updateNoteId == null)
      this.props.addNote(this.state.text).then(this.resetNote)
    else
      this.props
        .updateNote(this.state.updateNoteId, this.state.text)
        .then(this.resetNote)
  };
  render() {
    return (
      <div className="notes">
        <h1>Welcome To NotesApp</h1>
        <hr />
        <div style={{ textAlign: "right" }}>
          {this.props.user.username}( <a href="/login" onClick={this.props.logout}>Logout</a>  )
        </div>
        <h2>Add New Note</h2>
        <form onSubmit={this.submitNote}>
          <input
            type="text"
            placeholder="Enter Note Here..."
            onChange={e => this.setState({ text: e.target.value })}
            value={this.state.text}
          />

          <input type="submit" value="Save Note" />
        </form>
        <button onClick={this.resetNote}>Reset</button>
        <h3>Notes</h3>
        <table className="notes">
          <tbody>
            {this.props.notes.map((note, id) => (
              <tr key={`note_${id}`}>
                <td>{note.text}</td>
                <td>
                  <button onClick={() => this.editNote(id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => this.props.deleteNote(id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          <Link to="/contact">Click Here</Link> to contact us
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNote: text => {
      return dispatch(notes.addNote(text))
    },
    updateNote: (id, text) => {
      return dispatch(notes.updateNote(id, text))
    },
    deleteNote: id => {
      dispatch(notes.deleteNote(id))
    },
    fetchNotes: () => {
      dispatch(notes.fetchNotes())
    },
    logout: () => dispatch(auth.logout())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes)
