export interface IPage {
  id: number;
  title: string;
  etag?: string | undefined;
  url: string;
  parentPageId?: number;
}
