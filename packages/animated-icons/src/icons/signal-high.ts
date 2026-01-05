import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-signal-high',
	template: `
		<svg
			class="signal-high-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			[class.animate]="isHovered()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<svg:path d="M2 20h.01" />
			<svg:path class="signal-level signal-line-1" d="M7 20v-4" />
			<svg:path class="signal-level signal-line-2" d="M12 20v-8" />
			<svg:path class="signal-level signal-line-3" d="M17 20V8" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.signal-icon {
			overflow: visible;
		}

		.signal-level {
			opacity: 1;
			transition: opacity 0.2s ease;
		}

		.signal-icon.animate .signal-level {
			animation: fadeInSequence 0.6s ease forwards;
		}

		.signal-icon.animate .signal-line-1 {
			opacity: 0;
			animation-delay: 0.1s;
		}

		.signal-icon.animate .signal-line-2 {
			opacity: 0;
			animation-delay: 0.2s;
		}

		.signal-icon.animate .signal-line-3 {
			opacity: 0;
			animation-delay: 0.3s;
		}

		@keyframes fadeInSequence {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'signal-high',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalHighIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');

	isHovered = signal(false);

	handleMouseEnter() {
		if (!this.isHovered()) {
			this.isHovered.set(true);

			setTimeout(() => {
				this.isHovered.set(false);
			}, 1400);
		}
	}
}
