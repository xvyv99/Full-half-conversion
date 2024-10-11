import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
  			id: 'full-half',
  			name: 'Full->half',
  			editorCallback: (editor: Editor, view: MarkdownView) => {
				const full_half = new Map<string, string>([
    				['，',','],
    				['。','.'],
    				['：',':'],
					['；',';'],
					['！','!'],
					['？','?'],
					['“','\"'],
					['、',','],
				]);
    			// const sel = editor.getSelection()
				const line_num = editor.lineCount(); 
				// new Notice(line_num);
				for(let i=0;i<line_num;i++) {
					let line = editor.getLine(i);
					let replace_line = line;
					full_half.forEach((value, key) => {
    					replace_line = replace_line.replace(key, value);
					});	
					// let replace_line = line.replace('，', ',')
					editor.setLine(i, replace_line);
				}
				new Notice("Successfully!");
  		},
		});
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
