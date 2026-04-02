import { ICommand } from "./ICommand";
import { IDocument } from "../document/IDocument";

export class DeleteCommand implements ICommand {
  private document: IDocument;
  private pos: number;
  private count: number;
  private deletedText: string = "";

  constructor(document: IDocument, pos: number, count: number) {
    this.document = document;
    this.pos = pos;
    this.count = count;
  }

  execute(): void {
    this.deletedText = this.document.delete(this.pos, this.count);
  }

  undo(): void {
    this.document.insert(this.pos, this.deletedText);
  }
}
