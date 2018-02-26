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

import React from 'react';
import assign from '../../../common/assign';
import join from '../../../common/join';
import MenuItemCell from './MenuItemCell';

/**
 *  About style - style can come from several places, they overwrite each
 *  other in the folowing order:
 *  - cellStyle that comes from Menu props (globalCellStyle)
 *  - cellStyle from column
 *  - cellStyle that comes from
 **/
export default (props, column, index, columns) => {
  const { hasSubmenu, rootClassName } = props;
  let { globalCellStyle } = props;
  const item = props.items && props.items[index];

  if (typeof globalCellStyle == 'function') {
    globalCellStyle = globalCellStyle({
      index,
      columns,
      items: props.items,
      item,
      hasSubmenu
    });
  }

  const style = assign({}, globalCellStyle);
  const isLast = index === columns.length - 1;
  const cellProps = assign({}, props.cellProps);

  /**
   * no need to check if it is expander as expander is rendered
   * in prepareChildren
   */
  if (isLast && props.siblingItemHasSubMenu && !props.item.items) {
    // cellProps.colSpan = 2
  }

  let children;

  if (column && typeof column.render == 'function') {
    children = column.render(props.item, {
      column,
      columns,
      index,
      items: props.items,
      item,
      hasSubmenu
    });
  } else {
    const columnName = typeof column == 'string' ? column : column.name;
    children = props.item[columnName];
  }

  if (typeof column === 'object') {
    if (column.colSpan) {
      cellProps.colSpan = column.colSpan;
    }
  }

  if (column.style) {
    let columnStyle;

    if (typeof column.style === 'function') {
      columnStyle = column.style({
        index,
        columns,
        items: props.items,
        item,
        hasSubmenu
      });
    } else {
      columnStyle = column.style;
    }

    assign(style, columnStyle);
  }

  let className = column.className;

  if (item) {
    if (item.cellStyle) {
      assign(style, item.cellStyle);
    }
    if (item.className) {
      className = join(className, item.cellClassName);
    }
  }

  if (props.style) {
    assign(style, props.style);
  }

  return (
    <MenuItemCell
      style={style}
      className={className}
      key={index}
      rootClassName={rootClassName}
      cellProps={cellProps}
      isDescription={column.isDescription}
      isIcon={column.isIcon}
      align={column.align}
    >
      {children}
    </MenuItemCell>
  );
};
