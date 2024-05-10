import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const databaseName = 'SchoolApp.db';

const openDb = async () => {
  return SQLite.openDatabase({ name: databaseName, location: 'default' });
};

const setupDatabaseAsync = async () => {
  const db = await openDb();
  await db.transaction(tx => {
    tx.executeSql("CREATE TABLE IF NOT EXISTS Students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT UNIQUE, password TEXT);");
    tx.executeSql("CREATE TABLE IF NOT EXISTS Teachers (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT UNIQUE, password TEXT);");
    tx.executeSql("CREATE TABLE IF NOT EXISTS Appointments (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, time TEXT, teacherId INTEGER, studentId INTEGER, FOREIGN KEY(teacherId) REFERENCES Teachers(id), FOREIGN KEY(studentId) REFERENCES Students(id));");
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
  return results[0].rows.length > 0 ? results[0].rows.item(0).id : null;
};

const validateStudentLogin = async (email, password) => {
  const db = await openDb();
  const results = await db.executeSql("SELECT id FROM Students WHERE email = ? AND password = ?", [email, password]);
  return results[0].rows.length > 0 ? results[0].rows.item(0).id : null;
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

const fetchTeacherAppointments = async (teacherId) => {
  const db = await openDb();
  const results = await db.executeSql(
    "SELECT Appointments.id, Appointments.date, Appointments.time, Students.firstName as studentFirstName, Students.lastName as studentLastName FROM Appointments LEFT JOIN Students ON Appointments.studentId = Students.id WHERE teacherId = ?", [teacherId]
  );
  let appointments = [];
  if (results[0].rows.length > 0) {
    for (let i = 0; i < results[0].rows.length; i++) {
      appointments.push(results[0].rows.item(i));
    }
  }
  return appointments;
};


const fetchStudentAppointments = async (studentId) => {
  const db = await openDb();
  const results = await db.executeSql(`
    SELECT A.id, A.date, A.time, T.firstName AS teacherFirstName, T.lastName AS teacherLastName
    FROM Appointments AS A
    JOIN Teachers AS T ON A.teacherId = T.id
    WHERE A.studentId = ?`, [studentId]);
  let appointments = [];
  if (results[0].rows.length > 0) {
    for (let i = 0; i < results[0].rows.length; i++) {
      appointments.push(results[0].rows.item(i));
    }
  }
  return appointments;
};

const addAppointment = async (date, time, teacherId, studentId = null) => {
  const db = await openDb();
  await db.transaction(tx => {
    tx.executeSql("INSERT INTO Appointments (date, time, teacherId, studentId) VALUES (?, ?, ?, ?)", [date, time, teacherId, studentId]);
  });
};

const saveStudentSelection = async (appointmentId, studentId) => {
  const db = await openDb();
  await db.transaction(tx => {
    tx.executeSql("UPDATE Appointments SET studentId = ? WHERE id = ?", [studentId, appointmentId]);
  });
};


const deleteAppointment = async (id) => {
  const db = await openDb();
  await db.transaction(tx => {
    tx.executeSql("DELETE FROM Appointments WHERE id = ?", [id]);
  });
};

const deleteStudentAppointment = async (appointmentId) => {
  const db = await openDb();
  await db.transaction(tx => {
    tx.executeSql("DELETE FROM Appointments WHERE id = ?", [appointmentId]);
  });
};


const fetchTeachers = async () => {
  const db = await openDb();
  const results = await db.executeSql("SELECT id, firstName, lastName FROM Teachers");
  let teachers = [];
  if (results[0].rows.length > 0) {
    for (let i = 0; i < results[0].rows.length; i++) {
      teachers.push(results[0].rows.item(i));
    }
  }
  return teachers;
};

const loadAppointments = async (teacherId) => {
  return await fetchTeacherAppointments(teacherId);
};

export {
  setupDatabaseAsync,
  insertStudent,
  insertTeacher,
  validateStudentLogin,
  validateTeacherLogin,
  fetchAppointments,
  fetchTeachers,
  addAppointment,
  saveStudentSelection,
  deleteAppointment,
  fetchTeacherAppointments,
  fetchStudentAppointments,
  loadAppointments,
  deleteStudentAppointment
};








