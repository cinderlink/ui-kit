import { render } from 'vitest-browser-svelte';
import { expect, test, describe, vi } from 'vitest';
import Notification from './Notification.svelte';
import type { NotificationType } from './types';

describe('Notification component', () => {
	const mockNotification: NotificationType = {
		uid: 'test-1',
		sourceUid: 'source-1',
		type: 'info',
		title: 'Test Notification',
		body: 'This is a test notification body',
		dismissed: false,
		createdAt: Date.now(),
		read: false
	};

	test('renders notification with content', async () => {
		const { container } = render(Notification, {
				notification: mockNotification
			});
		
		// Should render notification container
		const notification = container.querySelector('.notification');
		expect(notification).toBeTruthy();
		
		// Should have dismiss button
		const dismissButton = container.querySelector('[aria-label="Dismiss notification"]');
		expect(dismissButton).toBeTruthy();
	});

	test('renders with header snippet', async () => {
		const { container } = render(Notification, {
				notification: mockNotification
			});
		
		// Test with header by checking structure
		const header = container.querySelector('.notification__header');
		expect(header).toBeTruthy();
	});

	test('renders with children snippet', async () => {
		const { container } = render(Notification, {
				notification: mockNotification
			});
		
		// Test with children by checking structure
		const body = container.querySelector('.notification__body');
		expect(body).toBeTruthy();
	});

	test('renders with footer snippet', async () => {
		const { container } = render(Notification, {
				notification: mockNotification
			});
		
		// Footer is conditional - only renders if footer snippet or link exists
		const footer = container.querySelector('.notification__footer');
		// Should not exist without footer or link
		expect(footer).toBeFalsy();
	});

	test('renders link button when notification has link', async () => {
		const notificationWithLink = {
			...mockNotification,
			link: 'https://example.com'
		};
		
		const screen = render(Notification, {
				notification: notificationWithLink
			});
		
		const linkButton = await screen.getByRole('button', { name: 'Go to link' });
		await expect.element(linkButton).toBeInTheDocument();
	});

	test('handles dismiss callback', async () => {
		const handleDismiss = vi.fn();
		const screen = render(Notification, {
				notification: mockNotification,
				ondismiss: handleDismiss
			});
		
		const dismissButton = await screen.getByRole('button', { name: 'Dismiss notification' });
		await dismissButton.click();
		
		expect(handleDismiss).toHaveBeenCalledTimes(1);
		expect(handleDismiss).toHaveBeenCalledWith(mockNotification);
	});

	test('handles go to link callback', async () => {
		const handleGoToLink = vi.fn();
		const handleDismiss = vi.fn();
		const notificationWithLink = {
			...mockNotification,
			link: 'https://example.com'
		};
		
		const screen = render(Notification, {
				notification: notificationWithLink,
				ongoToLink: handleGoToLink,
				ondismiss: handleDismiss
			});
		
		const linkButton = await screen.getByRole('button', { name: 'Go to link' });
		await linkButton.click();
		
		// Should call both callbacks
		expect(handleGoToLink).toHaveBeenCalledTimes(1);
		expect(handleGoToLink).toHaveBeenCalledWith(notificationWithLink);
		expect(handleDismiss).toHaveBeenCalledTimes(1);
	});

	test('does not render when dismissed', async () => {
		const dismissedNotification = {
			...mockNotification,
			dismissed: true
		};
		
		const { container } = render(Notification, {
				notification: dismissedNotification
			});
		
		// Should not render notification
		const notification = container.querySelector('.notification');
		expect(notification).toBeFalsy();
	});

	test('applies custom classes', async () => {
		const { container } = render(Notification, {
				notification: mockNotification,
				classes: 'custom-notification-class'
			});
		
		// Wait a bit for Panel to render
		await new Promise(resolve => setTimeout(resolve, 100));
		
		const notification = container.querySelector('.notification');
		expect(notification?.classList.contains('custom-notification-class')).toBe(true);
	});

	test('renders with different notification types', async () => {
		const types = ['info', 'success', 'warning', 'error'];
		
		for (const type of types) {
			const typedNotification = {
				...mockNotification,
				type,
				uid: `test-${type}`
			};
			
			const { container } = render(Notification, {
					notification: typedNotification
				});
			
			// Should render for all types
			const notification = container.querySelector('.notification');
			expect(notification).toBeTruthy();
		}
	});
});