import RestUtilities from './RestUtilities';

import INote from '../interfaces/INote';
import IdsDTO from '../interfaces/IdsDTO';
import NoteContentDTO from '../interfaces/NoteContentDTO';

let root = 'https://localhost:5001/api/Notes';

export default class NoteService {
  static async getAll() : Promise<Array<INote>> {
    return await RestUtilities.get<Array<INote>>(root);
  }

  static async create(name: string, groupId: number) {
    return await RestUtilities.post<INote>(`${root}/${name}/${groupId}`);
  }

  static async get(id: number) : Promise<INote> {
    return await RestUtilities.get<INote>(`${root}/${id}`);
  }

  static rename(id: number, newName: string) 
  : Promise<void> {
    return RestUtilities.put(`${root}/rename/${id}/${newName}`);
  }

  static move(id: number, toGroupId: number) 
  : Promise<void> {
    return RestUtilities.put(`${root}/move/${id}/${toGroupId}`);
  }

  static setContent(dto: NoteContentDTO): void {
    fetch(`${root}/setContent`, {
      method: 'PUT',
      body: JSON.stringify(dto),
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }

  static trash(id: number): Promise<void> {
    return RestUtilities.put(`${root}/trash/${id}`);
  }

  static trashNotes(dto: IdsDTO): void {
    fetch(`${root}/trash`, {
      method: 'PUT',
      body: JSON.stringify(dto),
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  static trashInGroup(groupId: number) : Promise<void> {
    return RestUtilities.put(`${root}/trashInGroup/${groupId}`);
  }

  static restore(id: number): Promise<void> {
    return RestUtilities.put(`${root}/restore/${id}`);
  }

  static restoreInGroup(groupId: number) : Promise<void> {
    return RestUtilities.put(`${root}/restoreInGroup/${groupId}`);
  }

  static delete(id: number) 
  : Promise<void> {
    return RestUtilities.delete(`${root}/${id}`);
  }

  static deleteInGroup(groupId: number) : Promise<void> {
    return RestUtilities.delete(`${root}/deleteInGroup/${groupId}`);
  }
  
  static async selectNotes(dto: IdsDTO): Promise<string> {
      
    const res = await fetch(`${root}/selections`, {
      method: 'POST',
      body: JSON.stringify(dto),
      headers: {
        'Content-Type': 'application/json',
      }
    }).catch(err => {
      console.log(err);
    });
    
    const body = res ? await res.json() : {};
    return body.id;
  }
  
  static deleteNotesInSelection(selectionId: string): void {
    fetch(`${root}/deleteNotesInSelection/${selectionId}`, {
      method: 'DELETE'
    });
  }
  
  static deleteSelection(selectionId: string): void {
    fetch(`${root}/selections/${selectionId}`, {
      method: 'DELETE'
    });
  }
}