import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "../src/maincss/Style.css";
import "../src/maincss/faiz.css";
import "../src/maincss/ahsan.css";
import "react-datepicker/dist/react-datepicker.css";
import "../src/maincss/responsive.css";
import routes from "../src/routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/css/animate.min.css";
import "../src/assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "../src/assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Customers from "./views/Customers";
import ServiceRate from "./views/ServiceRate";
import Dashboard from "./views/Dashboard";
import Addcustomer from "./views/Addcustomer";
import Profilepage from "./views/Profilepage";
import CustomerDetailpage from "./views/CustomerDetailpage";
import Test from "./views/Test";
import Pool from "./views/Pool";
import ServiceLocation from "./views/ServiceLocation";
import Loginpage from "./views/Loginpage";
import ProtectedRoute from "./components/Login/ProtectedRoute";
import Profit from "./views/Profit";

import RouteAssignment from "./views/RouteAssignment";
import ServiceLogs from "./views/ServiceLogs";
import { Provider } from "react-redux";
import store from "./redux/store";
import CustomerServiceLocation from "./views/CustomerServiceLocation";
import Addpools from "./views/Addpools";
import EditServiceLocation from "./views/EditServiceLocation";
import EditPools from "./views/EditPools";
import Workorder from "./views/Workorder";
import Chemicals from "./views/Chemicals";
import InstalledItems from "./views/InstalledItems";
import FinishedOrderDetail from "./views/FinishOrderDetail";
import LabourReports from "./views/LabourReports";
import LabourReportsWorkOrder from "./views/LabourReportsWorkOrder.js";
import LabourReportsSkippedData from "./views/LabourReportsSkippedData.js";
import Export from "./views/Export";
import Account from "./views/Account";
import ThemeSetting from "./views/ThemeSetting";
import AddRoute from "./views/AddRoute";
import Dosages from "./views/Dosages";
import AddDosages from "./views/AddDosages";
import EditDosages from "./views/EditDosages";
import ServiceLogDetail from "./views/ServiceLogDetail";
import ServiceLogWorkOrderDetail from "./views/ServiceLogWorkOrderDetail.js";
import BroadCastEmail from "./views/BroadCastEmail";
import LabourReportsDetail from "./views/LabourReportsDetail";
import LabourReportsSkipped from "./views/LabourReportsSkipped";
import LabourReportsSkippedDetail from "./views/LabourReportsSkippedDetail";
import DosagesDetail from "./views/DosagesDetail";
import Invoicing from "./views/Invoicing";
import WorkOrderType from "./views/WorkOrderType.js";
import CheckList from "./views/CheckList";
import AddChecklist from "./views/AddChecklist";
import ShoppingList from "./views/ShoppingList";
import AddShopping from "./views/AddShopping";
import EditWorkOrder from "./views/EditWorkOrder";
import AddWorkType from "./views/AddWorkType";
import EmailSetting from "./views/EmailSetting";
import EmailList from "./views/EmailList";
import InvoicingDetail from "./views/InvoicingDetail";
import EditShoppingList from "./views/EditShoppingList";
import Equipment from "./views/Equipment";
import TaxGroup from "./views/TaxGroup";
import AddProduct from "./views/AddProduct";
import EditProduct from "./views/EditProduct";
import Product from "./views/Product";
import ProductType from "./views/ProductType";
import EditProductType from "./views/EditProductType";
import AddProductType from "./views/AddProductType";
import WorkOrderList from "./views/WorkOrderList";
import Readings from "./views/Readings";
import AddReadings from "./views/AddReadings";
import AddTechnician from "./views/AddTechnician";
import Technician from "./views/Technician";
import EditTechnician from "./views/EditTechnicianForm";
import { ToastContainer } from "react-toastify";
import GeneralSetting from "./views/GeneralSetting.js";
import EditReadings from "./views/EditReadings.js";
import EditWorkType from "./views/EditWorkType.js";
import MapTesting from "./views/MapTesting.js";
import ForgetPassword from "./views/ForgetPassword";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Registration from './views/Registration.js';
import PaymentInfo from './views/PaymentInfo.js';
import SmsSetting from "./views/SmsSetting.js";
import EmailInSetting from "./views/EmailInSetting.js";
import { LoadScript } from "@react-google-maps/api";
import ForgetPasswordReturn from "./views/ForgetPasswords.js";
import ResetPasswords from "./views/ResetPassword.js";
import PaymentMethodAccount from "./views/PaymentMethodAccount.js";
import PaymentHistoryAccount from "./views/PaymentHistoryAccount.js";
import PaymentHistroyInvoice from "./views/PaymentHistroyInvoice.js";

const stripePromise = loadStripe(process.env.REACT_APP_GOOGLE_STRIPE_API_KEY);

const root = ReactDOM.createRoot(document.getElementById("root"));


const storeTheme = localStorage.getItem("primary");
document.documentElement.style.setProperty(
  "--primary-color",
  storeTheme || "#750004"
);

document.documentElement.style.setProperty("--font-color", "#fff");  

root.render(
  <Provider store={store}>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <Elements stripe={stripePromise}>
    <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                libraries={["places"]}
              >
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Loginpage />} />
          <Route exact path="/forgetpassword" element={<ForgetPassword />} />
          <Route exact path="/password/reset/:token" element={<ForgetPasswordReturn />} />
         
          <Route exact path="/map-testing" element={<MapTesting />} />
          <Route exact path="/account/register" element={<Registration />} />
          <Route exact path="/account/payment" element={<PaymentInfo />} />
          <Route element={<ProtectedRoute />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/customer" element={<Customers />} />
            <Route exact path="/servicerate" element={<ServiceRate />} />
            <Route exact path="/addcustomer" element={<Addcustomer />} />
            <Route exact path="/edit-work-order" element={<EditWorkOrder />} />

            <Route exact path="/edit-customer/:id" element={<Profilepage />} />
            <Route
              exact
              path="/customerview/:id"
              element={<CustomerDetailpage />}
            />
            <Route
              exact
              path="/edit-service-location/:id"
              element={<EditServiceLocation />}
            />
            <Route exact path="/edit-customer-pools" element={<EditPools />} />

            <Route
              exact
              path="/servicelocation"
              element={<ServiceLocation />}
            />
            <Route
              exact
              path="/route-assignment"
              element={<RouteAssignment />}
            />
            <Route exact path="/service-logs" element={<ServiceLogs />} />
            <Route exact path="/test" element={<Test />} />
            <Route
              exact
              path="/customer-servicelocation/:id"
              element={<CustomerServiceLocation />}
            />

            <Route exact path="/pool/:poolIds/:poolIdss" element={<Pool />} />
            <Route
              exact
              path="/customer-addpools/:customerID/:ServiceLocationID"
              element={<Addpools />}
            />

            <Route exact path="/add-work-order" element={<Workorder />} />
            {/* faiz branch */}

            <Route exact path="/shopping-list" element={<ShoppingList />} />
            <Route exact path="/add-shopping" element={<AddShopping />} />
            <Route exact path="/work-order-type" element={<WorkOrderType />} />
            <Route
              exact
              path="/add-work-order-type"
              element={<AddWorkType />}
            />
            <Route
              exact
              path="/edit-work-order-type"
              element={<EditWorkType />}
            />

            <Route exact path="/add-route" element={<AddRoute />} />
            <Route exact path="/chemical" element={<Chemicals />} />
            <Route exact path="/installed-items" element={<InstalledItems />} />
            <Route
              exact
              path="/finished-order/:id"
              element={<FinishedOrderDetail />}
            />
            <Route
              exact
              path="/service-log/:id"
              element={<ServiceLogDetail />}
            />
            <Route
              exact
              path="/service-log-workorder/:id"
              element={<ServiceLogWorkOrderDetail />}
            />

             

            <Route exact path="/email-setting" element={<EmailSetting />} />

            <Route exact path="/invoice" element={<Invoicing />} />
            <Route exact path="/profit" element={<Profit />} />

            <Route exact path="/dosages" element={<Dosages />} />
            <Route exact path="/edit-dosages" element={<EditDosages />} />
            <Route exact path="/edit-readings" element={<EditReadings />} />

            <Route exact path="/dosages/:id" element={<DosagesDetail />} />
            <Route exact path="/checklist" element={<CheckList />} />
            <Route exact path="/add-checklist" element={<AddChecklist />} />

            <Route exact path="/user" element={<Technician />} />
            <Route exact path="/add-user" element={<AddTechnician />} />
            <Route exact path="/edit-user" element={<EditTechnician />} />

            <Route exact path="/add-dosages" element={<AddDosages />} />
            <Route exact path="/labour-report" element={<LabourReports />} />
            <Route exact path="/labour-report-workorder" element={<LabourReportsWorkOrder />} />
            <Route exact path="/labour-report-skipped" element={<LabourReportsSkippedData />} />
            <Route exact path="/Export" element={<Export />} />
            <Route exact path="/Account" element={<Account />} />
            <Route exact path="/sms-setting" element={<SmsSetting />} />
            <Route exact path="/email-settings" element={<EmailInSetting />} />

            <Route exact path="/ThemeSetting" element={<ThemeSetting />} />
            <Route
              exact
              path="/labour-report/:id"
              element={<LabourReportsDetail />}
            />
            <Route
              exact
              path="/skipped-stop"
              element={<LabourReportsSkipped />}
            />
            <Route
              exact
              path="/skipped-stop/:id"
              element={<LabourReportsSkippedDetail />}
            />
            <Route exact path="/broadcast-email" element={<BroadCastEmail />} />
            <Route exact path="/email" element={<EmailList />} />
            <Route
              exact
              path="/invoice-detail/:id/:location/:start/:end"
              element={<InvoicingDetail />}
            />
            <Route exact path="/General" element={<GeneralSetting />} />
            <Route
              exact
              path="/edit-shopping/:id"
              element={<EditShoppingList />}
            />

            <Route exact path="/equipment" element={<Equipment />} />
            <Route exact path="/taxgroup" element={<TaxGroup />} />
            <Route exact path="/add-product" element={<AddProduct />} />
            <Route exact path="/edit-product" element={<EditProduct />} />
            <Route exact path="/product" element={<Product />} />
            <Route exact path="/product-type" element={<ProductType />} />
            <Route exact path='/payment-method' element={ <PaymentMethodAccount /> } />
            <Route exact path="/payment-history" element={ <PaymentHistoryAccount /> } />
            <Route exact path="/payment-history/:id" element={ <PaymentHistroyInvoice /> } />

            <Route
              exact
              path="/product-type/:id"
              element={<EditProductType />}
            />
            <Route
              exact
              path="/add-product-type"
              element={<AddProductType />}
            />
            <Route exact path="/work-order" element={<WorkOrderList />} />

            <Route exact path="/readings" element={<Readings />} />
            <Route exact path="/add-readings" element={<AddReadings />} />
            <Route exact path="/reset-password" element={<ResetPasswords />} />
          </Route>
        </Routes>
        {/* </div>
            </div> */}
      </BrowserRouter>
      </LoadScript>
    </Elements>
  </Provider>
  // {/* <BrowserRouter>
  // <Routes>
  //   <Route path="/" element={<Loginpage />} /> {/* Add the login page route */}
  //   <Route element={<ProtectedRoute />} >
  //   <Route path="/dashboard" element={<MainApp />} /> {/* Route for the main app */}

  //   <Route exact path="/" element={<Dashboard />} />
  //   </Route>
  // </Routes>
  // </BrowserRouter> */}
);