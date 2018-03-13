import DragHelper from '@zippytech/drag-helper';
import { getValueForPercentage } from './value-utils';

const handleDragInteraction = (
  event,
  config,
  {
    currentValue,
    targetRegion,
    constrainRegion,
    dragSize,
    onHandleDragStart,
    onHandleDrag,
    onHandleDragEnd
  }
) => {
  const { horizontal } = config;

  DragHelper(event, {
    region: targetRegion,
    constrainTo: constrainRegion,

    onDragStart: onHandleDragStart,

    onDrag: (event, dragConfig) => {
      const diff = horizontal ? dragConfig.diff.left : dragConfig.diff.top;

      const percentage = diff * 100 / dragSize;
      const diffValue = getValueForPercentage(percentage, config, {
        noStartValue: true
      });

      const newValue = currentValue + diffValue;
      onHandleDrag(newValue, diffValue);
    },

    onDrop: onHandleDragEnd
  });
};

export default handleDragInteraction;
