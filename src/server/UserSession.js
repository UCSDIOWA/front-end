var UserSession = (function() {
  var getEmail = function() {
    return sessionStorage.getItem("email");
  };
  var setEmail = function(email) {
    sessionStorage.setItem("email", email);
  };
  var getAuthenticated = function() {
    return sessionStorage.getItem("isAuthenticated") === "true";
  };
  var setAuthenticated = function(isAuthenticated) {
    sessionStorage.setItem("isAuthenticated", isAuthenticated);
  };
  return {
    getEmail: getEmail,
    setEmail: setEmail,
    getAuthenticated: getAuthenticated,
    setAuthenticated: setAuthenticated
  };
})();

export default UserSession;
