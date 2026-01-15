import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-eclipse',
	template: `
		<svg
			class="eclipse-icon"
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
			<svg:defs>
				<clipPath id="clipSun" clipPathUnits="userSpaceOnUse">
					<svg:circle cx="12" cy="12" r="10" />
				</clipPath>
			</svg:defs>

			<svg:circle class="sun" cx="12" cy="12" r="10" />

			<svg:g clip-path="url(#clipSun)">
				<svg:path class="moon" d="M12 2a7 7 0 1 0 10 10" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.eclipse-icon {
			overflow: visible;
		}

		.sun {
			transform-origin: center;
			transition: transform 0.3s ease-in-out;
		}

		.moon {
			transform-origin: center;
			transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
			transform: translate(0, 0);
		}

		.eclipse-icon.animate .moon {
			transform: translate(3px, -3px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'eclipse',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EclipseIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
