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
  
  return {
    props: {
      launchData,
      rocketData
    },
  };
}

const Launch = (props) => {
  const { launchData, rocketData } = props;
  const { rockets } = useContext(RocketsContext);
  const [ launch, setLaunch ] = useState();
  useEffect(() => {
    if (rockets[0]?.id === 0) {
      mergeData([launchData], [rocketData]);
    }
    mergeData([launchData], [rockets]);
    setLaunch(launchData);
  }, []);
  return (
    <div>
      <h1>Lala</h1>
    </div>
  )
};

export default Launch;