const advancedOperation1 = [
  {
    key: 'op1',
    type: 'Subscription relationship effective',
    name: 'Qu Lili',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op2',
    type: 'Financial reexamination',
    name: 'Fu Xiao Xiao',
    status: 'reject',
    updatedAt: '2017-10-03  19:23:12',
    memo: 'Reasons for rejection',
  },
  {
    key: 'op3',
    type: 'Department initial review',
    name: 'Zhou Mao Mao',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op4',
    type: 'Submit order',
    name: 'Lin Dong Dong',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: 'Excellent',
  },
  {
    key: 'op5',
    type: 'Create order',
    name: 'Han Ya Ya',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation2 = [
  {
    key: 'op1',
    type: 'Subscription relationship effective',
    name: 'Qu Lili',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation3 = [
  {
    key: 'op1',
    type: 'Create order',
    name: 'Han Ya Ya',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

function getProfileAdvancedData(req, res) {
  const result = {
    data: {
      advancedOperation1,
      advancedOperation2,
      advancedOperation3,
    },
  };
  return res.json(result);
}

export default {
  'GET  /api/profile/advanced': getProfileAdvancedData,
};
