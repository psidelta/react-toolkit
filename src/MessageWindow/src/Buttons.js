import React from 'react';
import Button from '../../Button';
import cleanProps from '../../common/cleanProps';

const propsToRemove = {
  buttonLabel: true
};

const OkButton = props => (
  <Button theme="default" {...cleanProps(props, propsToRemove)}>
    {props.buttonLabel || 'Ok'}
  </Button>
);

const CancelButton = props => (
  <Button theme="light" {...cleanProps(props, propsToRemove)}>
    {props.buttonLabel || 'Cancel'}
  </Button>
);

const NoButton = props => (
  <Button theme="default" {...cleanProps(props, propsToRemove)}>
    {props.buttonLabel || 'No'}
  </Button>
);

const YesButton = props => (
  <Button theme="default" {...cleanProps(props, propsToRemove)}>
    {props.buttonLabel || 'Yes'}
  </Button>
);

export { OkButton, CancelButton, NoButton, YesButton };
