const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    layout: "/admin",
    roles: ["Super_Admin", "Admin", "Technician"]
  },
  {
    path: "/customer",
    name: "Customers",
    roles: ["Super_Admin", "Admin", "Technician"]
  },
  {
    path: "/route-assignment",
    name: "Routes",
    roles: ["Super_Admin", "Admin", "Technician"]
  },
  {
    path: "/work-order",
    name: "Work Order",
    roles: ["Super_Admin", "Admin", "Technician"]
  },
  {
    path: "/shopping-list",
    name: "Shopping List",
    roles: ["Super_Admin", "Admin", "Technician"]
  },
  {
    path: "/service-logs",
    name: "Service Logs",
    roles: ["Super_Admin", "Admin", "Technician"]
  },
  {
    path: "/email",
    name: "Broadcast Email",
    roles: ["Super_Admin", "Admin", "Technician"]
  },
  {
    path: "/",
    name: "Reports",
    roles: ["Super_Admin", "Admin"]
  },
  {
    path: "/dashboard",
    name: "Settings",
    roles: ["Super_Admin", "Admin", "Technician"]
  },
  {
    path: "/Export",
    name: "Export",
    roles: ["Super_Admin", "Admin"]
  },
  {
    path: "/Account",
    name: "Account",
    roles: ["Super_Admin", "Admin"]
    

  },
];

export default dashboardRoutes;
