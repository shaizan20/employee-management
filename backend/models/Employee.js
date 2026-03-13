const db = require('../database/db');

class Employee {
    // Get all employees
    static async getAll() {
        try {
            const [rows] = await db.query('SELECT * FROM employees ORDER BY created_at DESC');
            return rows;
        } catch (e) {
            const store = db.getStore();
            return [...store.employees].reverse();
        }
    }

    // Get employee by ID
    static async getById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM employees WHERE id = ?', [id]);
            return rows[0];
        } catch (e) {
            const store = db.getStore();
            return store.employees.find(emp => emp.id === parseInt(id));
        }
    }

    // Get employee by employee_id
    static async getByEmployeeId(employeeId) {
        try {
            const [rows] = await db.query('SELECT * FROM employees WHERE employee_id = ?', [employeeId]);
            return rows[0];
        } catch (e) {
            const store = db.getStore();
            return store.employees.find(emp => emp.employee_id === employeeId);
        }
    }

    // Create a new employee
    static async create(employeeData) {
        try {
            const { employee_id, name, department, email, phone } = employeeData;
            const [result] = await db.query(
                'INSERT INTO employees (employee_id, name, department, email, phone) VALUES (?, ?, ?, ?, ?)',
                [employee_id, name, department, email, phone]
            );
            return result;
        } catch (e) {
            if (e.message === 'USE_MEMORY' || !db.isMySQL()) {
                const store = db.getStore();
                const newEmp = {
                    id: store.nextEmployeeId++,
                    employee_id: employeeData.employee_id,
                    name: employeeData.name,
                    department: employeeData.department,
                    email: employeeData.email,
                    phone: employeeData.phone,
                    created_at: new Date()
                };
                store.employees.push(newEmp);
                return { insertId: newEmp.id, affectedRows: 1 };
            }
            throw e;
        }
    }

    // Update an employee
    static async update(id, employeeData) {
        try {
            const { name, department, email, phone } = employeeData;
            const [result] = await db.query(
                'UPDATE employees SET name = ?, department = ?, email = ?, phone = ? WHERE id = ?',
                [name, department, email, phone, id]
            );
            return result;
        } catch (e) {
            if (e.message === 'USE_MEMORY' || !db.isMySQL()) {
                const store = db.getStore();
                const idx = store.employees.findIndex(emp => emp.id === parseInt(id));
                if (idx !== -1) {
                    store.employees[idx] = { ...store.employees[idx], ...employeeData };
                    return { affectedRows: 1 };
                }
                return { affectedRows: 0 };
            }
            throw e;
        }
    }

    // Delete an employee
    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM employees WHERE id = ?', [id]);
            return result;
        } catch (e) {
            if (e.message === 'USE_MEMORY' || !db.isMySQL()) {
                const store = db.getStore();
                const idx = store.employees.findIndex(emp => emp.id === parseInt(id));
                if (idx !== -1) {
                    store.employees.splice(idx, 1);
                    return { affectedRows: 1 };
                }
                return { affectedRows: 0 };
            }
            throw e;
        }
    }

    // Get total count
    static async getCount() {
        try {
            const [rows] = await db.query('SELECT COUNT(*) as total FROM employees');
            return rows[0].total;
        } catch (e) {
            const store = db.getStore();
            return store.employees.length;
        }
    }

    // Search employees
    static async search(query) {
        try {
            const searchTerm = `%${query}%`;
            const [rows] = await db.query(
                'SELECT * FROM employees WHERE name LIKE ? OR department LIKE ? OR email LIKE ? OR employee_id LIKE ?',
                [searchTerm, searchTerm, searchTerm, searchTerm]
            );
            return rows;
        } catch (e) {
            const store = db.getStore();
            const q = query.toLowerCase();
            return store.employees.filter(emp =>
                emp.name.toLowerCase().includes(q) ||
                emp.department.toLowerCase().includes(q) ||
                emp.email.toLowerCase().includes(q) ||
                emp.employee_id.toLowerCase().includes(q)
            );
        }
    }
}

module.exports = Employee;
