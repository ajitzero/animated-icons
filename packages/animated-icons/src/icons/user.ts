import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-user',
	template: `
		<svg
			class="user-icon"
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
			<svg:path class="user-path" d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
			<svg:circle class="user-circle" cx="12" cy="7" r="4" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}

		.user-path,
		.user-circle {
			transition: transform 0.6s ease-in-out;
		}

		.user-icon.animate .user-path {
			animation: pathBounce 0.6s ease-in-out;
		}

		.user-icon.animate .user-circle {
			animation: circleBounce 0.6s ease-in-out;
		}

		@keyframes pathBounce {
			0% {
				transform: translateY(0);
			}
			33% {
				transform: translateY(2px);
			}
			66% {
				transform: translateY(-2px);
			}
			100% {
				transform: translateY(0);
			}
		}

		@keyframes circleBounce {
			0% {
				transform: translateY(0);
			}
			33% {
				transform: translateY(4px);
			}
			66% {
				transform: translateY(-2px);
			}
			100% {
				transform: translateY(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'user',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserIcon {
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
