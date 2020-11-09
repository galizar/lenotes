import IGroup from '../interfaces/IGroup';
import { Props, State } from '../components/App';

export type IdGroupMap = Record<number, IGroup>;

export default class LocalGroupService {

  client: React.Component<Props, State>;
  groups: IdGroupMap;

  constructor(client: React.Component<Props, State>) {
    this.client = client;
    this.groups = client.state.groups;
  }

  getAll = (): IdGroupMap => {
    return this.groups;
  }

  get = (id: number): IGroup => {
    return this.groups[id];
  }

  create = (name: string): IGroup => {
    const groups = {...this.client.state.groups};
    const newGroupId = this.client.state.nextGroupId;

    const newGroup = {
      id: newGroupId,
      name,
      isTrashed: false
    }

    groups[newGroupId] = newGroup;

    this.client.setState({ 
      nextGroupId: newGroupId + 1,
      groups
    });

    return newGroup;
  }

  rename = (id: number, newName: string): void => {
    const group = this.get(id);
    const groups = {...this.groups};

    groups[id] = {
      ...group,
      name: newName
    };

    this.client.setState({ groups });
  }

  trash = (id: number): void => {
    const group = this.get(id);
    const groups = {...this.groups};

    groups[id] = {
      ...group,
      isTrashed: true
    };

    let groupOnDisplayId = this.client.state.groupOnDisplayId;
    if (groupOnDisplayId === id) groupOnDisplayId = -1;

    this.client.setState({ 
      groups,
      groupOnDisplayId
    });
  }

  trashGroups = (ids: number[]): void => {
    const groups = {...this.groups};
    let groupOnDisplayId = this.client.state.groupOnDisplayId;

    for (const id of ids) {
      const group = this.get(id);

      groups[id] = {
        ...group,
        isTrashed: true,
      }

      if (groupOnDisplayId === id) {
        groupOnDisplayId = -1;
      }
    }

    this.client.setState({ groups });
  }

  restore = (id: number): void => {
    const group = this.get(id);
    const groups = {...this.groups};

    groups[id] = {
      ...group,
      isTrashed: false
    };
    
    this.client.setState({ 
      groups,
      groupOnDisplayId: -1,
      noteOnDisplay: undefined
    });
  }

  delete = (id: number): void => {
    const groups = {...this.groups};
    delete groups[id];

    let groupOnDisplayId = this.client.state.groupOnDisplayId;
    if (groupOnDisplayId === id) groupOnDisplayId = -1;

    this.client.setState({ 
      groups,
      groupOnDisplayId
    });
  }

  deleteGroups = (ids: number[]): void => {
    const groups = {...this.groups};
    let groupOnDisplayId = this.client.state.groupOnDisplayId;

    for (const id of ids) {
      delete groups[id];

      if (groupOnDisplayId === id) {
        groupOnDisplayId = -1;
      }
    }

    this.client.setState({ 
      groupOnDisplayId,
      groups 
    });
  }
}