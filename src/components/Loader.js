import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

export default function(props) {
  let [loading, setLoading] = useState(props.loading);
  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);
  if(loading) {
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