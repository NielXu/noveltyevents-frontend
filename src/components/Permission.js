import React from 'react';
import { evaluatePermission } from '../tools';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function(props) {
  if(evaluatePermission(props.req, props.permission)) {
    const ne = React.cloneElement(props.component, { disabled: true });
    return (
      <OverlayTrigger
        trigger={props.trigger? props.trigger : "hover"}
        placement={props.placement? props.placement : "top"}
        overlay={
          <Tooltip>
            {props.text? props.text : "No permission"}
          </Tooltip>
        }>
          <div>{ne}</div>
      </OverlayTrigger>
    )
  }
  return props.component;
}