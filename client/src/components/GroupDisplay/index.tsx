import React from 'react';

import ItemDisplay from '../ItemDisplay';
import GroupService, { IGroup } from '../../services/GroupService';
import NoteService from '../../services/NoteService';

interface Props {
  id: string,
  className: string,
  showGroup: (id: number) => void,
  groups: IGroup[],
  groupOnDisplayId?: number,
}

class GroupDisplay extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  onNoteDrop = (event: React.DragEvent<HTMLButtonElement>, toGroupId: number) => {
    event.preventDefault();
    const noteId = event.dataTransfer.getData("text");
    NoteService.move(parseInt(noteId), toGroupId);
  }

  handleCreate = (name: string): void => {
    GroupService.create(name);
    // TODO: local storage create
  }

  handleTrash = (id: number): void => {
    GroupService.trash(id);
    // TODO: cascade trash all notes inside the group
    // TODO: local storage trash
  }

  render() {
    const items = 
      this.props.groups
        .filter(group => !group.isTrashed)
        .map(group => {
          return (
            <button
              className={this.props.groupOnDisplayId === group.id ? 'selected' : ''}
              key={group.id}
              onClick={() => this.props.showGroup(group.id)}
              onDragOver={event => event.preventDefault()}
              onDrop={event => this.onNoteDrop(event, group.id)}
            >
              {group.name}
            </button>
          );
        });
    
    return (
      <ItemDisplay
        id={this.props.id}
        className={this.props.className}
        handleCreate={this.handleCreate}
        handleTrash={this.handleTrash}
        show={this.props.showGroup}
        items={items}
        itemOnDisplayId={this.props.groupOnDisplayId}/>
    );
  }
}

export default GroupDisplay;