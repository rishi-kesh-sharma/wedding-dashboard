import { Card, Col, Row, Statistic } from 'antd';
import { useRequest } from 'umi';
import { Gauge, WordCloud, Liquid, RingProgress } from '@ant-design/charts';
import { GridContent } from '@ant-design/pro-layout';
import numeral from 'numeral';
import Map from './components/Map';
import ActiveChart from './components/ActiveChart';
import { queryTags } from './service';
import styles from './style.less';

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

const Monitor = () => {
  const { loading, data } = useRequest(queryTags);
  const wordCloudData = (data?.list || []).map((item) => {
    return {
      id: +Date.now(),
      word: item.name,
      weight: item.value,
    };
  });

  return (
    <GridContent>
      <>
        <Row gutter={24}>
          <Col
            xl={18}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            style={{
              marginBottom: 24,
            }}
          >
            <Card title="Real-time Transaction Situation of Activities" bordered={false}>
              <Row>
                <Col md={6} sm={12} xs={24}>
                  <Statistic
                    title="Total Transaction Amount Today"
                    suffix="Yuan"
                    value={numeral(124543233).format('0,0')}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Statistic title="Sales Target Completion Rate" value="92%" />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Countdown
                    title="Time Remaining for Activity"
                    value={deadline}
                    format="HH:mm:ss:SSS"
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Statistic
                    title="Transaction Amount Per Second"
                    suffix="Yuan"
                    value={numeral(234).format('0,0')}
                  />
                </Col>
              </Row>
              <div className={styles.mapChart}>
                <Map />
              </div>
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="Activity Forecast"
              style={{
                marginBottom: 24,
              }}
              bordered={false}
            >
              <ActiveChart />
            </Card>
            <Card
              title="Coupon Verification Efficiency"
              style={{
                marginBottom: 24,
              }}
              bodyStyle={{
                textAlign: 'center',
              }}
              bordered={false}
            >
              <Gauge
                height={180}
                min={0}
                max={100}
                forceFit
                value={87}
                range={[0, 25, 50, 75, 100]}
                statistic={{
                  visible: true,
                  text: 'Excellent',
                  color: '#30bf78',
                }}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col
            xl={12}
            lg={24}
            sm={24}
            xs={24}
            style={{
              marginBottom: 24,
            }}
          >
            <Card title="Category Proportion" bordered={false} className={styles.pieCard}>
              <Row
                style={{
                  padding: '16px 0',
                }}
              >
                <Col span={8}>
                  <RingProgress forceFit height={128} percent={0.28} />
                </Col>
                <Col span={8}>
                  <RingProgress color="#5DDECF" forceFit height={128} percent={0.22} />
                </Col>
                <Col span={8}>
                  <RingProgress color="#2FC25B" forceFit height={128} percent={0.32} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col
            xl={6}
            lg={12}
            sm={24}
            xs={24}
            style={{
              marginBottom: 24,
            }}
          >
            <Card
              title="Popular Searches"
              loading={loading}
              bordered={false}
              bodyStyle={{
                overflow: 'hidden',
              }}
            >
              <WordCloud
                data={wordCloudData}
                forceFit
                height={162}
                wordStyle={{
                  fontSize: [10, 20],
                }}
                shape="triangle"
              />
            </Card>
          </Col>
          <Col
            xl={6}
            lg={12}
            sm={24}
            xs={24}
            style={{
              marginBottom: 24,
            }}
          >
            <Card
              title="Remaining Resources"
              bodyStyle={{
                textAlign: 'center',
                fontSize: 0,
              }}
              bordered={false}
            >
              <Liquid
                height={161}
                min={0}
                max={10000}
                value={5639}
                forceFit
                padding={[0, 0, 0, 0]}
                statistic={{
                  formatter: (value) => `${((100 * value) / 10000).toFixed(1)}%`,
                }}
              />
            </Card>
          </Col>
        </Row>
      </>
    </GridContent>
  );
};

export default Monitor;
