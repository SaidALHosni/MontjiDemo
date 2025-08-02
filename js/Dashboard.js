// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching for dashboard sections
    const navLinks = document.querySelectorAll('.dashboard-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(navLink => navLink.parentElement.classList.remove('active'));
            document.querySelectorAll('.dashboard-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('href');
            document.querySelector(sectionId).style.display = 'block';
        });
    });
    
    // Initialize the first section as active
    if (navLinks.length > 0) {
        const firstSectionId = navLinks[0].getAttribute('href');
        document.querySelector(firstSectionId).style.display = 'block';
    }
    
    // Status select changes
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('status-select')) {
            const status = e.target.value;
            const row = e.target.closest('tr');
            
            // Update status display
            if (row) {
                const statusCell = row.querySelector('.status');
                if (statusCell) {
                    statusCell.textContent = status;
                    statusCell.className = 'status';
                    
                    // Add appropriate class based on status
                    if (status.includes('Pending')) statusCell.classList.add('pending');
                    else if (status.includes('Preparing')) statusCell.classList.add('preparing');
                    else if (status.includes('Ready')) statusCell.classList.add('ready');
                    else if (status.includes('Delivery') || status.includes('Transit')) statusCell.classList.add('in-progress');
                    else if (status.includes('Delivered')) statusCell.classList.add('delivered');
                    else if (status.includes('Cancelled')) statusCell.classList.add('cancelled');
                    else if (status.includes('Resolved')) statusCell.classList.add('resolved');
                }
            }
            
            // Show notification
            showNotification(`Status updated to "${status}"`);
        }
    });
    
    // Button actions
    document.addEventListener('click', function(e) {
        // Approve button
        if (e.target.classList.contains('approve-button')) {
            const row = e.target.closest('tr');
            if (row) {
                row.querySelector('.status').textContent = 'Approved';
                row.querySelector('.status').className = 'status active';
                showNotification('Request approved successfully');
            }
        }
        
        // Reject button
        if (e.target.classList.contains('reject-button')) {
            const row = e.target.closest('tr');
            if (row) {
                row.querySelector('.status').textContent = 'Rejected';
                row.querySelector('.status').className = 'status cancelled';
                showNotification('Request rejected');
            }
        }
        
        // Resolve button
        if (e.target.classList.contains('resolve-button')) {
            const row = e.target.closest('tr');
            if (row) {
                row.querySelector('.status').textContent = 'Resolved';
                row.querySelector('.status').className = 'status resolved';
                showNotification('Complaint marked as resolved');
            }
        }
    });
    
    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
});