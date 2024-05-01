import React, { Fragment, useState } from "react";
import { Nav, Dropdown, Button } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import Modal from "react-bootstrap/Modal";
import TaxGroupHeader from "../TaxGroupEdit/TaxGroupHeaderList";
import TaxGroupEdit from "../TaxGroupEdit/TaxGroupForm";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "../Modals/DeleteModal.jsx";
import TaxGroupHeaderList from "./TaxGroupHeaderList";
import { fetchSalesTax , STATUSES } from "../../redux/Slices/getSaleTax";
import {
  DeleteRateTaxPostData,
  clearData,
} from "../../redux/postReducer/postRateTax";
import Loader from "../NoDataComponent/Loader";
import NoData from "../NoDataComponent/NoData";
import { toast } from "react-toastify";
import Pagination from "../Pagination/Pagination.js";

export default function TaxGrouptable() {
  const dispatch = useDispatch();
  const { data: SalesTax, status } = useSelector((state) => state.SalesTax);
  const { success, error } = useSelector((state) => state.postRateTaxPost);

  const [Data, setData] = useState("");
  const [id, setId] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const paginate = (page) => setCurrentPage(page);

  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setData(data);
    setShow(true);
  };
  const handleModal = (id) => {
    setModalOpen(true);
    setId(id);
  };

  const handleDelete = async (id) => {
    await dispatch(DeleteRateTaxPostData({ id }));
    dispatch(fetchSalesTax({ currentPage }));
  };

  useEffect(() => {
    setTotalPages(SalesTax.totalPages);
    setpostsPerPage(SalesTax.pageSize);
    settotalPost(SalesTax.totalCount);
  }, [SalesTax]);

  useEffect(() => {
    dispatch(fetchSalesTax({ currentPage }));
  }, [dispatch, currentPage]);
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearData());
    }
    if (error) {
      toast.error(error);
      dispatch(clearData());
    }
  }, [error, success]);

  if (status === STATUSES.LOADING) {
    return <Loader />;
  }

  if (status === STATUSES.ERROR) {
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
      <div className="customertable">
        <div className="row routedashboard mainpage cslocation">
          <div className="col-sm-12">
            <TaxGroupHeaderList />
            <div className="ct-chart" id="chartActivity">
              {SalesTax?.length == 0 ? (
                <NoData />
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Rate</th>

                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {SalesTax.items?.map((item, i) => (
                      <tr key={i}>
                        <td>{item.name}</td>
                        <td>{item.Rate}%</td>

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
                              <Dropdown.Item onClick={() => handleShow(item)}>
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
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="taxratemodal"
      >
        <Modal.Body>
          Edit Tax Rate
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <TaxGroupEdit data1={{ Data, handleClose }} />
      </Modal>
    

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPost}
        TotalPages={TotalPages}
        paginate={paginate}
        currentPage={currentPage}
      />

      <DeleteModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleDelete={handleDelete}
        id={id}
      />
    </Fragment>
  );
}
