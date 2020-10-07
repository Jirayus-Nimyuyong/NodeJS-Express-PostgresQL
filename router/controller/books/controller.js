const { pool } = require('../../../postgres-connect')

const createBook = async (req, res) => {
  try {
    const { code, name } = req.body
    const sqlAddBooks = `
    INSERT INTO
      books
        (
          books_code,
          books_name
        )
    VALUES($1, $2)`
    const values = [code, name]
    await pool.query(sqlAddBooks, values)
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

const getBook = async (req, res) => {
  try {
    const sqlGetBooks = 'SELECT * FROM books'
    const books = await pool.query(sqlGetBooks)
    res.status(200).json(books.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

const getBookById = async (req, res) => {
  try {
    const { Id } = req.params
    const sqlGetBooksById = 'SELECT * FROM books WHERE books_code = $1'
    const value = [Id]
    const book = await pool.query(sqlGetBooksById, value)
    const { rows: [data] } = book
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

const updateBook = async (req, res) => {
  try {
    const {
      params: { Id },
      body: { code, name }
    } = req
    const sqlUpdateBook = `
      UPDATE
        books
      SET
        books_code = $1,
        books_name = $2
      WHERE 
        books_code = $3`
    const values = [code, name, Id]
    await pool.query(sqlUpdateBook, values)
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

const deletBook = async (req, res) => {
  try {
    const { Id } = req.params
    const sqlDelete = 'DELETE FROM books WHERE books_code = $1'
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
  createBook,
  getBook,
  getBookById,
  updateBook,
  deletBook
}
