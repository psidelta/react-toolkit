/**
 * Copyright 2015-present Zippy Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Selects valid props for Value
 */
function getValueProps({ state, props, computed, tagProps }) {
  const {
    multiple,

    renderTag,
    renderTags,
    tagBorder,
    tagStyle,
    tagPadding,
    tagHeight,
    tagWidth,
    tagMinSize,
    tagMaxSize,
    tagCloseIcon,
    tagCloseIconPosition,
    maxTagsLength,
    renderRemainingTags,
    renderDisplayValue,
    searchable,
    renderTagLabel
  } = props;

  const { focus } = state;

  const rootClassName = `${props.rootClassName}__value`;

  tagProps = {
    ...tagProps,
    closeIcon: tagCloseIcon,
    border: tagBorder,
    style: tagStyle,
    padding: tagPadding,
    height: tagHeight,
    width: tagWidth,
    minSize: tagMinSize,
    maxSize: tagMaxSize,
    closeIconPosition: tagCloseIconPosition,
    ellipsis: props.tagEllipsis
  };

  const valueProps = {
    renderTagLabel,
    multiple,
    searchable,
    rootClassName,
    renderTag,
    renderRemainingTags,
    renderTags,
    tagProps,
    maxTagsLength,
    focus,
    maxTagsLength,
    renderDisplayValue,
    ...computed
  };

  return valueProps;
}

export default getValueProps;
