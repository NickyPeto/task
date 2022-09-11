import { Box, Container, Heading, Icon, Text } from "@chakra-ui/react";
import Departures from "./Departures/Departures";
import RefreshButton from "./RefreshButton/RefreshButton";
import { TiArrowRightThick } from "react-icons/ti";
import { QueryData } from "./Models/Types";

const ContainerComponent = (data: QueryData) => {
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

      <Container>
        <Box
          margin={"16px"}
          display={"flex"}
          width={"120px"}
          height={"40px"}
          backgroundColor={"red.300"}
          borderRadius={"4px"}
          justifyContent={"center"}
        >
          <Text alignSelf={"center"}>
            Departures
            <Icon marginLeft={"8px"} marginTop={"4px"} as={TiArrowRightThick} />
          </Text>
        </Box>
        <Departures {...data.data} />
      </Container>
    </Box>
  );
};

export default ContainerComponent;
