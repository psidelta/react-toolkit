import React, { Component } from 'react';
import PropTypes from 'prop-types';
import join from '../../common/join';
import cleanProps from '../../common/cleanProps';
import toStringValue from './utils/toStringValue';
import { toHsv, toRgb } from './utils/color';

const NumberInput = ({ value, name, onChange, ...rest }) => {
  return (
    <input
      {...rest}
      type="number"
      placeholder={name}
      value={value || ''}
      onChange={event =>
        onChange({ [name]: parseFloat(event.target.value, 10) })
      }
    />
  );
};

class ZippyRGBA extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onChange = this.onChange.bind(this);
  }

  render() {
    const { props } = this;

    const className = join(props.rootClassName, props.className);
    const { r, g, b, a } = this.getValue();

    return (
      <div {...cleanProps(props, ZippyRGBA.propTypes)} className={className}>
        <NumberInput
          min={0}
          max={255}
          className={`${props.rootClassName}__input ${
            props.rootClassName
          }__input--r`}
          name="r"
          value={r}
          onChange={this.onChange}
        />
        <NumberInput
          min={0}
          max={255}
          name="g"
          value={g}
          className={`${props.rootClassName}__input ${
            props.rootClassName
          }__input--g`}
          onChange={this.onChange}
        />
        <NumberInput
          min={0}
          max={255}
          name="b"
          value={b}
          className={`${props.rootClassName}__input ${
            props.rootClassName
          }__input--b`}
          onChange={this.onChange}
        />
        <NumberInput
          // min={0}
          // max={1}
          name="a"
          value={a}
          className={`${props.rootClassName}__input ${
            props.rootClassName
          }__input--a`}
          onChange={this.onChange}
        />
      </div>
    );
  }

  onChange(config) {
    const newValue = {
      ...this.getValue(),
      ...config
    };

    this.setState({
      value: newValue
    });

    const hsvColor = toHsv(newValue);
    const stringValue = toStringValue(newValue);

    this.props.onChange(stringValue, hsvColor);
  }

  setValue(value) {
    if (!this.props.value) {
      this.setState({ value });
    }

    this.onChange(value);
  }

  getValue() {
    const value = this.props.value || this.state.value;
    const color = toRgb(value);

    return color;
  }
}

function emptyFn() {}

ZippyRGBA.defaultProps = {
  rootClassName: 'zippy-react-toolkit-color-picker__rgba',
  onChange: emptyFn
};

ZippyRGBA.propTypes = {
  value: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
    a: PropTypes.number
  }),
  defaultValue: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
    a: PropTypes.number
  }),
  onChange: PropTypes.func,
  rootClassName: PropTypes.string,
  onChange: PropTypes.func
};

export default ZippyRGBA;
