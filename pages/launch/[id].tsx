import { GetStaticPaths, GetStaticProps } from "next";
import { mergeData } from "utils/mergeData";
import { getLaunch, getLaunches } from "@/api/launches";
import { getRocket } from "@/api/rockets";
import styles from './launch.module.scss';
import Link from "next/link";

export const getStaticPaths: GetStaticPaths = async () => {
  const launchesData = await getLaunches();
  const paths = launchesData.map(({ flight_number }) => ({
    params: { id: flight_number.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const launchData = await getLaunch(context.params.id);

  const rocketId = launchData.rocket.rocket_id;
  const rocketData = await getRocket(rocketId);

  mergeData([launchData], [rocketData]);
  
  return {
    props: {
      launchData,
      rocketData
    },
  };
}

const Launch = (props) => {
  const { launchData } = props;  
  return (
    launchData && (
      <section className={styles.detail}>
        <section className={styles.detailHeader}>
          <div className={styles.backButton}>
            <span className={styles.backButtonContainer}>
              <Link href={{
                pathname: `/`,
              }}>&lt;</Link>
            </span>
          </div>
          <div className={styles.detailHeaderImage}>
            <img src={launchData.links.flickr_images[0]} alt="" />
          </div>
          <div className={styles.detailHeaderContent}>
            <p className={styles.detailHeaderDate}>{launchData.launch_date_utc}</p>
            <h2 className={styles.detailHeaderName}>{launchData.mission_name}</h2>
            <h3 className={styles.detailHeaderDescription}>{launchData.details}</h3>
          </div>
        </section>
        <section className={styles.detailSummary}>
          <div className={styles.detailSummaryContainer}>
            <div className={styles.detailNumber}>
              <h4 className={styles.detailNumberTitle}>{launchData.rocket.success_rate_pct}%</h4>
              <p className={styles.detailNumberValue}>Success Rate</p>
            </div>
            <div className={styles.detailNumber}>
              <h4 className={styles.detailNumberTitle}>{launchData.rocket.stages}</h4>
              <p className={styles.detailNumberValue}>Stages</p>
            </div>
            <div className={styles.detailNumber}>
              <h4 className={styles.detailNumberTitle}>{launchData.launch_site.site_name}</h4>
              <p className={styles.detailNumberValue}>Launch Site Name</p>
            </div>
          </div>
        </section>
        <section className={styles.detailContent}>
          <div className={styles.detailContentContainer}>
            <div className={styles.detailContentHeader}>
              <h3 className={styles.detailContentHeaderTitle}>About Launched</h3>
              <p className={styles.detailContentHeaderDescription}>{launchData.rocket.description}</p>
            </div>
            <div className={styles.flexHelper}>
              <div className={styles.detailContentImage}>
                <img src={launchData.rocket.flickr_images[0]} alt="" />
              </div>
              <div className={styles.detailContentOverview}>
                <h3 className={styles.detailContentOverviewTitle}>Overview</h3>
                <ul className={styles.detailContentOverviewList}>
                  <li className={styles.detailContentOverviewListItem}>
                    <p className={styles.overviewListItemTitle}>Height</p>
                    <p className={styles.overviewListItemValue}>{launchData.rocket.height.meters}m <span className={styles.grayText}>/ {launchData.rocket.height.feet}ft</span></p>
                  </li>
                  <li className={styles.detailContentOverviewListItem}>
                    <p className={styles.overviewListItemTitle}>Diameter</p>
                    <p className={styles.overviewListItemValue}>{launchData.rocket.diameter.meters}m <span className={styles.grayText}>/ {launchData.rocket.height.feet}ft</span></p>
                  </li>
                  <li className={styles.detailContentOverviewListItem}>
                    <p className={styles.overviewListItemTitle}>Mass</p>
                    <p className={styles.overviewListItemValue}>{launchData.rocket.mass.kg}kg <span className={styles.grayText}>/ {launchData.rocket.mass.lb}lb</span></p>
                  </li>
                  {launchData.rocket.payload_weights.map((item) => (
                    <li className={styles.detailContentOverviewListItem}>
                      <p className={styles.overviewListItemTitle}>Payload to {item.id}</p>
                      <p className={styles.overviewListItemValue}>{item.kg}kg <span className={styles.grayText}>/ {item.lb}lb</span></p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.detailFooter}>
          <div className={styles.detailFooterContainer}>
            <p className={styles.detailFooterInformation}>For information about our launch services, contact sales@spacex.com</p>
            <div className={styles.mainButtons}>
              <p className={styles.mainButtonContainer}>
                <a href={launchData.links.presskit} className={styles.mainButton}>Download User's Guide</a>
              </p>
              <p className={styles.mainButtonContainer}>
                <a href={launchData.rocket.wikipedia} className={styles.mainButton}>Capabilities and Services</a>
              </p>
            </div>
          </div>
        </section>
      </section>
    )
  )
};

export default Launch;