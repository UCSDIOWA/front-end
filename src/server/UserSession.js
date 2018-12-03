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
  var getName = function() {
    return sessionStorage.getItem("name");
  };
  var setName = function(name) {
    sessionStorage.setItem("name", name);
  };
  var getProfileImage = function() {
    return sessionStorage.getItem("profileImage");
  };
  var setProfileImage = function(profileImage) {
    sessionStorage.setItem("profileImage", profileImage);
  };

  return {
    getEmail: getEmail,
    setEmail: setEmail,
    getAuthenticated: getAuthenticated,
    setAuthenticated: setAuthenticated,
    getName: getName,
    setName: setName,
    getProfileImage: getProfileImage,
    setProfileImage: setProfileImage
  };
})();

export default UserSession;
