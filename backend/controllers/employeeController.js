const Employee = require('../models/Employee');

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.getAll();
        res.json({ success: true, data: employees });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get single employee
exports.getEmployee = async (req, res) => {
    try {
        const employee = await Employee.getById(req.params.id);
        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }
        res.json({ success: true, data: employee });
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Create new employee
exports.createEmployee = async (req, res) => {
    try {
        const { employee_id, name, department, email, phone } = req.body;

        // Validate required fields
        if (!employee_id || !name || !department || !email || !phone) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Check if employee_id already exists
        const existing = await Employee.getByEmployeeId(employee_id);
        if (existing) {
            return res.status(400).json({ success: false, message: 'Employee ID already exists' });
        }

        await Employee.create({ employee_id, name, department, email, phone });
        res.status(201).json({ success: true, message: 'Employee added successfully' });
    } catch (error) {
        console.error('Error creating employee:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: 'Employee ID or email already exists' });
        }
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update employee
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.getById(req.params.id);
        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        const { name, department, email, phone } = req.body;
        await Employee.update(req.params.id, { name, department, email, phone });
        res.json({ success: true, message: 'Employee updated successfully' });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.getById(req.params.id);
        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        await Employee.delete(req.params.id);
        res.json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get employee count
exports.getEmployeeCount = async (req, res) => {
    try {
        const count = await Employee.getCount();
        res.json({ success: true, data: { total: count } });
    } catch (error) {
        console.error('Error getting count:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Search employees
exports.searchEmployees = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ success: false, message: 'Search query is required' });
        }
        const employees = await Employee.search(q);
        res.json({ success: true, data: employees });
    } catch (error) {
        console.error('Error searching employees:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
