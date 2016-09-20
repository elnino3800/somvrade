import { Somvrade2Page } from './app.po';

describe('somvrade2 App', function() {
  let page: Somvrade2Page;

  beforeEach(() => {
    page = new Somvrade2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
