import { useLazyQuery } from "@apollo/client";
import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { GET_SCHEDULES } from "../../query";

const RefreshButton = () => {
  const [abortRef, setAbortRef] = useState(new AbortController());
  const [refetchData, { loading, data, refetch }] = useLazyQuery(
    GET_SCHEDULES,
    {
      fetchPolicy: "network-only",
      context: {
        fetchOptions: abortRef.signal,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  //This method is used to refetch the data, if loading is true, meaning that there is no response from the previous API call, the ongoing call is aborted
  // and the refetch method is only fired when loading is false, meaning that the response from the previous call is returned.
  const refreshData = (busId: string) => {
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
    console.log(data);
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
          refreshData("NSR:StopPlace:4000");
        }}
      >
        <Text alignSelf={"center"}>Refresh</Text>
      </Box>
    </div>
  );
};

export default RefreshButton;
