import { NgBloggerPage } from './app.po';

describe('ng-blogger App', () => {
  let page: NgBloggerPage;

  beforeEach(() => {
    page = new NgBloggerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
