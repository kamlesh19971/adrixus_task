import React, { useEffect, useState } from "react";
import { Container, Input, Row, Col } from "reactstrap";
import services from "../services";
import Pagination from "../components/Pagination";
import Table from "../components/Table";

const Dashboard = (props) => {
  const [users, setUsers] = useState([]);

  const [filter, setFilter] = useState({
    page: 0,
    search: "",
    pageSize: 20,
    sortBy: "_id",
    asc: true,
  });

  const filterData = () => {
    let data = users;

    // Sorting
    data.sort((a, b) =>
      filter.asc
        ? a[filter.sortBy] > b[filter.sortBy]
          ? 1
          : -1
        : b[filter.sortBy] > a[filter.sortBy]
        ? 1
        : -1
    );

    // Pagination Logic
    const start = filter.page * filter.pageSize;
    const end = start + +filter.pageSize;
    data = data.slice(start, end);

    // Filtering
    if (filter.search !== "") {
      data = data.filter((user) => {
        return ["first_name", "last_name", "email"].some((key) =>
          user[key].toLowerCase().includes(filter.search.toLowerCase())
        );
      });
    }

    return data;
  };

  const changeFilter = (e) => {
    setFilter(Object.assign({}, filter, { [e.name]: e.value }));
  };

  const changeSort = (e) => {
    if (filter.sortBy === e.value) {
      setFilter(Object.assign({}, filter, { asc: !filter.asc }));
    } else {
      setFilter(Object.assign({}, filter, { asc: true, sortBy: e.value }));
    }
  };

  const loadUsers = () => {
    services.getUsers().then((res) => {
      const data = res.data;
      if (!data.status && data.logout) {
        window.location.href = "/logout";
      }
      setUsers(data.users);
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const columns = [
    { label: "First Name", field: "first_name" },
    { label: "Last Name", field: "last_name" },
    { label: "Email", field: "email" },
  ];

  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col lg={8} className="text-center">
            <h1>User List</h1>
          </Col>
          <Col lg={4}>
            <Input
              type="search"
              name="search"
              placeholder="Search"
              value={filter.search}
              onChange={(e) => {
                changeFilter(e.target);
              }}
            />
          </Col>
        </Row>
        <div style={{ overflowY: "scroll", maxHeight: "480px" }}>
          <Table
            cols={columns}
            rows={filterData()}
            filter={filter}
            changeSort={changeSort}
          />
        </div>
        <Row className="mt-1">
          <Col lg={4}>
            <Row className="text-left">
              <label className="w-25">Users Per Page</label>
              <select
                className="form-control w-50"
                name="pageSize"
                value={filter.pageSize}
                type="select"
                onChange={(e) => changeFilter(e.target)}
              >
                {[10, 20, 25].map((x, i) => (
                  <option key={i} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </Row>
          </Col>
          <Col lg={4}></Col>
          <Col lg={4}>
            <Pagination
              totalCount={users.length}
              size={filter.pageSize}
              changeFilter={changeFilter}
              page={filter.page}
            />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
