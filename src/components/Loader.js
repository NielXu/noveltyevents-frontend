import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function(props) {
  if(props.loading) {
    return (
      <div className="loading">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading ...</span>
        </Spinner>
      </div>
    )
  }
  return props.component
}