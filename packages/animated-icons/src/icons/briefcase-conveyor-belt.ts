import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-briefcase-conveyor-belt',
	template: `
		<svg
			class="briefcase-conveyor-belt-icon"
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
			<svg:g class="briefcase-group bg-red-500">
				<svg:path class="briefcase-body" d="M8 16V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12" />
				<svg:rect class="briefcase-case" x="4" y="6" width="16" height="10" rx="2" />
			</svg:g>
			<svg:path class="belt-line" d="M21 20H3" />
			<svg:path d="M6 20v2" />
			<svg:path d="M10 20v2" />
			<svg:path d="M14 20v2" />
			<svg:path d="M18 20v2" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.briefcase-group {
			transform-origin: top center;
			transform-box: fill-box;
		}

		.briefcase-conveyor-belt-icon.animate .briefcase-group {
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
		'aria-label': 'briefcase-conveyor-belt',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BriefcaseConveyorBeltIcon {
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
