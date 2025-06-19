/**
 * Sidebar state management using Svelte 5 runes
 */

class SidebarStore {
	// Reactive state
	isOpen = $state(false);
	isMobile = $state(false);
	isLocked = $state(false); // For desktop: keep sidebar open

	constructor() {
		// Initialize from localStorage if available
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('sidebar-state');
			if (stored) {
				try {
					const parsed = JSON.parse(stored);
					this.isOpen = parsed.isOpen ?? false;
					this.isLocked = parsed.isLocked ?? false; // Default to unlocked
				} catch {
					// Invalid stored data, use defaults
					this.isLocked = false;
				}
			} else {
				// No stored data, use desktop defaults
				this.isLocked = false;
			}

			// Set up mobile detection
			this.checkMobile();
			window.addEventListener('resize', () => this.checkMobile());

			// Initial state setup based on screen size
			this.updateInitialState();
		}
	}

	/**
	 * Set initial state based on screen size
	 */
	private updateInitialState() {
		if (this.isMobile) {
			this.isOpen = false;
			this.isLocked = false;
		} else {
			this.isOpen = true; // Open on desktop initially
			this.isLocked = false; // Don't lock by default - let user control it
		}
	}

	/**
	 * Check if we're on mobile based on viewport width
	 */
	private checkMobile() {
		const wasMobile = this.isMobile;
		this.isMobile = window.matchMedia('(max-width: 1024px)').matches;

		// Update state when switching between mobile/desktop
		if (wasMobile !== this.isMobile) {
			this.updateInitialState();
		}
	}

	/**
	 * Toggle sidebar open/closed
	 */
	toggle() {
		this.isOpen = !this.isOpen;
		this.persist();
	}

	/**
	 * Open sidebar
	 */
	open() {
		this.isOpen = true;
		this.persist();
	}

	/**
	 * Close sidebar
	 */
	close() {
		this.isOpen = false;
		this.persist();
	}

	/**
	 * Toggle sidebar lock (desktop only)
	 */
	toggleLock() {
		if (!this.isMobile) {
			this.isLocked = !this.isLocked;
			this.persist();
		}
	}

	/**
	 * Close sidebar on navigation (mobile only)
	 */
	closeOnNavigation() {
		if (this.isMobile && this.isOpen) {
			this.close();
		}
	}

	/**
	 * Persist state to localStorage
	 */
	private persist() {
		if (typeof window !== 'undefined') {
			localStorage.setItem(
				'sidebar-state',
				JSON.stringify({
					isOpen: this.isOpen,
					isLocked: this.isLocked
				})
			);
		}
	}
}

// Export singleton instance
export const sidebarStore = new SidebarStore();
