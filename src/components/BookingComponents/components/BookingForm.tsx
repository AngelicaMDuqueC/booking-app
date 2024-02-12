import React, { useState, useEffect } from 'react';
import { ChooseDates } from './ChooseDates';
import { validateDates } from '@/utils';
import type { Booking, UserInfo } from '@/domain';

interface BookingFormProps {
  bookingID?: string;
  allBooking: Booking[];
  handleOnSubmit: (formDataDates: UserInfo) => void;
  booking?: Booking;
}

const BookingForm: React.FC<BookingFormProps> = ({ bookingID, allBooking, handleOnSubmit, booking }) => {
  const [formDataDates, setFormDataDates] = useState({
    checkInDate: booking?.checkIn! ? new Date(booking?.checkIn!).toISOString() : '',
    checkOutDate: booking?.checkOut ? new Date(booking?.checkOut!).toISOString() : '',
    firstName: booking?.userName ?? '',
    lastName: booking?.lastName ?? '',
    email: booking?.email ?? '',
  });

  useEffect(() => {
    if (!booking) return;
    setFormDataDates({
      ...formDataDates,
      checkInDate: booking?.checkIn! ? new Date(booking?.checkIn!).toISOString() : '',
      checkOutDate: booking?.checkOut ? new Date(booking?.checkOut!).toISOString() : '',
      firstName: booking?.userName ?? '',
      lastName: booking?.lastName ?? '',
      email: booking?.email,
    });
  }, [booking]);

  const [formErrors, setFormErrors] = useState<string[]>([]);

  // Update form data for each field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataDates({ ...formDataDates, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const errors = validateDates(
      new Date(formDataDates.checkInDate),
      new Date(formDataDates.checkOutDate),
      allBooking,
      bookingID ?? ''
    );
    setFormErrors(errors ? [errors] : []);
  }, [formDataDates.checkInDate, formDataDates.checkOutDate, allBooking]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData: FormData = new FormData(event.currentTarget);
    formData.append('checkInDate', formDataDates.checkInDate);
    formData.append('checkOutDate', formDataDates.checkOutDate);
    const fieldValues = Object.fromEntries(formData.entries());

    if (formErrors.length === 0) {
      handleOnSubmit(fieldValues as unknown as UserInfo);
    }
  };

  return (
    <form className=' max-w-md' onSubmit={handleFormSubmit}>
      <div className='mb-4'>
        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
          Email
        </label>
        <input
          type='email'
          name='email'
          id='email'
          value={formDataDates.email}
          onChange={handleChange}
          required
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        />
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <input
          type='text'
          name='firstName'
          id='firstName'
          placeholder='First Name'
          value={formDataDates.firstName}
          onChange={handleChange}
          required
          className='w-full rounded border p-2'
        />
        <input
          type='text'
          name='lastName'
          id='lastName'
          placeholder='Last Name'
          value={formDataDates.lastName}
          onChange={handleChange}
          required
          className='w-full rounded border p-2'
        />
      </div>

      <ChooseDates
        onDateChange={(checkInDate, checkOutDate) => setFormDataDates({ ...formDataDates, checkInDate, checkOutDate })}
        initialDates={{ checkInDate: formDataDates.checkInDate, checkOutDate: formDataDates.checkOutDate }}
      />

      {formErrors.length > 0 && (
        <div className='mt-4'>
          {formErrors.map((error, index) => (
            <p key={index} className='text-red-500'>
              {error}
            </p>
          ))}
        </div>
      )}

      <button
        type='submit'
        disabled={formErrors.length > 0}
        className='mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-300'
      >
        Submit Booking
      </button>
    </form>
  );
};

export default BookingForm;
