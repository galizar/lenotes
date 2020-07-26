import React from 'react';

import ItemDisplay from '../ItemDisplay';
import { IdNoteMap } from '../App'

interface Props {
  id: string,
  className: string,
  createNote: (name: string) => void,
  deleteNote: (id: string) => void,
  showNote: (id: string) => void,
  notes: IdNoteMap,
  noteOnDisplayId?: string,
}

class NoteDisplay extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  onNoteDragStart = (event: React.DragEvent<HTMLButtonElement>, noteId: string) => {
    event.dataTransfer.setData("text", noteId);
  }

  render() {
    const items = Object.entries(this.props.notes).map(idNotePair => {
      let [id, note] = idNotePair;

      return (
        <button
          className={this.props.noteOnDisplayId === id ? 'selected' : ''}
          draggable="true"
          key={id}
          onClick={() => this.props.showNote(id)}
          onDragStart={event => this.onNoteDragStart(event, id)}
        >
          {note.name}
        </button>
      );
    });

    return (
      <ItemDisplay 
        id={this.props.id}
        className={this.props.className}
        create={this.props.createNote}
        delete={this.props.deleteNote}
        show={this.props.showNote}
        items={items}
        itemOnDisplayId={this.props.noteOnDisplayId}
      />
    );
  }
}

export default NoteDisplay;