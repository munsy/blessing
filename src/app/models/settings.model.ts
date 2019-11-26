export class CureSettings {
	public DeveloperMode: boolean;
	public FFXIVFolder: string;

	constructor()
	constructor(ffxivFolder?: string, dev?: boolean) {
		if(ffxivFolder) {
		  this.FFXIVFolder = ffxivFolder;
		} else {
		  this.FFXIVFolder = "C:\\Program Files (x86)\\SquareEnix\\FINAL FANTASY XIV - A Realm Reborn\\game";
		}
		if(dev) {
			this.DeveloperMode = dev;
		} else {
			this.DeveloperMode = false;
		}
	}
}