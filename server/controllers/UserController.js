const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// User registration
exports.register = async (req, res) => {
    
<<<<<<< HEAD
<<<<<<< HEAD
    // console.log('Register function called');
    const { username, email, birthdate, password, security_question, security_answer } = req.body;

    // console.log('Input values:', { username, email, birthdate, password, security_question, security_answer });
    // console.log('Input types:', {
    //     username: typeof username,
    //     email: typeof email,
    //     birthdate: typeof birthdate,
    //     password: typeof password,
    //     security_question: typeof security_question,
    //     security_answer: typeof security_answer
    // });
=======
    console.log('Register function called');
    const { username, email, birthdate, password, security_question, security_answer } = req.body;

    console.log('Input values:', { username, email, birthdate, password, security_question, security_answer });
    console.log('Input types:', {
        username: typeof username,
        email: typeof email,
        birthdate: typeof birthdate,
        password: typeof password,
        security_question: typeof security_question,
        security_answer: typeof security_answer
    });
>>>>>>> e30fde2 (prototype)
=======
    // console.log('Register function called');
    const { username, email, birthdate, password, security_question, security_answer } = req.body;

    // console.log('Input values:', { username, email, birthdate, password, security_question, security_answer });
    // console.log('Input types:', {
    //     username: typeof username,
    //     email: typeof email,
    //     birthdate: typeof birthdate,
    //     password: typeof password,
    //     security_question: typeof security_question,
    //     security_answer: typeof security_answer
    // });
>>>>>>> 1029564 (Junren (#1))
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedSecurityAnswer = await bcrypt.hash(security_answer, 10); // Hash the security answer
    
    try {
        await db.query('INSERT INTO users (username, email, birthdate, password, security_question, security_answer) VALUES (?, ?, ?, ?, ?, ?)', 
            [username, email, birthdate, hashedPassword, security_question, hashedSecurityAnswer]); // Use the hashed security answer
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            if (error.message.includes('email')) {
              res.status(409).json({ error: 'duplicate_email'});
            } else if (error.message.includes('username')) {
              res.status(409).json({ error: 'duplicate_username'});
            }
        } else {
            res.status(500).json({ error: 'internal_server_error'});
        }
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length > 0 && await bcrypt.compare(password, users[0].password)) {
            const token = jwt.sign({ id: users[0].id, username: users[0].username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error during login.' });
    }
};
