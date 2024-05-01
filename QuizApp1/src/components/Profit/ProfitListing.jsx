import React,{ Fragment, useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { CaretRightOutlined } from "@ant-design/icons";
// import { UnorderedListOutlined } from "@ant-design/icons";
// import { Button, Dropdown, Menu, Space } from "antd";
import { fetchgetProfitDetail } from "../../redux/Slices/getProfiitDetails";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";


export default function ProfitListing({data}){
    const dispatch = useDispatch();
    const {data: getProfitDetail , status} = useSelector((state) => state.getProfitDetail)
    const [activeKey, setActiveKey] = useState(null);

    const [TotalPages, setTotalPages] = useState(1);
    const [postsPerPage, setpostsPerPage] = useState(1);
    const [totalPost, settotalPost] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
  
    const paginate = (page) => setCurrentPage(page);
    
    useEffect(() => {
        setTotalPages(data.totalPages);
        setpostsPerPage(data.pageSize);
        settotalPost(data.totalCount);
      },[data]);

    const handleSingleProfit = (id, StartDate, EndDate) => {
        dispatch(fetchgetProfitDetail({id, StartDate, EndDate}))
    }
    
    return(
        <Fragment>
            <div className="filteraccordian">
                <div className="main" >
                    {data?.items?.map((item, key) => (
                        <div className="row cslocation">
                            <div className="col-sm-11">
                            <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
                               <Accordion.Item eventKey={key}>
                                        <Accordion.Header onClick={() => handleSingleProfit(item?._id , data?.start, data?.end)}>
                                            <div className="row cslocation">
                                                <div className="col-sm-6 profitMaker">
                                                    <p>{item?.first_name +" " + item?.last_name}</p>
                                                </div>
                                                <div className="col-sm-6 totalProfits">
                                                    <p>Total Profit: ${item?.TotalProfit ? Math.round(item?.TotalProfit) : "0"}</p>
                                                </div>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body >
                                        <div className="row">
                                                <div className="col-sm-12 profitListingTable">
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th></th>
                                                                <th>Service Location</th>
                                                                <th>Pool / Water Body</th>
                                                                <th>Profit</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            getProfitDetail?.BillDetail?.map((item , key) => {
                                                                return(
                                                                 
                                                                    <tr>
                                                                        <td>{key + 1}</td>
                                                                        <td>{item?.ServiceLocationName}</td>
                                                                        <td>{item?.name}</td>
                                                                        <td>${item?.Total ? Math.round(item?.Total) : "00" }</td>
                                                                    </tr>
                                                                  
                                                            
                                                                )
                                                            })
                                                        }
                                                           </tbody>
                                                    </table>
                                                    
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        

                            {/* <div className="col-sm-1">
                                < CaretRightOutlined />
                            </div> */}

                        </div>
                    ))}
                    <Pagination
            postsPerPage={postsPerPage}
            totalPosts={totalPost}
            TotalPages={TotalPages}
            paginate={paginate}
            currentPage={currentPage}
          />
                </div>
            </div>
        </Fragment>
    )
}