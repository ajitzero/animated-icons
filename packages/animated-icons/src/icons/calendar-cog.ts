import type { BooleanInput } from '@angular/cdk/coercion';
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
	selector: 'i-calendar-cog',
	template: `
		<svg
			class="calendar-cog-icon"
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
			<svg:path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
			<svg:path d="M16 2v4" />
			<svg:path d="M3 10h18" />
			<svg:path d="M8 2v4" />
			<svg:g class="cog-group" [class.animate]="isAnimating()">
				<svg:path d="m15.2 16.9-.9-.4" />
				<svg:path d="m15.2 19.1-.9.4" />
				<svg:path d="m16.9 15.2-.4-.9" />
				<svg:path d="m16.9 20.8-.4.9" />
				<svg:path d="m19.5 14.3-.4.9" />
				<svg:path d="m19.5 21.7-.4-.9" />
				<svg:path d="m21.7 16.5-.9.4" />
				<svg:path d="m21.7 19.5-.9-.4" />
				<svg:circle cx="18" cy="18" r="3" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.calendar-cog-icon {
			overflow: visible;
		}

		.cog-group {
			transform-origin: 18px 18px;
			transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.cog-group.animate {
			transform: rotate(180deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'calendar-cog',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarCogIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseLeave() {
		if (!this.animate()) this.isAnimating.set(false);
	}
}
