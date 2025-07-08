import styled from "styled-components";

function TableGeneric({ title, columns, data }) {
  return (
    <TableContainer>
      {title && <Title>{title}</Title>}
      <CustomTable>
        <thead>
          <tr>
            {columns.map((column) => (
              <Th key={column.key}>{column.label}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <Tr key={index} $isTotal={row.item === "TOTAL"}>
              {columns.map((column) => (
                <Td
                  key={column.key}
                  $align={
                    column.asign === "LEFT"
                      ? "left"
                      : column.asign === "CENTER"
                      ? "center"
                      : "center"
                  }
                  $isTotal={row.item === "TOTAL"}
                >
                  {row[column.key]}
                </Td>
              ))}
            </Tr>
          ))}
        </tbody>
      </CustomTable>
    </TableContainer>
  );
}

export default TableGeneric;

// Styled Components

const TableContainer = styled.div`
  /* Aquí no tiene margin ni max-width para que lo maneje el componente padre */
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  margin-bottom: 16px;
  font-size: 1.5rem;
  text-align: center;
  color: #333;
`;

const CustomTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

  thead tr {
    background-color: #007bff;
    color: white;
  }

  tbody tr {
    background-color: #f9f9f9;
    transition: background-color 0.25s ease;

    &:nth-child(even) {
      background-color: #e9ecef;
    }

    &:hover {
      background-color: #cde5ff;
      cursor: pointer;
    }
  }
`;

const Th = styled.th`
  padding: 8px 12px;
  border: 1px solid #ddd;
  white-space: nowrap;
  font-weight: 600;
  text-align: center;
`;

const Tr = styled.tr`
  ${(props) =>
    props.$isTotal &&
    `
    background-color: #28a745 !important;
    color: white;
    font-weight: bold;
  `}
`;

const Td = styled.td`
  padding: 8px 12px;
  border: 1px solid #ddd;
  text-align: ${(props) => props.$align || "center"};
  word-wrap: break-word;
  white-space: normal;
  max-width: 600px; /* Limita el ancho máximo de cada celda */

  ${(props) =>
    props.$isTotal &&
    `
    background-color: #28a745 !important;
    color: white;
    font-weight: bold;
    border-color: #1e7e34;
  `}
`;
