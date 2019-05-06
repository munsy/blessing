export class Addon {
  	constructor(
  	public icon: string,
  	public addonName: string,
  	public needsUpdate: boolean,
  	public recentlyUpdated: boolean,
  	public latestVersion: string,
  	public gameVersion: string,
  	public author: string) { }
}
