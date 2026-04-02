import { ICommand } from "./ICommand";

export class RedoUndoManager {
  private undoStack: ICommand[] = [];
  private redoStack: ICommand[] = [];

  executeCommand(command: ICommand): void {
    command.execute();
    this.undoStack.push(command);
    this.redoStack = [];
  }

  undo(): void {
    const command = this.undoStack.pop();
    if (command) {
      command.undo();
      this.redoStack.push(command);
    }
  }

  redo(): void {
    const command = this.redoStack.pop();
    if (command) {
      command.execute();
      this.undoStack.push(command);
    }
  }
}
