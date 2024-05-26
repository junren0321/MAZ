const { Sequelize, DataTypes } = require('sequelize');

// Connect to MySQL
const sequelize = new Sequelize('pdf_review_db', 'root', 'aries20020321', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define File Model
const File = sequelize.define('File', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  originalname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const uploadFile = async (req, res) => {
  try {
    const file = await File.create({
      filename: req.file.filename,
      path: req.file.path,
      originalname: req.file.originalname,
    });
    res.status(201).send('File uploaded successfully');
  } catch (error) {
    res.status(500).send('Error uploading file');
  }
};

module.exports = { uploadFile, File, sequelize };
