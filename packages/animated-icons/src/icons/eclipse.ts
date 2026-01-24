import type { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	linkedSignal,
	numberAttribute,
} from '@angular/core';
import { ANIMATED_ICONS_CONFIG } from '../tokens/provider';

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
				<svg:clipPath id="clipSun" clipPathUnits="userSpaceOnUse">
					<svg:circle cx="12" cy="12" r="10" />
				</svg:clipPath>
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
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EclipseIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input<number, NumberInput>(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input<number, NumberInput>(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseLeave() {
		if (!this.animate()) this.isAnimating.set(false);
	}
}
