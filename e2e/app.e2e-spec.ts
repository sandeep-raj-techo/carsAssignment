import { CarsAppPage } from './app.po';

describe('cars-app App', function() {
  let page: CarsAppPage;

  beforeEach(() => {
    page = new CarsAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
