import RestUtilities from './RestUtilities';

import IGroup from '../interfaces/IGroup';
import IdsDTO from '../interfaces/IdsDTO';

let root: string; 

if (process.env.GROUPS_ROOT_URL) {
  root = process.env.GROUPS_ROOT_URL;
} else {
  throw new Error('Root URL env var for Groups api is not defined');
}

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

  static trashGroups(dto: IdsDTO): void {
    fetch(`${root}/trash`, {
      method: 'PUT',
      body: JSON.stringify(dto),
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  static async restore(id: number) : Promise<void> {
    return await RestUtilities.put(`${root}/restore/${id}`);
  }

  static async delete(id: number) : Promise<void> {
    return await RestUtilities.delete(`${root}/${id}`);
  }
  
  static async selectGroups(dto: IdsDTO): Promise<string> {
    
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

  static deleteGroupsInSelection(selectionId: string): void {
    fetch(`${root}/deleteGroupsInSelection/${selectionId}`, {
      method: 'DELETE',
    });
  }
  
  static deleteSelection(id: string): void {
    fetch(`${root}/selections/${id}`, {
      method: 'DELETE'
    });
  }
}
