import React from "react";
import { Skeleton, TableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell";

interface TableSkeletonProps {
  rowsNum: number;
}

export const TableSkeletonLoader: React.FC<TableSkeletonProps> = ({
  rowsNum,
}) => {
  const skeletonRows = Array.from(Array(5).keys());

  return (
    <div>
      {skeletonRows.map((rowIndex) => (
        <TableRow key={rowIndex}>
          <TableCell component="th" scope="row" style={{ width: "20%" }}>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell style={{ width: "20%" }}>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell style={{ width: "20%" }}>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell style={{ width: "20%" }}>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
        </TableRow>
      ))}
    </div>
  );
};
