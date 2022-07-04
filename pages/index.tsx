import { useEffect, useState } from "react";
import Content from "@/components/Content";
import Header from "@/components/Header";
import { monthsNames } from "utils/monthsNames";
import Search from "@/components/Search";
import SearchProvider from "context/search";
import Link from "next/link";
import { GetStaticProps } from "next";
import { useContext } from "react";
import { LaunchesContext } from "context/launches";
import { mergeData } from "utils/mergeData";
import { RocketsContext } from "context/rockets";

export const getStaticProps: GetStaticProps = async () => {
  const responseLaunches = await fetch('https://api.spacexdata.com/v3/launches');
  const responseRockets = await fetch('https://api.spacexdata.com/v3/rockets');
  const launchesData = await responseLaunches.json();
  const rocketsData = await responseRockets.json();
  return {
    props: {
      launchesData,
      rocketsData
    },
  };
}

const Homepage = (props) => {
  const { launchesData, rocketsData } = props;
  const { launches, setLaunches } = useContext(LaunchesContext);
  const { setRockets } = useContext(RocketsContext);
  useEffect(() => {
    mergeData(launchesData, rocketsData);
    setRockets(rocketsData);
    setLaunches(launchesData);
  }, []);

  console.log(launches);
  return (
    <SearchProvider>
      <Header />
      {/* <Search />
      <Content launches={launches} /> */}
      <div>
        {launches && launches.map(({ mission_name, flight_number }, index) => (
          <Link key={index} href={{
            pathname: `/launch/[id]`,
            query: {
              id: flight_number
            }
          }}>
            <a>{mission_name}</a>
          </Link>
        ))}
      </div>
    </SearchProvider>
  )
};

export default Homepage;