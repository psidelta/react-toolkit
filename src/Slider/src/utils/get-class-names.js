import join from '../../../common/join';

const getClassNames = (props, state, CLASS_NAME) => {
  const {
    className,
    theme,
    orientation,
    rtl,
    showButtons,
    tickBarPosition
  } = props;
  const { focused } = state;

  return join(
    CLASS_NAME,
    className,
    `${CLASS_NAME}--${orientation}-orientation`,
    tickBarPosition === `${tickBarPosition}`
      ? `${CLASS_NAME}--tick-bar-${orientation}-${tickBarPosition}`
      : '',
    `${CLASS_NAME}--theme-${theme}`,
    focused && `${CLASS_NAME}--focused`,
    rtl && `${CLASS_NAME}--rtl`,
    showButtons && `${CLASS_NAME}--with-buttons`
  );
};

export default getClassNames;
