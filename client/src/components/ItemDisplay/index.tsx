import React from 'react';

import './style.css';
import NameForm from '../NameForm';

interface Props {
  id: string,
  className: string,
  handleCreate: (name: string) => void,
  handleDelete: (id: number) => void,
  handleRename: (id: number, newName: string) => void,
  handleRestore: (id: number) => void,
  show: (id: number) => void,
  items: JSX.Element[],
  itemLabel: string,
  itemOnDisplayId?: number,
  isDisplayingTrash: boolean,
}

interface State {
  isCreateFormVisible: boolean,
  isRenameFormVisible: boolean
}

class ItemDisplay extends React.Component<Props, State> {

  itemFormId = `${this.props.id}-form`;

  constructor(props: Props) {
    super(props);
    this.state = {
      isCreateFormVisible: false,
      isRenameFormVisible: false,
    }
  }

  showCreateForm = () => {
    this.setState({ isCreateFormVisible: true });
  }

  hideCreateForm = () => {
    this.setState({ isCreateFormVisible: false });
  }
  
  showRenameForm = () => {
    this.setState({ isRenameFormVisible: true });
  }
  
  hideRenameForm = () => {
    this.setState({ isRenameFormVisible: false});
  }

  handleSubmit = (value: string): void => {
    if (this.state.isCreateFormVisible) {
      this.props.handleCreate(value);
      this.hideCreateForm();
    } else {
      this.props.handleRename(this.props.itemOnDisplayId!, value);
      this.hideRenameForm();
    }
  }

  render() {
    const isDisplayingTrash = this.props.isDisplayingTrash;
    const itemOnDisplayId = this.props.itemOnDisplayId;
    
    return (
      <div id={this.props.id} className={this.props.className}>

        <div className="control-container">
          <span>{this.props.itemLabel}</span>
          {
            !isDisplayingTrash ?
              <button 
                className="create-button"
                onClick={() => this.showCreateForm()}>
                +
              </button>
              :
              null
          }
          {
            isDisplayingTrash && itemOnDisplayId ?
              <button 
                className="restore-button"
                onClick={() => this.props.handleRestore(itemOnDisplayId)}
              >
                Restore
              </button>
              :
              null  
          }
          {
            itemOnDisplayId ? 
              <button 
                className="delete-button"
                onClick={() => this.props.handleDelete(itemOnDisplayId)}>
                -
              </button>
              :
              null
          }
          {
            !isDisplayingTrash && itemOnDisplayId ?
              <button
                className="rename-button"  
                onClick={() => this.showRenameForm()}
              >
                Rename
              </button>  
              :
              null  
          }
        </div>

        {this.props.items}

        <NameForm 
          id={this.itemFormId}
          isVisible={this.state.isCreateFormVisible || this.state.isRenameFormVisible}
          submit={this.handleSubmit}
          blur={this.state.isCreateFormVisible ? this.hideCreateForm : this.hideRenameForm} 
        />
      </div>
    )
  }

  componentDidUpdate() {
    if (this.state.isCreateFormVisible || this.state.isRenameFormVisible) {
      const form = document.getElementById(this.itemFormId) as HTMLElement;
      const inputField = form.children[0] as HTMLInputElement;
      inputField.focus();
    }
  }
}

export default ItemDisplay;