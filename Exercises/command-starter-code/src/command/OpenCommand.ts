import { ICommand } from "./ICommand";
import { IDocument } from "../document/IDocument";

export class OpenCommand implements ICommand {
  private document: IDocument;
  private filename: string;
  private backup: string = "";

  constructor(document: IDocument, filename: string) {
    this.document = document;
    this.filename = filename;
  }

  execute(): void {
    this.backup = this.document.getContents();
    this.document.open(this.filename);
  }

  undo(): void {
    this.document.clear();
    this.document.insert(0, this.backup);
  }
}
