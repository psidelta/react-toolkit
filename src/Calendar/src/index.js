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

import MonthView from './MonthView';

import TimePicker from './TimePicker';
import TimeInput from './TimeInput';

import TransitionView from './TransitionView';
import MultiMonthView from './MultiMonthView';

import MonthDecadeView from './MonthDecadeView';
import YearView from './YearView';
import DecadeView from './DecadeView';

import NavBar from './NavBar';
import Footer from './Footer';

import Clock from './Clock';
import ClockInput from './ClockInput';

import DateInput from './DateInput';
import Calendar from './Calendar';
import DateFormatInput from './DateFormatInput';
import DateFormatSpinnerInput from './DateFormatSpinnerInput';

export default MonthView;

// allow people to import with other aliases as well
export const DatePicker = Calendar;
export const DateEditor = DateInput;

export {
  MonthView,
  YearView,
  DecadeView,
  MonthDecadeView,
  DateFormatInput,
  DateFormatSpinnerInput,
  TransitionView,
  MultiMonthView,
  NavBar,
  Footer,
  Clock,
  ClockInput,
  DateInput,
  Calendar,
  TimePicker,
  TimeInput
};
