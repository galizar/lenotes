import React from 'react';

import './style.css';
import Displays from '../Displays';
import Editor from '../Editor';
import GroupDisplay from '../GroupDisplay';
import NoteDisplay from '../NoteDisplay';
import INote from '../../interfaces/INote';
import IGroup from '../../interfaces/IGroup';
import NoteService from '../../services/NoteService';
import GroupService from '../../services/GroupService';
import LocalNoteService, { IdNoteMap } from '../../services/LocalNoteService';
import LocalGroupService, { IdGroupMap } from '../../services/LocalGroupService';

export interface Props {} 

export interface State {
  nextGroupId: number,
  nextNoteId: number,
  groupOnDisplayId: number,
  noteOnDisplay?: INote,
  groups: IdGroupMap,
  notes: IdNoteMap,
  isDisplayingTrash: boolean,
}

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      nextGroupId: -1,
      nextNoteId: -1,
      groupOnDisplayId: -1,
      noteOnDisplay: undefined,
      groups: {},
      notes: {},
      isDisplayingTrash: false
    };
  }

  componentDidMount() {
    NoteService.getAll()
    .then(notes => {
      let noteMap: IdNoteMap = {};
      let lastId = notes.length > 0 ? notes[notes.length - 1].id : 0;
      let nextId = lastId + 1; 

      for (let note of notes) {
        noteMap[note.id] = note;
      }

      const val: [number, IdNoteMap] = [nextId, noteMap];
      return val;
    })
    .then(args => {
      let [nextId, noteMap] = args;

      this.setState({
        nextNoteId: nextId,
        notes: noteMap})
    });

    GroupService.getAll()
    .then(groups => {
      let groupMap: IdGroupMap = {};
      let lastId = groups.length > 0 ? groups[groups.length - 1].id : 0;
      let nextId = lastId + 1;

      for (let group of groups) {
        groupMap[group.id] = group;
      }
      
      const val: [number, IdGroupMap] = [nextId, groupMap];
      return val;
    })
    .then(args => {
      const [nextId, groupMap] = args;
      this.setState({
        nextGroupId: nextId,
        groups: groupMap
      });
    });
  }

  displayAllNotes = () => {
    this.setState({ 
      groupOnDisplayId: -1,
      isDisplayingTrash: false
    });
  }

  displayGroupWithId = (id: number) => {
    this.setState({
      groupOnDisplayId: id,
      noteOnDisplay: undefined
    });
  }

  displayNoteWithId = (id: number) => {
    this.setState({noteOnDisplay: this.state.notes[id]});
  }

  displayTrash = () => {
    this.setState({ 
      groupOnDisplayId: -1,
      noteOnDisplay: undefined,
      isDisplayingTrash: true,
    });
  }

  render() {
    const localNoteService = new LocalNoteService(this);
    const localGroupService = new LocalGroupService(this);

    const state = this.state;
    let groups: IGroup[] = Object.values(state.groups);
    let notes: INote[] = Object.values(state.notes);
    let groupOnDisplayName = '';

    if (state.groupOnDisplayId !== -1) {
      groupOnDisplayName = this.state.groups[state.groupOnDisplayId].name;
      notes = notes.filter(note => note.groupId === this.state.groupOnDisplayId);
    }

    groups = groups.filter(group => state.isDisplayingTrash ? group.isTrashed : !group.isTrashed);
    notes = notes.filter(note => state.isDisplayingTrash ? note.isTrashed : !note.isTrashed);

    return (
      <div className="App">

        <div className="col-3">
          <Displays 
            id="general-displays"
            displayAllNotes={this.displayAllNotes}
            displayTrash={this.displayTrash}
            isDisplayingTrash={this.state.isDisplayingTrash}
            localGroupService={localGroupService}
            localNoteService={localNoteService}
            trashedGroups={state.isDisplayingTrash ? groups : []}
            trashedNotes={state.isDisplayingTrash ? notes : []}
          />

          <GroupDisplay 
            id="groups"
            className="display"
            showGroup={this.displayGroupWithId}
            groups={groups} 
            groupOnDisplayId={state.groupOnDisplayId !== -1 ? state.groupOnDisplayId : undefined}
            localService={localGroupService}
            localNoteService={localNoteService}
            isDisplayingTrash={state.isDisplayingTrash}
          />
        </div>

        <Editor 
          id="editor"
          className="col-6"
          groupName={groupOnDisplayName}
          noteName={state.noteOnDisplay ? state.noteOnDisplay.name : ''}
          noteContent={state.noteOnDisplay ? state.noteOnDisplay.content : ''}
          noteId={state.noteOnDisplay ? state.noteOnDisplay.id : undefined}
          localNoteService={localNoteService}
          isDisplayingTrash={this.state.isDisplayingTrash}
        />

        <div className="col-3">
          <NoteDisplay 
            id="notes"
            className="display"
            showNote={this.displayNoteWithId}
            notes={notes}
            noteOnDisplayId={state.noteOnDisplay ? state.noteOnDisplay.id : undefined}
            groupOnDisplayId={state.groupOnDisplayId}
            localService={localNoteService}
            isDisplayingTrash={state.isDisplayingTrash}
          />
        </div>
      </div>
    );
  }
}

export default App;
