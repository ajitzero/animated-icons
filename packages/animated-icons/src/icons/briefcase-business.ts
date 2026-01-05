import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-briefcase-business',
	template: `
		<svg
			class="briefcase-business-icon"
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
			<svg:path class="dot" d="M12 12h.01" />
			<svg:path class="handle" d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
			<svg:path class="curve" d="M22 13a18.15 18.15 0 0 1-20 0" />
			<svg:rect class="case" width="20" height="14" x="2" y="6" rx="2" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.briefcase-business-icon {
			transform-origin: top center;
			transform-box: fill-box;
		}

		.briefcase-business-icon.animate {
			animation: swing 0.8s ease-in-out;
		}

		@keyframes swing {
			0% {
				transform: rotate(0deg);
			}
			25% {
				transform: rotate(12deg);
			}
			55% {
				transform: rotate(-10deg);
			}
			85% {
				transform: rotate(3deg);
			}
			100% {
				transform: rotate(0deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'briefcase-business',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BriefcaseBusinessIcon {
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
