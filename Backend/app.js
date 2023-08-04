const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

//MongoDB Atlas connect
mongoose.connect('mongodb+srv://officialsabarinarayan:9447103050@cluster0.buyzcu4.mongodb.net/finalproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
    // Once connected, call the function to update passwords
    })

.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// User schema
const userSchema = new mongoose.Schema({
  name : String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, role: this.role }, 'secretKey');
  return token;
};

const User = mongoose.model('User', userSchema);

// Student Schema
const studentSchema=new mongoose.Schema({
  id: String,
  name: String,
  course: String,
  project: String,
  batch: String,
  status: String,
  placement: String,
})

const Student=mongoose.model('Studentdetail',studentSchema);

// Message Schema
const notificationSchema=new mongoose.Schema({
  notificationmess:String
})

const Noti=mongoose.model('Notification',notificationSchema);

function verifytoken(role) {
  return (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        throw 'Unauthorized';
      }
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        throw 'Unauthorized';
      }

      const payload = jwt.verify(token, 'secretKey');
      if (!payload || payload.role !== role) {
        throw 'Unauthorized';
      }

      next();
    } catch (error) {
      res.status(401).send('Unauthorized');
    }
  };
}

app.use(bodyParser.json());
app.use(cors());

// Notification operations
// Add
app.post('/addmess', verifytoken,(req,res)=>{
  console.log(req.body);
  const newNoti= new Noti({
    notificationmess:req.body.notificationmess
  });
  newNoti.save()
    .then(()=>{
      res.status(200).json({message:'Message Added'});
    })
    .catch((error)=>{
      res.status(500).json({error:'Failed to Add Message'});
    })
})

// View 
app.get('/viewmess',verifytoken,(req,res)=>{
  Noti.find()
  .then((notification)=>{
    res.status(200).json(notification);
  })
  .catch((error)=>{
    res.status(500).json({error:'Failed to Fetch'});
  })
});

// Delete
app.delete('/deletemess/:_id',verifytoken,(req, res) => {
  Noti.findByIdAndRemove(req.params._id)
  .then((notification)=>{
    if (notification){
      res.status(200).json({message:'Message deleted successfully'});
    }else{
      res.status(404).json({error:'Message not found'});
    }
  })
  .catch((error)=>{
    res.status(500).json({error:'Failed to delete Message'});
  });
});

// Login route
app.post('/login', verifytoken,(req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      bcrypt.compare(password, user.password)
        .then(isValid => {
          if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }

          const token = user.generateAuthToken();
          res.json({ message: 'Login successful', token });
        })
        .catch(err => {
          console.error('Error comparing passwords:', err);
          res.status(500).json({ message: 'Internal server error' });
        });
    })
    .catch(err => {
      console.error('Error finding user:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// student crud operations
// Add
app.post('/addstuds',verifytoken,(req,res)=>{
  console.log(req.body);
  const newStudent= new Student({
    id:req.body.id,
    name:req.body.name,
    course:req.body.course,
    project:req.body.project,
    batch:req.body.batch,
    status:req.body.status,
    placement:req.body.placement
  });
  newStudent.save()
    .then(()=>{
      res.status(200).json({message:'Student Detail Added'});
    })
    .catch((error)=>{
      res.status(500).json({error:'Failed to Add detail'});
    })
})

// view all
app.get('/viewstud',verifytoken,(req,res)=>{
  Student.find()
  .then((students)=>{
    res.status(200).json(students);
  })
  .catch((error)=>{
    res.status(500).json({error:'Failed to Fetch'});
  })
});

// getone
app.get('/getone/:_id',verifytoken, async (req, res) => {
  try {
    const student = await Student.findById(req.params._id);
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving data');
  }
});

// edit data
app.put('/editstuds/:_id', verifytoken, async (req, res) => {
  try {
      let id = req.params._id
      let updateData = {$set: req.body}
      const updated = await Student.findByIdAndUpdate(id, updateData,{ new: true })
      res.json(updated)
  } catch (error) {
      console.log(error)
      res.send('error')
  }
})

// delete data
app.delete('/deleteitem/:_id',verifytoken,(req, res) => {
  Student.findByIdAndRemove(req.params._id)
  .then((student)=>{
    if (student){
      res.status(200).json({message:'Student deleted successfully'});
    }else{
      res.status(404).json({error:'Student not found'});
    }
  })
  .catch((error)=>{
    res.status(500).json({error:'Failed to delete Student'});
  });
});


// User/ CRUD operations =>

app.post('/api/users', verifytoken,async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

app.get('/api/users',verifytoken, async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude the password field from the response
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

app.put('/api/users/:id',verifytoken, async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { email, password, role },
      { new: true } // Return the updated user after the update
    );
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

app.delete('/api/users/:id',verifytoken, async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});