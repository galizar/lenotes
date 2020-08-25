import { Props, State } from '../components/App';
import INote from '../interfaces/INote';

export type IdNoteMap = Record<number, INote>;

export default class LocalNoteService {

  client: React.Component<Props, State>;
  notes: IdNoteMap = {};

  constructor(client: React.Component<Props, State>) {
    this.client = client;
    this.notes = client.state.notes;
  }

  getAll = (): IdNoteMap => {
    return this.notes;
  }

  get = (id: number): INote => {
    return this.notes[id];
  }

  getInGroup = (groupId: number): IdNoteMap => {
    const notesInGroup: IdNoteMap = {};

    for (const note of Object.values(this.notes)) {
      if (note.groupId == groupId) {
        notesInGroup[note.id] = note;
      }
    }

    return notesInGroup;
  }

  create = (name: string, groupId: number): INote => {
    const newNotes = {...this.client.state.notes};
    const newNoteId = this.client.state.nextNoteId;

    const newNote: INote = {
      id: newNoteId,
      name,
      groupId,
      content: '',
      isTrashed: false
    }

    newNotes[newNoteId] = newNote;

    this.client.setState({ 
      nextNoteId: newNoteId + 1,
      notes: newNotes 
    });

    return newNote;
  }

  rename = (id: number, newName: string): void => {
    const note = this.get(id);
    const notes = {...this.notes};

    notes[id] = {
      ...note,
      name: newName
    };
    
    let noteOnDisplay = this.client.state.noteOnDisplay;
    if (noteOnDisplay && noteOnDisplay.id === id) noteOnDisplay = notes[id];
    
    this.client.setState({ 
      notes,
      noteOnDisplay
    });
  }

  move = (id: number, toGroupId: number): void => {
    const note = this.get(id);
    const notes = {...this.notes};
    
    notes[id] = {
      ...note,
      groupId: toGroupId
    };

    this.client.setState({ 
      noteOnDisplay: note,
      notes
    });
  }

  setContent = (id: number, newContent: string): void => {
    const note = this.get(id);
    const notes = {...this.notes};

    notes[id] = {
      ...note,
      content: newContent
    };

    this.client.setState({ notes });
  }

  trash = (id: number): void => {
    const note = this.get(id);
    const notes = {...this.notes};

    notes[id] = {
      ...note,
      isTrashed: true
    }
    
    let noteOnDisplay = this.client.state.noteOnDisplay;
    if (noteOnDisplay && noteOnDisplay.id === id) {
      noteOnDisplay = undefined;
    }

    this.client.setState({ 
      noteOnDisplay,
      notes
    });
  }

  trashNotes = (ids: number[]): void => {
    const notes = {...this.notes};
    let noteOnDisplay = this.client.state.noteOnDisplay;

    for (let id of ids) {
      const note = this.get(id);
      notes[id] = {
        ...note,
        isTrashed: true
      }

      if (noteOnDisplay && noteOnDisplay.id === id) {
        noteOnDisplay = undefined;
      }
    }

    this.client.setState({
      noteOnDisplay,
      notes,
    });
  }

  trashInGroup = (groupId: number): void => {
    const notes = {...this.notes};
    let notesInGroup = Object.values(notes).filter(note => note.groupId === groupId)

    for (const note of notesInGroup) {
      notes[note.id] = {
        ...note,
        isTrashed: true
      }
    }

    let noteOnDisplay = this.client.state.noteOnDisplay;

    if (noteOnDisplay && noteOnDisplay.groupId === groupId) {
      noteOnDisplay = undefined;
    }
    
    this.client.setState({ 
      notes,
      noteOnDisplay: noteOnDisplay
    });
  }

  restore = (id: number): void => {
    let note = this.get(id);
    const notes = {...this.notes};

    notes[id] = {
      ...note,
      groupId: -1,
      isTrashed: false
    }

    this.client.setState({ 
      notes,
      noteOnDisplay: undefined
    });
  }

  restoreInGroup = (groupId: number): void => {
    const notes = {...this.notes};
    const notesInGroup = Object.values(notes).filter(note => note.groupId === groupId);

    for (let note of notesInGroup) {
      notes[note.id] = {
        ...note,
        isTrashed: false
      }
    }

    this.client.setState({ notes });
  }

  delete = (id: number): void => {
    const notes = {...this.notes};
    delete notes[id];

    let noteOnDisplay = this.client.state.noteOnDisplay;
    if (noteOnDisplay && noteOnDisplay.id === id) noteOnDisplay = undefined;

    this.client.setState({ 
      notes,
      noteOnDisplay
    });
  }

  deleteNotes = (ids: number[]): void => {
    const notes = {...this.notes};
    let noteOnDisplay = this.client.state.noteOnDisplay;

    for (let id of ids) {
      delete notes[id];
      if (noteOnDisplay && noteOnDisplay.id === id) {
        noteOnDisplay = undefined;
      }
    }

    this.client.setState({
      noteOnDisplay,
      notes,
    })
  }

  deleteInGroup = (groupId: number): void => {
    let newNotes = {...this.notes};

    Object.values(newNotes)
      .filter(note => note.groupId === groupId)
      .map(note => {
        delete newNotes[note.id];
      });

    let noteOnDisplay = this.client.state.noteOnDisplay;

    if (noteOnDisplay && noteOnDisplay.groupId === groupId) {
      noteOnDisplay = undefined;
    }

    this.client.setState({ 
      notes: newNotes,
      noteOnDisplay: noteOnDisplay 
    });
  }
}