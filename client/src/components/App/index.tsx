import React from 'react';

import './style.css';
import Displays from '../Displays';
import Editor from '../Editor';
import GroupDisplay from '../GroupDisplay';
import NoteDisplay from '../NoteDisplay';
import NoteService, { INote } from '../../services/NoteService';
import GroupService, { IGroup } from '../../services/GroupService';

interface Props {} 

interface State {
  groupOnDisplayId?: number,
  noteOnDisplay?: INote,
  groups: IGroup[],
  notes: INote[],
}

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      groupOnDisplayId: undefined,
      noteOnDisplay: undefined,
      groups: new Array<IGroup>(),
      notes: new Array<INote>()
    };
  }

  componentDidMount() {
    NoteService.getAll()
    .then(notes => {
      this.setState({notes: notes})
    });

    GroupService.getAll()
    .then(groups => {
      this.setState({groups: groups});
    });
  }

  displayAllNotes = () => {
    this.setState({ groupOnDisplayId: undefined });
  }

  displayGroupWithId = (id: number) => {
    if (this.state.groupOnDisplayId === id) return;

    this.setState({
      groupOnDisplayId: id,
    });
  }

  displayNoteWithId = (id: number) => {
    // subtracting one from the id is neccesary because entities are id'd starting from one
    this.setState({noteOnDisplay: this.state.notes[id - 1]});
  }

  displayTrash = () => {
    // TODO
  }

  render() {
    const state = this.state;
    const groupOnDisplayId = state.groupOnDisplayId;
    const notes = 
      groupOnDisplayId ? state.notes.filter(note => note.groupId === groupOnDisplayId) : state.notes;

    let groupOfNote;

    if (state.noteOnDisplay) {
      groupOfNote = 
        state.noteOnDisplay.groupId ? state.groups[state.noteOnDisplay.groupId - 1] : undefined;
    }

    return (
      <div className="App">

        <div className="col-2">
          <Displays 
            id="general-displays"
            displayAllNotes={this.displayAllNotes}
            displayTrash={this.displayTrash}
          />

          <GroupDisplay 
            id="groups"
            className="display"
            showGroup={this.displayGroupWithId}
            groups={state.groups} 
            groupOnDisplayId={state.groupOnDisplayId}
          />
        </div>

        <Editor 
          id="editor"
          className="col-8"
          groupName={groupOfNote ? groupOfNote.name : ''}
          noteName={state.noteOnDisplay ? state.noteOnDisplay.name : ''}
          noteContent={state.noteOnDisplay ? state.noteOnDisplay.content : ''}
          noteId={state.noteOnDisplay ? state.noteOnDisplay.id : undefined}
        />

        <div className="col-2">
          <NoteDisplay 
            id="notes"
            className="display"
            showNote={this.displayNoteWithId}
            notes={notes}
            noteOnDisplayId={state.noteOnDisplay ? state.noteOnDisplay.id : undefined}
            groupOnDisplayId={state.groupOnDisplayId}
          />
        </div>
      </div>
    );
  }
}

export default App;