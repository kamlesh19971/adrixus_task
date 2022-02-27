import React from "react";

// const createPages = start;

const Pagination = (props) => {
  let { totalCount, size, changeFilter, page } = props;

  const totalpages = totalCount / size;

  let pages = [];

  for (let index = 0; index < totalpages; index++) {
    pages.push(
      <button
        onClick={(e) => changeFilter({ name: "page", value: index })}
        className={`m-1 btn btn-${
          page !== index ? "outline-primary" : "primary"
        }`}
      >
        {index + 1}
      </button>
    );
  }

  return pages;
};

export default Pagination;
