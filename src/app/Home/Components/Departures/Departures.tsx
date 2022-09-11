import { useEffect, useState } from "react";
import { Container, Icon, Text, Box, Spinner } from "@chakra-ui/react";
import { TbBus } from "react-icons/tb";
import { EstimatedCallsData, ResponseData } from "../Models/Types";

const Departures = (data: ResponseData) => {
  const [date, setDate] = useState<string>("");

  const getDate = () => {
    data.stopPlace.estimatedCalls.map((response: EstimatedCallsData) =>
      setDate(response.date)
    );
  };

  useEffect(() => {
    getDate();
  }, []);

  return (
    <Container>
      <Box
        display={"flex"}
        flexDirection={"column"}
        bg={"blue.50"}
        width={"100%"}
        maxWidth={"100%"}
        borderRadius={"6px"}
      >
        <Text textAlign={"left"} margin={"8px"}>
          From <Text as={"b"}>{data.stopPlace.name}</Text>
        </Text>
        <Text textAlign={"left"} marginLeft={"16px"}>
          {date}
        </Text>

        {data ? (
          data.stopPlace.estimatedCalls.map(
            (res: EstimatedCallsData, index: number) => {
              //Formatting the timestamp
              let arrivedTime = new Date(res.expectedArrivalTime);
              let shouldArrive = new Date(res.aimedArrivalTime);
              return (
                <Box key={index}>
                  <Box key={index}>
                    <Box margin={"8px"} display={"flex"} flexDirection={"row"}>
                      <Box
                        bgColor={"blue.200"}
                        display={"flex"}
                        padding={"8px"}
                        margin={"8px"}
                        borderRadius={"6px"}
                        flexDirection={"row"}
                      >
                        {arrivedTime.setSeconds(0, 0) >
                        shouldArrive.setSeconds(0, 0) ? (
                          <>
                            <Text textDecorationLine={"line-through"}>
                              {`${shouldArrive.getHours()} : ${String(
                                shouldArrive.getMinutes()
                              ).padStart(2, "0")}`}
                            </Text>

                            <Text color={"red.600"} marginLeft={"8px"}>
                              {`${arrivedTime.getHours()} : ${String(
                                arrivedTime.getMinutes()
                              ).padStart(2, "0")}`}
                            </Text>
                          </>
                        ) : (
                          <Text>
                            {`${shouldArrive.getHours()} : ${String(
                              shouldArrive.getMinutes()
                            ).padStart(2, "0")}`}
                          </Text>
                        )}
                      </Box>
                      <Box
                        bgColor={"red.200"}
                        display={"flex"}
                        margin={"8px"}
                        padding={"8px"}
                        borderRadius={"6px"}
                        flexDirection={"row"}
                      >
                        <Text>{res.destinationDisplay.frontText} </Text>
                        <Icon
                          marginLeft={"12px"}
                          as={TbBus}
                          width={6}
                          height={6}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            }
          )
        ) : (
          <Box>
            <Text>Trying to refecth data</Text>
            <Spinner size="xl" color={"blue.600"} />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Departures;
