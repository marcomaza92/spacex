import { useEffect, useState } from "react";
import Content from "@/components/Content";
import Header from "@/components/Header";
import { monthsNames } from "utils/monthsNames";
import Search from "@/components/Search";
import { useContext } from "react";
import { LaunchesContext } from "context/launches";
import { GetStaticPaths, GetStaticProps } from "next";
import { RocketsContext } from "context/rockets";
import { mergeData } from "utils/mergeData";

export const getStaticPaths: GetStaticPaths = async () => {
  const responseLaunches = await fetch(`https://api.spacexdata.com/v3/launches`);
  const launchesData = await responseLaunches.json();
  const paths = launchesData.map(({ flight_number }) => ({
    params: { id: flight_number.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const responseLaunch = await fetch(`https://api.spacexdata.com/v3/launches/${context.params.id}`);
  const launchData = await responseLaunch.json();

  const rocketId = launchData.rocket.rocket_id;
  const responseRocket = await fetch(`https://api.spacexdata.com/v3/rockets/${rocketId}`);
  const rocketData = await responseRocket.json();
  
  return {
    props: {
      launchData,
      rocketData
    },
  };
}

const Launch = (props) => {
  const { launchData, rocketData } = props;
  const { rockets, setRockets } = useContext(RocketsContext);
  const [ launch, setLaunch ] = useState();

  useEffect(() => {
    if (rockets[0]?.id === 0) {
      setRockets(rocketData);
    }
    mergeData([launchData], [rockets]);
    setLaunch(launchData);
  });

  console.log(launch);

  return (
    <div>
      <h1>Lala</h1>
    </div>
  )
};

export default Launch;