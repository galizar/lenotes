import React from 'react';

import INote from '../../interfaces/INote';
import NoteService from '../../services/NoteService';
import ItemDisplay from '../ItemDisplay';
import LocalNoteService from '../../services/LocalNoteService';

interface Props {
  id: string,
  className: string,
  showNote: (id: number) => void,
  notes: INote[],
  noteOnDisplayId?: number,
  groupOnDisplayId: number,
  localService: LocalNoteService,
  isDisplayingTrash: boolean,
}

class NoteDisplay extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  handleCreate = (name: string): void =>  {
    let groupId = this.props.groupOnDisplayId;
    let note = this.props.localService.create(name, groupId);
    this.props.showNote(note.id);
    NoteService.create(name, groupId);
  }

  handleDelete = (id: number): void => {
    const noteName = this.props.localService.get(id).name;
    const shouldDelete = confirm(
      `You are about to delete ${noteName}. BEWARE: This operation can not be reversed`
    );
    if (shouldDelete) {
      this.props.localService.delete(id);
      NoteService.delete(id);
    }
  }
  
  handleRename = (id: number, newName: string): void => {
    this.props.localService.rename(id, newName);
    NoteService.rename(id, newName);
  }
  
  handleRestore = (id: number): void => {
    this.props.localService.restore(id);
    NoteService.restore(id);
  }
  
  handleTrash = (id: number): void => {
    const noteName = this.props.localService.get(id).name;
    const shouldTrash = confirm(`Trash ${noteName}?`);
    if (shouldTrash) {
      this.props.localService.trash(id);
      NoteService.trash(id);
    }
  }

  onNoteDragStart = (event: React.DragEvent<HTMLButtonElement>, noteId: number): void => {
    event.dataTransfer.setData("text", String(noteId));
  }

  render() {
    const items = 
      this.props.notes
        .map(note => {
          return (
            <button
              className={this.props.noteOnDisplayId === note.id ? 'selected' : ''}
              draggable="true"
              key={note.id}
              onClick={() => this.props.showNote(note.id)}
              onDragStart={event => this.onNoteDragStart(event, note.id)}
            >
              {note.name}
            </button>
          );
        });

    return (
      <ItemDisplay
        id={this.props.id}
        className={this.props.className}
        handleCreate={this.handleCreate}
        handleDelete={this.props.isDisplayingTrash ? this.handleDelete : this.handleTrash}
        handleRename={this.handleRename}
        handleRestore={this.handleRestore}
        show={this.props.showNote}
        items={items}
        itemLabel={!this.props.isDisplayingTrash ? 'Notes' : 'Trashed notes'}
        itemOnDisplayId={this.props.noteOnDisplayId}
        isDisplayingTrash={this.props.isDisplayingTrash}
      />
    );
  }
}

export default NoteDisplay;