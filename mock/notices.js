const getNotices = (req, res) => {
  res.json({
    data: [
      {
        id: '000000001',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: 'You have received 14 new weekly reports',
        datetime: '2017-08-09',
        type: 'notification',
      },
      {
        id: '000000002',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title: 'Qu Nini, whom you recommended, has passed the third-round interview',
        datetime: '2017-08-08',
        type: 'notification',
      },
      {
        id: '000000003',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        title: 'This template can distinguish between various notification types',
        datetime: '2017-08-07',
        read: true,
        type: 'notification',
      },
      {
        id: '000000004',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: 'The left icon is used to distinguish different types',
        datetime: '2017-08-07',
        type: 'notification',
      },
      {
        id: '000000005',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title:
          'Content should not exceed two lines, and it will be automatically truncated if it does',
        datetime: '2017-08-07',
        type: 'notification',
      },
      {
        id: '000000006',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'Qu Lili commented on your',
        description: 'Description information description information description information',
        datetime: '2017-08-07',
        type: 'message',
        clickClose: true,
      },
      {
        id: '000000007',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'Zhu Pianyou replied to you',
        description:
          'This template is used to remind who has interacted with you, with the left side displaying the avatar of "who"',
        datetime: '2017-08-07',
        type: 'message',
        clickClose: true,
      },
      {
        id: '000000008',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'Title',
        description:
          'This template is used to remind who has interacted with you, with the left side displaying the avatar of "who"',
        datetime: '2017-08-07',
        type: 'message',
        clickClose: true,
      },
      {
        id: '000000009',
        title: 'Task Name',
        description: 'The task needs to be started before 20:00 on 2017-01-12',
        extra: 'Not started',
        status: 'todo',
        type: 'event',
      },
      {
        id: '000000010',
        title: 'Third-party urgent code changes',
        description:
          'Guanlin submitted on 2017-01-06, and the code change task must be completed by 2017-01-07',
        extra: 'Ending soon',
        status: 'urgent',
        type: 'event',
      },
      {
        id: '000000011',
        title: 'Information security exam',
        description: 'Assigned to Zhuer to complete the update and release by 2017-01-09',
        extra: 'Already took 8 days',
        status: 'doing',
        type: 'event',
      },
      {
        id: '000000012',
        title: 'ABCD version release',
        description:
          'Guanlin submitted on 2017-01-06, and the code change task must be completed by 2017-01-07',
        extra: 'In progress',
        status: 'processing',
        type: 'event',
      },
    ],
  });
};

export default {
  'GET /api/notices': getNotices,
};
