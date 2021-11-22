export const admin_nav_item = [
  {
    name: "User",
    url: "/user",
    icon: "icon-cursor",
    children: [
      {
        name: "Profile",
        url: "/user/profile"
      },
      {
        name: "Register",
        url: "/user/create"
      },
      {
        name: "List",
        url: "/user/list"
      }
    ]
  },
]

export const user_nav_item = [
  {
    name: "User",
    url: "/user",
    icon: "icon-cursor",
    children: [
      {
        name: "Profile",
        url: "/user/profile"
      },
    ]
  },
  {
    name: "Post",
    url: "/post",
    icon: "icon-cursor",
    children: [
      {
        name: "Register",
        url: "/post/create"
      },
      {
        name: "List",
        url: "/post/list"
      }
    ]
  },
]
