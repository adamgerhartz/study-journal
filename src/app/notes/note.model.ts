export class Note {
  public id: string
  public uri: string;
  public title: string;
  public content: string;
  public context: string;
  public tags: string[];
  public reference: string;
  public lastUpdated: Date;
  public created: Date;

  constructor(uri: string, title: string, content: string, context: string, tags: string[], reference: string, lastUpdated: Date, created: Date) {
    this.uri = uri;
    this.title = title;
    this.content = content;
    this.context = context;
    this.tags = tags;
    this.reference = reference;
    this.lastUpdated = lastUpdated;
    this.created = created;
  }
}
