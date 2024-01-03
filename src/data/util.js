export const regexData = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /(\+977)?[9][6-9]\d{8}/,
  fbLink:
    /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/,
  instaLink:
    /(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9-_\.]+)/im,
};

export const proFormUserFieldValidation = {
  username: [{ min: 3, max: 20 }, { required: true }],
  role: [{ required: true }],
  name: [{ min: 3, max: 20 }, { required: true }],
  password: [
    { min: 3, max: 20 },
    { required: true },
    {
      pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/,
      message: 'At Least One Uppercase,One Digit and 5 Characters are required',
    },
  ],
  confirm: [
    { min: 8, max: 20 },
    { required: true },
    {
      pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/,
      message:
        'At Least One Uppercase,One Digit and special character , minimum eight Characters are required',
    },
  ],
};
export const proFormBlogFieldValidation = {
  title: [{ min: 20, max: 100 }, { required: true }],
  short_description: [{ min: 10, max: 200 }, { required: true }],
  meta_description: [{ min: 10, max: 200 }, { required: false }],
  slug_url: [
    { min: 5, max: 80 },
    { required: true },
    {
      message: 'Each tag should be separated by underscore',
      pattern: /^(\w+(_\w+)*)?$/,
    },
  ],

  tags: [
    { required: true },
    {
      message: 'Each tag should be separated by comma and start with #',
      pattern: /^#(\w+)(,#\w+)*$/,
    },
  ],

  meta_tags: [
    { required: true },
    {
      message: 'Each meta tag should be separated by comma and start with #',
      pattern: /^#(\w+)(,#\w+)*$/,
    },
  ],
  keywords: [
    { required: true },
    {
      message: 'Each keyword should be separated by comma',
      pattern: /^\w+(,\w+)*$/,
    },
  ],
  description: [{ min: 50, max: 1000 }, { required: true }],
};
export const proFormEventFieldValidation = {
  title: [{ min: 10, max: 100 }, { required: true }],
  venue: [{ min: 3, max: 100 }, { required: true }],
  startDateTime: [
    { required: true },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (value || value > Date.now()) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('The start Date cannot be past date'));
      },
    }),
  ],
  endDateTime: [
    { required: true },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!getFieldValue('startDateTime')) {
          return Promise.reject(new Error('First Enter start date time'));
        }
        if (!value) {
          return Promise.reject(new Error('The end date time is required'));
        }
        if (value < Date.now()) {
          return Promise.reject(new Error('The end Date cannot be past date'));
        }

        if (value + 1 < getFieldValue('startDateTime')) {
          return Promise.reject(
            new Error('The end date should be at least one day after start date time'),
          );
        }
        return Promise.resolve();
      },
    }),
  ],
  brideName: [{ min: 3, max: 30 }, { required: true }],
  groomName: [{ min: 3, max: 30 }, { required: true }],
  brideAddress: [{ min: 3, max: 30 }, { required: true }],
  groomAddress: [{ min: 3, max: 30 }, { required: true }],
  brideAge: [{ min: 3, max: 100 }, { required: true }],
  groomAge: [{ min: 3, max: 100 }, { required: true }],
  days: [{ required: true }],
  description: [{ min: 100, max: 1000 }, { required: true }],
  friend: {
    name: [{ min: 3, max: 30 }, { required: true }],
    side: [{ required: true }],
    relation: [{ min: 3, max: 30 }, { required: true }],
    fbLink: [
      {
        pattern: regexData.fbLink,
        message: 'Enter valid facebook link!',
      },
    ],
    instaLink: [
      {
        pattern: regexData.instaLink,
        message: 'Enter valid instagram link!',
      },
    ],
  },
  guest: {
    name: [{ min: 3, max: 30 }, { required: true }],
    email: [
      {
        required: true,
      },
      {
        pattern: regexData.email,
        message: 'Enter valid email address!',
      },
    ],
    phone: [
      {
        required: true,
      },
      {
        pattern: regexData.phone,
        message: 'Enter valid phone number!',
      },
    ],
    address: [{ min: 3, max: 30 }, { required: true }],
  },
  day: {
    title: [{ min: 10, max: 100 }, { required: true }],
    location: [{ min: 3, max: 30 }, { required: true }],
    dateTime: [
      { required: true },
      { required: true },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (value || value > Date.now()) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('The  Date time cannot be past date'));
        },
      }),
    ],
    description: [{ min: 20, max: 300 }, { required: true }],
  },
  loveStory: {
    title: [{ min: 10, max: 100 }, { required: true }],
    dateTime: [{ required: true }],
    description: [{ min: 20, max: 300 }, { required: true }],
  },
};

export const proFormCategoryFieldValidation = {
  name: [{ min: 3, max: 20 }, { required: true }],
  alias: [{ min: 3, max: 20 }, { required: true }],
  description: [{ min: 20, max: 300 }, { required: true }],
  subCategories: [{ required: true }],
};
export const proFormSubCategoryFieldValidation = {
  name: [{ min: 3, max: 20 }, { required: true }],
  alias: [{ min: 3, max: 20 }, { required: true }],
  description: [{ min: 20, max: 300 }, { required: true }],
};
export const proFormAmenityFieldValidation = {
  name: [{ min: 3, max: 20 }, { required: true }],
  alias: [{ min: 3, max: 20 }, { required: true }],
  description: [{ min: 20, max: 300 }, { required: true }],
};
export const proFormHighlightFieldValidation = {
  name: [{ min: 3, max: 20 }, { required: true }],
  alias: [{ min: 3, max: 20 }, { required: true }],
  description: [{ min: 20, max: 300 }, { required: true }],

  relatedCategories: [
    {
      required: true,
    },
  ],
  relatedSubCategories: [
    {
      required: true,
    },
  ],
};
export const proFormFaqFieldValidation = {
  question: [{ min: 5, max: 200 }, { required: true }],
  answer: [{ min: 10, max: 500 }, { required: true }],
};

export const proFormGeneralValidation = {
  required: {
    required: true,
  },
};

export const proFormTravelDetailFieldValidation = {
  airline: [{ min: 10, max: 30 }, { required: true }],
  flightNumber: [{ min: 3, max: 30 }, { required: true }],
  arrivalDateTime: [{ required: true }],
  departureDateTime: [{ required: true }],
  arrivalPlace: [{ min: 3, max: 30 }, { required: true }],
  departurePlace: [{ min: 3, max: 30 }, { required: true }],
  email: [
    {
      required: true,
    },
    { pattern: regexData.email, message: 'Please Enter valid email' },
  ],
};
export const proFormRoomFieldValidation = {
  hotel: [{ min: 3, max: 30 }, { required: true }],
  roomNo: [{ min: 1, max: 30 }, { required: true }],
  checkInDate: [{ required: true }],
  checkOutDate: [{ required: true }],
};
export const getAvatar = (name) => {
  return `https://ui-avatars.com/api/?length=1&rounded=true&background=random&name=${name}`;
};

export const proFormRoleOptions = [
  {
    value: 'admin',
    Label: 'Admin',
  },
  {
    value: 'agency',
    Label: 'Agency',
  },
];
