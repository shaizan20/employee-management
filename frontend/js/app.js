/* ═══════════════════════════════════════════════
   App.js - Shared JavaScript Utilities
   ═══════════════════════════════════════════════ */

const API_BASE = '/api';

// ─── API Client ────────────────────────────────
const api = {
    async request(endpoint, options = {}) {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            ...options,
        };

        try {
            const response = await fetch(`${API_BASE}${endpoint}`, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }

            return data;
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                throw new Error('Unable to connect to server');
            }
            throw error;
        }
    },

    get(endpoint) {
        return this.request(endpoint);
    },

    post(endpoint, body) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    },

    put(endpoint, body) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
        });
    },

    delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    },
};

// ─── Auth Helpers ──────────────────────────────
const auth = {
    async checkAuth() {
        try {
            const result = await api.get('/auth/check');
            return result.success;
        } catch {
            return false;
        }
    },

    async requireAuth() {
        const isAuthenticated = await this.checkAuth();
        if (!isAuthenticated) {
            window.location.href = '/login.html';
            return false;
        }
        return true;
    },

    async login(username, password) {
        return api.post('/auth/login', { username, password });
    },

    async logout() {
        try {
            await api.post('/auth/logout');
        } catch (e) {
            // Ignore errors during logout
        }
        window.location.href = '/login.html';
    },
};

// ─── Toast Notifications ───────────────────────
function showToast(message, type = 'success') {
    // Remove existing toasts
    document.querySelectorAll('.toast').forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${type === 'success' ? '✓' : '✕'}</span>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ─── Confirm Modal ─────────────────────────────
function showConfirm(title, message) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay active';
        overlay.innerHTML = `
            <div class="modal">
                <div class="modal-icon">⚠️</div>
                <h3>${title}</h3>
                <p>${message}</p>
                <div class="modal-actions">
                    <button class="btn btn-ghost" id="modal-cancel">Cancel</button>
                    <button class="btn btn-danger" id="modal-confirm">Delete</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.querySelector('#modal-cancel').onclick = () => {
            overlay.remove();
            resolve(false);
        };

        overlay.querySelector('#modal-confirm').onclick = () => {
            overlay.remove();
            resolve(true);
        };

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                resolve(false);
            }
        });
    });
}

// ─── Sidebar Navigation ───────────────────────
function initSidebar() {
    // Mobile toggle
    const toggle = document.querySelector('.mobile-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (toggle) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            auth.logout();
        });
    }

    // Highlight active nav item
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('.nav-item').forEach(item => {
        const href = item.getAttribute('href') || '';
        if (href && currentPage.includes(href.replace('.html', '').replace('/', ''))) {
            item.classList.add('active');
        }
    });
}

// ─── Form Validation ──────────────────────────
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^[\d\s\-+()]{7,20}$/.test(phone);
}

// ─── Sidebar HTML Template ─────────────────────
function getSidebarHTML(activePage) {
    return `
    <button class="mobile-toggle" aria-label="Toggle menu">☰</button>
    <div class="sidebar-overlay"></div>
    <aside class="sidebar">
        <div class="sidebar-brand">
            <div class="brand-icon">👥</div>
            <div>
                <h2>EMS</h2>
                <span>Employee Management</span>
            </div>
        </div>
        <nav class="sidebar-nav">
            <a href="dashboard.html" class="nav-item ${activePage === 'dashboard' ? 'active' : ''}">
                <span class="nav-icon">📊</span>
                <span>Dashboard</span>
            </a>
            <a href="employees.html" class="nav-item ${activePage === 'employees' ? 'active' : ''}">
                <span class="nav-icon">👤</span>
                <span>Employees</span>
            </a>
            <a href="add-employee.html" class="nav-item ${activePage === 'add' ? 'active' : ''}">
                <span class="nav-icon">➕</span>
                <span>Add Employee</span>
            </a>
        </nav>
        <div class="sidebar-footer">
            <div class="admin-badge">
                <div class="admin-avatar">A</div>
                <div class="admin-info">
                    <div class="admin-name">Admin</div>
                    <div class="admin-role">Administrator</div>
                </div>
            </div>
            <a href="#" id="logout-btn" class="nav-item">
                <span class="nav-icon">🚪</span>
                <span>Logout</span>
            </a>
        </div>
    </aside>`;
}

// ─── DOM Ready ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
});
