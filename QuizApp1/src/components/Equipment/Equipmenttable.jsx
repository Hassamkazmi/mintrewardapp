import React, { Fragment, useState , useEffect} from "react";
import { Nav, Dropdown, Button } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import Modal from "react-bootstrap/Modal";
import EquipmentHeader from "../EditEquipment/EquipmentHeader.jsx";
import EquipmentForm from "../EditEquipment/EquipmentForm.jsx";
import {
  DeleteEquipmenttData,
} from "../../redux/postReducer/postEquipment";
import { useSelector, useDispatch } from "react-redux";
import { fetchgetAllEquipmemnt , STATUSES } from "../../redux/Slices/getAllEquipment";
import Pagination from "../Pagination/Pagination.js";
import DeleteModal from "../Modals/DeleteModal.jsx";
import Loader from "../NoDataComponent/Loader"
import NoData from "../NoDataComponent/NoData"
import { toast } from "react-toastify";

export default function Equipmenttable() {
  const dispatch = useDispatch();
  const { data: getAllEquipmemnt, statusdata } = useSelector(
    (state) => state.getAllEquipmemnt
  );
  const [Data, setData] = useState("");
  const [page, setpage] = useState(1);
  const [TotalPages, setTotalPages] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [id, setId] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const paginate = (page) => setpage(page);

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

  const handleDelete = async (data) => {
    await dispatch(DeleteEquipmenttData({ data }));
    toast.success("Data Deleted successfully!")
    dispatch(fetchgetAllEquipmemnt({}));
  };

  useEffect(() => {
    dispatch(fetchgetAllEquipmemnt({ page }));
  }, [dispatch]);


  
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
            getAllEquipmemnt?.length == 0 ? <NoData/> : <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Descripion</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {getAllEquipmemnt.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>

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
                        {/* <Dropdown.Item
                           
                          >
                            {" "}Update */}
                        {/* </Dropdown.Item> */}
                        <Dropdown.Item
                          // onClick={() => handleDelete(item.equipment_id)}
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
         
        </div>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header className="modalHeader">
        <Button variant="secondary new" onClick={handleClose}>
          {" "}
          X
        </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="addcustomers addEquipments">
            <EquipmentHeader />
            <EquipmentForm data1={{Data ,handleClose}}/>
          </div>
        </Modal.Body>
      </Modal>
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
    </Fragment>
  );
}
