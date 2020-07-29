import React from 'react';

import NoteService, { INote } from '../../services/NoteService';
import ItemDisplay from '../ItemDisplay';

interface Props {
  id: string,
  className: string,
  showNote: (id: number) => void,
  notes: INote[],
  noteOnDisplayId?: number,
  groupOnDisplayId?: number
}

class NoteDisplay extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  handleCreate = (name: string): void =>  {
    let groupId = this.props.groupOnDisplayId ? this.props.groupOnDisplayId : -1;
    NoteService.create(name, groupId);
    // TODO: local storage create
  }

  handleTrash = (id: number): void => {
    NoteService.trash(id);
    // TODO: local storage trash
  }

  onNoteDragStart = (event: React.DragEvent<HTMLButtonElement>, noteId: number): void => {
    event.dataTransfer.setData("text", String(noteId));
  }

  render() {
    const items = 
      this.props.notes
        .filter(note => !note.isTrashed)
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
        handleTrash={this.handleTrash}
        show={this.props.showNote}
        items={items}
        itemOnDisplayId={this.props.noteOnDisplayId}
      />
    );
  }
}

export default NoteDisplay;