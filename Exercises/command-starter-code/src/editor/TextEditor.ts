import { IDocument } from "../document/IDocument";
import * as readline from "readline";
import { UserInputReader } from "./UserInputReader";

import { RedoUndoManager } from "../command/RedoUndoManager";
import { InsertCommand } from "../command/InsertCommand";
import { DeleteCommand } from "../command/DeleteCommand";
import { ReplaceCommand } from "../command/ReplaceCommand";
import { SaveCommand } from "../command/SaveCommand";
import { OpenCommand } from "../command/OpenCommand";
import { ClearCommand } from "../command/ClearCommand";

export class TextEditor {
  private _document: IDocument;
  private consoleReader: readline.Interface;
  private manager: RedoUndoManager;

  constructor(document: IDocument) {
    this._document = document;
    this.manager = new RedoUndoManager();

    this.consoleReader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  run(): void {
    this.consoleReader.question(this.getOptions(), (input) => {
      const option = UserInputReader.validateNumberInput(input);

      switch (option) {
        case -1:
          console.log("\x1b[36m%s\x1b[0m", "User option returned -1.");
          break;

        case 1:
          this.insert();
          break;

        case 2:
          this.delete();
          break;

        case 3:
          this.replace();
          break;

        case 4:
          console.log(this._document.getContents());
          break;

        case 5:
          this.save();
          break;

        case 6:
          this.open();
          break;

        case 7:
          this.manager.executeCommand(new ClearCommand(this._document));
          break;

        case 8:
          this.manager.undo();
          break;

        case 9:
          this.manager.redo();
          break;

        case 10:
          process.exit(1);
      }

      console.log();
      this.run();
    });
  }

  private getOptions(): string {
    return `
SELECT AN OPTION (1 - 10):

1. Insert a string at a specified index in the document
2. Delete a sequence of characters at a specified index
3. Replace a sequence of characters at a specified index with a new string
4. Display the current contents of the document
5. Save the document to a file
6. Open a document from a file
7. Start a new, empty document
8. Undo
9. Redo
10. Quit

Your selection: `;
  }

  private insert(): void {
    const index = UserInputReader.validateNumberInput(
      UserInputReader.getUserInput("Start index: "),
    );

    const text = UserInputReader.getUserInput("Sequence to insert: ");

    this.manager.executeCommand(new InsertCommand(this._document, index, text));
  }

  private delete(): void {
    const index = UserInputReader.validateNumberInput(
      UserInputReader.getUserInput("Start index: "),
    );

    const count = UserInputReader.validateNumberInput(
      UserInputReader.getUserInput("Number of characters to delete: "),
    );

    this.manager.executeCommand(
      new DeleteCommand(this._document, index, count),
    );
  }

  private replace(): void {
    const index = UserInputReader.validateNumberInput(
      UserInputReader.getUserInput("Start index: "),
    );

    const count = UserInputReader.validateNumberInput(
      UserInputReader.getUserInput("Number of characters to replace: "),
    );

    const text = UserInputReader.getUserInput("Replacement string: ");

    this.manager.executeCommand(
      new ReplaceCommand(this._document, index, count, text),
    );
  }

  private save(): void {
    const filename = UserInputReader.getUserInput("Name of file: ");

    if (this._document.fileExists(filename)) {
      console.log("Overwriting existing file.");
    } else {
      console.log("Writing to new file.");
    }

    new SaveCommand(this._document, filename).execute();
  }

  private open(): void {
    const filename = UserInputReader.getUserInput("Name of file to open: ");

    this.manager.executeCommand(new OpenCommand(this._document, filename));
  }
}
