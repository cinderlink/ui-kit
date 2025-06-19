// Svelte 5 class-based theme store leveraging $state / $effect utilities

export type ThemeMode = 'light' | 'dark';

export class ThemeStore {
    /**
     * Internal reactive state – true if dark mode is enabled.
     */
    darkMode = $state(
        (typeof window !== 'undefined' && window.sessionStorage.getItem('darkMode') === 'true') ||
            false
    );

    private _subs = new Set<(v: boolean) => void>();
    private _inited = false;

    // No constructor logic – effects are declared at module scope below
    constructor() {}

    /** Force a specific mode */
    set(mode: ThemeMode) {
        this.darkMode = mode === 'dark';
    }

    /** Toggle between light & dark */
    toggle() {
        this.darkMode = !this.darkMode;
    }

    // Svelte store contract so `theme.subscribe` works
    subscribe(run: (value: boolean) => void) {
        // Immediately push current value
        run(this.darkMode);

        // Track subscriber
        this._subs.add(run);

        // Cleanup
        return () => {
            this._subs.delete(run);
        };
    }

    /** Call inside a component to setup reactive effects */
    init() {
        if (this._inited) return;
        this._inited = true;

        // Persist to sessionStorage whenever it changes
        $effect(() => {
            if (typeof window !== 'undefined') {
                window.sessionStorage.setItem('darkMode', this.darkMode.toString());
            }
        });

        // Reflect on <html> & <body> classes
        $effect(() => {
            if (typeof document !== 'undefined') {
                document.documentElement.classList.toggle('dark', this.darkMode);
                document.body.classList.toggle('dark', this.darkMode);
            }
        });

        // Notify subscribers whenever darkMode changes
        $effect(() => {
            this._subs.forEach((fn) => fn(this.darkMode));
        });
    }
}

export const theme = new ThemeStore();

export default theme;
