import React from 'react';

import ItemDisplay from '../ItemDisplay';
import { IdGroupMap } from '../App'

interface Props {
  id: string,
  className: string,
  createGroup: (name: string) => void,
  deleteGroup: (id: string) => void,
  showGroup: (id: string) => void,
  groups: IdGroupMap,
  groupOnDisplayId?: string,
  moveNote: (id: string, toGroupId: string) => void,
}

class GroupDisplay extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  onNoteDrop = (event: React.DragEvent<HTMLButtonElement>, toGroupId: string) => {
    event.preventDefault();
    const noteId = event.dataTransfer.getData("text");
    this.props.moveNote(noteId, toGroupId);
  }

  render() {
    const items = Object.entries(this.props.groups).map(idGroupPair => {
      let [id, group] = idGroupPair;

      return (
        <button
          className={this.props.groupOnDisplayId === id ? 'selected' : ''}
          key={id}
          onClick={() => this.props.showGroup(id)}
          onDragOver={event => event.preventDefault()}
          onDrop={event => this.onNoteDrop(event, id)}
        >
          {group.name}
        </button>
      );
    });
    
    return (
      <ItemDisplay 
        id={this.props.id}
        className={this.props.className}
        create={this.props.createGroup}
        delete={this.props.deleteGroup}
        show={this.props.showGroup}
        items={items}
        itemOnDisplayId={this.props.groupOnDisplayId}/>
    );
  }
}

export default GroupDisplay;