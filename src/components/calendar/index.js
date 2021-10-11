import React from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '../../utils/theme';
import {
  LocaleConfig,
  ExpandableCalendar,
  CalendarProvider,
  AgendaList,
} from 'react-native-calendars';
import { AgendaItem } from './AgendaItem';
import useCalendar from './useCalendar';

LocaleConfig.locales['ru'] = {
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  monthNamesShort: [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ],
  dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  today: 'Сегодня'
};

LocaleConfig.defaultLocale = 'ru';

const Calendar = () => {
  const { today, marked, events, updateEventData } = useCalendar();

  const renderItem = ({ item }) => {
    return <AgendaItem today={today} item={item} />;
  };
  return (
    <CalendarProvider
      date={today}
      disabledOpacity={0.6}
      showTodayButton={true}
      todayButtonStyle={{ top: 25 }}
      theme={{
        todayButtonTextColor: theme.colors.accent,
      }}
      onDateChanged={(day) => updateEventData(day)}
      onMonthChange={(month) => {
        // {
        //   "dateString": "2021-10-25",
        //   "day": 25,
        //   "month": 10,
        //   "timestamp": 1635120000000,
        //   "year": 2021,
        // }
        console.log('load month', month);
      }}
    >
      <ExpandableCalendar
        firstDay={1}
        markedDates={marked}
        theme={{
          selectedDayBackgroundColor: theme.colors.accent,
          todayTextColor: theme.colors.accent,
          dotColor: theme.colors.accent,
          arrowColor: theme.colors.accent
        }}
      />
      <AgendaList
        sections={events}
        renderItem={renderItem}
        renderSectionHeader={() => <View style={{ marginTop: 20 }} />} // render empty header
        scrollToNextEvent
        sectionStyle={styles.section}
      />
    </CalendarProvider>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  section: {
    backgroundColor: theme.colors.background,
  },
});
