const mysql = require('mysql2/promise');
require('dotenv').config();

let pool = null;
let useMySQL = false;

// ─── In-Memory Fallback Data ───────────────────
const bcrypt = require('bcryptjs');
const hashedPassword = bcrypt.hashSync('admin123', 10);

const memoryStore = {
    admins: [
        { id: 1, username: 'admin', password: hashedPassword, created_at: new Date() }
    ],
    employees: [
        { id: 1, employee_id: 'EMP001', name: 'Rahul Sharma', department: 'Engineering', email: 'rahul.sharma@company.com', phone: '+91-9876543210', created_at: new Date() },
        { id: 2, employee_id: 'EMP002', name: 'Priya Patel', department: 'Human Resources', email: 'priya.patel@company.com', phone: '+91-9876543211', created_at: new Date() },
        { id: 3, employee_id: 'EMP003', name: 'Amit Kumar', department: 'Marketing', email: 'amit.kumar@company.com', phone: '+91-9876543212', created_at: new Date() },
        { id: 4, employee_id: 'EMP004', name: 'Sneha Reddy', department: 'Finance', email: 'sneha.reddy@company.com', phone: '+91-9876543213', created_at: new Date() },
        { id: 5, employee_id: 'EMP005', name: 'Vikram Singh', department: 'Engineering', email: 'vikram.singh@company.com', phone: '+91-9876543214', created_at: new Date() }
    ],
    nextEmployeeId: 6
};

// ─── Try MySQL Connection ──────────────────────
try {
    pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'employee_management',
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    pool.getConnection()
        .then(connection => {
            console.log('✅ Database connected successfully (MySQL)');
            useMySQL = true;
            connection.release();
        })
        .catch(err => {
            console.log('⚠️  MySQL not available — using in-memory data store');
            console.log('   (Install MySQL and run schema.sql for persistent storage)');
            useMySQL = false;
        });
} catch (err) {
    console.log('⚠️  MySQL not available — using in-memory data store');
    useMySQL = false;
}

// ─── Database Abstraction Layer ────────────────
const db = {
    // Check if using MySQL
    isMySQL() {
        return useMySQL;
    },

    // Query MySQL
    async query(sql, params) {
        if (useMySQL && pool) {
            return pool.query(sql, params);
        }
        // Fallback: handled by model/controller directly
        throw new Error('USE_MEMORY');
    },

    // Get memory store
    getStore() {
        return memoryStore;
    }
};

module.exports = db;
