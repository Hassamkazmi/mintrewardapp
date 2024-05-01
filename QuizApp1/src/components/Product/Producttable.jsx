import React, { Fragment , useEffect } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchgetProductData , STATUSES } from "../../redux/Slices/getProduct";
import { DeleteProductsDataData } from "../../redux/postReducer/postProducts";
import Pagination from "../Pagination/Pagination";
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from "../Modals/DeleteModal";
import Loader from "../NoDataComponent/Loader";
import NoData from "../NoDataComponent/NoData";


export default function Producttable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: getProductData , statusdata } = useSelector((state) => state.getProductData);
  const [page, setpage] = useState(1);
  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [id, setId] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const paginate = (page) => setpage(page);

  const handleModal = (id) => {
    setModalOpen(true);
    setId(id);
  };

  const handleDelete = async (id) => {
    await dispatch(DeleteProductsDataData({ id }));
    dispatch(fetchgetProductData({ page }));
  };

  const handleNavigate = async (id) => {
    await navigate("/edit-product", {
      state: {
        id: id,
      },
    });
  };

  useEffect(() => {
    dispatch(fetchgetProductData({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    setTotalPages(getProductData.totalPages);
    setpostsPerPage(getProductData.pageSize);
    settotalPost(getProductData.totalCount);
  });

  if (statusdata === STATUSES.LOADING) {
    return (
      <Loader />
    );
  }

  if (statusdata === STATUSES.ERROR) {
    return (
      <h2
        style={{
          margin: "100px",
        }}
      >
        Something went wrong!
      </h2>
    );
  }
  return (
    <Fragment>
      <div className="routedashboard mainpage customertable">
        <div className="ct-chart" id="chartActivity">
        {
          getProductData?.items?.length == 0 ? <NoData /> : <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Description</th>
              {/* <th>Quantity</th> */}
              <th>Price</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {getProductData?.items?.map((item, i) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.Item_typeData?.name}</td>
                <td>{item.description}</td>
                <td>{item?.price}</td>

                <td>
                  <Dropdown as={Nav.Item} className="notidrop">
                    <Dropdown.Toggle
                      data-toggle="dropdown"
                      id="dropdown-67443507"
                      variant="default"
                      className="m-0"
                    >
                      <img src={Noti} alt="boximg" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {" "}
                      <Dropdown.Item onClick={() => handleNavigate(item)}>
                        {" "}
                        Edit
                      </Dropdown.Item>
                
                      <Dropdown.Item
                        onClick={() => handleModal(item._id)}
                      >
                        {" "}
                        Delete{" "}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        }
          
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={totalPost}
            TotalPages={TotalPages}
            paginate={paginate}
            currentPage={page}
          />
          <DeleteModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            handleDelete={handleDelete}
            id={id}
          />
        </div>
      </div>
    </Fragment>
  );
}
