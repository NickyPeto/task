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
import { useState } from "react";
import { primaryPalette, secondaryPalette } from "../../styles/palettes";

const Arrivals = (data: any) => {
  return (
    <Container bgColor={primaryPalette[300]}>
      <TableContainer>
        <Table variant={"simple"}>
          <Thead>
            <Tr>
              <Th>Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.data.map((res: any, index: number) => (
              <Tr key={index}>
                <Td>
                  <ul>{new Date(res.expectedArrivalTime).toString()}</ul>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Arrivals;
