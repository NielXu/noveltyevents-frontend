import React from 'react';
import './InlineEdit.css';
import { evaluatePermission } from '../tools';
import TextArea from 'react-autosize-textarea';
import Permission from './Permission';

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

  handleOnClick = () => {
    const permission = this.props.permission;
    if(!this.props.disabled) {
      if(permission) {
        if(evaluatePermission(permission.req, permission.permission)) {
          this.setState({ isEditing: true });
        }
      }
      else {
        this.setState({ isEditing: true });
      }
    }
  }

  textRenderer = () => {
    return (
      <span
        className={`inline-edit ${this.props.textClassName? this.props.textClassName : ""}`}
      >
        {this.state.editing}
      </span>
    )
  }

  render() {
    return (
      <div
        className={this.state.isEditing
          ? `inline-edit-wrap-editing ${this.props.wrapperClassName? this.props.wrapperClassName: ""}`
          : `inline-edit-wrap ${this.props.wrapperClassName? this.props.wrapperClassName: ""}`
        }
        onClick={this.handleOnClick}
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
          : <>
              {this.props.permission
                ? (
                    <Permission
                      req={this.props.permission.req}
                      permission={this.props.permission.permission}
                      component={this.textRenderer()}
                      text={this.props.permission.text}
                      placement={this.props.permission.placement}
                    />
                  )
                : (
                  <>
                    {this.textRenderer()}
                  </>
                )
              }
            </>
        }
      </div>
    )
  }
}