import { NetworkStatus, useQuery } from "@apollo/client";
import { Box, Container, Text, Spinner } from "@chakra-ui/react";
import { GET_SCHEDULES } from "./query";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { accentPalette } from "../styles/palettes";
import ContainerComponent from "./Components/ContainerComponent";
import { sample } from "lodash";
import RefreshButton from "./Components/RefreshButton/RefreshButton";

const Home = () => {
  const [abortRef, setAbortRef] = useState(new AbortController());
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_SCHEDULES,
    {
      variables: {
        busId: "NSR:StopPlace:4000",
      },
      fetchPolicy: "network-only",
      context: {
        fetchOptions: abortRef.signal,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const timeout = sample([0, 200, 500, 700, 1000, 3000]);
  const shouldThrow = sample([true, false, false, false]);

  const props = {
    data: data,
    loading: loading,
    networkStatus: networkStatus,
    abortRef: abortRef.signal,
    refetch: refetch,
  };

  if (networkStatus === NetworkStatus.refetch) return <p>Refetching!</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Container
      height={"100%"}
      padding={"0"}
      width={"100%"}
      maxWidth={"100%"}
      display={"flex"}
      flexDirection={"column"}
    >
      {data && !loading ? (
        <ContainerComponent {...props} />
      ) : (
        <Box>
          <Text>Trying to refecth data</Text>
          <Spinner size="xl" color={"blue.600"} />
        </Box>
      )}
    </Container>
  );
};

export default Home;
