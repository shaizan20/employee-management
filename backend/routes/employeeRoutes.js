const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const isAuthenticated = require('../middleware/authMiddleware');

// All employee routes require authentication
router.use(isAuthenticated);

// GET /api/employees/count - Get employee count
router.get('/count', employeeController.getEmployeeCount);

// GET /api/employees/search - Search employees
router.get('/search', employeeController.searchEmployees);

// GET /api/employees - Get all employees
router.get('/', employeeController.getAllEmployees);

// GET /api/employees/:id - Get single employee
router.get('/:id', employeeController.getEmployee);

// POST /api/employees - Create new employee
router.post('/', employeeController.createEmployee);

// PUT /api/employees/:id - Update employee
router.put('/:id', employeeController.updateEmployee);

// DELETE /api/employees/:id - Delete employee
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
