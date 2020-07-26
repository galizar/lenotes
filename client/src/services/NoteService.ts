import RestUtilities from './RestUtilities';

export interface INote {
  name: string,
  content: string,
  groupId?: number 
}

let root = '/Notes';

export default class NoteService {
  getAll() {
    return RestUtilities.get<Array<INote>>(root);
  }

  get(id: number) {
    return RestUtilities.get<INote>(`${root}/${id}`);
  }

  rename(id: number, newName: string) {
    return RestUtilities.put(`${root}/rename`, {id, newName});
  }

  move(id: number, toGroupId: number) {
    return RestUtilities.put(`${root}/move`, {id, toGroupId});
  }

}