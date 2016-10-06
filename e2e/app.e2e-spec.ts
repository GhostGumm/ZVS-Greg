import { NewMaterial2Page } from './app.po';

describe('new-material-2 App', function() {
  let page: NewMaterial2Page;

  beforeEach(() => {
    page = new NewMaterial2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
