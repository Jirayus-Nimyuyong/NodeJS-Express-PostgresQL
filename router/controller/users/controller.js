const { pool } = require('../../../postgres-connect')

const createUser = async (req, res) => {
  try {
    const {
      code,
      name,
      password,
      type,
      mobilePhone,
      email
    } = req.body
    const sqlAddUser = `
      INSERT INTO 
        users
          (
            users_code, 
            users_name, 
            password, 
            type, 
            mobile_phone_no, 
            email
          )
      VALUES($1, $2, $3, $4, $5, $6)`
    const values = [code, name, password, type, mobilePhone, email]
    await pool.query(sqlAddUser, values)
    res.status(201).json({
      status: 201,
      message: 'Created Success'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

const getUser = async (req, res) => {
  try {
    const sqlGetUser = 'SELECT * FROM users'
    const users = await pool.query(sqlGetUser)
    res.status(200).json(users.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

const getUserById = async (req, res) => {
  try {
    const { Id } = req.params
    const sqlGetUserById = 'SELECT * FROM users WHERE users_code = $1'
    const value = [Id]
    const user = await pool.query(sqlGetUserById, value)
    const { rows: [data] } = user
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

const updateUser = async (req, res) => {
  try {
    const {
      params: { Id },
      body: {
        code,
        name,
        password,
        type,
        mobilePhone,
        email
      }
    } = req
    const sqlUpdate = `
      UPDATE 
        users
      SET
        users_code = $1,
        users_name = $2,
        password = $3,
        type = $4,
        mobile_phone_no = $5,
        email = $6
      WHERE
        users_code = $7`
    const values = [code, name, password, type, mobilePhone, email, Id]
    await pool.query(sqlUpdate, values)
    res.status(200).json({
      status: 200,
      message: 'Updated Success'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { Id } = req.params
    const sqlDelete = 'DELETE FROM users WHERE users_code = $1'
    const value = [Id]
    await pool.query(sqlDelete, value)
    res.status(200).json({
      status: 200,
      message: 'Deleted Success'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser
}
