import { Component, DOCUMENT, ElementRef, inject, input, model, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucideCircleX, lucideSearch } from '@ng-icons/lucide';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmInputImports } from '@spartan-ng/helm/input';

@Component({
	selector: 'docs-search',
	template: `
		<input class="peer ps-9 pe-28" #search [(ngModel)]="value" [placeholder]="placeholder()" hlmInput />
		<div
			class="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50"
		>
			<ng-icon hlm size="sm" name="lucideSearch" />
		</div>
		<div
			class="text-muted-foreground/80 absolute inset-y-0 end-0 flex items-center justify-center text-xs select-none peer-disabled:opacity-50"
		>
			@if (value().length > 0) {
				{{ status() }}
				<button
					class="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex h-full w-9 items-center justify-center rounded-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
					(click)="handleClear()"
				>
					<ng-icon hlm size="sm" name="lucideCircleX" />
				</button>
			} @else {
				<div
					class="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2"
				>
					<kbd
						class="text-muted-foreground/70 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium whitespace-nowrap"
					>
						@if (isMac) {
							⌘
						} @else {
							Ctrl
						}
						K
					</kbd>
				</div>
			}
		</div>
	`,
	host: {
		class: 'sticky top-4 z-10 max-w-sm',
		'(document:keydown)': 'onKeyDown($event)',
	},
	providers: [provideIcons({ lucideCircleX, lucideSearch })],
	imports: [FormsModule, HlmIconImports, HlmInputImports],
})
export class Search {
	readonly #platform = inject(DOCUMENT).defaultView?.navigator?.platform ?? '';

	value = model('');

	status = input('');
	placeholder = input('');

	search = viewChild.required<ElementRef>('search');

	protected readonly isMac = /Mac|iPod|iPhone|iPad/.test(this.#platform);

	onKeyDown(event: KeyboardEvent) {
		const isKKey = event.key.toLowerCase() === 'k';
		const isModifierPressed = this.isMac ? event.metaKey : event.ctrlKey;

		if (isKKey && isModifierPressed) {
			event.preventDefault();
			this.search().nativeElement.focus();
		}
	}

	handleClear() {
		this.value.set('');
		this.search().nativeElement.focus();
	}
}
