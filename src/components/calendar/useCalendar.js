import { useCallback, useEffect, useMemo, useState } from 'react';
import { isEmpty } from 'lodash';

const ITEMS = [
  {
    date: '2021-10-10',
    data: [
      {
        title: 'Ношпа',
        time: '2021-10-10T06:11:31.310Z',
        taken: true,
      },
    ],
  },
  {
    date: '2021-10-12',
    data: [
      {
        title: 'Ношпа',
        time: '09:00',
        taken: true,
      },
      {
        title: 'Витамин Д',
        time: '13:00',
        taken: false,
      },
      {
        title: 'Витамин Д',
        time: '16:00',
        taken: false,
      },
    ],
  },
  {
    date: '2021-10-13',
    data: [
      {
        title: 'Ношпа',
        time: '09:00',
        taken: false,
      },
      {
        title: 'Витамин Д',
        time: '13:00',
        taken: false,
      },
    ],
  },
  {
    date: '2021-10-16',
    data: [
      {
        title: 'Ношпа',
        time: '09:00',
        taken: false,
      },
    ],
  },
];

const useCalendar = () => {
  const [events, setEvents] = useState([]);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // initial render
    updateEventData(today);
  }, []);

  const marked = useMemo(() => {
    const result = {};
    ITEMS.forEach((item) => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
        result[item.date] = { marked: true };
      } else {
        result[item.date] = { disabled: true };
      }
    });
    return result;
  }, []);

  const updateEventData = useCallback(
    (day) => {
      const event = ITEMS.filter((item) => item.date === day);
      setEvents(event);
    },
    [setEvents]
  );

  return { today, marked, events, updateEventData };
};

export default useCalendar;
