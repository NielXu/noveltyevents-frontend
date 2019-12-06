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
 * return true if yes, false otherwise.
 * 
 * @param {String} required Required permission
 * @param {String} permission Actual permission
 */
function evaluatePermission(required, permission) {
  const pmap = {'low': 0, 'medium': 1, 'high': 2};
  if(pmap[permission] < pmap[required]) {
    return false;
  }
  return true;
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

  getDataDelay(delay, callback) {
    setTimeout(() => {
      callback(this.dbData);
    }, delay);
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

const MEMBERS_MOCK_FACTORY = new MockFactory([
  {
    id: '0',
    firstname: 'Daniel',
    lastname: 'Xu',
    email: '123@a.com',
    card: 'x12390',
    join: '2019-10-10'
  },
  {
    id: '1',
    firstname: 'JunXing',
    lastname: 'Xu',
    email: 'ut@utoronto.ca',
    card: 'x0931a',
    join: '2020-01-01'
  }, {
    id: '2',
    firstname: 'Paul',
    lastname: 'Liu',
    email: 'paul.liu@ut.com',
    card: 'x2017LP',
    join: '2017-04-20'
  }, {
    id: '3',
    firstname: 'Choyin',
    lastname: 'Yong',
    email: 'choy.in@domain.com',
    card: 'xA2130',
    join: '2019-01-01'
  }
])

export { queryString, evaluatePermission, MockFactory, MEMBERS_MOCK_FACTORY };
