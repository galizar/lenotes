import React from 'react';

interface Props {
  id: string,
  isVisible: boolean,
  submit: (value: string) => void,
  blur: () => void,
}

interface State {
  value: string,
}

class NameForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {value: '',};
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.setState({value: ''});
    this.props.submit(this.state.value);
  }

  render() {
    const displayClass = this.props.isVisible ? "visible" : "not-visible";
    return (
      <form id={this.props.id} className={displayClass} onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input 
            type="text" 
            value={this.state.value} 
            onChange={this.handleChange}
            onBlur={this.props.blur} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default NameForm;