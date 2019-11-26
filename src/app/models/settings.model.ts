export class CureSettings {
	public DeveloperMode: boolean;
	public FFXIVFolder: string;

	constructor()
	constructor(ffxivFolder?: string) {
		if(ffxivFolder) {
		  this.FFXIVFolder = ffxivFolder;
		} else {
		  this.FFXIVFolder = "C:\\Program Files (x86)\\SquareEnix\\FINAL FANTASY XIV - A Realm Reborn\\game";
		}
	}
}