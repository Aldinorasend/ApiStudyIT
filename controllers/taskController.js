const {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    getPhotoPathByID,
    getTaskByUserId,
    getTaskByEnrollId,
  } = require('../models/taskModel');
const taskModel = require('../models/taskModel');
const enrollModel = require('../models/enrollModel');
  // Mendapatkan semua task
  const getTasks = async (req, res) => {
    try {
      const tasks = await getAllTasks(); // Menggunakan async/await
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching tasks', details: err.message });
    }
  };

  const taskChecker = async (req, res) => {
    const EnrollID = req.params.EnrollID;
    const ModulID = req.params.ModulID;
    try {
      const tasks = await getTaskByEnrollId(EnrollID, ModulID); // Menggunakan async/await
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching tasks by Enroll ID', details: err.message });
    }
  };

  const approveTaskAndUpdateProgress = async (req, res) => {
    const { id } = req.params;
    
    try {
      // 1. Approve the task (set status to "Completed")
      await taskModel.ApproveTask(id);
      
      // 2. Get the task details including EnrollID 
      const task = await taskModel.getTaskById(id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      console.log("EnrollId:",task.EnrollID, "TaskID:",task.id)
      // 3. Get the enrollment details
      const user = await enrollModel.getEnrollById(task.EnrollID);
      console.log("UserId",user.UserID, "CourseId",user.CourseID)
      const enrollments = await enrollModel.getEnrollmentByCourseAndUser(user.UserID, user.CourseID);
      console.log("Enrollments:",enrollments) 
      if (!enrollments || enrollments.length === 0) {
        return res.status(404).json({ error: 'Enrollment not found' });
      }
      const enrollment = enrollments[0];
      
      // 4. Update the progress for this enrollment
      await enrollModel.UpdatedProgress(enrollment.UserID);
      
      // 5. Get the updated enrollment to return
      const updatedEnrollment = (await enrollModel.getStudentsEnrolls(enrollment.UserID))
        .find(e => e.CourseID === enrollment.CourseID);
      
      res.json({
        success: true,
        message: 'Task approved and progress updated',
        task: await taskModel.getTaskById(id),
        enrollment: updatedEnrollment
        
      });
      console.log(updatedEnrollment);
    } catch (error) {
      console.error('Error approving task:', error);
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  };

  const getTaskByIdUser = async (req, res) => {
    const UserID = req.params.UserID;
    const CourseID = req.params.CourseID;
    try {
      const tasks = await getTaskByUserId(UserID, CourseID); // Menggunakan async/await
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching tasks by Task ID', details: err.message });
    }
  };
  const getTasksByTaskID = async (req, res) => {
    const TaskID = req.params.TaskID;
    try {
      const tasks = await getTaskByIdTask(TaskID); // Menggunakan async/await
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching tasks by Task ID', details: err.message });
    }
  };
  const multer = require('multer');
  const fs = require('fs');
  const path = require('path');

  // Validasi file berdasarkan tipe MIME
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'application/pdf'
    ) {
      cb(null, true); // Terima file
    } else {
      cb(new Error('Invalid file type. Only JPG, JPEG, and PNG are allowed.'), false);
    }
  };
  
  // Konfigurasi Multer untuk menyimpan file
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Path ke folder 'uploads'
      const uploadPath = path.join(__dirname, '../uploads');
  
      // Membuat folder jika belum ada
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
  
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      // Gunakan nama file asli
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage, fileFilter }).single('FileTask'); // 'image' adalah field input file di form

// Fungsi untuk menambahkan task
const addTask = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: 'File upload error', details: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Pastikan UserID diterima
    // const userID = req.body.UserID;
    // if (!userID) {
    //   return res.status(400).json({ error: 'UserID is required' });
    // }

    // Simpan relative path untuk file
    const imagePath = `${req.file.filename}`;

    // Data task
    const data = {
      ModulID: req.body.ModulID,
      FileTask: imagePath, // Simpan path file di database
      // UserID: userID,      // Tambahkan UserID ke data
      EnrollID: req.body.EnrollID,
    };

    try {
      const result = await createTask(data); // Fungsi untuk menyimpan data ke database
      res.json({ message: 'Task created successfully', id: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creating task', details: err.message });
    }
  });
};
  
 // Mendapatkan task berdasarkan ID
 const getTask = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await getTaskById(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching task', details: err.message });
  }
};
  
  // Mengupdate task
  const editTask = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
      await updateTask(id, data);
      res.json({ message: 'Task updated' });
    } catch (err) {
      res.status(500).json({ error: 'Error updating task', details: err.message });
    }
  };
  
  const fst = require('fs').promises;

  const removeTask = async (req, res) => {
    const id = req.params.id;
  
    try {
      // Dapatkan path foto dari database
      const photoPath = await getPhotoPathByID(id); // Pastikan fungsi ini sudah ada
      console.log(`Photo path: ${photoPath}`);
      if (!photoPath) {
        return res.status(404).json({ error: 'Task not found or no photo associated' });
      }
  
      // Hapus file foto dari folder uploads
      const filePath = path.resolve(__dirname, '../uploads', photoPath); // Path absolut
      try {
        // Pastikan fs.unlink tidak menggunakan callback
        await fst.unlink(filePath);
        console.log(`File deleted: ${filePath}`);
      } catch (fileErr) {
        console.warn(`Failed to delete file: ${filePath}. Error: ${fileErr.message}`);
      }
  
      // Hapus task dari database
      await deleteTask(id); // Pastikan fungsi ini sudah ada
  
      res.json({ message: 'Task and associated photo deleted' });
    } catch (err) {
      console.error('Error deleting task or file:', err.message);
      res.status(500).json({ error: 'Error deleting task', details: err.message });
    }
  };
  
   // Menambahkan task baru
   
   

  module.exports = { 
    getTasks, addTask, getTask, approveTaskAndUpdateProgress, 
    editTask, removeTask, getTasksByTaskID, getTaskByIdUser, 
    taskChecker
  };
  