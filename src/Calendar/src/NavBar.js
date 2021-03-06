/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Component from '@zippytech/react-class';
import { Flex, Item } from '../../Flex';
import InlineBlock from './InlineBlock';
import assign from '../../common/assign';
import join from '../../common/join';
import assignDefined from './assignDefined';
import toMoment from './toMoment';
import MonthDecadeView from './MonthDecadeView';

const ARROWS = {
  prev: (
    <svg height="22" viewBox="2 0 24 24" width="22">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  ),

  next: (
    <svg height="22" viewBox="-2 0 24 24" width="22">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  ),
  right: (
    <svg width="13" height="11" viewBox="0 0 13 11">
      <g>
        <polygon points="4.198 5.5 0 1.292 1.292 0 6.793 5.5 1.292 11 0 9.707" />
        <polyline points="6 9.707 10.198 5.5 6 1.292 7.293 0 12.793 5.5 7.293 11 6 9.707" />
      </g>
    </svg>
  ),
  left: (
    <svg width="13" height="11" viewBox="0 0 13 11">
      <g>
        <polyline points="6.793 9.707 2.594 5.5 6.793 1.292 5.5 0 0 5.5 5.5 11 6.793 9.707" />
        <polyline points="12.793 9.707 8.594 5.5 12.793 1.292 11.5 0 6 5.5 11.5 11 12.793 9.707" />
      </g>
    </svg>
  )
};

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewDate: props.defaultViewDate
    };
  }

  prepareViewDate(props) {
    return props.viewDate === undefined ? this.state.viewDate : props.viewDate;
  }

  render() {
    const props = (this.p = assign({}, this.props));
    const { rootClassName, index } = props;
    const viewMoment = (props.viewMoment =
      props.viewMoment || this.toMoment(this.prepareViewDate(props)));
    props.monthDecadeViewEnabled =
      props.expandedMonthDecadeView || props.enableMonthDecadeView;
    const secondary = props.secondary;
    const className = join(
      props.className,
      rootClassName,
      `${rootClassName}--theme-${props.theme}`,
      `${rootClassName}--with-month-decade-view`
    );

    const monthDecadeView = props.monthDecadeViewEnabled
      ? this.renderMonthDecadeView()
      : null;

    const flexProps = assign({}, props);

    delete flexProps.rootClassName;
    delete flexProps.arrows;
    delete flexProps.doubleArrows;
    delete flexProps.date;
    delete flexProps.enableMonthDecadeView;
    delete flexProps.monthDecadeViewEnabled;
    delete flexProps.isDatePickerNavBar;
    delete flexProps.minDate;
    delete flexProps.maxDate;
    delete flexProps.mainNavBar;
    delete flexProps.multiView;
    delete flexProps.navDateFormat;
    delete flexProps.onNavClick;
    delete flexProps.onUpdate;
    delete flexProps.onViewDateChange;
    delete flexProps.renderNavNext;
    delete flexProps.renderNavPrev;
    delete flexProps.secondary;
    delete flexProps.theme;
    delete flexProps.viewDate;
    delete flexProps.viewMoment;
    delete flexProps.showClock;
    delete flexProps.enableMonthDecadeViewAnimation;
    delete flexProps.showMonthDecadeViewAnimation;

    if (typeof props.cleanup == 'function') {
      props.cleanup(flexProps);
    }

    return (
      <Flex key="navBar" inline row {...flexProps} className={className}>
        {secondary && this.renderNav(-2, viewMoment, 'left')}
        {this.renderNav(-1, viewMoment, 'prev')}

        <Item
          key="month_year"
          className={join(
            `${rootClassName}-date`,
            props.monthDecadeViewEnabled ? '' : `${rootClassName}-date-disabled`
          )}
          style={{ textAlign: 'center' }}
          onMouseDown={
            props.monthDecadeViewEnabled ? this.toggleMonthDecadeView : null
          }
        >
          {this.renderNavDate(viewMoment)}
        </Item>
        {this.renderNav(1, viewMoment, 'next')}
        {secondary && this.renderNav(2, viewMoment, 'right')}

        {monthDecadeView}
      </Flex>
    );
  }

  renderMonthDecadeView() {
    if (!this.state.monthDecadeView) {
      return null;
    }
    const {
      viewMoment,
      theme,
      minDate,
      maxDate,
      rootClassName,
      size,
      showClock,
      enableMonthDecadeViewAnimation,
      showMonthDecadeViewAnimation
    } = this.p;
    const className = join(
      `${rootClassName}-month-decade-view`,
      (size <= 1 || size === undefined) &&
        `${rootClassName}-month-decade-view-month`,
      showClock && `${rootClassName}-month-decade-view-calendar`
    );

    const modalClassName = join(
      `${rootClassName}-month-decade-view-modal`,
      enableMonthDecadeViewAnimation &&
        `${rootClassName}-month-decade-view-show-animation`
    );
    const modalWrapperClassName =
      size || size === undefined ? modalClassName : null;

    const monthDecadeViewProps = assignDefined(
      {
        defaultViewDate: viewMoment,
        defaultDate: viewMoment,

        ref: view => {
          this.monthDecadeView = view;
        },
        focusDecadeView: false,

        className,
        theme,

        onOkClick: this.onMonthDecadeViewOk,
        onCancelClick: this.onMonthDecadeViewCancel
      },
      {
        minDate,
        maxDate
      }
    );

    if (this.props.renderMonthDecadeView) {
      return this.props.renderMonthDecadeView(monthDecadeViewProps);
    }

    return (
      <div
        style={{ animationDuration: `${showMonthDecadeViewAnimation}ms` }}
        className={modalWrapperClassName}
      >
        <MonthDecadeView {...monthDecadeViewProps} />
      </div>
    );
  }

  toggleMonthDecadeView(event) {
    if (this.isMonthDecadeViewVisible()) {
      this.hideMonthDecadeView(event);
    } else {
      this.showMonthDecadeView(event);
    }
  }

  getMonthDecadeViewView() {
    return this.monthDecadeView;
  }

  isMonthDecadeViewVisible() {
    return !!this.monthDecadeView;
  }

  onMonthDecadeViewOk(dateString, { dateMoment, timestamp }) {
    this.hideMonthDecadeView();
    this.onViewDateChange({ dateMoment, timestamp });
  }

  onMonthDecadeViewCancel() {
    this.hideMonthDecadeView();
  }

  showMonthDecadeView(event) {
    event.preventDefault();

    this.setState({
      monthDecadeView: true
    });

    if (this.props.onShowMonthDecadeView) {
      this.props.onShowMonthDecadeView();
    }
  }

  hideMonthDecadeView(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    this.setState({
      monthDecadeView: false
    });

    if (this.props.onHideMonthDecadeView) {
      this.props.onHideMonthDecadeView();
    }
  }

  toMoment(value, props) {
    props = props || this.props;

    return toMoment(value, {
      locale: props.locale,
      dateFormat: props.dateFormat
    });
  }

  renderNav(dir, viewMoment, name) {
    const props = this.p;

    let disabled = dir < 0 ? props.prevDisabled : props.nextDisabled;
    const secondary = Math.abs(dir) == 2;

    if (dir < 0 && props.minDate) {
      const gotoMoment = this.getGotoMoment(dir, viewMoment).endOf('month');

      if (gotoMoment.isBefore(this.toMoment(props.minDate))) {
        disabled = true;
      }
    }

    if (dir > 0 && props.maxDate) {
      const gotoMoment = this.getGotoMoment(dir, viewMoment).startOf('month');

      if (gotoMoment.isAfter(this.toMoment(props.maxDate))) {
        disabled = true;
      }
    }

    if (this.state.monthDecadeView) {
      disabled = true;
    }

    const { rootClassName } = props;
    const className = join(
      `${rootClassName}-arrow`,
      `${rootClassName}-arrow--${name}`,
      secondary && `${rootClassName}-secondary-arrow`,
      disabled && `${rootClassName}-arrow--disabled`
    );

    const arrowClass = `${rootClassName}-arrows-pos`;
    const arrowDivClass = `${rootClassName}-arrows-div`;

    const arrow = props.arrows[dir] || props.arrows[name] || ARROWS[name];

    let children;

    const dirArrow = props.arrows[dir];

    if (dirArrow) {
      children = dirArrow;
    } else {
      const doubleArrows = dir < -1 ? arrow : dir > 1 ? arrow : null;
      children =
        dir < 0 ? (
          <div className={arrowDivClass}>
            {secondary ? (
              <div className={arrowClass}>{doubleArrows}</div>
            ) : (
              <div className={arrowClass}>{arrow}</div>
            )}
          </div>
        ) : (
          <div className={arrowDivClass}>
            {secondary ? (
              <div className={arrowClass}>{doubleArrows}</div>
            ) : (
              <div className={arrowClass}>{arrow}</div>
            )}
          </div>
        );
    }

    const navProps = {
      dir,
      name,
      disabled,
      onClick: !disabled ? this.onNavClick.bind(this, dir, viewMoment) : null,
      className,
      children
    };

    if (props.renderNav) {
      return props.renderNav(navProps);
    }

    if (dir < 0 && props.renderNavPrev) {
      return props.renderNavPrev(navProps);
    }

    if (dir > 0 && props.renderNavNext) {
      return props.renderNavNext(navProps);
    }

    return <InlineBlock key={name} {...navProps} disabled={null} name={null} />;
  }

  getGotoMoment(dir, viewMoment) {
    viewMoment = viewMoment || this.p.viewMoment;

    const sign = dir < 0 ? -1 : 1;
    const abs = Math.abs(dir);

    const mom = this.toMoment(viewMoment);

    mom.add(sign, abs == 1 ? 'month' : 'year');

    return mom;
  }

  onNavClick(dir, viewMoment, event) {
    const props = this.props;

    let dateMoment = this.toMoment(viewMoment);

    if (props.onUpdate) {
      dateMoment = props.onUpdate(dateMoment, dir);
    } else {
      const sign = dir < 0 ? -1 : 1;
      const abs = Math.abs(dir);

      dateMoment.add(sign, abs == 1 ? 'month' : 'year');
    }

    const timestamp = +dateMoment;

    props.onNavClick(dir, viewMoment, event);

    const disabled = dir < 0 ? props.prevDisabled : props.nextDisabled;

    if (disabled) {
      return;
    }

    this.onViewDateChange({
      dateMoment,
      timestamp
    });
  }

  renderNavDate(viewMoment) {
    const props = this.props;
    const text = viewMoment.format(props.navDateFormat);

    if (props.renderNavDate) {
      return props.renderNavDate(viewMoment, text);
    }

    return text;
  }

  onViewDateChange({ dateMoment, timestamp }) {
    if (this.props.viewDate === undefined) {
      this.setState({
        viewDate: timestamp
      });
    }

    if (this.props.onViewDateChange) {
      const dateString = dateMoment.format(this.props.dateFormat);
      this.props.onViewDateChange(dateString, {
        dateString,
        dateMoment,
        timestamp
      });
    }
  }
}

NavBar.defaultProps = {
  rootClassName: 'zippy-react-toolkit-calendar__nav-bar',
  arrows: {},
  doubleArrows: {},
  theme: 'default',
  isDatePickerNavBar: true,
  navDateFormat: 'MMM YYYY',
  enableMonthDecadeView: true,
  onNavClick: (dir, viewMoment) => {},
  onViewDateChange: () => {}
};

NavBar.propTypes = {
  rootClassName: PropTypes.string,
  secondary: PropTypes.bool,
  showClock: PropTypes.bool,
  enableMonthDecadeViewAnimation: PropTypes.bool,
  showMonthDecadeViewAnimation: PropTypes.number,

  renderNav: PropTypes.func,
  renderNavPrev: PropTypes.func,
  renderNavNext: PropTypes.func,

  arrows: PropTypes.object,
  doubleArrows: PropTypes.object,
  navDateFormat: PropTypes.string,

  onUpdate: PropTypes.func,
  onNavClick: PropTypes.func,
  onViewDateChange: PropTypes.func,
  onClick: PropTypes.any
};
