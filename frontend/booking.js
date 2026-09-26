document.addEventListener('DOMContentLoaded', () => {
  const authToken = localStorage.getItem('auth-token');

  if (!authToken) {
    window.location.href = "../index.html";
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const areaSelect = document.getElementById('area');
  const locationSelect = document.getElementById('Location');
  const hotelSelect = document.getElementById('hotel_name');
  const roomSelect = document.getElementById('room_name');

  areaSelect.addEventListener('change', () => {
    const selectedArea = areaSelect.value;
    fetchLocationsByArea(selectedArea);
  });

  locationSelect.addEventListener('change', () => {
    const selectedLocation = locationSelect.value;
    const selectedArea = areaSelect.value;
    fetchHotelNames(selectedLocation, selectedArea);
  });

  hotelSelect.addEventListener('change', () => {
    const selectedHotel = hotelSelect.value;
    const selectedLocation = locationSelect.value;
    fetchRoomsByHotelAndLocation(selectedLocation, selectedHotel);
  });

  roomSelect.addEventListener('change', () => {
    const selectedRoom = roomSelect.value;
    const selectedHotel = hotelSelect.value;
    const selectedLocation = locationSelect.value;
    getPriceForSelectedRoom(selectedLocation,selectedHotel, selectedRoom);
    console.log(`Selected Room: ${selectedRoom}`);
  });
});


const displayBookingForm = () => {
  const hotelForm = document.getElementById('create');
  const hotelTable = document.getElementById('bookListContainer');

  hotelForm.style.display = 'block';
  hotelTable.style.display = 'none';
}

const displayListRooms = () => {
  const hotelForm = document.getElementById('create');
  const hotelTable = document.getElementById('bookListContainer');

  hotelForm.style.display = 'none';
  hotelTable.style.display = 'block';
  
  // Always refresh the booking list when this function is called
  displayBookingList();
}


async function fetchLocationsByArea(area) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/hotel/search/${area}`);
    const data = await response.json();
    console.log(data);

    if (Array.isArray(data)) {
      const locations = data.map(hotel => hotel.Location);
      populateLocationDropdown(locations);
    } else {
      console.error('Error: Invalid location data received from the API.');
    }
  } catch (error) {
    console.error('Error fetching locations:', error);
  }
}

function populateLocationDropdown(locations) {
  const locationSelect = document.getElementById('Location');
  locationSelect.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.text = 'Select Location';
  locationSelect.add(defaultOption);

  const uniqueLocations = [...new Set(locations)];

  uniqueLocations.forEach(locationName => {
    const option = document.createElement('option');
    option.value = locationName;
    option.text = locationName;
    locationSelect.add(option);
  });
}

async function fetchHotelNames(location, area) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/hotel/search/${area}/${location}`);
    const data = await response.json();

    if (Array.isArray(data)) {
      const hotelNames = data.map(hotel => hotel.Name_of_the_Hotel);
      populateHotelDropdown(hotelNames);
    } else {
      console.error('Error: Invalid hotel data received from the API.');
    }
  } catch (error) {
    console.error('Error fetching hotel names:', error);
  }
}

function populateHotelDropdown(hotelNames) {
  const hotelSelect = document.getElementById('hotel_name');
  hotelSelect.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.text = 'Select Hotel';
  hotelSelect.add(defaultOption);

  hotelNames.forEach(hotelName => {
    const option = document.createElement('option');
    option.value = hotelName;
    option.text = hotelName;
    hotelSelect.add(option);
  });
}

async function fetchRoomsByHotelAndLocation(location, hotelName) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/rooms/${location}/${hotelName}`);
    const data = await response.json();

    if (Array.isArray(data)) {
      populateRoomDropdown(data);
    } else {
      console.error('Error: Invalid room data received from the API.');
    }
  } catch (error) {
    console.error('Error fetching rooms:', error);
  }
}

function populateRoomDropdown(rooms) {
  const roomSelect = document.getElementById('room_name');
  roomSelect.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.text = 'Select Room';
  roomSelect.add(defaultOption);

  rooms.forEach(room => {
    const option = document.createElement('option');
    option.value = room.roomType;
    option.text = `${room.roomType}`;
    roomSelect.add(option);
  });
}

// async function fetchPrice(location, hotelName, room) {
//   try {
//     const response = await fetch(`http://127.0.0.1:3000/rooms/${location}/${hotelName}/${room}`);
//     const data = await response.text();

//     if (data) {
//       return data; 
//     } else {
//       console.error('Error: Invalid data received from the API.');
//       return null; 
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return null;
//   }
// }

async function fetchPrice(location, hotelName, roomType) {
  console.log('Fetching price for:', location, hotelName, roomType);

  try {
      const response = await fetch(`http://127.0.0.1:3000/rooms/${location}/${hotelName}/${roomType}`);

      if (!response.ok) {
          throw new Error(`Error fetching room price: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched Price Data:', data);
      console.log('Price Value:', data.price);
      return data;
  } catch (error) {
      console.error('Error:', error);
      return null;
  }
}



async function getPriceForSelectedRoom(location, hotelName, room) {
  const priceDiv = document.getElementById('Price');

  const roomPrice = await fetchPrice(location, hotelName, room);
  console.log("roommmm",roomPrice);

  if (roomPrice !== null && roomPrice.price !== undefined) {
    priceDiv.textContent = `${roomPrice.price}`;
  } else {
    console.error('Error fetching room price.');
    priceDiv.textContent = 'Price: N/A';
  }
}

// async function displayBookingList() {
//   const dataTable = document.getElementById('booking-list');
//   dataTable.innerHTML = '';

//   const name = localStorage.getItem('username');
//   console.log(name);

//   try {
//     const response = await fetch(`http://127.0.0.1:3000/bookings/${name}`);
//     const data = await response.json(); // Parse the response as JSON

//     if (Array.isArray(data) && data.length > 0) {
//       data.forEach(booking => {
//         const row = dataTable.insertRow();
//         row.innerHTML = `<tr>
//           <td>${booking.hotelName}</td>
//           <td>${booking.roomType}</td>
//           <td>${booking.Price}</td>
//           <td>${booking.location}</td>
//           <td>${booking.area}</td>
//           <td class="functions" id="Actions">
//             <button class="delete" onclick="deleteBooking('${booking._id}');">Cancel</button>
//           </td>
//         </tr>`;
//         console.log("aaaa",booking._id)
//       });
//     } else {
//       console.log("No bookings found");
//     }
//   } catch (error) {
//     console.error('Fetch error:', error);
//   }
// }

// Ensure the `deleteBooking` function is globally accessible
// async function deleteBooking(bookingId) {
//   try {
//     // Send DELETE request to the server
//     const response = await fetch(`http://127.0.0.1:3000/bookings/${bookingId}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       console.log("Booking deleted successfully");
//       // Remove the row corresponding to the booking
//       const row = document.querySelector(`button[data-id="${bookingId}"]`).closest('tr');
//       if (row) {
//         row.remove();
//       }
//     } else {
//       console.error("Failed to delete booking");
//     }
//   } catch (error) {
//     console.error("Error deleting booking:", error);
//   }
// }

async function displayBookingList() {
  const dataTable = document.getElementById('booking-list');
  const emptyState = document.getElementById('emptyState');
  const bookTable = document.getElementById('bookList');
  const tableHeader = document.querySelector('#table-header tr');
  const bookingListTitle = document.getElementById('bookingListTitle');
  const pageHeader = document.querySelector('.page-header');
  
  dataTable.innerHTML = '';

  // Check if we should show all bookings (for admin dashboard) or user-specific bookings
  const urlParams = new URLSearchParams(window.location.search);
  const viewMode = urlParams.get('view');
  const userRole = localStorage.getItem('userRole');
  const name = localStorage.getItem('username');
  
  // Update page title and table header based on view mode
  if (viewMode === 'all' && userRole === 'admin') {
    // Hide the Manage Reservations header for all bookings view
    if (pageHeader) {
      pageHeader.style.display = 'none';
    }
    // Update title for all bookings view
    if (bookingListTitle) {
      bookingListTitle.textContent = 'All User Bookings';
    }
    // Add User column header for all bookings view
    tableHeader.innerHTML = `
      <th><i class="ri-user-line"></i> User</th>
      <th><i class="ri-building-line"></i> Hotel Name</th>
      <th><i class="ri-door-line"></i> Room Type</th>
      <th><i class="ri-money-dollar-circle-line"></i> Price</th>
      <th><i class="ri-map-pin-line"></i> Location</th>
      <th><i class="ri-compass-line"></i> Area</th>
      <th><i class="ri-shield-check-line"></i> Status</th>
      <th><i class="ri-settings-3-line"></i> Actions</th>
    `;
  } else {
    // Show the Manage Reservations header for personal bookings view
    if (pageHeader) {
      pageHeader.style.display = 'block';
    }
    // Update title for personal bookings view
    if (bookingListTitle) {
      bookingListTitle.textContent = 'My Booking History';
    }
    // Standard header without User column
    tableHeader.innerHTML = `
      <th><i class="ri-building-line"></i> Hotel Name</th>
      <th><i class="ri-door-line"></i> Room Type</th>
      <th><i class="ri-money-dollar-circle-line"></i> Price</th>
      <th><i class="ri-map-pin-line"></i> Location</th>
      <th><i class="ri-compass-line"></i> Area</th>
      <th><i class="ri-shield-check-line"></i> Status</th>
      <th><i class="ri-settings-3-line"></i> Actions</th>
    `;
  }
  
  // Determine which endpoint to use
  let fetchUrl;
  if (viewMode === 'all' && userRole === 'admin') {
    // Fetch all bookings for admin dashboard view
    fetchUrl = `http://127.0.0.1:3000/bookings`;
    console.log("Fetching all bookings for admin view");
  } else {
    // Fetch only the current user's bookings
    fetchUrl = `http://127.0.0.1:3000/bookings/${name}`;
    console.log("Fetching bookings for user:", name);
  }

  try {
    const response = await fetch(fetchUrl);
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      // Hide empty state, show table
      if (emptyState) emptyState.style.display = 'none';
      if (bookTable) bookTable.style.display = 'table';
      
      data.forEach(booking => {
        const row = dataTable.insertRow();
        // Include username if viewing all bookings
        const usernameCell = (viewMode === 'all' && userRole === 'admin') 
          ? `<td>${booking.username || 'N/A'}</td>` 
          : '';
        
        row.innerHTML = `
          ${usernameCell}
          <td>${booking.hotelName || 'N/A'}</td>
          <td>${booking.roomType || 'N/A'}</td>
          <td>${booking.Price ? `₹${booking.Price}` : 'N/A'}</td>
          <td>${booking.location || 'N/A'}</td>
          <td>${booking.area || 'N/A'}</td>
          <td><span class="badge badge-success">Confirmed</span></td>
          <td class="functions">
            <button class="delete" data-id="${booking._id}">Cancel</button>
          </td>
        `;

        // Attach event listener for the delete button
        const deleteButton = row.querySelector('.delete');
        deleteButton.addEventListener('click', () => deleteBooking(booking._id));
      });
    } else {
      console.log("No bookings found");
      // Show empty state, hide table
      if (emptyState) emptyState.style.display = 'block';
      if (bookTable) bookTable.style.display = 'none';
    }
  } catch (error) {
    console.error('Fetch error:', error);
    // Show empty state on error
    if (emptyState) emptyState.style.display = 'block';
    if (bookTable) bookTable.style.display = 'none';
  }
}

// Don't auto-load bookings on page load - let the page decide when to load


async function deleteBooking(BookingId) {
    
  const confirmation = window.confirm('Are you sure you want to delete this ');

  if (confirmation) {
      try {
          const response = await fetch(`http://127.0.0.1:3000/bookings/${BookingId}`, {
              method: 'DELETE',
          });

          if (response.status === 200) {
            displayBookingList();
          } else {
              console.error('Failed to delete booking');
          }
      } catch (error) {
          console.error(error);
      }
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const createForm = document.getElementById('create-form');
  createForm.addEventListener('submit', handleBookingCreation);
});

async function handleBookingCreation(event) {
  event.preventDefault();

  const name = localStorage.getItem('username');
  console.log(name);

  const areaSelect = document.getElementById('area');
  const locationSelect = document.getElementById('Location');
  const hotelSelect = document.getElementById('hotel_name');
  const roomSelect = document.getElementById('room_name');
  

  const selectedArea = areaSelect.value;
  const selectedLocation = locationSelect.value;
  const selectedHotel = hotelSelect.value;
  const selectedRoom = roomSelect.value;
  // Get the price text content and ensure it's a clean number/string
  const priceText = document.getElementById('Price').textContent;
  // Remove any "Price: " prefix if it exists and clean the value
  const priceValue = priceText.replace('Price: ', '').replace('N/A', '').replace('₹', '');

  // Validate all fields are selected
  if (!selectedArea || !selectedLocation || !selectedHotel || !selectedRoom || !priceValue || priceValue === '0.00') {
    showNotification('Please fill in all fields and select a room to continue.', 'error');
    return;
  }

  console.log(selectedArea, selectedLocation,selectedHotel, selectedRoom, priceValue);

  try {
    const response = await fetch('http://127.0.0.1:3000/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: name,
        area: selectedArea,
        location: selectedLocation,
        hotelName: selectedHotel,
        roomType: selectedRoom,
        Price: priceValue,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      
      // Show success notification
      showNotification(`Booking confirmed successfully! 
        Hotel: ${selectedHotel}
        Room: ${selectedRoom}
        Price: ₹${priceValue}`, 'success');
      
      // Clear all form fields
      clearBookingForm();
      
      // Refresh the booking list
      displayBookingList();
      
      // Optionally switch to the booking list view after a delay
      setTimeout(() => {
        displayListRooms();
      }, 2000);
    } else {
      const errorData = await response.json();
      showNotification(`Booking failed: ${errorData.message || 'Please try again.'}`, 'error');
    }
  } catch (error) {
    console.error('Error creating booking:', error);
    showNotification('An error occurred while creating the booking. Please try again.', 'error');
  }
}

// Function to clear all form fields
function clearBookingForm() {
  // Reset all select elements
  document.getElementById('area').value = '';
  document.getElementById('Location').innerHTML = '<option value="">Select city first...</option>';
  document.getElementById('hotel_name').innerHTML = '<option value="">Select location first...</option>';
  document.getElementById('room_name').innerHTML = '<option value="">Select hotel first...</option>';
  
  // Reset price display
  document.getElementById('Price').textContent = '₹0.00';
  
  // Reset form if needed
  const form = document.getElementById('create-form');
  if (form) {
    form.reset();
  }
}

// Function to show notification popup
function showNotification(message, type = 'info') {
  // Remove any existing notification
  const existingNotification = document.querySelector('.notification-popup');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification-popup notification-${type}`;
  
  // Add icon based on type
  const icon = type === 'success' ? 'ri-checkbox-circle-fill' : 
                type === 'error' ? 'ri-error-warning-fill' : 
                'ri-information-fill';
  
  notification.innerHTML = `
    <div class="notification-content">
      <i class="${icon}"></i>
      <div class="notification-message">${message.replace(/\n/g, '<br>')}</div>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
        <i class="ri-close-line"></i>
      </button>
    </div>
  `;
  
  // Add to body
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Function to go back to dashboard
function goBackToDashboard() {
  const userRole = localStorage.getItem('userRole');
  
  if (userRole === 'admin') {
    window.location.href = './admin.html';
  } else {
    window.location.href = './user.html';
  }
}

// Function to logout
function logout() {
  localStorage.removeItem('auth-token');
  localStorage.removeItem('username');
  window.location.href = './index.html';
}

// Initialize the page - show booking list by default
document.addEventListener('DOMContentLoaded', () => {
  // Set username in the header
  const usernameElement = document.querySelector('#username span');
  if (usernameElement) {
    usernameElement.textContent = localStorage.getItem('username') || 'User';
  }
  
  // Show admin navigation items if user is admin
  const userRole = localStorage.getItem('userRole');
  if (userRole === 'admin') {
    const adminOnlyElements = document.querySelectorAll('.admin-only');
    adminOnlyElements.forEach(element => {
      element.style.display = '';
    });
    // Set header title for admin
    const headerTitle = document.getElementById('headerTitle');
    if (headerTitle) {
      headerTitle.textContent = 'Luxe Hotels Admin';
    }
  }
  
  // Display the booking list on initial load
  displayListRooms();
});
