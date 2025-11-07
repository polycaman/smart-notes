import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notes: Note[] = [];

  async loadNotes(): Promise<Note[]> {
    if (window.electronAPI) {
      this.notes = await window.electronAPI.loadNotes();
      // Convert date strings back to Date objects
      this.notes = this.notes.map(note => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt)
      }));
    }
    return this.notes;
  }

  async saveNote(note: Note): Promise<void> {
    if (window.electronAPI) {
      await window.electronAPI.saveNote(note);
    }
    
    const index = this.notes.findIndex(n => n.id === note.id);
    if (index >= 0) {
      this.notes[index] = note;
    } else {
      this.notes.push(note);
    }
  }

  async deleteNote(noteId: string): Promise<void> {
    if (window.electronAPI) {
      await window.electronAPI.deleteNote(noteId);
    }
    
    this.notes = this.notes.filter(n => n.id !== noteId);
  }

  getNotes(): Note[] {
    return this.notes;
  }

  createNote(): Note {
    return {
      id: this.generateId(),
      title: 'New Note',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}
