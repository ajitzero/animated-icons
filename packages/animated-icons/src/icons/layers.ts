import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-layers',
	template: `
		<svg
			class="layers-icon"
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
			<svg:path
				d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"
			/>
			<svg:path class="layer layer-bottom" d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
			<svg:path class="layer layer-middle" d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.layers-icon {
			overflow: visible;
		}

		.layer {
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.layer-bottom.animate {
			transform: translateY(-9px);
		}

		.layer-middle.animate {
			transform: translateY(-5px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'layers',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayersIcon {
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
