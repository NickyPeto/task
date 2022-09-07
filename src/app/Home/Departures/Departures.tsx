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
import { primaryPalette } from "../../styles/palettes";

const Departures = (data: any) => {
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
                  <ul>{new Date(res.expectedDepartureTime).toString()}</ul>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Departures;
