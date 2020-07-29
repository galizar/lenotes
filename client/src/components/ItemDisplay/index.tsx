import React from 'react';

import './style.css';
import NameForm from '../NameForm';

interface Props {
  id: string,
  className: string,
  handleCreate: (name: string) => void,
  handleTrash: (id: number) => void,
  show: (id: number) => void,
  items: JSX.Element[],
  itemOnDisplayId?: number 
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

  showForm = () => {
    this.setState({ isFormVisible: true });
  }

  hideForm = () => {
    this.setState({ isFormVisible: false });
  }

  handleSubmit = (name: string): void => {
    this.props.handleCreate(name);
    this.hideForm();
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
              onClick={() => this.props.handleTrash(this.props.itemOnDisplayId!)}>
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
          submit={this.handleSubmit}
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