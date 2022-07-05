import { useEffect, useState } from "react";
import { useContext } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { RocketsContext } from "context/rockets";
import { mergeData } from "utils/mergeData";
import { getLaunch, getLaunches } from "@/api/launches";
import { getRocket } from "@/api/rockets";

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
  const { mission_name, details, launch_date_utc, rocket } = launchData;
  return (
    <div>
      <div>
        <img src={rocket.flickr_images[0]} alt="" />
        <p>{mission_name}</p>
        <p>{details}</p>
        <p>{launch_date_utc}</p>
      </div>
    </div>
  )
};

export default Launch;