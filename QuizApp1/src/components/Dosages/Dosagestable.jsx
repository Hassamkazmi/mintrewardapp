import React, { Fragment } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import { fetchgetAlldosage , STATUSES } from "../../redux/Slices/getAllDosages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";
import {
  DeletedosagesDataData,
  resetData,
} from "../../redux/postReducer/postDosages";
import { useNavigate } from "react-router-dom";
import Loader from "../NoDataComponent/Loader";
import NoData from "../NoDataComponent/NoData";
import DeleteModal from "../Modals/DeleteModal";
import { toast } from "react-toastify";

export default function DosgesTable() {
  const { data: getAlldosage, statusdata } = useSelector(
    (state) => state.getAlldosage
  );
  const { success } = useSelector((state) => state.postdosages);
  const [page, setpage] = useState(1);
  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState();
  const paginate = (pages) => setpage(pages);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchgetAlldosage({ page }));
  }, [page]);

  useEffect(() => {
    setTotalPages(getAlldosage.totalPages);
    setpostsPerPage(getAlldosage.pageSize);
    settotalPost(getAlldosage.totalCount);
  });
  const handleModal = (id) => {
    setModalOpen(true);
    setId(id);
  };

  const handleDelete = async (id) => {
    await dispatch(DeletedosagesDataData({ id }));
    dispatch(fetchgetAlldosage({ page }));
  };

  const handleEdit = async (id) => {
    navigate("/edit-dosages", {
      state: {
        id: id,
      },
    });
  };
  console.log(success, "success");
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
    }
  }, [success]);

  if (statusdata === STATUSES.LOADING) {
    return <Loader />;
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
          {getAlldosage?.items?.length == 0 ? (
            <NoData />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price per Unit</th>

                  <th>UOM</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {getAlldosage?.items?.map((item, i) => (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item?.price_per_unit}</td>
                    <td>{item?.unit_of_measurement}</td>

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
                          <Dropdown.Item onClick={() => handleEdit(item)}>
                            Edit
                          </Dropdown.Item>
                          {/* <Dropdown.Item
                           
                          >
                            {" "}Update */}
                          {/* </Dropdown.Item> */}
                          <Dropdown.Item onClick={() => handleModal(item._id)}>
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
