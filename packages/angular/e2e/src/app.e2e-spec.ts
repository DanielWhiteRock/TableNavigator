import { browser, element, by, ElementFinder, ElementArrayFinder } from 'protractor';

const expectedH1 = 'Tour of Tables';
const expectedTitle = `${expectedH1}`;
const targetHero = { id: 15, name: 'Magneta' };
const targetHeroDashboardIndex = 2;
const nameSuffix = 'X';
const newHeroName = targetHero.name + nameSuffix;

class Hero {
  constructor(public id: number, public name: string) {}

  // Factory methods

  // Hero from string formatted as '<id> <name>'.
  static fromString(s: string): Hero {
    return new Hero(
      +s.substring(0, s.indexOf(' ')),
      s.slice(s.indexOf(' ') + 1),
    );
  }

  // Hero from hero list <li> element.
  static async fromLi(li: ElementFinder): Promise<Hero> {
    const stringsFromA = await li.all(by.css('a')).getText();
    const strings = stringsFromA[0].split(' ');
    return { id: +strings[0], name: strings[1] };
  }

  // Hero id and name from the given detail element.
  static async fromDetail(detail: ElementFinder): Promise<Hero> {
    // Get hero id from the first <div>
    const id = await detail.all(by.css('div')).first().getText();
    // Get name from the h2
    const name = await detail.element(by.css('h2')).getText();
    return {
      id: +id.slice(id.indexOf(' ') + 1),
      name: name.substring(0, name.lastIndexOf(' '))
    };
  }
}

describe('Tutorial part 6', () => {

  beforeAll(() => browser.get(''));

  function getPageElts() {
    const navElts = element.all(by.css('app-root nav a'));

    return {
      navElts,

      appDashboardHref: navElts.get(0),
      appDashboard: element(by.css('app-root app-dashboard')),
      topTables: element.all(by.css('app-root app-dashboard > div a')),

      appTablesHref: navElts.get(1),
      appTables: element(by.css('app-root app-files')),
      allTables: element.all(by.css('app-root app-files li')),
      selectedHeroSubview: element(by.css('app-root app-files > div:last-child')),

      heroDetail: element(by.css('app-root app-table-detail > div')),

      searchBox: element(by.css('#search-box')),
      searchResults: element.all(by.css('.search-result li'))
    };
  }

  describe('Initial page', () => {

    it(`has title '${expectedTitle}'`, async () => {
      expect(await browser.getTitle()).toEqual(expectedTitle);
    });

    it(`has h1 '${expectedH1}'`, async () => {
      await expectHeading(1, expectedH1);
    });

    const expectedViewNames = ['Dashboard', 'Tables'];
    it(`has views ${expectedViewNames}`, async () => {
      const viewNames = await getPageElts().navElts.map(el => el!.getText());
      expect(viewNames).toEqual(expectedViewNames);
    });

    it('has dashboard as the active view', async () => {
      const page = getPageElts();
      expect(await page.appDashboard.isPresent()).toBeTruthy();
    });

  });

  describe('Dashboard tests', () => {

    beforeAll(() => browser.get(''));

    it('has top Tables', async () => {
      const page = getPageElts();
      expect(await page.topTables.count()).toEqual(4);
    });

    it(`selects and routes to ${targetHero.name} details`, dashboardSelectTargetHero);

    it(`updates hero name (${newHeroName}) in details view`, updateHeroNameInDetailView);

    it(`cancels and shows ${targetHero.name} in Dashboard`, async () => {
      await element(by.buttonText('go back')).click();
      await browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6

      const targetHeroElt = getPageElts().topTables.get(targetHeroDashboardIndex);
      expect(await targetHeroElt.getText()).toEqual(targetHero.name);
    });

    it(`selects and routes to ${targetHero.name} details`, dashboardSelectTargetHero);

    it(`updates hero name (${newHeroName}) in details view`, updateHeroNameInDetailView);

    it(`saves and shows ${newHeroName} in Dashboard`, async () => {
      await element(by.buttonText('save')).click();
      await browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6

      const targetHeroElt = getPageElts().topTables.get(targetHeroDashboardIndex);
      expect(await targetHeroElt.getText()).toEqual(newHeroName);
    });

  });

  describe('Tables tests', () => {

    beforeAll(() => browser.get(''));

    it('can switch to Tables view', async () => {
      await getPageElts().appTablesHref.click();
      const page = getPageElts();
      expect(await page.appTables.isPresent()).toBeTruthy();
      expect(await page.allTables.count()).toEqual(9, 'number of Tables');
    });

    it('can route to hero details', async () => {
      await getHeroLiEltById(targetHero.id).click();

      const page = getPageElts();
      expect(await page.heroDetail.isPresent()).toBeTruthy('shows hero detail');
      const hero = await Hero.fromDetail(page.heroDetail);
      expect(hero.id).toEqual(targetHero.id);
      expect(hero.name).toEqual(targetHero.name.toUpperCase());
    });

    it(`updates hero name (${newHeroName}) in details view`, updateHeroNameInDetailView);

    it(`shows ${newHeroName} in Tables list`, async () => {
      await element(by.buttonText('save')).click();
      await browser.waitForAngular();
      const expectedText = `${targetHero.id} ${newHeroName}`;
      expect(await getHeroAEltById(targetHero.id).getText()).toEqual(expectedText);
    });

    it(`deletes ${newHeroName} from Tables list`, async () => {
      const TablesBefore = await toHeroArray(getPageElts().allTables);
      const li = getHeroLiEltById(targetHero.id);
      await li.element(by.buttonText('x')).click();

      const page = getPageElts();
      expect(await page.appTables.isPresent()).toBeTruthy();
      expect(await page.allTables.count()).toEqual(8, 'number of Tables');
      const TablesAfter = await toHeroArray(page.allTables);
      // console.log(await Hero.fromLi(page.allTables[0]));
      const expectedTables =  TablesBefore.filter(h => h.name !== newHeroName);
      expect(TablesAfter).toEqual(expectedTables);
      // expect(page.selectedHeroSubview.isPresent()).toBeFalsy();
    });

    it(`adds back ${targetHero.name}`, async () => {
      const addedHeroName = 'Alice';
      const TablesBefore = await toHeroArray(getPageElts().allTables);
      const numTables = TablesBefore.length;

      await element(by.css('input')).sendKeys(addedHeroName);
      await element(by.buttonText('Add hero')).click();

      const page = getPageElts();
      const TablesAfter = await toHeroArray(page.allTables);
      expect(TablesAfter.length).toEqual(numTables + 1, 'number of Tables');

      expect(TablesAfter.slice(0, numTables)).toEqual(TablesBefore, 'Old Tables are still there');

      const maxId = TablesBefore[TablesBefore.length - 1].id;
      expect(TablesAfter[numTables]).toEqual({id: maxId + 1, name: addedHeroName});
    });

    it('displays correctly styled buttons', async () => {
      const buttons = await element.all(by.buttonText('x'));

      for (const button of buttons) {
        // Inherited styles from styles.css
        expect(await button.getCssValue('font-family')).toBe('Arial, Helvetica, sans-serif');
        expect(await button.getCssValue('border')).toContain('none');
        expect(await button.getCssValue('padding')).toBe('1px 10px 3px');
        expect(await button.getCssValue('border-radius')).toBe('4px');
        // Styles defined in Tables.component.css
        expect(await button.getCssValue('left')).toBe('210px');
        expect(await button.getCssValue('top')).toBe('5px');
      }

      const addButton = element(by.buttonText('Add hero'));
      // Inherited styles from styles.css
      expect(await addButton.getCssValue('font-family')).toBe('Arial, Helvetica, sans-serif');
      expect(await addButton.getCssValue('border')).toContain('none');
      expect(await addButton.getCssValue('padding')).toBe('8px 24px');
      expect(await addButton.getCssValue('border-radius')).toBe('4px');
    });

  });

  describe('Progressive hero search', () => {

    beforeAll(() => browser.get(''));

    it(`searches for 'Ma'`, async () => {
      await getPageElts().searchBox.sendKeys('Ma');
      await browser.sleep(1000);

      expect(await getPageElts().searchResults.count()).toBe(4);
    });

    it(`continues search with 'g'`, async () => {
      await getPageElts().searchBox.sendKeys('g');
      await browser.sleep(1000);
      expect(await getPageElts().searchResults.count()).toBe(2);
    });

    it(`continues search with 'n' and gets ${targetHero.name}`, async () => {
      await getPageElts().searchBox.sendKeys('n');
      await browser.sleep(1000);
      const page = getPageElts();
      expect(await page.searchResults.count()).toBe(1);
      const hero = page.searchResults.get(0);
      expect(await hero.getText()).toEqual(targetHero.name);
    });

    it(`navigates to ${targetHero.name} details view`, async () => {
      const hero = getPageElts().searchResults.get(0);
      expect(await hero.getText()).toEqual(targetHero.name);
      await hero.click();

      const page = getPageElts();
      expect(await page.heroDetail.isPresent()).toBeTruthy('shows hero detail');
      const hero2 = await Hero.fromDetail(page.heroDetail);
      expect(hero2.id).toEqual(targetHero.id);
      expect(hero2.name).toEqual(targetHero.name.toUpperCase());
    });
  });

  async function dashboardSelectTargetHero() {
    const targetHeroElt = getPageElts().topTables.get(targetHeroDashboardIndex);
    expect(await targetHeroElt.getText()).toEqual(targetHero.name);
    await targetHeroElt.click();
    await browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6

    const page = getPageElts();
    expect(await page.heroDetail.isPresent()).toBeTruthy('shows hero detail');
    const hero = await Hero.fromDetail(page.heroDetail);
    expect(hero.id).toEqual(targetHero.id);
    expect(hero.name).toEqual(targetHero.name.toUpperCase());
  }

  async function updateHeroNameInDetailView() {
    // Assumes that the current view is the hero details view.
    await addToHeroName(nameSuffix);

    const page = getPageElts();
    const hero = await Hero.fromDetail(page.heroDetail);
    expect(hero.id).toEqual(targetHero.id);
    expect(hero.name).toEqual(newHeroName.toUpperCase());
  }

});

async function addToHeroName(text: string): Promise<void> {
  const input = element(by.css('input'));
  await input.sendKeys(text);
}

async function expectHeading(hLevel: number, expectedText: string): Promise<void> {
  const hTag = `h${hLevel}`;
  const hText = await element(by.css(hTag)).getText();
  expect(hText).toEqual(expectedText, hTag);
}

function getHeroAEltById(id: number): ElementFinder {
  const spanForId = element(by.cssContainingText('li span.badge', id.toString()));
  return spanForId.element(by.xpath('..'));
}

function getHeroLiEltById(id: number): ElementFinder {
  const spanForId = element(by.cssContainingText('li span.badge', id.toString()));
  return spanForId.element(by.xpath('../..'));
}

async function toHeroArray(allTables: ElementArrayFinder): Promise<Hero[]> {
  return allTables.map(hero => Hero.fromLi(hero!));
}
