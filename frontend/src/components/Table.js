import React from "react";
import { Table } from "reactstrap";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const TableComponent = (props) => {
  const { cols, rows, changeSort, filter } = props;

  const createTH = (field, label) => {
    return (
      <th
        onClick={() => {
          changeSort({
            name: "sortBy",
            value: field,
          });
        }}
      >
        {label}
        <span>
          {" "}
          {filter.sortBy === field ? (
            filter.asc ? (
              <FaArrowDown />
            ) : (
              <FaArrowUp />
            )
          ) : (
            <>
              <FaArrowDown />
              <FaArrowUp />
            </>
          )}{" "}
        </span>
      </th>
    );
  };

  return (
    <React.Fragment>
      <Table dark striped>
        <thead
          style={{
            position: "sticky",
            top: "0",
          }}
        >
          <tr>
            <th>No</th>
            {cols.map((x) => createTH(x.field, x.label))}
          </tr>
        </thead>
        <tbody>
          {rows.map((user, index) => (
            <tr>
              <td>{filter.page * filter.pageSize + (index + 1)}</td>
              {cols.map((key, i) => (
                <td key={i}>{user[key.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default TableComponent;
