const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const nodemailer = require('nodemailer');

// delete book
exports.deletebook = async (req, res) => {
    const { bookId } = req.body;

    try {
        if (bookId) {
            const query = `
                DELETE FROM books
                WHERE id = ?;
            `;

            await db.query(query, [bookId]);
            res.sendStatus(204); // No content response for successful deletion
        } else {
            res.status(400).json({ error: 'Invalid book id' }); // 400 for bad request
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Database error during book delete.' });
    }
};

// change email
exports.changemail = async (req, res) => {
    const { changemailpassword, oldemail, newemail } = req.body;
    // console.log(req.body);

    if (!changemailpassword || !oldemail || !newemail) {
        console.error('Missing fields:', { changemailpassword, oldemail, newemail });
        return res.status(400).json({ error: 'All fields are required' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAZ_EMAIL,
            pass: process.env.MAZ_PASS
        }
    });
    
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [oldemail]);
        if (users.length > 0 && await bcrypt.compare(changemailpassword, users[0].password)) {
            // console.log('Fetched users from database:', users);
            const query = `
            UPDATE users
            SET email = ?
            WHERE id = ?;
            `;
            try {
                await db.query(query, [newemail, users[0].id]);
                res.sendStatus(204); // No content response for successful update
            } catch (error) {
                console.error('Error editing email:', error);
                res.status(500).json({ error: 'Error editing email' });
            }

            const mailOptions = {
                from:process.env.MAZ_EMAIL,
                to: newemail,
                subject: 'New email for MAZ',
                text: `Hi! We received your request for an email change, Pleased to meet you with your new identity!`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    console.error('Error sending email:', error);
                    return res.status(500).json({ error: 'Error sending email.'});
                } else {
                    console.log('Email sent:', info.response);
                    return res.json({ message: 'Please check your new email!'});
                }
            });

        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error during change mail.' });
    }
};

// change password
exports.changepassword = async (req, res) => {
    const { currentpassword, newpassword, useremail } = req.body;
    // console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAZ_EMAIL,
            pass: process.env.MAZ_PASS
        }
    });
    
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [useremail]);
        if (users.length > 0 && await bcrypt.compare(currentpassword, users[0].password)) {
            // console.log('Fetched users from database:', users);
            const query = `
            UPDATE users
            SET password = ?
            WHERE id = ?;
            `;

            const hashedPassword = await bcrypt.hash(newpassword, 10);

            try {
                await db.query(query, [hashedPassword, users[0].id]);
                res.sendStatus(204); // No content response for successful update
            } catch (error) {
                console.error('Error changing password:', error);
                res.status(500).json({ error: 'Error changing password' });
            }

            const mailOptions = {
                from:process.env.MAZ_EMAIL,
                to: useremail,
                subject: 'New email for MAZ',
                text: `Hi! We received your request for a password change. If you did not perform this action please contact us!`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    console.error('Error sending email:', error);
                    return res.status(500).json({ error: 'Error sending email.'});
                } else {
                    console.log('Email sent:', info.response);
                    return res.json({ message: 'Password change successful!'});
                }
            });
        } else {
            res.status(401).json({ error: 'Invalid password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error during password change.' });
    }
};

// change username
exports.changeusername = async (req, res) => {
    const { changenamepassword, newname, useremail } = req.body;
    // console.log(req.body);

    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [useremail]);
        if (users.length > 0 && await bcrypt.compare(changenamepassword, users[0].password)) {
            // console.log('Fetched users from database:', users);
            const query = `
            UPDATE users
            SET username = ?
            WHERE id = ?;
            `;
            try {
                await db.query(query, [newname, users[0].id]);
                res.sendStatus(204); // No content response for successful update
            } catch (error) {
                console.error('Error editing email:', error);
                res.status(500).json({ error: 'Error editing email' });
            }
        } else {
            res.status(401).json({ error: 'Invalid password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error during change username.' });
    }
};

// delete user
exports.deleteuser = async (req, res) => {
    const { deleteuserpassword, useremail } = req.body;

    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [useremail]);
        if (users.length > 0 && await bcrypt.compare(deleteuserpassword, users[0].password)) {
            // console.log('Fetched users from database:', users);
            const query = `
            DELETE FROM users
            WHERE id = ?;
            `;

            try {
                await db.query(query, [users[0].id]);
                res.sendStatus(204); // No content response for successful update
            } catch (error) {
                console.error('Error deleting user:', error);
                res.status(500).json({ error: 'Error deleting user' });
            }
            
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MAZ_EMAIL,
                    pass: process.env.MAZ_PASS
                }
            });

            const mailOptions = {
                from:process.env.MAZ_EMAIL,
                to: users[0].email,
                subject: 'MAZ account deletion :(',
                text: `Hi! We received your request for an account deletion, may we meet again!`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    console.error('Error sending email:', error);
                    return res.status(500).json({ error: 'Error sending email.'});
                } else {
                    console.log('Email sent:', info.response);
                    return res.json({ message: 'Please check your new email!'});
                }
            });
        } else {
            res.status(401).json({ error: 'Invalid password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error during user delete.' });
    }
};

// exports.changeProfilePicture = async (req, res) => {
//     console.log('Changing profile picture');
//     if (!req.file) {
//         console.log('No file uploaded');
//         return res.status(400).json({ error: 'No file uploaded' });
//     }
//     const { filename } = req.file; // Comes from the file upload middleware (e.g., multer)
//     const id = req.user.id; // Assuming the user ID is available from the session or JWT

//     console.log('User id = ', id, ' profilePic_filename = ', filename);
//     try {
//         await db.query('UPDATE users SET profilePic_filename = ? WHERE id = ?', [filename, id]);
//         res.status(200).json({ message: 'Profile picture updated successfully'});
//     } catch (error) {
//         console.error('Database error:', error);
//         res.status(500).json({ error: 'Database error during profile picture update.' });
//     }
// };

exports.changeProfilePicture = async (req, res) => {
    console.log('Changing profile picture');
    if (!req.file) {
        console.log('No file uploaded');
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const { filename } = req.file;
    const id = req.user.id;
    const profilePicUrl = `/uploads/${filename}`; // Construct URL path for the uploaded file

    console.log('User id = ', id, ' profilePic_filename = ', filename);
    try {
        await db.query('UPDATE users SET profilePic_filename = ? WHERE id = ?', [filename, id]);
        res.status(200).json({
            message: 'Profile picture updated successfully',
            profilePicUrl: profilePicUrl  // Include the URL in the response
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error during profile picture update.' });
    }
};
