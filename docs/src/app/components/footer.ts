import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'docs-footer',
	template: `
		<a class="group hover:bg-muted-foreground/10 border border-transparent active:border-muted-foreground/20 transition-transform active:translate-y-0.5 focus:bg-muted-foreground/10 rounded-md py-2 px-3 -my-2 -mx-3" target="_blank" href="https://github.com/ajitzero">
			<span class="text-muted-foreground">Built with <span class="group-hover:hidden group-focus:hidden">🤍</span><span class="hidden group-hover:inline group-focus:inline">❤️</span> by</span>
			<span class="px-1 group-hover:underline group-focus:underline">@ajitzero</span>
		</a>
	`,
	host: {
		class: 'flex justify-center my-16 items-center max-w-2xl mx-auto',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {}
