import React, { useState } from "react";
import { styled } from "@mui/system";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";
import { CircularProgress, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../App.css";
const Root = styled("div")`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #ddd;
  }
`;

const CustomTablePagination = styled(TablePaginationUnstyled)`
  & .MuiTablePaginationUnstyled-toolbar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .MuiTablePaginationUnstyled-selectLabel {
    margin: 0;
  }

  & .MuiTablePaginationUnstyled-displayedRows {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .MuiTablePaginationUnstyled-spacer {
    display: none;
  }

  & .MuiTablePaginationUnstyled-actions {
    display: flex;
    gap: 0.25rem;
  }
`;

function DataTable() {
  const navigate = useNavigate();
  let pageNum = 0;
  const [tableData, setTableData] = useState([]);
  React.useEffect(() => {
    fetch(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNum}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTableData(data.hits);
        console.log(tableData);
      });
  }, []);
  React.useEffect(() => {
    setInterval(function () {
      incre();
    }, 10000);

    const incre = () => {
      pageNum += 1;
      fetch(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNum}`
      )
        .then((res) => res.json())
        .then((data) => {
          setTableData((prev) => [...prev, ...data.hits]);
          console.log(tableData);
        });
    };
  }, [pageNum]);
  console.log(pageNum);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Container>
        <Root sx={{ maxWidth: "100%" }}>
          <h1>Data Table React</h1>
          {tableData.length > 0 ? (
            <table aria-label="custom pagination table">
              <thead>
                <tr style={{ backgroundColor: "#04AA6D", color: "white" }}>
                  <td>Title</td>
                  <td>URL</td>
                  <td>Author</td>
                  <td>Created_at</td>
                </tr>
              </thead>
              <tbody className="tbody">
                {(rowsPerPage > 0
                  ? tableData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : tableData
                ).map((row) => (
                  <tr
                    onClick={() => navigate(`/item/${row.objectID}`)}
                    key={row.objectID}
                  >
                    <td>{row.title}</td>
                    <td align="right">{row.url}</td>
                    <td align="right">{row.author}</td>
                    <td align="right">{row.created_at}</td>
                  </tr>
                ))}

                {emptyRows > 0 && (
                  <tr style={{ height: 41 * emptyRows }}>
                    <td colSpan={3} />
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <CustomTablePagination
                    rowsPerPageOptions={[
                      10,
                      20,
                      30,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    componentsProps={{
                      select: {
                        "aria-label": "rows per page",
                      },
                      actions: {
                        showFirstButton: true,
                        showLastButton: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </tr>
              </tfoot>
            </table>
          ) : (
            <CircularProgress />
          )}
        </Root>
      </Container>
    </div>
  );
}

export default DataTable;
