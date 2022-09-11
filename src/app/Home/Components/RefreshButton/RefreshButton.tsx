import { useLazyQuery } from "@apollo/client";
import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { GET_SCHEDULES } from "../../query";

const RefreshButton = () => {
  const [abortRef, setAbortRef] = useState(new AbortController());
  const [refetchData, { loading, error, data, refetch }] =
    useLazyQuery(GET_SCHEDULES);

  const getNewData = (busId: string) => {
    refetchData({
      variables: {
        busId: busId,
      },
    });
    if (loading) {
      console.log("aborted");
      abortRef.abort();
      setAbortRef(new AbortController());
      return;
    }
    refetch({ busId: busId });
  };

  return (
    <div>
      <Box
        as="button"
        display={"flex"}
        width={"120px"}
        height={"40px"}
        backgroundColor={"red.300"}
        borderRadius={"4px"}
        margin={"4px"}
        justifyContent={"center"}
        onClick={() => {
          getNewData("NSR:StopPlace:4000");
        }}
      >
        <Text alignSelf={"center"}>Refresh</Text>
      </Box>
    </div>
  );
};

export default RefreshButton;
