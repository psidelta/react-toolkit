import equal from '../../common/shallowequal';

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

  return true;
  // return !equal(nextProps, props) || !equal(nextState, state);
};
