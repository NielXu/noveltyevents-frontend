import React from 'react';
import { Button } from 'react-bootstrap';

/**
 * Loader button uses React Bootstrap button and
 * wrap based on it. It will show loading text
 * and disable the button when it is in loading
 * state.
 */
export default ({
  loading,
  text,
  loadingText,
  className="",
  disabled=false,
  variant="primary",
  ...props
}) => 
  <Button
    className={`LoaderButton ${className}`}
    disabled={disabled || loading}
    {...props}
  >
    {loading? loadingText : text}
  </Button>
