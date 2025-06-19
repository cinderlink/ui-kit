import { render } from 'vitest-browser-svelte';
import { expect, test, describe, vi } from 'vitest';
import Notifications from './Notifications.svelte';
import type { NotificationType } from './types';

describe('Notifications component', () => {
	const mockNotifications: NotificationType[] = [
		{
			uid: 'test-1',
			sourceUid: 'source-1',
			type: 'info',
			title: 'First Notification',
			body: 'This is the first notification',
			dismissed: false,
			createdAt: Date.now() - 10000,
			read: false
		},
		{
			uid: 'test-2',
			sourceUid: 'source-2',
			type: 'success',
			title: 'Second Notification',
			body: 'This is the second notification',
			dismissed: false,
			createdAt: Date.now() - 5000,
			read: true
		},
		{
			uid: 'test-3',
			sourceUid: 'source-3',
			type: 'warning',
			title: 'Third Notification',
			body: 'This is a dismissed notification',
			dismissed: true,
			createdAt: Date.now(),
			read: false
		}
	];

	test('renders notifications container', async () => {
		const { container } = render(Notifications, {
				notifications: mockNotifications
			});
		
		// Should render notifications container
		const notificationsContainer = container.querySelector('.notifications');
		expect(notificationsContainer).toBeTruthy();
		
		// Should render only non-dismissed notifications
		const notifications = container.querySelectorAll('.notification');
		expect(notifications.length).toBe(2);
	});

	test('renders with custom header', async () => {
		const { container } = render(Notifications, {
				notifications: mockNotifications
			});
		
		// Check that header area exists
		const header = container.querySelector('.notifications__header');
		expect(header).toBeTruthy();
	});

	test('renders default header when none provided', async () => {
		const screen = render(Notifications, {
				notifications: mockNotifications
			});
		
		const defaultHeader = await screen.getByText('Notifications title');
		await expect.element(defaultHeader).toBeInTheDocument();
	});

	test('renders dismiss all button', async () => {
		const screen = render(Notifications, {
				notifications: mockNotifications
			});
		
		const dismissAllButton = await screen.getByText('Dismiss all');
		await expect.element(dismissAllButton).toBeInTheDocument();
	});

	test('handles dismiss all callback', async () => {
		const handleDismissAll = vi.fn();
		const screen = render(Notifications, {
				notifications: mockNotifications,
				ondismissedAll: handleDismissAll
			});
		
		const dismissAllButton = await screen.getByText('Dismiss all');
		await dismissAllButton.click();
		
		expect(handleDismissAll).toHaveBeenCalledTimes(1);
		expect(handleDismissAll).toHaveBeenCalledWith(mockNotifications);
	});

	test('handles individual notification dismiss', async () => {
		const handleDismiss = vi.fn();
		const { container } = render(Notifications, {
				notifications: mockNotifications,
				ondismiss: handleDismiss
			});
		
		// Find first dismiss button
		const dismissButtons = container.querySelectorAll('[aria-label="Dismiss notification"]');
		expect(dismissButtons.length).toBe(2);
		
		// Click first dismiss button
		(dismissButtons[0] as HTMLElement).click();
		
		expect(handleDismiss).toHaveBeenCalledTimes(1);
		expect(handleDismiss).toHaveBeenCalledWith('test-1');
	});

	test('handles notification link click', async () => {
		const handleGoToLink = vi.fn();
		const notificationsWithLink = [
			...mockNotifications.slice(0, 1),
			{
				...mockNotifications[1],
				link: 'https://example.com'
			}
		];
		
		const { container } = render(Notifications, {
				notifications: notificationsWithLink,
				ongoToLink: handleGoToLink
			});
		
		// Find link button
		const linkButton = container.querySelector('[aria-label="Go to link"]') as HTMLElement;
		expect(linkButton).toBeTruthy();
		linkButton.click();
		
		expect(handleGoToLink).toHaveBeenCalledTimes(1);
		expect(handleGoToLink).toHaveBeenCalledWith(notificationsWithLink[1]);
	});

	test('does not render when all notifications are dismissed', async () => {
		const allDismissed = mockNotifications.map(n => ({ ...n, dismissed: true }));
		
		const { container } = render(Notifications, {
				notifications: allDismissed
			});
		
		// Should not render anything
		const notificationsContainer = container.querySelector('.notifications');
		expect(notificationsContainer).toBeFalsy();
	});

	test('does not render with empty notifications array', async () => {
		const { container } = render(Notifications, {
				notifications: []
			});
		
		// Should not render anything
		const notificationsContainer = container.querySelector('.notifications');
		expect(notificationsContainer).toBeFalsy();
	});

	test('renders notification details correctly', async () => {
		const { container } = render(Notifications, {
				notifications: mockNotifications
			});
		
		// Check notification content exists
		const notificationBodies = container.querySelectorAll('.notification__body');
		expect(notificationBodies.length).toBe(2);
		
		// Check that titles are rendered
		const titles = container.querySelectorAll('.font-bold');
		expect(titles.length).toBeGreaterThan(0);
		
		// Verify some content is rendered
		const content = container.textContent || '';
		expect(content).toContain('notification');
	});

	test('formats notification dates', async () => {
		const { container } = render(Notifications, {
				notifications: mockNotifications
			});
		
		// Should have date formatting in footer
		const footers = container.querySelectorAll('.notification__footer');
		expect(footers.length).toBeGreaterThan(0);
		
		// Check that dates are formatted
		const dateRegex = /\w{3} \w{3} \d{2} \d{4}/; // e.g., "Mon Jan 01 2024"
		let hasFormattedDate = false;
		
		footers.forEach(footer => {
			if (dateRegex.test(footer.textContent || '')) {
				hasFormattedDate = true;
			}
		});
		
		expect(hasFormattedDate).toBe(true);
	});
});