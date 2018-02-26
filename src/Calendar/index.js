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

import MonthView from './src/MonthView';

import TimePicker from './src/TimePicker';
import TimeInput from './src/TimeInput';

import TransitionView from './src/TransitionView';
import MultiMonthView from './src/MultiMonthView';

import MonthDecadeView from './src/MonthDecadeView';
import YearView from './src/YearView';
import DecadeView from './src/DecadeView';

import NavBar from './src/NavBar';
import Footer from './src/Footer';

import Clock from './src/Clock';
import ClockInput from './src/ClockInput';

import DateInput from './src/DateInput';
import Calendar from './src/Calendar';
import DateFormatInput from './src/DateFormatInput';
import DateFormatSpinnerInput from './src/DateFormatSpinnerInput';

export default Calendar;

// allow people to import with other aliases as well
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
