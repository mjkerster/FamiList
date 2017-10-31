import FirebaseApp from './FirebaseApp.js'

const db = FirebaseApp.database;
const taskRef = db.ref('/task/');
const accountsRef = db.ref('/accounts/');

function addTask(task) {
  taskRef.push().set(task);
}

function getTasks() {
  //change from once() to on() for live updates. https://firebase.google.com/docs/database/web/read-and-write
  return taskRef.once('value');
}

function updateTask(task) {
  const updateTaskRef = _getUpdateRef(task.key);
  updateTaskRef.update(task);
}

function getAccounts() {
  return accountsRef.once('value');
}

function addAccount(account) {
  db.ref('/accounts/' + account.uid).set(account)
}

function checkAccountsAndAdd(user) {
  return new Promise((resolve, reject) => {
    getAccounts().then((snapshot) => {
      const accountObjArray = [];
      let accountObj = {};
      let shouldAddAccount = true;
  
      snapshot.forEach(childSnapshot => {
        accountObj = childSnapshot.exportVal();
        console.log('ACCOUNT ', accountObj)
        if(user.uid === accountObj.uid) {
          console.log('ACCOUNT MATCH')
          shouldAddAccount = false;
          accountObj.active = true;
        }
        else {
          accountObj.active = false;
        }
        
        accountObjArray.push(accountObj);
      });
      
      resolve(accountObjArray);

      if(shouldAddAccount) {
        console.log('ADDING ACCOUNT');
        addAccount(user);
      }  
    });
  }); 
}

function _getUpdateRef(key) {
  return db.ref('/task/' + key);
}

export default {
  addTask: addTask,
  getTasks: getTasks,
  updateTask: updateTask,
  getAccounts: getAccounts,
  addAccount: addAccount,
  checkAccountsAndAdd: checkAccountsAndAdd
}
