import React from 'react';
import './InlineEdit.css';
import TextArea from 'react-autosize-textarea';

export default class InlineEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      original: this.props.text,
      editing: this.props.text,
      isEditing: false,
    }
  }

  handleOnBlur = () => {
    this.setState({ isEditing: false });
    // If validate function is provided
    if(this.props.validate) {
      if(!this.props.validate(this.state.editing)) {
        // If it is invalid
        if(this.props.invalid) {
          // Invoke invalid function and pass the invalid content
          this.props.invalid(this.state.editing);
        }
        // Set text back to original
        this.setState({ editing: this.state.original, isEditing: false });
      }
      else {
        this.setState({ original: this.state.editing });
      }
    }
    else {
      this.setState({ original: this.state.editing });
    }
  }

  handleKeyDown = (e) => {
    if(this.state.isEditing) {
      if(e.key === 'Enter') {
        this.handleOnBlur();
      }
      else if(e.key === 'Escape') {
        this.setState({ editing: this.state.original, isEditing: false });
      }
    }
  }

  handleOnFocus = (e) => {
    const val = e.target.value;
    e.target.value = "";
    e.target.value = val;
  }

  render() {
    return (
      <div
        className={this.state.isEditing
          ? `inline-edit-wrap-editing ${this.props.wrapperClassName? this.props.wrapperClassName: ""}`
          : `inline-edit-wrap ${this.props.wrapperClassName? this.props.wrapperClassName: ""}`
        }
        onClick={()=>this.setState({ isEditing: true })}
      >
        {this.state.isEditing
          ? <TextArea
              rows={1}
              className={this.state.isEditing
                ? `inline-edit-editing ${this.props.textAreaClassName? this.props.textAreaClassName : ""}`
                : `inline-edit ${this.props.textAreaClassName? this.props.textAreaClassName : ""}`
              }
              onChange={(e)=>this.setState({ editing: e.target.value })}
              onBlur={this.handleOnBlur}
              onFocus={this.handleOnFocus}
              value={this.state.editing}
              onKeyDown={this.handleKeyDown}
              autoFocus
            />
          : <span
              className={`inline-edit ${this.props.textClassName? this.props.textClassName : ""}`}
            >
              {this.state.editing}
            </span>
        }
      </div>
    )
  }
}