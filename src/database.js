import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const databaseName = 'SchoolApp.db';

const openDb = async () => {
  return SQLite.openDatabase({ name: databaseName, location: 'default' });
};

const setupDatabaseAsync = async () => {
  const db = await openDb();
  await db.transaction(tx => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT UNIQUE, password TEXT);"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Teachers (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT UNIQUE, password TEXT);"
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Appointments (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, time TEXT, teacherId INTEGER, FOREIGN KEY(teacherId) REFERENCES Teachers(id));"
    );
  });
};

const insertTeacher = async (firstName, lastName, email, password) => {
  const db = await openDb();
  await db.transaction(tx => {
    tx.executeSql(
      "INSERT INTO Teachers (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, password]
    );
  });
};

const insertStudent = async (firstName, lastName, email, password) => {
  const db = await openDb();
  await db.transaction(tx => {
    tx.executeSql(
      "INSERT INTO Students (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, password]
    );
  });
};

const validateTeacherLogin = async (email, password) => {
  const db = await openDb();
  const results = await db.executeSql("SELECT id FROM Teachers WHERE email = ? AND password = ?", [email, password]);
  if (results[0].rows.length > 0) {
    return results[0].rows.item(0).id;
  }
  return null;
};

const validateStudentLogin = async (email, password) => {
  const db = await openDb();
  const results = await db.executeSql(
    "SELECT id FROM Students WHERE email = ? AND password = ?",
    [email, password]
  );
  if (results[0].rows.length > 0) {
    // Giriş başarılı, öğrenci ID'si döndür
    return results[0].rows.item(0).id;
  }
  // Giriş başarısız
  return null;
};


const fetchAppointments = async (teacherId) => {
  const db = await openDb();
  const results = await db.executeSql("SELECT * FROM Appointments WHERE teacherId = ?", [teacherId]);
  let appointments = [];
  if (results[0].rows.length > 0) {
    for (let i = 0; i < results[0].rows.length; i++) {
      appointments.push(results[0].rows.item(i));
    }
  }
  return appointments;
};

const addAppointment = async (date, time, teacherId) => {
  const db = await openDb();
  await db.transaction(tx => {
    tx.executeSql("INSERT INTO Appointments (date, time, teacherId) VALUES (?, ?, ?)", [date, time, teacherId]);
  });
};

const deleteAppointment = async (id) => {
  const db = await openDb();
  await db.transaction(tx => {
    tx.executeSql("DELETE FROM Appointments WHERE id = ?", [id]);
  });
};

export {
  setupDatabaseAsync,
  insertStudent,
  insertTeacher,
  validateStudentLogin,
  validateTeacherLogin,
  fetchAppointments,
  addAppointment,
  deleteAppointment
};
