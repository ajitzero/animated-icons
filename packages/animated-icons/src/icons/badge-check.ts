import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-badge-check',
	template: `
		<svg
			class="badge-check-icon"
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
			<svg:path
				class="badge-path"
				d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
			/>
			<svg:path class="check-path" d="m9 12 2 2 4-4" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.badge-check-icon {
			overflow: visible;
		}

		.badge-path {
			transform-origin: center;
			transition: transform 1.2s ease-in-out;
		}

		.check-path {
			stroke-dasharray: 10;
			stroke-dashoffset: 0;
			opacity: 1;
			transition:
				stroke-dashoffset 1.2s ease-in-out,
				opacity 0.01s ease-in-out;
		}

		.badge-check-icon.animate .badge-path {
			animation: scaleBadge 1.2s ease-in-out;
		}

		.badge-check-icon.animate .check-path {
			animation: drawCheck 1.2s ease-in-out;
		}

		@keyframes scaleBadge {
			0% {
				transform: scale(1);
			}
			50% {
				transform: scale(0.9);
			}
			100% {
				transform: scale(1);
			}
		}

		@keyframes drawCheck {
			0% {
				stroke-dashoffset: 0;
				opacity: 1;
			}
			50% {
				stroke-dashoffset: 10;
				opacity: 1;
			}
			100% {
				stroke-dashoffset: 0;
				opacity: 1;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'badge-check',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeCheckIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter() {
		if (!this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 1400);
		}
	}
}
