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

/**
 * Evaluate if user has sufficient permission to execute,
 * return true if NOT, false if user has permission.
 * 
 * @param {String} required Required permission
 * @param {String} permission Actual permission
 */
function evaluatePermission(required, permission) {
  const pmap = {'low': 0, 'medium': 1, 'high': 2};
  if(pmap[permission] < pmap[required]) {
    return true;
  }
  return false;
}

/**
 * MockFactory is a mock database storing in json.
 * It copies the value passed from the constructor
 * and perform CRUD on it.
 * It also supports delay feature which will simulate
 * the waiting time for server response.
 * This is for debug and development used only, should
 * never use it in production.
 */
class MockFactory {
  constructor(initData) {
    this.dbData = JSON.parse(JSON.stringify(initData));
  }

  get data() {
    return this.dbData;
  }

  set data(newData) {
    this.dbData = newData;
  }

  search(k, delay, callback) {
    function doSearch(k, dbData) {
      const kname = k.name;
      const kvalue = k.value;
      for(var i=0;i<dbData.length;i++) {
        const e = dbData[i];
        if(e.hasOwnProperty(kname) && e[kname] === kvalue) {
          return e;
        }
      }
    }
    if(delay) {
      setTimeout(() => {
        callback(doSearch(k, this.dbData));
      }, delay);
    }
    else {
      return doSearch(k, this.dbData);
    }
  }

  insert(d, delay, callback) {
    if(delay) {
      setTimeout(() => {
        this.dbData.push(d);
        callback();
      }, delay);
    }
    else {
      this.dbData.push(d);
    }
  }

  delete(k, delay, callback) {
    function doDelete(k, dbData) {
      let index;
      const kname = k.name;
      const kvalue = k.value;
      let found = false;
      for(index=0;index<dbData.length;index++) {
        const e = dbData[index];
        if(e.hasOwnProperty(kname) && e[kname] === kvalue) {
          found = true;
          break;
        }
      }
      if(found) dbData.splice(index, 1);
    }
    if(delay) {
      setTimeout(() => {
        doDelete(k, this.dbData);
        callback();
      }, delay);
    }
    else {
      doDelete(k, this.dbData);
    }
  }

  update(k, newVal, delay, callback) {
    function doUpdate(k, newVal, dbData) {
      const kname = k.name;
      const kvalue = k.value;
      for(var i=0;i<dbData.length;i++) {
        const e = dbData[i];
        if(e.hasOwnProperty(kname) && e[kname] === kvalue) {
          for(var key in newVal) {
            if(e.hasOwnProperty(key)) {
              e[key] = newVal[key];
            }
          }
          return e;
        }
      }
    }
    if(delay) {
      setTimeout(() => {
        callback(doUpdate(k, newVal, this.dbData));
      }, delay);
    }
    else {
      return doUpdate(k, newVal, this.dbData);
    }
  }

}

export { queryString, evaluatePermission, MockFactory };