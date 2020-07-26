import React from 'react';
import './style.css';

interface Props {
  id: string,
  className: string,
  groupName: string,
  noteName: string,
  noteContent: string,
  save: (content: string) => void,
}

class Editor extends React.Component<Props> {

  saveTimeout?: number = undefined;

  constructor(props: Props) {
    super(props);
  }

  handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    window.clearTimeout(this.saveTimeout);
    this.saveTimeout = window.setTimeout(() => this.props.save(text), 2000);
  }

  render() {
    const groupName = this.props.groupName;
    const noteDisplayed = this.props.noteName !== '';

    return (
      <div id={this.props.id} className={this.props.className}>

        {
          noteDisplayed ? 
          <div id="note-info">
            <p> {groupName ? `${groupName} >` : ''} {`${this.props.noteName}`} </p>
          </div>
          : 
          null
        }

        <textarea id="note" onChange={this.handleTextChange}>
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
