export default function authHeader() {
  console.log("authHeader called: ")
  const currentUser = localStorage.getItem("user");
  if (typeof currentUser === "string"){
      var user = JSON.parse(currentUser);
  }
  //const user = JSON.parse(localStorage.getItem("user") || "");
  console.log("localStorage.getItem: " + JSON.stringify(user))

  if (user && user.token){
    console.log("user name " + user.username)
    //console.log("user role " + user.role[0])

    return {Authorization: "Bearer "+user.token};

  } else{
   // window.alert("Please login first!")
    return {Authorization: ""};
  }
}