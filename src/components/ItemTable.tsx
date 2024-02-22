import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import React from "react";

export const ItemTable: React.FC = (props) => {
  const { isShowThead } = props;

  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          {isShowThead && (
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Title</Th>
                <Th>Artist</Th>
                <Th>Album</Th>
                <Th>Duration</Th>
              </Tr>
            </Thead>
          )}
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>aaa</Td>
              <Td>aaa</Td>
              <Td>a</Td>
              <Td>1:20</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
