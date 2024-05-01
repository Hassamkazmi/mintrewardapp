import React, { Fragment, useState } from "react";
import { Nav, Dropdown, Button } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import Modal from "react-bootstrap/Modal";
import TaxRateHeader from "../TaxGroupEdit/TaxRateHeaderList";
import TaxRateForm from "../TaxGroupEdit/TaxRateForm";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "../Modals/DeleteModal.jsx";
import TaxRateHeaderList from "./TaxRateHeaderList";
import { fetchSalesTaxGroup , STATUSES } from "../../redux/Slices/getSaleGroup";
import { DeleteSalesTaxGroupPostData, resetData } from "../../redux/postReducer/postSalesTaxGroup";
import Loader from "../NoDataComponent/Loader"
import NoData from "../NoDataComponent/NoData"
import { toast } from "react-toastify";
import Pagination from "../Pagination/Pagination.js";

export default function Equipmenttable() {
  const dispatch = useDispatch();

  const { data: SalesTaxGroup, status } = useSelector(
    (state) => state.SalesTaxGroup
  );
  const { success, error } = useSelector((state) => state.postRateTaxPost);

  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (page) => setCurrentPage(page);

  const [Data, setData] = useState("");
  const [id, setId] = useState();
  const [modalOpen, setModalOpen] = useState(false);

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
    await dispatch(DeleteSalesTaxGroupPostData({ id }));
    dispatch(fetchSalesTaxGroup({ currentPage }));
  };

  useEffect(() => {
    dispatch(fetchSalesTaxGroup({ currentPage }));
  }, [dispatch, currentPage]);

  // useEffect(() => {
  //   if (success) {
  //     toast.success(success);
  //     dispatch(resetData());

  //   }
  //   if (error) {
  //     toast.error(error);
  //     dispatch(resetData());
  //   }
  // }, [error, success]);

  useEffect(() => {
    setTotalPages(SalesTaxGroup.totalPages);
    setpostsPerPage(SalesTaxGroup.pageSize);
    settotalPost(SalesTaxGroup.totalCount);
  }, [SalesTaxGroup]);

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
            <TaxRateHeaderList />
            <div className="ct-chart" id="chartActivity">
              {SalesTaxGroup?.items?.length == 0 ? (
                <NoData />
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Total Rate</th>

                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {SalesTaxGroup?.items?.map((item, i) => (
                      <tr key={i}>
                        <td>{item?.name}</td>
                        <td>
                          {item?.TotalSalesTax ? item?.TotalSalesTax : 0}%
                        </td>
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
      {/* <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="taxratemodal"
      >
        <Modal.Header className="modalHeader">
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="addcustomers addEquipments">
            <TaxRateHeader />
            <TaxRateForm data1={{ Data, handleClose }} />
          </div>
        </Modal.Body>
      </Modal> */}

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="taxratemodal"
      >
        <Modal.Body>
          Edit Tax Group
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <TaxRateForm data1={{ Data, handleClose }} />

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
