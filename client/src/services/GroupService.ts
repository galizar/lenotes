import RestUtilities from './RestUtilities';

export interface IGroup {
  id: number,
  name: string,
  isTrashed: boolean,
}

let root = 'https://localhost:5001/api/Groups';

export default class GroupService { 
  static async create(name: string) : Promise<IGroup> {
    return await RestUtilities.post<IGroup>(`${root}/${name}`);
  }

  static async getAll() : Promise<Array<IGroup>> {
    return await RestUtilities.get<Array<IGroup>>(`${root}`);
  }

  static async get(id: number) : Promise<IGroup> {
    return await RestUtilities.get<IGroup>(`${root}/${id}`);
  }

  static async rename(id: number, newName: string)
  : Promise<void> 
  {
    return await RestUtilities.put(`${root}/rename/${id}/${newName}`);
  }

  static async trash(id: number) : Promise<void> {
    return await RestUtilities.put(`${root}/trash/${id}`);
  }

  static async restore(id: number) : Promise<void> {
    return await RestUtilities.put(`${root}/restore/${id}`);
  }

  static async delete(id: number) : Promise<void> {
    return await RestUtilities.delete(`${root}/${id}`);
  }
}