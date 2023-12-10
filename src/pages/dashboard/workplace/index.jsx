// Import necessary components and libraries
import { Avatar, Card, Col, List, Skeleton, Row, Statistic } from 'antd';
import { Radar } from '@ant-design/charts';
import { Link, useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import { queryProjectNotice, queryActivities, fakeChartData } from './service';

// Navigation links
const links = [
  {
    title: 'Operation 1',
    href: '',
  },
  {
    title: 'Operation 2',
    href: '',
  },
  {
    title: 'Operation 3',
    href: '',
  },
  {
    title: 'Operation 4',
    href: '',
  },
  {
    title: 'Operation 5',
    href: '',
  },
  {
    title: 'Operation 6',
    href: '',
  },
];

// Content for the page header
const PageHeaderContent = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;

  if (!loading) {
    return (
      // Display a skeleton while data is loading
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    );
  }

  return (
    // Display user information in the page header
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          Good morning,
          {currentUser.name}, wish you a happy day!
        </div>
        <div>
          {currentUser.title} |{currentUser.group}
        </div>
      </div>
    </div>
  );
};

// Extra content for the page
const ExtraContent = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="Projects" value={56} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="Team Ranking" value={8} suffix="/ 24" />
    </div>
    <div className={styles.statItem}>
      <Statistic title="Project Visits" value={2223} />
    </div>
  </div>
);

// Workplace component
const Workplace = () => {
  // Fetch project notice data using useRequest hook
  const { loading: projectLoading, data: projectNotice = [] } = useRequest(queryProjectNotice);
  // Fetch activities data using useRequest hook
  const { loading: activitiesLoading, data: activities = [] } = useRequest(queryActivities);
  // Fetch fake chart data using useRequest hook
  const { data } = useRequest(fakeChartData);

  // Render activities in the list
  const renderActivities = (item) => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }
      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  return (
    // Display the main page container
    <PageContainer
      content={
        // Include the page header content
        <PageHeaderContent
          currentUser={{
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            name: 'Daniel Wu',
            userid: '00000001',
            email: 'antdesign@alipay.com',
            signature: 'Be tolerant to diversity, tolerance is a virtue',
            title: 'Interaction Expert',
            group:
              'Ant Financial - Some Business Group - Some Platform Department - Some Technology Department - UED',
          }}
        />
      }
      // Include extra content in the page
      extraContent={<ExtraContent />}
    >
      {/* Display a row with two columns */}
      <Row gutter={24}>
        {/* Left column (projects and activities) */}
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          {/* Display a card with a list of ongoing projects */}
          <Card
            className={styles.projectList}
            style={{
              marginBottom: 24,
            }}
            title="Ongoing Projects"
            bordered={false}
            extra={<Link to="/">All Projects</Link>}
            loading={projectLoading}
            bodyStyle={{
              padding: 0,
            }}
          >
            {/* Display each project as a card grid */}
            {projectNotice.map((item) => (
              <Card.Grid className={styles.projectGrid} key={item.id}>
                <Card
                  bodyStyle={{
                    padding: 0,
                  }}
                  bordered={false}
                >
                  {/* Display project information */}
                  <Card.Meta
                    title={
                      <div className={styles.cardTitle}>
                        <Avatar size="small" src={item.logo} />
                        <Link to={item.href}>{item.title}</Link>
                      </div>
                    }
                    description={item.description}
                  />
                  {/* Display additional project details */}
                  <div className={styles.projectItemContent}>
                    <Link to={item.memberLink}>{item.member || ''}</Link>
                    {item.updatedAt && (
                      <span className={styles.datetime} title={item.updatedAt}>
                        {moment(item.updatedAt).fromNow()}
                      </span>
                    )}
                  </div>
                </Card>
              </Card.Grid>
            ))}
          </Card>
          {/* Display a card with a list of activities */}
          <Card
            bodyStyle={{
              padding: 0,
            }}
            bordered={false}
            className={styles.activeCard}
            title="Activities"
            loading={activitiesLoading}
          >
            {/* Display the list of activities */}
            <List
              loading={activitiesLoading}
              renderItem={(item) => renderActivities(item)}
              dataSource={activities}
              className={styles.activitiesList}
              size="large"
            />
          </Card>
        </Col>

        {/* Right column (quick links, XX index, and team members) */}
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          {/* Display a card with quick links for navigation */}
          <Card
            style={{
              marginBottom: 24,
            }}
            title="Quick Start / Quick Navigation"
            bordered={false}
            bodyStyle={{
              padding: 0,
            }}
          >
            {/* Display an editable link group */}
            <EditableLinkGroup onAdd={() => {}} links={links} linkElement={Link} />
          </Card>

          {/* Display a card with XX index chart */}
          <Card
            style={{
              marginBottom: 24,
            }}
            bordered={false}
            title="XX Index"
            loading={data?.radarData?.length === 0}
          >
            {/* Display a radar chart */}
            <div className={styles.chart}>
              <Radar
                height={343}
                data={data?.radarData || []}
                angleField="label"
                seriesField="name"
                radiusField="value"
                area={{
                  visible: false,
                }}
                point={{
                  visible: true,
                }}
                legend={{
                  position: 'bottom-center',
                }}
              />
            </div>
          </Card>

          {/* Display a card with team members */}
          <Card
            bodyStyle={{
              paddingTop: 12,
              paddingBottom: 12,
            }}
            bordered={false}
            title="Team"
            loading={projectLoading}
          >
            {/* Display team members */}
            <div className={styles.members}>
              <Row gutter={48}>
                {projectNotice.map((item) => (
                  <Col span={12} key={`members-item-${item.id}`}>
                    <Link to={item.href}>
                      <Avatar src={item.logo} size="small" />
                      <span className={styles.member}>{item.member}</span>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

// Export the Workplace component as the default export
export default Workplace;
