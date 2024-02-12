export class Filters {
	constructor(public readonly value: string) {}

	isEmpty(): boolean {
		return this.value.length === 0;
	}
}
