import sinon from 'sinon';
import { newHamburgerNav } from '../modules/hamburgerNavigation';
import mustRead from '../modules/mustRead';
import promoted from '../modules/promoted';
import hometheme from '../modules/hometheme';
import headernavigation from '../modules/headernavigation';

const getModulesStub = sinon.stub();

getModulesStub.withArgs('headernavigation', 'hamburgernavigation', 'footer', 'mustread', 'promoted', 'hero', `homehero`, `hometheme`).resolves({
    headernavigation,
    hamburgernavigation: newHamburgerNav,
    footer: {},
    mustread: mustRead,
    promoted,
    hero: {},
    homehero: {},
    theme: hometheme
});

const getModuleStub = sinon.stub();

export { getModulesStub, getModuleStub };
