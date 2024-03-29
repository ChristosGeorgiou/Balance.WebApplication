
export class RepositoryHelpers {

  static mapEntity (entity) {
    // console.log('map', entity.id)
    return {
      ...entity.c,
      id: entity.id,
      _date: entity.d,
      _type: entity.t,
      _group: entity.g,
      _mark: entity.m,
      _tags: entity.s
    }
  }
}
