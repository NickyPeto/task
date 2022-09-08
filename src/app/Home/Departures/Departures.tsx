import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { primaryPalette, secondaryPalette } from "../../styles/palettes";

const Departures = (data: any) => {
  const [expectedDepartureTime, setIsExpectedDepartureTime] = useState<
    number[]
  >([]);
  const [aimedDepartureTime, setIsAimedDepartureTime] = useState<number[]>([]);

  console.log(data);

  let aimedTime: number[] = [];
  let expectedTime: number[] = [];

  const handleIfItsDelayed = () => {
    data.data.map(
      (response: any) => (
        aimedTime.push(response.expectedDepartureTime),
        expectedTime.push(response.aimedDepartureTime),
        setIsAimedDepartureTime(aimedTime),
        setIsExpectedDepartureTime(expectedTime),
        localStorage.setItem(
          "aimedTime",
          JSON.stringify(expectedDepartureTime)
        ),
        localStorage.setItem("expectedTime", JSON.stringify(aimedDepartureTime))
      )
    );
  };

  useEffect(() => {
    handleIfItsDelayed();
  }, []);

  return (
    <Container
      display={"flex"}
      maxWidth={"600px"}
      borderRadius={"15px"}
      bgColor={primaryPalette[600]}
    >
      <TableContainer>
        <Table variant={"simple"}>
          <Thead>
            <Tr>
              <Th>Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            <>
              {data.data.map((res: any, index: number) => (
                <>
                  <Tr key={index}>
                    {aimedDepartureTime[index] >
                    expectedDepartureTime[index] ? (
                      <Tr>
                        <Td>
                          {res.expectedDepartureTime} <strong>Delayed</strong>
                        </Td>
                        <Td>Destination {res.destinationDisplay.frontText}</Td>
                      </Tr>
                    ) : (
                      <Tr>
                        <Td>{res.expectedDepartureTime}</Td>
                        <Td>Destination {res.destinationDisplay.frontText}</Td>
                      </Tr>
                    )}
                    <></>
                  </Tr>
                </>
              ))}
              {}
            </>
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Departures;
