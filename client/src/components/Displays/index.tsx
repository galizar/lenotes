import React from 'react';

interface Props {
  id: string,
  displayAllNotes: (event: React.MouseEvent<HTMLButtonElement>) => void,
  displayTrash: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

interface State {}

class Displays extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
   }

  render() {
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
            onClick={this.props.displayTrash}
          >
            Trash
          </button>
        </div>
      </div>
    );
  }
}

export default Displays;