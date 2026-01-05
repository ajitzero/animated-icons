import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-briefcase-medical',
	template: `
		<svg
			class="briefcase-medical-icon"
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
			<svg:path d="M12 11v4" />
			<svg:path d="M14 13h-4" />
			<svg:path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
			<svg:path d="M18 6v14" />
			<svg:path d="M6 6v14" />
			<svg:rect width="20" height="14" x="2" y="6" rx="2" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.briefcase-medical-icon {
			transform-origin: top center;
			transform-box: fill-box;
		}

		.briefcase-medical-icon.animate {
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
		'aria-label': 'briefcase-medical',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BriefcaseMedicalIcon {
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
