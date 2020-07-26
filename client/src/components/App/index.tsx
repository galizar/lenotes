import React from 'react';

import './style.css';
import Displays from '../Displays';
import Editor from '../Editor';
import GroupDisplay from '../GroupDisplay';
import NoteDisplay from '../NoteDisplay';

interface Note {
  name: string,
  content: string,
  groupId?: string,
}

interface Group {
  name: string,
}

export interface IdNoteMap  {[id: string]: Note}
export interface IdGroupMap {[id: string]: Group}

interface Trash {
  groups: IdGroupMap,
  notes: IdNoteMap,
}

interface Props {} 

interface State {
  nextGroupId: number,
  nextNoteId: number,
  groupOnDisplayId?: string,
  noteOnDisplayId?: string,
  groups: IdGroupMap,
  notes: IdNoteMap,
  trash: Trash,
}

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      nextGroupId: 3, // stub, remember to solve when getGroups gets implemented
      nextNoteId: 3, // ditto but with getNotes
      groupOnDisplayId: undefined,
      noteOnDisplayId: undefined,
      groups: this.getGroups(),
      notes: this.getNotes(),
      trash: {
        groups: {},
        notes: {}
      },
    };
  }

  getNotesOfGroup = (allNotes: IdNoteMap, id?: string): IdNoteMap => {
    if (!id) return allNotes; 

    const groupNotes = {} as IdNoteMap;

    for (let [noteId, note] of Object.entries(allNotes)) {
      if (note.groupId === id) {
        groupNotes[noteId] = note;
      }
    }

    return groupNotes;
  }

  deleteNote = (id: string) => {
    const newNotes = {...this.state.notes};
    delete newNotes[id];

    const notesInGroup = this.getNotesOfGroup(newNotes, this.state.groupOnDisplayId);
    const allIds = Object.keys(notesInGroup);
    this.setState({
      notes: newNotes,
      noteOnDisplayId: allIds.length === 0 ? undefined : allIds[0],
    });
  }

  deleteGroup = (id: string) => {
    const newGroups = {...this.state.groups};
    delete newGroups[id];
    const newNotes = this.deleteNotesOfGroup(id);

    this.setState({
      groups: newGroups,
      notes: newNotes,
    });
  }

  deleteNotesOfGroup = (id: string): IdNoteMap => {

    const newNotes = {...this.state.notes};
    const notesInGroup = this.getNotesOfGroup(newNotes, id);
    const notesIds = Object.keys(notesInGroup);

    for (let noteId in notesIds) {
      delete newNotes[noteId];
    }
    return newNotes;
  }

  getGroups = () => {
    return {
      0: {
        name: 'group1',
      },
      1: {
        name: 'group2',
      },
      2: {
        name: 'group3',
      }
    };
  }

  getNotes = () => {
    return {
      0: {
        name: 'notex',
        content: 'leContent',
        groupId: "0",
      },
      1: {
        name: 'note4dd',
        content: 'lelelel',
        groupId: "2" 
      },
      2: {
        name: 'notete' ,
        content: 'cheBOludo',
        groupId: "2" 
      }
    };
  }

  displayAllNotes = () => {
    this.setState({ groupOnDisplayId: undefined });
  }

  displayGroupWithId = (id: string) => {
    if (this.state.groupOnDisplayId  === id) return;

    this.setState({
      groupOnDisplayId: id,
    });
  }

  displayNoteWithId = (id: string) => {
    this.setState({noteOnDisplayId: id});
  }

  displayTrash = () => {

  }

  moveNote = (id: string, toGroupId: string) => {
    if (this.state.notes[id].groupId !== toGroupId) {
      this.setState({
        notes: {
          ...this.state.notes,
          [id]: {
            ...this.state.notes[id],
            groupId: toGroupId,
          }
        }
      });
    }
  }

  createGroup = (name: string) => {
    const groupId = this.state.nextGroupId;
    this.setState({
      nextGroupId: groupId + 1,
      groupOnDisplayId: String(groupId), // REMINDER: remove String(...) cast on actual 
      groups: {                          //            implementation of getGroups
        ...this.state.groups,
        [groupId]: {
          name: name,
        },
      },
    });
  }

  createNote = (name: string) => {
    const groupId = this.state.groupOnDisplayId;
    const noteId = this.state.nextNoteId;

    this.setState({
      nextNoteId: noteId + 1, 
      noteOnDisplayId: String(noteId), // REMINDER: same as above reminder
      notes: {
        ...this.state.notes,
        [noteId]: {
          name: name,
          content: '',
          groupId: groupId,
        },
      },
    });
  }

  renameNote = (id: string, toName: string) => {
    this.setState({
      notes: {
        ...this.state.notes,
        [id]: {
          ...this.state.notes[id],
          name: toName,
        }
      }
    });
  }


  saveNote = (content: string) => {
    const noteId = this.state.noteOnDisplayId;

    this.setState({
      notes: {
        ...this.state.notes,
        [noteId!]: {
          ...this.state.notes[noteId!],
          content: content,
        },
      },
    });
  }
  
  trashGroup = (id: string) => {
    const group = this.state.groups[id];
    const newTrash = {...this.state.trash}
    newTrash.groups[id] = group;

    const newGroups = {...this.state.groups};
    delete newGroups[id];
    const newNotes = this.trashNotesOfGroup(id, newTrash);

    this.setState({
      groups: newGroups,
      groupOnDisplayId: undefined,
      notes: newNotes,
      trash: newTrash,
    });
  }

  trashNotesOfGroup = (id: string, trash: Trash): IdNoteMap => {
    const newNotes = {...this.state.notes};
    const notesInGroup = this.getNotesOfGroup(newNotes, id);

    for (let noteId in Object.keys(notesInGroup)) {
      trash.notes[noteId] = newNotes[noteId];
      delete newNotes[noteId];
    }
    return newNotes;
  }

  trashNote = (id: string) => {
    const note = this.state.notes[id];
    const newNotes = {...this.state.notes};
    delete newNotes[id];

    const newTrash = {...this.state.trash};
    newTrash.notes[id] = note;

    this.setState({
      notes: newNotes,
      trash: newTrash,
    })
  }

  render() {
    const state = this.state;
    const notes = this.getNotesOfGroup(state.notes, state.groupOnDisplayId);
    const noteOnDisplay = state.notes[state.noteOnDisplayId!];
    const groupOfNote = noteOnDisplay ? state.groups[noteOnDisplay.groupId!] : undefined;

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
            createGroup={this.createGroup}
            deleteGroup={this.trashGroup}
            showGroup={this.displayGroupWithId}
            groups={state.groups} 
            groupOnDisplayId={state.groupOnDisplayId}
            moveNote={this.moveNote}
          />
        </div>


        <Editor 
          id="editor"
          className="col-8"
          groupName={groupOfNote ? groupOfNote.name : ''}
          noteName={noteOnDisplay ? noteOnDisplay.name : ''}
          noteContent={noteOnDisplay ? noteOnDisplay.content : ''}
          save={this.saveNote}
        />


        <div className="col-2">
          <NoteDisplay 
            id="notes"
            className="display"
            createNote={this.createNote}
            deleteNote={this.trashNote}
            showNote={this.displayNoteWithId}
            notes={notes}
            noteOnDisplayId={state.noteOnDisplayId}
          />
        </div>
      </div>
    );
  }
}

export default App;