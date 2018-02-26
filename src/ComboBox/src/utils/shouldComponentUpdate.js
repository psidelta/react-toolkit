import shallowequal from '../../../common/shallowequal';

export default (inst, nextProps, nextState) => {
  const props = inst.props;
  const state = inst.state;

  if (nextProps.shouldComponentUpdate) {
    return nextProps.shouldComponentUpdate({
      nextProps,
      props,
      nextState,
      state
    });
  }

  return !shallowequal(nextProps, props) || !shallowequal(nextState, state);
};
