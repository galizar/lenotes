import React from 'react';

import './style.css';
import NameForm from '../NameForm';

interface Props {
  id: string,
  className: string,
  create: (name: string) => void,
  delete: (id: string) => void,
  show: (id: string) => void,
  items: object,
  itemOnDisplayId?: string 
}

interface State {
  isFormVisible: boolean
}

class ItemDisplay extends React.Component<Props, State> {

  newItemFormId = `${this.props.id}-form`;

  constructor(props: Props) {
    super(props);
    this.state = {
      isFormVisible: false,
    }
  }

  handleCreate = (name: string) => {
    this.props.create(name);
    this.hideForm();
  }

  handleDelete = (id: string) => {
    this.props.delete(id);
  }

  showForm = () => {
    this.setState({ isFormVisible: true });
  }

  hideForm = () => {
    this.setState({ isFormVisible: false });
  }

  render() {
    return (
      <div id={this.props.id} className={this.props.className}>

        <div className="control-container">
          <button 
            className="create-button"
            onClick={() => this.showForm()}>
            +
          </button>

          {
            this.props.itemOnDisplayId ? 
            <button 
              className="delete-button"
              onClick={() => this.handleDelete(this.props.itemOnDisplayId!)}>
              -
            </button>
            :
            null
          }
        </div>

        {this.props.items}

        <NameForm 
          id={this.newItemFormId}
          isVisible={this.state.isFormVisible}
          submit={this.handleCreate}
          blur={this.hideForm} 
        />
      </div>
    )
  }

  componentDidUpdate() {
    if (this.state.isFormVisible) {
      const form = document.getElementById(this.newItemFormId) as HTMLElement;
      const inputField = form.children[0] as HTMLInputElement;
      inputField.focus();
    }
  }
}

export default ItemDisplay;