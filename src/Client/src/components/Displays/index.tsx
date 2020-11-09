import React from 'react';
import './style.css';

import INote from '../../interfaces/INote';
import IGroup from '../../interfaces/IGroup';
import GroupService from '../../services/GroupService';
import NoteService from '../../services/NoteService';
import LocalGroupService from '../../services/LocalGroupService';
import LocalNoteService from '../../services/LocalNoteService';

interface Props {
  id: string,
  displayAllNotes: (event: React.MouseEvent<HTMLButtonElement>) => void,
  displayTrash: (event: React.MouseEvent<HTMLButtonElement>) => void,
  isDisplayingTrash: boolean,
  localGroupService: LocalGroupService,
  localNoteService: LocalNoteService,
  trashedGroups: IGroup[],
  trashedNotes: INote[],
}

interface State {}

class Displays extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
   }

  clearTrash = async () => {
    if (!this.props.isDisplayingTrash) return;

    const trashedGroups = this.props.trashedGroups; 
    const trashedNotes = this.props.trashedNotes; 
    const shouldClear = confirm("All trashed items will be permanently deleted. Proceed?");

    if (shouldClear && trashedGroups.length > 0) {
      const ids = trashedGroups.map(group => group.id);
      this.props.localGroupService.deleteGroups(ids);
      const selectionId = await GroupService.selectGroups({ ids });
      GroupService.deleteGroupsInSelection(selectionId);
    } 

    if (shouldClear && trashedNotes.length > 0) {
      const ids = trashedNotes.map(note => note.id);
      this.props.localNoteService.deleteNotes(ids);
      const selectionId = await NoteService.selectNotes({ ids });
      NoteService.deleteNotesInSelection(selectionId);
    }
  }

  render() {
    const trashedGroups = this.props.trashedGroups;
    const trashedNotes = this.props.trashedNotes;

    return (
      <div id={this.props.id}> 
        <div>
          <button 
            onClick={this.props.displayAllNotes}>
            All Notes
          </button>
        </div>

        <div>
          <button
            className={this.props.isDisplayingTrash ? 'displaying-trash' : ''}
            onClick={this.props.displayTrash}
          >
            Trash
          </button>

          {
            this.props.isDisplayingTrash && 
            (trashedGroups.length > 0 || trashedNotes.length > 0)
            ?
            <button onClick={this.clearTrash}>Clear trash</button>
            :
            null
          }
        </div>
      </div>
    );
  }
}

export default Displays;