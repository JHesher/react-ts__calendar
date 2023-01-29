import dayjs, { Dayjs } from 'dayjs';

export function getFullWeeksStartAndEndInMonth (date: Dayjs) {
  const month = dayjs(date).month();
  const year = dayjs(date).year();
  let weeks = [],
    firstDate = new Date(year, month, 1),
    lastDate = new Date(year, month + 1, 0),
    numDays = lastDate.getDate();
  let start = 1;
  let end;

  if (firstDate.getDay() === 1) {
    end = 7;
  } else if (firstDate.getDay() === 0) {
    let preMonthEndDay = new Date(year, month, 0);
    start = preMonthEndDay.getDate() - 6 + 1;
    end = 1;
  } else {
    let preMonthEndDay = new Date(year, month, 0);
    start = preMonthEndDay.getDate() + 1 - firstDate.getDay() + 1;
    end = 7 - firstDate.getDay() + 1;
    weeks.push({
      start: start,
      end: end
    });
    start = end + 1;
    end = end + 7;
  }

  while (start <= numDays) {
    weeks.push({
      start: start,
      end: end
    });
    start = end + 1;
    end = end + 7;
    end = start === 1 && end === 8 ? 1 : end;

    if (end > numDays && start <= numDays) {
      end = end - numDays;
      weeks.push({
        start: start,
        end: end
      });

      break;
    }
  }
  return weeks.map(({start, end}, index) => {
    const sub = +(start > end && index === 0);

    return Array.from({length: 7}, (_, index) => {
      return new Date(year, month - sub, start + index);
    });
  })
}

export const getStorageData = (keyName: string, defaultValue?: string | null) =>{
  const savedItem = localStorage.getItem(keyName);
  if (savedItem) {
    const parsedItem = JSON.parse(savedItem as string);
    return parsedItem || defaultValue;
  }
}

export const formatDate = (date: Dayjs | Date | undefined) => {
  return date && dayjs(date).format('MM/DD/YYYY')
}