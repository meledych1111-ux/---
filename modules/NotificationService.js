export class NotificationService {
    constructor() {
        this.notifications = [];
    }

    // Показать уведомление
    show(message, type = 'info', duration = 3000) {
        const notification = {
            id: Date.now(),
            message,
            type,
            duration
        };

        this.notifications.push(notification);
        this.displayNotification(notification);

        setTimeout(() => {
            this.removeNotification(notification.id);
        }, duration);
    }

    // Отображение уведомления
    displayNotification(notification) {
        const notificationElement = document.createElement('div');
        notificationElement.className = `notification notification-${notification.type}`;
        notificationElement.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${notification.message}</span>
                <button class="notification-close">×</button>
            </div>
        `;

        document.body.appendChild(notificationElement);

        // Анимация появления
        setTimeout(() => {
            notificationElement.classList.add('show');
        }, 100);

        // Закрытие по клику
        notificationElement.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification.id);
        });
    }

    // Удаление уведомления
    removeNotification(id) {
        this.notifications = this.notifications.filter(n => n.id !== id);
        const element = document.querySelector(`[data-notification-id="${id}"]`);
        if (element) {
            element.remove();
        }
    }

    // Специализированные уведомления
    showSuccess(message) {
        this.show(message, 'success');
    }

    showError(message) {
        this.show(message, 'error');
    }

    showWarning(message) {
        this.show(message, 'warning');
    }

    showInfo(message) {
        this.show(message, 'info');
    }
}
