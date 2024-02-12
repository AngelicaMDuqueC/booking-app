#Acceptance Criteria for a Booking Feature

###State Initialization:
The store initializes with a default state containing an empty list of bookings.

    Test: Verify that upon initialization, the booking list is empty.

##Add Booking:
The application can add a new booking to the store.

    Test: When a new booking is added, the booking list length increases by one, and the booking details match what was inputted.

##Delete Booking:
The application allows deletion of an existing booking from the store.

    Test: After deleting a booking, it no longer exists in the booking list.

##Update Booking:
The application supports updating an existing booking's details.

    Test: Modifying a booking updates the booking's details in the store without changing the list length.

##List Bookings:
The application can list all bookings.

    Test: The displayed list matches the bookings stored in the state.

##Error Handling:
The store correctly handles errors for invalid operations (e.g., deleting a non-existent booking).

    Test: Attempting an invalid operation does not change the state and optionally triggers an error message.

##Performance:
State updates do not cause unnecessary re-renders in the UI.

    Test: Ensure that state changes only re-render the components that rely on the changed parts of the state.
