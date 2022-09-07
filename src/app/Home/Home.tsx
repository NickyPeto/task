import { useQuery } from "@apollo/client";
import { Container } from "@chakra-ui/react";
import { GET_SCHEDULES } from "./query";
import { Button } from "@chakra-ui/react";
import Arrivals from "./Arrivals/Arrivals";
import Departures from "./Departures/Departures";
import { useState } from "react";

const Home = () => {
  const [showArrivals, setShowArrivals] = useState(false);
  const [showDepartures, setShowDepartures] = useState(false);
  const { loading, error, data } = useQuery(GET_SCHEDULES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleArrivals = (component: any) => {
    return setShowArrivals((current) => !current);
  };

  const handleDepartures = (component: any) => {
    return setShowDepartures((current) => !current);
  };

  return (
    <Container display={"flex"} flexDirection={"column"}>
      From <strong>{data.stopPlace.name}</strong>
      <Button colorScheme={"orange"} onClick={handleArrivals}>
        Arrivals
      </Button>
      <Button colorScheme={"orange"} onClick={handleDepartures}>
        Departures
      </Button>
      <Container width={"100%"} display={"flex"} flexDirection={"row"}>
        {showArrivals ? (
          <Arrivals data={data.stopPlace.estimatedCalls} />
        ) : (
          <h4>loading</h4>
        )}

        {showDepartures ? (
          <Departures data={data.stopPlace.estimatedCalls} />
        ) : (
          <h2>Loading..</h2>
        )}
      </Container>
    </Container>
  );
};

export default Home;
