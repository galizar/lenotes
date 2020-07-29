import RestUtilities from './RestUtilities';

export interface INote {
  id: number,
  name: string,
  content: string,
  groupId: number,
  isTrashed: boolean 
}

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

  static async getNotesOfGroup(groupId?: number) 
  : Promise<Array<INote>> {

    let notes = await this.getAll();

    if (!groupId) return notes;

    return notes.filter(note => note.groupId == groupId);
  }

  static rename(id: number, newName: string) 
  : Promise<void> {
    return RestUtilities.put(`${root}/rename/${id}/${newName}`);
  }

  static move(id: number, toGroupId: number) 
  : Promise<void> {
    return RestUtilities.put(`${root}/move/${id}/${toGroupId}`);
  }

  static setContent(id: number, content: string) 
  : Promise<void> {
    return RestUtilities.put(`${root}/setContent/${id}/${content}`);
  }

  static trash(id: number) : Promise<void> {
    return RestUtilities.put(`${root}/trash/${id}`);
  }

  static restore(id: number) : Promise<void> {
    return RestUtilities.put(`${root}/restore/${id}`);
  }

  static delete(id: number) 
  : Promise<void> {
    return RestUtilities.delete(`${root}/${id}`);
  }
}