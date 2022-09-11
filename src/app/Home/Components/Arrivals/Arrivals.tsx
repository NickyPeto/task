import { Box, Icon, Text, Container, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TbBus } from "react-icons/tb";

const Arrivals = (data: any) => {
  const [expectedArrivalTime, setIsExpectedArrivalTime] = useState<
    string[] | number[]
  >([]);
  const [aimedArrivalTime, setIsAimedArrivalTime] = useState<
    string[] | number[]
  >([]);
  const [date, setDate] = useState<string>("");

  let aimedTime: number[] = [];
  let expectedTime: number[] = [];

  const handleIfItsDelayed = () => {
    console.log(data);
    data.data.estimatedCalls.map(
      (response: any) => (
        setDate(response.date),
        aimedTime.push(response.expectedArrivalTime),
        expectedTime.push(response.aimedArrivalTime),
        setIsAimedArrivalTime(aimedTime),
        setIsExpectedArrivalTime(expectedTime),
        localStorage.setItem("aimedTime", JSON.stringify(expectedArrivalTime)),
        localStorage.setItem("expectedTime", JSON.stringify(aimedArrivalTime))
      )
    );
  };

  useEffect(() => {
    handleIfItsDelayed();
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
          To <Text as={"b"}>{data.data.name}</Text>
        </Text>
        <Text textAlign={"left"} marginLeft={"16px"}>
          {date}
        </Text>

        {data ? (
          data.data.estimatedCalls.map((res: any, index: number) => {
            let arrivalTime = new Date(res.expectedArrivalTime);
            let delayedTime = new Date(res.aimedDepartureTime);
            let arrivalHour = arrivalTime.getHours();
            let arrivalMinutes = String(arrivalTime.getMinutes()).padStart(
              2,
              "0"
            );
            let delayedHours = arrivalTime.getHours();
            let delayedMinutes = String(delayedTime.getMinutes()).padStart(
              2,
              "0"
            );
            return (
              <Box key={index}>
                {expectedArrivalTime[index] > aimedArrivalTime[index] ? (
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
                        <Text
                          textDecorationLine={"line-through"}
                        >{`${arrivalHour} : ${arrivalMinutes}`}</Text>

                        <Text color={"red.600"} marginLeft={"8px"}>
                          {`${delayedHours} : ${delayedMinutes}`}
                        </Text>
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
                          as={TbBus}
                          width={6}
                          height={6}
                          marginLeft={"12px"}
                        />
                      </Box>
                    </Box>
                  </Box>
                ) : (
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
                        <Text>{`${arrivalHour} : ${arrivalMinutes}`}</Text>
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
                          as={TbBus}
                          width={6}
                          height={6}
                          marginLeft={"12px"}
                        />
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            );
          })
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

export default Arrivals;
