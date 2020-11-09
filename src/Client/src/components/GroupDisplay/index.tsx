import React from 'react';

import ItemDisplay from '../ItemDisplay';
import IGroup from '../../interfaces/IGroup';
import GroupService from '../../services/GroupService';
import LocalGroupService from '../../services/LocalGroupService';
import NoteService from '../../services/NoteService';
import LocalNoteService from '../../services/LocalNoteService';

interface Props {
  id: string,
  className: string,
  showGroup: (id: number) => void,
  groups: IGroup[],
  groupOnDisplayId?: number,
  localService: LocalGroupService,
  localNoteService: LocalNoteService
  isDisplayingTrash: boolean
}

class GroupDisplay extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  onNoteDrop = (event: React.DragEvent<HTMLButtonElement>, toGroupId: number) => {
    event.preventDefault();
    const noteId = event.dataTransfer.getData("text");
    this.props.localNoteService.move(parseInt(noteId), toGroupId);
    NoteService.move(parseInt(noteId), toGroupId);
  }

  handleCreate = (name: string): void => {
    this.props.localService.create(name);
    GroupService.create(name);
  }

  handleDelete = async (id: number): Promise<void> => {
    const groupName = this.props.localService.get(id).name;
    const shouldDelete = await confirm(
      `You are about to delete ${groupName} and its associated notes. BEWARE: This operation can not be reversed!`
    );
    if (shouldDelete) {
      this.props.localNoteService.deleteInGroup(id);
      NoteService.deleteInGroup(id);
      this.props.localService.delete(id);
      GroupService.delete(id);
    }
  }
  
  handleRename = (id: number, newName: string): void => {
    this.props.localService.rename(id, newName);
    GroupService.rename(id, newName);
  }
  
  handleRestore = (id: number): void => {
    this.props.localService.restore(id);
    GroupService.restore(id);
    this.props.localNoteService.restoreInGroup(id);
    NoteService.restoreInGroup(id);
  }
  
  handleTrash = async (id: number): Promise<void> => {
    const groupName = this.props.localService.get(id).name;
    const shouldTrash = await confirm(
        `Trash ${groupName} and its associated notes?`
    );
    if (shouldTrash) {
      this.props.localNoteService.trashInGroup(id);
      NoteService.trashInGroup(id);
      this.props.localService.trash(id);
      GroupService.trash(id);
    }
  }

  render() {
    const items = 
      this.props.groups
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
        handleDelete={this.props.isDisplayingTrash ? this.handleDelete : this.handleTrash}
        handleRename={this.handleRename}
        handleRestore={this.handleRestore}
        show={this.props.showGroup}
        items={items}
        itemLabel={!this.props.isDisplayingTrash ? 'Groups' : 'Trashed groups'}
        itemOnDisplayId={this.props.groupOnDisplayId}
        isDisplayingTrash={this.props.isDisplayingTrash}
        />
    );
  }
}

export default GroupDisplay;