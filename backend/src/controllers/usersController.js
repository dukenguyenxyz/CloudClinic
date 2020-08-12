const moment = require('moment');
const User = require('../models/User');
const Session = require('../models/Session');
const {
  schemaValidation,
  signInValidation,
} = require('../utils/validations/users');

// Sign up
exports.signUp = async (req, res) => {
  try {
    // Validation before creation
    const { error } = schemaValidation(req.body);
    if (error) return res.status(400).send(error);

    // Check for unique email
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('email already exists');

    // Check if confirmPassword is the same as password
    if (!req.body.confirmPassword === req.body.password) {
      return res.status(404).send('confirmed password is incorrect');
    }

    // Try to save otherwise send error
    const user = new User(req.body);

    // Protect from malicious account information assignment
    if (user.isDoctor) {
      delete user.clientInfo;
      user.doctorInfo.rating = 1;
    } else {
      delete user.doctorInfo;
    }
    user.tokens = [];

    await user.save();
    const token = await user.generateAuthToken();
    // moment(user.dateOfBirth).format('YYYY-MM-DD');
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

// Sign in
exports.signIn = async (req, res) => {
  try {
    // Validation before creation
    const { error } = signInValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if email & password are correct
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    // Create and assign a token
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

// Sign out of current session
exports.signOut = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(400).send(e);
  }
};

// Sign out of all sessions
exports.signOutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

// Get own user's profile
exports.viewProfile = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).send();
    }
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    // Unrequire list of fields if not provided
    const unrequiredFields = ['firstName', 'lastName', 'password'];
    unrequiredFields.forEach((field) => {
      if (!req.body[field]) {
        req.body[field] = req.user[field];
      }
    });

    // Unrequire confirm password
    req.body.confirmPassword = req.body.password;

    // Disable updating email & isDoctor
    req.body.email = req.user.email;
    req.body.isDoctor = req.user.isDoctor;

    const { error } = schemaValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    Object.keys(req.body).forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save();

    res.status(201).send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Delete user's profile
exports.deleteProfile = async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
};

// // GET Client(s) Routes
// All Clients
exports.viewClients = async (req, res) => {
  try {
    if (!req.user.isDoctor) {
      res.status(403).send({ error: 'Forbidden' });
    }

    // Change this to allow null
    const bookedSessions = await Session.find(
      { doctor: req.user._id },
      function (err) {
        if (err) {
          return res.status(404).send();
        }
      }
    );

    const bookedWithClients = bookedSessions.map((session) => session.client);

    // Assign all users to the user of bookedSessions
    const users = await User.find(
      { _id: { $in: bookedWithClients } },
      function (err) {
        if (err) {
          return res.status(404).send();
        }
      }
    );

    // Only send appropriate data
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send();
  }
};

// One Client
exports.viewClient = async (req, res) => {
  try {
    await Session.find(
      {
        doctor: req.user._id,
        client: req.params.id,
      },
      function (err) {
        if (err) {
          return res.status(404).send();
        }
      }
    );

    const user = await User.findOne(
      { _id: req.params.id, isDoctor: false },
      function (err) {
        if (err) {
          return res.status(404).send();
        }
      }
    );

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
};

// // GET Doctor(s) Routes (ADD MORE VALIDATION HERE)
// All Doctors
exports.viewDoctors = async (req, res) => {
  try {
    const users = await User.find({ isDoctor: true });
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
};

// One Doctor
exports.viewDoctor = async (req, res) => {
  try {
    const user = await User.findOne(
      { _id: req.params.id, isDoctor: true },
      function (err) {
        if (err) {
          return res.status(404).send();
        }
      }
    );
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
};

// exports.createUpload = async (req, res) => {
//   try {
//     console.log(req.file);
//     res.send({
//       message: 'Hello World',
//     });
//   } catch (e) {
//     res.status(500).send();
//   }
// };
