var UserSession = (function() {
  var getEmail = function() {
    return localStorage.getItem("email");
  };
  var setEmail = function(email) {
    localStorage.setItem("email", email);
  };
  var getAuthenticated = function() {
    return localStorage.getItem("isAuthenticated") === "true";
  };
  var setAuthenticated = function(isAuthenticated) {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  };
  return {
    getEmail: getEmail,
    setEmail: setEmail,
    getAuthenticated: getAuthenticated,
    setAuthenticated: setAuthenticated
  };
})();

export default UserSession;
