import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { SpeechService } from '../../services/speech.service';
import { AiService } from '../../services/ai.service';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  selectedNote: Note | null = null;
  fixerPrompt: string = '';
  fixerResult: string = '';
  isProcessing = false;
  isListeningNote = false;
  isListeningPrompt = false;
  errorMessage = '';

  constructor(
    private notesService: NotesService,
    private speechService: SpeechService,
    private aiService: AiService
  ) {}

  async ngOnInit() {
    await this.loadNotes();
  }

  async loadNotes() {
    this.notes = await this.notesService.loadNotes();
    if (this.notes.length > 0 && !this.selectedNote) {
      this.selectedNote = this.notes[0];
    }
  }

  createNewNote() {
    const newNote = this.notesService.createNote();
    this.notes.unshift(newNote);
    this.selectedNote = newNote;
  }

  selectNote(note: Note) {
    this.selectedNote = note;
    this.fixerPrompt = '';
    this.fixerResult = '';
    this.errorMessage = '';
  }

  async saveCurrentNote() {
    if (this.selectedNote) {
      this.selectedNote.updatedAt = new Date();
      await this.notesService.saveNote(this.selectedNote);
    }
  }

  async deleteNote(note: Note) {
    if (confirm('Are you sure you want to delete this note?')) {
      await this.notesService.deleteNote(note.id);
      this.notes = this.notes.filter(n => n.id !== note.id);
      if (this.selectedNote?.id === note.id) {
        this.selectedNote = this.notes.length > 0 ? this.notes[0] : null;
      }
    }
  }

  // Text-to-speech for note content
  startListeningNote() {
    if (!this.speechService.isSpeechRecognitionSupported()) {
      this.errorMessage = 'Speech recognition is not supported in your browser';
      return;
    }

    this.isListeningNote = true;
    this.errorMessage = '';

    this.speechService.startListening(
      (text) => {
        if (this.selectedNote) {
          this.selectedNote.content += (this.selectedNote.content ? ' ' : '') + text;
          this.saveCurrentNote();
        }
        this.isListeningNote = false;
      },
      (error) => {
        this.errorMessage = `Speech recognition error: ${error}`;
        this.isListeningNote = false;
      }
    );
  }

  stopListeningNote() {
    this.speechService.stopListening();
    this.isListeningNote = false;
  }

  readNoteAloud() {
    if (this.selectedNote?.content) {
      this.speechService.speak(this.selectedNote.content);
    }
  }

  stopReading() {
    this.speechService.stopSpeaking();
  }

  // Text-to-speech for fixer prompt
  startListeningPrompt() {
    if (!this.speechService.isSpeechRecognitionSupported()) {
      this.errorMessage = 'Speech recognition is not supported in your browser';
      return;
    }

    this.isListeningPrompt = true;
    this.errorMessage = '';

    this.speechService.startListening(
      (text) => {
        this.fixerPrompt += (this.fixerPrompt ? ' ' : '') + text;
        this.isListeningPrompt = false;
      },
      (error) => {
        this.errorMessage = `Speech recognition error: ${error}`;
        this.isListeningPrompt = false;
      }
    );
  }

  stopListeningPrompt() {
    this.speechService.stopListening();
    this.isListeningPrompt = false;
  }

  async fixText() {
    if (!this.fixerPrompt.trim() || !this.selectedNote?.content) {
      this.errorMessage = 'Please enter a prompt and ensure note has content';
      return;
    }

    this.isProcessing = true;
    this.errorMessage = '';
    this.fixerResult = '';

    try {
      this.fixerResult = await this.aiService.fixText(this.fixerPrompt, this.selectedNote.content);
    } catch (error: any) {
      this.errorMessage = error.message || 'Failed to process text';
    } finally {
      this.isProcessing = false;
    }
  }

  applyFixedText() {
    if (this.selectedNote && this.fixerResult) {
      this.selectedNote.content = this.fixerResult;
      this.saveCurrentNote();
      this.fixerResult = '';
      this.fixerPrompt = '';
    }
  }

  clearFixer() {
    this.fixerPrompt = '';
    this.fixerResult = '';
    this.errorMessage = '';
  }
}
