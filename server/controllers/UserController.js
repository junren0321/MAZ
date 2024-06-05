const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const nodemailer = require('nodemailer');

// User registration
exports.register = async (req, res) => {
    console.log('Register Parameters:', req.query);
    // console.log('Register function called');
    const { username, email, birthdate, password} = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    // const hashedSecurityAnswer = await bcrypt.hash(security_answer, 10); // Hash the security answer
    
    try {
        await db.query('INSERT INTO users (username, email, birthdate, password) VALUES (?, ?, ?, ?)', 
            [username, email, birthdate, hashedPassword]); // Use the hashed security answer
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
            res.json({ message: 'Login successful', token, 
            user: { username: users[0].username, email: users[0].email, birthdate: users[0].birthdate } });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error during login.' });
    }
};

// Forgot password
exports.forgot = async (req, res) => {
    const { email } = req.body;
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAZ_EMAIL,
            pass: process.env.MAZ_PASS
        }
    });

    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        let verification_code = Math.floor(100000 + Math.random() * 999999).toString();
        if (users.length > 0) {
            const mailOptions = {
                from:process.env.MAZ_EMAIL,
                to: email,
                subject: 'Password Reset for MAZ',
                text: `Hi! We received your request for a password change, please provide our website the following verification code: ${verification_code}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    console.error('Error sending email:', error);
                    return res.status(500).json({ error: 'Error sending email.'});
                } else {
                    console.log('Email sent:', info.response);
                    return res.json({ message: 'Please check your email for the verification code.', verification_code, userID: users.user_id});
                }
            });
        } else {
            res.status(401).json({ error: 'Invalid email'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error during forgot password.' });
    }
};

// Forgot password Verification
exports.changepass = async (req, res) => {
    const { new_password, userID } = req.body;
    const query = `
    UPDATE users
    SET password = ?
    WHERE id = ?;
    `;

    const hashedPassword = await bcrypt.hash(new_password, 10);
    
    try {
        await db.query(query, [hashedPassword, userID]);
        res.sendStatus(204); // No content response for successful update
    } catch (error) {
        console.error('Error editing password:', error);
        res.status(500).json({ error: 'Error editing password' });
    }
};