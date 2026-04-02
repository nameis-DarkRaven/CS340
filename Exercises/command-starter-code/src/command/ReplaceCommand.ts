import { ICommand } from "./ICommand";
import { IDocument } from "../document/IDocument";

export class ReplaceCommand implements ICommand {
  private document: IDocument;
  private pos: number;
  private count: number;
  private newText: string;
  private oldText: string = "";

  constructor(
    document: IDocument,
    pos: number,
    count: number,
    newText: string,
  ) {
    this.document = document;
    this.pos = pos;
    this.count = count;
    this.newText = newText;
  }

  execute(): void {
    this.oldText = this.document.delete(this.pos, this.count);
    this.document.insert(this.pos, this.newText);
  }

  undo(): void {
    this.document.delete(this.pos, this.newText.length);
    this.document.insert(this.pos, this.oldText);
  }
}
