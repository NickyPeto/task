import { useQuery } from "@apollo/client";
import { Container } from "@chakra-ui/react";
import { GET_SCHEDULES } from "./query";
import { Button } from "@chakra-ui/react";
import Arrivals from "./Arrivals/Arrivals";
import Departures from "./Departures/Departures";
import { useState } from "react";
import { accentPalette } from "../styles/palettes";

const Home = () => {
  const [show, setShow] = useState(false);
  const { loading, error, data } = useQuery(GET_SCHEDULES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const toggleButtons = (component: any) => {
    return setShow((current) => !current);
  };

  return (
    <Container maxWidth={"100%"} display={"flex"} flexDirection={"column"}>
      From <strong>{data.stopPlace.name}</strong>
      <Button
        size="md"
        width={"120px"}
        colorScheme={"orange"}
        backgroundColor={"purple.500"}
        onClick={toggleButtons}
      >
        Arrivals
      </Button>
      <Button
        size="md"
        width={"120px"}
        colorScheme={"orange"}
        backgroundColor={"purple.500"}
        onClick={toggleButtons}
      >
        Departures
      </Button>
      {show ? (
        <Arrivals data={data.stopPlace.estimatedCalls} />
      ) : (
        <Departures data={data.stopPlace.estimatedCalls} />
      )}
    </Container>
  );
};

export default Home;
