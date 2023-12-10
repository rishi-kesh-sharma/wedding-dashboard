// eslint-disable-next-line import/no-extraneous-dependencies
const titles = ['Alipay', 'Angular', 'MyRAJ', 'MyRAJ Pro', 'Bootstrap', 'React', 'Vue', 'Webpack'];
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // MyRAJ
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // MyRAJ Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];
const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const desc = [
  'That is something inherent, they cannot reach and cannot touch',
  'Hope is a good thing, maybe the best, good things will not disappear',
  'Life is like a box of chocolates, the results are often unexpected',
  'There are so many taverns in town, but she just walked into my tavern',
  'At that time, I only knew what I wanted, never thought about what I had',
];
const user = [
  'Fu Xiao Xiao',
  'Qu Li Li',
  'Lin Dong Dong',
  'Zhou Xing Xing',
  'Wu Jia Hao',
  'Zhu Pian You',
  'Yu Jiang',
  'Le Ge',
  'Tan Xiao Yi',
  'Zhong Ni',
]; // Current user information

const currentUseDetail = {
  name: 'Serati Ma',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  userid: '00000001',
  email: 'antdesign@alipay.com',
  signature: 'Harbor a hundred rivers, with tolerance comes greatness',
  title: 'Interaction Expert',
  group:
    'Ant Financial - Some Business Group - Some Platform Department - Some Technology Department - UED',
  tags: [
    {
      key: '0',
      label: 'Very thoughtful',
    },
    {
      key: '1',
      label: 'Focused on design',
    },
    {
      key: '2',
      label: 'Spicy~',
    },
    {
      key: '3',
      label: 'Long legs',
    },
    {
      key: '4',
      label: 'Sichuan girl',
    },
    {
      key: '5',
      label: 'Harbor a hundred rivers',
    },
  ],
  notice: [
    {
      id: 'xxx1',
      title: titles[0],
      logo: avatars[0],
      description: 'That is something inherent, they cannot reach and cannot touch',
      updatedAt: new Date(),
      member: 'Science Brick Team',
      href: '',
      memberLink: '',
    },
    {
      id: 'xxx2',
      title: titles[1],
      logo: avatars[1],
      description: 'Hope is a good thing, maybe the best, good things will not disappear',
      updatedAt: new Date('2017-07-24'),
      member: 'The whole group is Wu Yanju',
      href: '',
      memberLink: '',
    },
    {
      id: 'xxx3',
      title: titles[2],
      logo: avatars[2],
      description: 'There are so many taverns in town, but she just walked into my tavern',
      updatedAt: new Date(),
      member: 'Middle school girl group',
      href: '',
      memberLink: '',
    },
    {
      id: 'xxx4',
      title: titles[3],
      logo: avatars[3],
      description: 'At that time, I only knew what I wanted, never thought about what I had',
      updatedAt: new Date('2017-07-23'),
      member: 'Programmer Daily',
      href: '',
      memberLink: '',
    },
    {
      id: 'xxx5',
      title: titles[4],
      logo: avatars[4],
      description: 'Winter is coming',
      updatedAt: new Date('2017-07-23'),
      member: 'High-standard design team',
      href: '',
      memberLink: '',
    },
    {
      id: 'xxx6',
      title: titles[5],
      logo: avatars[5],
      description: 'Life is like a box of chocolates, the results are often unexpected',
      updatedAt: new Date('2017-07-23'),
      member: 'Lying to you to learn computer',
      href: '',
      memberLink: '',
    },
  ],
  notifyCount: 12,
  unreadCount: 11,
  country: 'China',
  geographic: {
    province: {
      label: 'Zhejiang Province',
      key: '330000',
    },
    city: {
      label: 'Hangzhou',
      key: '330100',
    },
  },
  address: 'No. 77 Gongzhuan Road, Xihu District',
  phone: '0752-268888888',
};

function fakeList(count) {
  const list = [];

  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 10],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      cover: parseInt(`${i / 4}`, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
      status: ['active', 'exception', 'normal'][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'https://ant.design',
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      subDescription: desc[i % 5],
      description:
        'In the development process of the middle platform product, there will be different design specifications and implementation methods, but often there are many similar pages and components, and these similar components will be abstracted into a set of standard specifications.',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:
        'Paragraph concept: Ant Financial design platform ant.design, with the smallest workload, seamlessly integrates into the Ant Financial ecosystem, and provides an experience solution that spans design and development. Ant Financial design platform ant.design, with the smallest workload, seamlessly integrates into the Ant Financial ecosystem, and provides an experience solution that spans design and development.',
      members: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: 'Qu Li Li',
          id: 'member1',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: 'Wang Zhao Jun',
          id: 'member2',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: 'Dong Na Na',
          id: 'member3',
        },
      ],
    });
  }

  return list;
}

function getFakeList(req, res) {
  const params = req.query;
  const count = Number(params.count) * 1 || 5;
  const result = fakeList(count);
  return res.json({
    data: {
      list: result,
    },
  });
} // Get user information

function getCurrentUser(req, res) {
  return res.json({
    data: currentUseDetail,
  });
}

export default {
  'GET  /api/fake_list_Detail': getFakeList,
  // Support values are Object and Array
  'GET  /api/currentUserDetail': getCurrentUser,
};
