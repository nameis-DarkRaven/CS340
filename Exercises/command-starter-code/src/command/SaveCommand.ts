import { ICommand } from "./ICommand";
import { IDocument } from "../document/IDocument";

export class SaveCommand implements ICommand {
  private document: IDocument;
  private filename: string;

  constructor(document: IDocument, filename: string) {
    this.document = document;
    this.filename = filename;
  }

  execute(): void {
    this.document.save(this.filename);
  }

  undo(): void {
    // No undo for save
  }
}
