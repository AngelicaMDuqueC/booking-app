import { useEffect, useState } from 'react';
import { Datepicker } from 'flowbite-react';

interface ChooseDatesProps {
  onDateChange: (checkInDate: string, checkOutDate: string) => void;
  initialDates: { checkInDate: string; checkOutDate: string };
}

export const ChooseDates = ({ onDateChange, initialDates }: ChooseDatesProps) => {
  const [checkInDate, setCheckInDate] = useState(() =>
    initialDates.checkInDate ? new Date(initialDates.checkInDate) : new Date()
  );
  const [checkOutDate, setCheckOutDate] = useState(() =>
    initialDates.checkOutDate ? new Date(initialDates.checkOutDate) : new Date()
  );

  const handleCheckInDateChange = (newDate: Date) => {
    setCheckInDate(newDate);
    onDateChange(newDate.toISOString(), checkOutDate.toISOString());
  };

  const handleCheckOutDateChange = (newDate: Date) => {
    setCheckOutDate(newDate);
    onDateChange(checkInDate.toISOString(), newDate.toISOString());
  };

  useEffect(() => {
    if (!initialDates.checkInDate || !initialDates.checkOutDate) return;
    setCheckInDate(new Date(initialDates.checkInDate));
    setCheckOutDate(new Date(initialDates.checkOutDate));
  }, [initialDates.checkInDate, initialDates.checkOutDate]);

  return (
    <div className='mb-4'>
      <div>
        <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'>Check-in Date</label>
        <Datepicker
          defaultDate={checkInDate}
          autoHide={true}
          onSelectedDateChanged={handleCheckInDateChange}
          title='Select check-in date'
          minDate={new Date()}
        />
      </div>
      <div>
        <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'>Check-out Date</label>
        <Datepicker
          defaultDate={checkOutDate ? checkOutDate : new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)}
          autoHide={true}
          onSelectedDateChanged={handleCheckOutDateChange}
          title='Select check-out date'
          minDate={new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)}
        />
      </div>
    </div>
  );
};
