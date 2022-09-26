import { Slot } from '@blocksuite/store';
import { ClipboardAction } from './types';

export class ClipEventDispatch {
  readonly slots = {
    [ClipboardAction.copy]: new Slot<ClipboardEvent>(),
    [ClipboardAction.cut]: new Slot<ClipboardEvent>(),
    [ClipboardAction.paste]: new Slot<ClipboardEvent>(),
  };

  constructor(clipboardTarget: HTMLElement) {
    this._copyHandler = this._copyHandler.bind(this);
    this._cutHandler = this._cutHandler.bind(this);
    this._pasteHandler = this._pasteHandler.bind(this);
    this.initialClipboardTargetEvent(clipboardTarget);
  }

  initialClipboardTargetEvent(clipboardTarget: HTMLElement) {
    if (!clipboardTarget) {
      return;
    }

    this.disposeClipboardTargetEvent(clipboardTarget);

    clipboardTarget.addEventListener(ClipboardAction.copy, this._copyHandler);
    clipboardTarget.addEventListener(ClipboardAction.cut, this._cutHandler);
    clipboardTarget.addEventListener(ClipboardAction.paste, this._pasteHandler);
  }

  disposeClipboardTargetEvent(clipboardTarget: HTMLElement) {
    if (!clipboardTarget) {
      return;
    }

    clipboardTarget.removeEventListener(
      ClipboardAction.copy,
      this._copyHandler
    );
    clipboardTarget.removeEventListener(ClipboardAction.cut, this._cutHandler);
    clipboardTarget.removeEventListener(
      ClipboardAction.paste,
      this._pasteHandler
    );
  }

  private _copyHandler(e: ClipboardEvent) {
    this.slots.copy.emit(e);
  }

  private _cutHandler(e: ClipboardEvent) {
    this.slots.cut.emit(e);
  }
  private _pasteHandler(e: ClipboardEvent) {
    this.slots.paste.emit(e);
  }

  dispose(clipboardTarget: HTMLElement) {
    this.slots.copy.dispose();
    this.slots.cut.dispose();
    this.slots.paste.dispose();
    this.disposeClipboardTargetEvent(clipboardTarget);
  }
}
