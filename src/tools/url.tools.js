/**
* Extract the query from current url, return null if
* given name does not exists in the query, return
* empty string if name does exists but has no value
* 
* @param {String} name Name of the query to extract
* @param {String} url Current url
*/
function queryString(name, url = window.location.href) {
 name = name.replace(/[[]]/g, "\\&");
 const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
 const results = regex.exec(url);

 if (!results) {
   return null;
 }
 if (!results[2]) {
   return "";
 }

 return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export { queryString };