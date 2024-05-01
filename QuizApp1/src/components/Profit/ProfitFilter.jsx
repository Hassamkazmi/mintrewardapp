import { DatePicker, Form, Select } from "antd";
import { Fragment, useEffect , useState } from "react";
import { fetchgetProfitData } from "../../redux/Slices/getProfileData";
import { useDispatch , useSelector } from "react-redux";
import moment from "moment/moment";

export default function ProfitFilter()
{
    const { RangePicker } = DatePicker;
    const {data : getProfitData , status } = useSelector((state) =>  state.getProfitData);

    const [StartDate, setStartDate] = useState(moment().startOf("month").format('YYYY-MM-DD'));
    const [EndDate, setEndDate] = useState(moment().endOf("month").format('YYYY-MM-DD'));

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchgetProfitData({StartDate , EndDate }))
    },[StartDate , EndDate]) 

    const getLastThreeMonths = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // 0-based index, where January is 0
    
        const months = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
    
        const lastThreeMonths = [];
        for (let i = 12; i > 0; i--) {
          const monthIndex = (currentMonth - i + 12) % 12; // Ensure the index is in the valid range (0-11)
          const firstDayOfMonth = moment().subtract(i, 'months').startOf('month').format('YYYY-MM-DD');
          const lastDayOfMonth = moment().subtract(i, 'months').endOf('month').format('YYYY-MM-DD');
    
          lastThreeMonths.push({
            key: `${i + 1}`,
            label: `${months[monthIndex]}`,
            value: firstDayOfMonth,
            endDate: lastDayOfMonth,
            
          });
        }
    
        return lastThreeMonths;
      };
    
      const handleDateChange = (dates, i) => {
        setStartDate(i[0]);
        setEndDate(i[1]);
      };
    
    
      const onChange = (key) => {
    const selected = getLastThreeMonths().find(item => item.value === key);
    
        let startDate = selected?.value;
        let endDate = selected?.endDate;
    
        setStartDate(startDate);
        setEndDate(endDate);
    };

    console.log(StartDate)
    console.log(EndDate)
    

    return(
        <Fragment>
            <div className="row cslocation">
                <div className="col-sm-6 monthFilter">
                    <Form.Item name="month">
               
                        <Select
                        allowClear
                        className="monthFilterSelect"
                        style={{ width: "50%" }}
                        placeholder="Month"
                        options={getLastThreeMonths()}
                        onChange={onChange}
                        />{" "}
                    </Form.Item>
                </div>
                <div className="col-sm-6 monthDatePicker">
                <DatePicker.RangePicker
            allowClear={true}
            onChange={handleDateChange}
          />
                </div>
            </div>
        </Fragment>
    )
}