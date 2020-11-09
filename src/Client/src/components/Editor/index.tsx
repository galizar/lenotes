import React from 'react';
import './style.css';

import NoteService from '../../services/NoteService';
import LocalNoteService from '../../services/LocalNoteService';

interface Props {
  id: string,
  className: string,
  groupName: string,
  noteName: string,
  noteContent: string,
  noteId?: number,
  localNoteService: LocalNoteService,
  isDisplayingTrash: boolean,
}

class Editor extends React.Component<Props> {

  saveTimeout?: number = undefined;

  constructor(props: Props) {
    super(props);
  }

  handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    window.clearTimeout(this.saveTimeout);
    this.saveTimeout = window.setTimeout(() => this.saveContent(text), 2000);
  }

  saveContent = (content: string) => {
    if (this.props.noteId) {
      this.props.localNoteService.setContent(this.props.noteId, content);
      NoteService.setContent({
        id: this.props.noteId, 
        content
      });
    }
  }

  EditorHeader = (props: Props) => {
    let group: string;

    if (props.groupName !== '') {
      group = props.groupName;
    } else if (props.isDisplayingTrash) {
      group = 'Trash'
    } else {
      group = 'All Notes';
    }

    return (
      <div id="editor-header">
        <span id="group-header">{group}</span>
        <span id="note-header">{props.noteName}</span>
      </div>
    )
  }

  render() {
    return (
      <div id={this.props.id} className={this.props.className}>

        <this.EditorHeader {...this.props} />

        <textarea 
          id="note" 
          readOnly={this.props.isDisplayingTrash}
          onChange={this.handleTextChange}
          placeholder={this.props.noteId ? 'This note is empty'
                                         : 'Select a note to display its content'}
        >
        </textarea>
      </div>
    );
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.noteContent !== this.props.noteContent) {
      const note = document.getElementById('note') as HTMLTextAreaElement;
      note.value = this.props.noteContent; 
    }
  }
}

export default Editor;
