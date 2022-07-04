import { useEffect } from "react";
import Content from "@/components/Content";
import Header from "@/components/Header";
import Search from "@/components/Search";
import SearchProvider from "context/search";
import Link from "next/link";
import { GetStaticProps } from "next";
import { useContext } from "react";
import { LaunchesContext } from "context/launches";
import { mergeData } from "utils/mergeData";
import { RocketsContext } from "context/rockets";
import { getLaunches } from "api/launches";
import { getRockets } from "api/rockets";

export const getStaticProps: GetStaticProps = async () => {
  const launchesData = await getLaunches();
  const rocketsData = await getRockets();
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
      <Search />
      <Content launches={launches} />
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