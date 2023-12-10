export const regexData = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /(\+977)?[9][6-9]\d{8}/,
};

export const proFormUserFieldValidation = {
  username: [{ min: 3, max: 20 }, { required: true }],
  firstName: [{ min: 3, max: 20 }, { required: true }],
  lastName: [{ min: 3, max: 20 }, { required: true }],

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

export const proFormGeneralValidation = {
  required: {
    required: true,
  },
};
