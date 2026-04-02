import { ICommand } from "./ICommand";
import { IDocument } from "../document/IDocument";

export class ClearCommand implements ICommand {
  private document: IDocument;
  private backup: string = "";

  constructor(document: IDocument) {
    this.document = document;
  }

  execute(): void {
    this.backup = this.document.getContents();
    this.document.clear();
  }

  undo(): void {
    this.document.insert(0, this.backup);
  }
}
