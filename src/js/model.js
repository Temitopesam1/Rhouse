export const state = {
  users: [],
  properties: []
}

state.properties = [
  {
      id: '1rhouse',
      name: 'A room self / mini Flat',
      price: 120000,
      location: 'Ikoyi Lagos',
      images: ['https://img.freepik.com/free-photo/complex-aerial-view-city_23-2148975282.jpg?w=740&t=st=1692954180~exp=1692954780~hmac=2863600bf4cf1aaf71e57749a78b78b3efa78ad18ef08fee7331777d22e78ba9'],
      postImgStat: {
          toilet: 1,
          bed: 1,
          bath: 0
      },
      propertyType: 'Rent',
      type: 'house',
      fullDesc: `
      1 bedroom Flat / Apartment for rent Ekoro Road Abule Egba Lagos renting for ₦350,000/year. See property details on PropertyPro.ng or browse all our range of properties in Abule Egba Lagos1 bedroom Flat / Apartment for rent in Abule Egba Lagos Rent 1 bedroom Flat / Apartment for rent mini flat in Abule Egba Lagos is a Flat / Apartment. ✓ Real-time photos. Contact now for quick details on mini flat

      A very spacious room and palour self contain (mini flat) wit a big lobby and bacony at ekoro Rd abule egba 350k per anum , f/g all round tiles wit prepaid meter . Just 2 houses to tared road any tribe.
      `,
      date: 'Added May 29 2023',
      locationOnMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63433.011300058926!2d3.35951138586153!3d6.450079837159434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4c4c84b52bb%3A0x5faec50ebdf1a1ea!2sIkoyi!5e0!3m2!1sen!2sng!4v1686417867029!5m2!1sen!2sng" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
      
  },

  {
      id: '2rhouse',
      name: 'A room self / mini Flat',
      price: 180000,
      location: 'Abule Egba',
      images: ['https://img.freepik.com/premium-photo/interior-blank-photo-frame-living-room-with-white-sofa-3d-rendering_46483-504.jpg?w=900'],
      postImgStat: {
          toilet: 1,
          bed: 1,
          bath: 1
      },
      propertyType: 'Rent',
      type: 'house',
      fullDesc: `
      1 bedroom Flat / Apartment for rent Ekoro Road Abule Egba Lagos renting for ₦350,000/year. See property details on PropertyPro.ng or browse all our range of properties in Abule Egba Lagos1 bedroom Flat / Apartment for rent in Abule Egba Lagos Rent 1 bedroom Flat / Apartment for rent mini flat in Abule Egba Lagos is a Flat / Apartment. ✓ Real-time photos. Contact now for quick details on mini flat

      A very spacious room and palour self contain (mini flat) wit a big lobby and bacony at ekoro Rd abule egba 350k per anum , f/g all round tiles wit prepaid meter . Just 2 houses to tared road any tribe.
      `,
      date: 'Added May 29 2023',
      locationOnMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31709.684731497287!2d3.1902391014137503!3d6.558170787735576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b852558dc1b21%3A0x3a11e83c596fe3a8!2sEgan-Igando%2C%20Ikotun%20102213%2C%20Lagos!5e0!3m2!1sen!2sng!4v1686199107012!5m2!1sen!2sng" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',

  },

  {
      id: '3rhouse',
      name: '2 Bed room Flat',
      price: 350000,
      location: 'Ikeja lagos',
      images: ['https://img.freepik.com/premium-vector/modern-living-rom-interior-empty-no-people-house-room-with-furniture-horizontal-vector-illustration_48369-39158.jpg?w=996'],
      postImgStat: {
          toilet: 2,
          bed: 2,
          bath: 1
      },
      propertyType: 'Rent',
      type: 'house',
      fullDesc: `
      1 bedroom Flat / Apartment for rent Ekoro Road Abule Egba Lagos renting for ₦350,000/year. See property details on PropertyPro.ng or browse all our range of properties in Abule Egba Lagos1 bedroom Flat / Apartment for rent in Abule Egba Lagos Rent 1 bedroom Flat / Apartment for rent mini flat in Abule Egba Lagos is a Flat / Apartment. ✓ Real-time photos. Contact now for quick details on mini flat

      A very spacious room and palour self contain (mini flat) wit a big lobby and bacony at ekoro Rd abule egba 350k per anum , f/g all round tiles wit prepaid meter . Just 2 houses to tared road any tribe.
      `,
      date: 'Added May 29 2023',
      locationOnMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31709.684731497287!2d3.1902391014137503!3d6.558170787735576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b852558dc1b21%3A0x3a11e83c596fe3a8!2sEgan-Igando%2C%20Ikotun%20102213%2C%20Lagos!5e0!3m2!1sen!2sng!4v1686199107012!5m2!1sen!2sng" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',

  },

  {
      id: '4rhouse',
      name: 'Bongalo',
      price: 3500000,
      location: 'Ikoyi Island',
      images: ['https://img.freepik.com/free-photo/3d-rendering-loft-luxury-living-room-with-bookshelf-near-bookshelf_105762-2224.jpg?w=740&t=st=1692954455~exp=1692955055~hmac=a7a4fbb2f1547b7bd8258343b40f7d731a810e73d714612879dffc13c74ae284'],
      postImgStat: 0,
      propertyType: 'Buy',
      type: 'land',
      fullDesc: `
      1 bedroom Flat / Apartment for rent Ekoro Road Abule Egba Lagos renting for ₦350,000/year. See property details on PropertyPro.ng or browse all our range of properties in Abule Egba Lagos1 bedroom Flat / Apartment for rent in Abule Egba Lagos Rent 1 bedroom Flat / Apartment for rent mini flat in Abule Egba Lagos is a Flat / Apartment. ✓ Real-time photos. Contact now for quick details on mini flat

      A very spacious room and palour self contain (mini flat) wit a big lobby and bacony at ekoro Rd abule egba 350k per anum , f/g all round tiles wit prepaid meter . Just 2 houses to tared road any tribe.
      `,
      date: 'Added May 29 2023',
  locationOnMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31709.684731497287!2d3.1902391014137503!3d6.558170787735576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b852558dc1b21%3A0x3a11e83c596fe3a8!2sEgan-Igando%2C%20Ikotun%20102213%2C%20Lagos!5e0!3m2!1sen!2sng!4v1686199107012!5m2!1sen!2sng" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',

  },
  {
    id: '5rhouse',
    name: 'Fertile land',
    price: 20000000,
    location: 'ilaro Island',
    images: ['https://von.gov.ng/wp-content/uploads/2022/04/Land-Conversion-in-Telangana.jpg'],
    postImgStat: 0,
    propertyType: 'Buy',
    type: 'land',
    fullDesc: `
    1 bedroom Flat / Apartment for rent Ekoro Road Abule Egba Lagos renting for ₦350,000/year. See property details on PropertyPro.ng or browse all our range of properties in Abule Egba Lagos1 bedroom Flat / Apartment for rent in Abule Egba Lagos Rent 1 bedroom Flat / Apartment for rent mini flat in Abule Egba Lagos is a Flat / Apartment. ✓ Real-time photos. Contact now for quick details on mini flat

    A very spacious room and palour self contain (mini flat) wit a big lobby and bacony at ekoro Rd abule egba 350k per anum , f/g all round tiles wit prepaid meter . Just 2 houses to tared road any tribe.
    `,
    date: 'Added Aug 29 2023',
locationOnMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31709.684731497287!2d3.1902391014137503!3d6.558170787735576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b852558dc1b21%3A0x3a11e83c596fe3a8!2sEgan-Igando%2C%20Ikotun%20102213%2C%20Lagos!5e0!3m2!1sen!2sng!4v1686199107012!5m2!1sen!2sng" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',

},
{
  id: '6rhouse',
  name: 'Stadium',
  price: 25000000,
  location: 'Abeokuta',
  images: ['https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt64cdbb5903346915/60dc52c95775160f9f24d15f/6267aa539d22f2db295bd559f43edbd25232ab0a.jpg?auto=webp&format=pjpg&width=3840&quality=60'],
  postImgStat: 0,
  propertyType: 'Buy',
  type: 'land',
  fullDesc: `
  1 bedroom Flat / Apartment for rent Ekoro Road Abule Egba Lagos renting for ₦350,000/year. See property details on PropertyPro.ng or browse all our range of properties in Abule Egba Lagos1 bedroom Flat / Apartment for rent in Abule Egba Lagos Rent 1 bedroom Flat / Apartment for rent mini flat in Abule Egba Lagos is a Flat / Apartment. ✓ Real-time photos. Contact now for quick details on mini flat

  A very spacious room and palour self contain (mini flat) wit a big lobby and bacony at ekoro Rd abule egba 350k per anum , f/g all round tiles wit prepaid meter . Just 2 houses to tared road any tribe.
  `,
  date: 'Added Aug 29 2023',
locationOnMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31709.684731497287!2d3.1902391014137503!3d6.558170787735576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b852558dc1b21%3A0x3a11e83c596fe3a8!2sEgan-Igando%2C%20Ikotun%20102213%2C%20Lagos!5e0!3m2!1sen!2sng!4v1686199107012!5m2!1sen!2sng" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',

},

];


const pushtoStorage = function(){
  localStorage.setItem('users', JSON.stringify(state.users));
}

export const newUser = function(data){
state.users.push({
  username: data.username,
  email: data.email,
  password: data.password
});
pushtoStorage();
}

const getNsetUserData = function(){
  const storage = JSON.parse(localStorage.getItem('users'));
  if(storage) state.users = storage;
}
getNsetUserData();

const clearStorage = function(){
  localStorage.clear('users');
}
// clearStorage();

export const setUserPassword = function(data){
  if(!data) return;
  const currAccount = state.users.findIndex(user => user.email === data.email);
  const status = state.users[currAccount].password = data.password;
  if(status)
  pushtoStorage();
}