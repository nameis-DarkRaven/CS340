import { ICommand } from "./ICommand";
import { IDocument } from "../document/IDocument";

export class InsertCommand implements ICommand {
  private document: IDocument;
  private pos: number;
  private text: string;

  constructor(document: IDocument, pos: number, text: string) {
    this.document = document;
    this.pos = pos;
    this.text = text;
  }

  execute(): void {
    this.document.insert(this.pos, this.text);
  }

  undo(): void {
    this.document.delete(this.pos, this.text.length);
  }
}
