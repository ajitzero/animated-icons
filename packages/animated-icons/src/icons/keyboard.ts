import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	input,
	linkedSignal,
	numberAttribute,
} from '@angular/core';
import { ANIMATED_ICONS_CONFIG } from '../tokens/provider';

@Component({
	selector: 'i-keyboard',
	template: `
		<svg
			class="keyboard-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			[class.animate]="isAnimating()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<svg:rect width="20" height="16" x="2" y="4" rx="2" />
			@for (key of keyboardPaths; track key.id) {
				<svg:path class="key" [id]="key.id" [attr.d]="key.d" [style.--keyboard-delay.s]="key.delay" />
			}
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.keyboard-icon {
			overflow: visible;
		}

		.key {
			opacity: 1;
		}

		@keyframes fadeInOut {
			0%,
			100% {
				opacity: 1;
			}
			50% {
				opacity: 0.2;
			}
		}

		.keyboard-icon.animate .key {
			animation: fadeInOut 1.5s ease-in-out infinite;
			animation-delay: var(--keyboard-delay);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'keyboard',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
		'(touchstart)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	#timer: ReturnType<typeof setTimeout> | null = null;

	handleMouseEnter(forced = false) {
		if (forced || (!this.animate() && !this.isAnimating())) {
			this.isAnimating.set(true);
			this.#timer = setTimeout(() => this.isAnimating.set(false), 1500);
		}
	}

	protected keyboardPaths = [
		{ id: 'key1', d: 'M10 8h.01', delay: 0 },
		{ id: 'key2', d: 'M12 12h.01', delay: 0.05 },
		{ id: 'key3', d: 'M14 8h.01', delay: 0.1 },
		{ id: 'key4', d: 'M16 12h.01', delay: 0.15 },
		{ id: 'key5', d: 'M18 8h.01', delay: 0.2 },
		{ id: 'key6', d: 'M6 8h.01', delay: 0.25 },
		{ id: 'key7', d: 'M7 16h10', delay: 0.3 },
		{ id: 'key8', d: 'M8 12h.01', delay: 0.35 },
	];

	constructor() {
		effect(() => {
			const animate = this.animate();
			if (animate) {
				this.handleMouseEnter(true);
			} else {
				if (this.#timer) {
					clearTimeout(this.#timer);
					this.#timer = null;
				}
			}
		});
	}
}
