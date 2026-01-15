import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-airplay-icon',
	template: `
		<svg
			class="airplay-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<svg:path class="airplay-path1" d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
			<svg:path class="airplay-path2" [class.hovered]="isAnimating()" d="m12 15 5 6H7Z" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.airplay-icon {
			overflow: hidden;
		}

		.airplay-path2 {
			transform: translateY(0);
			transition: transform 0.4s cubic-bezier(0, 0, 0.3, 1.6);
		}

		.airplay-path2.hovered {
			transform: translateY(2px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'airplay',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AirplayIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
