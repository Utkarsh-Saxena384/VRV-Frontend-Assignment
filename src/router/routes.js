const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      // User Access Manager
      {
        path: "/manage-users",
        component: () => import("../pages/AccessControl/Users/ManageUsers.vue"),
      },
      {
        path: "/manage-permissions",
        component: () =>
          import("../pages/AccessControl/Permissions/ManagePermissions.vue"),
      },
      {
        path: "assigned-permissions/:id",
        component: () =>
          import("../pages/AccessControl/Permissions/AssignedPermissions.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
