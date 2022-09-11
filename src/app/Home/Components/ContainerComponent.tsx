import { OperationVariables, useQuery } from "@apollo/client";
import { Box, Button, Container, Heading, Icon, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Arrivals from "./Arrivals/Arrivals";
import Departures from "./Departures/Departures";
import { GET_SCHEDULES } from "../query";
import RefreshButton from "./RefreshButton/RefreshButton";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";

const ContainerComponent = (data: any) => {
  //   const [abortRef, setAbortRef] = useState(new AbortController());
  const [show, setShow] = useState<boolean>(false);
  const [datas, setDatas] = useState<any[]>([]);

  const toggleButtons = () => {
    return setShow((current: boolean) => !current);
  };
  return (
    <Box
      justifyContent={"center"}
      display={"flex"}
      bg={"blue.800"}
      height={"100%"}
      width={"100%"}
      paddingBottom={"24px"}
      flexDirection={"column"}
    >
      <Container>
        <Box
          display={"flex"}
          bg={"blue.50"}
          height={"48px"}
          maxWidth={"100%"}
          flex={"1"}
          borderRadius={"4px"}
          margin={"16px"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Heading size={"md"} marginLeft={"8px"} flexDirection={"row"}>
            Departure Board
          </Heading>

          <RefreshButton />
        </Box>
      </Container>

      {show ? (
        <Container>
          <Box
            as="button"
            margin={"16px"}
            display={"flex"}
            width={"120px"}
            height={"40px"}
            backgroundColor={"red.300"}
            marginRight={"8px"}
            borderRadius={"4px"}
            justifyContent={"center"}
            onClick={toggleButtons}
          >
            <Text alignSelf={"center"}>
              Arrivals
              <Icon
                marginLeft={"8px"}
                marginTop={"4px"}
                size={2}
                as={TiArrowLeftThick}
              />
            </Text>
          </Box>
          <Arrivals data={data.data.stopPlace} />
        </Container>
      ) : (
        <Container>
          <Box
            margin={"16px"}
            display={"flex"}
            as="button"
            width={"120px"}
            height={"40px"}
            backgroundColor={"red.300"}
            borderRadius={"4px"}
            justifyContent={"center"}
            onClick={toggleButtons}
          >
            <Text alignSelf={"center"}>
              Departures
              <Icon
                marginLeft={"8px"}
                marginTop={"4px"}
                as={TiArrowRightThick}
              />
            </Text>
          </Box>
          <Departures data={data.data.stopPlace} />
        </Container>
      )}
    </Box>
  );
};

export default ContainerComponent;
