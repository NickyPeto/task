import { NetworkStatus, OperationVariables, useQuery } from "@apollo/client";
import { Box, Container, Text, Spinner } from "@chakra-ui/react";
import { GET_SCHEDULES } from "./query";
import { useState } from "react";
import ContainerComponent from "./Components/ContainerComponent";
import { QueryData } from "./Models/Types";

const Home = () => {
  const [abortRef, setAbortRef] = useState<AbortController>(
    new AbortController()
  );
  const { loading, error, data, networkStatus } = useQuery<
    any,
    OperationVariables
  >(GET_SCHEDULES, {
    variables: {
      busId: "NSR:StopPlace:4000",
    },
    fetchPolicy: "network-only",
    context: {
      fetchOptions: abortRef.signal,
    },
    notifyOnNetworkStatusChange: true,
  });
  const props: QueryData = {
    abortRef: abortRef.signal,
    data: data,
    loading: loading,
    networkStatus: networkStatus,
  };

  if (networkStatus === NetworkStatus.refetch)
    return (
      <Box>
        <Text>Trying to refecth data</Text>
        <Spinner size="xl" color={"blue.600"} />
      </Box>
    );
  if (loading)
    return (
      <Box>
        <Text>Loading</Text>
        <Spinner size="xl" color={"blue.600"} />
      </Box>
    );
  if (error) return <p>Error</p>;

  return (
    <Container
      height={"100%"}
      padding={"0"}
      width={"100%"}
      maxWidth={"100%"}
      display={"flex"}
      flexDirection={"column"}
    >
      {data ? (
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
