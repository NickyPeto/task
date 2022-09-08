import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
  Tfoot,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { primaryPalette, secondaryPalette } from "../../styles/palettes";

const Arrivals = (data: any) => {
  const [expectedArrivalTime, setIsExpectedArrivalTime] = useState<
    string[] | number[]
  >([]);
  const [aimedArrivalTime, setIsAimedArrivalTime] = useState<
    string[] | number[]
  >([]);

  let aimedTime: number[] = [];
  let expectedTime: number[] = [];

  const handleIfItsDelayed = () => {
    data.data.map(
      (response: any) => (
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
    <Container
      display={"flex"}
      maxWidth={"600px"}
      borderRadius={"15px"}
      bgColor={primaryPalette[300]}
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
                <Tr key={index}>
                  {aimedArrivalTime[index] > expectedArrivalTime[index] ? (
                    <Tr>
                      <Td>
                        {res.expectedArrivalTime} <strong>Delayed</strong>
                      </Td>
                      <Tfoot>
                        <Tr>
                          <Th>
                            Line {res.serviceJourney.journeyPattern.line.id}
                          </Th>
                        </Tr>
                      </Tfoot>
                    </Tr>
                  ) : (
                    <Tr>
                      <Td>{res.expectedArrivalTime}</Td>
                      <Tfoot>
                        <Tr>
                          <Th>
                            Line {res.serviceJourney.journeyPattern.line.id}
                          </Th>
                        </Tr>
                      </Tfoot>
                    </Tr>
                  )}
                </Tr>
              ))}
              {}
            </>
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Arrivals;
